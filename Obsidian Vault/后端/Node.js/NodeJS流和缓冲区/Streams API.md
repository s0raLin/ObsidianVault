## Streams Promises API
`Streams Promises API`位于 `Node.js` 标准库中的 `stream/promises` 模块内。通过`Streams Promises API`,你可以使用`.then()`、`.catch()`和`async/await`与流一起工作，从而提高代码的可读性

**示例:**
```js
// Require the necessary modules
const fs = require('node:fs');
const { pipeline } = require('node:stream/promises');

async function main() {
    await pipeline(
        fs.createReadStream('input.txt'),
        fs.createWriteStream('output.txt')
    );
    console.log('Pipeline succeeded.');
}

main().catch(console.error);
```

代码解释:
- `node:fs` 模块用于处理文件系统操作，如读取和写入文件。
- `node:stream/promises` 模块提供了 Streams 的 Promises API，支持异步流处理。
- 在异步函数 `main` 中，`pipeline` 函数异步地将数据从 `input.txt` 文件读取（通过 `createReadStream`），并写入 `output.txt` 文件（通过 `createWriteStream`）。
- 操作完成后，代码会打印“`Pipeline succeeded`.”到控制台。
- 如果过程中发生错误，则通过 `main().catch(console.error)` 捕获并记录错误到控制台。

## 理解 Pipeline

**Pipeline** 是 `Node.js Streams` 模块提供的一个实用函数，用于将流链接在一起，并将数据从一个流传递到另一个流。

### 为什么使用**Pipeline**?

- **错误处理**：pipeline 函数在流程中任意环节出错时，会自动销毁所有流，从而防止内存泄漏和多余系统负载。它省去了编写繁杂错误处理代码的需求，使代码更简洁、易于维护。
- **简化数据流**：pipeline 函数提供一种直观方式，将数据从可读流传输到可写流，或通过多个转换流。这不仅提升代码的可读性，还避免了写入速度超过消费速度的风险。
- **优化资源利用**：在处理大数据时，pipeline 能有效管理背压。它自动调控数据流速，防止系统或可写流过载，确保 Node.js 进程在操作大文件时不会耗尽内存，从而提高应用效率。


以下脚本读取一个文本文件，使用 zlib 模块的 gzip 函数压缩它，然后写入一个新文件：

```js
// Import the required modules
const fs = require('node:fs');
const zlib = require('node:zlib');
const { pipeline } = require('node:stream/promises');

async function compressFile() {
    // Use pipeline to read, compress, and write the file
    await pipeline(
        // Read the file
        fs.createReadStream('input.txt'),
        // Compress the file
        zlib.createGzip(),
        // Write the compressed data to a new file
        fs.createWriteStream('input.txt.gz')
    );

    console.log('File successfully compressed.');
}

compressFile().catch(console.error);
```

代码解释
* pipeline 从 input.txt 读取数据，对其进行压缩，然后将压缩数据写入 input.txt.gz
* 如果任何步骤发生错误，pipeline 将销毁所有流，确保不浪费资源

## Finishing

**Finishing** 指的是数据传输的完成。
* 当不再有数据写入流时，该流被视为已完成
* 同样，当不再从流中读取数据时，该流被视为已结束

在 Streams 模块的上下文中，通常应该使用 finished 函数来检测流何时完成发射数据。finished 函数返回一个 Promise，当所有数据已刷新到底层系统时，该 Promise 将被兑现

以下是一个示例：
```js
const { finished } = require("node:stream/promises");
const fs = require("node:fs");

async function run() {
  const stream = fs.createReadStream("file.txt");

  stream.on("data", (chunk) => {
    // Process the chunk (in this example, we're just consuming it)
    console.log(`Received ${chunk.length} bytes of data.`);
  });

  await finished(stream);
  console.log("Stream is finished");
}

run().catch(console.error);
```
代码解释
在上面所示的示例中，
* 程序从 `file.txt` 创建一个 `ReadStream`，然后使用 `finished` 函数来检测流何时完成发射数据
* 一旦流完成，“`Stream is finished`”消息将被记录到控制台
* 执行过程中可能发生的错误将使用 `.catch(console.error)` 处理并记录

