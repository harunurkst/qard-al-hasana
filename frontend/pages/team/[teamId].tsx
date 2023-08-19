import DashboardLayout from '@/Layouts/DashboardLayout';
import MemberInstallmentsTable from '@/modules/team/components/MemberInstallmentsTable';
import MemberSavingsTable from '@/modules/team/components/MemberSavingsTable';

import { Button, ButtonGroup, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { ReactNode, useState } from 'react';
// Modals are imported here
import AddMemberModal from '@/modules/member/components/CreateMemberModal';
import EditTeamInfoModal from '@/modules/team/components/EditGroupModal';

import CommonBreadCrumb, { SingleBreadCrumbItemType } from '@/components/CommonBreadCrumb';
import { CashHandIcon, DepositIcon, FilterIcon, LoanIcon, PersonPlusIcon, PlusIcon, SearchIcon } from '@/icons';
import zodSafeQuery from '@/utils/zodSafeQuery';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const TeamPage = (sessionData) => {
    const router = useRouter();
    const { teamName } = router.query;
    const { teamId } = router.query;

    const { data: session } = useSession();
    const role = session?.user?.role;
    const branch_id = session?.user?.branch;
    const sessionDetail = sessionData;
    // const role = sessionDetail?.user?.role;
    // const branch_id = sessionDetail?.user?.branch;

    const [tab, setTab] = useState<'DEPOSIT' | 'LOAN'>('DEPOSIT');

    const [isOpenAddMemberModal, setIsOpenAddMemberModal] = useState(false);
    const [isOpenTeamEditModal, setIsOpenTeamEditModal] = useState(false);

    //get team details
    const { data } = useQuery(['team'], async () => zodSafeQuery(`/api/v1/organization/teams/${teamId}/`)());
    const teamdetail = data?.result;

    const breadcrumbItems: SingleBreadCrumbItemType[] =
        role === 'BO'
            ? [
                  {
                      label: `${teamdetail?.branch_name}`,
                      href: `/branch/${branch_id}`,
                  },
                  {
                      label: `${teamName}`,
                      href: `/team/${teamId}`,
                  },
              ]
            : [
                  {
                      label: 'Dashboard',
                      href: `/dashboard`,
                  },
                  {
                      label: `${teamdetail?.branch_name}`,
                      href: `/branch/${branch_id}`,
                  },
                  {
                      label: `${teamName}`,
                      href: `/team/${teamId}`,
                  },
              ];

    return (
        <>
            <section className="container mx-auto pb-8 pt-4">
                <CommonBreadCrumb items={breadcrumbItems} />

                {isOpenAddMemberModal && (
                    <AddMemberModal isOpen={isOpenAddMemberModal} onClose={() => setIsOpenAddMemberModal(false)} />
                )}

                <EditTeamInfoModal isOpen={isOpenTeamEditModal} onClose={() => setIsOpenTeamEditModal(false)} />

                <div
                    className="mt-5 rounded-xl border border-gray-200 bg-white"
                    style={{ boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)' }}
                >
                    <div className="flex justify-between border-b border-gray-200 px-5 py-5">
                        <div>
                            <h3 className="mb-0.5 text-xl font-semibold capitalize">{teamdetail?.name}</h3>
                            <p className="text-sm font-medium text-gray-500">{teamdetail?.address}</p>
                            <div className="mt-2 flex gap-2 divide-x divide-gray-300 font-medium text-gray-500 ">
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-50">
                                        <CashHandIcon />
                                    </div>
                                    Cash in hand : "nai"
                                </div>
                                <div className="flex items-center gap-2 pl-2 text-sm">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-50">
                                        <LoanIcon />
                                    </div>
                                    কর্জ স্থিতি : {teamdetail?.total_unpaid_loan}
                                </div>
                                <div className="flex items-center gap-2 pl-2 text-sm">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-50">
                                        <DepositIcon />
                                    </div>
                                    সঞ্চয় স্থিতি : {teamdetail?.total_deposit}
                                </div>
                            </div>
                        </div>

                        <div>
                            <Button
                                onClick={() => setIsOpenTeamEditModal(true)}
                                leftIcon={<PlusIcon />}
                                variant="outline"
                                colorScheme={'gray'}
                            >
                                Edit Team
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 border-b border-gray-200 px-5 py-4 lg:flex-row lg:justify-between">
                        <ButtonGroup isAttached variant={'outline'}>
                            <Button
                                onClick={() => setTab('DEPOSIT')}
                                backgroundColor={tab === 'DEPOSIT' ? 'gray.100' : 'white'}
                            >
                                সঞ্চয় - ('nai')
                            </Button>
                            <Button
                                onClick={() => setTab('LOAN')}
                                backgroundColor={tab === 'LOAN' ? 'gray.100' : 'white'}
                            >
                                কর্জ - ({teamdetail?.active_loan})
                            </Button>
                        </ButtonGroup>
                        <div className="flex flex-col gap-3 md:flex-row">
                            <InputGroup width={300}>
                                <InputLeftElement pointerEvents="none">
                                    <SearchIcon />
                                </InputLeftElement>
                                <Input placeholder="Search Branch" background={'white'} focusBorderColor="brand.500" />
                            </InputGroup>
                            <Button variant={'outline'} size="md" leftIcon={<FilterIcon />}>
                                Filters
                            </Button>
                            <Button
                                onClick={() => setIsOpenAddMemberModal(true)}
                                leftIcon={<PersonPlusIcon />}
                                colorScheme={'brand'}
                            >
                                সদস্য ভর্তি
                            </Button>
                        </div>
                    </div>

                    {tab == 'LOAN' ? (
                        <MemberInstallmentsTable
                            teamId={teamId}
                            teamName={teamdetail?.name}
                            branchName={teamdetail?.branch_name}
                            orgName={teamdetail?.org_name}
                            teamAddress={teamdetail?.address}
                        />
                    ) : (
                        <MemberSavingsTable
                            teamId={teamId}
                            teamName={teamdetail?.name}
                            branchName={teamdetail?.branch_name}
                            orgName={teamdetail?.org_name}
                            teamAddress={teamdetail?.address}
                        />
                    )}
                </div>
            </section>
        </>
    );
};

// export const getServerSideProps = async ({ req }) => {
//     const session = await getSession({ req });
//     return {
//         props: {
//             sessionData: session,
//         },
//     };
// };

TeamPage.getLayout = (page: ReactNode) => {
    return <DashboardLayout className="min-h-screen">{page}</DashboardLayout>;
};

export default TeamPage;
