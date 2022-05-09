import { App } from 'vue'

import { Bar } from './components'

const components = [Bar]

const install = (app: App): void => {
  components.map(component => app.component(component.name, component))
}

export { Bar }

export default {
  install,
}
