#!/usr/bin/python

import sys;
import os;
import subprocess;
try: import simplejson as json
except ImportError: import json 
from optparse import OptionParser;

compiler_jar_location = "compiler/compiler.jar";
divider_string = "-"*(int(60));

def cmd(args):
	proc = subprocess.Popen(args,stdout=subprocess.PIPE, stderr = subprocess.PIPE, shell=True);
	out,err = proc.communicate();
	return [out,err];

def compileDemos(minify):
	print "";
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

		
		command = "java -jar " + compiler_jar_location + " " + final_build_location + " --warning_level=QUIET --compilation_level SIMPLE_OPTIMIZATIONS "+ " --language_in=ECMASCRIPT5_STRICT " +   " --js_output_file " + final_build_location_minimized;
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
	print "";


def compileBaseSource(minify):
	source_file_path = "../../src/";
	final_minimized_build_location = "../../build/flory.min.js"
	final_build_location = "../../build/flory.js"
	compiler_jar_location = "compiler/compiler.jar";

	print "";
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

	command = "java -jar " + compiler_jar_location + " " + final_build_location + " --warning_level=QUIET --compilation_level SIMPLE_OPTIMIZATIONS "+ " --language_in=ECMASCRIPT5_STRICT " +   " --js_output_file " + final_minimized_build_location;
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


def parseArgs(argv):
	parser = OptionParser();
	parser.add_option("-m", "--minify", action="store_true", default=False, dest="minify",help="minify the output.");
	parser.add_option("-d", "--demo", action="store_true", default=False, dest="demos",help="build the demos.");
	parser.add_option("-n", "--no_source", action="store_false", default=True, dest="base",help="do not build the base source file.");
	parser.add_option("-q", "--quiet", action="store_true", default=False,dest="isQuiet",help="produces no output except for success or fail message.")
	parser.add_option("-v", "--verbose", action="store_false", default=False,dest="isVerbose",help="produces more output information.")
	parser.add_option("-i","--includes",metavar="relative path",dest="relativeIncludePath",help="produces a list of html includes for the javascripts relative to the given directory")
	options,args = parser.parse_args(argv);
	return options;






def main(argv):
	options = parseArgs(argv);
	
	base = options.base;
	minify = options.minify;
	demos = options.demos;
	isQuiet = options.isQuiet
	isVerbose = options.isVerbose
	relInclude = options.relativeIncludePath;
	if(relInclude  != None):
		
		with open('source_order.cfg','r') as f:
			data = json.load(f);
		
		for aFile in data:
			res = os.path.relpath("src/"+aFile,relInclude);
			print "<script src='"+res+"'> </script>"
		
		sys.exit(0)
	
	tempStdout = sys.stdout;

	if(base is False and demos is True):
		print "";
		print "The base source needs to be built to build the demos, remove the -n argument to build base source files."
		print "Proceeding without building base source files."

	if(isQuiet):
		f = open(os.devnull, 'w')
		sys.stdout = f


	#
	##
	###
	# Starting Build
	###
	##
	#

	print "";
	print "Starting Build";
	print "";

	print divider_string
	##################################################
	################# Base Source ####################
	if(base):
		print "Compiling Source"
		compileBaseSource(minify = minify);


	print divider_string

	##################################################
	################# Demo Source ####################
	if(demos):
		print "Compiling Demos"
		compileDemos(minify = minify);
		print divider_string

	##################################################


	print "Cleaning up";
	print ""
	print "Done";
	print "";
	

	if(isQuiet):
		sys.stdout = tempStdout
		print "Done.";

	sys.exit(0);

	#
	##
	###
	# Ending Build
	###
	##
	#


if __name__ == "__main__":
	main(sys.argv[1:]);
