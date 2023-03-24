import { FC, SVGAttributes } from 'react';

export type Icon = SVGAttributes<HTMLOrSVGElement>;

const PersonPlusIcon: FC<Icon> = () => {
    return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="20" className="fill-brand-50" />
            <path
                className="stroke-brand-600"
                d="M20 22.9167H16.25C15.087 22.9167 14.5056 22.9167 14.0324 23.0602C12.9671 23.3834 12.1334 24.217 11.8102 25.2824C11.6667 25.7555 11.6667 26.337 11.6667 27.5M25.8333 27.5V22.5M23.3333 25H28.3333M22.0833 16.25C22.0833 18.3211 20.4044 20 18.3333 20C16.2623 20 14.5833 18.3211 14.5833 16.25C14.5833 14.1789 16.2623 12.5 18.3333 12.5C20.4044 12.5 22.0833 14.1789 22.0833 16.25Z"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default PersonPlusIcon;
