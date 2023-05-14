import {
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
import Router from 'next/router';
import { ReactNode, useState } from 'react';
import ReactPaginate from 'react-paginate';
import DashboardLayout from '../../src/Layouts/DashboardLayout';
import CreateBranchModal from '../../src/modules/branch/components/CreateBranchModal';
import EditBranchModal from '../../src/modules/branch/components/EditBranchModal';

const branches = [
    {
        id: '1',
        name: 'Chandra Branch',
        address: 'Chandra,Chandpur,Bangalades asdfa d asdf asdf as dfas df asdf asd f asdf ',
        totalMember: 300,
        totalTeams: 20,
        cashInhand: 4000,
        totalIncome: 2434,
        totalLoan: 8999,
    },
    {
        id: '2',
        name: 'Chandra Branch',
        address: 'Chandra,Chandpur,Bangalades asdfa d asdf asdf as dfas df asdf asd f asdf ',
        totalMember: 300,
        totalTeams: 20,
        cashInhand: 4000,
        totalIncome: 2434,
        totalLoan: 8999,
    },
    {
        id: '3',
        name: 'Chandra Branch',
        address: 'Chandra,Chandpur,Bangalades',
        totalMember: 300,
        totalTeams: 20,
        cashInhand: 4000,
        totalIncome: 2434,
        totalLoan: 8999,
    },
    {
        id: '4',
        name: 'Chandra Branch',
        address: 'Chandra,Chandpur',
        totalMember: 300,
        totalTeams: 20,
        cashInhand: 4000,
        totalIncome: 2434,
        totalLoan: 8999,
    },
    {
        id: '5',
        name: 'Chandra Branch',
        address: 'Chandra,Chandpur ',
        totalMember: 300,
        totalTeams: 20,
        cashInhand: 4000,
        totalIncome: 2434,
        totalLoan: 8999,
    },
    {
        id: '6',
        name: 'Chandra Branch',
        address: 'Chandra,Chandpur,Bangalades asdfa df ',
        totalMember: 300,
        totalTeams: 20,
        cashInhand: 4000,
        totalIncome: 2434,
        totalLoan: 8999,
    },
    {
        id: '7',
        name: 'Chandra Branch',
        address: 'Chandra,Chandpur,Bangalades asdfa df ',
        totalMember: 300,
        totalTeams: 20,
        cashInhand: 4000,
        totalIncome: 2434,
        totalLoan: 8999,
    },
    {
        id: '8',
        name: 'Chandra Branch',
        address: 'Chandra,Chandpur,Bangalades asdfa df ',
        totalMember: 300,
        totalTeams: 20,
        cashInhand: 4000,
        totalIncome: 2434,
        totalLoan: 8999,
    },
];

const BranchPage = () => {
    const [isOpenCreateModal, setOpenCreateModal] = useState(false);
    const [isOpenEditModal, setOpenEditModal] = useState(false);

    return (
        <section className="container mx-auto pb-8 pt-4">
            <Breadcrumb>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink href="/branch">Branch</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>

            <CreateBranchModal isOpen={isOpenCreateModal} onClose={() => setOpenCreateModal(false)} />

            <EditBranchModal isOpen={isOpenEditModal} onClose={() => setOpenEditModal(false)} />
            <div
                className="mt-5 rounded-xl border border-gray-200 bg-white"
                style={{ boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)' }}
            >
                <div className="flex items-center justify-between border-b border-gray-200 px-5 py-5">
                    <div>
                        <div className="flex content-start items-center gap-2">
                            <h3 className="text-lg font-semibold">Brances</h3>
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
                                <Th>ID</Th>
                                <Th>Name</Th>
                                <Th>Address</Th>
                                <Th isNumeric>Team</Th>
                                <Th isNumeric>Member</Th>
                                <Th isNumeric>Loan</Th>
                                <Th isNumeric>Cash</Th>
                                <Th isNumeric>Income</Th>
                                <Th isNumeric></Th>
                            </Tr>
                        </Thead>
                        <Tbody className="text-gray-600">
                            {branches.map((data) => {
                                return (
                                    <Tr
                                        onClick={() => Router.push(`/branch/${data.id}`)}
                                        key={data.id}
                                        className="cursor-pointer hover:bg-gray-50"
                                    >
                                        <Td>{data.id}</Td>
                                        <Td>{data.name}</Td>
                                        <Td className="overflow-hidden truncate" maxWidth={200}>
                                            {data.address}
                                        </Td>
                                        <Td isNumeric>{data.totalTeams}</Td>
                                        <Td isNumeric> {data.totalMember}</Td>
                                        <Td isNumeric> {data.totalLoan}</Td>
                                        <Td isNumeric> {data.cashInhand}</Td>
                                        <Td isNumeric> {data.totalIncome}</Td>
                                        <Td isNumeric gap={2}>
                                            <span
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    setOpenEditModal(true);
                                                }}
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
                        leftIcon={
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M15.8332 10.0001H4.1665M4.1665 10.0001L9.99984 15.8334M4.1665 10.0001L9.99984 4.16675"
                                    stroke="#344054"
                                    strokeWidth="1.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        }
                        variant={'outline'}
                    >
                        Previous
                    </Button>
                    <ReactPaginate
                        previousClassName="hidden"
                        nextClassName="hidden"
                        pageLinkClassName="h-10 cursor-pointer flex items-center justify-center w-10 text-gray-800 font-medium text-sm rounded-lg hover:bg-gray-100"
                        activeClassName="bg-gray-200 rounded-lg"
                        containerClassName="flex items-center"
                        breakLabel="..."
                        breakClassName="h-10 flex items-center justify-center px-2 text-gray-800 font-bold text-base"
                        pageRangeDisplayed={5}
                        pageCount={13}
                    />
                    <Button
                        rightIcon={
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M4.1665 10.0001H15.8332M15.8332 10.0001L9.99984 4.16675M15.8332 10.0001L9.99984 15.8334"
                                    stroke="#344054"
                                    strokeWidth="1.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        }
                        variant={'outline'}
                    >
                        Next
                    </Button>
                </div>
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

BranchPage.getLayout = (page: ReactNode) => {
    return <DashboardLayout className="min-h-screen">{page}</DashboardLayout>;
};

export default BranchPage;
