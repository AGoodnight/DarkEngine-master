function debug(t){
	console.log(t.str)
}

var findIn(obj,inp){
  for(i in obj){
    if(obj[i] == inp){
      alert('found '+inp);
    }
  }
}
var smartSplit = function(inp){
	
	var ar = inp.split(' ');
	var a,
	    b,
	    c;
	
	if(ar.length>3){
    c = 'middle'
    a = ar[0];
    b = ar[last];
    return [a,c,b];
	}else{
	  a = ar[0];
	  b = ar[1];
	  return [a,b];
	}

}	// Splits an action queue
var subRatio = function(){
  var sum = this.add(arr);
		
		for(var i=0 ; i<arr.length ; i++){
			var g = arr[i]
			sum -= this[g]*perc
		};
		
		return sum;
};
var roll = function(sides){ 
	//////console.log("--rolling--")
	return Math.round(Math.random()*sides)
	
}; // returns a random number >/= base
var chance = function(sides,atr){
  var divider = atr/luck.roll(sides)+1
  if(divider < 1){
    divider = 1;
  }
	return atr+(atr/divider);
};
var objLength = function(ob){
	var count = 0;
	var i;
	for (i in ob) {
    if (ob.hasOwnProperty(i)) {
      	count++;
    }
  }
  return count;
};// Length of Object
