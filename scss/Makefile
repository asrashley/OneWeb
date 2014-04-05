SRCS=$(shell find . -name "*.scss")

all: ../css/template.css

../css/template.css: $(SRCS)
	sass style.scss | yuicompressor --type=css > $@

watch:
	sass --watch style.scss:../css/template.css
