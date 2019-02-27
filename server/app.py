from bs4 import BeautifulSoup
from flask import Flask, abort
import requests

app = Flask(__name__)

@app.route('/athlete/<id>')
def get_athlete_data(id):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36'
    }
    r = requests.get(f'https://www.thepowerof10.info/athletes/profile.aspx?athleteid={id}', headers=headers)
    if r.status_code != 200:
        abort(r.status_code)

    soup = BeautifulSoup(r.text, 'html.parser')
    return soup.h2.get_text()
