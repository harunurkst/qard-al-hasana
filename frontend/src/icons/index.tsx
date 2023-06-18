import { SVGAttributes } from 'react';

export { default as BranchIcon } from './BranchIcon';
export { default as CalenderIcon } from './CalenderIcon';
export { default as CashHandIcon } from './CashHandIcon';
export { default as DepositIcon } from './DepositIcon';
export { default as ExpenseIcon } from './ExpenseIcon';
export { default as FilterIcon } from './FilterIcon';
export { default as IncomeIcon } from './IncomeIcon';
export { default as LoanIcon } from './LoanIcon';
export { default as LoanPlusIcon } from './LoanPlusIcon';
export { default as PersonPlusIcon } from './PersonPlusIcon';
export { default as PersonsIcon } from './PersonsIcon';
export { default as PlusIcon } from './PlusIcon';
export { default as PreviousIcon } from './PreviousIcon';
export { default as SearchIcon } from './SearchIcon';
export { default as VerticalDotIcon } from './VerticalDotIcon';
export { default as WithdrawIcon } from './WithdrawIcon';

export type IconProps = {
    height?: number | `${number}${'px' | 'rem' | 'em'}`;
    width?: number | `${number}${'px' | 'rem' | 'em'}`;
    className?: string;
    stroke?: string;
    fill?: string;
    strokeWidth?: number;
} & SVGAttributes<HTMLOrSVGElement>;
