import server from './server.js'

function myServer () {
    this.server = server
    this.nowHandle = null
}

myServer.prototype.parseRouter = function (name, urlOb) {
    this[name] = {}
    Object.keys(urlOb).forEach(apiName => {
        this[name][apiName] = this.sendMes.bind(this, name, apiName, urlOb[apiName])
        this[name][apiName].state = 'ready'
    })
}

myServer.prototype.v = function (vueObj) {
    this.nowHandle = vueObj
    return vueObj
}

// 轮子要留出扩展接口
myServer.prototype.send = function (moduleName,name, url, config) {
    const _this = this
    let config = config || {}
    let type = config.type || 'get' // 应该写在具体业务中
    let data = config.data || {}

    let bindName = config.bindName || name

    // 对于请求响应的处理分为两个模块
    // 效果处理模块，例如加loading
    let before = function (res) {
        self[moduleName][name].state = 'ready'
        return res
    }
    let defaultFn = function (res) {
        _this.nowHandle[bindName] = res.data
        return res
    }
    let success = config.success || defaultFn

    if(this[moduleName][name].state === 'ready') {
        this.server[type](url, data).then(before).then(success)
        this[moduleName][name].state = 'wating'
    }
}
export default new myServer()