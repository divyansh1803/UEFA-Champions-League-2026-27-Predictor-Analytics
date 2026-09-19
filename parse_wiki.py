import urllib.request
import json

team = "Real_Madrid_CF"
url = f"https://en.wikipedia.org/w/api.php?action=parse&page={team}&prop=wikitext&format=json"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
response = urllib.request.urlopen(req).read().decode()
data = json.loads(response)
wikitext = data['parse']['wikitext']['*']

start = wikitext.find("Current squad")
if start != -1:
    print(wikitext[start+1000:start+2500])
