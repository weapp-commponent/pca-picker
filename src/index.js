Component({
  externalClasses: ['confirm-class', 'cancel-class', 'top-class'],
  properties: {
    // 省市区数组
    pcaArr: {
      type: Array,
      value: []
    },
    // 选项
    props: {
      type: Object,
      value: {
        label: 'name',
        value: 'code',
        children: 'children'
      }
    },
    // 是否显示组件
    visible: {
      type: Boolean,
      value: false
    },
    // 滚动部分的高度
    pickerHeight: {
      type: Number,
      value: 200
    },
    // 可见部分显示行数
    row: {
      type: Number,
      value: 5
    },
    // 显示列数，1：只显示省, 2：显示省、市，3：显示省、市、区
    col: {
      type: Number,
      value: 3
    },
    // 选中框的样式
    indicatorStyle: {
      type: String,
      value: ''
    },
    // 滚动部分蒙层样式
    pickerMaskStyle: {
      type: String,
      value: ''
    }
  },
  data: {
    pIndex: 0,
    cIndex: 0,
    aIndex: 0,
    pLabel: '',
    cLabel: '',
    aLabel: '',
    pCode: 0,
    cCode: 0,
    aCode: 0,
  },
  lifetimes: {
    attached() {
      const pcaArr = this.data.pcaArr
      const pIndex = this.data.pIndex
      const cIndex = this.data.cIndex
      const valueKey = this.data.props.value
      const labelKey = this.data.props.label
      const childrenKey = this.data.props.children
      this.setData({
        pCode: pcaArr[pIndex][valueKey],
        cCode: pcaArr[pIndex][childrenKey][cIndex][valueKey],
        aCode: pcaArr[pIndex][childrenKey][cIndex][childrenKey][this.data.aIndex][valueKey],
        pLabel: pcaArr[pIndex][labelKey],
        cLabel: pcaArr[pIndex][childrenKey][cIndex][labelKey],
        aLabel: pcaArr[pIndex][childrenKey][cIndex][childrenKey][this.data.aIndex][labelKey],
      })
    }
  },
  methods: {
    /**
     * 关闭
     */
    handleCloseClick() {
      this.triggerEvent('close', {})
    },
    /**
     * 确定选择
     */
    confirm() {
      let code
      let label
      switch (this.data.col) {
        case 1: code = [this.data.pCode]; label = [this.data.pLabel]; break
        case 2: code = [this.data.pCode, this.data.cCode]
          label = [this.data.pLabel, this.data.cLabel]; break
        case 3: code = [this.data.pCode, this.data.cCode, this.data.aCode]
          label = [this.data.pLabel, this.data.cLabel, this.data.aLabel]; break
        default: break
      }
      this.triggerEvent('confirm', {
        code,
        label
      })
    },
    /**
     * 选择省份
     * @param e
     */
    changeProvince(e) {
      const val = e.detail.value
      const labelKey = this.data.props.label
      const valueKey = this.data.props.value
      const childrenKey = this.data.props.children
      const pcaArr = this.data.pcaArr[val]
      this.setData({
        pIndex: val,
        cIndex: 0,
        aIndex: 0,
        pLabel: pcaArr[labelKey],
        cLabel: pcaArr[childrenKey][0][labelKey],
        aLabel: pcaArr[childrenKey][0][childrenKey][0][labelKey],
        pCode: pcaArr[valueKey],
        cCode: pcaArr[childrenKey][0][valueKey],
        aCode: pcaArr[childrenKey][0][childrenKey][0][valueKey],
      })
    },
    /**
     * 选择市
     * @param e
     */
    changeCity(e) {
      const val = e.detail.value
      const labelKey = this.data.props.label
      const valueKey = this.data.props.value
      const childrenKey = this.data.props.children
      const pcaArr = this.data.pcaArr[this.data.pIndex][childrenKey][val]
      this.setData({
        cIndex: val,
        aIndex: 0,
        cLabel: pcaArr[labelKey],
        aLabel: pcaArr[childrenKey][0][labelKey],
        cCode: pcaArr[valueKey],
        aCode: pcaArr[childrenKey][0][valueKey],
      })
    },
    /**
     * 选择区
     * @param e
     */
    changeArea(e) {
      const val = e.detail.value
      const labelKey = this.data.props.label
      const valueKey = this.data.props.value
      const childrenKey = this.data.props.children
      const pcaArr =
          this.data.pcaArr[this.data.pIndex][childrenKey][this.data.cIndex][childrenKey][val]
      this.setData({
        aIndex: val,
        aLabel: pcaArr[labelKey],
        aCode: pcaArr[valueKey],
      })
    }
  }
})
