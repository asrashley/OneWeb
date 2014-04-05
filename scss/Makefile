SRCS=$(shell find . -name "*.scss")

all: ../css/template.css

../css/template.css: $(SRCS)
	sass style.scss | yuicompressor --type=css > $@
