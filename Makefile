min:
		java -jar libs/yuicompressor-2.4.8pre.jar -o jquery-state.min.js jquery-state.js

test:
		open test/index.html

test-min:
		open test/index.min.html

.PHONY: min test test-min