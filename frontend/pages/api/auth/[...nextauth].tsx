import { AuthOptions, DefaultUser } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import api from '../api';

// const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

type UserCredential = {
    username: string;
    password: string;
};

declare module 'next-auth' {
    // interface Session {
    //     user?: DefaultUser & { accessToken: string };
    // }
    // interface Session {
    //     user: {
    //         accessToken: string;
    //     };
    // }
    interface Session {
        accessToken: string;
    }
    interface User extends DefaultUser {
        refresh: string;
        access: string;
        user: object;
    }
}

export const authOptions: AuthOptions = {
    session: {
        strategy: 'jwt',
        // maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {
                username: { label: 'Username', type: 'username' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const _credential = credentials as UserCredential;
                const credentialDetails = {
                    username: _credential.username,
                    password: _credential.password,
                };

                const resp = await api.post('api/v1/auth/login/', credentialDetails);
                const user = resp;
                if (user && user.status == 200) {
                    return user.data;
                } else {
                    //   console.log("check your credentials");
                    return null;
                }
            },
        }),
    ],

    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.refreshToken = user.refresh;
                token.accessToken = user.access;
            }
            // else if(Date.now()<(token.exp * 1000)){
            //     return token
            // }else{
            //     const refreshResponse = await api('api/v1/auth/refresh/', token.refreshToken )
            //     const res = refreshResponse
            //     console.log('res:.....', res)
            // }

            return token;
        },

        session: ({ session, token }) => {
            if (token) {
                session.user.accessToken = token.jti;
            }
            return session;
        },
    },

    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },

    pages: {
        signIn: '/login',
    },
};

export default NextAuth(authOptions);
