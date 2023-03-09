import { cilUserPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CForm,
  CFormInput,
  CFormSelect,
  CFormCheck,
  CFormTextarea,
} from '@coreui/react'
import React from 'react'

const AddMember = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol sm={8}>
                <strong>সদস্য ভর্তি ফর্ম</strong>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3">
              <CCol md={6}>
                <CFormSelect
                  aria-label="দলের নাম"
                  label="দলের নাম"
                  options={[
                    'দল বাছাই করুন',
                    { label: 'জবা', value: '1' },
                    { label: 'বেলি', value: '2' },
                    { label: 'হাসনাহেনা', value: '3' },
                  ]}
                />
              </CCol>
              <CCol md={6}>
                <CFormInput type="number" id="inputEmail4" label="সিরিয়াল নাম্বার" />
              </CCol>
              <CCol md={6}>
                <CFormInput type="text" id="inputEmail4" label="সদস্যের নাম" />
              </CCol>
              <CCol md={6}>
                <CFormInput type="text" id="inputEmail4" label="অভিভাবকের নাম" />
              </CCol>
              <CCol md={6}>
                <CFormInput type="text" id="inputEmail4" label="মোবাইল" />
              </CCol>
              <CCol md={6}>
                <CFormInput type="text" id="inputEmail4" label="এনআইডি নাম্বার" />
              </CCol>
              <CCol xs={12}>
                <CFormTextarea
                  type="textarea"
                  id="inputAddress"
                  label="ঠিকানা"
                  placeholder="সদরপুর, কুমারখালী, কুষ্টিয়া"
                />
              </CCol>
              <CCol xs={12}>
                <CButton type="submit">সাবমিট</CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddMember
