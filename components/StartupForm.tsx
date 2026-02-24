"use client";

import MDEditor from "@uiw/react-md-editor";
import { Input } from "@/components/ui/input";
import { useActionState, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Tag, Link as LinkIcon, Type, FileText, PenTool } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };
      setErrors({});
      await formSchema.parseAsync(formValues);

      const result = await createPitch(prevState, formData, pitch);

      if (result.status === "SUCCESS") {
        toast({
          title: "Success",
          description: "Your startup pitch has been created successfully.",
        });
        router.push(`/startup/${result._id}`);
      } else {
        toast({
          title: "Error",
          description: result.error || "An unexpected error has occurred.",
          variant: "destructive",
        });
      }
      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors as Record<string, string[]>;
        const newErrors: Record<string, string> = {};
        
        for (const key in fieldErrors) {
          const messages = fieldErrors[key];
          if (messages && messages.length > 0) {
            newErrors[key] = messages[0];
          }
        }

        setErrors(newErrors);
        toast({
          title: "Validation Error",
          description: "Please check your input and try again.",
          variant: "destructive",
        });
        return { error: "Validation failed", status: "ERROR" };
      }
      toast({
        title: "Error",
        description: "An unexpected error has occurred.",
        variant: "destructive",
      });
      return {
        error: "An unexpected error has occurred.",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  const globalError = state.status === "ERROR" ? state.error : null;

  return (
    <form action={formAction} className="space-y-10">
      {globalError && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
          {globalError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label htmlFor="title" className="flex items-center gap-2 text-sm font-bold text-slate-300">
            <Type className="size-4 text-primary" />
            Startup Title
          </label>
          <Input
            id="title"
            name="title"
            className="h-14 rounded-2xl border-white/5 bg-white/5 px-6 text-white placeholder:text-slate-500 focus:border-primary/50 focus:ring-primary/50"
            required
            placeholder="e.g., AI-Powered Platform for Remote Collaboration"
          />
          {errors.title && <p className="text-xs font-medium text-red-400 mt-1">{errors.title}</p>}
        </div>

        <div className="space-y-3">
          <label htmlFor="category" className="flex items-center gap-2 text-sm font-bold text-slate-300">
            <Tag className="size-4 text-primary" />
            Category
          </label>
          <Input
            id="category"
            name="category"
            className="h-14 rounded-2xl border-white/5 bg-white/5 px-6 text-white placeholder:text-slate-500 focus:border-primary/50 focus:ring-primary/50"
            required
            placeholder="e.g., Tech, Health, Education"
          />
          {errors.category && (
            <p className="text-xs font-medium text-red-400 mt-1">{errors.category}</p>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <label htmlFor="description" className="flex items-center gap-2 text-sm font-bold text-slate-300">
          <FileText className="size-4 text-primary" />
          Short Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="min-h-[120px] rounded-2xl border-white/5 bg-white/5 p-6 text-white placeholder:text-slate-500 focus:border-primary/50 focus:ring-primary/50"
          required
          placeholder="Briefly describe your startup in a few sentences."
        />
        {errors.description && (
          <p className="text-xs font-medium text-red-400 mt-1">{errors.description}</p>
        )}
      </div>

      <div className="space-y-3">
        <label htmlFor="link" className="flex items-center gap-2 text-sm font-bold text-slate-300">
          <LinkIcon className="size-4 text-primary" />
          Cover Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="h-14 rounded-2xl border-white/5 bg-white/5 px-6 text-white placeholder:text-slate-500 focus:border-primary/50 focus:ring-primary/50"
          required
          placeholder="https://example.com/your-image.png"
        />
        {errors.link && <p className="text-xs font-medium text-red-400 mt-1">{errors.link}</p>}
      </div>

      <div className="space-y-3">
        <label htmlFor="pitch" className="flex items-center gap-2 text-sm font-bold text-slate-300">
          <PenTool className="size-4 text-primary" />
          The Pitch (Markdown)
        </label>
        <div data-color-mode="dark" className="overflow-hidden rounded-2xl border border-white/5 bg-white/5">
          <MDEditor
            value={pitch}
            onChange={(value) => setPitch(value as string)}
            id="pitch"
            preview="edit"
            height={400}
            className="!bg-transparent"
            textareaProps={{
              placeholder:
                "Describe your idea in detail. What problem does it solve? Who is your target audience?",
            }}
            previewOptions={{
              disallowedElements: ["style"],
            }}
          />
        </div>
        {errors.pitch && <p className="text-xs font-medium text-red-400 mt-1">{errors.pitch}</p>}
      </div>

      <Button
        type="submit"
        className="h-16 w-full rounded-2xl bg-primary text-lg font-black text-white shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all hover:bg-primary/90 active:scale-[0.98]"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Launch Your Pitch"}
        <Send className="size-5 ml-3" />
      </Button>
    </form>
  );
};
export default StartupForm;