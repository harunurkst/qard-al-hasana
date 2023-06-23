import { useMemberSavingsStore } from '@/modules/team/stores/useMemberSavingsStore';
import getWeekNumberOfCurrentMonth from '@/utils/getWeekNoOfCurrentMonth';
import { Table, TableContainer, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

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
interface IMemberTableOfBranch {
    teamId: string | string[] | undefined;
}

//pdf styling

const IMemberTableOfBranch: React.FC<IMemberTableOfBranch> = ({ teamId }) => {
    // const pdfRef = useRef();
    const router = useRouter();
    const [isOpenDepositModal, setOpenDepositModal] = useState(false);

    const { data: session, status } = useSession();

    // use the hook to fetch member savings
    // const memberTransactions = useMemberSavingsStore((state) => state.memberTransactions);
    const { setTransactions, setSelectedMember } = useMemberSavingsStore((state) => state.actions);
    // const { data } = useQuery(['memberSaving'], async () =>
    //     zodSafeQuery(`/api/v1/transaction/member-savings-list?teamId=${teamId}`)()
    // );

    // setTransactions(data?.result);

    // if (!data) {
    //     return <div className="flex h-[200px] items-center justify-center">Loading...</div>;
    // }

    return (
        <>
            <TableContainer>
                <Table fontSize={14} variant="simple" colorScheme={'gray'}>
                    <Thead background={'#f2f4f5'}>
                        <Tr>
                            <Th>SL</Th>
                            <Th>Name</Th>
                            <Th>Guardian Name</Th>
                            <Th>Phone</Th>
                            <Th>Address</Th>
                            <Th>Team</Th>
                            <Th>Balance</Th>
                            <Th>Loan</Th>
                            <Th isNumeric>Action</Th>
                        </Tr>
                    </Thead>
                    {/* <Tbody className="text-gray-600">
                        {data.result?.map((data: MemberSavingsType) => {
                            return (
                                <Tr key={data.member_id} className="hover:bg-gray-50">
                                    <Td>{data.sl}</Td>
                                    <Td
                                        onClick={() => router.push(`/member/${data.member_id}`)}
                                        className="cursor-pointer"
                                    >
                                        {data.member_name}
                                    </Td>
                                    <Td>{data.guardian_name}</Td>
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
                                                        router.push(`/member/${data.member_id}`);
                                                    }}
                                                >
                                                    View
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setSelectedMember(data);
                                                        setOpenDepositModal(true);
                                                    }}
                                                >
                                                    সঞ্চয় জমা
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </Td>
                                </Tr>
                            );
                        })}
                    </Tbody> */}
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

export default IMemberTableOfBranch;
