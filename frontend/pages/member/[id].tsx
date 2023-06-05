import { ReactNode } from 'react';
import DashboardLayout from '../../src/Layouts/DashboardLayout';
import DepositBarChart from './depositeChart';
import InstallMentGraph from './installmentGraph';

const getPath = (x, y, width, height) =>
    `M${x},${y + height}
     C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
     C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
     Z`;

const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const MemberDetailPage = () => {
    return (
        <>
            <section className="container mx-auto">
                {/*=============== basic info section =====================*/}
                <div className="user-basic-info my-10 flex space-x-20">
                    <div className="user-info w-1/2 w-full rounded-md bg-gray-200 p-10">
                        <dt className="space-y-3">
                            <dl className="flex">
                                <dd className="w-3/12">Name</dd>
                                <dd className="mr-5">:</dd>
                                <dd>Harun-ur Rashid</dd>
                            </dl>
                            <dl className="flex">
                                <dd className="w-3/12">Guardian Name</dd>
                                <dd className="mr-5">:</dd>
                                <dd>Some one important</dd>
                            </dl>
                            <dl className="flex">
                                <dd className="w-3/12">Mobile</dd>
                                <dd className="mr-5">:</dd>
                                <dd>Harun-ur Rashid</dd>
                            </dl>
                            <dl className="flex">
                                <dd className="w-3/12">Team</dd>
                                <dd className="mr-5">:</dd>
                                <dd>655431456321</dd>
                            </dl>
                            <dl className="flex">
                                <dd className="w-3/12">S/L</dd>
                                <dd className="mr-5">:</dd>
                                <dd>2</dd>
                            </dl>
                            <dl className="flex">
                                <dd className="w-3/12">Join Date</dd>
                                <dd className="mr-5">:</dd>
                                <dd>12-03-2020</dd>
                            </dl>
                        </dt>
                    </div>
                    <div className="user-info w-1/2 w-full rounded-md bg-gray-200 p-10">
                        <dt className="space-y-3">
                            <dl className="flex">
                                <dd className="w-3/12">Totak Savings</dd>
                                <dd className="mr-5">:</dd>
                                <dd>2000 TK</dd>
                            </dl>
                            <dl className="flex">
                                <dd className="w-3/12">Last Loan</dd>
                                <dd className="mr-5">:</dd>
                                <dd>1000 TK</dd>
                            </dl>
                            <dl className="flex">
                                <dd className="w-3/12">Loan Date</dd>
                                <dd className="mr-5">:</dd>
                                <dd>12-03-2023</dd>
                            </dl>
                            <dl className="flex">
                                <dd className="w-3/12">Loan Paid</dd>
                                <dd className="mr-5">:</dd>
                                <dd>500 TK</dd>
                            </dl>
                            <dl className="flex">
                                <dd className="w-3/12">InstallMent Paid</dd>
                                <dd className="mr-5">:</dd>
                                <dd>10/12</dd>
                            </dl>
                            <dl className="flex">
                                <dd className="w-3/12">Total Loan Count</dd>
                                <dd className="mr-5">:</dd>
                                <dd>2</dd>
                            </dl>
                        </dt>
                    </div>
                </div>
                {/*==================== Total savings Section ============================*/}
                <div>
                    <div className="graphs-header">
                        <dt>
                            <dl className="flex gap-3 font-bold">
                                <dd>Total Savings</dd>
                                <dd>:</dd>
                                <dd>2000 Tk</dd>
                            </dl>
                        </dt>
                    </div>
                    <div className="graphs-body bg-gray-200" style={{ height: 300 }}>
                        <DepositBarChart />
                    </div>
                </div>
                {/*==================== Loan graph section ============================*/}
                <div className="my-11">
                    <div className="graphs-header">
                        <dt className="flex gap-3">
                            <dl className="flex gap-3 font-bold">
                                <dd>Loan</dd>
                                <dd>:</dd>
                                <dd>2500 Tk,</dd>
                            </dl>
                            <dl className="flex gap-3 font-bold">
                                <dd>Status</dd>
                                <dd>:</dd>
                                <dd>Unpaid</dd>
                            </dl>
                        </dt>
                    </div>
                    <div className="graphs-body bg-gray-200" style={{ height: 300 }}>
                        <InstallMentGraph />
                    </div>
                </div>
                {/*==================== Deposite Chart ============================*/}
                <div className=" mb-10">
                    <div className="deposit-header w-full">
                        <h2 className=" h-10 text-center text-2xl text-[#83C1EA]">Deposit Chart</h2>
                    </div>
                    <div className="sub-header mb-4 w-full">
                        <h3 className="text-center text-gray-400">My sub title</h3>
                    </div>
                    <div className="deposit-body" style={{ height: 300 }}>
                        <DepositBarChart shape={TriangleBar} />
                    </div>
                </div>
            </section>
        </>
    );
};

MemberDetailPage.getLayout = (page: ReactNode) => {
    return <DashboardLayout className="min-h-screen">{page}</DashboardLayout>;
};

export default MemberDetailPage;
