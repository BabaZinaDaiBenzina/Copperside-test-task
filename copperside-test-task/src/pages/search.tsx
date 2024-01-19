import React, { useEffect, useState } from "react";
import Filmcard from "./film/components/Filmcard";
import type { Film } from "./film/Type";

function Search() {
  const [films, setFilms] = useState<Film[] | []>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [valueDirty, setValueDirty] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (fetching) {
      setCurrentPage((prevState) => prevState + 1);
      fetch(
        `http://www.omdbapi.com/?apikey=90813b17&s=${inputValue}&page=${currentPage}`,
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.Error) {
            console.log(data.Error);
            setNotFound(true);
          }
          if (data.Search) {
            console.log(data.Search);

            setFilms([...films, ...data.Search]);
            setNotFound(false);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  function findFilms(e: React.MouseEvent) {
    e.preventDefault();
    setCurrentPage(1);
    setFetching(true);
    films.length === 0 && setValueDirty(true);
    if (films.length === 0) {
      setNotFound(true);
    }
  }

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const scrollHandler = (e): void => {
    if (
      e.target.documentElement.scrollHeight -
        e.target.documentElement.scrollTop -
        window.innerHeight <
      50
    ) {
      setFetching(true);
      console.log("ты внизу страницы");

      window.scrollTo(
        0,
        e.target.documentElement.scrollHeight +
          e.target.documentElement.scrollTop,
      );
    }
  };
  useEffect(() => {
    if (inputValue === "" && valueDirty) {
      setInputValue("");
      setFilms([]);
      setNotFound(false);
    }
  }, [inputValue, valueDirty]);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div >
        <form>
          <div>
            <input
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
            <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={findFilms}>Search</button>
          </div>
        </form>
        <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
        {films ?
          films.map((film) => <Filmcard key={film.imdbID} film={film} />):('')}
        {notFound && (
          <p className="not-found">К сожалению, поиск не дал результатов</p>
        )}
        </div>
        
      </div>
    </div>
  );
}

export default Search;
