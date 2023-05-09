/* eslint-disable no-console */
import CustomTextInput from '@/components/CustomInput';
import BaseLayout from '@/Layouts/BaseLayout';
import { registrationSchema, RegistrationType } from '@/schema/AuthSchema';
import { Button } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/dist/client/router';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
// import useStore from '../src/store/store'

const Registration = () => {
    const router = useRouter();
    // const {registerUser}=useStore()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegistrationType>({ resolver: zodResolver(registrationSchema) });

    // form submit
    const submitRegistrationForm =  (data: RegistrationType) => {
        console.log('data', data);
        // const {email,password}=data
        // registerUser({
        //     username:email,
        //     password
        //   })
        // router.push('/dashboard')
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
                <h1 className="mb-3 text-center text-3xl font-bold text-gray-900">Registration your organization</h1>
                <p className="text-bae mb-6 text-center text-gray-700">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo amet deserunt, pariatur deleniti
                    doloribus quos hic culpa non
                </p>
                <div className="w-full max-w-3xl rounded-md border  border-gray-200 bg-white p-7 shadow-sm">
                    <form onSubmit={handleSubmit(submitRegistrationForm)}>
                        <CustomTextInput
                            className="mb-2.5"
                            label="Organization Name"
                            {...register('organizationName')}
                            placeholder="Organization Name"
                            error={errors.organizationName?.message}
                        />
                        <CustomTextInput
                            className="mb-2.5"
                            label="Address"
                            {...register('address')}
                            placeholder="Address"
                            error={errors.address?.message}
                        />

                        <div className="mt-2.5 flex gap-6">
                            <CustomTextInput
                                label="Email"
                                type="email"
                                {...register('email')}
                                placeholder="Email"
                                error={errors.email?.message}
                            />
                            <CustomTextInput
                                label="Phone Number"
                                {...register('phoneNumber')}
                                placeholder="Phone Number"
                                error={errors.phoneNumber?.message}
                            />
                        </div>

                        <div className="mt-2.5 flex gap-6">
                            <CustomTextInput
                                label="Password"
                                type="password"
                                {...register('password')}
                                placeholder="Password"
                                error={errors.password?.message}
                            />
                            <CustomTextInput
                                label="Confirm Password"
                                type="password"
                                {...register('confirmPassword')}
                                placeholder="Confirm Password"
                                error={errors.confirmPassword?.message}
                            />
                        </div>

                        <Button px={'10'} className="mt-8" colorScheme={'brand'} isLoading={isSubmitting} type="submit">
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
};

Registration.getLayout = (page: ReactNode) => {
    return <BaseLayout className="flex min-h-screen flex-col bg-brand-25/50">{page}</BaseLayout>;
};

export default Registration;
