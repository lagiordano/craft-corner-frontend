import React from "react";
import Pagination from "react-bootstrap/Pagination";

function PaginationComponent({nPages, currentPage, setCurrentPage}) {

   


    let active = currentPage;
    let items = [];
    for (let number = 1; number <= nPages; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active} onClick={() => setCurrentPage(number)}>
                {number}
            </Pagination.Item>,
        );
    }

    function nextPage () {
        if (currentPage !== nPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    function prevPage () {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    return (
        
        <Pagination>
            <Pagination.Prev onClick={prevPage}/>
            {items}
            <Pagination.Next onClick={nextPage}/>
        </Pagination>
    )


}


export default PaginationComponent;