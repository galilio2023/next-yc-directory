import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
  }

  interface Profile {
    id: number;
    login: string;
    bio?: string;
    name?: string;
    email?: string;
    avatar_url?: string;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id?: string;
  }
}
