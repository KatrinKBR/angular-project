export interface Movie {
    id: number,
    poster_path: string,
    title: string,
    release_date: string
}

export interface MovieDetails extends Movie {
    tagline: string,
    overview: string,
    genres: Genre[],
    runtime: number,
    original_language: string,
    vote_average: number,
    price: number
}

interface Genre {
    id: number,
    name: string
}
