from fatsecret import Fatsecret
import json
from dotenv import load_dotenv
import os


load_dotenv()

consumerKey = os.environ.get('consumerKey')
consumerSecret = os.environ.get('consumerSecret')

fs = Fatsecret(consumer_key=consumerKey, consumer_secret=consumerSecret)

foods = fs.foods_search("Chicken")

json = json.dumps(foods)

print(json)