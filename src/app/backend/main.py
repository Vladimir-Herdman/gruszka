from fatsecret import Fatsecret
import json
from dotenv import load_dotenv
import os
from fastapi import FastAPI


load_dotenv()

consumerKey = os.environ.get('consumerKey')
consumerSecret = os.environ.get('consumerSecret')

fs = Fatsecret(consumer_key=consumerKey, consumer_secret=consumerSecret)

app = FastAPI()

@app.get("/food/{query}")
async def search(query: str):
    foods = fs.foods_search(query)

    return foods