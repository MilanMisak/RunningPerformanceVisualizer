FROM python:3.7.2-alpine3.9

WORKDIR /usr/app
COPY client client
COPY server server

WORKDIR /usr/app/server
RUN pip3 install pipenv
RUN pipenv install

EXPOSE 5000

ENV FLASK_APP=app.py 
CMD pipenv run flask run --host 0.0.0.0
