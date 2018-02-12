import HelloWorld from "./index.vue";
import Vue, { VueConstructor } from "vue";

declare module "vue/types/vue" {
    // Add global static props for Vue
    interface VueConstructor {}

    // Add global instance props for Vue
    interface Vue {}
}

interface IProps {
    propMessage: string;
}

interface IHelloWorld extends Vue {
    msg: string;
    hello: () => void;
    props: IProps;
}

export default HelloWorld as VueConstructor<IHelloWorld>;
