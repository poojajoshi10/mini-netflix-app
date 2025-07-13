<template>
  <main role="main" aria-label="Mini Netflix App" :class="styles.container">
    <header :class="styles.header">
      <h1 :class="styles.title">Mini Netflix App</h1>
    </header>
    <section v-if="loading" aria-live="polite" :class="styles.message">
      Loading movies...
    </section>
    <section v-else-if="error" aria-live="assertive" :class="[styles.message, styles.error]">
      {{ error }}
    </section>
    <section v-else :class="styles.grid" role="grid" aria-label="Movie thumbnails">
      <MovieThumbnail v-for="movie in movies" :key="movie.imdbID" :movie="movie" />
    </section>
  </main>
</template>

<script setup>
import MovieThumbnail from '~/components/MovieThumbnail.vue';
import styles from './index.module.css';
const { fetchRandomMovies } = useMovies();
const movies = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  const data = await fetchRandomMovies();
  if (data.length) {
    movies.value = data;
  } else {
    error.value = 'No movies found. Please try again later.';
  }
  loading.value = false;
});
</script>