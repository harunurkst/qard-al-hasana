import { Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Router from 'next/router';
import ReactPaginate from 'react-paginate';

const taams = [
    {
        id: '1',
        name: 'Beli',
        totalMember: 300,
        cashInhand: 4000,
        totalIncome: 2434,
        totalLoan: 8999,
    },
    {
        id: '2',
        name: 'Rajani Gandha',
        totalMember: 300,
        cashInhand: 4000,
        totalIncome: 2434,
        totalLoan: 8999,
    },
    {
        id: '3',
        name: 'Taam 1',
        totalMember: 300,
        cashInhand: 4000,
        totalIncome: 2434,
        totalLoan: 8999,
    },
    {
        id: '4',
        name: 'Chandra Branch',
        totalMember: 300,
        cashInhand: 4000,
        totalIncome: 2434,
        totalLoan: 8999,
    },
    {
        id: '5',
        name: 'Chandra Branch',
        totalMember: 300,
        cashInhand: 4000,
        totalIncome: 2434,
        totalLoan: 8999,
    },
    {
        id: '6',
        name: 'Chandra Branch',
        totalMember: 300,
        cashInhand: 4000,
        totalIncome: 2434,
        totalLoan: 8999,
    },
    {
        id: '7',
        name: 'Chandra Branch',
        totalMember: 300,
        cashInhand: 4000,
        totalIncome: 2434,
        totalLoan: 8999,
    },
    {
        id: '8',
        name: 'Chandra Branch',
        totalMember: 300,
        cashInhand: 4000,
        totalIncome: 2434,
        totalLoan: 8999,
    },
];

const TeamsTable = () => {
    return (
        <>
            <TableContainer>
                <Table fontSize={14} variant="simple" colorScheme={'gray'}>
                    <Thead background={'#f2f4f5'}>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Name</Th>
                            <Th isNumeric>Member</Th>
                            <Th isNumeric>Loan</Th>
                            <Th isNumeric>Cash</Th>
                            <Th isNumeric>Income</Th>
                            <Th isNumeric></Th>
                        </Tr>
                    </Thead>
                    <Tbody className="text-gray-600">
                        {taams.map((data) => {
                            return (
                                <Tr
                                    onClick={() => Router.push(`/branch/${data.id}`)}
                                    key={data.id}
                                    className="cursor-pointer hover:bg-gray-50"
                                >
                                    <Td>{data.id}</Td>
                                    <Td>{data.name}</Td>
                                    <Td isNumeric> {data.totalMember}</Td>
                                    <Td isNumeric> {data.totalLoan}</Td>
                                    <Td isNumeric> {data.cashInhand}</Td>
                                    <Td isNumeric> {data.totalIncome}</Td>
                                    <Td isNumeric gap={2}>
                                        <span className="mr-5 font-semibold text-gray-500 hover:text-gray-600">
                                            Edit
                                        </span>
                                        <span className="font-semibold text-red-500 hover:text-red-600">Delete</span>
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
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        </>
    );
};

export default TeamsTable;
