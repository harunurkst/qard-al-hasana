import isRouterPathnameMatched from '@/utils/isRouterPathnameMatched';
import { Avatar, Button } from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const navItems = [
    {
        name: 'Dashbaord',
        href: '/dashboard',
        exact: true,
    },
    {
        name: 'Branch',
        href: '/branch',
        exact: false,
    },
    // {
    //     name: 'Team',
    //     href: '/team',
    //     exact: false,
    // },
    {
        name: 'Withdraw',
        href: '/withdraw',
        exact: false,
    },
    {
        name: 'Accounts',
        href: '/accounts',
        exact: false,
    },
];

const DashboardNavbar = () => {
    // const { data: session, status } = useSession();
    const router = useRouter();

    //handling Logout
    const handleRedirectToLogin = () => {
        signOut({ callbackUrl: '/login' });
    };

    return (
        <header className="flex h-16 items-center border-b bg-white">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex gap-12">
                    <Link className="no-underline!" href={'/dashboard'}>
                        <h1 className="text-3xl font-bold text-brand-600 no-underline">Qard al-Hasan</h1>
                    </Link>
                    <div className="flex">
                        {navItems.map((item) => {
                            return (
                                <Link key={item.href} href={item.href}>
                                    <Button
                                        color={'gray.700'}
                                        _hover={{ bg: '#EDF2F7' }}
                                        colorScheme={
                                            isRouterPathnameMatched(item.href, router.pathname, item.exact)
                                                ? 'gray'
                                                : 'whiteAlpha'
                                        }
                                    >
                                        {item.name}
                                    </Button>
                                </Link>
                            );
                        })}
                    </div>
                </div>
                <div className="flex items-center">
                    <Avatar size={'md'} name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                    <span className="ml-4 cursor-pointer font-semibold" onClick={handleRedirectToLogin}>
                        Log Out
                    </span>
                </div>
            </div>
        </header>
    );
};

export default DashboardNavbar;
