import GitHub from "next-auth/providers/github";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user, profile }) {
      if (!user || !profile) return false;

      const { name, email, image } = user;
      const { id, login, bio } = profile;

      try {
        const existingUser = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            id: Number(id),
          });

        if (!existingUser) {
          await writeClient.create({
            _type: "author",
            id: Number(id),
            name,
            username: login,
            email,
            image,
            bio: (bio as string) || "",
          });
        } else {
          // Sync profile data from GitHub if the user already exists
          await writeClient
            .patch(existingUser._id)
            .set({
              name,
              username: login,
              email,
              image,
              bio: (bio as string) || existingUser.bio || "",
            })
            .commit();
        }

        return true;
      } catch (error) {
        console.error("Error during sign in:", error);
        return false;
      }
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        try {
          const user = await client
            .withConfig({ useCdn: false })
            .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
              id: Number(profile.id),
            });
          
          if (user) {
            token.id = user._id;
          }
        } catch (error) {
          console.error("Error in JWT callback:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
