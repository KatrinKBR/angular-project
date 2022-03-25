// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  MOVIE_LIST_URL: `https://api.themoviedb.org/3/discover/movie?api_key=5fe1a295cfdf0cd4bad8244749f1d833&language=es-ES&sort_by=popularity.desc&include_adult=false&page=1`,
  MOVIE_DETAILS_URL: (id: number) =>`https://api.themoviedb.org/3/movie/${id}?api_key=5fe1a295cfdf0cd4bad8244749f1d833&language=es-ES`,
  MOVIE_POSTER_URL: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2',
  LOGGED_USERS_URL: 'http://localhost:3000/logged',
  USERS_URL: 'http://localhost:3000/users'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
