# DetSpecInfoStopPlugin

---

_DetSpecInfoStopPlugin_ 检测项目中的指定的 _字符_ ，如果存在则终止打包。

_参数：_ options

|   参数字段    | 参数类型 |         参数说明         |    参数值    |
| :-----------: | :------: | :----------------------: | :----------: |
| specifiedInfo | string[] | 项目中索要检测匹配的字段 | eg: ["test"] |

_用法:_

```javascript
const { DetSpecInfoStopPlugin } = require("webpack-plugin")

// webpack.config.js
module.exports = {
  ...
  plugins: [
    ...,
    new DetSpecInfoStopPlugin({
      specifiedInfo: ["test"]
    })
  ]

}
```
