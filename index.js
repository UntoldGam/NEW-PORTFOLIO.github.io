import express from 'express'
import { join, dirname } from 'node:path'
import { readdirSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

const __dirname = dirname(__filename)

const app = express()
app.use(express.static(__dirname))
const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST'
  ],

  allowedHeaders: [
    'Content-Type'
  ]
}

app.use(cors(corsOpts))
app.get('/', (req, res) => {
  res.statusCode === 200 ? res.sendFile(join(__dirname, 'index.html')) : res.sendStatus(404)
})
const routesPath = join(__dirname, 'projects')
const routeFiles = readdirSync(routesPath)

for (const file of routeFiles) {
  console.log(file.split('.')[0])
  const element = document.createElement('p', file.split('.')[0])
  const eText = document.createTextNode(file.split('.')[0])
  element.appendChild(eText)
  const element1 = document.createElement('p')
  const e1Text = document.createTextNode(file)
  element1.appendChild(e1Text)

  document.body.appendChild(element)
  document.body.appendChild(element1)

  app.get('/projects' + file.split('.')[0], (req, res) => {
    res.sendFile(join(routesPath, file))
  })
  if (existsSync(file)) {
    for (const pythonFile of file) {
      console.log(pythonFile.split('.')[0])
      const element = document.createElement('p', file.split('.')[0])
      const eText = document.createTextNode(pythonFile.split('.')[0])
      element.appendChild(eText)
      const element1 = document.createElement('p')
      const e1Text = document.createTextNode(pythonFile)
      element1.appendChild(e1Text)
      app.get('/projects/python/' + pythonFile.split('.')[0], (req, res) => {
        res.sendFile(join(routesPath, pythonFile))
      })
    }
  }
}
const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port)
  console.log(listener.address())
})
