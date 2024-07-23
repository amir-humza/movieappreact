import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Topnav from "./partials/Topnav";
import Cards from "./partials/Cards";
import Loading from "./Loading";

const People = () => {
    const navigate = useNavigate();
    const [category, setcategory] = useState("popular");
    const [people, setpeople] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true);
  
    document.title = "FlickFeed | people Shows " + category;
  
  
    const GetPeople = async () => {
      try {
        const { data } = await axios.get(`/person/${category}?page=${page}`);
        if (data.results.length > 0) {
          setpeople((prevState) => [...prevState, ...data.results]);
          setpage(page + 1);
        } else {
          sethasMore(false);
        }
      } catch (error) {
        console.log("error: ", error);
      }
    };
  
    const refersHandler = () => {
      if (people.length === 0) {
        GetPeople();
      } else {
        setpage(1);
        setpeople([]);
        GetPeople();
      }
    };
  
    useEffect(() => {
      refersHandler();
    }, [category]);
  
    return people.length > 0 ? (
      <div className="w-screen h-screen ">
        <div className="px-[5%] w-full flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-zinc-400">
            <i
              onClick={() => navigate(-1)}
              className="hover:text-[#6556CD] ri-arrow-left-line"
            ></i>
            People
          </h1>
          <div className="flex items-center w-[80%]">
            <Topnav />
                      
          </div>
        </div>
        <InfiniteScroll
          dataLength={people.length}
          next={GetPeople}
          hasMore={hasMore}
          loader={<h1>LOADING....</h1>}
        >
          <Cards data={people} title="person" />
        </InfiniteScroll>
      </div>
    ) : (
      <Loading />
    );
}

export default People