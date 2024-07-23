import Loder from "/loading.gif";

const Loading = () => {
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-black">
            <img className="md:w-[50%] w-[90%] h-[100%]" src={Loder} alt="Loading" />
        </div>
    )
}

export default Loading;