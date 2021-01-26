import asyncio

from retail_chains import RETAIL_CHAINS
from models import BuckwheatProduct

from peewee import fn
from aiohttp import web, ClientSession


async def avg_store_prices_handler(request):
    store_id = request.match_info['store_id']
    q = BuckwheatProduct.select(
        BuckwheatProduct.timestamp, fn.avg(BuckwheatProduct.price_per_kg).alias("avg_price_per_kg")
    ).where(BuckwheatProduct.store_id == store_id).group_by(BuckwheatProduct.timestamp)

    if q.count() == 0:
        return web.json_response({"message": "Nothing found"}, status=404)

    result = {
        "timestamps": [],
        "prices": []
    }
    for product in q:
        result["timestamps"].append(product.timestamp)
        result["prices"].append(product.avg_price_per_kg)

    return web.json_response(result)


async def product_store_prices_handler(request):
    store_id = request.match_info['store_id']
    ean = request.match_info['ean']

    q = BuckwheatProduct.select(
        BuckwheatProduct.timestamp, BuckwheatProduct.price_per_kg
    ).where((BuckwheatProduct.store_id == store_id) & (BuckwheatProduct.ean == ean))

    if q.count() == 0:
        return web.json_response({"message": "Nothing found"}, status=404)

    result = {
        "timestamps": [],
        "prices": []
    }
    for product in q:
        result["timestamps"].append(product.timestamp)
        result["prices"].append(product.price_per_kg)

    return web.json_response(result)


async def search_handler(request):
    accept_language = request.headers.get("accept-language")
    headers = {
        "User-Agent": request.headers.get("user-agent"),
        "Accept-Language": accept_language,
        "Accept-Encoding": "gzip, deflate"
    }

    sorting = request.query.get("sort", "price_asc")
    query_string = request.query.get("q", "")

    if sorting not in ("price_asc", "price_desc"):
        sorting = "price_asc"

    async with ClientSession(headers=headers) as session:
        chain_features = []
        for retail_chain in RETAIL_CHAINS:
            if len(query_string) < 3:
                # If no query string provided (or less than 3 chars)
                # search only for buckwheat products
                chain_search_futures = retail_chain.get_buckwheat_products(session, sorting, accept_language[:2])
                chain_features.append(chain_search_futures)
            else:
                chain_search_futures = retail_chain.search(session, query_string, sorting, accept_language[:2])
                chain_features.append(chain_search_futures)

        results = await asyncio.gather(*chain_features)
        return web.json_response(results)

app = web.Application()
app.add_routes([
    web.get('/api/v1/search', search_handler),
    web.get('/api/v1/prices/{store_id}', avg_store_prices_handler),
    web.get('/api/v1/prices/{store_id}/{ean}', product_store_prices_handler),
])

if __name__ == '__main__':
    web.run_app(app)
