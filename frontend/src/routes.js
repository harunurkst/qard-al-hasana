import React from 'react'
// main
const MemberList = React.lazy(() => import('./views/member/MemberList'))
const AddMember = React.lazy(() => import('./views/member/AddMember'))
const SavingsPosting = React.lazy(() => import('./views/posting/SavingsPosting'))
const InstallmentPosting = React.lazy(() => import('./views/posting/InstallmentPosting'))
const Loan = React.lazy(() => import('./views/posting/Loan'))
const Withdrawal = React.lazy(() => import('./views/posting/Withdrawal'))
const MonthlySavings = React.lazy(() => import('./views/posting/MonthlySavings'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/members', name: 'Member List', element: MemberList },
  { path: '/add-member', name: 'Add New Member', element: AddMember },
  { path: '/savings-posting', name: 'Savings Posting', element: SavingsPosting },
  { path: '/installment-posting', name: 'Installemt Posting', element: InstallmentPosting },
  { path: '/loan', name: 'Loan', element: Loan },
  { path: '/withdrawal', name: 'Withdrawal', element: Withdrawal },
  { path: '/monthly-savings', name: 'Withdrawal', element: MonthlySavings },
]

export default routes
