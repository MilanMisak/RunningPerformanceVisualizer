docker-build:
	docker build -t milanmisak/running-performance-visualizer .

docker-run:
	docker run -p 8081:5000 milanmisak/running-performance-visualizer
