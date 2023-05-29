import { VerticalDotIcon } from '@/icons';
import getWeekNumberOfCurrentMonth from '@/utils/getWeekNoOfCurrentMonth';
import zodSafeQuery from '@/utils/zodSafeQuery';
import {
    Button,
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
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { MemberSavingsType } from '../../../types/memberSaving.type';
import DespositeModal from '../../member/components/DepositeModal';
import InstallmentModal from '../../member/components/InstallmentModal';
import { useMemberSavingsStore } from '../stores/useMemberSavingsStore';

function getStatusBasedOnWeek(baseWeekNo: number, currentWeekNo: number, amount: number) {
    if (amount) return 'DONE';

    if ((baseWeekNo === currentWeekNo || baseWeekNo < currentWeekNo) && !!amount) {
        return 'DONE';
    }

    if (baseWeekNo < currentWeekNo && !amount) {
        return 'MISS_DATE';
    }

    return 'PENDING';
}

const MemberSavingsTable = () => {
    const router = useRouter();
    const [isOpenDepositeModal, setOpenDepositeModal] = useState(false);
    const [isOpenInstallmentModal, setOpenInstallmentModal] = useState(false);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const handlePageChange = (event: { selected: number }) => {
        setPageNumber(event.selected);
    };
    // use the hook to fetch member savings
    const memberTransactions = useMemberSavingsStore((state) => state.memberTransactions);
    const setTransactions = useMemberSavingsStore((state) => state.actions.setTransactions);
    const { data, isFetching, error } = useQuery(['memberSaving'], async () =>
        zodSafeQuery('/api/v1/transaction/member-savings-list')()
    );
    console.log('data', data?.result, isFetching, error);
    useEffect(() => {
        console.log('memberTransactions', memberTransactions);
    }, [memberTransactions]);
    setTransactions(data?.result);

    if (!data) {
        return <div className="flex h-[200px] items-center justify-center">Loading...</div>;
    }

    return (
        <>
            {/* Modal component used here */}
            <DespositeModal isOpen={isOpenDepositeModal} onClose={() => setOpenDepositeModal(false)} />
            <InstallmentModal isOpen={isOpenInstallmentModal} onClose={() => setOpenInstallmentModal(false)} />

            {/* member list table started here */}
            <TableContainer>
                <Table fontSize={14} variant="simple" colorScheme={'gray'}>
                    <Thead background={'#f2f4f5'}>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Name</Th>
                            <Th>Account type</Th>

                            <Th>Week 1</Th>
                            <Th>Week 2</Th>
                            <Th>Week 3</Th>
                            <Th>Week 4</Th>
                            <Th isNumeric>Deposit / Credit</Th>
                            <Th isNumeric>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody className="text-gray-600">
                        {data.result?.map((data: MemberSavingsType) => {
                            return (
                                <Tr key={data.member_id} className="hover:bg-gray-50">
                                    <Td>{data.member_id}</Td>
                                    <Td>{data.member_name}</Td>
                                    <Td className="capitalize">
                                        <div>
                                            <span
                                                className={`rounded-2xl  px-2.5 py-1 text-xs font-medium ${
                                                    data.member_id % 2 === 0
                                                        ? ' bg-brand-100 text-brand-600 '
                                                        : 'bg-error-200 text-error-600'
                                                }`}
                                            >
                                                {data.member_id % 2 === 0 ? 'deposit' : 'loan'}
                                            </span>
                                        </div>
                                    </Td>

                                    <TrasectionTD amount={data.week1} weekNo={1} />
                                    <TrasectionTD amount={data.week2} weekNo={2} />
                                    <TrasectionTD amount={data.week3} weekNo={3} />
                                    <TrasectionTD amount={data.week4} weekNo={4} />
                                    <Td isNumeric> {data.balance}</Td>
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
                                                    onClick={() => {
                                                        router.push('member/1');
                                                    }}
                                                >
                                                    View
                                                </MenuItem>
                                                <MenuItem onClick={() => setOpenDepositeModal(true)}>Deposit</MenuItem>
                                                <MenuItem onClick={() => setOpenInstallmentModal(true)}>
                                                    InstallMent
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
                    forcePage={pageNumber}
                    previousClassName="hidden"
                    nextClassName="hidden"
                    pageLinkClassName="h-10 cursor-pointer flex items-center justify-center w-10 text-gray-800 font-medium text-sm rounded-lg hover:bg-gray-100"
                    activeClassName="bg-gray-200 rounded-lg"
                    containerClassName="flex items-center"
                    breakLabel="..."
                    breakClassName="h-10 flex items-center justify-center px-2 text-gray-800 font-bold text-base"
                    pageRangeDisplayed={5}
                    pageCount={10}
                    onPageChange={handlePageChange}
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

const TrasectionTD = ({ amount, weekNo }: { amount: number; weekNo: number }) => {
    const status = useMemo(() => getStatusBasedOnWeek(weekNo, getWeekNumberOfCurrentMonth(), amount), [weekNo, amount]);

    return (
        <Td
            className={`${
                status === 'MISS_DATE'
                    ? 'font-semibold text-red-500'
                    : status === 'DONE'
                    ? 'text-brand-500'
                    : 'text-warning-400'
            }`}
        >
            {' '}
            {status === 'DONE' ? amount : status === 'MISS_DATE' ? 'DUE' : 'PENDING'}{' '}
        </Td>
    );
};

export default MemberSavingsTable;
