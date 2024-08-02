import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import axios from 'axios'
import { apikey, fetcher } from '../config';
import useSWR from 'swr';
import { SwiperSlide, Swiper } from "swiper/react"
import MovieCard from '../component/Movies/MovieCard';

// https://api.themoviedb.org/3/movie/${movieId}?api_key=b7cb6f38c19e509f247bace235528550

const MovieDetailPage = () => {
    const { movieId } = useParams();
    const { data } = useSWR(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apikey}`,
        fetcher
    );
    console.log(data);
    if (!data) return null;
    const { backdrop_path, poster_path, title, genres, overview } = data
    return (
        <div className='py-10'>
            <div className='w-full h-[600px] relative'>
                <div className='absolute inset-0 bg-black bg-opacity-50'></div>
                {/* làm mờ cái background */}
                <div className="w-full h-screen bg-cover bg-no-repeat" style={{
                    backgroundImage: `URL(https://image.tmdb.org/t/p/original${backdrop_path})`
                }}></div>
            </div>
            <div className='w-full h-[500px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10'>
                <img src={`https://image.tmdb.org/t/p/original${poster_path}`}
                    className=' w-full h-full object-cover rounded-xl' alt="" />
            </div>
            <h1 className='text-white text-4xl font-bold text-center mb-10'>{title}</h1>
            {genres.length > 0 &&
                <div className='flex items-center justify-center gap-x-5 mb-10'>
                    {genres.map((item) => (
                        <span
                            className='border border-primary px-4 py-2 rounded-lg font-bold text-primary cursor-pointer'
                            key={item.id} >{item.name}</span>
                    ))}
                </div>}
            <p className='text-xl leading-relaxed mx-auto max-w-[600px]'>{overview}</p>
            <MovieCredit></MovieCredit>
            <VideoMovies></VideoMovies>
            <MovieSimplar></MovieSimplar>
        </div>
    );
};
// function MoviesMeta({type="videos"}){
//     const { movieId } = useParams();
//     const { data } = useSWR(`https://api.themoviedb.org/3/movie/${movieId}/${type}?api_key=${apikey}`,
//         fetcher
//     );
//     if (!data) return null;
//     // cast bên api nên viết cho đúng 
//     const { cast } = data;
//     if (!cast || cast.length <= 0) return null;
//     return null;
// }
function MovieCredit() {
    const { movieId } = useParams();
    const { data } = useSWR(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apikey}`,
        fetcher
    );
    if (!data) return null;
    // cast bên api nên viết cho đúng 
    const { cast } = data;
    if (!cast || cast.length <= 0) return null;
    return (
        <div className='py-10'>
            <h2 className='text-3xl text-center mb-10'>Casts</h2>
            <div className=' grid grid-cols-4 gap-x-5 '>
                {cast.slice(0, 4).map((item) => (
                    <div className='cast-item' key={item.id}>
                        <img
                            className='w-full h-[350px] object-cover rounded-lg mb-3'
                            src={`https://image.tmdb.org/t/p/original${item.profile_path}`}
                            alt="" />
                        <h3 className='font-bold text-center text-lg'>{item.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}
function VideoMovies() {
    const { movieId } = useParams();
    const { data } = useSWR(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apikey}`,
        fetcher
    );
    if (!data) return null;
    console.log("video", data)
    const { results } = data;
    if (!results || results.length <= 0) return null;
    return (
        <div className='py-10'>
            <div className='flex flex-col gap-10 '>
                {results.slice(0, 2).map((item) => (
                    <div className='' key={item.id}>
                        <h3 className='text-xl font-medium mb-5 bg-secondary inline-block p-3 rounded-lg'>{item.name}</h3>
                        <div key={item.id} className='w-full h-full aspect-video'>
                            <iframe width="747" height="420"
                                src={`https://www.youtube.com/embed/${item.key}`}
                                className='w-full h-full object-fill'
                                title="Godzilla x Kong: The New Empire | Extended Preview | Warner Bros. Entertainment"
                                frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>

                            </iframe>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
function MovieSimplar() {
    const { movieId } = useParams();
    const { data } = useSWR(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apikey}`,
        fetcher
    );
    if (!data) return null;
    console.log("simlar",data)
    const { results } = data;
    if (!results || results.length <= 0) return null;
    return (
        <div className='py-10'>
            <h2 className='font-medium text-3xl text-center  mb-10'>Movie Similar</h2>
            <div className="movies-list">
            <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
                {results.length > 0 && results.map((item, index) => (
                    <SwiperSlide key={item.id}>
                        <MovieCard item={item}></MovieCard>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
        </div>
    )
}
export default MovieDetailPage;