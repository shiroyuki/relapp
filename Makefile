ui:
	cd web-ui && make compile

ui-css:
	cd web-ui && make compile-css

dev-ui-js:
	cd web-ui && make compile-js EXT_COMPILE_JS=--watch
