#!/bin/bash

uglifyjs "$1" -c pure_getters,pure_funcs=classCallCheck -m toplevel,reserved=['_createClass'] --keep-fnames -o "$2" --source-map "url=$(basename "$2").map,filename=$(basename "$2").map" < "$3"