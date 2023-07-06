# wx-jssdk

Interface to wx jssdk

According to Low Coupling and High cohesion, using as less dependencies as possibel.

Has no side effect feature, such as storage.

## How to use

Add script tag in html head

```html
<script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
```

Import wx and config

```typescript
import { wx } from "@liuhlightning/wx-jssdk"; 

wx.config({
  debug: import.meta.env.DEV,
  appId: "your app id",
  timestamp: "time when sign",
  nonceStr: "nonce when sign",
  signature: "signature",
  jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"],
});
```
