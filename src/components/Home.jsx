import { useEffect, useState } from "react";
import axios from "../utils/axios";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";
import Header from "./partials/Header";
import HorizontalCards from "./partials/HorizontalCards";
import Dropdown from "./partials/Dropdown";
import Loading from "./Loading";

const Home = () => {
  const [wallpaper, setwallpaper] = useState(null);
  const [trending, settrending] = useState(null);
  const [category, setcategory] = useState("all");

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomdata =
        data.results[(Math.random() * data.results.length).toFixed()];
      setwallpaper(randomdata);
      // console.log(data);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      settrending(data.results);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  // console.log(wallpaper);

  useEffect(() => {
    GetTrending();
    !wallpaper && GetHeaderWallpaper();
  }, [category]);
  // console.log(trending);

  return wallpaper && trending ? (
    <>
      <Sidenav />
      <div className="w-[100%] md:w-[80%] h-full overflow-auto overflow-x-hidden">
        <Topnav />
        <Header data={wallpaper} />
        <div className="flex justify-between items-center p-5">
          <h1 className="text-xl md:text-3xl font-semibold text-zinc-400">Trending</h1>
          <Dropdown title="Filter" options={["tv", "movie", "all"]} func={(e) => setcategory(e.target.value)} />
        </div>
        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
    <Loading />
  )
};

export default Home;
