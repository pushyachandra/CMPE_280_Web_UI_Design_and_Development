import asyncio
from random import randint
from websockets.server import serve

async def echo(websocket):
    async for message in websocket:
        await websocket.send('[' + str(randint(1, 10)) + '] ' + message)

async def main():
    async with serve(echo, "localhost", 8766):
        await asyncio.Future()  # run forever

asyncio.run(main())