import { cilUserPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
} from '@coreui/react'
import React from 'react'

const MemberList = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol sm={8}>
                <strong>সদস্য তালিকা</strong>
              </CCol>
              <CCol sm={4}>
                <CButton color="primary" className="float-end" href="add-member">
                  <CIcon icon={cilUserPlus} />
                </CButton>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">নাম</CTableHeaderCell>
                  <CTableHeaderCell scope="col">অভিভাবক</CTableHeaderCell>
                  <CTableHeaderCell scope="col">মোবাইল</CTableHeaderCell>
                  <CTableHeaderCell scope="col">দল</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableHeaderCell scope="row">১</CTableHeaderCell>
                  <CTableDataCell>মোঃ কামাল</CTableDataCell>
                  <CTableDataCell>মোঃ আবুল কালাম</CTableDataCell>
                  <CTableDataCell>০১৭১৪৪৪৪৪৪</CTableDataCell>
                  <CTableDataCell>জবা</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="row">২</CTableHeaderCell>
                  <CTableDataCell>মোঃ কামাল</CTableDataCell>
                  <CTableDataCell>মোঃ আবুল কালাম</CTableDataCell>
                  <CTableDataCell>০১৭১৪৪৪৪৪৪</CTableDataCell>
                  <CTableDataCell>জবা</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="row">৩</CTableHeaderCell>
                  <CTableDataCell>মোঃ কামাল</CTableDataCell>
                  <CTableDataCell>মোঃ আবুল কালাম</CTableDataCell>
                  <CTableDataCell>০১৭১৪৪৪৪৪৪</CTableDataCell>
                  <CTableDataCell>জবা</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default MemberList
