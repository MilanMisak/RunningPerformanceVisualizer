start:
	FLASK_ENV=development FLASK_APP=app.py flask run

start-prod:
	FLASK_APP=app.py flask run

start-docker:
	docker run -p 8081:5000 milanmisak/running-performance-visualizer

build:
	docker build -t milanmisak/running-performance-visualizer .

lint:
	pylint *.py

test:
	python -m unittest tests/*
