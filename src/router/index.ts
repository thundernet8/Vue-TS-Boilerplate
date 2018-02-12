import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "../components/HelloWorld";
import FirstPage from "../components/FirstPage";
import WrapTestComponent from "../components/WrapTestComponent";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "HelloWorld",
            component: HelloWorld
        },
        {
            path: "/page1",
            name: "FirstPage",
            component: FirstPage
        },
        {
            path: "/plaintsx",
            name: "WrapTestComponent",
            component: WrapTestComponent
        }
    ]
});
