/* eslint-disable @typescript-eslint/no-unused-vars */
import { WxApiMethod, WxConfigData, WxImgSizeType, WxImgSource, wx } from ".";

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
}
