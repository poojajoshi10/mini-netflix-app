export const useMovies = () => {
  const config = useRuntimeConfig();
  const apiKey = config.public.omdbApiKey;

  if (!apiKey) {
    console.error("OMDB API key is missing or undefined");
  }

  // Function to fetch random movies
  const fetchRandomMovies = async () => {
    try {
      // Fetch multiple pages to create a pool (e.g., 3 pages, ~30 movies)
      const pages = [1, 2, 3];
      const searchTerm = "movie";
      const moviePool = [];

      for (const page of pages) {
        const url = `https://www.omdbapi.com/?s=${searchTerm}&page=${page}&type=movie&apikey=${apiKey}`;
        const response = await $fetch(url);
        if (response.Response === "True" && response.Search) {
          moviePool.push(...response.Search);
        }
      }

      // Randomly select 5 movies from the pool
      const shuffled = moviePool.sort(() => 0.5 - Math.random());
      const selectedMovies = shuffled.slice(0, 5);

      // Fetch full details for selected movies
      const moviePromises = selectedMovies.map(async (movie) => {
        const url = `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`;
        const response = await $fetch(url);
        if (response.Response === "True") {
          return response;
        }
        throw new Error(`Failed to fetch movie with ID ${movie.imdbID}`);
      });

      const movies = await Promise.all(moviePromises);
      return movies;
    } catch (error) {
      console.error("Error fetching random movies:", error);
      return [];
    }
  };

  const fetchMovieById = async (id) => {
    try {
      const url = `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`;
      const response = await $fetch(url);
      if (response.Response === "True") {
        return response;
      }
      return null;
    } catch (error) {
      console.error("Error fetching movie details:", error);
      return null;
    }
  };

  return { fetchRandomMovies, fetchMovieById };
};
