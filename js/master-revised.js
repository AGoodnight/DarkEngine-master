function game(params){
	
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
	
	this.defaults={
		level:1,
		health:50,
		ambushChance:.5 // chance of being ambushed
	};
	
	this.data={
		inBattle:false,
		foeAttacking:false,
		gameOver:false
	};
	
	this.usr = {
		cmndLog:[] // log the last 50 commands executed by the user
	};
	
	this.mob = {
		cur:{}, // the current foe
		log:[], // log the last 20 foes
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

var thisgame = new game({health:100});

var c = thisgame.cmnds;

var input = 'help'

for( j in c){
	if(c[j].str === input){
		c[j].func();
	}
}
