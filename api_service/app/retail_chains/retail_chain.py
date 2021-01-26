import asyncio


class RetailChain:
    def __init__(self, chain_name, buckwheat_slug, stores):
        self.chain_name = chain_name
        self.buckwheat_slug = buckwheat_slug
        self.stores = stores

    async def search(self, session, query_string, sorting, locale):
        search_futures = []
        search_response = {
            "name": self.chain_name
        }

        for store in self.stores:
            search_future = store.search(session, query_string, sorting, locale)
            search_futures.append(search_future)

        search_response["stores"] = await asyncio.gather(*search_futures)

        return search_response

    async def get_buckwheat_products(self, session, sorting, locale):
        buckwheat_features = []
        search_response = {
            "name": self.chain_name,
            "buckwheat_slug": self.buckwheat_slug,
        }

        for store in self.stores:
            buckwheat_feature = store.get_buckwheat_products(session, self.buckwheat_slug, sorting, locale)
            buckwheat_features.append(buckwheat_feature)

        search_response["stores"] = await asyncio.gather(*buckwheat_features)

        return search_response
