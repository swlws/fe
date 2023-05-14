# alova

先总结一句：凭直观感觉，在一定程度上`alova`减轻了服务端的压力。但代价是增加了前端工程的复杂度、调试难度，甚至可能增加出 BUG 的频次。

# 一、概述

## 1.1 `alova`是什么

轻量级的请求策略库，它针对不同请求场景分别提供了具有针对性的请求策略，来提升应用可用性、流畅性，降低服务端压力，让应用如智者一般具备卓越的策略思维。

## 1.2 `alova`支持的请求策略

`alova`是核心库，它提供了缓存策略、请求共享策略，以及状态管理等通用功能，能满足 90%+的请求需求。而将具体的请求策略方案放在了`@alova/scene-vue`、`@alova/scene-react`、`@alova/scene-svelte` 中，它们是依赖 alova 的扩展功能开发的，目前提供了以下两个主要的请求策略。

- 分页请求策略。自动管理分页数据，数据预加载，减少不必要的数据刷新，流畅性提高 300%，编码难度降低 50%。
- 静默提交策略。提交即响应，大幅降低网络波动造成的影响，让你的应用在网络不稳定，甚至断网状态下依然可用。

## 1.3 `alova`对 UI 框架的支持

目前支持 vue、react 和 react-native、svelte，同时也支持 Uniapp、Taro

## 1.4 `alova`的特性

1. 🕶 支持 vue、react、svelte
2. 📑 与 axios 相似的 api 设计，更简单熟悉
3. 🍵 开箱即用的高性能请求策略，让应用更流畅
4. 🐦 4kb，只有 axios 的 30%+
5. 🔩 高灵活性，兼容任意请求库，如 axios、superagent 或 fetch-api
6. 🔋 3 种数据缓存模式，提升请求性能，同时降低服务端压力
7. 🔌 丰富的扩展功能，可以自定义请求适配器、存储适配器、中间件，以及 states hook
8. 🖥️ [2.2.0+]服务端渲染（SSR）
9. 💕 请求共享，避免同时发送相同请求
10. 🪑 数据预拉取，这意味着用户可以更快看到信息，无需等待
11. 🦾 实时自动状态管理
12. 🎪 交互式文档和示例
13. 🎈 Typescript 支持
14. ⚡ 支持 tree shaking，这意味着 alova 的生产体积往往小于 4kb

# 二、创建请求实例

在 vue 中使用 alova 发送一个请求。

```ts
import { createAlova } from "alova";
import GlobalFetch from "alova/GlobalFetch";
import VueHook from "alova/vue";

const alovaInstance = createAlova({
  baseURL: "https://api.alovajs.org",
  timeout： 5000，
  statesHook: VueHook,
  requestAdapter: GlobalFetch(),
  beforeRequest(method) {
    method.config.headers.token = "token";
  },
  responded(response, method){}
});
```

## 2.1 baseURL【可选值】

常规请求库一般都会有这个参数，默认请求的前缀。

## 2.2 statesHook【必填值】

它用于确定在 use hook（例如 useRequest）应该如何返回状态化数据，statesHook 将会帮我们创建不同 UI 框架的请求相关的、可以被 Alova 管理的状态，包括请求状态 loading、响应数据 data、请求错误对象 error 等。

## 2.3 requestAdapter【必填】

请求适配器，请求适配器将用于所有请求的发送，请求发送模块和具体的请求信息是解耦的。

示例中使用的`GlobalFetch`, 查看它的源码，它实际上就是对`fetch`的一层封装。所以说本质上`alova`不是一个请求库，而是一个策略库，它对不同的场景使用不同的策略，在处理前端工作时，性能更优。

```ts
// GlobalFetch源码
/**
 * alova 2.4.1 (https://alova.js.org)
 * Document https://alova.js.org
 * Copyright 2023 JOU-amjs. All Rights Reserved
 * Licensed under MIT (https://httpshub.com/alovajs/alova/blob/main/LICENSE)
 */

function GlobalFetch() {
  return function (elements, method) {
    //  ...
    const fetchPromise = fetch(elements.url, {
      ...adapterConfig,
      method: elements.type,
      signal: ctrl.signal,
      body: isBodyData(data) ? data : JSONStringify(data),
    });
    return {
      response: () => {
        /** **/
      },
      // headers函数内的then需捕获异常，否则会导致内部无法获取到正确的错误对象
      headers: () => {
        /** **/
      },
      // 因nodeFetch库限制，这块代码无法进行单元测试，但已在浏览器中通过测试
      /* c8 ignore start */
      onDownload: (cb) => {
        /** **/
      },
      /* c8 ignore start */
      abort: () => {
        /** **/
      },
    };
  };
}
```

## 2.4 beforeRequest responded

针对`request`、`response`的拦截器。处理模式与`axios`类似。

## 2.5 实例方法

支持 GET、POST、PUT、DELETE、HEAD、OPTIONS、PATCH

## 2.6 hook

| hook       | 特性                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------ |
| useRequest | 返回响应式数据                                                                                   |
| useWatcher | 当数据发生变化时，主动发送一次请求；初始化时，默认立即发送一次请求，可以通过配置文件取消默认行为 |
| useFetcher | 预拉取一次数据，缓存下次即将使用的数据                                                           |

缓存模式：

- 内存模式（默认的模式）
- 缓存占用模式
- 恢复模式

# 三、总结

## 1. 混存策略

`alova`在业务层上做了缓存处理，优化了请求的性能问题。缓存策略，带来了好处，但随之而来的也有一些弊端：

- 复杂度增加。针对每个请求需要制定自身的缓存策略，
- 缓存管理的混乱。缓存的失效问题，按照时间失效、手动失效等、哪部分数据失效等，管理上更加复杂。
- 调试困难。新增了缓存策略，在排除故障时，需要考虑是前端缓存的问题？还是后台混存的问题。
- 升级问题。升级时 API 返回的数据可能会所有变化，缓存策略会导致拿不到新数据。

## 2. 共享请求

是一种很好的策略，对同一个请求 URL 进行合并，请求只发送到服务端一次，所有请求公用同一份返回的数据。

优劣势：

1. 【优势】解决前端防抖问题。

# 参考

- [^] [alova.js.org](https://alova.js.org/zh-CN/)
