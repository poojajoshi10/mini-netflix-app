# Mini Netflix App

Mini Netflix App is a simple two page nuxt web application that randomly fetches any 5 movies from external API and renders them on UI. 

## Key Points
Responsive upto 375 px.

Semantic HTML included.

WCAG accessibility kept in mind.

Used CSS Modules for styling

Reusable modules/components like useMovies, MovieThumbnail, MovieDetail etc

fetch, storing API key in env file rather than hardcoding 

Nuxt is the only dependency and kept up with the latest version

## Environment Variable
Create a `.env` file with:

```bash
export OMDB_API_KEY=your_omdb_api_key
```
## Build System

Provided a node script[scripts/automation.js] that creates minified assets and run local server with watch/hot reload
```bash
# Runs both build and local server with hot reload
npm run automate
```

## How to run created build

```bash
# Run the created build on any specific port number
PORT=portNumber node .output/server/index.mjs
