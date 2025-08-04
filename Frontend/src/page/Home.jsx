import React from "react";

function Home() {
  return (
    <div className=" h-screen place-content-center justify-center place-items-center">
      <div className=" text-center mb-6 ">
        <h2 className="text-6xl font-semibold">Welcome To News Aggregation </h2>
      </div>
      <div className=" justify-center items-center text-center mb-6">
        <p className=" text-lg text-gray-500  mb-6">
          A community-driven platform to combat <br /> misinformation through
          collaborative fact-checking
        </p>
        <div className=" text-center place-content-center min-w-max ">
          <p className=" bg-gray-200 py-2 text-black rounded-full ">
            With More Feature
          </p>
        </div>
      </div>
      <div className=" mt-10 ">
        <a
          href="http://"
          className=" bg-black text-white py-4 px-8 rounded-full "
        >
          Explore News Feeds
        </a>
      </div>
    </div>
  );
}

export default Home;
