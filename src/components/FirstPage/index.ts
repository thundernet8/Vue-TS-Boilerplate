import FirstPage from "./index.vue";
import Vue, { VueConstructor } from "vue";

declare module "vue/types/vue" {
    // Add global static props for Vue
    interface VueConstructor {}

    // Add global instance props for Vue
    interface Vue {}
}

interface IFirstPage extends Vue {
    msg: string;
    img: string;
    say(): void;
}

export default FirstPage as VueConstructor<IFirstPage>;
