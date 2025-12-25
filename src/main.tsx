import { RouterProvider } from '@tanstack/react-router'
import ReactDOM from 'react-dom/client'

import {
  TanStackQueryProvider,
  TanStackQueryProviderContext,
  router,
} from './routes/router.tsx'

import reportWebVitals from './reportWebVitals.ts'
import './styles.css'

const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <TanStackQueryProvider.Provider {...TanStackQueryProviderContext}>
      <RouterProvider router={router} />
    </TanStackQueryProvider.Provider>,
  )
}

reportWebVitals()
