import asyncio

from retail_chains import RETAIL_CHAINS

from aiohttp import web, ClientSession


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
app.add_routes([web.get('/api/v1/search', search_handler)])

if __name__ == '__main__':
    web.run_app(app)
