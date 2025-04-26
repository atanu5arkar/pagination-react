import { useEffect, useState } from 'react'

import usePagination from "./paginationHook.js"
import './App.css'

function Pagination({ items, limit, setPageData }) {
    const {
        pageCount,
        pageNum,
        pageData,
        changePage } = usePagination(items, limit);

    useEffect(() => {
        setPageData(pageData);
    }, [pageNum]);

    return (
        <div className="pages-nav">
            <label htmlFor="pageNum">
                Page
            </label>
            <input
                type="number"
                id="pageNum"
                value={pageNum + 1}
                min='1'
                max={pageCount}
                onChange={(ev) => changePage(ev.target.valueAsNumber)}
            />
            <span>of {pageCount}</span>
        </div>
    );
}

function App() {
    const [items, setItems] = useState([]);
    const [pageData, setPageData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const PAGE_LIMIT = 6;

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("https://dummyjson.com/recipes");
                const resBody = await res.json();

                if (!res.ok) throw new Error();
                
                setItems(resBody.recipes);
                setIsLoading(false);

            } catch (error) {
                setIsLoading(false);
                console.error(error);
            }
        }
        fetchData();
    }, []);

    if (isLoading) return (
        <div className="loading">
            <p>Please Wait...</p>
        </div>
    );

    return (
        <>
            <Pagination
                items={items}
                limit={PAGE_LIMIT}
                setPageData={setPageData}
            />
            <section className="items-container">
                {
                    pageData.map((item, i) => {
                        return (
                            <div className="item-card" key={i}>
                                <figure className="item-img">
                                    <img src={item.image} alt={item.tags[0]} />
                                </figure>
                                <p>{item.name}</p>
                            </div>
                        )
                    })
                }
            </section>
        </>
    )
}

export default App
