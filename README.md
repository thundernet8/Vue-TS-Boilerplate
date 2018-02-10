<div align="center">

## Vue-TS-Boilerplate

**A Vue.js starter boilerplate with typescript .**

[![GitHub issues](https://img.shields.io/github/issues/thundernet8/Vue-TS-Boilerplate.svg)](https://github.com/thundernet8/Vue-TS-Boilerplate/issues)
[![GitHub forks](https://img.shields.io/github/forks/thundernet8/Vue-TS-Boilerplate.svg)](https://github.com/thundernet8/Vue-TS-Boilerplate/network)
[![GitHub stars](https://img.shields.io/github/stars/thundernet8/Vue-TS-Boilerplate.svg)](https://github.com/thundernet8/Vue-TS-Boilerplate/stargazers)
[![dependency status](https://img.shields.io/david/thundernet8/Vue-TS-Boilerplate.svg?maxAge=3600&style=flat)](https://david-dm.org/thundernet8/Vue-TS-Boilerplate)
[![Build Status](https://travis-ci.org/thundernet8/Vue-TS-Boilerplate.svg?branch=master)](https://travis-ci.org/thundernet8/Vue-TS-Boilerplate)
[![GitHub license](https://img.shields.io/github/license/thundernet8/Vue-TS-Boilerplate.svg)](https://github.com/thundernet8/Vue-TS-Boilerplate/blob/master/LICENSE)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

</div>

<br>

## Usage

```
npm run build // 生产打包

npm run dev // 开发模式

npm run analyze // 生产打包并bundle分析

npm run lint // 代码Lint
```

## Note

Vue SFC 写法

一般建立组件名为名称的文件夹，内部包含`index.vue`和`index.ts`两个文件，`index.vue`为原始 SFC 代码，`index.ts`主要为了方便其他组件引入并添加类型支持，例:

```typescript
import HelloWorld from "./index.vue";
import Vue, { VueConstructor } from "vue";

declare module "vue/types/vue" {
    // Add global static props for Vue
    interface VueConstructor {}

    // Add global instance props for Vue
    interface Vue {}
}

interface IHelloWorld extends Vue {
    msg: string; // data
    hello: () => void; // method
}

export default HelloWorld as VueConstructor<IHelloWorld>;
```
