// import NextAuth from "next-auth";
// import { authOptions } from "@/lib/auth";

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
//import { NextAuthOptions } from "next-auth";


import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Force TypeScript to treat NextAuth as callable by casting it to a function that accepts any options.
const handler = (NextAuth as unknown as (options: any) => any)(authOptions);

export { handler as GET, handler as POST };

