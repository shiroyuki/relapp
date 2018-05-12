COMPILATION_MODE:=development
# IMAGE_TAG=shiroyuki/ghost:com.shiroyuki.relapp.web.ui

# docker-compile:
# 	docker build -t $(IMAGE_TAG) .

# term: docker-compile
# 	docker run -it --rm $(IMAGE_TAG) ash

compile: compile-setup compile-css compile-js

compile-setup:
	yarn

compile-js:
	node_modules/webpack/bin/webpack.js --mode $(COMPILATION_MODE) $(EXT_COMPILE_JS)

compile-css:
	node_modules/sass/sass.js $(EXT_COMPILE_CSS) statics/scss/app.scss statics/css/app.css

docker-compile-css:
	docker run -it --rm \
		-v `pwd`:/opt \
		--workdir /opt \
		node:alpine \
		ash -c "npm install node-sass && node_modules/sass/sass.js $(EXT_COMPILE_CSS) statics/scss statics/css"