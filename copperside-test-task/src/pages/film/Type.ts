export type Film = {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
  Type: string;
};
export type FilmFull = Film & {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  Plot: string;
};
