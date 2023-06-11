import React from 'react';

function Pagination({ itemsPerPage, totalItems, currentPage, onPageChange }:{ itemsPerPage:any, totalItems:any, currentPage:any, onPageChange:any }) {
    const pagesCount = Math.ceil(totalItems / itemsPerPage);
    const pages = [...Array(pagesCount).keys()].map((num) => num + 1);
    
    return (
    <ul>
    {pages.map((page) => 
<li key={page} className={currentPage === page ? 'active' : ''}>
<button onClick={() => onPageChange(page)}>{page}
</button>
</li>
)}
    </ul>
    
    
    
    )

    
    
    }


export default Pagination;