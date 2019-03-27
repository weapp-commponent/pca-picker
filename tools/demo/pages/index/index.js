import {addressArr} from './pca'

Page({
  data: {
    isShow: false,
    pcaArr: addressArr,
    col: 3,
    props: {
      label: 'name',
      value: 'code',
      children: 'children'
    }
  },
  clickPCA() {
    this.setData({
      isShow: !this.data.isShow
    })
  },
  close() {
    this.setData({
      isShow: false
    })
  },
  confirm(e) {
    this.setData({
      isShow: false
    })
    console.log(e)
  }
})
