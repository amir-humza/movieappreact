import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Notfound from "../Notfound";

const Trailer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytvideo = useSelector((state) => state[category].info.videos);
  return ytvideo ? (
    <div className="bg-[rgba(0,0,0,.9)] absolute top-0 left-0 w-screen h-screen flex items-center justify-center">
      <Link
          onClick={() => navigate(-1)}
          className="hover:scale-125 hover:text-red-800  ease-in-out duration-300  ri-close-fill text-3xl text-red-600 absolute right-[5%] top-[5%]"
        ></Link>
      <ReactPlayer
      controls
      width={1400}      
      height={750}
      url={`https://www.youtube.com/watch?v=${ytvideo.key}`} />
    </div>
  ) : <Notfound />; 
};

export default Trailer;
