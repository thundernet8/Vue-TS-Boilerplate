<template>
  <div id="app">
    <img src="./assets/images/logo.png">
    <router-view :propMessage="msg"/>
  </div>
</template>

<script>
require("./assets/styles/main.less");

export default {
    name: "App",
    data() {
        return {
            msg: "Prop Message"
        };
    }
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
