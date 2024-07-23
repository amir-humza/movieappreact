import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import noImg from "/noImg.png"
import { Link } from "react-router-dom";

const Topnav = () => {
  const [query, setquery] = useState("");
  const [searches, setSearches] = useState([]);

  const GetSerches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
      // console.log(data);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    GetSerches();
  }, [query]);

  return (
    <div className="w-[90%] md:w-[80%] h-[10vh] relative flex mx-auto items-center md:ml-[15%]">
      <i className="text-zinc-400 text-3xl ri-search-line"></i>
      <input
        onChange={(e) => setquery(e.target.value)}
        value={query}
        className="md:w-[50%] text-zinc-200 mx-3 md:mx-10 p-5 text-xl outline-none border-none bg-transparent"
        type="text"
        placeholder="search anything"
      />
      {query.length > 0 && (
        <i
          onClick={() => setquery("")}
          className="absolute text-zinc-400 sm:right-[45%] right-[5%] text-3xl ri-close-fill"
        ></i>
      )}
      <div className="z-50 absolute w-[95%] md:w-[50%] max-h-[50vh] bg-zinc-200 top-[100%] left-[5%] overflow-auto">
        {searches.map((s, i) => (
          <Link
            to={`/${s.media_type}/details/${s.id}`}
            key={i}
            className="hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-[100%] p-2 md:p-10 flex justify-start items-center border-b-2 border-zinc-100"
          >
            <img
              className="w-[20vh] md:w-[10vh] h-[10] object-cover mr-5"
              src={s.backdrop_path || s.profile_path
                 ? `https://image.tmdb.org/t/p/original/${
                s.backdrop_path || s.profile_path
              }` : noImg}
              alt=""
            />
            <span>{s.name || s.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Topnav;
