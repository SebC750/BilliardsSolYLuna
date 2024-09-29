import Pagination from 'react-bootstrap/Pagination'
import { useState, useEffect } from "react"
function PageNavigator({currentPage, totalPages, onPageChange, data}){
    const indexOfLastPage = data.length*5
    const indexOfFirstPage = indexOfLastPage - 5
    
    let items = [];

    for (let number = 1; number <= totalPages; number++) {
        items.push(
          <Pagination.Item key={number} onClick={() => onPageChange(number)}>
            {number}
          </Pagination.Item>,
        );
      }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>

            <Pagination>
                <Pagination.First onClick={() => onPageChange(indexOfFirstPage)}/>

                
                <Pagination.Prev onClick={() => onPageChange(currentPage-1)}>
                    </Pagination.Prev>
                     {items}
                     <Pagination.Next onClick={() => onPageChange(currentPage+1)}></Pagination.Next>
                <Pagination.Last onClick={() => onPageChange(indexOfLastPage)}/>

               
                
            </Pagination>
        </div>
    )
}
export default PageNavigator