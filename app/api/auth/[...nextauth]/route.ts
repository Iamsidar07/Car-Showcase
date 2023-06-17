import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import User from '@/models/User';
import { connectToDatabase } from '@/utils/database';


const handler = NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
    ],
    callbacks: {
        async session({ session }) {
            if (session?.user) {
                const sessionUser = await User.findOne({ email: session?.user.email });
                session.user.id = sessionUser._id.toString();
            }
            return session;
        },
        async signIn({ profile }): Promise<boolean> {
            try {
                await connectToDatabase();
                //check if the user exists
                const isUserExists = await User.findOne({ email: profile?.email });
                if (!isUserExists && profile?.email) {
                    //create user
                    const image = `https://api.multiavatar.com/${profile?.name}.svg`
                    await User.create({
                        username: profile.name?.replace(' ', '').toLowerCase(),
                        email: profile.email,
                        image,
                    });
                }
                return true;
            } catch (error) {
                // Handle the error
                console.log(error)
                return false;
            }
        },
    }
});

export { handler as GET, handler as POST };
