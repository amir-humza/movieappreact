import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  asyncloadperson,
  removeperson,
} from "../../store/actions/personActions";
import Loading from "../Loading";
import HorizontalCards from "../partials/HorizontalCards";
import Dropdown from "./Dropdown";

const PersonDetails = () => {
  const [category, setcategory] = useState("movie");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  // console.log(info);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);
  // console.log(info);
  return info ? (
    <div className="px-[10%] w-[100%] bg-[#1F1E24]">
      <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>
      </nav>
      <div className="w-full flex-col sm:flex-row flex md:gap-10">
        <div className="md:w-[20%]">
          <img
            className="shadow-[8px_17px_38px_2px_raba(0,0,0,.5)]  object-cover"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt=""
          />
          <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500"></hr>
          <div className="text-2xl text-white flex gap-x-5">
            <a
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}/`}
            >
              <i className="ri-earth-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <i className="ri-facebook-circle-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i className="ri-instagram-fill"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.twitter.com/${info.externalid.twitter_id}`}
            >
              <i className="ri-twitter-x-fill"></i>
            </a>
          </div>
          <h1 className="text-2xl text-zinc-400 font-semibold mt-5 ">
            Person Info
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-3">
            Known for
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold">
            {info.detail.known_for_department}
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Gender</h1>
          <h1 className="text-lg text-zinc-400 font-semibold">
            {info.detail.gender === 2 ? "Male" : "Female"}
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-3">
            Date of birth
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold">
            {info.detail.birthday}
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-3">Deathday</h1>
          <h1 className="text-lg text-zinc-400 font-semibold">
            {info.detail.deathday ? info.detail.deathday : "Still Alive hehe."}
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-3">
            Place Of Birth
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold">
            {info.detail.place_of_birth}
          </h1>
        </div>
        <div className="md:w-[80%]">
          <h1 className="text-4xl text-zinc-400 font-black ">
            {info.detail.name}
          </h1>
          <p className="text-base text-zinc-400 font-normal mt-2">
            {info.detail.biography}
          </p>
          <h1 className="text-2xl text-zinc-200 my-2 font-semibold ">
            Known For
          </h1>
          <HorizontalCards data={info.combinedCredits.cast} />
          <div className="w-full flex justify-between">
            <h1 className="mt-5 text-xl text-zinc-400 font-semibold">Acting</h1>
            <Dropdown
              title="Catgory"
              options={["tv", "movie"]}
              func={(e) => setcategory(e.target.value)}
            />
          </div>
          <div className="list-disc w-full h-[50vh] mt-5 overflow-y-auto">
            {info[category + "Credits"].cast.map((c, i) => (
              <li key={i} className="hover:text-white text-zinc-400 p-4 hover:bg-[#19191d] duration-300 cursor-pointer">
                <Link to={`/${category}/details/${c.id}`} className="">
                  <span>{c.name || c.title || c.original_name || c.original_title}</span>
                  <span className="block ml-5">Character Name - {c.character}</span>
                </Link>
              </li>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PersonDetails;
