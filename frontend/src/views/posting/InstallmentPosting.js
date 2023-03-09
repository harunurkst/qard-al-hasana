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
  CFormLabel,
  CListGroup,
  CListGroupItem,
} from '@coreui/react'
import React from 'react'

const InstallmentPosting = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol sm={8}>
                <strong>কর্জ পরিশোধ</strong>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md={6}>
                <CForm className="row">
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">দলের নাম</CFormLabel>
                    <CFormSelect
                      aria-label="দলের নাম"
                      options={[
                        'দল বাছাই করুন',
                        { label: 'জবা', value: '1' },
                        { label: 'বেলি', value: '2' },
                        { label: 'হাসনাহেনা', value: '3' },
                      ]}
                    />
                  </div>
                  <div className="mb-3">
                    <CFormInput type="number" id="inputEmail4" label="সিরিয়াল নাম্বার" />
                  </div>
                  <div className="mb-3">
                    <CFormInput type="text" id="inputEmail4" label="তারিখ" />
                  </div>
                  <div className="mb-3">
                    <CFormInput
                      type="number"
                      id="inputEmail4"
                      label="টাকার পরিমান"
                      defaultValue={50}
                    />
                  </div>

                  <CButton type="submit">সাবমিট</CButton>
                </CForm>
              </CCol>
              <CCol md={6}>
                <CCard>
                  <CListGroup flush>
                    <CListGroupItem>সদস্যের নামঃ </CListGroupItem>
                    <CListGroupItem>অভিভাবকের নামঃ</CListGroupItem>
                    <CListGroupItem>দলের নামঃ </CListGroupItem>
                    <CListGroupItem>সঞ্চয় স্থিতিঃ </CListGroupItem>
                    <CListGroupItem>কর্জের পরিমানঃ </CListGroupItem>
                    <CListGroupItem>কর্জ স্থিতিঃ </CListGroupItem>
                  </CListGroup>
                </CCard>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default InstallmentPosting
