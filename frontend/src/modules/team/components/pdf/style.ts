import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
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
        flex: 1,
        marginLeft: 20,
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
        // height: 40,
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
        borderBottomStyle: 'solid',
        alignItems: 'center',
        textAlign: 'center',
        fontStyle: 'bold',
        fontSize: 10,
        lineHeight: 2,
    },
    serialNumber: {
        flex: 1,
    },
    name: {
        flex: 3,
    },
    guardianName: {
        flex: 3,
    },
    savings: {
        flex: 2,
    },
    week: {
        flex: 2,
    },
    withdrawalAmount: {
        flex: 2,
    },
    total: {
        flex: 2,
    },

    // right border in populated pdf
    borderInPopulated: {
        borderRightWidth: 1,
        borderRightColor: '#000',
        height: 30,
        borderBottomWidth: 1,
    },

    // cell border for blank pdf
    tableCell: {
        // flex: 1,
        // borderRightWidth: 1,
        // borderRightColor: 'black',
        // borderRightStyle: 'solid',
        overflow: 'hidden',
    },
    lastTableCell: {
        borderRightWidth: 0,
    },
    tableCellBorder: {
        borderRightWidth: 1,
        flex: 2,
        minHeight: 20,
    },
    tableCellBorder1: {
        borderRightWidth: 1,
        flex: 1,
        minHeight: 20,
    },
    tableCellBorder3: {
        borderRightWidth: 1,
        flex: 3,
        minHeight: 20,
    },
    headerMonthRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    month: {
        textAlign: 'right',
        fontSize: 10,
        marginRight: 50,
    },
    //
    tableCellText: {
        fontSize: 10,
        wordWrap: 'break-word',
    },
});
