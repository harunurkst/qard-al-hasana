import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';

export type SingleBreadCrumbItemType = { label: string; href?: string; isCurrentPage?: boolean };
interface ICommonBreadCrumbProps {
    items: Array<SingleBreadCrumbItemType>;
}

const CommonBreadCrumb: React.FC<ICommonBreadCrumbProps> = ({ items }) => {
    return (
        <Breadcrumb>
            {items.map((item: SingleBreadCrumbItemType) => (
                <BreadcrumbItem isCurrentPage={item?.isCurrentPage}>
                    <BreadcrumbLink href={item?.href}>{item?.label}</BreadcrumbLink>
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    );
};

export default CommonBreadCrumb;
