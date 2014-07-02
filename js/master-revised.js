function game(params){
	
	this.defaults={
		level:1,
		health:50,
		ambushChance:.5 // chance of being ambushed
	};
	
	this.cmnds={
	
		//single words
		inventory:{str:'i',func:function(){debug(this)}},
		help:{str:'help',func:function(){debug(this)}},
		
		//conjuctive words
		take:{str:'take',func:function(){debug(this)}},
		drop:{str:'drop',func:function(){debug(this)}},
		inspect:{str:'inspect',func:function(){debug(this)}},
		look:{str:'look',func:function(){debug(this)}}	
			
	};
	
	this.validate = function(input){
			var c = this.cmnds;
			var inCmnds = false;

			for( j in c){
				if(c[j].str === input){
					c[j].func();
					inCmnds = true;
				}
			};
	
			if(!inCmnds){
				if(!!this.usr.inventory){
					findIn(this.usr.inventory,input);
				}else{
					console.log("Error: You must create an inventory on the usr object");
				}
			};
			
			return this;
	
		}
	
	this.data={
		curArea:[null,null], //longitude and latitude
		inBattle:false,
		foeAttacking:false,
		gameOver:false
	};
	
	this.usr = {
		cmndLog:[], // log the last few commands executed by the user
		attack:function(){},
		stats:{}
	};
	
	this.foes = {
		cur:{}, // the current foe, an instantiated JSON object
		log:[], // log the last few foes
		clear:function(){
			this.log.push(this.cur);
			this.cur = undefined;
			}
	};	
	
	//this function sets our passed parameters into defaults
	this.set = function(params,defaults){
	
		for(key in params){
			var param = key.toString();
			
			for(k in defaults){
				
				var def = k.toString()
				if(def === param){
				
					defaults[def] = params[key];		
				}	
			}
		}
		
	}	
	this.set(params,this.defaults);
	
	return this
	
}

var w = new game({health:100});
w.validate('help');
