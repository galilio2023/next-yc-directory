import GitHub from "next-auth/providers/github";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn(params: any) {
      const { user, profile } = params;

      if (!user || !profile) return false;

      const { name, email, image } = user;
      const { id, login, bio } = profile;

      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id,
        });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          githubId: id,
          name,
          username: login,
          email,
          image,
          bio: bio || "",
        });
      }

      return true;
    },
    async jwt({ token, account, profile }: any) {
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            id: profile.id,
          });
        token.id = user?._id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});

// import GitHub from "next-auth/providers/github";
// import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
// import { client } from "@/sanity/lib/client";
// import { writeClient } from "@/sanity/lib/write-client";
// import NextAuth from "next-auth";
//
// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [GitHub],
//   callbacks: {
//     async signIn({
//       user: { name, email, image },
//       profile: { id, login, bio },
//     }) {
//       const existingUser = await client
//         .withConfig({ useCdn: false })
//         .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
//           id,
//         });
//       if (!existingUser) {
//         await writeClient.create({
//           _type: "author",
//           id,
//           name,
//           username: login,
//           email,
//           image,
//           bio: bio || "",
//         });
//       }
//
//       return true;
//     },
//     async jwt({ token, account, profile }) {
//       if (account && profile) {
//         const user = await client
//           .withConfig({ useCdn: false })
//           .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
//             id: profile?.id,
//           });
//         token.id = user?._id;
//       }
//       return token;
//     },
//     // async session({ session, token }) {
//     //   Object.assign(session, { id: token.id });
//     //   return session;
//     // },
//     async session({ session, token }) {
//       // ✅ Add id to session.user
//       if (session.user) {
//         session.user.id = token.id as string;
//       }
//       return session;
//     },
//   },
// });
