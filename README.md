# litecharts

[![GitHub license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/LantzShaw/litecharts/LICENSE) [![npm version](https://img.shields.io/npm/v/litecharts.svg?style=flat)](https://www.npmjs.com/package/litecharts) 

A simple charts baseed on vue-echarts

## Installation

```sh
$ npm i echarts vue-echarts litecharts -S
```

## Usage

**Fully Import**

```ts
import { createApp } from 'vue'
import litecharts from 'litecharts'

import App from './App.vue'

const app = createApp(App)

app.use(litecharts)
app.mount('#app')
```

**Manually Import**

```vue
<template>
    <Bar :options="options" />
    <Line :options="options" />
</template>

<script lang="ts" setup>
import { Bar, Line } from 'litecharts'
</script>
</script>
```