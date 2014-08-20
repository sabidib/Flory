#!/usr/bin/python

import sys;
import os;
import subprocess;
import simplejson as json;
from optparse import OptionParser;

compiler_jar_location = "compiler/compiler.jar";


def cmd(args):
	proc = subprocess.Popen(args,stdout=subprocess.PIPE, stderr = subprocess.PIPE, shell=True);
	out,err = proc.communicate();
	return [out,err];

def compileDemos(minify):
	print "Loading demo file location from demo_info.cfg";
	with open('demo_info.cfg','r') as f:
		data = json.load(f);

	build_file_path = "../../build/";
	root = "../../"
	for demo in data:
		final_build_location = build_file_path + "demo/"+demo['name'] +"/" + demo['name'] + ".js";
		final_build_location_minimized = build_file_path + "demo/"+demo['name'] +"/" + demo['name'] + ".min.js";
		final_build_location_file = open(final_build_location,"w");

		for script in demo['scripts']:
			script_location = root+script;
			with open(script_location) as f:
				final_build_location_file.write(f.read());
			final_build_location_file.write("\n");

		final_build_location_file.close();
		command = "java -jar " + compiler_jar_location + " " + final_build_location + " --compilation_level SIMPLE_OPTIMIZATIONS "+ " --language_in=ECMASCRIPT5_STRICT " +   " --js_output_file " + final_build_location_minimized;
		print "    " + command;
		
		if(minify):
			java_output = cmd(command);
			
			if(java_output[1] != ""):
				print ""
				print "Error :"
				print "";
				sys.stderr.write(java_output[1] + '\n');
				print "Cleaning up";
				print "";
				print  java_output[0];
				sys.exit(1);


def parseArgs(argv):
	parser = OptionParser();
	parser.add_option("-m", "--minify", action="store_true", default=False, dest="minify",help="minify the output");
	options,args = parser.parse_args(argv);
	return options;




#TODO: Add commandline args for compiling different parts
def main(argv):
	options = parseArgs(argv);
	
	minify = options.minify;
	print minify;

	print "";
	print "Starting Build";
	print "";

	source_file_path = "../../src/";
	final_minimized_build_location = "../../build/flory.min.js"
	final_build_location = "../../build/flory.js"
	compiler_jar_location = "compiler/compiler.jar";


	print "Loading source file order from source_order.cfg";

	with open('source_order.cfg','r') as f:
		data = json.load(f);

	final_build_location_file = open(final_build_location,"w");  
	print "    Appending sources to " + final_build_location;
	for file_name in data:
		path = source_file_path + file_name.rstrip();
		
		print "        Appending source from: " + path;
		with open(path) as f:
			final_build_location_file.write(f.read());
		final_build_location_file.write("\n");
 	final_build_location_file.close();


	print "";
	print "Compiling " + final_build_location +  " into " + final_minimized_build_location;

	command = "java -jar " + compiler_jar_location + " " + final_build_location + " --compilation_level SIMPLE_OPTIMIZATIONS "+ " --language_in=ECMASCRIPT5_STRICT " +   " --js_output_file " + final_minimized_build_location;
	print "    " + command;
	if(minify):
		java_output = cmd(command);
		
		if(java_output[1] != ""):
			print ""
			print "Error :"
			print "";
			sys.stderr.write(java_output[1] + '\n');
			print "Cleaning up";
			open(final_build_location,"w").close();
			print "";
			print  java_output[0];
			sys.exit(1);


	print ""
	print "Compiling Demos"
	compileDemos(minify = minify);

	print "Cleaning up";
	print ""
	print "Done";
	print "";
	sys.exit(0);


if __name__ == "__main__":
	main(sys.argv[1:]);
