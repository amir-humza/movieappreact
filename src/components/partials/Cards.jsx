import { Link } from "react-router-dom";
import noimg from "/noImg.png";

const Cards = ({ data, title }) => {
  // console.log(data);
  return (
    <div className=" flex flex-wrap justify-between h-full w-full px-[5%] bg-[#1f1e24]">
      {data.map((c, i) => (
        <Link
          to={`/${c.media_type || title}/details/${c.id}`}
          className="relative w-[25vh] mr-[5%] mb-[5%]"
          key={i}
        >
          <img
            className="shadow-[8px] h-[40vh] object-cover"
            src={
              c.poster_path || c.backdrop_path || c.profile_path
                ? `https://image.tmdb.org/t/p/original/${
                    c.poster_path || c.backdrop_path || c.profile_path
                  }`
                : noimg
            }
            alt=""
          />
          <h1 className="text-2xl text-zinc-400 mt-3 font-semibold">
            {c.name || c.title}
          </h1>
          {c.vote_average && (
            <div className="absolute right-[-10%] bottom-[10%] rounded-full text-sm font-semibold bg-yellow-600 text-white w-8 h-8 flex justify-center items-center">
              {(c.vote_average * 10).toFixed()} <span>%</span>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Cards;
