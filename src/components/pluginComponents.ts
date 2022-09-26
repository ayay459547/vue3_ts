import type { App } from 'vue'

// element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const pluginComponents = {
  install(app: App): void {
    app.use(ElementPlus)

    library.add(fas, fab, far)
    app.component('font-awesome-icon', FontAwesomeIcon)
  }
}

export default pluginComponents