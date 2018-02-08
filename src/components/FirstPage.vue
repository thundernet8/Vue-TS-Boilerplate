<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <router-link to="/">Back to Home</router-link>
    <img :src="img" >
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

const img = require("@/assets/images/logo.png");

@Component
export default class FirstPage extends Vue {
  @Prop() prop1: string;

  data() {
    return {
      msg: "This is your first page" + this.prop1,
      img
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
