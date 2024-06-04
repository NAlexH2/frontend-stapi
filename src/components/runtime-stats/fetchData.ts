import { useState, useEffect } from 'react';
import axios from 'axios';

export const FetchData = (url, url1) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Run Times',
        data: [],
        backgroundColor:  ['rgba(0, 191, 255, 0.5)'],
        borderColor: 'rgba(204,204,204,0.5)',
        color:'rgba(204,204,204,0.5)',
      },
    ],
  });

  const [movieData, setMovieData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Release Year',
        data: [],
        backgroundColor:  ['rgba(0, 191, 255, 0.5)'],
        borderColor: 'rgba(204,204,204,0.5)',
        color:'rgba(204,204,204,0.5)',
      },
    ],
  });

  useEffect(() => {
    axios.get(url)
      .then((response) => {
        const series = response.data.series;
        const names = series.map(season => season.title);
        const runTimes = series.map(season => {
          let startDate = new Date(season.originalRunStartDate).getTime();
          let endDate = new Date(season.originalRunEndDate).getTime();

          if(startDate == null || isNaN(startDate) || startDate == 0) {
            startDate = new Date().getTime();
          }

          if(isNaN(endDate) || endDate == null || endDate == 0) {
            endDate = new Date().getTime();
          }

          return [startDate, endDate];
        });

        setChartData({
          labels: names,
          datasets: [
            {
              label: 'Run Times',
              data: runTimes,
              backgroundColor:  ['rgba(0, 191, 255, 0.5)'],
              borderColor: 'rgba(204,204,204,0.5)',
              color:'rgba(204,204,204,0.5)',
            },
          ],
        });
      })
      .catch((error) => {
        console.error('Request Failed', error);
      });
  }, [url]);

  useEffect(() => {
    axios.get(url1)
      .then((response) => {
        const movies = response.data.movies;
        const names = movies.map(movie => movie.title);
        const runTimes = movies.map(movie => {
          let releaseDate = new Date(movie.usReleaseDate).getTime();

          if(releaseDate == null || isNaN(releaseDate) || releaseDate == 0) {
            releaseDate = new Date().getTime();
          }

          return {
            x: new Date(releaseDate).getFullYear(),
            y: movie.title
          };
        });

        setMovieData({
          labels: names,
          datasets: [
            {
              label: 'Release Year',
              data: runTimes,
              backgroundColor:  ['rgba(0, 191, 255, 0.5)'],
              borderColor: 'rgba(204,204,204,0.5)',
              color:'rgba(204,204,204,0.5)',
            },
          ],
        });
      })
      .catch((error) => {
        console.error('Request Failed', error);
      });
  }, [url1]);

  return { chartData, movieData };
};
