SRCS=$(shell find . -name "*.scss")

all: ../css/template.css  ../css/dark-template.css

../css/template.css: $(SRCS)
	sass style.scss | yui-compressor --type=css > $@

../css/dark-template.css: $(SRCS)
	sass dark_style.scss | yui-compressor --type=css > $@

watch:
	sass --watch style.scss:../css/template.css
