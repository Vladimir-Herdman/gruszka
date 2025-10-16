from fatsecret import Fatsecret
import json
from dotenv import load_dotenv
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


load_dotenv()

consumerKey = os.environ.get('consumerKey')
consumerSecret = os.environ.get('consumerSecret')

fs = Fatsecret(consumer_key=consumerKey, consumer_secret=consumerSecret)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # GET, POST, etc.
    allow_headers=["*"],
)


@app.get("/food/{query}")
async def search(query: str):
    foods = fs.foods_search(query)

    return foods