import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';

export type SingleBreadCrumbItemType = { label: string; href?: string; isCurrentPage?: boolean };
interface ICommonBreadCrumbProps {
    items: Array<SingleBreadCrumbItemType>;
}

const CommonBreadCrumb: React.FC<ICommonBreadCrumbProps> = ({ items }) => {
    return (
        <Breadcrumb>
            {items.map((item: SingleBreadCrumbItemType) => (
                <BreadcrumbItem isCurrentPage={item?.isCurrentPage} key={item?.label} className="font-semibold">
                    <BreadcrumbLink href={item?.href} className="capitalize">
                        {item?.label}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    );
};

export default CommonBreadCrumb;
