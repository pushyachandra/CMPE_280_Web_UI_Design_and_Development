import asyncio
from websockets.sync.client import connect

def hello():
	with connect("ws://localhost:8765") as websocket:
		for i in range(1, 10001):
			websocket.send("Request [" + str(i) + "] Hello world!")
			message = websocket.recv()
			print(f"Received: {message}")

hello()