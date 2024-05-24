import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css'
import './index.scss'

import { MantineProvider } from '@mantine/core'

// Get root html element from the DOM
const root = document.getElementById('root')!

// Render App into the root element
createRoot(root).render(
  <MantineProvider>
    <App />
  </MantineProvider>
)
