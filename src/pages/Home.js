import React, { Fragment } from 'react';
import MovieList from '../component/Movies/MovieList';

const Home = () => {
    return (
        <Fragment>
            <section className="movies-layout page-container px-5 pb-20">
                <h2 className="capitalize text-white text-3xl mb-5">Now Playing</h2>
                <MovieList></MovieList>

            </section>
            <section className="movies-layout page-container px-5 pb-20">
                <h2 className="capitalize text-white text-3xl mb-5">
                    Top Rated Movies
                </h2>
                <MovieList type="top_rated"></MovieList>
            </section>
            <section className="movies-layout page-container px-5 pb-20">
                <h2 className="capitalize text-white text-3xl mb-5">
                    Popular Movies
                </h2>
                <MovieList type="popular"></MovieList>
            </section>
        </Fragment>
    );
};

export default Home;