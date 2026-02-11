**Unicode**是用于编码和表示文本的标准，可以视为ASCII表的扩展: **Unicode** 中的前 128 个数字代表 ASCII 符号

## 组成
**Unicode** 由两部分组成：通用字符集 (UCS) 和通用转换格式 (UTF)

* UCS 本质上是 Unicode 支持的所有符号的索引及其代码
![[Unicode.png]]
* 在 Unicode 中，每个符号对应一个数字——码点(通常以 U+ 后跟其十六进制值表示),如大写字母Q的代码是U+0051,位于行0050和列1的交点

## Unicode 的实现
UTF-8 每个码点使用 1 到 4 个字节，能够表示 Unicode 的所有码点。UTF-8 还向后兼容 ASCII