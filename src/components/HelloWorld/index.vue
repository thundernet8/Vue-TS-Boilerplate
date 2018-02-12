<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <router-link to="page1">First Page</router-link>
    <router-link to="plaintsx">Second Page</router-link>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
// export default {
//     name: "HelloWorld",
//     data() {
//         return {
//             msg: "Welcome to Your Vue.js App"
//         };
//     }
// };

@Component({
    props: {
        propMessage: String
    }
})
export default class HelloWorld extends Vue {
    // initial data
    msg = "Welcome to Your Vue.js App with TypeScript";

    // lifecycle hook
    mounted() {
        this.hello();
    }

    // computed
    get computedMsg() {
        return "computed " + this.msg;
    }

    // method
    hello() {
        console.log("hello, " + this.msg);
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
