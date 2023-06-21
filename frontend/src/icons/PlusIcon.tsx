import { FC, SVGAttributes } from 'react';

export type Icon = SVGAttributes<HTMLOrSVGElement>;
const PlusIcon: FC<Icon> = () => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M9.99984 4.16669V15.8334M4.1665 10H15.8332"
                stroke="white"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default PlusIcon;
