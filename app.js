const path = require('path')
const fse = require('fs-extra')
const Koa = require('koa')
const koaBody = require('koa-body')
const logger = require('koa-logger')
const views = require('koa-views')
const extname = path.extname 
const port = process.env.PORT || 80
const app = new Koa()
const root = __dirname

app.use(logger())
app.use(koaBody())

// 加载模板引擎
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))
app.use(async ctx => {
  let fpath = path.join(root, ctx.path)
  ctx.set('Access-Control-Allow-Origin', '*')
  if (fse.existsSync(path.resolve(fpath, 'index.html'))) {
    fpath = path.resolve(fpath, 'index.html')
  }
  if (isFile(fpath)) {
    ctx.type = extname(fpath)
    ctx.body = fse.createReadStream(fpath)
  } else {
    let data = await getDirectoryData(fpath)
    await ctx.render('index', { data })
  }
})
app.listen(port, () => console.log(`app started at ${port}...`))

async function getDirectoryData (fp) {
  const files = await fse.readdir(fp)
  const items = files.map((name, id) => {
    const aFp = path.join(fp, name)
    const stats = fse.statSync(aFp)
    const ctime = new Date(stats.ctime).toLocaleString()
    const size = bytesToSize(stats.size)
    let href = '/' + path.relative(root, aFp)
    let type = extname(aFp)
    if (stats.isDirectory()) {
      href += '/'
      type = 'dir'
    }
    return { id, name, type, ctime, size, href }
  }).sort((a, b) => {
    if (a.type === 'dir'  && b.type !== 'dir') {
      return -1
    } else if (a.type !== 'dir'  && b.type === 'dir') {
      return 1
    }
    return 0
  })
  return items
}

function isFile (fp) {
  return fse.existsSync(fp) && fse.statSync(fp).isFile()
}

function bytesToSize (bytes) {
  if (bytes === 0) return '0 B'
  const k = 2 ** 10
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
}
