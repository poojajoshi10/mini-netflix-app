<template>
    <article role="gridcell" :class="styles.card">
      <NuxtLink :to="{ path: '/movie/movieDetails', query: { movieId: movie.imdbID } }" :class="styles.link" :aria-label="`View details for ${movie.Title}`">
        <figure>
          <img :src="movie.Poster" :alt="`Poster for ${movie.Title}`" :class="styles.image" loading="lazy" />
          <figcaption :class="styles.caption">
            <h3 :class="styles.title">{{ movie.Title }}</h3>
            <p :class="styles.year">{{ movie.Year }}</p>
          </figcaption>
        </figure>
      </NuxtLink>
    </article>
  </template>
  
  <script setup>
  import styles from './MovieThumbnail.module.css';
  defineProps({
    movie: {
      type: Object,
      required: true,
      validator: (movie) => ['imdbID', 'Title', 'Year', 'Poster'].every((key) => key in movie),
    },
  });
  </script>