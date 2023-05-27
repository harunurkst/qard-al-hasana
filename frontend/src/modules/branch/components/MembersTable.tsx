import { VerticalDotIcon } from '@/icons';
import getWeekNumberOfCurrentMonth from '@/utils/getWeekNoOfCurrentMonth';
import randomNumber from '@/utils/randomNumber';
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
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';

// modals are imported here
import DespositeModal from '../../member/components/DepositeModal';
import InstallmentModal from '../../member/components/InstallmentModal';

function randomDateInMonth() {
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();

    return new Date(year, month, Math.floor(Math.random() * 31) + 1);
}

function getWeeklyWiseData(arg: { date: Date; amount: number }[]) {
    const data = {
        week_1: 0,
        week_2: 0,
        week_3: 0,
        week_4: 0,
    };

    arg.forEach((item) => {
        const dayOfMonth = item.date.getDate();
        if (dayOfMonth <= 7) {
            data.week_1 += item.amount;
        } else if (dayOfMonth > 7 && dayOfMonth <= 14) {
            data.week_2 += item.amount;
        } else if (dayOfMonth > 14 && dayOfMonth <= 21) {
            data.week_3 += item.amount;
        } else if (dayOfMonth > 21 && dayOfMonth <= 31) {
            data.week_4 += item.amount;
        }
    });

    return data;
}

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

const members = [
    {
        id: '1',
        name: 'Abdul Qadir',
        type: 'deposit',
        balance: 2323,
        loan: 0,
        transactionsInCurrentMonth: getWeeklyWiseData([
            {
                date: randomDateInMonth(),
                amount: randomNumber(50, 1000),
            },
            {
                date: randomDateInMonth(),
                amount: randomNumber(50, 1000),
            },
            {
                date: randomDateInMonth(),
                amount: randomNumber(50, 1000),
            },
            {
                date: randomDateInMonth(),
                amount: randomNumber(50, 1000),
            },
        ]),
    },
    {
        id: '2',
        name: 'Nure Alam',
        type: 'deposit',
        balance: 2323,
        loan: 0,
        transactionsInCurrentMonth: getWeeklyWiseData([
            {
                date: randomDateInMonth(),
                amount: randomNumber(50, 1000),
            },
            {
                date: randomDateInMonth(),
                amount: randomNumber(50, 100),
            },
        ]),
    },
    {
        id: '3',
        name: 'Faruq',
        type: 'loan',
        balance: 2323,
        loan: 0,
        transactionsInCurrentMonth: getWeeklyWiseData([
            {
                date: randomDateInMonth(),
                amount: randomNumber(50, 100),
            },
        ]),
    },
];

const Members = () => {
    const router = useRouter();

    // useState are handled here
    const [isOpenDepositeModal, setOpenDepositeModal] = useState(false);
    const [isOpenInstallmentModal, setOpenInstallmentModal] = useState(false);

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
                        {members.map((data) => {
                            return (
                                <Tr key={data.id} className="hover:bg-gray-50">
                                    <Td>{data.id}</Td>
                                    <Td>{data.name}</Td>
                                    <Td className="capitalize">
                                        <div>
                                            <span
                                                className={`rounded-2xl  px-2.5 py-1 text-xs font-medium ${
                                                    data.type === 'deposit'
                                                        ? ' bg-brand-100 text-brand-600 '
                                                        : 'bg-error-200 text-error-600'
                                                }`}
                                            >
                                                {data.type}
                                            </span>
                                        </div>
                                    </Td>
                                    <TrasectionTD amount={data.transactionsInCurrentMonth.week_1} weekNo={1} />
                                    <TrasectionTD amount={data.transactionsInCurrentMonth.week_2} weekNo={2} />
                                    <TrasectionTD amount={data.transactionsInCurrentMonth.week_3} weekNo={3} />
                                    <TrasectionTD amount={data.transactionsInCurrentMonth.week_4} weekNo={4} />
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

export default Members;
