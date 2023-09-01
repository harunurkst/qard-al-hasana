import React from 'react';

const TopSheet = () => {
    return (
        <Document>
            <Page size={'A4'}>
                <View style={styles.mypdf}>
                    <View style={styles.header}>
                        <Text style={[styles.title, { fontFamily: 'Nikosh' }]}>{orgName}</Text>
                        <View style={styles.organizationContainer}>
                            <Text style={[styles.branchText, { fontFamily: 'Nikosh' }]}>{branchName},</Text>
                            <Text style={[styles.teamText, { fontFamily: 'Nikosh' }]}>{teamName}</Text>
                        </View>

                        <View style={styles.headerMonthRow}>
                            <Text style={[styles.address, { fontFamily: 'Nikosh' }]}>
                                123 Main Street, City, Country
                            </Text>
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
                                    styles.lastTableCell,
                                    { flex: 2, fontFamily: 'Nikosh' },
                                ]}
                            >
                                মোট হ
                            </Text>
                        </View>

                        {/* Sample Rows */}
                        {data1 &&
                            data1.result?.map((element, index) => {
                                const matchingInstallment = data2?.result.find((item) => item.sl === index + 1);
                                return (
                                    <View style={styles.tableRow} key={element.member_id}>
                                        <View style={styles.tableCellBorder1}>
                                            <Text style={[styles.serialNumber, { fontFamily: 'Nikosh' }]}>{element?.sl}</Text>
                                        </View>
                                        <View style={styles.tableCellBorder3}>
                                            <Text style={[styles.guardianName, { fontFamily: 'Nikosh' }]}>{element?.guardian_name}</Text>
                                        </View>
                                        <View style={styles.tableCellBorder}>
                                            <Text style={[styles.savings, { fontFamily: 'Nikosh' }]}>{element?.balance}</Text>
                                        </View>
                                        <View style={styles.tableCellBorder}>
                                            <Text style={[styles.week, { fontFamily: 'Nikosh' }]}>{element?.week1}</Text>
                                        </View>
                                        <View style={styles.tableCellBorder}>
                                            <Text style={[styles.week, { fontFamily: 'Nikosh' }]}>{element?.week2}</Text>
                                        </View>
                                        <View style={styles.tableCellBorder}>
                                            <Text style={[styles.week, { fontFamily: 'Nikosh' }]}>{element?.week3}</Text>
                                        </View>
                                        <View style={styles.tableCellBorder}>
                                            <Text style={[styles.week, { fontFamily: 'Nikosh' }]}>{element?.week4}</Text>
                                        </View>
                                        <View style={styles.tableCellBorder}>
                                            <Text style={[styles.withdrawalAmount, { fontFamily: 'Nikosh' }]}>
                                                {matchingInstallment?.loan_balance}
                                            </Text>
                                        </View>
                                        <View style={[styles.tableCellBorder, styles.lastTableCell]}>
                                            <Text style={[styles.total, { fontFamily: 'Nikosh' }]}>550</Text>
                                        </View>
                                    </View>
                                );
                            })}
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default TopSheet;