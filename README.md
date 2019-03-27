# HeartReverseProxy
A Heart Radio Reverse Proxy

# Setup
Make a copy of `config.sample.json` and name it `config.json`, populate values.

```
{
  "supersecretkey": "put your <supersecretkey> here.",
  "host": "127.0.0.1",
  "port": 22001
}
```

| key | description |
|:---:|:-----------:|
| `supersecretkey` | Go and [find it](https://play.google.com/store/apps/details?id=com.thisisglobal.player.heart). |
| `host` | The host this app should listen to, use `127.0.0.1` if you are going to put this behind a local reverse proxy. |
| `port` | The port this app should listen to. |

