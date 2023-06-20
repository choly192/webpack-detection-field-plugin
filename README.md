# 安装

```bash
yarn add webpack-detection-field-plugin -D
```

## DetSpecInfoStopPlugin

_DetSpecInfoStopPlugin_ 检测项目中的指定的 _字符_ ，如果存在则终止打包。

_参数：_ options

|   参数字段    | 参数类型 |         参数说明         |    参数值    |
| :-----------: | :------: | :----------------------: | :----------: |
| specifiedInfo | string[] | 项目中索要检测匹配的字段 | eg: ["test"] |

_用法:_

```javascript
const { DetSpecInfoStopPlugin } = require("webpack-detection-field-plugin")

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

## ReplaceSpecifiedInfoPlugin

_ReplaceSpecifiedInfoPlugin_ 检测项目中的指定的 _字符_ ，若存在指定的字符支持两种操作：

1. 替换为指定的字符，_targetText_
2. 终止打包，_isStopPackaging_

_参数：_ options

|    参数字段     | 参数类型 |         参数说明         |         参数值          |
| :-------------: | :------: | :----------------------: | :---------------------: |
| replaceTextArr  | string[] | 项目中索要检测匹配的字段 |      eg: ["test"]       |
|   targetText    |  string  |     替换为指定的字符     |    eg: "just do it!"    |
| isStopPackaging | boolean  |       是否终止打包       |        eg: false        |
|  checkFileType  | string[] |      检测的文件类型      | eg: ["js","css","html"] |

_用法:_

```javascript
const { ReplaceSpecifiedInfoPlugin } = require("webpack-detection-field-plugin")

// webpack.config.js
module.exports = {
  ...
  plugins: [
    ...,
    new ReplaceSpecifiedInfoPlugin({
      replaceTextArr: ["test"],
      targetText: "just",
      isStopPackaging: false
    })
  ]

}
```
