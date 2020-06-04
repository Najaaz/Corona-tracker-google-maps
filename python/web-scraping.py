from bs4 import BeautifulSoup
import requests

page = requests.get("https://api.coronatracker.com/v3/stats/worldometer/topCountry")
soup = BeautifulSoup(page.content , "html.parser")

literal_text = f"let statistics = {soup}"

info_file = open("js/info.js" , "w")
info_file.write(literal_text)
info_file.close()