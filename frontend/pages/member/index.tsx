import PreviousIcon from '@/icons/PreviousIcon';
import RightIcon from '@/icons/RightIcon';
import SearchIcon from '@/icons/SearchIcon';
import { FetchedMemberType, MemberType } from '@/types/member.type';
import http from '@/utils/http';
import {
    Badge,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { NextPageContext } from 'next';
import { ReactNode, useState } from 'react';
import ReactPaginate from 'react-paginate';
import DashboardLayout from '../../src/Layouts/DashboardLayout';
import CreateMemberModal from '../../src/modules/member/components/CreateMemberModal';
import EditMemberModal from '../../src/modules/member/components/EditMemberModal';

export type Member = {
    uuid: string;
    name: string;
    mobile_number: string;
    nid_number?: string;
    guardian_name?: string;
    gender: string;
    serial_number: number;
    team?: string;
    branch: string;
    is_active: boolean;
};

export const getMemberAsync = async (pageNumber: number): Promise<FetchedMemberType> => {
    const response = await http.get<FetchedMemberType>(`/api/v1/peoples/members/?limit=5&offset=${pageNumber * 5}`);
    return response.data;
};

const MemberPage = () => {
    const [isOpenCreateModal, setOpenCreateModal] = useState(false);
    const [isOpenEditModal, setOpenEditModal] = useState(false);
    const [editData, setEditData] = useState<Member | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const handleEditModal = (data: Member) => {
        setOpenEditModal(true);
        setEditData(data);
    };

    const { data: allMembers } = useQuery<FetchedMemberType>({
        queryKey: ['members', pageNumber],
        queryFn: () => getMemberAsync(pageNumber),
    });
    const handlePageChange = (event: { selected: number }) => {
        setPageNumber(event.selected);
    };

    console.log('allMembers', allMembers?.results);

    return (
        <section className="container mx-auto pb-8 pt-4">
            <Breadcrumb>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/team">Team</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink href="/member">Member</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>

            <CreateMemberModal isOpen={isOpenCreateModal} onClose={() => setOpenCreateModal(false)} />
            {editData && (
                <EditMemberModal member={editData} isOpen={isOpenEditModal} onClose={() => setOpenEditModal(false)} />
            )}

            <div
                className="mt-5 rounded-xl border border-gray-200 bg-white"
                style={{ boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)' }}
            >
                <div className="flex items-center justify-between border-b border-gray-200 px-5 py-5">
                    <div>
                        <div className="flex content-start items-center gap-2">
                            <h3 className="text-lg font-semibold">Members</h3>
                            <div className="self-center rounded-3xl bg-brand-100/80 px-2.5 py-0.5 text-xs font-semibold text-brand-600">
                                20
                            </div>
                        </div>
                        <p className="text-sm text-gray-500">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        </p>
                    </div>

                    <div>
                        <Button
                            onClick={() => setOpenCreateModal(true)}
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
                <div className="flex justify-between border-b border-gray-200 px-5 py-4">
                    <div>
                        <InputGroup width={350}>
                            <InputLeftElement pointerEvents="none">
                                <SearchIcon />
                            </InputLeftElement>
                            <Input placeholder="Search Branch" background={'white'} focusBorderColor="brand.500" />
                        </InputGroup>
                    </div>
                    <div>
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
                    </div>
                </div>
                <TableContainer>
                    <Table fontSize={14} variant="simple" colorScheme={'gray'}>
                        <Thead background={'#f2f4f5'}>
                            <Tr>
                                <Th>Serial</Th>
                                <Th>Name</Th>
                                <Th>Mobile</Th>
                                <Th>NID</Th>
                                <Th>Gurdian</Th>
                                <Th>Gender</Th>
                                <Th>Team</Th>
                                <Th>Branch</Th>
                                <Th>Status</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody className="text-gray-600">
                            {allMembers?.results?.map((data: MemberType) => {
                                return (
                                    <Tr
                                        // onClick={() => Router.push(`/branch/${data.serial_number}`)}
                                        key={data.serial_number}
                                        className="cursor-pointer hover:bg-gray-50"
                                    >
                                        <Td>{data.serial_number}</Td>
                                        <Td>{data.name}</Td>
                                        <Td>{data.mobile_number}</Td>
                                        <Td>{data.nid_number}</Td>
                                        <Td>{data.guardian_name}</Td>
                                        <Td>{data.gender.toUpperCase()}</Td>
                                        <Td>{data.team}</Td>
                                        <Td>{data.branch}</Td>
                                        <Td>
                                            {' '}
                                            {data.is_active ? (
                                                <Badge colorScheme="green">Active</Badge>
                                            ) : (
                                                <Badge colorScheme="red">Inactive</Badge>
                                            )}
                                        </Td>
                                        <Td gap={2}>
                                            <span
                                                // onClick={(event) => {
                                                //     event.stopPropagation();
                                                //     handleEditModal(data);
                                                // }}
                                                className="mr-5 font-semibold text-gray-500 hover:text-gray-600"
                                            >
                                                Edit
                                            </span>
                                            <span className="font-semibold text-red-500 hover:text-red-600">
                                                Delete
                                            </span>
                                        </Td>
                                    </Tr>
                                );
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
                <div className="flex justify-between px-5 py-4  ">
                    <Button
                        leftIcon={<PreviousIcon />}
                        variant={'outline'}
                        onClick={() => setPageNumber(pageNumber - 1)}
                    >
                        Previous
                    </Button>
                    <ReactPaginate
                        forcePage={pageNumber}
                        previousClassName="hidden"
                        nextClassName="hidden"
                        pageLinkClassName="h-10 cursor-pointer flex items-center justify-center w-10 text-gray-800 font-medium text-sm rounded-lg hover:bg-gray-100"
                        activeClassName="bg-gray-200 rounded-lg"
                        containerClassName="flex items-center"
                        breakLabel="..."
                        breakClassName="h-10 flex items-center justify-center px-2 text-gray-800 font-bold text-base"
                        pageRangeDisplayed={5}
                        pageCount={13}
                        onPageChange={handlePageChange}
                    />
                    <Button rightIcon={<RightIcon />} variant={'outline'} onClick={() => setPageNumber(pageNumber + 1)}>
                        Next
                    </Button>
                </div>
            </div>
        </section>
    );
};

export async function getServerSideProps(context: NextPageContext) {
    const { query } = context;
    const pageNumber = query.pageNumber ? Number(query.pageNumber) : 0;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(['members'], () => getMemberAsync(pageNumber));

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}

MemberPage.getLayout = (page: ReactNode) => {
    return <DashboardLayout className="min-h-screen">{page}</DashboardLayout>;
};

export default MemberPage;
