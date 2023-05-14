import CustomTextInput from '@/components/CustomInput';
import BaseLayout from '@/Layouts/BaseLayout';
import { loginSchema, LoginType } from '@/schema/AuthSchema';
import { Button } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/dist/client/router';
import { ReactNode, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import api from './api/api';
import axios from 'axios';
import { useSession, signIn, signOut, getCsrfToken } from "next-auth/react"
import { type } from 'os';

interface LoginFormData{
    username: string,
    password: string
}

const Login = (csrfToken:string) => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginType>({ resolver: zodResolver(loginSchema) });

    // form submit
    const submitLoginForm = async (values:LoginFormData) => {
        const res = await signIn('credentials', {
            // 'redirect': false,
            'username': values.username,
            'password':values.password,
            'callbackUrl': '/dashboard',

        });

        // return new Promise<void>((resolve) => {
        //     setTimeout(() => {
        //         router.push('/dashboard');
        //         resolve();
        //     }, 3000);
        // });
    };

    return (
        <section className="container mx-auto h-full flex-grow py-20">
            <div className="mx-auto max-w-3xl px-5">
                <h1 className="mb-3 text-center text-3xl font-bold text-gray-900">Login your organization</h1>
                <p className="text-bae mb-6 text-center text-gray-700">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo amet deserunt, pariatur deleniti
                    doloribus quos hic culpa non
                </p>
                <div className="w-full max-w-3xl rounded-md bg-white  p-7 shadow-md">
                    <form onSubmit={handleSubmit(submitLoginForm)} >
                    {/* <form method='post' action="/api/auth/callback/credentials"> */}
                        <input
                            name="csrfToken"
                            type="hidden"
                            defaultValue={csrfToken}
                        />
                        <CustomTextInput
                            className="mb-2.5"
                            label="User Name"
                            error={errors.username?.message}
                            {...register('username')}
                            type="text"
                        />
                        <CustomTextInput 
                            label="Password" 
                            error={errors.password?.message} 
                            type='password'
                            {...register('password')} 
                        />

                        <Button px={'10'} className="mt-8" colorScheme={'brand'} isLoading={isSubmitting} type="submit">
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
};

Login.getLayout = (page: ReactNode) => {
    return <BaseLayout className="flex min-h-screen flex-col bg-brand-25/50">{page}</BaseLayout>;
};

export async function getServerSideProps(context) {
    return {
      props: {
        csrfToken: await getCsrfToken(context),
      },
    }
  }

export default Login;


