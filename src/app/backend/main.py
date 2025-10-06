from fatsecret import Fatsecret
import json

consumerKey = '9015618b120842939c12b10f9dc4b552'
consumerSecret = 'e0c9ccfea56942528e14630b0c8b0b8c'

fs = Fatsecret(consumer_key=consumerKey, consumer_secret=consumerSecret)

foods = fs.foods_search("Chicken")

json = json.dumps(foods)

print(json)