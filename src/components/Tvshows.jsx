import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Dropdown from "./partials/Dropdown";
import Topnav from "./partials/Topnav";
import Cards from "./partials/Cards";
import Loading from "./Loading";

const Tvshows = () => {
    const navigate = useNavigate();
    const [category, setcategory] = useState("airing_today");
    const [tv, settv] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true);
  
    document.title = "FlickFeed | Tv Shows " + category;
  
  
    const GetTv = async () => {
      try {
        const { data } = await axios.get(`/tv/${category}?page=${page}`);
        if (data.results.length > 0) {
          settv((prevState) => [...prevState, ...data.results]);
          setpage(page + 1);
        } else {
          sethasMore(false);
        }
      } catch (error) {
        console.log("error: ", error);
      }
    };
  
    const refersHandler = () => {
      if (tv.length === 0) {
        GetTv();
      } else {
        setpage(1);
        settv([]);
        GetTv();
      }
    };
  
    useEffect(() => {
      refersHandler();
    }, [category]);
  
    return tv.length > 0 ? (
      <div className="w-screen h-screen ">
        <div className="px-[5%] w-full flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-zinc-400">
            <i
              onClick={() => navigate(-1)}
              className="hover:text-[#6556CD] ri-arrow-left-line"
            ></i>
            tv<span className="ml-2 text-sm text-zinc-500">({category})</span>
          </h1>
          <div className="flex items-center w-[80%]">
            <Topnav />
            <Dropdown
              title="Category"
              options={["on_the_air","popular","top_rated","airing_today"]}
              func={(e) => setcategory(e.target.value)}
            />          
          </div>
        </div>
        <InfiniteScroll
          dataLength={tv.length}
          next={GetTv}
          hasMore={hasMore}
          loader={<h1>LOADING....</h1>}
        >
          <Cards data={tv} title="tv" />
        </InfiniteScroll>
      </div>
    ) : (
      <Loading />
    );
}

export default Tvshows;