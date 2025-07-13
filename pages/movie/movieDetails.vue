<template>
  <main role="main" aria-label="Movie Details" :class="styles.container">
    <header :class="styles.header">
      <NuxtLink to="/" :class="styles.backButton" aria-label="Back to homepage">
        Back to Home
      </NuxtLink>
    </header>
    <section v-if="loading" aria-live="polite" :class="styles.message">
      Loading movie details...
    </section>
    <section v-else-if="error" aria-live="assertive" :class="[styles.message, styles.error]">
      {{ error }}
    </section>
    <section v-else-if="movie" role="article" aria-label="Movie information">
      <MovieDetails :movie="movie" />
    </section>
    <section v-else aria-live="assertive" :class="styles.message">
      Movie not found. <NuxtLink to="/" :class="styles.link">Return to home</NuxtLink>.
    </section>
  </main>
</template>

<script setup>
import styles from './movieDetails.module.css';
const { fetchMovieById } = useMovies();
const route = useRoute();
const movie = ref(null);
const loading = ref(true);
const error = ref(null);

const movieId = computed(() => {
  const id = route.query.movieId;
  return typeof id === 'string' && /^tt\d{7,8}$/.test(id) ? id : null;
});

onMounted(async () => {
  if (movieId.value) {
    const data = await fetchMovieById(movieId.value);
    if (data) {
      movie.value = data;
    } else {
      error.value = 'Failed to fetch movie details. Please check your API key or try again.';
    }
  } else {
    error.value = 'Invalid or missing movie ID.';
  }
  loading.value = false;
});
</script>