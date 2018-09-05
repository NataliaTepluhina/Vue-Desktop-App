<template>
  <div id="app">
    {{city}}
    <button @click="showWeather">Get London Weather</button>
  </div>
</template>

<script>
import axios from 'axios';
axios.defaults.baseURL = 'http://api.openweathermap.org/data/2.5';
const API_KEY = 'cf13c71a52bad00d4b2c1f253e198b06';
export default {
  name: 'weather-app',
  data() {
    return {
      query: 'London',
      error: false,
      city: '',
      country: '',
      weatherDescription: '',
      temp: null,
      tempMin: null,
      tempMax: null,
      humidity: null,
    };
  },
  methods: {
    showWeather() {
      axios
        .get(`/weather?q=${this.query}&units=metric&&appid=${API_KEY}`)
        .then(response => {
          this.city = response.data.name;
          this.country = response.data.sys.country;
          this.weatherDescription = response.data.weather[0].description;
          this.temp = response.data.main.temp;
          this.tempMin = response.data.main.temp_min;
          this.tempMax = response.data.main.temp_max;
          this.humidity = response.data.main.humidity;
          this.error = false;
        })
        .catch(() => {
          this.error = true;
          this.city = '';
        });
    },
  },
};
</script>

<style>
/* CSS */
</style>
