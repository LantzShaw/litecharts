import type { ThemeMode, Theme } from '../../types/theme'
import type { SizeObject } from '../../types/size'
import type { Direction } from '../../types/direction'

interface LoadingOptions {
  color: string
  text: string
  [propName: string]: any
}

export interface Props {
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
