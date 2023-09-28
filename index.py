import asyncio
import aiohttp
import time
from datetime import timedelta

async def make_request():
    MAX_REQUESTS = 3000
    requests_made = 0
    start_time = time.time()
    
    while requests_made < MAX_REQUESTS:
        async with aiohttp.request("POST", "http://localhost:3000/") as response:
            body = await response.text()
        
        requests_made += 1
        if requests_made % 100 == 0:
            print(f"Feitas {requests_made} requisições")
        
    end_time = time.time()
    print(f"Feitas {requests_made} requisições")
    print(f"Tempo total de execução: {timedelta(seconds=end_time - start_time)}")

asyncio.run(make_request())
