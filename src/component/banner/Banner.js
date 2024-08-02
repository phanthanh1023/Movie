import React, { useEffect } from 'react';
import { fetcher } from '../../config';
import useSWR from 'swr'
import { SwiperSlide, Swiper } from "swiper/react"
import { Navigate, useNavigate } from 'react-router-dom';


const Banner = () => {
    const { data } = useSWR(`https://api.themoviedb.org/3/movie/upcoming?api_key=b7cb6f38c19e509f247bace235528550`,
        fetcher
    );
    const movies = data?.results || [];
    console.log(movies);
    return (
        <section className="banner h-[500px] page-container mb-20 px-5 ">
            <Swiper>
                {movies.length > 0 && movies.map((item) => (
                    <SwiperSlide key={item.id}>
                        <BannerItem item={item}></BannerItem>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};
function BannerItem({ item }) {
    const { backdrop_path, title, id } = item;
    const nevigate = useNavigate();
    return (
        <div className=" w-full h-full rounded-lg relative">
            <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] "></div>
            <img src={`https://image.tmdb.org/t/p/original${backdrop_path}`} alt=""
                className="w-full h-full object-cover rounded-lg"
            />
            <div className="content absolute left-5 bottom-5 w-full text-white">
                <h2 className="font-bold text-3xl mb-5">{title}</h2>
                <div className=" flex items-center gap-x-3 mb-5">
                    <span className=" px-4 py-2 border border-white rounded-lg">Action</span>
                    <span className=" px-4 py-2 border border-white rounded-lg">Funny</span>
                    <span className=" px-4 py-2 border border-white rounded-lg">Romantic</span>
                </div>
                <button
                    className="bg-primary px-10 py-4 border border-white rounded-xl mt-3 font-bold text-xl"
                    onClick={() => nevigate(`/movie/${id}`)}>Watch Now</button>
            </div>
        </div>
    )
}

export default Banner;