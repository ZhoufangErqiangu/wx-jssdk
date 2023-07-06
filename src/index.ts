/* eslint-disable @typescript-eslint/no-explicit-any */
export interface WxConfigData {
  /**
   * 开启调试模式,
   * 调用的所有api的返回值会在客户端alert出来,
   * 若要查看传入的参数,
   * 可以在pc端打开,
   * 参数信息会通过log打出,
   * 仅在pc端时才会打印
   */
  debug?: boolean;
  /**
   * 必填，公众号的唯一标识
   */
  appId: string;
  /**
   * 必填，生成签名的时间戳
   */
  timestamp: number;
  /**
   * 必填，生成签名的随机串
   */
  nonceStr: string;
  /**
   * 必填，签名
   */
  signature: string;
  /**
   * 必填，需要使用的JS接口列表
   */
  jsApiList: WxApiMethod[];
}

export type WxApiMethod =
  | "updateAppMessageShareData"
  | "updateTimelineShareData"
  | "onMenuShareWeibo"
  | "onMenuShareQZone"
  | "startRecord"
  | "stopRecord"
  | "onVoiceRecordEnd"
  | "playVoice"
  | "pauseVoice"
  | "stopVoice"
  | "onVoicePlayEnd"
  | "uploadVoice"
  | "downloadVoice"
  | "chooseImage"
  | "previewImage"
  | "uploadImage"
  | "downloadImage"
  | "translateVoice"
  | "getNetworkType"
  | "openLocation"
  | "getLocation"
  | "hideOptionMenu"
  | "showOptionMenu"
  | "hideMenuItems"
  | "showMenuItems"
  | "hideAllNonBaseMenuItem"
  | "showAllNonBaseMenuItem"
  | "closeWindow"
  | "scanQRCode"
  | "openProductSpecificView"
  | "addCard"
  | "chooseCard"
  | "openCard";

export interface BaseParams {
  /**
   * 接口调用成功时执行的回调函数
   */
  success?: (...args: any[]) => void;
  /**
   * 接口调用失败时执行的回调函数
   */
  fail?: (...args: any[]) => void;
  /**
   * 接口调用完成时执行的回调函数，无论成功或失败都会执行
   */
  complete?: (...args: any[]) => void;
  /**
   * 用户点击取消时的回调函数，仅部分有用户取消操作的api才会用到
   */
  cancel?: (...args: any[]) => void;
  /**
   * 监听Menu中的按钮点击时触发的方法，该方法仅支持Menu中的相关接口
   */
  trigger?: (...args: any[]) => void;
}

export type successCb<T = unknown> = (res: T) => void;
export type failCb = (res: { errMsg: string }) => void;
export type completeCb = (res: { errMsg: string }) => void;

export type WxImgSizeType = "original" | "compressed";

export type WxImgSource = "album" | "camera";

export type WxNetworkType = "2g" | "3g" | "4g" | "wifi";

export type WxLocationType = "wgs84" | "gcj02";

export type WxMenu =
  | "menuItem:exposeArticle"
  | "menuItem:setFont"
  | "menuItem:dayMode"
  | "menuItem:nightMode"
  | "menuItem:refresh"
  | "menuItem:profile"
  | "menuItem:addContact"
  | "menuItem:share:appMessage"
  | "menuItem:share:timeline"
  | "menuItem:share:qq"
  | "menuItem:share:weiboApp"
  | "menuItem:favorite"
  | "menuItem:share:facebook"
  | "menuItem:share:QZone"
  | "menuItem:editTag"
  | "menuItem:delete"
  | "menuItem:copyUrl"
  | "menuItem:originPage"
  | "menuItem:readMode"
  | "menuItem:openWithQQBrowser"
  | "menuItem:openWithSafari"
  | "menuItem:share:email"
  | "menuItem:share:brand";

export type WxScanType = "qrCode" | "barCode";

export interface WxCard {
  cardId: string;
  cardExt: string;
  code: string;
}

export interface Wx {
  /**
   * 通过config接口注入权限验证配置
   */
  config: (conf: WxConfigData) => void;
  /**
   * 通过ready接口处理成功验证
   */
  ready: (fn: () => void) => void;
  /**
   * 通过error接口处理失败验证
   */
  error: (fn: (err: { errMsg: string }) => void) => void;

  /**
   * 基础接口
   *
   * 判断当前客户端版本是否支持指定JS接口
   */
  checkJsApi: (param: {
    jsApiList: WxApiMethod[];
    success?: (res: {
      checkResult: Record<WxApiMethod, boolean>;
      errMsg: string;
    }) => void;
    fail?: failCb;
    complete?: completeCb;
  }) => void;

  /**
   * 分享接口
   *
   * 自定义“分享给朋友”及“分享到QQ”按钮的分享内容
   */
  updateAppMessageShareData: (param: {
    title: string;
    desc: string;
    link: string;
    imgUrl: string;
    success?: () => void;
    fail?: failCb;
    complete?: completeCb;
  }) => void;

  /**
   * 分享接口
   *
   * 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
   */
  updateTimelineShareData: (param: {
    title: string;
    link: string;
    imgUrl: string;
    success?: () => void;
    fail?: failCb;
    complete?: completeCb;
  }) => void;

  /**
   * 分享接口
   *
   * 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
   */
  onMenuShareWeibo: (param: {
    title: string;
    desc: string;
    link: string;
    imgUrl: string;
    success?: () => void;
    fail?: failCb;
    complete?: completeCb;
  }) => void;

  /**
   * 图像接口
   *
   * 拍照或从手机相册中选图接口
   */
  chooseImage: (param: {
    count?: number;
    sizeType?: WxImgSizeType[];
    sourceType?: WxImgSource[];
    success?: (res: { localIds: string[] }) => void;
    fail?: failCb;
    complete?: completeCb;
  }) => void;

  /**
   * 图像接口
   *
   * 预览图片接口
   */
  previewImage: (param: { current: string; urls: string[] }) => void;

  /**
   * 图像接口
   *
   * 上传图片接口
   */
  uploadImage: (param: {
    localId: string;
    isShowProgressTips?: 0 | 1;
    success?: (res: { serverId: string }) => void;
    fail?: failCb;
    complete?: completeCb;
  }) => void;

  /**
   * 图像接口
   *
   * 下载图片接口
   */
  downloadImage: (param: {
    serverId: string;
    isShowProgressTips?: 0 | 1;
    success?: (res: { localId: string }) => void;
    fail?: failCb;
    complete?: completeCb;
  }) => void;

  /**
   * 图像接口
   *
   * 获取本地图片接口
   *
   * 备注：此接口仅在 iOS WKWebview 下提供，用于兼容 iOS WKWebview 不支持 localId 直接显示图片的问题。
   */
  getLocalImgData: (param: {
    localId: string;
    success?: (res: { localData: string }) => void;
    fail?: failCb;
    complete?: completeCb;
  }) => void;

  /**
   * 音频接口
   *
   * 开始录音接口
   */
  startRecord: (param: {
    success?: () => void;
    fail?: failCb;
    complete?: completeCb;
  }) => void;

  /**
   * 音频接口
   *
   * 停止录音接口
   */
  stopRecord: (param: {
    success?: (res: { localId: string }) => void;
    fail?: failCb;
    complete?: completeCb;
  }) => void;

  /**
   * 音频接口
   *
   * 监听录音自动停止接口
   */
  onVoiceRecordEnd: (param: {
    success?: successCb;
    fail?: failCb;
    complete?: (res: { localId: string }) => void;
  }) => void;

  /**
   * 音频接口
   *
   * 播放语音接口
   */
  playVoice: (param: {
    localId: string;
    success?: successCb;
    fail?: failCb;
    complete?: completeCb;
  }) => void;

  /**
   * 音频接口
   *
   * 暂停播放接口
   */
  pauseVoice: (param: {
    localId: string;
    success?: successCb;
    fail?: failCb;
    complete?: completeCb;
  }) => void;

  /**
   * 音频接口
   *
   * 停止播放接口
   */
  stopVoice: (param: {
    localId: string;
    success?: successCb;
    fail?: failCb;
    complete?: completeCb;
  }) => void;

  /**
   * 音频接口
   *
   * 监听语音播放完毕接口
   */
  onVoicePlayEnd: (param: {
    success?: (res: { localId: string }) => void;
    fail?: failCb;
    complete?: completeCb;
  }) => void;

  /**
   * 音频接口
   *
   * 上传语音接口
   */
  uploadVoice: (param: {
    localId: string;
    isShowProgressTips?: 0 | 1;
    success?: (res: { serverId: string }) => void;
    fail?: failCb;
    complete?: completeCb;
  }) => void;

  /**
   * 音频接口
   *
   * 下载语音接口
   */
  downloadVoice: (param: {
    serverId: string;
    isShowProgressTips?: 0 | 1;
    success?: (res: { localId: string }) => void;
    fail?: failCb;
    complete?: completeCb;
  }) => void;

  /**
   * 智能接口
   *
   * 识别音频并返回识别结果接口
   */
  translateVoice: (param: {
    localId: string;
    isShowProgressTips?: 0 | 1;
    success?: (res: { translateResult: string }) => void;
    fail?: failCb;
    complete?: completeCb;
  }) => void;

  /**
   * 设备信息
   *
   * 获取网络状态接口
   */
  getNetworkType: (param: {
    success?: (res: { networkType: WxNetworkType }) => void;
    fail?: failCb;
    complete?: completeCb;
  }) => void;

  /**
   * 地理位置
   *
   * 使用微信内置地图查看位置接口
   */
  openLocation: (param: {
    latitude: number;
    longitude: number;
    name?: string;
    address?: string;
    scale?: number;
    infoUrl?: string;
    success?: () => void;
    fail?: failCb;
    complete?: completeCb;
  }) => void;

  /**
   * 地理位置
   *
   * 获取地理位置接口
   */
  getLocation: (param: {
    type?: WxLocationType;
    success?: (res: {
      latitude: number;
      longitude: number;
      speed: number;
      accuracy: number;
    }) => void;
    fail?: failCb;
    complete?: completeCb;
  }) => void;

  /**
   * 摇一摇周边
   *
   * 开启查找周边ibeacon设备接口
   */
  startSearchBeacons: (param: {
    ticket: string;
    success?: successCb;
    fail?: failCb;
    complete?: completeCb;
  }) => void;

  /**
   * 摇一摇周边
   *
   * 关闭查找周边ibeacon设备接口
   */
  stopSearchBeacons: (param: {
    success?: successCb;
    fail?: failCb;
    complete?: completeCb;
  }) => void;

  /**
   * 摇一摇周边
   *
   * 监听周边ibeacon设备接口
   */
  onSearchBeacons: (param: {
    success?: successCb;
    fail?: failCb;
    complete?: completeCb;
  }) => void;

  /**
   * 界面操作
   *
   * 关闭当前网页窗口接口
   */
  closeWindow: (param: {
    success?: successCb;
    fail?: failCb;
    complete?: completeCb;
  }) => void;

  /**
   * 界面操作
   *
   * 批量隐藏功能按钮接口
   */
  hideMenuItems: (param: {
    menuList: WxMenu[];
    success?: successCb;
    fail?: failCb;
    complete?: completeCb;
  }) => void;

  /**
   * 界面操作
   *
   * 批量显示功能按钮接口
   */
  showMenuItems: (param: {
    menuList: WxMenu[];
    success?: successCb;
    fail?: failCb;
    complete?: completeCb;
  }) => void;

  /**
   * 界面操作
   *
   * 隐藏所有非基础按钮接口
   */
  hideAllNonBaseMenuItem: (param: {
    success?: successCb;
    fail?: failCb;
    complete?: completeCb;
  }) => void;

  /**
   * 界面操作
   *
   * 显示所有功能按钮接口
   */
  showAllNonBaseMenuItem: (param: {
    success?: successCb;
    fail?: failCb;
    complete?: completeCb;
  }) => void;

  /**
   * 微信扫一扫
   *
   * 调起微信扫一扫接口
   */
  scanQRCode: (param: {
    needResult?: 0 | 1;
    scanType?: WxScanType[];
    success?: (res: { resultStr: string }) => void;
    fail?: failCb;
    complete?: completeCb;
  }) => void;

  /**
   * 微信小店
   *
   * 跳转微信商品页接口
   */
  openProductSpecificView: (param: {
    productId: string;
    /**
     * 0.默认值，普通商品详情页
     *
     * 1.扫一扫商品详情页
     *
     * 2.小店商品详情页
     */
    viewType?: 0 | 1 | 2;
    success?: successCb;
    fail?: failCb;
    complete?: completeCb;
  }) => void;

  /**
   * 微信卡券
   *
   * 拉取适用卡券列表并获取用户选择信息
   */
  chooseCard: (param: {
    shopId?: string;
    cardType?: string;
    cardId?: string;
    timestamp: number;
    nonceStr: string;
    signType: string;
    cardSign: string;
    success?: (res: { cardList: Omit<WxCard, "code">[] }) => void;
    fail?: failCb;
    complete?: completeCb;
  }) => void;

  /**
   * 微信卡券
   *
   * 批量添加卡券接口
   */
  addCard: (param: {
    cardList: WxCard[];
    success?: (res: { cardList: Omit<WxCard, "cardExt">[] }) => void;
    fail?: failCb;
    complete?: completeCb;
  }) => void;

  /**
   * 微信卡券
   *
   * 查看微信卡包中的卡券接口
   */
  openCard: (param: {
    cardList: WxCard[];
    success?: successCb;
    fail?: failCb;
    complete?: completeCb;
  }) => void;

  /**
   * 微信支付
   *
   * 发起一个微信支付请求
   *
   * https://pay.weixin.qq.com/wiki/doc/apiv3/apis/chapter3_1_4.shtml
   */
  chooseWXPay: (
    param: {
      appId: string;
      timestamp: string;
      nonceStr: string;
      package: string;
      signType: string;
      paySign: string;
      success?: successCb<{ err_msg: string }>;
      fail?: failCb;
      complete?: completeCb;
    },
  ) => void;

  /**
   * 快速输入
   *
   * 共享收货地址接口
   */
  openAddress: (param: {
    success?: (res: {
      userName: string;
      postalCode: string;
      provinceName: string;
      cityName: string;
      countryName: string;
      detailInfo: string;
      nationalCode: string;
      telNumber: string;
    }) => void;
    fail?: failCb;
    complete?: completeCb;
  }) => void;
}

/**
 * 微信JS-SDK是微信公众平台 面向网页开发者提供的基于微信内的网页开发工具包
 *
 * https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#4
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const wx = window.wx as Wx;

export * from "./noneCb";
