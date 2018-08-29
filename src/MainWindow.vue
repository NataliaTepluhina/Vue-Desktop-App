<template>
  <Window title="Weather in your city" width="600" height="250" margined v-on:close="exit">
    <Box>
      <Text>{{link}}</Text>
      <Box horizontal padded>
        <Button stretchy>OK</Button>
        <Button stretchy>Cancel</Button>
      </Box>
    </Box>
  </Window>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      link: '',
    };
  },
  methods: {
    exit() {
      this.$exit();
    },
  },
  created() {
    axios
      .get(
        'http://api.openweathermap.org/data/2.5/weather?q=London&&appid=cf13c71a52bad00d4b2c1f253e198b06',
      )
      .then(response => {
        this.link = response.data.name;
      });
  },
};
</script>
