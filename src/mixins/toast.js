/* <script>
  import wepy from 'wepy'
  import toast from 'mixins/toast'

  export default class Index extends wepy.page {
    onLoad () {
      this.showToast()
      this.getMovies()
    }
    mixins = [
      toast
    ]
    ......
  }
</script> */

import wepy from 'wepy'

export default class toastMixin extends wepy.mixin {
  onLoad () {
    this.showToast()
  }
  noMore () {
    wepy.showToast({
      title: '没有更多了...',
      icon: 'none',
      duration: 1500
    })
  }
  showToast () {
    wepy.showToast({
      title: '拼命加载中...',
      icon: 'loading',
      duration: 3000
    })
  }
  hideToast () {
    wepy.hideToast()
  }
}
