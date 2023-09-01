import VerticalDotIcon from '@/icons/VerticalDotIcon';
import { useMemberSavingsStore } from '@/modules/team/stores/useMemberSavingsStore';
import { MemberSavingsType } from '@/types/memberSaving.type';
import getWeekNumberOfCurrentMonth from '@/utils/getWeekNoOfCurrentMonth';
import { getQuery } from "@/utils/getQuery";
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
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import zodSafeQuery from '@/utils/zodSafeQuery';

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
    total_members: string | string[] | undefined;
    searchKeyword: string | string[] | undefined;
}

//pdf styling

const IMemberTableOfBranch: React.FC<IMemberTableOfBranch> = ({  total_members,searchKeyword }) => {
    // const pdfRef = useRef();
    const router = useRouter();
    const [isOpenDepositModal, setOpenDepositModal] = useState(false);
    const [isKeywordChanged, setIsKeywordChanged] = useState(true);
    useEffect(()=>{
        if(searchKeyword) {
            console.log('changed')
            setIsKeywordChanged(!isKeywordChanged)}
    },[searchKeyword])
    const { data: session, status } = useSession();

    // use the hook to fetch member savings
    // const memberTransactions = useMemberSavingsStore((state) => state.memberTransactions);
    const { setTransactions, setSelectedMember } = useMemberSavingsStore((state) => state.actions);
    const { data } = useQuery(['memberSaving'], async () => zodSafeQuery(`/api/v1/peoples/members?search=${searchKeyword}`)(),{
        enabled: isKeywordChanged
      });
    //   const { data } = useQuery(
    //     ["memberSaving"],
    //     () => getQuery(`/api/v1/peoples/members?search=${searchKeyword}`),
    //     { enabled: true }
    //   );
// console.log('searchKeyword',searchKeyword)
    setTransactions(data?.result);
    //get total members of a branch
    // const totalMembers = data?.result.count;
    // total_members(totalMembers);

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
                        {data &&
                            data.result?.results?.map((singleData: MemberSavingsType, index) => {
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
