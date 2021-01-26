import logging
import asyncio
from time import time

import aiohttp
from peewee import fn

from models import BuckwheatProduct


API_URL = "https://stores-api.zakaz.ua/stores/{0}/categories/{1}/products"

BUCKWHEAT_URLS = {
    '48201030': API_URL.format('48201030', 'buckwheat'),
    '482010105': API_URL.format('482010105', 'buckwheat'),
    '48206110': API_URL.format('48206110', 'buckwheat'),
    '48215610': API_URL.format('48215610', 'buckwheat-metro'),
    '48215612': API_URL.format('48215612', 'buckwheat-metro'),
    '48215637': API_URL.format('48215637', 'buckwheat-metro'),
    '48246401': API_URL.format('48246401', 'buckwheat-auchan'),
    '48246409': API_URL.format('48246409', 'buckwheat-auchan'),
    '48246411': API_URL.format('48246411', 'buckwheat-auchan')
}


async def get_buckwheat_by_store_id(session: aiohttp.ClientSession, store_id: str, timestamp: int):
    async with session.get(BUCKWHEAT_URLS.get(store_id)) as response:
        buckwheat_products = []
        if response.status == 200:
            data = await response.json()
            products = data.get("results")
            for product in products:
                price = int(product.get("price"))
                weight = float(product.get("weight")) or 1000

                buckwheat_products.append(
                    {
                        "ean": product.get("ean"),
                        "store_id": store_id,
                        "timestamp": timestamp,
                        "price": price,
                        "price_per_kg": (price / weight) * 1000,
                    }
                )

        return buckwheat_products


async def main():
    last_timestamp = BuckwheatProduct.select(
        fn.max(BuckwheatProduct.timestamp).alias("last_timestamp")
    )[0].last_timestamp or 0
    while True:
        current_timestamp = int(time())
        if current_timestamp - last_timestamp > 1800:
            last_timestamp = current_timestamp

            async with aiohttp.ClientSession() as session:
                download_futures = [
                    get_buckwheat_by_store_id(session, store_id, current_timestamp)
                    for store_id in BUCKWHEAT_URLS.keys()
                ]

                buckwheat_products = []
                for store_products in await asyncio.gather(*download_futures):
                    buckwheat_products.extend(store_products)

                BuckwheatProduct.insert_many(buckwheat_products).execute()
                logging.info(f"Inserted {len(buckwheat_products)} buckwheat "
                             f"products at {current_timestamp}")

        await asyncio.sleep(1)


loop = asyncio.get_event_loop()
loop.run_until_complete(main())