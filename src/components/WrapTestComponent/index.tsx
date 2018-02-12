import { Component, Prop } from "vue-property-decorator";
import { VueComponent } from "vue-tsx-helper";
import TestComponent from "../TestComponent";

/**
 * Vue component props types
 */
interface IProps {}

@Component
export default class WrapTestComponent extends VueComponent<IProps> {
    @Prop() msg;

    render(h) {
        return (
            <TestComponent msg={"msg from parent"}>
                <h2>Page writed without .vue but plain tsx</h2>
                <anyslot is="router-link" to="/">
                    Back to home
                </anyslot>
            </TestComponent>
        );
    }
}
