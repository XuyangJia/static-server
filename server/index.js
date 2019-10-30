const path = require('path')
const fse = require('fs-extra')
const Koa = require('koa')
const extname = path.extname
const port = process.env.PORT || 8081
const app = new Koa()
const root = path.resolve(__dirname, '../dist')

app.use(async ctx => {
  const fpath = path.join(root, ctx.path)
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.type = extname(fpath)
  ctx.body = await getData(fpath)
})
app.listen(port, () => console.log(`app started at ${port}...`))

async function getData (fp) {
  if (isFile(fp)) {
    return fse.createReadStream(fp)
  } else {
    const files = await fse.readdir(fp)
    const items = files.map((name, id) => {
      const stats = fse.statSync(path.join(fp, name))
      const ctime = new Date(stats.ctime).toLocaleString()
      const size = bytesToSize(stats.size)
      return { id, name, file: stats.isFile(), ctime, size }
    }).sort(obj => obj.file ? 1 : 0)
    return items
  }
}

function isFile (fp) {
  return fse.statSync(fp).isFile()
}

function bytesToSize (bytes) {
  if (bytes === 0) return '0 B'
  const k = 2 ** 10
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
}
