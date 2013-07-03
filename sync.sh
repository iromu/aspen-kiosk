brew install httrack

httrack http://ubu.com/aspen -O . -w -s0 -n


cd ubu.com/aspen/aspen3/images/flipbookImages




for (( i=0; i <= 9; i++ ))
do
	if [ ! -f buzzards0$i.gif ]
	then
	    wget http://ubu.com/aspen/aspen3/images/flipbookImages/buzzards0$i.gif
	fi

done


for (( i=10; i <= 32; i++ ))
do
	if [ ! -f buzzards$i.gif ]
	then
	    wget http://ubu.com/aspen/aspen3/images/flipbookImages/buzzards$i.gif
	fi

done




for (( i=0; i <= 6; i++ ))
do
	if [ ! -f kiss0$i.gif ]
	then
	   wget http://ubu.com/aspen/aspen3/images/flipbookImages/kiss0$i.gif
	fi

done


cd ../../../../../

cd ubu.com/aspen/aspen7/images/diary

for (( i=1; i <= 66; i++ ))
do
	if [ ! -f diary$i.gif ]
	then
	    wget http://ubu.com/aspen/aspen7/images/diary/diary$i.gif
	fi

done