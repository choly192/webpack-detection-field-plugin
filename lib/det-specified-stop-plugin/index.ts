import { WebpackPlugin } from "../plugin-type";
import { matchString, errorPosition } from "../utils";
import {
  JAVASCRIPT_MODULE_TYPE_AUTO,
  JAVASCRIPT_MODULE_TYPE_DYNAMIC,
  JAVASCRIPT_MODULE_TYPE_ESM,
} from "../constants";
import { Options } from "./type";
/**
 *  检测文件类型内容，发现指定信息时终止打包
 */
const PLUGIN_NAME = "DetSpecInfoStopPlugin";
class DetSpecInfoStopPlugin implements WebpackPlugin {
  constructor(readonly options: Options) {}

  apply(compiler: any) {
    compiler.hooks.normalModuleFactory.tap(
      PLUGIN_NAME,
      (normalModuleFactory: any) => {
        const handler = (parser: any) => {
          parser.hooks.program.tap(PLUGIN_NAME, (ast: any) => {
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
          });
        };

        normalModuleFactory.hooks.parser
          .for(JAVASCRIPT_MODULE_TYPE_AUTO)
          .tap(PLUGIN_NAME, handler);
        normalModuleFactory.hooks.parser
          .for(JAVASCRIPT_MODULE_TYPE_DYNAMIC)
          .tap(PLUGIN_NAME, handler);
        normalModuleFactory.hooks.parser
          .for(JAVASCRIPT_MODULE_TYPE_ESM)
          .tap(PLUGIN_NAME, handler);
      }
    );
  }
}

export default DetSpecInfoStopPlugin;
