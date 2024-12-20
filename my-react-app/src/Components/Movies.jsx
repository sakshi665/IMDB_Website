import React, { useEffect, useState } from "react";
import axios from "axios";
import Moviecard from "./Moviecard";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
/* The `Movies` function in the provided code is a React functional component that displays a list of
trending movies fetched from an API. Here is a breakdown of what the function does: */
function Movies() {
  const [movies, setMovies] = useState([
    {
      url: "https://fastly.picsum.photos/id/866/450/300.jpg?hmac=LjxXLARrOTbivRrQD3Z2n3fNVwGNy21JDJduhoRLJ-s",
      title: "Movie 1",
    },
    {
      url: "https://fastly.picsum.photos/id/866/450/300.jpg?hmac=LjxXLARrOTbivRrQD3Z2n3fNVwGNy21JDJduhoRLJ-s",
      title: "Movie 2",
    },
    {
      url: "https://fastly.picsum.photos/id/866/450/300.jpg?hmac=LjxXLARrOTbivRrQD3Z2n3fNVwGNy21JDJduhoRLJ-s",
      title: "Movie 3",
    },
    {
      url: "https://fastly.picsum.photos/id/866/450/300.jpg?hmac=LjxXLARrOTbivRrQD3Z2n3fNVwGNy21JDJduhoRLJ-s",
      title: "Movie 4",
    },
    {
      url: "https://fastly.picsum.photos/id/866/450/300.jpg?hmac=LjxXLARrOTbivRrQD3Z2n3fNVwGNy21JDJduhoRLJ-s",
      title: "Movie 5",
    },
  ]);

  const [pageNo, setPageNo] = useState(1);
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/upcoming",
      params: { langauge: "en-US", page: pageNo },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODk3NDAzMGFmNzBmMzA5ZmI1NTViNTUxZDBlOWJhZSIsIm5iZiI6MTczMzAyNzgwNy42ODMsInN1YiI6IjY3NGJlN2RmNzQyYjMxMjRhZTk0N2Q0YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.maLWGcbV-9zgWamod3MPmTWe4DP7Fw29v7oObyqyxeM",
        // "Bearer sha512-arT8JpxB/8U3HymiY+fxmtKMwAonPxNOHgq8P4AQxTh5udIDMm6TJJdiVOdJf7XQ44LdZb4RjPLagTeVNakmkg==?yxeM",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setMovies(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [pageNo]);

  useEffect(() => {
    let moviesFromLS = localStorage.getItem("watchList");
    /* The line `console.log(moviesFromLS);` is logging the value of the `moviesFromLS` variable to the
    console. This is helpful for debugging and understanding what data is being retrieved from the
    local storage. It allows you to see the content of the `moviesFromLS` variable and verify if the
    data is being retrieved correctly from the local storage. */
    /* The line `console.log(moviesFromLS);` is logging the value of the `moviesFromLS` variable to the
    console. This is helpful for debugging and understanding what data is being retrieved from the
    local storage. It allows you to see the content of the `moviesFromLS` variable and verify if the
    data is being retrieved correctly from the local storage. */
    console.log(moviesFromLS);
    if (!moviesFromLS) return;
    setWatchList(JSON.parse(moviesFromLS));
  }, []);

  const handleNext = () => {
    setPageNo(pageNo + 1);
  };

  const handlePrevious = () => {
    if (pageNo === 1) return;
    setPageNo(pageNo - 1);
  };

  const addtoWatchlist = (movieObj) => {
    const updatedWatchList = [...watchList, movieObj];
    console.log(updatedWatchList);
    setWatchList(updatedWatchList);
    localStorage.setItem("watchList", JSON.stringify(updatedWatchList));
  };

  const removeFromWatchlist = (movieObj) => {
    let updatedWatchList = watchList.filter((obj) => obj.id != movieObj.id);
    console.log(updatedWatchList);
    setWatchList(updatedWatchList);
    localStorage.setItem("watchList", JSON.stringify(updatedWatchList));
  };

  // does contain movie in watchlist

  // function doesContain(movieObj) {
  //   return watchList.includes(movieObj.id);
  // }

  return (
    <div>
      {/* Heading */}
      <div className="text-2xl font-bold text-center my-5">
        <h1>Trending Movies</h1>
      </div>

      {/* CARD for movies */}
      <div className="flex justify-evenly flex-wrap gap-6">
        {movies.map((movieObj) => {
          return (
            <Moviecard
              key={movieObj.id}
              movieObj={movieObj}
              addtoWatchlist={addtoWatchlist}
              removeFromWatchlist={removeFromWatchlist}
              watchList={watchList}
            />
          );
        })}
      </div>

      {/* previous and next arrow */}
      <div className="flex justify-center gap-2 bg-gray-400 p-4 h-[50px] w-full mt-8">
        <div onClick={handlePrevious} className="cursor-pointer px-8">
          <FontAwesomeIcon icon={faArrowLeft} />
        </div>
        <div>{pageNo}</div>
        <div onClick={handleNext} className="cursor-pointer px-8">
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </div>
    </div>
  );
}

export default Movies;
