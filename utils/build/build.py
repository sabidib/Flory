#!/usr/bin/python

import sys;
import os;
import subprocess;




def cmd(args):
	proc = subprocess.Popen(args,stdout=subprocess.PIPE, stderr = subprocess.PIPE, shell=True);
	out,err = proc.communicate();
	return [out,err];

#TODO: Add commandline args for compiling different parts
def main(argv):


	print "";
	print "Starting Build";
	print "";

	source_file_path = "../../src/";
	final_minimized_build_location = "../../build/flory.min.js"
	final_build_location = "../../build/flory.js"
	compiler_jar_location = "compiler/compiler.jar";


	print "Loading source file order from source_order.cfg";

	source_order = open("source_order.cfg","r");

	final_build_location_file = open(final_build_location,"w");  
	print "    Appending sources to " + final_build_location;
	for line in source_order:
		if(line == '\n'):
			continue;
		path = source_file_path + line.rstrip();
		print "        Appending source from: " + path;
		with open(path) as f:
			final_build_location_file.write(f.read());
		final_build_location_file.write("\n");
 	final_build_location_file.close();


	print "";
	print "Compiling " + final_build_location +  " into " + final_minimized_build_location;

	command = "java -jar " + compiler_jar_location + " " + final_build_location + " --compilation_level SIMPLE_OPTIMIZATIONS "+ " --language_in=ECMASCRIPT5_STRICT " +   " --js_output_file " + final_minimized_build_location;
	print "    " + command;
	
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


	print "Cleaning up";
	print ""
	print "Done";
	print "";
	sys.exit(0);


if __name__ == "__main__":
	main(sys.argv[1:]);
