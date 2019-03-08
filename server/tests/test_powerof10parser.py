import unittest
from powerof10parser import parse_position, parse_time

class TestPowerof10Parser(unittest.TestCase):

    def test_parse_position(self):
        self.assertEqual(10, parse_position('10'))
        self.assertEqual(10, parse_position('10m'))

    def test_parse_time(self):
        self.assertEqual(parse_time('12.98'), 12.98)
        self.assertEqual(parse_time('77:30'), 4650)
        self.assertEqual(parse_time('2:32:56'), 9176)
