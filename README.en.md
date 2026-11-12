# dsh-plugins

A personal plugin index for [DeepSeek Harness](https://github.com/deepseek-ai) (DSH): one `market.json`
that follows plugin market index format 1. DSH ships no official index — every index source is added by
the user — so this repository is mine.

[中文](README.md) | English

## Index URL

```
https://raw.githubusercontent.com/liasece/dsh-plugins/main/market.json
```

## Use it

1. Open **Plugins** in the DSH sidebar and switch on **Custom plugin indexes** under **Experimental plugins**
   (this mounts the Host `pluginMarket` service and the **Discover** tab; both are off by default).
2. Go to **Discover**, add an index source, and paste the URL above.
3. The plugins in the index are listed there; install one and manage it under **Installed** like any other bundle.

## Plugins in this index

| Plugin | Version | What it does |
| --- | --- | --- |
| [`oh-my-dsh`](https://github.com/liasece/oh-my-dsh) | `0.1.0` | Three in one: peak/off-peak routing per session, next-message candidates above the composer, and ↑-recall of previously sent messages. Each feature has its own master switch. |

## Publishing a version

The index pins versions by commit SHA, so publish the plugin first and the index second:

1. Change the plugin, bump its `package.json` version, commit and push (never rewrite published history).
2. Take the full SHA of that commit: `git rev-parse HEAD`.
3. Append an entry to `plugins[].versions` in `market.json`: `version` is the new package version,
   `publishTimestamp` is that commit's time in Unix seconds, `source.git.commit` is the full SHA.
   Keep older entries so the market can offer them.
4. Run `pnpm run validate`, then commit and push this repository.

```bash
pnpm install
pnpm run validate   # validates format 1 with the same @deepseek-ai/dsh-plugin-market-index DSH reads with
```

## Layout

```
market.json                    the index itself (format 1)
icons/<package>.svg            plugin icons; relative paths resolve against the index URL
scripts/validate.mjs           pre-publish validation using DSH's own validator
```

## License

[MIT](LICENSE)
