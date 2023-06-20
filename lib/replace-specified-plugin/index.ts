/*
 * @Author: bamboo
 * @Description:
 * @Date: 2023-05-15 17:33:34
 * @LastEditors: Do not Edit
 * @LastEditTime: 2023-05-16 10:09:24
 */
import { WebpackPlugin } from "../plugin-type";
import { getType, matchString } from "../utils";
import { Options } from "./type";

/**
 * 替换掉项目文件中 指定文本
 */
const PLUGIN_NAME = "ReplaceSpecifiedInfoPlugin";
class ReplaceSpecifiedInfoPlugin implements WebpackPlugin {
  constructor(readonly options: Options) {}

  apply(compiler: any) {
    compiler.hooks.emit.tapAsync(
      PLUGIN_NAME,
      (compilation: any, callback: Function) => {
        const { replaceTextArr, targetText, isStopPackaging, checkFileType } =
          this.options;

        if (getType(replaceTextArr) !== "Array") {
          console.error("'specifiedInfo' type is not Array!");
          process.exit(1);
        }
        // 定义正则
        const regex = new RegExp(`(${replaceTextArr.join("|")})`, "gi");

        // 遍历所有资源文件
        for (const filename in compilation.assets) {
          // 获取文件后缀
          const fileExtension = filename.split(".").pop() ?? "";
          if (checkFileType.length && checkFileType.includes(fileExtension)) {
            // 获取文本内容
            let content = compilation.assets[filename].source();

            // 判断文本内容是否包含指定的内容
            const isIncludeTarget = matchString(content, replaceTextArr); // 判断是否包含指定的字符串

            if (isIncludeTarget) {
              if (isStopPackaging) {
                console.log(
                  `file content may contains invalid fields: ${replaceTextArr} `
                );
                process.exit(1);
              }

              if (targetText && !isStopPackaging) {
                // 替换文件内容中包含指定文本的部分
                content = content.replace(regex, targetText);
              }
            }

            // 更新资源文件的内容
            compilation.assets[filename] = {
              source: () => content,
              size: () => content.length,
            };
          }
        }

        callback();
      }
    );
  }
}

export default ReplaceSpecifiedInfoPlugin;
