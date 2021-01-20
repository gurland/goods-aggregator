import os
import logging
import aiohttp
import asyncio

from os.path import join
from time import time


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


async def download_products(session: aiohttp.ClientSession, store_id: str, subdirectory: str):
    async with session.get(BUCKWHEAT_URLS.get(store_id)) as response:
        if response.status == 200:
            content = await response.read()
            with open(join(subdirectory, f"{store_id}.json"), "wb") as json_file:
                json_file.write(content)

        else:
            logging.error(response.url)
            logging.error(response.status)

        return response.status


async def main():
    async with aiohttp.ClientSession() as session:
        timestamp = str(int(time()))
        data_subdirectory = f"data/{timestamp}"

        os.makedirs(data_subdirectory)
        download_futures = [
            download_products(session, store_id, data_subdirectory) for store_id in BUCKWHEAT_URLS.keys()
        ]

        await asyncio.gather(*download_futures)

start = time()
loop = asyncio.get_event_loop()
loop.run_until_complete(main())
print(f"Time taken: {time()-start}")