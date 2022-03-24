export const PATH_URL: any = {
    MOVIE_LIST: `https://api.themoviedb.org/3/discover/movie?api_key=5fe1a295cfdf0cd4bad8244749f1d833&language=es-ES&sort_by=popularity.desc&include_adult=false&page=1`,
    MOVIE_DETAILS: (id: number) =>`https://api.themoviedb.org/3/movie/${id}?api_key=5fe1a295cfdf0cd4bad8244749f1d833&language=es-ES`,
    MOVIE_POSTER: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2'
}
