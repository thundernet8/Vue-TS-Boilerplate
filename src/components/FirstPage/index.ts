import FirstPage from "./index.vue";
import Vue, { VueConstructor } from "vue";

declare module "vue/types/vue" {
    interface VueConstructor {
        http: string;
    }
}

interface IFirstPage extends Vue {
    msg: string;
    img: string;
    say(): void;
}

export default FirstPage as VueConstructor<IFirstPage>;
