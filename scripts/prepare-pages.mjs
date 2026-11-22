import { copyFile, mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const output = 'dist'
const index = join(output, 'index.html')
const html = await readFile(index, 'utf8')
if (!html.includes('/istanbul-food-centre/assets/')) throw new Error('The build must use GitHub Pages mode.')

const routes = [
  'shop', 'basket', 'delivery', 'checkout', 'about', 'contact',
  'fresh-produce', 'halal-butcher', 'bakery-and-patisserie', 'world-foods',
  'shop/dairy-and-chilled', 'shop/pantry-essentials',
]
for (const route of routes) {
  const directory = join(output, route)
  await mkdir(directory, { recursive: true })
  await copyFile(index, join(directory, 'index.html'))
}

await writeFile(join(output, '.nojekyll'), '')
await writeFile(join(output, '404.html'), `<!doctype html>
<html lang="en-GB">
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Page not found | Istanbul Food Centre</title>
<main><h1>Page not found</h1><p><a href="/istanbul-food-centre/">Back to Istanbul Food Centre</a></p></main>
</html>`)

for (const entry of await readdir(output, { recursive: true })) {
  if (/^(?:admin|src)(?:[/\\]|$)/i.test(entry) || entry.endsWith('.map')) throw new Error('Unexpected published path: ' + entry)
  if (!/\.(?:html|js)$/.test(entry)) continue
  const content = await readFile(join(output, entry), 'utf8')
  if (/ifc-admin-demo|Reset Demo Data|Not a Live Admin System|\/src\/admin\//.test(content)) {
    throw new Error('Unexpected admin content in ' + entry)
  }
}
