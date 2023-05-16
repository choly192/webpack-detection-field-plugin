// 正则匹配传入的字符串
export function matchString(str: string, pattern: string[]) {
  if (getType(pattern) !== "Array") {
    console.error("'specifiedInfo' type is not Array!");
    process.exit(1);
  }
  const regex = new RegExp(`(${pattern.join("|")})`, "gi");
  return regex.test(str);
}

// 判断类型
export const getType = (obj: any): string =>
  Object.prototype.toString.call(obj).slice(8, -1);

// 抛出位置信息
export function errorPosition(str: string, pattern: string[]) {
  if (getType(pattern) !== "Array") {
    console.error("'specifiedInfo' type is not Array!");
    process.exit(1);
  }
  const regex = new RegExp(`(${pattern.join("|")})`, "gi");

  // 检查逻辑
  if (regex.test(str)) {
    const error: any = new Error("Code contains invalid fields.");
    const match = str.match(regex)!;
    error.loc = {
      line: str.substring(0, match[0].length).split(/\r\n|\r|\n/).length,
      column: match[0].length - str.lastIndexOf("\n", match[0].length - 1),
    };
    throw error;
  }
}
