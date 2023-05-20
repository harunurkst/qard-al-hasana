export type MemberType = {
    id: number;
    name: string;
    mobile_number: string;
    nid_number: string;
    guardian_name: string;
    gender: 'male|female';
    serial_number: number;
    uuid: string;
    is_active: boolean;
    team: number;
    branch: number;
};
export type FetchedMemberType = {
    count: number;
    next: string;
    previous: string;
    results: MemberType[];
};
