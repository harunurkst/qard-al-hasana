import DashboardLayout from '@/Layouts/DashboardLayout';
import TeamsTable from '@/modules/branch/components/TeamsTable';
import MembersTable from '@/modules/team/components/MemberSavingsTable';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button,
    ButtonGroup,
    Input,
    InputGroup,
    InputLeftElement,
} from '@chakra-ui/react';
import React, { ReactNode, useState } from 'react';

// modal imported
import EditBranchModal from '@/modules/branch/components/EditBranchModal';
import CreateNewMember from '@/modules/member/components/CreateMemberModal';
import CreateNewGroup from '@/modules/team/components/CreateGroupModal';
import { useRouter } from 'next/router';
// import EditMemberModal from '../../src/modules/member/components/EditMemberModal'

const BranchDetailsPage = (session) => {
    // const { data: session } = useSession();
    const router = useRouter();
    const branchId = router.query.id;

    const [tab, setTab] = useState<'MEMBER' | 'TEAM'>('TEAM');

    const [isOpenCreateModal, setOpenCreateModal] = useState(false); //handling group add modal
    const [isOpenAddMemberModal, setOpenAddMemberModal] = useState(false); //handling member add modal
    const [isOpenEditModal, setOpenEditModal] = useState(false); // branch editing modal
    // const [isOpenMemberEditModal, setOpenMemberEditModal] = useState(false); // branch editing modal

    const modalHandling = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (tab == 'TEAM') {
            setOpenCreateModal(true);
        } else {
            setOpenAddMemberModal(true);
        }
    };

    return (
        <section className="container mx-auto pb-8 pt-4">
            <Breadcrumb>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                    <BreadcrumbLink href="/branch">Branch</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink>Chandra Bazar Branch</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>

            {/* creating new group and new member modal */}
            {isOpenCreateModal && (
                <CreateNewGroup isOpen={isOpenCreateModal} onClose={() => setOpenCreateModal(false)} />
            )}

            <CreateNewMember isOpen={isOpenAddMemberModal} onClose={() => setOpenAddMemberModal(false)} />

            {/* editing branch and member info */}
            <EditBranchModal isOpen={isOpenEditModal} onClose={() => setOpenEditModal(false)} />
            {/* <EditMemberModal isOpen={isOpenMemberEditModal} onClose={() => setOpenMemberEditModal(false)} member={member} /> */}

            <div
                className="mt-5 rounded-xl border border-gray-200 bg-white"
                style={{ boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)' }}
            >
                <div className="flex justify-between border-b border-gray-200 px-5 py-5">
                    <div>
                        <h3 className="mb-0.5 text-xl font-semibold">Chandra Bazar Branch</h3>
                        <p className="text-sm font-medium text-gray-500">Chandra Bazar, Faridgonj, Chandpur</p>
                        <div className="mt-2 flex gap-2 divide-x divide-gray-300 font-medium text-gray-500 ">
                            <div className="flex items-center gap-2 text-sm">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-50">
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M13.5295 8.35186C12.9571 8.75995 12.2566 9 11.5 9C9.567 9 8 7.433 8 5.5C8 3.567 9.567 2 11.5 2C12.753 2 13.8522 2.65842 14.4705 3.64814M6 20.0872H8.61029C8.95063 20.0872 9.28888 20.1277 9.61881 20.2086L12.3769 20.8789C12.9753 21.0247 13.5988 21.0388 14.2035 20.9214L17.253 20.3281C18.0585 20.1712 18.7996 19.7854 19.3803 19.2205L21.5379 17.1217C22.154 16.5234 22.154 15.5524 21.5379 14.9531C20.9832 14.4134 20.1047 14.3527 19.4771 14.8103L16.9626 16.6449C16.6025 16.9081 16.1643 17.0498 15.7137 17.0498H13.2855L14.8311 17.0498C15.7022 17.0498 16.4079 16.3633 16.4079 15.5159V15.2091C16.4079 14.5055 15.9156 13.892 15.2141 13.7219L12.8286 13.1417C12.4404 13.0476 12.0428 13 11.6431 13C10.6783 13 8.93189 13.7988 8.93189 13.7988L6 15.0249M20 6.5C20 8.433 18.433 10 16.5 10C14.567 10 13 8.433 13 6.5C13 4.567 14.567 3 16.5 3C18.433 3 20 4.567 20 6.5ZM2 14.6L2 20.4C2 20.9601 2 21.2401 2.10899 21.454C2.20487 21.6422 2.35785 21.7951 2.54601 21.891C2.75992 22 3.03995 22 3.6 22H4.4C4.96005 22 5.24008 22 5.45399 21.891C5.64215 21.7951 5.79513 21.6422 5.89101 21.454C6 21.2401 6 20.9601 6 20.4V14.6C6 14.0399 6 13.7599 5.89101 13.546C5.79513 13.3578 5.64215 13.2049 5.45399 13.109C5.24008 13 4.96005 13 4.4 13L3.6 13C3.03995 13 2.75992 13 2.54601 13.109C2.35785 13.2049 2.20487 13.3578 2.10899 13.546C2 13.7599 2 14.0399 2 14.6Z"
                                            className="stroke-brand-500"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
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
                                Total Loans : 22323
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
                                Total Deposit : 200
                            </div>
                        </div>
                    </div>

                    <div>
                        <Button
                            onClick={() => setOpenEditModal(true)}
                            leftIcon={
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M18 10L14 6M2.49997 21.5L5.88434 21.124C6.29783 21.078 6.50457 21.055 6.69782 20.9925C6.86926 20.937 7.03242 20.8586 7.18286 20.7594C7.35242 20.6475 7.49951 20.5005 7.7937 20.2063L21 7C22.1046 5.89543 22.1046 4.10457 21 3C19.8954 1.89543 18.1046 1.89543 17 3L3.7937 16.2063C3.49952 16.5005 3.35242 16.6475 3.24061 16.8171C3.1414 16.9676 3.06298 17.1307 3.00748 17.3022C2.94493 17.4954 2.92195 17.7021 2.87601 18.1156L2.49997 21.5Z"
                                        stroke="#344054"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            }
                            variant="outline"
                            colorScheme={'gray'}
                        >
                            Edit Branch
                        </Button>
                    </div>
                </div>
                <div className="flex justify-between border-b border-gray-200 px-5 py-4">
                    <div>
                        <ButtonGroup isAttached variant={'outline'}>
                            <Button
                                onClick={() => setTab('TEAM')}
                                backgroundColor={tab === 'TEAM' ? 'gray.100' : 'white'}
                            >
                                Team - (100)
                            </Button>
                            <Button
                                onClick={() => setTab('MEMBER')}
                                backgroundColor={tab === 'MEMBER' ? 'gray.100' : 'white'}
                            >
                                Members - (2333){' '}
                            </Button>
                        </ButtonGroup>
                    </div>
                    <div className="flex gap-3">
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
                        <Button
                            onClick={modalHandling}
                            leftIcon={
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M9.99984 4.16669V15.8334M4.1665 10H15.8332"
                                        stroke="white"
                                        strokeWidth="1.66667"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            }
                            colorScheme={'brand'}
                        >
                            Add New
                        </Button>
                    </div>
                </div>
                {/* {tab === 'TEAM' ? <TeamsTable branchId={branchId} /> : <MembersTable />} */}
                {tab === 'TEAM' ? <TeamsTable /> : <MembersTable />}
            </div>
        </section>
    );
};

const SearchIcon = () => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M17.5 17.5L14.5834 14.5833M16.6667 9.58333C16.6667 13.4954 13.4954 16.6667 9.58333 16.6667C5.67132 16.6667 2.5 13.4954 2.5 9.58333C2.5 5.67132 5.67132 2.5 9.58333 2.5C13.4954 2.5 16.6667 5.67132 16.6667 9.58333Z"
                stroke="#667085"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

BranchDetailsPage.getLayout = (page: ReactNode) => {
    return <DashboardLayout className="min-h-screen">{page}</DashboardLayout>;
};
// export const getServerSideProps: GetServerSideProps = async (context) => {
//     const session = await getServerSession(context.req, context.res, authOptions);
//     console.log('session response:....................................................... ', session);
//     return {
//         props: {
//             session: JSON.stringify(session),
//         },
//     };
// };
export default BranchDetailsPage;
