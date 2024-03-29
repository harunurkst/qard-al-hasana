import BaseLayout from '@/Layouts/BaseLayout';
import { Button } from '@chakra-ui/react';
import Head from 'next/head';
import { ReactNode } from 'react';

export default function Home() {
    return (
        <>
            <Head>
                <title>Qard al-Hasan</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="container mx-auto w-5/6 py-8">
                <section className="mb-10 bg-brand-50 py-20">
                    <div className="container mx-auto flex justify-center px-10 text-center md:flex-row">
                        <div className="md:max-w-5xl">
                            <h1 className="mb-6 text-3xl font-bold leading-tight text-gray-800 md:text-5xl lg:text-6xl">
                                Qard al-Hasan: Interest-free Loans
                            </h1>
                            <p className="mb-8 text-lg text-gray-600">
                                Qard al-Hasan is a form of interest-free loan allowed in Islamic finance. It is a
                                benevolent loan given to help those in need, without any expectation of profit. Learn
                                more about this concept and how you can use it to help others.
                            </p>
                            <Button size="lg" colorScheme="brand">
                                Registration
                            </Button>
                        </div>
                    </div>
                </section>
                <div className="flex flex-wrap items-center justify-between">
                    <div className="w-full md:w-1/2 md:pr-8">
                        <h2 className="mb-4 text-3xl font-bold text-brand-700">What is Qard al-Hasan?</h2>
                        <p className="mb-4 text-gray-700">
                            Qard al-Hasan is an Islamic concept that refers to an interest-free loan given by a lender
                            to a borrower for charitable or benevolent purposes.
                        </p>
                        <p className="mb-4 text-gray-700">
                            In Islamic finance, the concept of Qard al-Hasan is used as a means of providing financial
                            assistance to those in need without charging interest, which is prohibited under Islamic
                            law.
                        </p>
                        <Button size="md" colorScheme="brand">
                            Registration
                        </Button>
                    </div>
                    <div className="mb-8 w-full md:mb-0 md:w-1/2 ">
                        <img
                            src="https://images.unsplash.com/photo-1591276625440-d50e6618dfd1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                            alt="Qard al-Hasan"
                            className="aspect-video w-full rounded-lg object-cover shadow-md"
                        />
                    </div>
                </div>
                <hr className="my-8" />
                <div className="flex flex-wrap items-center justify-between">
                    <div className="w-full md:w-1/2 md:pr-8">
                        <img
                            src="https://images.unsplash.com/photo-1589002213012-6ec134d3f8ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80"
                            alt="Who can benefit from Qard al-Hasan?"
                            className="aspect-video w-full rounded-lg object-cover shadow-md"
                        />
                    </div>
                    <div className="mb-8 w-full md:mb-0 md:w-1/2 ">
                        <h3 className="mb-4 text-2xl font-bold text-brand-700">Who can benefit from Qard al-Hasan?</h3>
                        <p className="mb-4 text-gray-700">
                            Qard al-Hasan can benefit individuals, businesses, and non-profit organizations in need of
                            financial assistance. The loan can be used for a variety of purposes, such as paying for
                            medical expenses, starting abusiness, or supporting a charitable cause.
                        </p>
                        <p className="mb-4 text-gray-700">
                            It is important to note that Qard al-Hasan is not a form of charity or donation. The
                            borrower is expected to repay the loan in full, but without any additional interest or fees.
                        </p>
                    </div>
                </div>
                <hr className="my-8" />
                <div className="flex flex-wrap items-center justify-between">
                    <div className="w-full md:w-1/2  md:pr-8">
                        <h3 className="mb-4 text-2xl font-bold text-brand-700">How to apply for Qard al-Hasan?</h3>
                        <p className="mb-4 text-gray-700">
                            To apply for Qard al-Hasan, you can contact an Islamic finance institution or a charitable
                            organization that offers interest-free loans. The lender will assess your financial
                            situation and determine whether you are eligible for the loan.
                        </p>
                        <p className="mb-4 text-gray-700">
                            It is important to provide accurate and complete information about your financial situation
                            and the purpose of the loan to increase your chances of being approved.
                        </p>
                    </div>
                    <div className="mb-8 w-full md:mb-0 md:w-1/2">
                        <img
                            src="https://images.unsplash.com/photo-1616422840391-fa670d4b2ae7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                            alt="How to apply for Qard al-Hasan?"
                            className="aspect-video w-full rounded-lg object-cover shadow-md"
                        />
                    </div>
                </div>
            </main>
        </>
    );
}

Home.getLayout = (page: ReactNode) => {
    return <BaseLayout>{page}</BaseLayout>;
};
