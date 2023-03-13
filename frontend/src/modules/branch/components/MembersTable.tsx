import { Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Router from 'next/router';
import { useMemo } from 'react';
import ReactPaginate from 'react-paginate';

function randomDateInMonth() {
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();

    return new Date(year, month, Math.floor(Math.random() * 31) + 1);
}

function getRandomNumber() {
    return Math.floor(Math.random() * (1000 - 50 + 1)) + 50;
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

function weekNumberOfMonth(date = new Date()) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const daysOffset = firstDayOfMonth.getDay();
    const weekNumber = Math.floor((date.getDate() + daysOffset) / 7);
    return weekNumber;
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
                amount: getRandomNumber(),
            },
            {
                date: randomDateInMonth(),
                amount: getRandomNumber(),
            },
            {
                date: randomDateInMonth(),
                amount: getRandomNumber(),
            },
            {
                date: randomDateInMonth(),
                amount: getRandomNumber(),
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
                amount: getRandomNumber(),
            },
            {
                date: randomDateInMonth(),
                amount: getRandomNumber(),
            },
        ]),
    },
    {
        id: '1',
        name: 'Faruq',
        type: 'loan',
        balance: 2323,
        loan: 0,
        transactionsInCurrentMonth: getWeeklyWiseData([
            {
                date: randomDateInMonth(),
                amount: getRandomNumber(),
            },
        ]),
    },
];

const Members = () => {
    return (
        <>
            <TableContainer>
                <Table fontSize={14} variant="simple" colorScheme={'gray'}>
                    <Thead background={'#f2f4f5'}>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Name</Th>
                            <Th>Account type</Th>

                            <Th>Transection by weekly</Th>
                            <Th isNumeric>Deposit / Credit</Th>
                            <Th isNumeric></Th>
                        </Tr>
                    </Thead>
                    <Tbody className="text-gray-600">
                        {members.map((data) => {
                            return (
                                <Tr
                                    onClick={() => Router.push(`/branch/${data.id}`)}
                                    key={data.id}
                                    className="cursor-pointer hover:bg-gray-50"
                                >
                                    <Td>{data.id}</Td>
                                    <Td>{data.name}</Td>
                                    <Td> {data.type}</Td>
                                    <Td>
                                        <div className="inline-flex divide-x divide-gray-300 rounded-md  border border-gray-200">
                                            <WeeklyStatusTip
                                                amount={data.transactionsInCurrentMonth.week_1}
                                                weekNo={1}
                                            />
                                            <WeeklyStatusTip
                                                amount={data.transactionsInCurrentMonth.week_2}
                                                weekNo={2}
                                            />
                                            <WeeklyStatusTip
                                                amount={data.transactionsInCurrentMonth.week_3}
                                                weekNo={3}
                                            />
                                            <WeeklyStatusTip
                                                amount={data.transactionsInCurrentMonth.week_4}
                                                weekNo={4}
                                            />
                                        </div>
                                    </Td>
                                    <Td isNumeric> {0}</Td>
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

interface IWeeklyStatusTop {
    weekNo: number;
    amount: number;
}

const WeeklyStatusTip: React.FC<IWeeklyStatusTop> = ({ amount, weekNo }) => {
    const weekNoOfThisMonth = useMemo(() => weekNumberOfMonth(), []);
    const status = useMemo(
        () => getStatusBasedOnWeek(weekNo, weekNoOfThisMonth, amount),
        [weekNo, weekNoOfThisMonth, amount]
    );
    return (
        <div className="relative flex">
            <div className=" flex  items-center bg-gray-200 px-1 text-center text-xs font-medium">{weekNo}</div>
            <p
                className={`min-w-[70px] py-1.5 px-1.5 text-center text-xs font-semibold ${
                    status === 'PENDING' ? ' text-warning-500' : ''
                } ${status === 'MISS_DATE' ? ' text-red-500' : ''} 
                ${status === 'DONE' ? 'text-brand-500' : ''}
                `}
            >
                {status === 'DONE' ? amount : status === 'MISS_DATE' ? 'DUE' : 'PENDING'}
            </p>
        </div>
    );
};

export default Members;
