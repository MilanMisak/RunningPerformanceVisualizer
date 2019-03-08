from collections import defaultdict
from datetime import datetime
import re
from bs4 import BeautifulSoup
from dateutil.parser import parse

TIME_REGEX = r'((?P<hours>\d+):)*?((?P<minutes>\d+):)?(?P<seconds>\d+)(\.(?P<frac>\d+))?$'

'''
Parses performance (time) string such as 12.98, 77:30 or 2:32:56
and returns the number of seconds it corresponds to.
'''
def parse_time(performance_str):
    m = re.match(TIME_REGEX, performance_str.strip())
    if not m:
        return None

    groups = m.groupdict()

    n = int(groups['seconds'])

    if groups['frac'] is not None:
        n += int(groups['frac']) / (10 ** len(groups['frac']))
    
    if groups['minutes'] is not None:
        n += int(groups['minutes']) * 60
    
    if groups['hours'] is not None:
        n += int(groups['hours']) * (60 ** 2)

    return n

# TODO - set up tests
print(parse_time('12.98') == 12.98)
print(parse_time('77:30') == 4650)
print(parse_time('2:32:56') == 9176)


def parse_position(position_str):
    m = re.match(r'\d+', position_str)
    return int(m[0]) if m else None


def parse_html(html):
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

        date_str = tds[11].get_text()
        date = datetime.strptime(tds[11].get_text(), '%d %b %y').strftime('%Y-%m-%d')
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
