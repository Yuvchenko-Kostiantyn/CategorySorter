# General info
Simple script for dividing large MS Excel sheets into multiple different sheets by a specific common value

To work properly requires .env file with following variables:
1)CATEGORY - a specific value which will be used as a key for grouping

Also requires two folders, input and output.

# Executing the script
Execute following command in a folder with the script itself 

_node index "file name.ext"_ 

where .ext is file extention while target file is located in input folder. 

Sorted output files  will be saved into output folder