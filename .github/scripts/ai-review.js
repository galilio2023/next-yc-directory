const { GoogleGenerativeAI } = require('@google/generative-ai');
const { execSync } = require('child_process');
const fs = require('fs');

async function run() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  let diff;
  try {
    diff = execSync('git diff origin/main...HEAD').toString();
  } catch {
    diff = execSync('git diff HEAD^ HEAD').toString();
  }

  if (!diff || diff.trim().length === 0) {
    console.log('No changes to review.');
    return;
  }

  const prompt = `Act as a Senior Software Architect. Review the following code changes for:
  1. Architectural consistency with Next.js 15 and App Router patterns.
  2. Performance bottlenecks (unnecessary re-renders, large client components).
  3. Security vulnerabilities (exposed secrets, unsafe data handling).
  4. Adherence to the 'Loom' premium design system (Tailwind usage).
  
  Provide constructive feedback and suggest specific improvements.
  
  Code Diff:
  ${diff}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  const eventPath = process.env.GITHUB_EVENT_PATH;
  const prNumber = eventPath ? JSON.parse(fs.readFileSync(eventPath, 'utf8')).number : null;

  if (prNumber) {
    const url = `https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}/issues/${prNumber}/comments`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': 'node-fetch'
      },
      body: JSON.stringify({ body: '### 🤖 Loom AI Architect Review (Gemini 2.5 Flash)\n\n' + text })
    });

    if (response.ok) {
      console.log('Review comment posted successfully.');
    } else {
      const errorText = await response.text();
      console.error('Failed to post comment:', response.status, errorText);
      process.exit(1);
    }
  }
}

run().catch(err => { 
  console.error('Error during AI review:', err); 
  process.exit(1); 
});
