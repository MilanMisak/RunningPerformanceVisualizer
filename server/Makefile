image_name = milanmisak/running-performance-visualizer
flask_port = 5000
docker_port = 5000

build:
	docker build -t $(image_name) .

start:
	FLASK_ENV=development FLASK_APP=app.py flask run

start-prod:
	FLASK_APP=app.py flask run

start-docker:
	docker run -p $(docker_port):$(flask_port) $(image_name)

lint:
	pylint *.py

test:
	python -m unittest tests/*
