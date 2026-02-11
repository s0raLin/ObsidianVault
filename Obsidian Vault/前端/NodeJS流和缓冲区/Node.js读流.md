读流是 `EventEmitter` 类的一个实例。它在读取数据的不同阶段会触发多个事件。其中最常用的事件包括：

- **data** — 当有数据可供读取时触发；
- **end** — 当没有更多数据可读时触发；
- **error** — 当读取或写入数据时发生错误时触发；
- **close** — 当流及其底层资源（例如文件）关闭时触发。

下面是一个示例，展示如何使用这些事件：
```js
// input.txt
Hello from text file
```

```js
// readStreamEventsExample.js

const fs = require('fs');

const readStream = fs.createReadStream('input.txt');

readStream.on('data', function(chunk) {
    console.log('Received %d bytes of data.', chunk.length);
});

readStream.on('end', function(){
    console.log('There is no more data to read.');
});

readStream.on('error', function(err){
    console.error('An error occurred:', err);
});

readStream.on('close', function(){
    console.log('Stream closed.');
});

/**
 * 控制台输出：
 *
 * Received 21 bytes of data.
 * There is no more data to read.
 * Stream closed.
 */
```

**代码说明**：  
在这个示例中:
通过 `fs.createReadStream('input.txt')` 创建了一个读流，然后用 `on` 方法绑定了不同的事件监听器。程序会监听 `data`、`end`、`error` 和 `close` 事件，并在每种情况下在控制台输出相应的提示信息

---

### 控制数据流

有时你可能希望控制读取数据流的速度。Node.js 提供了两种方法来实现：

- **readStream.pause()**：暂时停止数据流，就像按下数据流的“暂停”按钮。
- **readStream.resume()**：在暂停之后，继续数据流。

除此之外，`pipe()` 也是一个非常实用的功能，它可以将读流的数据直接传输到写流，实现从源到目的地的简便数据传输。

下面是一个示例，展示如何使用这些方法：
```js
// readStreamFlowControlExample.js
const fs = require('fs');

const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.on('data', function(chunk) {
    console.log('Received %d bytes of data.', chunk.length);
    readStream.pause();

    console.log('There will be no additional data for 1 second.');
    setTimeout(function(){
        console.log('Now data will start flowing again.');
        readStream.resume();
    }, 1000);
});

// 将读流直接传入写流
readStream.pipe(writeStream);
```

**代码说明**：  
这段代码中:
创建了一个读流和一个写流。当每一块数据被读取时，`data` 事件会被触发，数据流会暂停 1 秒后继续。最后，`pipe()` 方法将读流的数据直接写入到写流中，这个过程会一直持续，直到所有数据都被读取并写入完成

---
