import Link from "next/link";
import React from "react";
import type { Film } from "../Type";

function Filmcard({ film }: { film: Film }) {
  return (
    <div className="h-200 sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 relative w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:h-64">
      <Link href={`/film/${film.imdbID}`}>
        <div>{film.Title}</div>
      </Link>
      <div>
        <button className="flex w-75 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">просмотрено</button>
        {/* кнопка просмотрено должна добавлять в просмотренные фильмы  */}

        <span>Рейтинг</span>
        {/* <input type="text"  /> */}
        {/* реализовать добавление рейтинга */}
      </div>
      <div>{film.Year}</div>
      <Link href={`/film/${film.imdbID}`}>
        <img src={film.Poster} alt="poster" />
      </Link>
    </div>
  );
}

export default Filmcard;
