import HelloWorld from "./index.vue";
import Vue, { VueConstructor } from "vue";

declare module "vue/types/vue" {
    interface VueConstructor {
        welcome: boolean;
    }
}

interface IHelloWorld extends Vue {
    hello: () => void;
}

export default HelloWorld as VueConstructor<IHelloWorld>;
