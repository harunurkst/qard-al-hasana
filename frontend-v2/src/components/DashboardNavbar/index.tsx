import { Avatar, Button } from '@chakra-ui/react';
import Link from 'next/link';

const DashboardNavbar = () => {
    return (
        <header className="flex h-16 items-center border-b bg-white">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex gap-12">
                    <Link className="no-underline!" href={'/'}>
                        <h1 className="text-3xl font-bold text-brand-600 no-underline">Qard al-Hasan</h1>
                    </Link>
                    <div className="flex">
                        <Link className="no-underline" href="/dashboard">
                            <Button color={'gray.700'} colorScheme={'gray'}>
                                Dashboard
                            </Button>
                        </Link>
                        <Link className="no-underline!" href="/registration">
                            <Button color={'gray.700'} size="md" colorScheme="whiteAlpha">
                                Branch
                            </Button>
                        </Link>
                        <Link className="no-underline!" href="/registration">
                            <Button color={'gray.700'} size="md" colorScheme="whiteAlpha">
                                Members
                            </Button>
                        </Link>
                        <Link className="no-underline!" href="/registration">
                            <Button color={'gray.700'} size="md" colorScheme="whiteAlpha">
                                Withdraw
                            </Button>
                        </Link>
                        <Link className="no-underline!" href="/registration">
                            <Button color={'gray.700'} size="md" colorScheme="whiteAlpha">
                                Registration
                            </Button>
                        </Link>
                    </div>
                </div>
                <div>
                    <Avatar size={'md'} name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                </div>
            </div>
        </header>
    );
};

export default DashboardNavbar;
