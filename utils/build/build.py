#!/usr/bin/python

import sys;
import os;
import subprocess;




source_file_path = "../../src/";
final_build_location = "../../build/flory.js"
compiler_jar_location = "compiler/compiler.jar";


def cmd(args):
	proc = subprocess.Popen(args,stdout=subprocess.PIPE, stderr = subprocess.PIPE, shell=True);
	out,err = proc.communicate();
	return [out,err];






def main():
	print "";
	print "Starting Build";
	print "Loading source file order from source_order.cfg";

	source_order = open("source_order.cfg","r");

	tmp_combined_source_file_name = "tmp.js"
	tmp_combined_source_file = open(tmp_combined_source_file_name,"w");  

	for line in source_order:
		path = source_file_path + line.rstrip();
		print "    Appending source from: " + path;
		with open(path) as f:
			tmp_combined_source_file.write(f.read());
		tmp_combined_source_file.write("\n\n");
 	tmp_combined_source_file.close();


	print "";
	print "Compiling sources to " + final_build_location;

	command = "java -jar " + compiler_jar_location + " " + tmp_combined_source_file_name + " --js_output_file " + final_build_location;
	print "    " + command;
	
	java_output = cmd(command);
	
	if(java_output[1] != ""):
		print ""
		print "Error :"
		print ""
		print  java_output[1];
		sys.exit();

	if(java_output[0] != ""):
		print "    " + java_output[0];


	print "Cleaning up";
	os.system("rm " + tmp_combined_source_file_name);
	print ""
	print "Done";
	print "";




if __name__ == "__main__":
	main();
