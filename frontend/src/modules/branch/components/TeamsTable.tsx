/* eslint-disable no-console */
import EditGroup from '@/modules/team/components/EditGroupModal';
import zodSafeQuery from '@/utils/zodSafeQuery';
import { Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';

interface TeamObject {
    id: number;
    name: string;
    totalMember: number;
    totalLoan: number;
    cashInhand: number;
    totalIncome: number;
}

const TeamsTable = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [isOpenGroupEditModal, setIsOpenGroupEditModal] = useState(false);
    const branchId = router.query.id;

    const redirectToDetail = (teamId: number) => {
        return router.push(`/team/${teamId}`);
    };

    //greating team list using transtak query
    const { data, isFetching } = useQuery(['teams'], async () =>
        zodSafeQuery(`/api/v1/organization/teams?branch=${branchId}`)()
    );

    return (
        <>
            {/* handling team/group editing modal */}
            <EditGroup isOpen={isOpenGroupEditModal} onClose={() => setIsOpenGroupEditModal(false)} />

            {/* table of team list */}
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
                        {data &&
                            data?.result.results.map((team: TeamObject) => {
                                return (
                                    <Tr key={team.id} className=" hover:bg-gray-50">
                                        <Td>{team.id}</Td>
                                        <Td onClick={() => redirectToDetail(team.id)} className="cursor-pointer">
                                            {team.name}
                                        </Td>
                                        <Td isNumeric> {team.totalMember}</Td>
                                        <Td isNumeric> {team.totalLoan}</Td>
                                        <Td isNumeric> {team.cashInhand}</Td>
                                        <Td isNumeric> {team.totalIncome}</Td>
                                        <Td isNumeric gap={2}>
                                            <span
                                                className="mr-5 cursor-pointer font-semibold text-gray-500 hover:text-gray-600"
                                                onClick={() => setIsOpenGroupEditModal(true)}
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
