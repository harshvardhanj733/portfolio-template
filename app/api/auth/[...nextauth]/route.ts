import { config } from "dotenv";
config();

import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToMongo } from "@/app/db/connectToMongo";
import { UserDetails } from "@/app/models/UserDetails";
import { SavedModel } from "@/app/models/SavedDetails";

const authOption: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID || "",
      clientSecret: process.env.CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      try {
        if (!account || !profile?.email) {
          throw new Error("Missing account or profile information");
        }
        await connectToMongo();
        let user = await UserDetails.findOne({ email: profile.email });
        console.log("User found in signIn callback:", user);
        console.log("Profile info:", profile);
        if (!user) {
          const newUser = new UserDetails({
            name: profile.name,
            email: profile.email,
          });
          await newUser.save();

          const userSavedData = new SavedModel({
            name: profile.name,
            role: "Pls fill your role...",
            about: "Pls fill your about info...",
            email: profile.email,
            resume: "Kinly upload your resume link...",
            id: newUser._id.toString(),
          });
          await userSavedData.save();

          console.log("New user created and saved:", newUser);
        }

        return true;
      } catch (error) {
        console.log("Error in signIn callback:", error);
        return false;
      }
    },
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

const handler = NextAuth(authOption);

// export { handler as GET, handler as POST };
export { handler as GET, handler as POST, authOption };
