import { VerticalDotIcon } from '@/icons';
import getWeekNumberOfCurrentMonth from '@/utils/getWeekNoOfCurrentMonth';
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
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { MemberInstallmentType } from '../../../types/memberInstallment.type';
// import { useMemberSavingsStore } from '../stores/useMemberSavingsStore';
import { useMemberInstallmentsStore } from '../stores/useMemberInstallmentsStore';
import InstallmentModal from './InstallmentModal';

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
interface IMemberInstallmentsTable {
    teamId: string | string[] | undefined;
}
const MemberInstallmentsTable: React.FC<IMemberInstallmentsTable> = ({ teamId }) => {
    const router = useRouter();
    const [isOpenInstallmentModal, setOpenInstallmentModal] = useState(false);

    // use the hook to fetch member savings
    const { setTransactions, setSelectedMember } = useMemberInstallmentsStore((state) => state.actions);
    const { data } = useQuery(['memberInstallments'], async () =>
        zodSafeQuery(`/api/v1/transaction/member-installment-list?teamId=${teamId}`)()
    );
    // console.log('data', data?.result, isFetching, error);
    // useEffect(() => {
    // console.log('memberTransactions', memberTransactions);
    // }, [memberTransactions]);
    setTransactions(data?.result);

    if (!data) {
        return <div className="flex h-[200px] items-center justify-center">Loading...</div>;
    }

    return (
        <>
            {isOpenInstallmentModal && (
                <InstallmentModal isOpen={isOpenInstallmentModal} onClose={() => setOpenInstallmentModal(false)} />
            )}

            {/* member list table started here */}
            <TableContainer>
                <Table fontSize={14} variant="simple" colorScheme={'gray'}>
                    <Thead background={'#f2f4f5'}>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Name</Th>
                            <Th>Guardian Name</Th>

                            <Th>Week 1</Th>
                            <Th>Week 2</Th>
                            <Th>Week 3</Th>
                            <Th>Week 4</Th>
                            <Th isNumeric>Installment</Th>
                            <Th isNumeric>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody className="text-gray-600">
                        {data.result?.map((data: MemberInstallmentType) => {
                            return (
                                <Tr key={data.member_id} className="hover:bg-gray-50">
                                    <Td>{data.member_id}</Td>
                                    <Td>{data.member_name}</Td>
                                    {/* <Td className="capitalize">
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
                                    </Td> */}
                                    <Td>{data.guardian_name}</Td>
                                    <TrasectionTD amount={data.week1} weekNo={1} />
                                    <TrasectionTD amount={data.week2} weekNo={2} />
                                    <TrasectionTD amount={data.week3} weekNo={3} />
                                    <TrasectionTD amount={data.week4} weekNo={4} />
                                    <Td isNumeric> {data.loan_balance}</Td>
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
                                                        router.push(`member/${data.member_id}`);
                                                    }}
                                                >
                                                    View
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        // console.log('data',data)
                                                        setSelectedMember(data);
                                                        setOpenInstallmentModal(true);
                                                    }}
                                                >
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

export default MemberInstallmentsTable;
