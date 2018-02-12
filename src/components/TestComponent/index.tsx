import { Component, Prop } from "vue-property-decorator";
import { VueComponent } from "vue-tsx-helper";

/**
 * Vue component props types
 */
interface IProps {
    msg: string;
}

const mixin = {
    created() {
        console.log("mixin created");
    }
};

@Component({
    name: "TestComponent",
    mixins: [mixin]
})
export default class TestComponent extends VueComponent<IProps> {
    @Prop() msg;

    created() {
        console.log("created");
    }

    render(h) {
        return (
            <div class="container">
                {"parent message: " + this.msg}
                {this.$slots.default}
            </div>
        );
    }
}
