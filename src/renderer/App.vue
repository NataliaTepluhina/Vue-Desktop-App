<template>
  <main id="app">
    <section class="weather-input">
      <input type="text" v-model="query">
      <button :disabled="!query.length" @click="showWeather">Get weather</button>
    </section>
    <section v-if="error" class="weather-error">
      There is no such city in the database
    </section>
    <section v-if="city.length" class="weather-result">
      <div class="weather-result__main">
        {{city}}
      </div>
      <div class="weather-result__details">

      </div>
    </section>
  </main>
</template>

<script>
import axios from 'axios';
axios.defaults.baseURL = 'http://api.openweathermap.org/data/2.5';
const API_KEY = 'cf13c71a52bad00d4b2c1f253e198b06';
export default {
  name: 'weather-app',
  data() {
    return {
      query: '',
      error: false,
      city: '',
      country: '',
      weatherDescription: '',
      temp: null,
      tempMin: null,
      tempMax: null,
      humidity: null,
      icon: '',
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
          this.icon = `http://openweathermap.org/img/w/${
            response.data.weather[0].icon
          }.png`;
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

<style lang="scss">
#app {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
}

.weather-input,
.weather-result__main {
  display: flex;
  align-items: center;
}

input {
  width: 75%;
  outline: none;
  height: 20px;
  font-size: 0.8rem;
}

button {
  display: block;
  width: 25%;
  height: 25px;
  outline: none;
  border-radius: 5px;
  white-space: nowrap;
  margin: 0 15px;
  font-size: 0.8rem;
}
</style>
