import { useState } from 'react'

export default function usePagination(items, limit) {
    const [pageNum, setPageNum] = useState(0);
    const pageCount = Math.ceil(items.length / limit);

    function changePage(num) {
        setPageNum(num - 1);
    }

    function pageData() {
        const start = limit * pageNum;
        const end = start + limit;
        return items.slice(start, end);
    }

    return { 
        pageNum, 
        pageCount, 
        changePage, 
        pageData 
    };
}