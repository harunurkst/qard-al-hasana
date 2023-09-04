import { Button } from '@chakra-ui/react';
import Link from 'next/link';

const Navbar = () => {
    return (
        <header className="mx-auto flex h-20 w-11/12 items-center border-b bg-white">
            <div className="container mx-[32px] flex items-center justify-between">
                <Link href={'/'}>
                    <h1 className="text-3xl font-bold text-brand-600">Qard al-Hasan</h1>
                </Link>

                <div className="flex gap-3">
                    <Link href="/login">
                        <Button color={'gray.900'} colorScheme={'whiteAlpha'}>
                            Login
                        </Button>
                    </Link>
                    <Link href="/registration">
                        <Button size="md" colorScheme="brand">
                            Registration
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
