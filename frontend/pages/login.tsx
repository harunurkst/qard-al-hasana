import BaseLayout from '@/Layouts/BaseLayout';
import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/dist/client/router';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';

type LoginFormData = {
    email: string;
    password: string;
};

const Login = () => {
    const router = useRouter();

    const loginSchema: ZodType<LoginFormData> = z.object({
        email: z
            .string()
            .trim()
            .min(1, { message: 'Please insert your email address.' })
            .email('This is not a valid email.'),
        password: z.string().min(1, { message: 'Please insert your password.' }),
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

    // form submit
    const submitLoginForm = async (data: LoginFormData) => {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                router.push('/dashboard');
                resolve();
            }, 3000);
        });
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
                    <form onSubmit={handleSubmit(submitLoginForm)}>
                        <FormControl isInvalid={Boolean(errors.email)}>
                            <FormLabel htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
                                Email
                            </FormLabel>

                            <Input
                                id="email"
                                placeholder="Email"
                                className="w-full"
                                type={'text'}
                                {...register('email')}
                            />
                            <FormErrorMessage className="mb-3">
                                {errors.email && errors.email.message?.toString()}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={Boolean(errors.password)}>
                            <FormLabel
                                htmlFor="password"
                                className="mb-1.5 mt-3 block text-sm font-medium text-gray-700"
                            >
                                Password
                            </FormLabel>

                            <Input
                                className="w-full"
                                placeholder="Password"
                                type={'password'}
                                {...register('password')}
                            />
                            <FormErrorMessage>
                                {errors.password && errors.password.message?.toString()}
                            </FormErrorMessage>
                        </FormControl>

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

export default Login;
