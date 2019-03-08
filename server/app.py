from flask import Flask, abort, jsonify
import requests
from .powerof10parser import parse_html

app = Flask(__name__)

def fetch(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36'
    }
    r = requests.get(url, headers=headers)
    if r.status_code != 200:
        abort(r.status_code)
    return r.text


def fetch_athlete_data(id):
    return fetch(f'https://www.thepowerof10.info/athletes/profile.aspx?athleteid={id}')


def load_debug_athlete_data():
    with open('AthleteProfile.html', 'r') as f:
        return f.read()


@app.route('/athlete/<id>')
def get_athlete_data(id):
    html = load_debug_athlete_data() if app.config['DEBUG'] else fetch_athlete_data(id)
    return jsonify(parse_html(html))
