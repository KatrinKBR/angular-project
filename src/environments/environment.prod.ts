export const environment = {
  production: true,
  MOVIE_LIST_URL: `https://api.themoviedb.org/3/discover/movie?api_key=5fe1a295cfdf0cd4bad8244749f1d833&language=es-ES&sort_by=popularity.desc&include_adult=false&page=1`,
  MOVIE_DETAILS_URL: (id: number) =>`https://api.themoviedb.org/3/movie/${id}?api_key=5fe1a295cfdf0cd4bad8244749f1d833&language=es-ES`,
  MOVIE_POSTER_URL: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2',
  LOGGED_USERS_URL: 'http://localhost:3000/logged-users',
  USERS_URL: 'http://localhost:3000/users',
  CART_URL: 'http://localhost:3000/cart'
};
