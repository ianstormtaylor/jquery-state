release:
		java -jar libs/yuicompressor-2.4.8pre.jar -o jquery-state.min.js jquery-state.js

test:
		open test/index.html

.PHONY: release test