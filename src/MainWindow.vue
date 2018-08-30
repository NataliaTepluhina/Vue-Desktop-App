<template>
  <Window title="Weather in your city" width="400" height="150" margined v-on:close="exit">
    <Box padded>
      <Box horizontal padded>
        <TextInput stretchy v-model="query"/>
        <Button @click="showWeather">Search</Button>
      </Box>
      <Separator horizontal/>
      <Group margined>
        <Box padded>
          <Text v-if="error">There is no such city in the database</Text>
          <Box v-if="!!city">
            <Box padded horizontal>
              <Text stretchy>{{city}}, {{country}}</Text>
              <Text>{{temp}}&deg;C</Text>
            </Box>
            <Text>{{weatherDescription}}</Text>
            <Separator horizontal/>
            <Box padded horizontal>
              <Text stretchy>Min: {{tempMin}}&deg;C</Text>
              <Text stretchy>Max: {{tempMax}}&deg;C</Text>
              <Text stretchy>Humidity: {{humidity}}%</Text>
            </Box>
          </Box>
        </Box>
      </Group>
    </Box>
  </Window>
</template>

<script>
import axios from 'axios';
axios.defaults.baseURL = 'http://api.openweathermap.org/data/2.5';
export default {
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
    };
  },
  methods: {
    exit() {
      this.$exit();
    },
    showWeather() {
      axios
        .get(
          `/weather?q=${
            this.query
          }&units=metric&&appid=cf13c71a52bad00d4b2c1f253e198b06`,
        )
        .then(response => {
          this.city = response.data.name;
          (this.country = response.data.sys.country),
            (this.weatherDescription = response.data.weather[0].description);
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
