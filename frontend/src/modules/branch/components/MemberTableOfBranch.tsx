import VerticalDotIcon from '@/icons/VerticalDotIcon';
import { useMemberSavingsStore } from '@/modules/team/stores/useMemberSavingsStore';
import { MemberSavingsType } from '@/types/memberSaving.type';
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
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';

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

const IMemberTableOfBranch: React.FC<IMemberTableOfBranch> = ({ teamId, total_members }) => {
    // States to manage the pagination
    const [currentPage, setCurrentPage] = useState(0);
    const resultsPerPage = 10; // or any other number

    // const pdfRef = useRef();
    const router = useRouter();
    const [isOpenDepositModal, setOpenDepositModal] = useState(false);

    const { data: session, status } = useSession();

    // use the hook to fetch member savings
    // const memberTransactions = useMemberSavingsStore((state) => state.memberTransactions);
    const { setTransactions, setSelectedMember } = useMemberSavingsStore((state) => state.actions);

    const { data } = useQuery(['memberSaving'], async () => zodSafeQuery(`/api/v1/peoples/members/`)());

    // This function uses the useMemo hook to compute the data items that should be displayed on the current page.
    const currentResults = useMemo(() => {
        if (data) {
            const start = currentPage * resultsPerPage;
            const end = start + resultsPerPage;
            return data.result?.results.slice(start, end);
        }
        return [];
    }, [data, currentPage]);

    // This handler is triggered when the user clicks on a page number.
    const handlePageClick = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected);
    };

    // Handle advancing to the next page.
    const handleNext = () => {
        if (currentPage < Math.ceil(data?.result?.count / resultsPerPage) - 1) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    // Handle going back to the previous page.
    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    setTransactions(data?.result);
    //get total members of a branch
    const totalMembers = data?.result.count;
    total_members(totalMembers);

    if (!data) {
        return <div className="flex h-[200px] items-center justify-center">Loading...</div>;
    }

    return (
        <>
            <TableContainer>
                <Table fontSize={14} variant="simple" colorScheme={'gray'}>
                    <Thead background={'#f2f4f5'}>
                        <Tr>
                            <Th>ক্রমিক</Th>
                            <Th>নাম</Th>
                            <Th>অভিভাবক</Th>
                            <Th>মোবাইল</Th>
                            {/* <Th>ঠিকানা</Th> */}
                            <Th>দল</Th>
                            <Th>সঞ্চয়</Th>
                            <Th>কর্জ</Th>
                            <Th isNumeric>কর্ম</Th>
                        </Tr>
                    </Thead>
                    <Tbody className="text-gray-600">
                        {currentResults.map((singleData: MemberSavingsType, index) => {
                            return (
                                <Tr key={singleData?.id} className="hover:bg-gray-50">
                                    <Td>{index + 1}</Td>
                                    <Td
                                        onClick={() => router.push(`/member/${singleData.member_id}`)}
                                        className="cursor-pointer"
                                    >
                                        {singleData?.name}
                                    </Td>
                                    <Td>{singleData?.guardian_name}</Td>
                                    <Td>{singleData?.mobile_number}</Td>
                                    <Td>{singleData?.team}</Td>
                                    <Td isNumeric> {singleData.balance}</Td>
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
                                                        router.push(`/member/${singleData.member_id}`);
                                                    }}
                                                >
                                                    View
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        setSelectedMember(singleData);
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
                    </Tbody>
                </Table>
                <div className="flex justify-between px-5 py-4  ">
                    <Button
                        onClick={handlePrevious}
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
                        pageCount={Math.ceil(data?.result?.count / resultsPerPage)}
                        onPageChange={handlePageClick}
                        pageLinkClassName="h-10 cursor-pointer flex items-center justify-center w-10 text-gray-800 font-medium text-sm rounded-lg hover:bg-gray-100"
                        activeClassName="bg-gray-200 rounded-lg"
                        containerClassName="flex items-center"
                        breakLabel="..."
                        breakClassName="h-10 flex items-center justify-center px-2 text-gray-800 font-bold text-base"
                        pageRangeDisplayed={5}
                        forcePage={currentPage}
                    />

                    <Button
                        onClick={handleNext}
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
