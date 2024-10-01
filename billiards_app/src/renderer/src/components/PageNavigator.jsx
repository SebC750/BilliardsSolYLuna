import { Pagination } from "react-bootstrap";
import { useState, useEffect } from "react";

const PageNavigator = ({ limit, handlePageClick, totalRecords }) => {
    const [active, setActive] = useState(1); 
    const totalNumOfPages = Math.ceil(totalRecords / limit); 

    const handlePageNumberClick = (pageNumber) => {
        setActive(pageNumber);
        handlePageClick(pageNumber);
    };

    useEffect(() => {
        
        if (active > totalNumOfPages) {
            setActive(1);
            handlePageClick(1);
        }
    }, [totalRecords]);

    return (
        <Pagination className="page-navigator">
            <Pagination.First onClick={() => handlePageNumberClick(1)} disabled={active === 1} />
            <Pagination.Prev onClick={() => handlePageNumberClick(Math.max(active - 1, 1))} disabled={active === 1} />
            {Array.from({ length: totalNumOfPages }, (_, index) => (
                <Pagination.Item
                    key={index + 1}
                    active={index + 1 === active}
                    onClick={() => handlePageNumberClick(index + 1)}
                >
                    {index + 1}
                </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => handlePageNumberClick(Math.min(active + 1, totalNumOfPages))} disabled={active === totalNumOfPages} />
            <Pagination.Last onClick={() => handlePageNumberClick(totalNumOfPages)} disabled={active === totalNumOfPages} />
        </Pagination>
    );
};

export default PageNavigator;
