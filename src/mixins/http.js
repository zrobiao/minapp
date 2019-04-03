import wepy from 'wepy'
import { service } from '../config.js'

export default class httpMixin extends wepy.mixin {
  $get(
    { url = '', headers = {}, data = {} },
    { success = () => { }, fail = () => { }, complete = () => { } }
  ) {
    const methods = 'GET'
    this.$ajax(
      { url, headers, methods, data },
      { success, fail, complete }
    )
  }

  $post(
    { url = '', headers = {}, data = {} },
    { success = () => { }, fail = () => { }, complete = () => { } }
  ) {
    const methods = 'POST'
    this.$ajax(
      { url, headers, methods, data },
      { success, fail, complete }
    )
  }

  $put(
    { url = '', headers = {}, data = {} },
    { success = () => { }, fail = () => { }, complete = () => { } }
  ) {
    const methods = 'PUT'
    this.$ajax(
      { url, headers, methods, data },
      { success, fail, complete }
    )
  }

  $delete(
    { url = '', headers = {}, data = {} },
    { success = () => { }, fail = () => { }, complete = () => { } }
  ) {
    const methods = 'DELETE'
    this.$ajax(
      { url, headers, methods, data },
      { success, fail, complete }
    )
  }

  /**
   * [ajax 统一请求方法]
   * @param  {[type]}  item [description]
   * @return {Boolean}      [description]
   */
  $ajax(
    { url = '', headers = {}, methods = 'GET', data = {} },
    { success = () => { }, error = () => { }, fail = () => { }, complete = () => { } }
  ) {
    // 增强体验：加载中
    wx.showNavigationBarLoading()
    // 构造请求体
    const request = {
      url: url,
      method: ['GET', 'POST', 'PUT', 'DELETE'].indexOf(methods) > -1 ? methods : 'GET',
      header: Object.assign({
        'Authorization': wx.getStorageSync('token')
      }, headers),
      data: Object.assign({
        // set something global
      }, data)
    }

    // 发起请求
    wepy.request(Object.assign(request, {
      success: ({ statusCode, data }) => {
        // 控制台调试日志
        console.log('[SUCCESS]', statusCode, typeof data === 'object' ? data : data.toString().substring(0, 100))

        // 状态码正常 & 确认有数据
        if (data.resCode === '0000') {
          // 成功回调
          wx.removeStorageSync('fromId')
          return setTimeout(() => {
            let successExist = this.isFunction(success)
            successExist && success({ statusCode, ...data })
            this.$apply()
          })
        } else if (data.resCode == 1) {
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: data.message,
            showCancel: false
          })
        } else if (data.resCode == 2) {
          // 删除过时token
          // var pages = getCurrentPages()    // 获取加载的页面
          // var currentPage = pages[pages.length - 1]    // 获取当前页面的对象
          // var options = currentPage.options
          // let url = ''
          // for (var key in options) {
          //   url = `${url}${key}=${options[key]}&`
          // }
          // console.log(`${currentPage.route}?${url}`)
          // wx.setStorageSync('jump', `/${currentPage.route}?${url}`)
          // // 删除过时token
          // // wx.removeStorageSync('token', null)

          // // 重新登录
          // wepy.login({
          //   success: (res) => {
          //     console.log('wepy.login.success:', res)

          //     // 根据业务接口处理:业务登陆:异步
          //     this.$post({ url: service.login, data: {code: res.code} }, {
          //       success: ({code, data}) => {
          //         if(data.token){
          //           wx.setStorageSync('token', data.token)
          //         }
          //         var route = '/' + getCurrentPages()[0].__route__;

          //         if (route == '/pages/index'){
          //           return
          //         }

          //         if (!data.token ) {
          //           wx.navigateTo({url: '/pages/index'})
          //         } else {
          //           wx.reLaunch({url: wx.getStorageSync('jump')})
          //         }
          //       }
          //     })
          //   },
          //   fail: (res) => {
          //     console.log('wepy.login.fail:', res)
          //   }
          // })

        } else {
          // 失败回调：其他情况
          return setTimeout(() => {
            if (this.isFunction(fail)) {
              fail({ statusCode, ...data })
              this.$apply()
            } else {
              wx.showModal({
                title: '提示',
                content: data.resMsg,
                showCancel: false
              })
            }
          })
        }
      },
      fail: ({ statusCode, data }) => {
        // 控制台调试日志
        console.log('[ERROR]', statusCode, data)
        // 失败回调
        return setTimeout(() => {
          this.isFunction(error) && error({ statusCode, ...data })
          this.$apply()
        })
      },
      complete: (res) => {
        // 控制台调试日志
        // console.log('[COMPLETE]', res)
        // 隐藏加载提示
        wx.hideNavigationBarLoading()
        // 停止下拉状态
        wx.stopPullDownRefresh()
        // 完成回调
        return (() => {
          let completeExist = this.isFunction(complete)
          completeExist && complete(res)
          this.$apply()
        })()
      }
    }))
  }
}
