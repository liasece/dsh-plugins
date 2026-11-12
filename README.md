# dsh-plugins

liasece 自用的 [DeepSeek Harness](https://github.com/deepseek-ai)（DSH）插件索引，一份符合
插件市场索引格式 1 的 `market.json`。DSH 的插件市场没有官方索引，每个索引源都由使用者自己添加；
这个仓库就是我自己的那个源。

[English](README.en.md) | 中文

## 索引地址

```
https://raw.githubusercontent.com/liasece/dsh-plugins/main/market.json
```

## 怎么用

1. 在 DSH 侧栏打开**插件**，在「实验性插件」里打开**自定义插件索引**（这一步会装上 Host 的
   `pluginMarket` 服务和插件页的**发现**标签页，默认是关的）。
2. 切到**发现**，添加索引源，粘贴上面的地址。
3. 索引里的插件会列出来，点安装即可；装完的插件和从别处装的一样，在**已安装**里管理。

## 索引里的插件

| 插件 | 版本 | 说明 |
| --- | --- | --- |
| [`oh-my-dsh`](https://github.com/liasece/oh-my-dsh) | `0.1.0` | 三合一：峰谷动态（按会话、按时段换真实路由）、输入框候选（回合结束后给几条下一步）、输入历史（空草稿按 ↑ 召回发过的消息）。三项各有一个总开关，关掉即彻底停手。 |

## 发布新版本

索引靠 commit SHA 定位版本，所以顺序是先发布插件、再改索引：

1. 在插件仓库改代码、升 `package.json` 的版本，提交并推送（不要改写已发布的历史）。
2. 取那个提交的完整 SHA：`git rev-parse HEAD`。
3. 在 `market.json` 的 `plugins[].versions` 里追加一条，`version` 用插件的新版本号，
   `publishTimestamp` 用该提交的时间（Unix 秒），`source.git.commit` 填完整 SHA；
   旧版本条目保留，市场里就能选版本。
4. `pnpm run validate` 通过后提交推送本仓库。

```bash
pnpm install
pnpm run validate   # 用官方 @deepseek-ai/dsh-plugin-market-index 校验格式 1
```

## 结构

```
market.json                    索引本体（格式 1）
icons/<包名>.svg               插件图标，相对路径按索引地址解析
scripts/validate.mjs           发布前校验，用的是 DSH 读取端同一份校验器
```

## 许可

[MIT](LICENSE)
