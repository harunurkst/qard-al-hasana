import DashboardLayout from '@/Layouts/DashboardLayout';

import { Button, ButtonGroup, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { ReactNode, useState } from 'react';
// Modals are imported here

import CommonBreadCrumb, { SingleBreadCrumbItemType } from '@/components/CommonBreadCrumb';
import { PlusIcon, SearchIcon } from '@/icons';
import AccountsExpenseList from '@/modules/accounts/components/AccountExpenseList';
import AccountIncomeList from '@/modules/accounts/components/AccountIncomeList';
import ExpenseModal from '@/modules/accounts/components/ExpenseModal';
import IncomeModal from '@/modules/accounts/components/IncomeModal';
import { useRouter } from 'next/router';

const AccountsPage = () => {
    const router = useRouter();
    const { teamId } = router.query;
    const [tab, setTab] = useState<'INCOME' | 'EXPENSE'>('INCOME');

    const [isOpenIncomeModal, setIsOpenIncomeModal] = useState(false);
    const [isOpenExpenseModal, setIsOpenExpenseModal] = useState(false);
    const breadcrumbItems: SingleBreadCrumbItemType[] = [
        {
            label: 'Dashboard',
            href: '/dashboard',
        },
        {
            label: 'Branch',
            href: '/branch',
        },
        {
            label: 'Beli',
            isCurrentPage: true,
        },
    ];

    return (
        <>
            <section className="container mx-auto px-8 pb-8 pt-4">
                <CommonBreadCrumb items={breadcrumbItems} />
                <ExpenseModal isOpen={isOpenExpenseModal} onClose={() => setIsOpenExpenseModal(false)} />
                <IncomeModal isOpen={isOpenIncomeModal} onClose={() => setIsOpenIncomeModal(false)} />

                <div
                    className="mt-5 rounded-xl border border-gray-200 bg-white"
                    style={{ boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)' }}
                >
                    <div className="flex justify-between border-b border-gray-200 px-5 py-5">
                        <div>
                            <h3 className="mb-0.5 text-xl font-semibold">Branch name</h3>
                            <p className="text-sm font-medium text-gray-500">village Name, Moshjid Name</p>
                            {/* <div className="mt-2 flex gap-2 divide-x divide-gray-300 font-medium text-gray-500 ">
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-50">
                                        <CashHandIcon />
                                    </div>
                                    Cash in hand : 200
                                </div>
                                <div className="flex items-center gap-2 pl-2 text-sm">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-50">
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M16 18H22M22 10H2M22 13.5V8.2C22 7.0799 22 6.51984 21.782 6.09202C21.5903 5.7157 21.2843 5.40974 20.908 5.21799C20.4802 5 19.9201 5 18.8 5H5.2C4.0799 5 3.51984 5 3.09202 5.21799C2.7157 5.40973 2.40973 5.71569 2.21799 6.09202C2 6.51984 2 7.0799 2 8.2V15.8C2 16.9201 2 17.4802 2.21799 17.908C2.40973 18.2843 2.71569 18.5903 3.09202 18.782C3.51984 19 4.0799 19 5.2 19H12"
                                                className="stroke-brand-500"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                    Total EXPENSEs : 22323
                                </div>
                                <div className="flex items-center gap-2 pl-2 text-sm">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-50">
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M9 16L12 13M12 13L15 16M12 13V20M22 9H2M5.5 18H5.2C4.0799 18 3.51984 18 3.09202 17.782C2.71569 17.5903 2.40973 17.2843 2.21799 16.908C2 16.4802 2 15.9201 2 14.8V7.2C2 6.0799 2 5.51984 2.21799 5.09202C2.40973 4.71569 2.7157 4.40973 3.09202 4.21799C3.51984 4 4.0799 4 5.2 4H18.8C19.9201 4 20.4802 4 20.908 4.21799C21.2843 4.40974 21.5903 4.7157 21.782 5.09202C22 5.51984 22 6.0799 22 7.2V14.8C22 15.9201 22 16.4802 21.782 16.908C21.5903 17.2843 21.2843 17.5903 20.908 17.782C20.4802 18 19.9201 18 18.8 18H18.5"
                                                className="stroke-brand-500"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                    Total INCOME : 200
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 border-b border-gray-200 px-5 py-4 lg:flex-row lg:justify-between">
                        <ButtonGroup isAttached variant={'outline'}>
                            <Button
                                onClick={() => setTab('INCOME')}
                                backgroundColor={tab === 'INCOME' ? 'gray.100' : 'white'}
                            >
                                Income - (25)
                            </Button>
                            <Button
                                onClick={() => setTab('EXPENSE')}
                                backgroundColor={tab === 'EXPENSE' ? 'gray.100' : 'white'}
                            >
                                Expense - (10)
                            </Button>
                        </ButtonGroup>
                        <div className="flex flex-col gap-3 md:flex-row">
                            <InputGroup width={300}>
                                <InputLeftElement pointerEvents="none">
                                    <SearchIcon />
                                </InputLeftElement>
                                <Input placeholder="Search Branch" background={'white'} focusBorderColor="brand.500" />
                            </InputGroup>
                            <Button
                                variant={'outline'}
                                size="md"
                                leftIcon={
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M5 10H15M2.5 5H17.5M7.5 15H12.5"
                                            stroke="#344054"
                                            strokeWidth="1.66667"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                }
                            >
                                Filters
                            </Button>
                            {tab == 'EXPENSE' ? (
                                <Button
                                    onClick={() => setIsOpenExpenseModal(true)}
                                    leftIcon={<PlusIcon />}
                                    colorScheme={'brand'}
                                >
                                    Add Expense
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => setIsOpenIncomeModal(true)}
                                    leftIcon={<PlusIcon />}
                                    colorScheme={'brand'}
                                >
                                    Add Income
                                </Button>
                            )}
                        </div>
                    </div>

                    {tab == 'EXPENSE' ? <AccountsExpenseList /> : <AccountIncomeList />}
                </div>
            </section>
        </>
    );
};

AccountsPage.getLayout = (page: ReactNode) => {
    return <DashboardLayout className="min-h-screen">{page}</DashboardLayout>;
};

export default AccountsPage;
