COMPILATION_MODE:=development
# IMAGE_TAG=shiroyuki/ghost:com.shiroyuki.relapp.web.ui

# docker-compile:
# 	docker build -t $(IMAGE_TAG) .

# term: docker-compile
# 	docker run -it --rm $(IMAGE_TAG) ash

compile:
	yarn
	node_modules/webpack/bin/webpack.js --mode $(COMPILATION_MODE)