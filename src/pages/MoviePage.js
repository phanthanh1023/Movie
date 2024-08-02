import React, { useEffect, useState } from 'react';
import MovieList from '../component/Movies/MovieList';
import { apikey, fetcher } from '../config';
import useSWR from 'swr'
import MovieCard from '../component/Movies/MovieCard';
import useDeboune from '../hook/useDeboune';
import ReactPaginate from 'react-paginate';

//https://api.themoviedb.org/3/search/movie

const itemsPerPage = 20;
const MoviePage = () => {
    const [pageCount, setPageCount] = useState(0)
    const [itemOffset, setItemOffset] = useState(0);
    const [nextPage, setNextPage] = useState(1)
    const [fitter, setFitter] = useState("");
    const [url, setUrl] = useState(`https://api.themoviedb.org/3/movie/popular?api_key=b7cb6f38c19e509f247bace235528550&page=${nextPage}`);
    const handleFitterChange = (e) => {
        setFitter(e.target.value); // lấy dữ liệu mới là nhập vào
    }
    const fitterDeboune = useDeboune(fitter, 500)
    const { data, error } = useSWR(url, fetcher);
    const loading = !data && !error
    useEffect(() => {
        if (fitterDeboune) {
            setUrl(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${fitterDeboune}&page=${nextPage}`)
        } else {
            setUrl(`https://api.themoviedb.org/3/movie/popular?api_key=b7cb6f38c19e509f247bace235528550&page=${nextPage}`)
        }
    }, [fitterDeboune, nextPage])
    const movies = data?.results || [];
    console.log(movies);
    useEffect(() => {
        if (!data || !data.total_results) return;
        setPageCount(Math.ceil(data.total_results / itemsPerPage));
    }, [data, itemOffset]);
    console.log(data)

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.total_results;
        setItemOffset(newOffset); //hiển thị dấu 3 chấm
        setNextPage(event.selected + 1)
    };
    // nếu có data thì lấy dữ liệu tới results còn không có thì null
    return (
        <div className='py-5 page-container'>
            <div className='flex mb-10 text-white'>
                <div className='flex-1'>
                    <input type="text" className='w-full p-4 outline-none bg-slate-800'
                        placeholder='Type Here to search...'
                        // cách1 onChange={(e)=>setFitter(e.target.value)}
                        onChange={handleFitterChange}
                    />
                </div>
                <button className='p-4 bg-primary '>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                        className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>

                </button>

            </div>
            <div className='grid grid-cols-4 gap-5 col '>
                {!loading && movies.length > 0 && movies.map((item) => (
                    <MovieCard key={item.id} item={item}></MovieCard>
                ))}
            </div>
            <div className="mt-10">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    className='Pagnimation'
                />
            </div>
        </div>
    );
};

export default MoviePage;