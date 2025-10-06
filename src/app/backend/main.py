from fatsecret import Fatsecret
import json

fs = Fatsecret(consumer_key=consumerKey, consumer_secret=consumerSecret)

foods = fs.foods_search("Chicken")

json = json.dumps(foods)

print(json)