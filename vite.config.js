import { readFile } from 'node:fs/promises'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const adminPage = /^(?:\/admin)(?:\/|$)/i
const localAddresses = new Set(['127.0.0.1', '::1', '::ffff:127.0.0.1'])
const localHosts = new Set(['localhost', '127.0.0.1', '[::1]'])

function pathnameFor(request) {
  return new URL(request.url, 'http://localhost').pathname
}

function localAdminEntry() {
  return {
    name: 'ifc-local-admin-entry',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        let hostname
        try {
          hostname = new URL('http://' + request.headers.host).hostname
        } catch {
          response.writeHead(400).end()
          return
        }
        if (!localAddresses.has(request.socket.remoteAddress) || !localHosts.has(hostname)) {
          response.writeHead(403).end('This development server is available on loopback only.')
          return
        }
        if (!adminPage.test(pathnameFor(request))) return next()
        if (request.method !== 'GET' && request.method !== 'HEAD') {
          response.writeHead(405, { Allow: 'GET, HEAD' }).end()
          return
        }
        try {
          const template = await readFile(new URL('./src/admin/index.html', import.meta.url), 'utf8')
          const html = await server.transformIndexHtml(request.url, template)
          response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' }).end(html)
        } catch (error) {
          next(error)
        }
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use((request, response, next) => {
        if (adminPage.test(pathnameFor(request))) {
          response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not found')
          return
        }
        next()
      })
    },
  }
}

export default defineConfig(({ mode }) => ({
  base: mode === 'github-pages' ? '/istanbul-food-centre/' : '/',
  server: { host: 'localhost' },
  plugins: [localAdminEntry(), react(), tailwindcss()],
}))
