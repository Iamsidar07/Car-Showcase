import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"

const handler = NextAuth( {
    secret: process.env.NextAuth_SECRET,
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.Google_ID as string,
            clientSecret: process.env.Google_SECRET as string,
        }),
        // ...add more providers here
    ],
})

export { handler as GET, handler as POST };