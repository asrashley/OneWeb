
all: plugins.min.js scripts.min.js

plugins.min.js: plugins.js
	yuicompressor --type=js $< > $@

scripts.min.js: scripts.js
	yuicompressor --type=js $< > $@
