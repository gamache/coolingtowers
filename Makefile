all: html css

html: index.html

css: main.css

%.html: %.html.haml
	haml $< $@

%.css: %.css.scss
	scss $< $@
