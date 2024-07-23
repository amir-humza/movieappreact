import { Link } from "react-router-dom";
import noimg from "/noImg.png";

const HorizontalCards = ({ data }) => {
  return (
    <div className="w-[100%] flex overflow-y-hidden mb-5 sm:p-5">
      {data.length > 0 ? (
        data.map((d, i) => (
          <Link
            to={`/${d.media_type}/details/${d.id}`}
            key={i}
            className="min-w-[40%] md:min-w-[15%] h-[35vh] bg-zinc-900 mr-5 mb-5"
          >
            <img
              className="w-full h-[55%] object-cover"
              src={
                d.backdrop_path || d.poster_path
                  ? `https://image.tmdb.org/t/p/original/${
                      d.backdrop_path || d.poster_path
                    }`
                  : noimg
              }
              alt=""
            />
            <div className="text-white p-3 h-[45%] overflow-y-auto overflow-x-hidden">
              <h1 className="text-sm md:text-lg leading-tight font-semibold">
                {d.name || d.title}
              </h1>
              <p className="text-xs md:text-sm mt-1">
                {d.overview.slice(0, 70)}...
                <span className="text-zinc-500">More</span>
              </p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-3xl mt-5 text-white font-black text-center"></h1>
      )}
    </div>
  );
};

export default HorizontalCards;
