/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  WxApiMethod,
  WxCard,
  WxConfigData,
  WxImgSizeType,
  WxImgSource,
  WxLocationType,
  WxMenu,
  WxNetworkType,
  WxScanType,
  wx,
} from ".";

/**
 * 微信JS-SDK是微信公众平台 面向网页开发者提供的基于微信内的网页开发工具包
 *
 * https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#4
 */
export class WxClass {
  public wxo = wx;
  public ready = false;

  constructor(conf: WxConfigData) {
    wx.config(conf);
    wx.ready(() => {
      this.ready = true;
    });
    wx.error(({ errMsg }) => {
      throw new Error(errMsg);
    });
  }

  /**
   * 基础接口
   *
   * 判断当前客户端版本是否支持指定JS接口
   */
  public checkJsApi(jsApiList: WxApiMethod[]) {
    return new Promise<{
      checkResult: Record<WxApiMethod, boolean>;
      errMsg: string;
    }>((resolve, reject) => {
      wx.checkJsApi({
        jsApiList,
        success: resolve,
        fail: reject,
      });
    });
  }

  /**
   * 分享接口
   *
   * 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
   */
  public updateAppMessageShareData(param: {
    title: string;
    desc: string;
    link: string;
    imgUrl: string;
  }) {
    return new Promise<void>((resolve, reject) => {
      wx.updateAppMessageShareData({
        ...param,
        success: resolve,
        fail: reject,
      });
    });
  }

  /**
   * 分享接口
   *
   * 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
   */
  public updateTimelineShareData(param: {
    title: string;
    link: string;
    imgUrl: string;
  }) {
    return new Promise<void>((resolve, reject) => {
      wx.updateTimelineShareData({
        ...param,
        success: resolve,
        fail: reject,
      });
    });
  }

  /**
   * 分享接口
   *
   * 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
   */
  public onMenuShareWeibo(param: {
    title: string;
    desc: string;
    link: string;
    imgUrl: string;
  }) {
    return new Promise<void>((resolve, reject) => {
      wx.onMenuShareWeibo({
        ...param,
        success: resolve,
        fail: reject,
      });
    });
  }

  /**
   * 图像接口
   *
   * 拍照或从手机相册中选图接口
   */
  public chooseImage(param: {
    count: number;
    sizeType: WxImgSizeType[];
    sourceType: WxImgSource[];
  }) {
    return new Promise<{ localIds: string[] }>((resolve, reject) => {
      wx.chooseImage({
        ...param,
        success: resolve,
        fail: reject,
      });
    });
  }

  /**
   * 图像接口
   *
   * 预览图片接口
   */
  public previewImage(param: { current: string; urls: string[] }) {
    return wx.previewImage(param);
  }

  /**
   * 图像接口
   *
   * 上传图片接口
   */
  public uploadImage(param: { localId: string; isShowProgressTips: 0 | 1 }) {
    return new Promise<{ serverId: string }>((resolve, reject) => {
      wx.uploadImage({
        ...param,
        success: resolve,
        fail: reject,
      });
    });
  }

  /**
   * 图像接口
   *
   * 下载图片接口
   */
  public downloadImage(param: { serverId: string; isShowProgressTips: 0 | 1 }) {
    return new Promise<{ localId: string }>((resolve, reject) => {
      wx.downloadImage({
        ...param,
        success: resolve,
        fail: reject,
      });
    });
  }

  /**
   * 图像接口
   *
   * 获取本地图片接口
   *
   * 备注：此接口仅在 iOS WKWebview 下提供，用于兼容 iOS WKWebview 不支持 localId 直接显示图片的问题。
   */
  public getLocalImgData(param: { localId: string }) {
    return new Promise<{ localData: string }>((resolve, reject) => {
      wx.getLocalImgData({
        ...param,
        success: resolve,
        fail: reject,
      });
    });
  }

  /**
   * 音频接口
   *
   * 开始录音接口
   */
  public startRecord() {
    return new Promise<void>((resolve, reject) => {
      wx.startRecord({
        success: resolve,
        fail: reject,
      });
    });
  }

  /**
   * 音频接口
   *
   * 停止录音接口
   */
  public stopRecord() {
    return new Promise<{ localId: string }>((resolve, reject) => {
      wx.stopRecord({
        success: resolve,
        fail: reject,
      });
    });
  }

  /**
   * 音频接口
   *
   * 监听录音自动停止接口
   */
  public onVoiceRecordEnd(param: { localId: string }) {
    return new Promise<{ localId: string }>((resolve, reject) => {
      wx.onVoiceRecordEnd({
        ...param,
        complete: resolve,
        fail: reject,
      });
    });
  }

  /**
   * 音频接口
   *
   * 播放语音接口
   */
  public playVoice(param: { localId: string }) {
    return new Promise<unknown>((resolve, reject) => {
      wx.playVoice({
        ...param,
        success: resolve,
        fail: reject,
      });
    });
  }

  /**
   * 音频接口
   *
   * 暂停播放接口
   */
  public pauseVoice(param: { localId: string }) {
    return new Promise<unknown>((resolve, reject) => {
      wx.pauseVoice({
        ...param,
        success: resolve,
        fail: reject,
      });
    });
  }

  /**
   * 音频接口
   *
   * 停止播放接口
   */
  public stopVoice(param: { localId: string }) {
    return new Promise<unknown>((resolve, reject) => {
      wx.stopVoice({
        ...param,
        success: resolve,
        fail: reject,
      });
    });
  }

  /**
   * 音频接口
   *
   * 监听语音播放完毕接口
   */
  public onVoicePlayEnd(param: { localId: string }) {
    return new Promise<{ localId: string }>((resolve, reject) => {
      wx.onVoicePlayEnd({
        ...param,
        success: resolve,
        fail: reject,
      });
    });
  }

  /**
   * 音频接口
   *
   * 上传语音接口
   */
  public uploadVoice(param: { localId: string; isShowProgressTips: 0 | 1 }) {
    return new Promise<{ serverId: string }>((resolve, reject) => {
      wx.uploadVoice({
        ...param,
        success: resolve,
        fail: reject,
      });
    });
  }

  /**
   * 音频接口
   *
   * 下载语音接口
   */
  public downloadVoice(param: { serverId: string; isShowProgressTips: 0 | 1 }) {
    return new Promise<{ localId: string }>((resolve, reject) => {
      wx.downloadVoice({
        ...param,
        success: resolve,
        fail: reject,
      });
    });
  }

  /**
   * 智能接口
   *
   * 识别音频并返回识别结果接口
   */
  public translateVoice(param: { localId: string; isShowProgressTips: 0 | 1 }) {
    return new Promise<{ translateResult: string }>((resolve, reject) => {
      wx.translateVoice({
        ...param,
        success: resolve,
        fail: reject,
      });
    });
  }

  /**
   * 设备信息
   *
   * 获取网络状态接口
   */
  public getNetworkType() {
    return new Promise<{ networkType: WxNetworkType }>((resolve, reject) => {
      wx.getNetworkType({
        success: resolve,
        fail: reject,
      });
    });
  }

  /**
   * 地理位置
   *
   * 使用微信内置地图查看位置接口
   */
  public openLocation(param: {
    latitude: number;
    longitude: number;
    name?: string;
    address?: string;
    scale?: number;
    infoUrl?: string;
  }) {
    return new Promise<void>((resolve, reject) => {
      wx.openLocation({
        ...param,
        success: resolve,
        fail: reject,
      });
    });
  }

  /**
   * 地理位置
   *
   * 获取地理位置接口
   */
  public getLocation(param: { type?: WxLocationType }) {
    return new Promise<{
      latitude: number;
      longitude: number;
      speed: number;
      accuracy: number;
    }>((resolve, reject) => {
      wx.getLocation({
        ...param,
        success: resolve,
        fail: reject,
      });
    });
  }

  /**
   * 摇一摇周边
   *
   * 开启查找周边ibeacon设备接口
   */
  public startSearchBeacons(param: { ticket: string }) {
    return new Promise<unknown>((resolve, reject) => {
      wx.startSearchBeacons({
        ...param,
        success: resolve,
        fail: reject,
      });
    });
  }

  /**
   * 摇一摇周边
   *
   * 关闭查找周边ibeacon设备接口
   */
  public stopSearchBeacons() {
    return new Promise<unknown>((resolve, reject) => {
      wx.stopSearchBeacons({
        success: resolve,
        fail: reject,
      });
    });
  }

  /**
   * 摇一摇周边
   *
   * 监听周边ibeacon设备接口
   */
  public onSearchBeacons() {
    return new Promise<unknown>((resolve, reject) => {
      wx.onSearchBeacons({
        success: resolve,
        fail: reject,
      });
    });
  }

  /**
   * 界面操作
   *
   * 关闭当前网页窗口接口
   */
  public closeWindow() {
    return new Promise<unknown>((resolve, reject) => {
      wx.closeWindow({
        success: resolve,
        fail: reject,
      });
    });
  }

  /**
   * 界面操作
   *
   * 批量隐藏功能按钮接口
   */
  public hideMenuItems(param: { menuList: WxMenu[] }) {
    return new Promise<unknown>((resolve, reject) => {
      wx.hideMenuItems({
        ...param,
        success: resolve,
        fail: reject,
      });
    });
  }

  /**
   * 界面操作
   *
   * 批量隐藏功能按钮接口
   */
  public showMenuItems(param: { menuList: WxMenu[] }) {
    return new Promise<unknown>((resolve, reject) => {
      wx.showMenuItems({
        ...param,
        success: resolve,
        fail: reject,
      });
    });
  }

  /**
   * 界面操作
   *
   * 隐藏所有非基础按钮接口
   */
  public hideAllNonBaseMenuItem() {
    return new Promise<unknown>((resolve, reject) => {
      wx.hideAllNonBaseMenuItem({
        success: resolve,
        fail: reject,
      });
    });
  }

  /**
   * 界面操作
   *
   * 显示所有功能按钮接口
   */
  public showAllNonBaseMenuItem() {
    return new Promise<unknown>((resolve, reject) => {
      wx.showAllNonBaseMenuItem({
        success: resolve,
        fail: reject,
      });
    });
  }

  /**
   * 微信扫一扫
   *
   * 调起微信扫一扫接口
   */
  public scanQRCode(param: { needResult?: 0 | 1; scanType?: WxScanType[] }) {
    return new Promise<{ resultStr: string }>((resolve, reject) => {
      wx.scanQRCode({
        ...param,
        success: resolve,
        fail: reject,
      });
    });
  }

  /**
   * 微信小店
   *
   * 跳转微信商品页接口
   */
  public openProductSpecificView(param: {
    productId: string;
    viewType?: 0 | 1 | 2;
  }) {
    return new Promise<unknown>((resolve, reject) => {
      wx.openProductSpecificView({
        ...param,
        success: resolve,
        fail: reject,
      });
    });
  }

  /**
   * 微信卡券
   *
   * 拉取适用卡券列表并获取用户选择信息
   */
  public chooseCard(param: {
    shopId?: string;
    cardType?: string;
    cardId?: string;
    timestamp: number;
    nonceStr: string;
    signType: string;
    cardSign: string;
  }) {
    return new Promise<{ cardList: Omit<WxCard, "code">[] }>(
      (resolve, reject) => {
        wx.chooseCard({
          ...param,
          success: resolve,
          fail: reject,
        });
      },
    );
  }

  /**
   * 微信卡券
   *
   * 批量添加卡券接口
   */
  public addCard(param: { cardList: WxCard[] }) {
    return new Promise<{ cardList: Omit<WxCard, "cardExt">[] }>(
      (resolve, reject) => {
        wx.addCard({
          ...param,
          success: resolve,
          fail: reject,
        });
      },
    );
  }

  /**
   * 微信卡券
   *
   * 查看微信卡包中的卡券接口
   */
  public openCard(param: { cardList: WxCard[] }) {
    return new Promise<unknown>((resolve, reject) => {
      wx.openCard({
        ...param,
        success: resolve,
        fail: reject,
      });
    });
  }

  /**
   * 微信支付
   *
   * 发起一个微信支付请求
   *
   * https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_1_4.shtml
   */
  public requestPayment(param: {
    appId: string;
    timestamp: string;
    nonceStr: string;
    package: string;
    signType: string;
    paySign: string;
  }) {
    return new Promise<{ err_msg: string }>((resolve, reject) => {
      wx.chooseWXPay({ ...param, success: resolve, fail: reject });
    });
  }

  /**
   * 快速输入
   *
   * 共享收货地址接口
   */
  public openAddress() {
    return new Promise<{
      userName: string;
      postalCode: string;
      provinceName: string;
      cityName: string;
      countryName: string;
      detailInfo: string;
      nationalCode: string;
      telNumber: string;
    }>((resolve, reject) => {
      wx.openAddress({
        success: resolve,
        fail: reject,
      });
    });
  }
}
