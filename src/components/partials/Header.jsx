import { Link } from "react-router-dom";

const Header = ({ data }) => {
  return (
    <div
      className="w-full h-[70vh] md:h-[50vh] flex flex-col justify-end items-start p-[5%]"
      style={{
        background: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.7),rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <h1 className="w-[70%] text-3xl lg:text-5xl text-white">{data.name || data.title}</h1>
      <p className="md:w-[70%] mt-3 text-white">
        {data.overview.slice(0, 200)}...
        <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400">More</Link>
      </p>
      <p className="text-white">
        <i className="text-yellow-500 ri-megaphone-fill mr-0.5"></i>
        {data.release_data || "No Information"}
        <i className=" ml-3 text-yellow-500 ri-album-fill mr-0.5"></i>
        {data.media_type.toUpperCase()}
      </p>
      <Link to={`/${data.media_type}/details/${data.id}/trailer`} className="mt-5 bg-[#6556Cd] px-4 py-2 rounded text-white">
        Watch Trailer
      </Link>
    </div>
  );
};

export default Header;
