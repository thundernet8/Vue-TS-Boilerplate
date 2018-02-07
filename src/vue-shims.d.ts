declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare var require: (filename: string) => any;
