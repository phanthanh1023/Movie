import React, { useEffect, useState } from 'react';
import { SwiperSlide, Swiper } from "swiper/react"
import MovieCard from './MovieCard';
import { fetcher } from '../../config';
import useSWR from 'swr'

const MovieList = ({ type = "now_playing" }) => {
    // const [movies, setMovies] = useState([])
    const { data } = useSWR(`https://api.themoviedb.org/3/movie/${type}?api_key=b7cb6f38c19e509f247bace235528550`,
        fetcher
    );
    const movies = data?.results || [];
    // console.log(movies);
    return (
        <div className="movies-list">
            <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
                {movies.length > 0 && movies.map((item, index) => (
                    <SwiperSlide key={item.id}>
                        <MovieCard item={item}></MovieCard>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MovieList;