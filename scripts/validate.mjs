/**
 * 用官方的格式 1 校验器校验 market.json，发布前跑一遍。
 *
 * 索引地址用仓库里公开的 raw 地址：相对的 icon 会按它的 origin 解析，
 * 校验器和 DSH 读取端因此看到同一份绝对 URL。
 */
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

import { MarketIndexError, marketInstallTarget, parseMarketIndex } from '@deepseek-ai/dsh-plugin-market-index'

const INDEX_URL = 'https://raw.githubusercontent.com/liasece/dsh-plugins/main/market.json'
const file = fileURLToPath(new URL('../market.json', import.meta.url))
const document = JSON.parse(await readFile(file, 'utf8'))

try {
  const index = parseMarketIndex(document, INDEX_URL)
  console.log(`${INDEX_URL} 校验通过：${index.title.zh ?? index.title.en}，${index.plugins.length} 个插件`)
  for (const plugin of index.plugins) {
    const [newest] = plugin.versions
    const target = marketInstallTarget(plugin.name, newest)
    console.log(`- ${plugin.name} ${newest.version} -> ${target.spec}`)
  }
} catch (error) {
  if (error instanceof MarketIndexError) {
    console.error(`索引不合法：${error.path} ${error.reason}`)
    process.exit(1)
  }
  throw error
}
