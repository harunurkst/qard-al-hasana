import { env } from '@/env.mjs';
import { useIsClient } from '@/hooks';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import jwt from 'jsonwebtoken';
import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import React, { ReactElement, ReactNode } from 'react';
//session provider
import { SessionProvider } from 'next-auth/react';
//css

// import '../styles/CustomDatePicker.css';
import '../styles/globals.css';
import '../styles/tailwind.css';

const ReactQueryDevtoolsProduction = React.lazy(() =>
    import('@tanstack/react-query-devtools/build/lib/index.prod.js').then((d) => ({
        default: d.ReactQueryDevtools,
    }))
);

export type NextPageWithLayout<P = Record<string, never>, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement, pageProps: AppProps) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

export type DecodedUser = {
    token_data: {
        session_id: string;
        session_token: string;
    };
    username: string;
};

const inter = Inter({ weight: ['300', '400', '500', '600', '700', '800', '900'], subsets: ['latin'] });

const colors = {
    brand: {
        '25': '#F6FEF9',
        '50': '#ECFDF3',
        '100': '#D1FADF',
        '200': '#A6F4C5',
        '300': '#6CE9A6',
        '400': '#32D583',
        '500': '#12B76A',
        '600': '#039855',
        '700': '#027A48',
        '800': '#05603A',
        '900': '#054F31',
    },
};

const theme = extendTheme({ colors });

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) => {
    const getLayout = Component.getLayout ?? ((page) => page);

    const isClient = useIsClient();
    return (
        <SessionProvider session={session}>
            <div className={inter.className}>
                <ChakraProvider theme={theme}>
                    {getLayout(
                        <QueryClientProvider client={queryClient}>
                            <Component {...pageProps} />

                            {env.NEXT_PUBLIC_NODE_ENV === 'development' && isClient ? (
                                <React.Suspense fallback={null}>
                                    <ReactQueryDevtoolsProduction initialIsOpen={false} />
                                </React.Suspense>
                            ) : null}
                        </QueryClientProvider>,

                        { ...pageProps }
                    )}
                </ChakraProvider>
            </div>
        </SessionProvider>
    );
};

export const withSession = (
    getSerSideProps: (ctx: GetServerSidePropsContext, user: DecodedUser | null) => any
): GetServerSideProps => {
    return (ctx: GetServerSidePropsContext) => {
        const token = ctx.req.cookies.token;

        let decodedUser: DecodedUser | null = null;

        if (token) {
            decodedUser = jwt.decode(token) as DecodedUser;
        }

        return getSerSideProps(ctx, decodedUser);
    };
};

export default MyApp;
