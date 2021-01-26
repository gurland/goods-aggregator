# Buckwheat Aggregator
Repository for INT20H 2021 test task made by `U+200F` team.
Aggregating data about buckwheat (and any other goods) from different local stores amongst multiple retail chains, for you to choose the most affordable.

## Demo
[Live version of website](https://grechka.tech/)

![Main page](https://i.imgur.com/OWxUJvi.png)


## Features
- Single Page Application
- Cool design both for Light and Dark themes
- Localization selector
- Line charts for buckwheat
- Cross-store products search
- Products filters

## Technology stack
- Python + Aiohttp + Peewee
- React.js + Semantic Ui
- Docker + Docker Compose
- Nginx

## How to run

### Prerequisite
1. Install [Docker](https://docs.docker.com/get-docker/)
2. Install [Docker-compose](https://docs.docker.com/compose/install/)
3. Optional: install SSL certificate for your server using [certbot](https://certbot.eff.org/)

If you omit step 3 please remove all files inside `nginx_service/block_configs` and copy `goods-aggregator-nossl.conf` there

### Download & Run
```sh
git clone https://github.com/gurland/goods-aggregator.git
cd goods-aggregator
docker-compose up
```
## References
[Swagger API Specifiaction](https://app.swaggerhub.com/apis-docs/gurland/goods-aggregator/1.0.0)

[Trello board](https://trello.com/b/jZGsAdeR/goodsaggregator)

## Contributors

- [Stanislav Bobokalo](https://github.com/gurland/)

- [Oleksandr Semeniuk](https://github.com/dvoyakiy)

- [Roman Matuk](https://github.com/r666666)

- [Kostiantyn Pasalskyi](https://github.com/kiririnou)


## License
[GPL-3.0 License](https://github.com/gurland/goods-aggregator/blob/main/LICENSE)
