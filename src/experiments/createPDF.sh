#latex --ouput-directory texOutput tex/GasEffusionRough.tex
file="thisfile.txt"
echo "filename: ${file%.*}"
echo "extension: ${file##*.}"