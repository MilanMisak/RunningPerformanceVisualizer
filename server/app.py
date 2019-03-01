from collections import defaultdict
from bs4 import BeautifulSoup
from flask import Flask, abort, jsonify
import requests

app = Flask(__name__)

def fetch_athlete_data(id):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36'
    }
    r = requests.get(f'https://www.thepowerof10.info/athletes/profile.aspx?athleteid={id}', headers=headers)
    if r.status_code != 200:
        abort(r.status_code)
    return r.text


def load_debug_athlete_data():
    with open('AthleteProfile.html', 'r') as f:
        return f.read()


@app.route('/athlete/<id>')
def get_athlete_data(id):
    html = load_debug_athlete_data() if app.config['DEBUG'] else fetch_athlete_data(id)

    soup = BeautifulSoup(html, 'html.parser')
    trs = soup.select('#cphBody_pnlPerformances .alternatingrowspanel tr')

    performances_by_event = defaultdict(list)
    for tr in trs:
        tds = tr.contents
        if len(tds) == 1:
            continue

        event = tds[0].get_text()
        if 'Event' == event:
            continue

        performances_by_event[event].append({
            'performance': tds[1].get_text(),
            'date': tds[11].get_text()
        })
    return jsonify(performances_by_event)
