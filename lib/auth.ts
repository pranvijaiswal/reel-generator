import NextAuth , {  Session} from "next-auth";
//import { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./db";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";


export const authOptions={
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password required");
                }
                try {
                    await connectToDatabase();
                    const user = await User.findOne({ email: credentials.email })
                        if(!user){
                            throw new Error("User not found");
                        }

                       const valid = await bcrypt.compare(credentials.password, user.password)

                       if(!valid){
                        throw new Error("Invalid password");
                    }
                    return {
                        id: user._id.toString(),
                        email: user.email  
                    }
                } catch (error) {
                    throw new Error("Invalid credentials");
            
                }
            }
        })
    ],

   
    callbacks : {
       async jwt ({token , user}: { token: JWT; user?: any }) //Handles JSON Web Token (JWT) modifications
       {
        if (user)
        {
            token.id = user.id
        }
        return token
       },
       async session ({session , token}  :{ session: Session; token: JWT }) // Modifies the session object sent to the frontend.
       {
        if (session.user)
        {
            session.user.id = token.id as string;
        }
        return session
       }
    },
    pages :
    {
       signIn : "/login"    ,
       error : "/login"
    },
    session : {
        strategy : "jwt",
        maxAge: 30 * 24 * 60 * 60,
  } as const,
  secret: process.env.NEXTAUTH_SECRET,
    }


// next auth generated jwt ..which sends user id to the frontend and then the fronteend requests session through get session 
// aads user id to the session from the token frontend can now access session.user.id






