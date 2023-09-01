import { Document, Page, Text, View } from '@react-pdf/renderer';
import React from 'react';
import { styles } from './style';

interface IBlankSheetItem {
    teamId: string | string[] | undefined;
    teamName: string;
}

interface IBlankSheet {
    teamName: string;
    branchName: string;
    orgName: string;
    teamAddress: string;
}

export const blankSheet = ({ teamName, branchName, orgName, teamAddress }: IBlankSheet) => {
    return <Document>
            <Page size={'A4'}>
                <View style={styles.mypdf}>
                    <View style={styles.header}>
                        <Text style={[styles.title, { fontFamily: 'Nikosh' }]}>{orgName}</Text>
                        <View style={styles.organizationContainer}>
                            <Text style={[styles.branchText, { fontFamily: 'Nikosh' }]}>{branchName},</Text>
                            <Text style={[styles.teamText, { fontFamily: 'Nikosh' }]}>{teamName}</Text>
                        </View>
                        <View style={styles.headerMonthRow}>
                            <Text style={[styles.address, { fontFamily: 'Nikosh' }]}>{teamAddress}</Text>
                            <Text style={styles.month}>Month: </Text>
                        </View>
                    </View>
                    {/* Table */}
                    <View style={styles.tableContainer}>
                        {/* Table Header */}
                        <View style={styles.tableHeader}>
                            <Text
                                style={[
                                    styles.tableHeaderColumn,
                                    styles.borderInPopulated,
                                    { flex: 1, fontFamily: 'Nikosh' },
                                ]}
                            >
                                ক্রমিক
                            </Text>
                            <Text
                                style={[
                                    styles.tableHeaderColumn,
                                    styles.borderInPopulated,
                                    { flex: 3, fontFamily: 'Nikosh' },
                                ]}
                            >
                                নাম
                            </Text>
                            <Text
                                style={[
                                    styles.tableHeaderColumn,
                                    styles.borderInPopulated,
                                    { flex: 3, fontFamily: 'Nikosh' },
                                ]}
                            >
                                অভিভাবক
                            </Text>
                            <Text
                                style={[
                                    styles.tableHeaderColumn,
                                    styles.borderInPopulated,
                                    { flex: 2, fontFamily: 'Nikosh' },
                                ]}
                            >
                                স্থিতি
                            </Text>
                            <Text
                                style={[
                                    styles.tableHeaderColumn,
                                    styles.borderInPopulated,
                                    { flex: 2, fontFamily: 'Nikosh' },
                                ]}
                            >
                                ১ম
                            </Text>
                            <Text
                                style={[
                                    styles.tableHeaderColumn,
                                    styles.borderInPopulated,
                                    { flex: 2, fontFamily: 'Nikosh' },
                                ]}
                            >
                                ২য়
                            </Text>
                            <Text
                                style={[
                                    styles.tableHeaderColumn,
                                    styles.borderInPopulated,
                                    { flex: 2, fontFamily: 'Nikosh' },
                                ]}
                            >
                                ৩য়
                            </Text>
                            <Text
                                style={[
                                    styles.tableHeaderColumn,
                                    styles.borderInPopulated,
                                    { flex: 2, fontFamily: 'Nikosh' },
                                ]}
                            >
                                ৪র্থ
                            </Text>
                            <Text
                                style={[
                                    styles.tableHeaderColumn,
                                    styles.borderInPopulated,
                                    { flex: 2, fontFamily: 'Nikosh' },
                                ]}
                            >
                                উত্তলন
                            </Text>
                            <Text
                                style={[
                                    styles.tableHeaderColumn,
                                    styles.borderInPopulated,
                                    { flex: 2, fontFamily: 'Nikosh' },
                                ]}
                            >
                                মোট হ
                            </Text>
                            <Text
                                style={[
                                    styles.tableHeaderColumn,
                                    styles.borderInPopulated,
                                    { flex: 2, fontFamily: 'Nikosh' },
                                ]}
                            >
                                স্থিতি
                            </Text>
                            <Text
                                style={[
                                    styles.tableHeaderColumn,
                                    styles.borderInPopulated,
                                    styles.lastTableCell,
                                    { flex: 1, fontFamily: 'Nikosh' },
                                ]}
                            >
                                ক্রমিক
                            </Text>
                        </View>

                        {/* Sample Rows */}
                        {Array(25)
                            .fill()
                            .map((_, index) => {
                                const matchingData = data1?.result.find((item) => item.sl === index + 1);
                                const matchingInstallment = data2?.result.find((item) => item.sl === index + 1);
                                return (
                                    <View style={styles.tableRow} key={index}>
                                        <View style={styles.tableCellBorder1}>
                                            <Text style={[styles.serialNumber]}>{index + 1}</Text>
                                        </View>
                                        <View style={styles.tableCellBorder3}>
                                            <Text style={[styles.name]}>{matchingData?.member_name}</Text>
                                        </View>
                                        <View style={[styles.tableCellBorder3, styles.tableCell]}>
                                            <Text style={[styles.guardianName]}>{matchingData?.guardian_name}</Text>
                                        </View>
                                        <View style={styles.tableCellBorder}>
                                            <Text style={[styles.savings]}>{matchingData?.balance}</Text>
                                        </View>
                                        <View style={styles.tableCellBorder}>
                                            <Text style={[styles.week]}></Text>
                                        </View>
                                        <View style={styles.tableCellBorder}>
                                            <Text style={[styles.week]}></Text>
                                        </View>
                                        <View style={styles.tableCellBorder}>
                                            <Text style={[styles.week]}></Text>
                                        </View>
                                        <View style={styles.tableCellBorder}>
                                            <Text style={[styles.week]}></Text>
                                        </View>
                                        <View style={styles.tableCellBorder}>
                                            <Text style={[styles.withdrawalAmount]}>
                                                {/* {matchingInstallment?.loan_balance} */}
                                            </Text>
                                        </View>
                                        <View style={[styles.tableCellBorder]}>
                                            <Text style={[styles.total]}></Text>
                                        </View>
                                        <View style={[styles.tableCellBorder]}>
                                            <Text style={[styles.savings]}></Text>
                                        </View>
                                        <View style={[styles.tableCellBorder1, styles.lastTableCell]}>
                                            <Text style={[styles.serialNumber]}>{index + 1}</Text>
                                        </View>
                                    </View>
                                );
                            })}
                    </View>
                </View>
            </Page>
        </Document>
    
};

