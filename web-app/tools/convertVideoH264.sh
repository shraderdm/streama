#!/bin/sh

#########################################
#  Output file for HTML5 video          #
#  Requirements:                        #
#    - handbrakecli                     #
#    - ffmpeg2theora                    #
#                                       #
#  usage:                               #
#   ./html5HandBrakeSingle.sh  file     #
#                                       #
#########################################

file=`basename $1`
originalExtension=${file##*.}
filename=${file%.*}
BASEDIR=`dirname $0`
echo $BASEDIR
filepath=`dirname $1`
convertedFileName=$filename-convert.mp4
newFileName=$filename-incompatible.$originalExtension


ffmpeg -i $filepath/$file -c:v libx264 -preset slow -c:a libvo_aacenc $filepath/$convertedFileName

# $BASEDIR/HandBrakeCLI -i $filepath/$file -o $filepath/$convertedFileName --encoder x264 --vb 900 --ab 128 --optimize

if [ $2 ]
then
  rm $filepath/$file
else
  mv $filepath/$file $filepath/$newFileName
fi

mv $filepath/$convertedFileName $filepath/$filename.mp4
