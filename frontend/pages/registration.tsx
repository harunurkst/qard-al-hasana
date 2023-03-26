import BaseLayout from '@/Layouts/BaseLayout';
import { RegistrationFormData } from '@/types/registrationFormTypes';
import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/dist/client/router';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';

const Registration = () => {
    const router = useRouter();

    const registrationSchema: ZodType<RegistrationFormData> = z
        .object({
            organizationName: z.string().trim().min(1, { message: 'Please insert your organization name.' }).max(50),
            address: z.string().trim().min(1, { message: 'Please insert your address.' }).max(50),
            email: z
                .string()
                .trim()
                .min(1, { message: 'Please insert your address.' })
                .email({ message: 'Invalid email address' }),
            phoneNumber: z
                .string()
                .regex(new RegExp(/^(?:\+88|88)?(01[3-9]\d{8})$/), { message: 'Not a valid Bangladeshi number' }),

            password: z.string().min(5, { message: 'Please insert your password.' }),
            confirmPassword: z.string().min(5, { message: 'Please insert your confirm password.' }),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: 'Password do not match',
            path: ['confirmPassword'],
        });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegistrationFormData>({ resolver: zodResolver(registrationSchema) });

    // form submit
    const submitRegistrationForm = async (data: RegistrationFormData) => {
        // api call
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
                        <FormControl isInvalid={Boolean(errors.organizationName)}>
                            <FormLabel
                                htmlFor="organizationName"
                                className="mb-1.5 block text-sm font-medium text-gray-700"
                            >
                                Organization Name
                            </FormLabel>

                            <Input
                                id="organizationName"
                                placeholder="Organization Name"
                                className="w-full"
                                type={'text'}
                                {...register('organizationName')}
                            />
                            <FormErrorMessage>
                                {errors.organizationName && errors.organizationName.message?.toString()}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={Boolean(errors.address)}>
                            <FormLabel
                                htmlFor="address"
                                className="mb-1.5 mt-2.5 block text-sm font-medium text-gray-700"
                            >
                                Address
                            </FormLabel>

                            <Input
                                id="address"
                                placeholder="Address"
                                className="w-full"
                                type={'text'}
                                {...register('address')}
                            />
                            <FormErrorMessage>{errors.address && errors.address.message?.toString()}</FormErrorMessage>
                        </FormControl>

                        <div className="mt-2.5 flex gap-6">
                            <FormControl isInvalid={Boolean(errors.email)}>
                                <FormLabel
                                    htmlFor="email"
                                    className="mb-1.5 mt-2.5 block flex gap-6 text-sm font-medium text-gray-700"
                                >
                                    Email
                                </FormLabel>

                                <Input
                                    id="email"
                                    placeholder="Email"
                                    className="w-full"
                                    type={'text'}
                                    {...register('email')}
                                />
                                <FormErrorMessage>{errors.email && errors.email.message?.toString()}</FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={Boolean(errors.phoneNumber)}>
                                <FormLabel
                                    htmlFor="phoneNumber"
                                    className="mb-1.5 mt-2.5 block flex gap-6 text-sm font-medium text-gray-700"
                                >
                                    Phone Number
                                </FormLabel>

                                <Input
                                    id="phoneNumber"
                                    placeholder="Phone Number"
                                    className="w-full"
                                    type={'text'}
                                    {...register('phoneNumber')}
                                />
                                <FormErrorMessage>
                                    {errors.phoneNumber && errors.phoneNumber.message?.toString()}
                                </FormErrorMessage>
                            </FormControl>
                        </div>

                        <div className="mt-2.5 flex gap-6">
                            <FormControl isInvalid={Boolean(errors.password)}>
                                <FormLabel
                                    htmlFor="password"
                                    className="mb-1.5 mt-2.5 block flex gap-6 text-sm font-medium text-gray-700"
                                >
                                    Password
                                </FormLabel>

                                <Input
                                    id="password"
                                    placeholder="Password"
                                    className="w-full"
                                    type={'password'}
                                    {...register('password')}
                                />
                                <FormErrorMessage>
                                    {errors.password && errors.password.message?.toString()}
                                </FormErrorMessage>
                            </FormControl>

                            <FormControl isInvalid={Boolean(errors.confirmPassword)}>
                                <FormLabel
                                    htmlFor="confirmPassword"
                                    className="mb-1.5 mt-2.5 block flex gap-6 text-sm font-medium text-gray-700"
                                >
                                    Confirm Password
                                </FormLabel>

                                <Input
                                    id="confirmPassword"
                                    placeholder="Confirm Password"
                                    className="w-full"
                                    type={'password'}
                                    {...register('confirmPassword')}
                                />
                                <FormErrorMessage>
                                    {errors.confirmPassword && errors.confirmPassword.message?.toString()}
                                </FormErrorMessage>
                            </FormControl>
                        </div>

                        <Button px={'10'} className="mt-8" colorScheme={'brand'} isLoading={isSubmitting} type="submit">
                            Submit
                        </Button>
                    </form>
                    {/* <CustomTextInput placeholder="Organization Name" label="Organization Name" /> */}
                    {/* <CustomTextInput className="mt-2.5" label="Adress" placeholder={'Address'} /> */}
                    {/* <div className="mt-2.5 flex gap-6">
                        <CustomTextInput placeholder="Email" className="w-full" label="Email" type={'email'} />
                        <CustomTextInput className="w-full" placeholder="Phone Number" label="Phone Number" />
                    </div> */}

                    {/* <div className="mt-2.5 flex gap-6">
                        <CustomTextInput placeholder="Password" className="w-full" label="Password" type={'password'} />
                        <CustomTextInput
                            placeholder="Confirm Password"
                            className="w-full"
                            label="Confirm Password"
                            type={'password'}
                        />
                    </div> */}
                    {/* <Link href={'/dashboard'}>
                        <Button px={'10'} className="mt-8" colorScheme={'brand'}>
                            Submit
                        </Button>
                    </Link> */}
                </div>
            </div>
        </section>
    );
};

Registration.getLayout = (page: ReactNode) => {
    return <BaseLayout className="flex min-h-screen flex-col bg-brand-25/50">{page}</BaseLayout>;
};

export default Registration;
