import CustomTextInput from '@/components/CustomInput';
import BaseLayout from '@/Layouts/BaseLayout';
import { Button } from '@chakra-ui/react';
import { ReactNode } from 'react';

const Login = () => {
    return (
        <section className="container mx-auto h-full flex-grow py-20">
            <div className="mx-auto max-w-3xl px-5">
                <h1 className="mb-3 text-center text-3xl font-bold text-gray-900">Login your organization</h1>
                <p className="text-bae mb-6 text-center text-gray-700">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo amet deserunt, pariatur deleniti
                    doloribus quos hic culpa non
                </p>
                <div className="w-full max-w-3xl rounded-md bg-white  p-7 shadow-md">
                    <CustomTextInput placeholder="Email" className="mb-2 w-full" label="Email" type={'email'} />
                    <CustomTextInput className="w-full" placeholder="Password" label="Password" />

                    <Button px={'10'} className="mt-8" colorScheme={'brand'}>
                        Submit
                    </Button>
                </div>
            </div>
        </section>
    );
};

Login.getLayout = (page: ReactNode) => {
    return <BaseLayout className="flex min-h-screen flex-col bg-brand-25/50">{page}</BaseLayout>;
};

export default Login;
