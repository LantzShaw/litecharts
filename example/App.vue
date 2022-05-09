<template>
  <Bar
    :isLoading="false"
    :themeMode="themeMode"
    :legendData="legendData"
    :xAxisData="xAxisData"
    :seriesData="seriesData"
  />
  <button @click="toggleTheme">Toggle Theme</button>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'

import type { ThemeMode } from '../packages/types/theme'
// import { Bar } from '../lib/bundle.es'
import { Bar } from '../packages'

const legendData = ref(['test'])
const themeMode = ref<ThemeMode>('light')
const xAxisData = ref(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
const seriesData = reactive([
  [150, 230, 224, 218, 135, 147, 260],
  [150, 230, 224, 218, 135, 147, 260],
])

const toggleTheme = () => {
  themeMode.value = themeMode.value === 'light' ? 'dark' : 'light'

  console.log(themeMode.value)
}
</script>

<style lang="scss" scoped></style>
