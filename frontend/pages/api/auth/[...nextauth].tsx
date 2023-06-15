import { isDateExpired } from '@/utils/datetime';
import { decoderFunction } from '@/utils/decoder';
import http from '@/utils/http';
import { AuthOptions, DefaultUser } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

// const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

type UserCredential = {
    username: string;
    password: string;
};

declare module 'next-auth' {
    interface Session {
        accessToken: string;
    }
    interface User extends DefaultUser {
        refresh: string;
        access: string;
        user: object;
    }
}

async function refreshAccessToken(tokenObject: any) {
    try {
        const response = await http.post('/api/v1/auth/refresh/', { refresh: tokenObject.refreshToken });

        tokenObject.accessToken = response.data.access;
        tokenObject.refreshToken = response.data.refresh;

        return tokenObject;
    } catch (error) {
        return tokenObject;
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

                const resp = await http.post('api/v1/auth/login/', credentialDetails);
                const user = resp;
                if (user && user.status == 200) {
                    return user.data;
                } else {
                    return null;
                }
            },
        }),
    ],

    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        jwt: async ({ token, user }) => {
            const jwtKen = token.accessToken;
            const decodedToken = decoderFunction(jwtKen);
            if (user) {
                token.refreshToken = user.refresh;
                token.accessToken = user.access;
            }
           
            // implement refresh here

            if (isDateExpired(decodedToken && decodedToken.exp) && token) {
                token = await refreshAccessToken(token);
            }

            token.details = decodedToken;
            return token;
        },

        session: ({ session, token }) => {
            if (token) {
                session.user.accessToken = token.accessToken;
                session.user.username = token.details.user.username;
                session.user.user_id = token.details.user_id;
                session.user.branch = token.details.user.branch;
                session.user.role = token.details.user.role;
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
