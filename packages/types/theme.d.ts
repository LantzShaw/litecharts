interface SeriesColors {
  [index: any]: string
}

export interface ThemeColor {
  backgroundColor: string
  textColor: string
  seriesColors: SeriesColors[][]
}

export interface Theme {
  light: ThemeColor
  dark: ThemeColor
}

export type ThemeMode = 'light' | 'dark' // 字符串字面量类型
