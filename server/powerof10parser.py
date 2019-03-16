'''
Power of 10 data parser for extracting performances of an athlete.
'''

from collections import defaultdict
from datetime import datetime
import re
from bs4 import BeautifulSoup

TIME_REGEX = r'((?P<hours>\d+):)*?((?P<minutes>\d+):)?(?P<seconds>\d+)(\.(?P<frac>\d+))?$'

def parse_time(performance_str):
    '''
    Parses performance (time) string such as 12.98, 77:30 or 2:32:56
    and returns the number of seconds it corresponds to.
    '''
    m = re.match(TIME_REGEX, performance_str.strip())
    if not m:
        return None

    groups = m.groupdict()

    secs = int(groups['seconds'])

    if groups['frac'] is not None:
        secs += int(groups['frac']) / (10 ** len(groups['frac']))

    if groups['minutes'] is not None:
        secs += int(groups['minutes']) * 60

    if groups['hours'] is not None:
        secs += int(groups['hours']) * (60 ** 2)

    return secs


def parse_position(position_str):
    '''
    Parses position string and returns position (ignores letter suffixes such as
    'm' in '12m').
    '''
    m = re.match(r'\d+', position_str)
    return int(m[0]) if m else None


def parse_html(html):
    '''
    Parses a Power of 10 athlete page HTML string and returns a map
    of performances by event.
    '''
    soup = BeautifulSoup(html, 'html.parser')
    trs = soup.select('#cphBody_pnlPerformances .alternatingrowspanel tr')

    performances_by_event = defaultdict(list)
    for tr in trs:
        tds = tr.contents
        if len(tds) == 1:
            continue

        event = tds[0].get_text()
        if event == 'Event':
            continue

        if event.endswith('XC') or event.endswith('L') or event.startswith('JT'):
            # Ignore cross country, relays (with odd distances) and javelin throw?
            continue

        date_str = tds[11].get_text()
        date = datetime.strptime(date_str, '%d %b %y').strftime('%Y-%m-%d')
        time_str = tds[1].get_text()
        position_str = tds[5].get_text()
        position = parse_position(position_str)
        meeting_str = tds[10].get_text()

        performances_by_event[event].append({
            'time': parse_time(time_str),
            'time_str': time_str,
            'date': date,
            'position': position,
            'meeting': meeting_str
        })

    for event, performances in performances_by_event.items():
        performances_by_event[event] = sorted(performances, key=lambda perf: perf['time'])

    return performances_by_event
