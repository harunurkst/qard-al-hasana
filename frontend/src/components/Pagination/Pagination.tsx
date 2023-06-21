import { PreviousIcon } from '@/icons';
import NextIcon from '@/icons/NextIcon';
import { Button } from '@chakra-ui/react';
import ReactPaginate from 'react-paginate';
interface IPaginationProps {
    pageCount: number;
    pageRangeDisplayed?: number;
    handlePageChange: (event: { selected: number }) => void;
    currentPageNumber: number;
    handleClickPreviosPage?: () => void;
    handleClickNextPage?: () => void;
}

const Pagination: React.FC<IPaginationProps> = ({
    pageCount,
    currentPageNumber,
    handlePageChange,
    pageRangeDisplayed = 5,
    handleClickPreviosPage,
    handleClickNextPage,
}) => {
    // const [pageNumber, setPageNumber] = useState<number>(0);
    // const handlePageChange = (event: { selected: number }) => {
    //     setPageNumber(event.selected);
    //     console.log('OFFSET->', event.selected * 2);
    //     setCurrentPageNumber(event.selected);
    // };
    return (
        <div className="flex justify-between px-5 py-4  ">
            <Button onClick={handleClickPreviosPage} leftIcon={<PreviousIcon />} variant={'outline'}>
                Previous
            </Button>
            <ReactPaginate
                forcePage={currentPageNumber}
                previousClassName="hidden"
                nextClassName="hidden"
                pageLinkClassName="h-10 cursor-pointer flex items-center justify-center w-10 text-gray-800 font-medium text-sm rounded-lg hover:bg-gray-100"
                activeClassName="bg-gray-200 rounded-lg"
                containerClassName="flex items-center"
                breakLabel="..."
                breakClassName="h-10 flex items-center justify-center px-2 text-gray-800 font-bold text-base"
                pageRangeDisplayed={pageRangeDisplayed}
                pageCount={pageCount}
                onPageChange={handlePageChange}
            />
            <Button onClick={handleClickNextPage} rightIcon={<NextIcon />} variant={'outline'}>
                Next
            </Button>
        </div>
    );
};

export default Pagination;
