import { VerticalDotIcon } from '@/icons';
// import DespositeModal from '@/modules/member/components/DepositeModal';
import InstallmentModal from '@/modules/team/components/InstallmentModal';
import getWeekNumberOfCurrentMonth from '@/utils/getWeekNoOfCurrentMonth';
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

const MemberSavingsTable = () => {
    const router = useRouter();
    // const [isOpenDepositeModal, setOpenDepositeModal] = useState(false);
    const [isOpenInstallmentModal, setOpenInstallmentModal] = useState(false);

    return (
        <>
            <InstallmentModal isOpen={isOpenInstallmentModal} onClose={() => setOpenInstallmentModal(false)} />
            
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
                        {/* {data.result?.map((data: MemberSavingsType) => {
                            return ( */}
                        <Tr className="hover:bg-gray-50">
                            <Td>1</Td>
                            <Td>Waliul Islam</Td>
                            <Td>Guardian Name </Td>

                            <TrasectionTD amount={10} weekNo={1} />
                            <TrasectionTD amount={10} weekNo={2} />
                            <TrasectionTD amount={10} weekNo={3} />
                            <TrasectionTD amount={10} weekNo={4} />
                            <Td isNumeric> {20}</Td>
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
                                        {/* <MenuItem onClick={() => setOpenDepositeModal(true)}>Deposit</MenuItem> */}
                                        <MenuItem onClick={() => setOpenInstallmentModal(true)}>InstallMent</MenuItem>
                                    </MenuList>
                                </Menu>
                            </Td>
                        </Tr>
                        {/* );
                         })} */}
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

export default MemberSavingsTable;
