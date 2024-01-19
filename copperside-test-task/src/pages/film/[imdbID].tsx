import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { FilmFull } from "./Type";
import Link from "next/link";

export default function FilmPage() {
  const router = useRouter();
  const { imdbID } = router.query;

  const [film, setFilm] = useState<FilmFull | null>(null);
  console.log(film);

  async function getFilm() {
    const data = await (
      await fetch(`http://www.omdbapi.com/?apikey=90813b17&i=${imdbID}`)
    ).json();
    setFilm(data);
  }
  useEffect(() => {
    getFilm();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {film && (
        <div className="idden lg:grid lg:grid-cols-1 lg:gap-y-8">
          <div className="grid grid-cols-1  sm:grid-cols-1 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-black hover:bg-white/20"
              href="/search"
            >
              <h3 className="text-2xl font-bold">Back to Search Page</h3>
            </Link>

            <button className="w-75 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              просмотрено
            </button>
            {/* кнопка просмотрено должна добавлять в просмотренные фильмы  */}
          </div>
          <span>Рейтинг</span>
          {/* <input type="text"  /> */}
          {/* реализовать добавление рейтинга */}
          <div>Название: {film.Title}</div>
          <div>Актеры: {film.Actors}</div>
          <div>Награды: {film.Awards}</div>
          <div>Сборы: {film.BoxOffice}</div>
          <div>Страна: {film.Country}</div>
          <div>Сюжет: {film.Plot}</div>
          <div>Год: {film.Year}</div>
          <img
            className="h-full w-full object-cover object-center"
            src={film.Poster}
            alt="poster"
          />
        </div>
      )}
    </div>
  );
}
