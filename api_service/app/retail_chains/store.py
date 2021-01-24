from urllib.parse import urlencode

from .settings import SEARCH_URL, CATEGORY_URL

import aiohttp


class Store:
    def __init__(self, store_id, region_id, coords, address):
        self.store_id = store_id
        self.region_id = region_id
        self.coords = coords
        self.address = address

    async def search(self, session: aiohttp.ClientSession, query_string, sorting, locale):
        # Get cheapest/most expensive product in current store
        # by query string and depending on sorting method

        request_url = SEARCH_URL.format(self.store_id) \
                      + urlencode({"q": query_string, "sort": sorting, "per_page": 5})

        product = {}
        async with session.get(request_url) as response:
            if response.status == 200:
                products_json = await response.json()
                product = self.reduce_products_info(products_json.get("results", []))

        return {
            "id": self.store_id,
            "region_id": self.region_id,
            "coords": self.coords,
            "address": self.address.get(locale) or self.address.get("uk"),
            "product": product
        }

    async def get_buckwheat_products(self, session, buckwheat_slug, sorting, locale):
        # Get cheapest/most expensive buckwheat product in
        # current store depending on sorting method

        request_url = CATEGORY_URL.format(self.store_id, buckwheat_slug) \
                      + urlencode({"sort": sorting, "per_page": 5})

        product = {}
        async with session.get(request_url) as response:
            if response.status == 200:
                products_json = await response.json()
                if products_json.get("results"):
                    product = products_json.get("results")[0]

        return {
            "id": self.store_id,
            "region_id": self.region_id,
            "coords": self.coords,
            "address": self.address.get(locale) or self.address.get("uk"),
            "product": product
        }

    @staticmethod
    def reduce_products_info(products):
        if products:
            return {
                "ean": products[0].get("ean"),
                "title": products[0].get("title"),
                "price": products[0].get("price"),
                "weight": products[0].get("weight"),
                "web_url": products[0].get("web_url"),
            }
        else:
            return {}
