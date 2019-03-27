# pca-picker
微信虽然提供了省市区的三级联动picker,但是他的区块代码code 却是微信已经写好的。项目中我们可能需要使用自己的省市区code 以做到和其他端效果一致
> 本组件需要微信基础版本库大于1.1.0
[github项目地址](https://github.com/weapp-commponent/pca-picker)
## 效果演示

![省市区演示](docs/test_01.gif)
![省市演示](docs/test_02.gif)
![省演示](docs/test_03.gif)

## 使用方法
### 1.安装pca-picker
开启微信的npm构建 [文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html)
然后安装
```
npm install --save miniprogram-pca-picker
```
### 2.在需要使用 sms-code 的页面 .json 中添加 sms-code 自定义组件配置
```json
{
  "usingComponents": {
    "pca-picker": "miniprogram-pca-picker"
  }
}
```
### 3.在需要使用 pca-picker 的页面 .wxml 中引用 pca-picker
```xml
  <!--基本用法-->
  <pca-picker
      pca-arr="{{ pcaArr }}"
      visible="{{isShow}}"
      bindclose="close"
      bindconfirm="confirm">
  </pca-picker>
```
### 4.在需要使用 pca-picker 的页面 .js 中
```javascript
  import {addressArr} from './pca'
  
  Page({
    data: {
      isShow: false,
      pcaArr: addressArr,
      col: 1
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
```

## 组件属性
### 1.属性
| 属性名                   | 类型         | 默认值                                               | 是否必须    | 说明                                        |
|-------------------------|--------------|-----------------------------------------------------|------------|---------------------------------------------|
| pcaArr                  | Array        | []                                                  | 是          | 省市区的数据数组，格式请参考下方示例|                      |
| props                   | Object       | {label: 'name',value: 'code',children: 'children'}  | 否          | 设置省市区组件选择的数组字段，label表示组件显示的字段key，value表示组件选中的值key，children表示子项的key                      |
| visible                 | Boolean      | false                                               | 是          | 组件是否显示 |
| pickerHeight            | Number       | 200                                                 | 否          | 组件滚动区域的高度，单位（px）|
| row                     | Number       | 5                                                   | 否          | 组件滚动区域可见行数，设置后每一行的行高等于 pickerHeight / row|
| col                     | Number       | 3                                                   | 否          | 显示列数，1：只显示省, 2：显示省、市，3：显示省、市、区|
| indicatorStyle          | String       | 无 （微信默认样式）                                   | 否          | 自定义选中框的样式|
| pickerMaskStyle         | String       | 无 （微信默认样式）                                   | 否          | 滚动部分蒙层样式|
| top-class               | String       | 无                                                  | 否          | 组件顶部按钮区域的class名，用于自定义样式|
| cancel-class            | String       | 无                                                  | 否          | 组件顶部取消按钮的class名，用于自定义样式|
| confirm-class           | String       | 无                                                  | 否          | 组件顶部确认按钮的class名，用于自定义样式|

> indicatorStyle 中不能设置line-height属性，否则每一行高度显示会有问题

pcaArr格式示例：
```javascript
[
    {
      code: '33',
      name: '浙江',
      children: [
          {
            code: '3301',
            name: '杭州市',
            children: [
                {
                  code: '330102',
                  name: '上城区'
                }
                ...
            ]
          }
          ...
      ],
    }
    ...
]
```

### 2.方法
| 方法名                  |  是否必须    | 返回值                                            | 说明                                         |
|------------------------|------------- |--------------------------------------------------|---------------------------------------------|
| bindclose              |  是          |无                                                | 省市区组件被关闭时的回调函数                    |
| bindconfirm            |  是          |e,输入框的值 e.detail.label，e.detail.code         | 省市区组件点击确定按钮时的回调函数               |

## 栗子
### 覆盖默认样式
#### 1.在引用组件的页面.wxml中，设置top-class 、confirm-class和 cancel-class
```xml
<view class="pca-test">
  <view bindtap="clickPCA" class="clickBtn">点击</view>
  <pca-picker
      pca-arr="{{ pcaArr }}"
      visible="{{isShow}}"
      bindclose="close"
      bindconfirm="confirm"
      top-class="topClass"
      cancel-class="cancelClass"
      confirm-class="confirmClass"></pca-picker>
</view>
```
#### 2.在引用组件的页面.wxss中，编写自己的样式代码
```css
/*自定义组件样式*/
.pca-test .topClass{
  border-color: red;
}
.pca-test .cancelClass{
  color: green;
}
.pca-test .confirmClass{
  color: red;
}
```
#### 3.效果
![覆盖默认样式](docs/test_04.gif)

### 修改滚动区域显示行数
#### 1.在引用组件的页面.wxml中，设置row属性
```xml
  <pca-picker
      pca-arr="{{ pcaArr }}"
      visible="{{isShow}}"
      row="3"
      bindclose="close"
      bindconfirm="confirm">
  </pca-picker>
```
#### 2.效果
![修改显示行数](docs/test_05.gif)

### 修改选中行的样式
#### 1.在引用组件的页面.wxml中，设置indicatorStyle
```xml
  <pca-picker
      pca-arr="{{ pcaArr }}"
      visible="{{isShow}}"
      bindclose="close"
      bindconfirm="confirm"
      indicatorStyle="background: rgba(32,178,170,.2)"
  ></pca-picker>
```
#### 2.效果
![修改显示行数](docs/test_06.gif)
