import CustomTextInput from '@/components/CustomInput';
import BaseLayout from '@/Layouts/BaseLayout';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import { ReactNode } from 'react';

const Registration = () => {
    return (
        <section className="container mx-auto h-full flex-grow py-20">
            <div className="mx-auto max-w-3xl px-5">
                <h1 className="mb-3 text-center text-3xl font-bold text-gray-900">Registration your organization</h1>
                <p className="text-bae mb-6 text-center text-gray-700">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo amet deserunt, pariatur deleniti
                    doloribus quos hic culpa non
                </p>
                <div className="w-full max-w-3xl rounded-md border  border-gray-200 bg-white p-7 shadow-sm">
                    <CustomTextInput placeholder="Organization Name" label="Organization Name" />
                    <CustomTextInput className="mt-2.5" label="Adress" placeholder={'Address'} />
                    <div className="mt-2.5 flex gap-6">
                        <CustomTextInput placeholder="Email" className="w-full" label="Email" type={'email'} />
                        <CustomTextInput className="w-full" placeholder="Phone Number" label="Phone Number" />
                    </div>

                    <div className="mt-2.5 flex gap-6">
                        <CustomTextInput placeholder="Password" className="w-full" label="Password" type={'password'} />
                        <CustomTextInput
                            placeholder="Confirm Password"
                            className="w-full"
                            label="Confirm Password"
                            type={'password'}
                        />
                    </div>
                    <Link href={'/dashboard'}>
                        <Button px={'10'} className="mt-8" colorScheme={'brand'}>
                            Submit
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

Registration.getLayout = (page: ReactNode) => {
    return <BaseLayout className="flex min-h-screen flex-col bg-brand-25/50">{page}</BaseLayout>;
};

export default Registration;
