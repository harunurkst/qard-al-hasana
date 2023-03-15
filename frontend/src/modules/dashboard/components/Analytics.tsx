import {
    BranchIcon,
    CalenderIcon, CashHandIcon, DepositIcon, ExpenseIcon, FilterIcon, IncomeIcon, LoanIcon, PersonsIcon,
    WithdrawIcon
} from '@/icons';
import Chart from '@/modules/dashboard/components/Chart';
import { Button, ButtonGroup } from '@chakra-ui/react';


const Analytics = () => {
    return (
        <section className="pb-10 pt-6">
            <div className="mb-8 flex justify-between">
                <ButtonGroup isAttached variant={'outline'}>
                    <Button backgroundColor="gray.100">All</Button>
                    <Button>This Month</Button>
                    <Button>12 Months</Button>
                    <Button>30 days</Button>
                    <Button>7 days</Button>
                    <Button>24 hours</Button>
                </ButtonGroup>
                <div className="flex gap-3">
                    <Button
                        variant={'outline'}
                        className=""
                        size={'md'}
                        leftIcon={
                            <CalenderIcon />
                        }
                    >
                        <small className="text-sm font-semibold text-gray-500"> Select dates</small>
                    </Button>
                    <Button
                        variant={'outline'}
                        size="md"
                        leftIcon={
                            <FilterIcon />
                        }
                    >
                        Filters
                    </Button>
                </div>
            </div>
            <div className="flex gap-7">
                <div className="w-7/12">
                    <Chart />
                </div>
                <div className="w-5/12">
                    <div className="-mx-2  -my-2 flex flex-wrap">
                        <div className="w-6/12 px-2 py-2">
                            <div className="rounded-md bg-[#E1641D]/10 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E1641D]/20">
                                        <BranchIcon />
                                    </div>
                                    <div>
                                        <h2 className="mb-1 text-base font-medium text-gray-600">Total Branch</h2>
                                        <div className="flex items-center gap-4">
                                            <p className="text-2xl font-semibold text-gray-900">4,862</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-6/12 px-2 py-2">
                            <div className="rounded-md bg-brand-50 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-100">
                                        <PersonsIcon />
                                    </div>
                                    <div>
                                        <h2 className="mb-1 text-base font-medium text-gray-600">Total Member</h2>
                                        <div className="flex items-center gap-4">
                                            <p className="text-2xl font-semibold text-gray-900">4,862</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-6/12 px-2 py-2">
                            <div className="rounded-md  bg-[#8146D4]/10 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full  bg-[#8146D4]/20">
                                        <DepositIcon />
                                    </div>
                                    <div>
                                        <h2 className="mb-1 text-base font-medium text-gray-600">Total Deposit</h2>
                                        <div className="flex items-center gap-4">
                                            <p className="text-2xl font-semibold text-gray-900">4,862</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-6/12 px-2 py-2">
                            <div className="rounded-md  bg-[#E1999A]/10 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full  bg-[#E1999A]/20">
                                        <WithdrawIcon />
                                    </div>
                                    <div>
                                        <h2 className="mb-1 text-base font-medium text-gray-600">Total Withdraw</h2>
                                        <div className="flex items-center gap-4">
                                            <p className="text-2xl font-semibold text-gray-900">4,862</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-6/12 px-2 py-2">
                            <div className="rounded-md  bg-[#9ACCF6]/10 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full  bg-[#9ACCF6]/20">
                                        <CashHandIcon />
                                    </div>
                                    <div>
                                        <h2 className="mb-1 text-base font-medium text-gray-600">Cash In Hand </h2>
                                        <div className="flex items-center gap-4">
                                            <p className="text-2xl font-semibold text-gray-900">4,862</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-6/12 px-2 py-2">
                            <div className="rounded-md  bg-[#B5BBFD]/10 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full  bg-[#B5BBFD]/20">
                                        <ExpenseIcon />
                                    </div>
                                    <div>
                                        <h2 className="mb-1 text-base font-medium text-gray-600">Total Expense</h2>
                                        <div className="flex items-center gap-4">
                                            <p className="text-2xl font-semibold text-gray-900">4,862</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-6/12 px-2 py-2">
                            <div className="rounded-md  bg-[#EB455F]/10 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full  bg-[#EB455F]/20">
                                        <LoanIcon width={24} height={24} stroke='#EB455F' />
                                    </div>
                                    <div>
                                        <h2 className="mb-1 text-base font-medium text-gray-600">Total Loans</h2>
                                        <div className="flex items-center gap-4">
                                            <p className="text-2xl font-semibold text-gray-900">4,862</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-6/12 px-2 py-2">
                            <div className="rounded-md  bg-[#617143]/10 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full  bg-[#617143]/20">
                                        <IncomeIcon />
                                    </div>
                                    <div>
                                        <h2 className="mb-1 text-base font-medium text-gray-600">Total Income</h2>
                                        <div className="flex items-center gap-4">
                                            <p className="text-2xl font-semibold text-gray-900">4,862</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Analytics;
