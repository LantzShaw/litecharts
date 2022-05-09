import { App } from 'vue'

import Bar from './Bar.vue'

Bar.install = (app: App): void => {
  app.component(Bar.name, Bar)
}

export default Bar
