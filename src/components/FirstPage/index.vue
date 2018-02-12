<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <router-link to="/">Back to Home</router-link>
    <anyslot is="router-link" to="/">Backtohome</anyslot>
    <img :src="img" >
  </div>
</template>

<script lang="ts">
// import { Component, Prop, Vue } from "vue-property-decorator";
import Vue from "vue";

const img = require("@/assets/images/logo.png");

export interface IData {
    msg: string;
    img: string;
}

export interface IMethods {
    say(): void;
}

interface IComputed {}

interface IProps {
    propMessage: String;
}

export default Vue.extend<IData, IMethods, IComputed, IProps>({
    name: "FirstPage",
    data() {
        return {
            msg: "This is the first page!",
            img
        };
    },
    methods: {
        say() {
            console.log(this.msg);
        }
    },
    mounted() {
        console.log("mounted");
    }
});
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
