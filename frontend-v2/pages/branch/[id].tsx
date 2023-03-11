import {
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

const BranchDetailsPage = () => {
    const [isOpenEditModal, setOpenEditModal] = useState(false);

    return (
        <section className="container mx-auto py-8">
            <EditBranchModal isOpen={isOpenEditModal} onClose={() => setOpenEditModal(false)} />
            <div
                className="rounded-xl border border-gray-200 bg-white"
                style={{ boxShadow: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)' }}
            >
                <div className="flex items-center justify-between border-b border-gray-200 py-5 px-5">
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
                                Cash : 200
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
                                            d="M13.5295 8.35186C12.9571 8.75995 12.2566 9 11.5 9C9.567 9 8 7.433 8 5.5C8 3.567 9.567 2 11.5 2C12.753 2 13.8522 2.65842 14.4705 3.64814M6 20.0872H8.61029C8.95063 20.0872 9.28888 20.1277 9.61881 20.2086L12.3769 20.8789C12.9753 21.0247 13.5988 21.0388 14.2035 20.9214L17.253 20.3281C18.0585 20.1712 18.7996 19.7854 19.3803 19.2205L21.5379 17.1217C22.154 16.5234 22.154 15.5524 21.5379 14.9531C20.9832 14.4134 20.1047 14.3527 19.4771 14.8103L16.9626 16.6449C16.6025 16.9081 16.1643 17.0498 15.7137 17.0498H13.2855L14.8311 17.0498C15.7022 17.0498 16.4079 16.3633 16.4079 15.5159V15.2091C16.4079 14.5055 15.9156 13.892 15.2141 13.7219L12.8286 13.1417C12.4404 13.0476 12.0428 13 11.6431 13C10.6783 13 8.93189 13.7988 8.93189 13.7988L6 15.0249M20 6.5C20 8.433 18.433 10 16.5 10C14.567 10 13 8.433 13 6.5C13 4.567 14.567 3 16.5 3C18.433 3 20 4.567 20 6.5ZM2 14.6L2 20.4C2 20.9601 2 21.2401 2.10899 21.454C2.20487 21.6422 2.35785 21.7951 2.54601 21.891C2.75992 22 3.03995 22 3.6 22H4.4C4.96005 22 5.24008 22 5.45399 21.891C5.64215 21.7951 5.79513 21.6422 5.89101 21.454C6 21.2401 6 20.9601 6 20.4V14.6C6 14.0399 6 13.7599 5.89101 13.546C5.79513 13.3578 5.64215 13.2049 5.45399 13.109C5.24008 13 4.96005 13 4.4 13L3.6 13C3.03995 13 2.75992 13 2.54601 13.109C2.35785 13.2049 2.20487 13.3578 2.10899 13.546C2 13.7599 2 14.0399 2 14.6Z"
                                            className="stroke-brand-500"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                Cash : 200
                            </div>
                            <div className="flex items-center gap-2 pl-2 text-sm">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-100">
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M13.5295 8.35186C12.9571 8.75995 12.2566 9 11.5 9C9.567 9 8 7.433 8 5.5C8 3.567 9.567 2 11.5 2C12.753 2 13.8522 2.65842 14.4705 3.64814M6 20.0872H8.61029C8.95063 20.0872 9.28888 20.1277 9.61881 20.2086L12.3769 20.8789C12.9753 21.0247 13.5988 21.0388 14.2035 20.9214L17.253 20.3281C18.0585 20.1712 18.7996 19.7854 19.3803 19.2205L21.5379 17.1217C22.154 16.5234 22.154 15.5524 21.5379 14.9531C20.9832 14.4134 20.1047 14.3527 19.4771 14.8103L16.9626 16.6449C16.6025 16.9081 16.1643 17.0498 15.7137 17.0498H13.2855L14.8311 17.0498C15.7022 17.0498 16.4079 16.3633 16.4079 15.5159V15.2091C16.4079 14.5055 15.9156 13.892 15.2141 13.7219L12.8286 13.1417C12.4404 13.0476 12.0428 13 11.6431 13C10.6783 13 8.93189 13.7988 8.93189 13.7988L6 15.0249M20 6.5C20 8.433 18.433 10 16.5 10C14.567 10 13 8.433 13 6.5C13 4.567 14.567 3 16.5 3C18.433 3 20 4.567 20 6.5ZM2 14.6L2 20.4C2 20.9601 2 21.2401 2.10899 21.454C2.20487 21.6422 2.35785 21.7951 2.54601 21.891C2.75992 22 3.03995 22 3.6 22H4.4C4.96005 22 5.24008 22 5.45399 21.891C5.64215 21.7951 5.79513 21.6422 5.89101 21.454C6 21.2401 6 20.9601 6 20.4V14.6C6 14.0399 6 13.7599 5.89101 13.546C5.79513 13.3578 5.64215 13.2049 5.45399 13.109C5.24008 13 4.96005 13 4.4 13L3.6 13C3.03995 13 2.75992 13 2.54601 13.109C2.35785 13.2049 2.20487 13.3578 2.10899 13.546C2 13.7599 2 14.0399 2 14.6Z"
                                            className="stroke-brand-600"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                Cash : 200
                            </div>
                        </div>
                    </div>

                    <div>
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
                <div className="flex justify-between border-b border-gray-200 py-4 px-5">
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

BranchDetailsPage.getLayout = (page: ReactNode) => {
    return <DashboardLayout className="min-h-screen">{page}</DashboardLayout>;
};

export default BranchDetailsPage;
