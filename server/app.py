'''
Application server that provides performance data for athletes.
'''

from flask import Flask, abort, jsonify, send_from_directory
import requests
from .powerof10parser import parse_html

APP = Flask(__name__)

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


@APP.route('/<path:path>')
def get_static_file(path):
    return send_from_directory('../client/dist', path)


@APP.route('/api/athlete/<athlete_id>')
def get_athlete_data(athlete_id):
    '''
    Returns personal and performance data for an athlete.
    '''
    html = load_debug_athlete_data() if APP.config['DEBUG'] else fetch_athlete_data(athlete_id)
    response = jsonify(parse_html(html))
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response
