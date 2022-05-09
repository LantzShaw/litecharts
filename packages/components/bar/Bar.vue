<template>
  <v-chart
    ref="chart"
    style="height: 400px"
    :option="option"
    :loading="isLoading"
    :loadingOptions="loadingOptions"
  />
</template>

<script lang="ts" name="Bar" setup>
import { ref, provide, watch, onMounted } from 'vue'
import { use, graphic } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import VChart, { THEME_KEY } from 'vue-echarts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components'

import useTheme from '../../hooks/useTheme'
import { THEME } from '../../constants/theme'
import { SIZE } from '../../constants/size'
import { DIRECTION } from '../../constants/direction'

// withDefault暂不支持t引入外部interface
// import type { Props } from './data'

import type { ThemeMode, Theme } from '../../types/theme'
import type { SizeObject } from '../../types/size'
import type { Direction } from '../../types/direction'

interface LoadingOptions {
  color: string
  text: string
  [propName: string]: any
}

interface Props {
  title?: string
  isLoading?: boolean
  loadingOptions?: LoadingOptions
  theme?: Theme
  size?: SizeObject
  direction?: Direction
  themeMode?: ThemeMode
  legendData?: string[]
  xAxisData?: (string | number)[]
  seriesData?: (string | number)[][]
}

use([CanvasRenderer, BarChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent])

const props = withDefaults(defineProps<Props>(), {
  title: '',
  isLoading: false,
  loadingOptions: () => ({ color: '#01aaed', text: 'Loading...' }),
  theme: () => THEME,
  size: () => SIZE,
  direction: () => DIRECTION,
  themeMode: 'light',
  legendData: () => [],
  xAxisData: () => [],
  seriesData: () => [[]],
})

const chartRef = ref<HTMLElement | null>(null)

const { title, legendData, xAxisData, seriesData, themeMode, theme } = props

provide(THEME_KEY, props.themeMode)

const THEME_COLOR = useTheme(themeMode, theme)

const option = ref<any>({
  // 优先级高于 themeMode
  backgroundColor: THEME_COLOR?.backgroundColor,
  grid: {
    left: '2%',
    right: '2%',
    bottom: '2%',
    containLabel: true,
  },
  title: {
    text: title ?? '',
    left: 'center',
    show: title ? true : false,
  },
  legend: {
    show: true,
    orient: DIRECTION.legendOrient,
    left: 'right',
    textStyle: {
      color: THEME_COLOR?.textColor,
    },
  },
  tooltip: {
    trigger: 'axis', // "axis" | "item"
    // axisPointer: {
    //   type: this.seriesData[0].type === 'bar' ? null : 'cross',
    // },
    // formatter: '{a} <br/>{b} : {c}',
  },
  xAxis: {
    type: 'category',
  },
  yAxis: {
    type: 'value',
  },
  series: [],
})

const setupYAxis = () => {}

const setupXAxis = () => {
  option.value.xAxis.data = xAxisData
}

const setupLegend = () => {
  option.value.legend.data = legendData
}

const setupSeries = () => {
  option.value.series = []

  seriesData?.forEach((item: any, index: number) => {
    option.value.series.push({
      name: legendData[index],
      nameStyle: {
        color: THEME_COLOR?.textColor,
      },
      type: 'bar',
      radius: '55%',
      center: ['50%', '60%'],
      smooth: true,
      // barGap: '10%',
      // barCategoryGap: this.barCategoryGap,
      // barWidth: this.isScale ? null : 27,
      barWidth: SIZE.barWidth ?? null,
      showAllSymbol: false,
      // yAxisIndex: item.yAxisIndex ? item.yAxisIndex : null,
      areaStyle: {},
      itemStyle: {
        barBorderRadius: SIZE.barBorderRadius,
        normal: {
          color: () => {
            return new graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: THEME_COLOR?.seriesColors[index][0] as string,
              },
              {
                offset: 0.5,
                color: THEME_COLOR?.seriesColors[index][1] as string,
              },
              {
                offset: 1,
                color: THEME_COLOR?.seriesColors[index][2] as string,
              },
            ])
          },
        },
      },
      data: item,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.3)',
        },
      },
    })
  })
}

const updateChart = () => {
  // option.value.title.text = props.title

  setupXAxis()
  setupSeries()
}

const setupTheme = () => {
  option.value.backgroundColor = THEME_COLOR?.backgroundColor
}

watch(
  () => option,
  () => {
    console.log('option changed')

    updateChart()
  }
)

watch(
  () => props.themeMode,
  () => {
    console.log('themeMode changed')

    setupTheme()

    console.log(chartRef)

    // chartRef.value.setOption(option.value)
  }
)

onMounted(() => {
  console.log('mounted')

  updateChart()
})
</script>
