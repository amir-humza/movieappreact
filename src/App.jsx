import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Movie from "./components/Movie";
import Tvshows from "./components/Tvshows";
import People from "./components/People";
import Moviedetails from "./components/partials/Moviedetails";
import TvDetails from "./components/partials/TvDetails";
import PersonDetails from "./components/partials/PersonDetails";
import Trailer from "./components/partials/Trailer";
import About from "./components/About";
import Contact from "./components/Contact";
// import Notfound from "./components/Notfound";

const App = () => {
  return (
    <div className="bg-[#1F1E24] w-[100%] h-fit flex flex-col md:flex-row">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/details/:id" element={<Moviedetails />}>
          <Route path="/movie/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/tv" element={<Tvshows />} />
        <Route path="/tv/details/:id" element={<TvDetails />}>
          <Route path="/tv/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/person" element={<People />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/person/details/:id" element={<PersonDetails />} />
        {/* <Route path="/trending/:media_type/:id" element={<Moviedetails />} /> */}
        {/* <Route path="*" element={<Notfound />} /> */}
      </Routes>
    </div>
  );
};

export default App;
