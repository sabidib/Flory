Flory
====
Flory lets both educators and students show simple and beautiful molecular dynamics simulations directly in a browser.

Quick Start
------------
Open your trusty terminal to install and build Flory:
```sh
mkdir flory
git clone git://github.com/sabidib/flory flory
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
To modify the demos open up the `demo/` folder and modify the .js files.

The future?
-----
Things to be added over the next few weeks:
  * Simple data collection and processing.
  * On the fly experiment customization menu.

