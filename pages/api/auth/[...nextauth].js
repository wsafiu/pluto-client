import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Pluto',
            credentials: {
                username: { label: "Username", type: "email", placeholder: "jsmith" },
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const res = await fetch("https://pluto-sjj8.onrender.com/api/users/login", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })

                const user = await res.json()
                console.log("token", user.token)
                if (!res.ok) {
                    throw new Error(user.exception);
                }

                if (res.ok && user) {
                    return user
                }

                return null
            },

        })
    ],
    secret: "343653444fgfxgxdstry544378",
    // pages: { signIn: "/login" },
    callbacks: {
        async jwt({ token, user, account }) {

            if (account && user) {
                return {
                    ...token,
                    accessToken: user.token,
                    refreshToken: user.token,
                };
            }

            return token;
        },

        async session({ session, token }) {
            delete session.user?.name;
            delete session.user?.email;
            delete session.user?.image;
            session.user.accessToken = token.accessToken;
            // session.user.refreshToken = token.refreshToken;
            // session.user.accessTokenExpires = token.accessTokenExpires;

            return session;
        },
    },
}

export default NextAuth(authOptions)





