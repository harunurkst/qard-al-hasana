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
import { Document, PDFDownloadLink, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { MemberSavingsType } from '../../../types/memberSaving.type';
import { useMemberSavingsStore } from '../stores/useMemberSavingsStore';
import DepositModal from './DepositModal';

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
interface IMemberSavingsTable {
    teamId: string | string[] | undefined;
}

//pdf styling
const styles = StyleSheet.create({
    mypdf: {
        borderWidth: 1,
        borderColor: '#000',
        margin: 5,
        borderBottom: 'none',
    },
    header: {
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        paddingBottom: 5,
        marginTop: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    organizationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    branchText: {
        fontSize: 16,
        marginRight: 5,
    },
    teamText: {
        fontSize: 16,
        marginLeft: 5,
    },
    address: {
        fontSize: 14,
        textAlign: 'center',
    },
    // table section
    tableContainer: {
        flexDirection: 'column',
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#000',
    },
    tableHeader: {
        flexDirection: 'row',
        height: 40,
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        textAlign: 'center',
    },
    tableHeaderColumn: {
        flex: 1,
        fontSize: 11,
        fontWeight: 'bold',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        alignItems: 'center',
        height: 20,
        textAlign: 'center',
        fontStyle: 'bold',
        fontSize: 10,
    },
    serialNumber: {
        flex: 1,
        borderRightWidth: 1,
        borderRightColor: '#000',
    },
    guardianName: {
        flex: 3,
        borderRightWidth: 1,
        borderRightColor: '#000',
    },
    savings: {
        flex: 2,
        borderRightWidth: 1,
        borderRightColor: '#000',
    },
    week: {
        flex: 2,
        borderRightWidth: 1,
        borderRightColor: '#000',
    },
    withdrawalAmount: {
        flex: 2,
        borderRightWidth: 1,
        borderRightColor: '#000',
    },
    total: {
        flex: 2,
    },
});

const MemberSavingsTable: React.FC<IMemberSavingsTable> = ({ teamId }) => {
    // const pdfRef = useRef();
    const router = useRouter();
    const [isOpenDepositModal, setOpenDepositModal] = useState(false);

    const { data: session, status } = useSession();

    // use the hook to fetch member savings
    // const memberTransactions = useMemberSavingsStore((state) => state.memberTransactions);
    const { setTransactions, setSelectedMember } = useMemberSavingsStore((state) => state.actions);
    const { data } = useQuery(['memberSaving'], async () =>
        zodSafeQuery(`/api/v1/transaction/member-savings-list?teamId=${teamId}`)()
    );

    setTransactions(data?.result);

    if (!data) {
        return <div className="flex h-[200px] items-center justify-center">Loading...</div>;
    }

    // pdf design started from here
    const mycontent = (
        <Document>
            <Page size={'A4'}>
                <View style={styles.mypdf}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Sample Organization</Text>
                        <View style={styles.organizationContainer}>
                            <Text style={styles.branchText}>Branch Name,</Text>
                            <Text style={styles.teamText}>Team Name</Text>
                        </View>

                        <Text style={styles.address}>123 Main Street, City, Country</Text>
                    </View>
                    {/* Table */}
                    <View style={styles.tableContainer}>
                        {/* Table Header */}
                        <View style={styles.tableHeader}>
                            <Text style={[styles.tableHeaderColumn, { flex: 1 }]}>SL</Text>
                            <Text style={[styles.tableHeaderColumn, { flex: 3 }]}>Guardian Name</Text>
                            <Text style={[styles.tableHeaderColumn, { flex: 2 }]}>Savings</Text>
                            <Text style={[styles.tableHeaderColumn, { flex: 2 }]}>Week 1</Text>
                            <Text style={[styles.tableHeaderColumn, { flex: 2 }]}>Week 2</Text>
                            <Text style={[styles.tableHeaderColumn, { flex: 2 }]}>Week 3</Text>
                            <Text style={[styles.tableHeaderColumn, { flex: 2 }]}>Week 4</Text>
                            <Text style={[styles.tableHeaderColumn, { flex: 2 }]}>Withdrawal Amount</Text>
                            <Text style={[styles.tableHeaderColumn, { flex: 2 }]}>Total</Text>
                        </View>

                        {/* Sample Rows */}
                        {data &&
                            data.result?.map((element) => (
                                <View style={styles.tableRow} key={element.member_id}>
                                    <Text style={styles.serialNumber}>{element.sl}</Text>
                                    <Text style={styles.guardianName}>{element.guardian_name}</Text>
                                    <Text style={styles.savings}>{element.balance}</Text>
                                    <Text style={styles.week}>{element.week1}</Text>
                                    <Text style={styles.week}>{element.week2}</Text>
                                    <Text style={styles.week}>{element.week3}</Text>
                                    <Text style={styles.week}>{element.week4}</Text>
                                    <Text style={styles.withdrawalAmount}>50</Text>
                                    <Text style={styles.total}>550</Text>
                                </View>
                            ))}
                    </View>
                </View>
            </Page>
        </Document>
    ); //pdf ended here

    return (
        <>
            {isOpenDepositModal && (
                <DepositModal isOpen={isOpenDepositModal} onClose={() => setOpenDepositModal(false)} />
            )}
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
                            <Th isNumeric>Deposit / Credit</Th>
                            <Th isNumeric>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody className="text-gray-600">
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
                    </Tbody>
                </Table>
            </TableContainer>

            <button className="float-right mr-5 mt-4 rounded bg-[#579A56] p-2">
                <PDFDownloadLink document={mycontent} fileName="topsheet.pdf">
                    {({ blob, url, loading, error }) => (loading ? 'Loading...' : 'Download Pdf')}
                </PDFDownloadLink>
            </button>
            {/* <div className="download-link"></div> */}
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
