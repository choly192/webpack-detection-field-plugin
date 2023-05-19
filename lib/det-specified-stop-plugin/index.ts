import { WebpackPlugin } from "../plugin-type";
import { matchString, errorPosition } from "../utils";
import { Options } from "./type";
/**
 *  检测文件类型内容，发现指定信息时终止打包
 */

class DetSpecInfoStopPlugin implements WebpackPlugin {
  constructor(readonly options: Options) {}

  apply(compiler: any) {
    compiler.hooks.normalModuleFactory.tap(
      "DetSpecInfoStopPlugin",
      (normalModuleFactory: any) => {
        normalModuleFactory.hooks.parser
          .for("javascript/auto")
          .tap("DetSpecInfoStopPlugin", (parser: any) => {
            parser.hooks.program.tap(
              "DetSpecInfoStopPlugin",
              (ast: any, comments: any) => {
                // 获取当前模块的源代码
                // const sourceCode = parser.state.current.module._source.source();

                const sourceCode = parser.state.source;

                const isIncludeTarget = matchString(
                  sourceCode,
                  this.options.specifiedInfo
                ); // 判断是否包含指定的字符串
                if (isIncludeTarget) {
                  errorPosition(
                    sourceCode,
                    this.options.specifiedInfo,
                    parser.state.module.resource
                  );
                  // 终止打包
                  process.exit(1);
                }
              }
            );
          });
      }
    );
  }
}

export default DetSpecInfoStopPlugin;
