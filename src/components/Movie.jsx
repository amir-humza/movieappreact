import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Dropdown from "./partials/Dropdown";
import Topnav from "./partials/Topnav";
import Cards from "./partials/Cards";
import Loading from "./Loading";

const Movie = () => {
  const navigate = useNavigate();
  const [category, setcategory] = useState("now_playing");
  const [movies, setMovies] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  document.title = "FlickFeed | Movies " + category;

  const GetMovies = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);
      if (data.results.length > 0) {
        setMovies((prevState) => [...prevState, ...data.results]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const refersHandler = () => {
    if (movies.length === 0) {
      GetMovies();
    } else {
      setpage(1);
      setMovies([]);
      GetMovies();
    }
  };

  useEffect(() => {
    refersHandler();
  }, [category]);

  return  movies.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className="px-[5%] w-full flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line"
          ></i>
          Movies<span className="ml-2 text-sm text-zinc-500">({category})</span>
        </h1>
        <div className="flex items-center w-[80%]">
          <Topnav />
          <Dropdown
            title="Category"
            options={["popular","top_rated","upcoming","now_playing"]}
            func={(e) => setcategory(e.target.value)}
          />          
        </div>
      </div>
      <InfiniteScroll
        dataLength={movies.length}
        next={GetMovies}
        hasMore={hasMore}
        loader={<h1>LOADING....</h1>}
      >
        <Cards data={movies} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Movie;
