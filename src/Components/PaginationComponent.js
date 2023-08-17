import React from "react";
import ResponsivePagination from "react-responsive-pagination";
import { dropEllipsis } from "react-responsive-pagination/narrowBehaviour";


function PaginationComponent({nPages, currentPage, setCurrentPage}) {

    console.log(currentPage);
    
   return (
    <ResponsivePagination
        current={currentPage}
        total={nPages}
        onPageChange={setCurrentPage}
        narrowBehaviour={dropEllipsis}
    />
   );

}

export default PaginationComponent;


