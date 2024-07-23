import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { asyncloadmovie, removemovie } from "../../store/actions/movieActions";
import Loading from "../Loading";
import HorizontalCards from "../partials/HorizontalCards";

const Moviedetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  // console.log(info);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id]);
  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.7),rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="relative  w-[100%] h-fit px-[5%] sm:px-[10%]"
    >
      <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>
        <a target="_blank" href={info.detail.homepage}>
          <i className="ri-external-link-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}/`}
        >
          <i className="ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
        >
          IMDB
        </a>
      </nav>

      <div className="w-full flex-col sm:flex-row flex ">
        <img
          className="shadow-[8px_17px_38px_2px_raba(0,0,0,.5)] h-[70vh] md:h-[60vh] object-cover"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
        />
        <div className="content sm:ml-10 text-zinc-100">
          <h1 className="text-4xl  font-bold">
            {info.detail.name || info.detail.title}
            <span className="text-xl font-bold text-gray-300 ml-2">
              ({info.detail.release_date.split("-")[0]})
            </span>
          </h1>
          <div className="flex-col sm:flex-row flex mt-3   sm:items-center gap-x-4 font-semibold">
            <div className="flex items-center">
              <h3 className="mr-1">Score</h3>
              <span className="rounded-full text-sm font-semibold bg-yellow-600 text-white w-8 h-8 flex justify-center items-center">
                {(info.detail.vote_average * 10).toFixed()} <span>%</span>
              </span>
            </div>
            <h3>{info.detail.release_date}</h3>
            <h3>{info.detail.genres.map((g) => g.name).join(",")}</h3>
            <h3>{info.detail.runtime}-min's</h3>
          </div>
          <h3 className="text-xl font-semibold italic ">
            {info.detail.tagline}
          </h3>
          <h3 className="text-xl font-semibold mt-3">Overview</h3>
          <p className="text-lg mt-1">{info.detail.overview}</p>
          <h3 className="text-xl font-semibold mt-3">Movie Translated</h3>
          <p className="text-sm mt-1 mb-5">{info.translations.join(", ")}</p>
          <Link
            className="px-6 py-3 bg-[#6556cd] rounded-md flex items-center w-40"
            to={`${pathname}/trailer`}
          >
            <i className="text-2xl ri-play-fill mr-2"></i>
            Play Trailer
          </Link>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-y-4">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on Platfotms</h1>
            {info.watchproviders.flatrate.map((w) => (
              <img
                title={w.provider_name}
                className="w-14 rounded-md object-cover"
                key={w.provider_id}
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt={w.provider_name}
              />
            ))}
          </div>
        )}
        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on Rent</h1>
            {info.watchproviders.rent.map((w) => (
              <img
                title={w.provider_name}
                className="w-14 rounded-md object-cover"
                key={w.provider_id}
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt={w.provider_name}
              />
            ))}
          </div>
        )}
        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available to buy</h1>
            {info.watchproviders.buy.map((w) => (
              <img
                title={w.provider_name}
                className="w-14 rounded-md object-cover"
                key={w.provider_id}
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt={w.provider_name}
              />
            ))}
          </div>
        )}
      </div>
      <h1 className="mt-5 text-2xl font-semibold text-white">Recommendations & Similar stuff</h1>
      <HorizontalCards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />
      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default Moviedetails;
