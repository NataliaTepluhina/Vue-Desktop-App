<template>
  <Window title="fit-noted" width="600" height="400" margined v-on:close="exit">
    <Box>
      <Text>Welcome to your Vuido application!</Text>
      <Box horizontal padded>
        <Button stretchy>OK</Button>
        <Button stretchy>Cancel</Button>
      </Box>
    </Box>
  </Window>
</template>

<script>
export default {
  methods: {
    exit() {
      this.$exit();
    },
  },
};
</script>
