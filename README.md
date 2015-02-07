Flory
====
Flory lets both educators and students show simple and beautiful molecular dynamics simulations directly in a browser.


Quick Start
------------
Open your trusty terminal to install and build Flory:
```sh
mkdir flory
git clone https://github.com/sabidib/flory.git
cd flory
utils/build/build.py -m -d
```
Start a local webserver to access the demos, a python webserver will do:
```sh
python -m SimpleHTTPServer 8888
```
Check it out:
```
http://127.0.0.1:8888/demo/
```
To modify the demos open up the `demo/` folder and modify the .js files, then rebuild the app.

##Installation
A webserver and the python package simplejson are required.


##Usage
Most of the options are for build.py:

build.py [options]

Options:
 
 - `-h, --help`       show this help message and exit
 - `-m, --minify`     minify the output.
 - `-d, --demo`      build the demos.
 - `-n, --no_source`  do not build the base source file.


The future?
-----
Things to be added over the next few weeks:
  * Simple data collection and processing.
  * On the fly experiment customization menu.
