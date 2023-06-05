import { Button } from "@chakra-ui/react";
import { useState } from "react";
import ReactPaginate from "react-paginate";

const Pagination = () => {
    const [pageNumber, setPageNumber] = useState<number>(0);
    const handlePageChange = (event: { selected: number }) => {
        setPageNumber(event.selected);
    };
    return (
        <div className="flex justify-between px-5 py-4  ">
                <Button
                    leftIcon={
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M15.8332 10.0001H4.1665M4.1665 10.0001L9.99984 15.8334M4.1665 10.0001L9.99984 4.16675"
                                stroke="#344054"
                                strokeWidth="1.66667"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    }
                    variant={'outline'}
                >
                    Previous
                </Button>
                <ReactPaginate
                    forcePage={pageNumber}
                    previousClassName="hidden"
                    nextClassName="hidden"
                    pageLinkClassName="h-10 cursor-pointer flex items-center justify-center w-10 text-gray-800 font-medium text-sm rounded-lg hover:bg-gray-100"
                    activeClassName="bg-gray-200 rounded-lg"
                    containerClassName="flex items-center"
                    breakLabel="..."
                    breakClassName="h-10 flex items-center justify-center px-2 text-gray-800 font-bold text-base"
                    pageRangeDisplayed={5}
                    pageCount={10}
                    onPageChange={handlePageChange}
                />
                <Button
                    rightIcon={
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4.1665 10.0001H15.8332M15.8332 10.0001L9.99984 4.16675M15.8332 10.0001L9.99984 15.8334"
                                stroke="#344054"
                                strokeWidth="1.66667"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    }
                    variant={'outline'}
                >
                    Next
                </Button>
            </div> 
    );
};

export default Pagination;
