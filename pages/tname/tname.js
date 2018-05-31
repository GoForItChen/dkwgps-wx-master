function initSubMenuDisplay() {
  return ['hidden', 'hidden', 'hidden'];
}

var id;
var api = require('../../config/api.js');
var md5 = require('../../utils/md5.js');
var sha1 = require('../../utils/sha1.js');
var util = require('../../utils/util.js');
var app = getApp();
Page({
  data: {
    showModalStatus:[{
      id:0,
      show:false
      },
      {
        id: 1,
        show: false
      },
      {
        id: 2,
        show: false
      },
      {
        id: 3,
        show: false
      },
      {
        id: 4,
        show: false
      },
      {
        id: 5,
        show: false
      },
      {
        id: 6,
        show: false
      }], 
    showModalStatustwo: [{
        id: 0,
        show: false
    }, {
      id: 1,
      show: false
      }, {
        id: 2,
        show: false
      }],
    zdmode:'',
    pushopen:'',
    centerTer:'',
    bindtel:'',
    mobile:'',
    activities: [{}],
    imgurl: '',
    tishi:false,
    username: '',
    oldpwd: '',
    code: '',
    password: '',
    confirmPassword: '',
    subMenuDisplay: initSubMenuDisplay(),
    id: 0,
    color: '',
    fxIsOpen: 'none',
    fximage: '../../static/images/right_30px.png',
    tipIsOpen: [{
        id:0,
        sel:true,
        show:'block',
        name:'实时定位模式',
        types:'1',
        img: '../../static/images/select_blue_30px.png'
    }, {
      id: 1,
      sel: false,
      show: 'none',
      name: '点播定位模式',
      types: '2',
      img: '../../static/images/select_gray_30px.png'
      }, {
        id: 2,
        sel: false,
        show: 'none',
        name: '潜伏定位模式',
        types: '3',
        img: '../../static/images/select_gray_30px.png'
      }],
    listenIsOpen: [{
      id: 0,
      name:'监听关闭',
      types:'GB',
      img: '../../static/images/select_gray_30px.png'
    }, {
      id: 1,
      name: '任意号码监听',
      types: 'MSONE',
      img: '../../static/images/select_gray_30px.png'
    }, {
      id: 2,
      name: '仅车主号码监听',
      types: 'MSTWO',
      img: '../../static/images/select_blue_30px.png'
    }], 
    policeIsOpen: [{
      id: 0,
      sel:false,
      name:'短信报警',
      types:'MSG',
      imgleft: '../../static/images/message_gray_48px.png',
      imgright: '../../static/images/select_gray_30px.png'
    }, {
      id: 1,
      sel: false,
      name: '电话报警',
      types: 'TEL',
      imgleft: '../../static/images/moblie_gray_48px.png',
      imgright: '../../static/images/select_gray_30px.png'
    }],
    modelIsOpen: [{
      id: 0,
      sel: false,
      name:'警戒模式',
      types:'JJ',
      imgleft: '../../static/images/Vigilance_gray_48px.png',
      imgright: '../../static/images/select_gray_30px.png'
    }, {
      id: 1,
      sel: false,
      name: '普通模式',
      types: 'BZ',
      imgleft: '../../static/images/standard_gray_48px.png',
      imgright: '../../static/images/select_gray_30px.png'
    }, {
        id: 2,
        sel: false,
        name: '关闭模式',
        types: 'GB',
        imgleft: '../../static/images/noshock_gray_48px.png',
        imgright: '../../static/images/select_gray_30px.png'
    }],
    locationtimes: [{
      id: 0,
      sel: false,
      name:'实时定位(10s)',
      types:'10',
      color: '#999999',
      img: '../../static/images/select_gray_30px.png'
    }, {
      id: 1,
      sel: false,
      name: '1小时更新一次',
      types: '1',
      color: '#999999',
      img: '../../static/images/select_gray_30px.png'
      }, {
        id: 2,
        sel: false,
        name: '3小时更新一次',
        types: '3',
        color: '#999999',
        img: '../../static/images/select_gray_30px.png'
    }, {
      id: 3,
      sel: false,
      name: '6小时更新一次',
      types: '6',
      color: '#999999',
      img: '../../static/images/select_gray_30px.png'
      }, {
        id: 4,
        sel: false,
        name: '12小时更新一次',
        types: '12',
        color: '#999999',
        img: '../../static/images/select_gray_30px.png'
    }, {
      id: 5,
      sel: false,
      name: '24小时更新一次',
      types: '24',
      color: '#999999',
      img: '../../static/images/select_gray_30px.png'
    }]
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // 页面渲染完成
    var that = this;
    let terInfo = wx.getStorageSync("terInfo");
    console.log('terInfo' + JSON.stringify(terInfo))
    var sn = terInfo.sn
    that.setData({
      zdmode:terInfo.zdmode,
      pushopen: terInfo.pushopen,
      bindtel: terInfo.sosnumber
    })
    console.log("zdmode:" + that.data.zdmode)
    console.log("pushopen:" +that.data.pushopen)
      if (that.data.pushopen.indexOf('MSG') != -1) {
        that.setData({
          ['policeIsOpen[' + 0 + '].sel']: true,
          ['policeIsOpen[' + 0 + '].imgleft']: '../../static/images/message_blue_48px.png',
          ['policeIsOpen[' + 0 + '].imgright']: '../../static/images/select_blue_30px.png'
        })
      }
      if (that.data.pushopen.indexOf('TEL') != -1) {
        that.setData({
          ['policeIsOpen[' + 1 + '].sel']: true,
          ['policeIsOpen[' + 1 + '].imgleft']: '../../static/images/moblie_blue_48px.png',
          ['policeIsOpen[' + 1 + '].imgright']: '../../static/images/select_blue_30px.png'
        })
      }
      if (that.data.zdmode == 'JJ') {
        that.setData({
          ['modelIsOpen[' + 0 + '].sel']: true,
          ['modelIsOpen[' + 0 + '].imgleft']: '../../static/images/Vigilance_blue_48px.png',
          ['modelIsOpen[' + 0 + '].imgright']: '../../static/images/select_blue_30px.png'
        })
      }
      else if (that.data.zdmode == 'BZ') {
        that.setData({
          ['modelIsOpen[' + 1 + '].sel']: true,
          ['modelIsOpen[' + 1 + '].imgleft']: '../../static/images/standard_blue_48px.png',
          ['modelIsOpen[' + 1 + '].imgright']: '../../static/images/select_blue_30px.png'
        })
      } else {
        that.setData({
          ['modelIsOpen[' + 2 + '].sel']: true,
          ['modelIsOpen[' + 2 + '].imgleft']: '../../static/images/noshock_blue_48px.png',
          ['modelIsOpen[' + 2 + '].imgright']: '../../static/images/select_blue_30px.png'
        })
      }
  },
  onReady: function () {

  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  switch6Change: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    var id = e.target.id;
    this.util(currentStatu, id.substring(id.indexOf("_") + 1))
  }, powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    var id = e.target.id;
    this.util(currentStatu, id.substring(id.indexOf("_") + 1))
  },
  util: function (currentStatu,id) {
    /* 动画部分 */
    // 第1步：创建动画实例
    console.log(id)
    var animation = wx.createAnimation({
      duration: 200, //动画时长
      timingFunction: "linear", //线性
      delay: 0 //0则不延迟
    });

    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;

    // 第3步：执行第一组动画
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })

      //关闭
      if (currentStatu == "close") {
        if (id == '') {
          for (var i = 0; i < this.data.showModalStatus.length; i++) {
            this.setData(
              {
                ['showModalStatus[' + i + '].show']: false,
                ['showModalStatustwo[' + i + '].show']: false
              }
            );
          }
        } else {
          this.setData(
            {
              ['showModalStatus[' + id + '].show']: false,
              ['showModalStatustwo[' + id + '].show']: false
            }
          );
        }
      }
    }.bind(this), 200)

    // 显示
    if (currentStatu == "open") {
        this.setData(
          {
            ['showModalStatus[' + id + '].show']: true
          }
        );
    }
  }, powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    var id = e.target.id;
    this.util(currentStatu, id.substring(id.indexOf("_") + 1))
  },
  util: function (currentStatu,id) {
    /* 动画部分 */
    // 第1步：创建动画实例
    console.log(id)
    var animation = wx.createAnimation({
      duration: 200, //动画时长
      timingFunction: "linear", //线性
      delay: 0 //0则不延迟
    });

    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;

    // 第3步：执行第一组动画
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })

      //关闭
      if (currentStatu == "close") {
        if (id == '') {
          for (var i = 0; i < this.data.showModalStatus.length; i++) {
            this.setData(
              {
                ['showModalStatus[' + i + '].show']: false
              }
            );
          }
        } else {
          this.setData(
            {
              ['showModalStatus[' + id + '].show']: false
            }
          );
        }
      }
    }.bind(this), 200)

    // 显示
    if (currentStatu == "open") {
        this.setData(
          {
            ['showModalStatus[' + id + '].show']: true
          }
        );
    }
  }, powerDrawertwo: function (e) {
    if (!this.data.policeIsOpen[0].sel && !this.data.policeIsOpen[1].sel) {
      wx.showModal({
        title: '错误信息',
        content: '请选择报警方式',
        showCancel: false
      });
      return false;
    }
    var currentStatu = e.currentTarget.dataset.statu;
    var id = e.target.id;
    console.log('id' +id)
    this.utiltwo(currentStatu, id.substring(id.indexOf("_") + 1))
  },
  utiltwo: function (currentStatu, id) {
    /* 动画部分 */
    // 第1步：创建动画实例
    console.log('id'+id)
    var animation = wx.createAnimation({
      duration: 200, //动画时长
      timingFunction: "linear", //线性
      delay: 0 //0则不延迟
    });

    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;

    // 第3步：执行第一组动画
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })

      //关闭
      if (currentStatu == "close") {
        if (id == '') {
          for (var i = 0; i < this.data.showModalStatus.length; i++) {
            this.setData(
              {
                ['showModalStatustwo[' + i + '].show']: false,
                ['showModalStatus[' + i + '].show']: false
              }
            );
          }
        } else {
          this.setData(
            {
              ['showModalStatustwo[' + id + '].show']: false,
              ['showModalStatus[' + id + '].show']: false
            }
          );
        }
      }
    }.bind(this), 200)

    // 显示
    if (currentStatu == "open") {
      this.setData(
        {
          ['showModalStatustwo[' + id + '].show']: true,
          ['showModalStatus[' + id + '].show']: false
        }
      );
    }
  }, powerDrawerthree: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    var id = e.target.id;
    console.log('id' + id)
    this.utilthree(currentStatu, id.substring(id.indexOf("_") + 1))
  },
  utilthree: function (currentStatu, id) {
    /* 动画部分 */
    // 第1步：创建动画实例
    console.log('id' + id)
    var animation = wx.createAnimation({
      duration: 200, //动画时长
      timingFunction: "linear", //线性
      delay: 0 //0则不延迟
    });

    // 第2步：这个动画实例赋给当前的动画实例
    this.animation = animation;

    // 第3步：执行第一组动画
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画
    setTimeout(function () {
      // 执行第二组动画
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
      this.setData({
        animationData: animation
      })

      //关闭
      if (currentStatu == "close") {
        this.setData(
          {
            ['showModalStatustwo[' + 2 + '].show']: false,
            ['showModalStatus[' + 2 + '].show']: false,
            tishi: false
          }
        );
      }
    }.bind(this), 200)

    // 显示
    if (currentStatu == "open") {
      this.setData(
        {
          ['showModalStatustwo[' + 2 + '].show']: false,
          ['showModalStatus[' + 2 + '].show']: false,
          tishi: true
        }
      );
    }
  },
  switch4Change: function (e) {
    var that = this;
    var isopen = e.detail.value;
    var terInfo = wx.getStorageSync("terInfo");
    var sn = terInfo.sn;
    var order='';
    if (isopen){
      order='1'
    }else{
      order = '0'
    }
      var shajm = sha1.getSHA1(sn + app.globalData.key_words).toUpperCase();
      console.log(shajm)
      wx.request({
        url: 'https://apiwx.dkwgps.com/userapi/commandapi/commDG',
        dataType: JSON,
        data: {
          sn: sn,
          type: order,
          issend: '0',
          jm: shajm,
        },
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          var json = JSON.parse(res.data)
          console.log(json)
          if (json.result == '1') {
            wx.showModal({
              title: '设置成功',
              content: '设置成功',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  that.onLoad()
                }
              }
            });
          }
          else if (json.result == '2') {
            wx.showModal({
              title: '设置失败',
              content: '加密不匹配',
              showCancel: false
            });
          } else if (json.result == '0') {
            wx.showModal({
              title: '设置失败',
              content: '失败',
              showCancel: false
            });
          } else {
            wx.showModal({
              title: '设置失败',
              content: '服务器错误',
              showCancel: false
            });
          }
        }
      });
  },
  telxieyi: function (e) {
    wx.navigateTo({
      url: '/pages/telxieyi/telxieyi',
    })
  },
  msgxieyi: function (e) {
    wx.navigateTo({
      url: '/pages/msgxieyi/msgxieyi',
    })
  },
  bigimg: function (e) {
    var that = this;
    var id = e.target.id;
    console.log(e)
    var imgurl = '';
    for (var i = 0; i < this.data.activities.length; i++) {
      if ('img' + i == id) {
        imgurl = this.data.activities[i].img;
      }
    }
    this.setData({
      imgurl: imgurl
    })
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: [imgurl] // 需要预览的图片http链接列表
    })
  },
  cartel:function(e){
     wx.showModal({
       title: '车主号码',
       content: '车主号码',
       success:function(res){
             
       }
     })
  },
  close: function (e) {
    var id=e.target.id;
    console.log(id);
    this.setData({
      ['showModalStatus[' + id.substring(id.indexOf("_") + 1) + '].show']: false,
      ['showModalStatustwo[' + id.substring(id.indexOf("_") + 1) + '].show']: false,
      tishi:false
    });
  },
  choseTxtColor: function (e) {
    var id = e.currentTarget.dataset.id;  //获取自定义的ID值  
    this.setData({
      id: id
    })
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  bindPasswordInput: function (e) {

    this.setData({
      password: e.detail.value
    });
  },
  appfx: function () {
    var that = this;
    if (this.data.fxIsOpen == 'none') {//展开
      that.setData({
        fximage: '../../static/images/up_30px.png',
        fxIsOpen: 'block'
      })
    } else {
      that.setData({
        fximage: '../../static/images/right_30px.png',
        fxIsOpen: 'none'
      })
    }
  },
  tips: function (e) {
    var that = this;
    var id=e.target.id;
    console.log(id.substring(id.indexOf("_") + 1))
    console.log(this.data.tipIsOpen)
      for (var i = 0; i < this.data.tipIsOpen.length; i++){
        that.setData({
          ['tipIsOpen[' + i + '].show']: 'none',
          ['tipIsOpen[' + i + '].img']: '../../static/images/select_gray_30px.png'
        })
        if (i == id.substring(id.indexOf("_") + 1)){
          that.setData({
            ['tipIsOpen[' + id.substring(id.indexOf("_") + 1) + '].show']: 'block',
            ['tipIsOpen[' + i + '].img']: '../../static/images/select_blue_30px.png'
          })
        }
    }
  },
  locationtime: function (e) {
    var that = this;
    var id = e.target.id;
    console.log(id.substring(id.indexOf("_") + 1))
    console.log(this.data.locationtimes)
    for (var i = 0; i < this.data.locationtimes.length; i++) {
      that.setData({
        ['locationtimes[' + i + '].sel']: false,
        ['locationtimes[' + i + '].img']: '../../static/images/select_gray_30px.png',
        ['locationtimes[' + i + '].color']: '#999999'
      })
      if (i == id.substring(id.indexOf("_") + 1)) {
        that.setData({
          ['locationtimes[' + i + '].sel']: true,
          ['locationtimes[' + i + '].img']: '../../static/images/select_blue_30px.png',
          ['locationtimes[' + i + '].color']: '#666666'
        })
      }
    }
  },
  police: function (e) {
    var that = this;
    var id = e.target.id;
    console.log(id.substring(id.indexOf("_") + 1))
    console.log(this.data.policeIsOpen)
        console.log(id.substring(id.indexOf("_") + 1))
        if (id.substring(id.indexOf("_") + 1)== '0'){
          if (this.data.policeIsOpen[0].sel){
            that.setData({
              ['policeIsOpen[' + 0 + '].sel']: false,
              ['policeIsOpen[' + 0 + '].imgright']: '../../static/images/select_gray_30px.png',
              ['policeIsOpen[' + 0 + '].imgleft']: '../../static/images/message_gray_48px.png'
            })
          }else{
            that.setData({
              ['policeIsOpen[' + 0 + '].sel']: true,
              ['policeIsOpen[' + 0 + '].imgright']: '../../static/images/select_blue_30px.png',
              ['policeIsOpen[' + 0 + '].imgleft']: '../../static/images/message_blue_48px.png'
            })
          }       
         }else{
          if (this.data.policeIsOpen[1].sel) {
            that.setData({
              ['policeIsOpen[' + 1 + '].sel']: false,
              ['policeIsOpen[' + 1 + '].imgright']: '../../static/images/select_gray_30px.png',
              ['policeIsOpen[' + 1 + '].imgleft']: '../../static/images/moblie_gray_48px.png'
            })
          }else{
            that.setData({
              ['policeIsOpen[' + 1 + '].sel']: true,
              ['policeIsOpen[' + 1 + '].imgright']: '../../static/images/select_blue_30px.png',
              ['policeIsOpen[' + 1 + '].imgleft']: '../../static/images/moblie_blue_48px.png'
            })
          }
         }
  },
  selmodel: function (e) {
    var that = this;
    var id = e.target.id;
    console.log(id.substring(id.indexOf("_") + 1))
    console.log(this.data.modelIsOpen)
 
    var terInfo = wx.getStorageSync("terInfo"); 
    var sn=terInfo.sn;
    var par ='';
    var types = '';
    console.log(id)
    console.log('sel'+that.data.modelIsOpen[id.substring(id.indexOf("_") + 1)].sel)
    types = that.data.modelIsOpen[id.substring(id.indexOf("_") + 1)].types
    for (var i = 0; i < that.data.policeIsOpen.length; i++) {
      if (that.data.policeIsOpen[i].sel) {
        par += that.data.policeIsOpen[i].types + ','
      }
    }
    var shajm = sha1.getSHA1(sn + app.globalData.key_words).toUpperCase(); 
    console.log(shajm)
    console.log(par)
    console.log(types)
    wx.request({
      url: 'https://apiwx.dkwgps.com/userapi/Command/commZD',
      dataType: JSON,
      data: {
          "sn": sn,
          "par": par,
          "type": types,
          "issend": '2',
          "jm": shajm
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var json = JSON.parse(res.data)
        console.log('json' + json.result)
        if (json.result == '1') {
          wx.showModal({
            title: '设置成功',
            content: '设置成功',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                that.onLoad()
              }
            }
          });
        } else if (json.result == '0') {
          wx.showModal({
            title: '设置失败',
            content: '命令下发失败',
            showCancel: false
          });
        }
        else if (json.result == '2') {
          wx.showModal({
            title: '设置失败',
            content: '加密不匹配',
            showCancel: false
          });
        } else {
          wx.showModal({
            title: '密码重置失败',
            content: '服务器错误',
            showCancel: false
          });
        }
      }
    });
  },
  isread: function (e) {
    var id = e.target.id;
    console.log(id);
    this.setData({
      ['showModalStatus[' + id.substring(id.indexOf("_") + 1) + '].show']: false,
      ['showModalStatustwo[' + id.substring(id.indexOf("_") + 1) + '].show']: false,
      tishi: false
    });
  },
  workmode: function (e) {
    var that = this;
    var id = e.target.id;
    console.log(id.substring(id.indexOf("_") + 1))
    console.log(this.data.modelIsOpen)

    var terInfo = wx.getStorageSync("terInfo");
    var sn = terInfo.sn;
    var mode = '';
    if (that.data.tipIsOpen[id.substring(id.indexOf("_") + 1)].sel) {
      mode = that.data.tipIsOpen[id.substring(id.indexOf("_") + 1)].types
      }
    var time = '';
    console.log('sel' + that.data.modelIsOpen[id.substring(id.indexOf("_") + 1)].sel)
    if (that.data.modelIsOpen[id.substring(id.indexOf("_") + 1)].sel) {
      types = that.data.modelIsOpen[id.substring(id.indexOf("_") + 1)].types
    }
    var shajm = sha1.getSHA1(sn + app.globalData.key_words).toUpperCase();
    console.log(shajm)
    wx.request({
      url: 'https://apiwx.dkwgps.com/userapi/commandapi/commZD',
      dataType: JSON,
      data: {
        sn: sn,
        mode: par,
        time: types,
        issend: '0',
        jm: shajm,
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var json = JSON.parse(res.data)
        console.log(json)
        if (json.result == '1') {
          wx.showModal({
            title: '设置成功',
            content: '设置成功',
            showCancel: false,
            success: function (res) {
              that.setData({
                ['modelIsOpen[' + 0 + '].imgleft']: '../../static/images/Vigilance_gray_48px.png',
                ['modelIsOpen[' + 1 + '].imgleft']: '../../static/images/standard_gray_48px.png',
                ['modelIsOpen[' + 2 + '].imgleft']: '../../static/images/noshock_gray_48px.png'
              })
              for (var i = 0; i < that.data.modelIsOpen.length; i++) {
                that.setData({
                  ['modelIsOpen[' + i + '].sel']: false,
                  ['modelIsOpen[' + i + '].imgright']: '../../static/images/select_gray_30px.png'
                })
                if (i == id.substring(id.indexOf("_") + 1)) {
                  if (id.substring(id.indexOf("_") + 1) == '0') {
                    that.setData({
                      ['modelIsOpen[' + 0 + '].sel']: true,
                      ['modelIsOpen[' + 0 + '].imgright']: '../../static/images/select_blue_30px.png',
                      ['modelIsOpen[' + 0 + '].imgleft']: '../../static/images/Vigilance_blue_48px.png'
                    })
                  } else if (id.substring(id.indexOf("_") + 1) == '1') {
                    that.setData({
                      ['modelIsOpen[' + 1 + '].sel']: true,
                      ['modelIsOpen[' + 1 + '].imgright']: '../../static/images/select_blue_30px.png',
                      ['modelIsOpen[' + 1 + '].imgleft']: '../../static/images/standard_blue_48px.png'
                    })
                  } else {
                    that.setData({
                      ['modelIsOpen[' + 2 + '].sel']: true,
                      ['modelIsOpen[' + 2 + '].imgright']: '../../static/images/select_blue_30px.png',
                      ['modelIsOpen[' + 2 + '].imgleft']: '../../static/images/noshock_blue_48px.png'
                    })
                  }
                }
              }
              if (res.confirm) {
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          });
        } else if (json.result == '0') {
          wx.showModal({
            title: '设置失败',
            content: '命令下发失败',
            showCancel: false
          });
        }
        else if (json.result == '2') {
          wx.showModal({
            title: '设置失败',
            content: '加密不匹配',
            showCancel: false
          });
        } else {
          wx.showModal({
            title: '密码重置失败',
            content: '服务器错误',
            showCancel: false
          });
        }
      }
    });
  },
  callconfirm: function (e) {
    var that = this;
    var id = e.target.id;
    var terInfo = wx.getStorageSync("terInfo");
    var sn = terInfo.sn;
    var types = '';
    types = that.data.listenIsOpen[id.substring(id.indexOf("_") + 1)].types
    var shajm = sha1.getSHA1(sn + app.globalData.key_words).toUpperCase();
    console.log(shajm)
    wx.request({
      url: 'https://apiwx.dkwgps.com/userapi/commandapi/commZD',
      dataType: JSON,
      data: {
        sn: sn,
        type: types,
        issend: '0',
        jm: shajm,
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var json = JSON.parse(res.data)
        console.log(json)
        if (json.result == '1') {
          wx.showModal({
            title: '设置成功',
            content: '设置成功',
            showCancel: false,
            success: function (res) {
              that.setData({
                ['modelIsOpen[' + 0 + '].imgleft']: '../../static/images/Vigilance_gray_48px.png',
                ['modelIsOpen[' + 1 + '].imgleft']: '../../static/images/standard_gray_48px.png',
                ['modelIsOpen[' + 2 + '].imgleft']: '../../static/images/noshock_gray_48px.png'
              })
              for (var i = 0; i < that.data.modelIsOpen.length; i++) {
                that.setData({
                  ['modelIsOpen[' + i + '].sel']: false,
                  ['modelIsOpen[' + i + '].imgright']: '../../static/images/select_gray_30px.png'
                })
                if (i == id.substring(id.indexOf("_") + 1)) {
                  if (id.substring(id.indexOf("_") + 1) == '0') {
                    that.setData({
                      ['modelIsOpen[' + 0 + '].sel']: true,
                      ['modelIsOpen[' + 0 + '].imgright']: '../../static/images/select_blue_30px.png',
                      ['modelIsOpen[' + 0 + '].imgleft']: '../../static/images/Vigilance_blue_48px.png'
                    })
                  } else if (id.substring(id.indexOf("_") + 1) == '1') {
                    that.setData({
                      ['modelIsOpen[' + 1 + '].sel']: true,
                      ['modelIsOpen[' + 1 + '].imgright']: '../../static/images/select_blue_30px.png',
                      ['modelIsOpen[' + 1 + '].imgleft']: '../../static/images/standard_blue_48px.png'
                    })
                  } else {
                    that.setData({
                      ['modelIsOpen[' + 2 + '].sel']: true,
                      ['modelIsOpen[' + 2 + '].imgright']: '../../static/images/select_blue_30px.png',
                      ['modelIsOpen[' + 2 + '].imgleft']: '../../static/images/noshock_blue_48px.png'
                    })
                  }
                }
              }
              if (res.confirm) {
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          });
        } else if (json.result == '0') {
          wx.showModal({
            title: '设置失败',
            content: '命令下发失败',
            showCancel: false
          });
        }
        else if (json.result == '2') {
          wx.showModal({
            title: '设置失败',
            content: '加密不匹配',
            showCancel: false
          });
        } else {
          wx.showModal({
            title: '密码重置失败',
            content: '服务器错误',
            showCancel: false
          });
        }
      }
    });
  },
  listen: function (e) {
    var that = this;
    var id = e.target.id;
    console.log(id.substring(id.indexOf("_") + 1))
    console.log(this.data.listenIsOpen)
    for (var i = 0; i < this.data.listenIsOpen.length; i++) {
      that.setData({
        ['listenIsOpen[' + i + '].img']: '../../static/images/select_gray_30px.png'
      })
      if (i == id.substring(id.indexOf("_") + 1)) {
        that.setData({
          ['listenIsOpen[' + id.substring(id.indexOf("_") + 1) + '].img']: '../../static/images/select_blue_30px.png'
        })
      }
    }
  },
  bindmobile: function (e) {
    var that = this;
      var terInfo = wx.getStorageSync("terInfo");
      var sn = terInfo.sn;
      console.log(sn)
    if (!/13[123456789]{1}\d{8}|15[1235689]\d{8}|188\d{8}/.test(this.data.mobile)) {
      wx.showModal({
        title: '错误信息',
        content: '手机号码格式不正确',
        showCancel: false
      });
      return false;
    }

    if (this.data.mobile.length != 11) {
      wx.showModal({
        title: '错误信息',
        content: '手机号码位数不正确',
        showCancel: false
      });
      return false;
    }

    var shajm = sha1.getSHA1(sn + app.globalData.key_words).toUpperCase();
    wx.request({
      url: 'https://apiwx.dkwgps.com/userapi/commandapi/commUpTel',
      dataType: JSON,
      data: {
        sn:sn,
        tel: this.data.mobile,
        jm: shajm,
        type: 'SZ'
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var json = JSON.parse(res.data)
        console.log(json)
        if (json.result == '1') {
          wx.showModal({
            title: '手机号码设置成功',
            content: '更新成功',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                that.onLoad()
              }
            }
          });
        }
        else if (json.result == '2') {
          wx.showModal({
            title: '手机号码设置失败',
            content: '加密不匹配',
            showCancel: false
          });
        } else if (json.result == '0') {
          wx.showModal({
            title: '手机号码设置失败',
            content: '更新失败',
            showCancel: false
          });
        } else if (json.result == '3') {
          wx.showModal({
            title: '无需更新',
            content: '无需更新',
            showCancel: false
          });
        }else {
          wx.showModal({
            title: '更新失败',
            content: '服务器错误',
            showCancel: false
          });
        }
      }
    });
  },
  bindConfirmPasswordInput: function (e) {

    this.setData({
      confirmPassword: e.detail.value
    });
  },
  bindmobileInput: function (e) {
    this.setData({
      mobile: e.detail.value
    });
  },
  bindCodeInput: function (e) {

    this.setData({
      code: e.detail.value
    });
  },
  clearInput: function (e) {
    switch (e.currentTarget.id) {
      case 'clear-password':
        this.setData({
          password: ''
        });
        break;
      case 'clear-confirm-password':
        this.setData({
          confirmPassword: ''
        });
        break;
      case 'clear-mobile':
        this.setData({
          mobile: ''
        });
        break;
      case 'clear-code':
        this.setData({
          code: ''
        });
        break;
    }
  }
})