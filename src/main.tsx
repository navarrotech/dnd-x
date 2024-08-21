// Copyright © 2024 Navarrotech

// React.js
import { createRoot } from 'react-dom/client'

// Application
import { Initialization } from './routes/Initialization'
import { Router } from './Router'

// Libs
import '@/modules/firebase'
import '@/modules/i18n'
import { AllToasts } from './modules/toasts/AllToasts'

// Redux
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store/store'

// CSS Frameworksp
import 'rc-dock/dist/rc-dock.css' // <-- Base rc-dock styling
import '@/sass/rc-dock.sass' // <-- Custom styling for rc-dock
import '@/sass/multiprogress.sass' // <-- From Navarrotech
import '@/sass/switch.sass' // <-- From Navarrotech
import '@/index.sass' // <-- Includes Bulma, fonts, & global styles

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(
  <ReduxProvider store={store}>
    <Initialization>{
      Router
    }</Initialization>
    <AllToasts />
  </ReduxProvider>,
)
