import { LoanIcon, LoanPlusIcon, PersonPlusIcon } from '@/icons';
import DashboardLayout from '@/Layouts/DashboardLayout';
import Analytics from '@/modules/dashboard/components/Analytics';
import { ReactNode } from 'react';

const Dashboard = () => {
    return (
        <div className="container mx-auto">
            <h1 className="mb-6 mt-8 text-3xl font-semibold text-gray-900">Welcome back, Chandpur Islamic Socity</h1>
            <Analytics />
            <section className="w-full pb-8">
                <div className="flex gap-6">
                    <div
                        style={{ boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)' }}
                        className="flex w-4/12 cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-5 "
                    >
                        <PersonPlusIcon />
                        <div>
                            <h5 className="mb-0.5 text-base font-semibold text-gray-700">Create new member</h5>
                            <p className="text-sm font-normal text-gray-600">Add yourself or import from CSV</p>
                        </div>
                    </div>
                    <div
                        style={{ boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)' }}
                        className="flex w-4/12 cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-5 "
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50">
                            {/* <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M16 18H22M22 10H2M22 13.5V8.2C22 7.0799 22 6.51984 21.782 6.09202C21.5903 5.7157 21.2843 5.40974 20.908 5.21799C20.4802 5 19.9201 5 18.8 5H5.2C4.0799 5 3.51984 5 3.09202 5.21799C2.7157 5.40973 2.40973 5.71569 2.21799 6.09202C2 6.51984 2 7.0799 2 8.2V15.8C2 16.9201 2 17.4802 2.21799 17.908C2.40973 18.2843 2.71569 18.5903 3.09202 18.782C3.51984 19 4.0799 19 5.2 19H12"
                                    className="stroke-brand-600"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg> */}
                            <LoanIcon height={20} width={20} className="stroke-brand-600" />
                        </div>

                        <div>
                            <h5 className="mb-0.5 text-base font-semibold text-gray-700">Create new loan</h5>
                            <p className="text-sm font-normal text-gray-600">Dive into the editor and start creating</p>
                        </div>
                    </div>
                    <div
                        style={{ boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)' }}
                        className="flex w-4/12 cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-5 "
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50">
                            <LoanPlusIcon />
                        </div>

                        <div>
                            <h5 className="mb-0.5 text-base font-semibold text-gray-700">Create new deposit</h5>
                            <p className="text-sm font-normal text-gray-600">Dive into the editor and start creating</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

Dashboard.getLayout = (page: ReactNode) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default Dashboard;
