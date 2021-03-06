'''
Application server that provides performance data for athletes.
'''

from flask import Flask, abort, jsonify
import requests
from .powerof10parser import parse_html

app = Flask(__name__)  # pylint: disable=invalid-name

def fetch(url):
    '''
    Returns HTML from a given URL.
    '''
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36' \
        ' (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36'
    }
    r = requests.get(url, headers=headers)
    if r.status_code != 200:
        abort(r.status_code)
    return r.text


def fetch_athlete_data(athlete_id):
    '''
    Fetches HTML data from Power of 10 for a given athlete.
    '''
    return fetch(f'https://www.thepowerof10.info/athletes/profile.aspx?athleteid={athlete_id}')


def load_debug_athlete_data():
    '''
    Loads raw HTML data with a performances of an athlete used for debugging.
    '''
    with open('AthleteProfile.html', 'r') as f:
        return f.read()

@app.route('/athlete/<athlete_id>')
def get_athlete_data(athlete_id):
    '''
    Returns personal and performance data for an athlete.
    '''
    html = load_debug_athlete_data() if app.config['DEBUG'] else fetch_athlete_data(athlete_id)
    response = jsonify(parse_html(html))
    if app.config['DEBUG']:
        response.headers['Access-Control-Allow-Origin'] = '*'
    else:
        response.headers['Cache-Control'] = 'must-revalidate, max-age=3600'
    return response
