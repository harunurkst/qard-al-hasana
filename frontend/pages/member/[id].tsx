import DashboardLayout from '@/Layouts/DashboardLayout';
import zodSafeQuery from '@/utils/zodSafeQuery';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import DepositBarChart from './depositeChart';
import InstallMentGraph from './installmentGraph';

//Modals are imported here
import CommonBreadCrumb, { SingleBreadCrumbItemType } from '@/components/CommonBreadCrumb';
import DisbursementModal from '@/modules/member/components/DisbursementModal';
import EditMemberModal from '@/modules/member/components/EditMemberModal';
import WithdrawModal from '@/modules/member/components/WithdrawModal';

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
    const router = useRouter();
    const { data: session, status } = useSession();
    const role = session?.user?.role;
    const branch_id = session?.user?.branch;
    const { teamId } = router.query;
    console.log('team team id in memeber detail: ', teamId);

    const [openDisbursementModal, setDisbursementModal] = useState(false);
    const [openWithdrawModal, setWithdrawModal] = useState(false);
    const [openEditMemberModal, setEditMemberModal] = useState(false);
    // useEffect(() => {
    //     if (status == 'unauthenticated') {
    //         router.push('/login');
    //     }
    // });
    const id = router.query;
    const memberId = id.id;

    //get member details
    const { data, isLoading } = useQuery(['member'], async () =>
        zodSafeQuery(`/api/v1/peoples/members/${memberId}/`)()
    );
    const member = data?.result;

    //handle disbursement
    const disbursement = () => {
        setDisbursementModal(true);
    };

    //handle bredcrumb
    const breadcrumbItems: SingleBreadCrumbItemType[] =
        role === 'BO'
            ? [
                  {
                      label: 'Branch',
                      href: `/branch/${branch_id}`,
                  },
                  {
                      label: `Team`,
                      href: `/team/${teamId}`,
                  },
                  {
                      label: `${member?.name}`,
                      href: `/member/${memberId}`,
                  },
              ]
            : [
                  {
                      label: 'Dashboard',
                      href: `/dashboard`,
                  },
                  //   {
                  //       label: 'Branch',
                  //       href: `/branch/${branch_id}`,
                  //   },
                  //   {
                  //       label: `${teamName}`,
                  //       href: `/team/${teamId}`,
                  //   },
              ];

    return (
        <>
            <section className="container mx-auto">
                {/* modals are here */}
                {openDisbursementModal && (
                    <DisbursementModal
                        isOpen={openDisbursementModal}
                        onClose={() => setDisbursementModal(false)}
                        member={member}
                    />
                )}

                {openWithdrawModal && (
                    <WithdrawModal isOpen={openWithdrawModal} onClose={() => setWithdrawModal(false)} member={member} />
                )}

                {openEditMemberModal && (
                    <EditMemberModal
                        isOpen={openEditMemberModal}
                        onClose={() => setEditMemberModal(false)}
                        member={member}
                    />
                )}
                {/* =========breadcrumb =============*/}
                <div className="mb-5 mt-10">
                    <CommonBreadCrumb items={breadcrumbItems} />
                </div>
                {/*=============== basic info section =====================*/}

                <div className="user-basic-info mb-10 flex space-x-20">
                    <div className="user-info w-full rounded-md bg-gray-200 p-10">
                        <dt className="space-y-3">
                            <dl className="flex">
                                <dd className="w-3/12">Name</dd>
                                <dd className="mr-5">:</dd>
                                <dd>{member?.name}</dd>
                            </dl>
                            <dl className="flex">
                                <dd className="w-3/12">Guardian Name</dd>
                                <dd className="mr-5">:</dd>
                                <dd>{member?.guardian_name}</dd>
                            </dl>
                            <dl className="flex">
                                <dd className="w-3/12">Mobile</dd>
                                <dd className="mr-5">:</dd>
                                <dd>{member?.mobile_number}</dd>
                            </dl>
                            <dl className="flex">
                                <dd className="w-3/12">Team</dd>
                                <dd className="mr-5">:</dd>
                                <dd>{member?.team}</dd>
                            </dl>
                            <dl className="flex">
                                <dd className="w-3/12">S/L</dd>
                                <dd className="mr-5">:</dd>
                                <dd>{member?.serial_number}</dd>
                            </dl>
                            <dl className="flex">
                                <dd className="w-3/12">Join Date</dd>
                                <dd className="mr-5">:</dd>
                                <dd>12-03-2020</dd>
                            </dl>
                        </dt>
                    </div>
                    <div className="user-info w-full rounded-md bg-gray-200 p-10">
                        <dt className="space-y-3">
                            <dl className="flex">
                                <dd className="w-3/12">Total Savings</dd>
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
                {/*==================== Total savings/deposit Section ============================*/}
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
                        <DepositBarChart shape={TriangleBar} />
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

                {/*====================================disbursement, withdraw and edit button====================== */}
                <div className="button-section mb-10 flex gap-4">
                    <button
                        className="w-24 rounded bg-brand-700 p-2 text-white"
                        onClick={() => setEditMemberModal(true)}
                    >
                        Edit
                    </button>
                    <button className=" w-30 rounded bg-brand-700 p-2 text-white" onClick={disbursement}>
                        কর্জ প্রদান
                    </button>
                    <button className="w-24 rounded bg-brand-700 p-2 text-white" onClick={() => setWithdrawModal(true)}>
                        সঞ্চয় উঠানো
                    </button>
                </div>
            </section>
        </>
    );
};

MemberDetailPage.getLayout = (page: ReactNode) => {
    return <DashboardLayout className="min-h-screen">{page}</DashboardLayout>;
};

export default MemberDetailPage;
