#!/bin/sh
SCRIPT_PATH="utils/build/";
cd $SCRIPT_PATH;
execution="build.py $@"
python $execution 2>&1