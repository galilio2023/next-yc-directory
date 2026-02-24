// types/next-auth.d.ts
import "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback
   */
  interface User extends DefaultUser {
    id: string;
  }

  /**
   * GitHub-specific profile interface
   */
  interface Profile {
    id: string;
    login: string;
    name?: string;
    email?: string;
    avatar_url?: string;
    bio?: string;
    [key: string]: unknown;
  }
}

declare module "@auth/core/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id?: string;
  }
}
