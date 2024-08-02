import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "swiper/scss";
import Main from "./component/layout/Main";
import Home from "./pages/Home";
import Banner from "./component/banner/Banner";
import MoviePage from "./pages/MoviePage";
import MovieDetailPage from "./pages/MovieDetailPage";

// https://api.themoviedb.org/3/movie/550?api_key=b7cb6f38c19e509f247bace235528550
//https://api.themoviedb.org/3/movie/now_playing?api_key=b7cb6f38c19e509f247bace235528550
function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route element={<Main></Main>}>
            <Route path="/" element={
              <Fragment>
                <Banner></Banner>
                <Home></Home>
              </Fragment>
            }></Route>
            <Route path="/movies" element={<MoviePage></MoviePage>}></Route>
            <Route path="/movie/:movieId" element={<MovieDetailPage></MovieDetailPage>}></Route>
          </Route>
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
