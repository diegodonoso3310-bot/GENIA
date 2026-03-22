import { renderApp } from './App.js'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Root container not found')
}

root.innerHTML = renderApp()
