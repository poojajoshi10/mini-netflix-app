<template>
    <article :class="styles.card">
      <figure :class="styles.figure">
        <img :src="movie.Poster" :alt="`Poster for ${movie.Title}`" :class="styles.image" loading="lazy" />
      </figure>
      <div :class="styles.content">
        <h2 :class="styles.title">{{ movie.Title }}</h2>
        <p :class="styles.plot">{{ movie.Plot }}</p>
        <dl :class="styles.details">
          <dt :class="styles.label">Rating:</dt>
          <dd :class="styles.value">{{ movie.imdbRating }}/10</dd>
          <dt :class="styles.label">Year:</dt>
          <dd :class="styles.value">{{ movie.Year }}</dd>
          <dt :class="styles.label">Director:</dt>
          <dd :class="styles.value">{{ movie.Director }}</dd>
          <dt :class="styles.label">Actors:</dt>
          <dd :class="styles.value">{{ movie.Actors }}</dd>
        </dl>
      </div>
    </article>
  </template>
  
  <script setup>
  import styles from './MovieDetails.module.css';
  defineProps({
    movie: {
      type: Object,
      required: true,
      validator: (movie) => ['Poster', 'Title', 'Plot', 'imdbRating', 'Year', 'Director', 'Actors'].every((key) => key in movie),
    },
  });
  </script>