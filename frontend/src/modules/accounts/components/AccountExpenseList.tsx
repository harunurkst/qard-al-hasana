import Pagination from '@/components/Pagination/Pagination';
import { VerticalDotIcon } from '@/icons';
import { BranchIncomeExpenseType } from '@/types/incomeExpense.type';
import { itemsLoadPerPage } from '@/utils/constants';
import zodSafeQuery from '@/utils/zodSafeQuery';
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import ExpenseModal from './ExpenseModal';

interface IAccountsExpenseList {}
const AccountsExpenseList: React.FC<IAccountsExpenseList> = () => {
    const [isOpenDepositModal, setOpenDepositModal] = useState(false);
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);

    const handlePageChange = (event: { selected: number }) => {
        setCurrentPageNumber(event.selected);
    };
    const handleClickPreviosPage = () => {
        if (currentPageNumber > 0) {
            setCurrentPageNumber(currentPageNumber - 1);
        }
    };
    const handleClickNextPage = () => {
        setCurrentPageNumber(currentPageNumber + 1);
    };
    const { data } = useQuery(['branchExpense', currentPageNumber], async () =>
        zodSafeQuery(
            `/api/v1/transaction/expense/?limit=${itemsLoadPerPage}&offset=${currentPageNumber * itemsLoadPerPage}`
        )()
    );
    console.log({ data });
    if (!data) {
        return <div className="flex h-[200px] items-center justify-center">Loading...</div>;
    }

    return (
        <>
            {isOpenDepositModal && (
                <ExpenseModal isOpen={isOpenDepositModal} onClose={() => setOpenDepositModal(false)} />
            )}

            <TableContainer>
                <Table fontSize={14} variant="simple" colorScheme={'gray'}>
                    <Thead background={'#f2f4f5'}>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Catagory</Th>
                            <Th>Date</Th>
                            <Th>Amount</Th>
                            <Th>Summary</Th>

                            <Th isNumeric>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody className="text-gray-600">
                        {data?.result?.results?.map((data: BranchIncomeExpenseType) => {
                            return (
                                <Tr key={data.id} className="hover:bg-gray-50">
                                    <Td>{data.id}</Td>
                                    <Td>{data.category}</Td>
                                    <Td>{data.date}</Td>
                                    <Td>{data.amount}</Td>
                                    <Td>{data.summary}</Td>

                                    <Td isNumeric>
                                        <Menu>
                                            <MenuButton
                                                className=" inline-flex h-8 w-8  items-center justify-center rounded-full bg-white text-gray-900 hover:border hover:border-gray-200 hover:text-brand-600"
                                                as={'button'}
                                            >
                                                <div className="flex h-full w-full items-center justify-center bg-transparent">
                                                    <VerticalDotIcon height={16} width={16} stroke="currentColor" />
                                                </div>
                                            </MenuButton>
                                            <MenuList>
                                                <MenuItem
                                                // onClick={() => {
                                                //     router.push(`/member/${data.member_id}`);
                                                // }}
                                                >
                                                    View
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
            <Pagination
                pageCount={data?.result?.count / itemsLoadPerPage}
                handlePageChange={handlePageChange}
                currentPageNumber={currentPageNumber}
                handleClickPreviosPage={handleClickPreviosPage}
                handleClickNextPage={handleClickNextPage}
            />
        </>
    );
};

export default AccountsExpenseList;
