<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <router-link to="/">Back to Home</router-link>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";

@Component
export default class FirstPage extends Vue {
  data() {
    return {
      msg: "This is your first page"
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
