import { Link, useNavigate } from "react-router-dom";
import not from "/404.gif";

const Notfound = () => {
    const navigate = useNavigate();
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-black">
            <Link
          onClick={() => navigate(-1)}
          className="hover:scale-125 hover:text-red-800  ease-in-out duration-300  ri-close-fill text-3xl text-red-600 absolute right-[5%] top-[5%]"
        ></Link>
            <img className="w-[50%] h-[100%]" src={not} alt="Notfound" />
        </div>
    )
}

export default Notfound;