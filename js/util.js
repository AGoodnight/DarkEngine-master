function debug(t){
	console.log(t.str)
}

function validate(input){

	var c = thisgame.cmnds;
	var inCmnds = false;

	for( j in c){
		if(c[j].str === input){
			c[j].func();
			inCmnds = true;
		}
	}
	
	if(!inCmnds){
		if(!!thisgame.usr.inventory){
			findIn(thisgame.usr.inventory,input);
		}else{
			console.log("Error: You must create an inventory on the usr object");
		}
	}
	
}