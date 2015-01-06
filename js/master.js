// =========================================================================
// DARK ENGINE 0.2
// Created by Adam Goodnight ©2014
/*
	Disclaimer:
	This was one of my first attempts at creating a proper Javascript driven application
*/
// =========================================================================


 var _target,
	_damage,
	_affliction,
	_gameOver,
	_cur, // current scene
  _re;

var re=0;
var _level=1;
var v = 0
var difRatio = 10
var curRange = [_level-difRatio,_level+difRatio];

var lineSwitch = true;
var running=false;
var _isSame = false;

var actions = ['speak','look','inspect','use','take','go']
var switches = [false,false]; // sets the drive (game state)
var lastInps =[];

// =========================================================================
// EVENTS & SWITCHES
// =========================================================================

var setSwitches =function(val){
	for( var j = 0 ; j<switches.length ; j++){
		if(j == val){
			switches[j] = true
		}else{
			switches[j] = false
		};
	};
}
var flip = function(dir){

	var a;
	
	if(dir == undefined){
		if(!running){
			running = true
			a = _target;
   		 }else{
 			running = false;   
 			a = usr;
  	  	 }
  	}else{
  		switch(dir){
  			case 'up':
  				running = true;
  				a = _target;
  			break;
  			
  			case 'down':
  				running = false;
  				a = usr;
  			break;
  		}	
  	} 
    
    if(!_gameOver){
    	if(mob.foes.length > 0){
			turn(a);
		}
    }else{
		gameLog('Game Over');
    }

}
var init=function(){
	//console.log('--- init ---');
  _cur = 0 // home
  _gameOver = false;
  var func = function(){ $('#usrInput').keyup(key);};
  gameLog("What will yo do now?",'question')
  events.stand(func);
  
}
var events = {

  stand:function(func){
  	setSwitches(0);
  	mob.clear();
  	flip('down');
  
  	ambush( foes[luck.roll(foes.length-1)],2)
  	
  	if(func != undefined){
  		func();
  	}
  	
  	//updateStats();
  	
  },
  
  battle:function(func){
  	setSwitches(1);
  	mob.clear();
  	_target = thisFoe([ foes[0] ]);
    flip('up');
   
    if(func != undefined){
    	func();
    }
    
    //updateStats();
    
  }
  
}
var key=function(e){ // return key
	if(e.keyCode == 13){
		if(!_gameOver){
    		inputValidator( $('#usrInput').val() );
    		$('#usrInput').val('');
    	}
	};	
}

// =========================================================================
// LOGIC
// =========================================================================

var inputValidator = function(inp){
		
		var rep = false;
		if(inp === lastInps[0]){
		  re++
		  if(re>1){
		    rep = true;
		    lastInps = [];
		    re = 0;
		  }
		}
		lastInps.push(inp);
		
		if(isAttack(inp)){
			usr.attack(_target,inp);
			
		}else if(isAction(inp)){
			var r = smartSplit(inp);

      		switch(r[0]){

			case 'speak':
				gameLog('Developer note: NOT DONE YET');
			break;
				
			case 'look':
			
				var mes = find.byName(scenes[_cur].look,r[1]).mes
				
				if(mes != undefined){
					gameLog( find.byName(scenes[_cur].look,r[1]).mes )
				}else{
					gameLog( find.byName(scenes[_cur].look,'around').mes )
				}
				
			break;
			
			case 'inspect':
				if(find.byName(scenes[_cur].inspect,r[1]).mes !== undefined){
				 gameLog( find.byName(scenes[_cur].inspect,r[1]).mes);
				}else{
				  gameLog('inspect what?');
				}
			break;
				
			case 'use':
				gameLog('Developer note: NOT DONE YET');
			break;
				
			case 'take':
			
				if(find.byName(scenes[_cur].take,r[1]) != false){
					usr.inventory._add(r[1]);	
					gameLog('added '+r[1]+' to inventory');
				}else{
					gameLog('What are you taking?')
				}
			
			break;
			
			case 'go':
			  if(switches[0] == true){
				  if( find.byName(scenes[_cur].go,r[1]) != false ){
				    travel(r);
				  }else{
				  }
				}else{
				  if(rep){
				    gameLog(responses.stop[0]);
				  }else{
				    gameLog('You are in combat with '+render.titleCase(_target.name));
				  }
				}
				
			break;
			
			default:
			return false
			break;
		
			}
			
		}else if(isUnique(inp)){
			uni = find.unique(inp);
			
			if(uni){
				if(find.match(uni,inp)){
					uni.func();
				}else{
					gameLog("You can't do that");
				}
			}else{
				var g = smartSplit(inp);
				gameLog("You do not have a "+g[1]);
			}
			
		}else{ 
			
			switch(inp){
				
				case 'inventory':
				gameLog(usr.report(usr.inventory.list),'report');
				break;
					
				case 'attacks':
				gameLog(usr.report(inp),'report');
				break;
				
				case 'help':
				gameLog(helpMessage);
				break;
				
				case 'heal':
				usr.heal();
				break;
				
				case 'dance':
				gameLog('You are dancing like a flamingo');
				break;
				
				case 'joke':
				gameLog('no one laughed at your joke');
				break;
				
				case 'sing':
				gameLog('Honestly, I would listen to you');
				break;
				
				default:
				gameLog("I don't know what <span class='purple'>"+inp+"</span> is!");
				break;
				
			};
				
		}	
	
	return this;
	
};
var isAttack=function(id){
	for(var i = 0; i<usr.attacks.length ; i++){
		if(usr.attacks[i].name == id){return true};
	}
};
var isAction=function(inp){

	var h = smartSplit(inp)

	for(var j = 0 ; j<actions.length ; j++){
    	if(h[0] == actions[j]){
    		return true;
    	}
    }
};
var isUnique=function(inp){

	var r = smartSplit(inp)
	var g = 0;
		
	for(var j = 0 ; j<usr.inventory.list.length ; j++){
		b = find.byName(usr.inventory.list[j].func,r[0])
		
		if(b == false){
			g++
		}
	}
	
	scenes[_cur][r[0]]
	
	//console.log(g+' '+usr.inventory.list.length);
	if(g != usr.inventory.list.length){
		return true
	}else{
		return false
	}
}
var updateStats = function(obj){

	$('#hp').empty().append('Health: '+usr.phys.hp);	
	$('#mp').empty().append('Magic: '+usr.phys.mp);	
	$('#guts').empty().append('Guts: '+usr.phys.guts);
	
	$('#earth').empty().append('Earth: '+usr.elem.earth);	
	$('#wind').empty().append('Wind: '+usr.elem.wind);	
	$('#water').empty().append('Water: '+usr.elem.water);
	$('#fire').empty().append('Fire: '+usr.elem.fire);	
	$('#holy').empty().append('Holy: '+usr.elem.holy);	
	
	if(usr.phys.hp<0){
		$('#hp').css('color','red');
		$('#hp').empty();
		$('#hp').append('Health: Dead');
		gameLog('You Died');
		_gameOver = true;
	};
	
	if(_target !== undefined){
		if(_target.phys.hp<0){
			gameLog(_target.name+' defeated');
			gameLog("What will you do now?",'question')
			events.stand();
			mob.clear();
			flip();
			_target = undefined;
		}else{
			flip();
		}
	};
	
	// if there is a callback
	if(obj){
		obj();
	}
	
};

// =========================================================================
// UTILITIES
// =========================================================================

var find={
	byName:function(arr,val){
	
		if(arr!==undefined){
			var i = 0;
			var j = false
		
			while (i<arr.length){
			
				if(arr[i].name == val){ 
					return arr[i];
					j = true;
				}
				i++
			};
			
			if(!j){
		 	 return false
			}
		}else{
			return false;
		}
		
	},
	byLevel:function(arr,val){
	  var i = 0;
		while (i<arr.length){
			if(arr[i].level == val){ 
				return arr[i];
			}
			i++
		}
	},
	unique:function(inp){
	
		var inventory = usr.inventory;
		var r = smartSplit(inp);
		
		var g = inventory.list[find.index(inventory.list,r[1])]
		
		if(g){
			var b = find.byName(g.func,r[0])
				if(b){
					return b
				}else{
					return false
				}
		}else{
			return false
		} 

	},
	index:function(arr,val){
		var i = 0;
		var j = false
		while (i<arr.length){
			//console.log('---'+arr[i].name)
			if(arr[i].name == val){ 
				return i;
				//console.log('---'+i)
				j = true;
			}
			i++
		};
		
		if(!j){
		  return false
		}
	},
	inRange:function(r,arr){
      var g = Math.random()*luck.roll(r);
      var f = _level-(_level/g);
      return find.byLevel(f); 
  },
  	match:function(func,inp){
  		
  		var matched = false;
  		var arr = smartSplit(inp);
  		
  		var found = find.byName(usr.inventory.list,arr[1]);
  		
  		if(found){
  			matched = find.byName(found.func,arr[0]);
  		}
  		
  		if(matched){
  			return true;
  		}else{
  			return false;
  		}
  	}
};// Find Things in arrays and objects
var smartSplit = function(inp){
	
	var affector = inp.split(' ')[0];
	
	var affectee = inp.split(/ (.+)?/)[1];
	if (affectee === undefined){
		affectee = inp.split(' ')[1];
	}
	
	//console.log(affector+' , '+affectee);
	
	return [affector, affectee];

}	// Splits an action queue
var lens={
	obj:function(ob){
		var count = 0;
		var i;

		for (i in ob) {
    		if (ob.hasOwnProperty(i)) {
        		count++;
    		}
    	}
    	return count;
    }
};// Length
var compute={
	add:function(){
		var n = 0;
		
		////console.log('usr--elem--flat--')
		
		for(var i = 0 ; i<arguments.length; i++){
			n+=arguments[i]
		};
		
		return n;
	},
			
	rSubtract:function(arr,perc){
	
		var sum = this.add(arr);
		
		for(var i=0 ; i<arr.length ; i++){
			var g = arr[i]
			sum -= this[g]*perc
		};
		
		return sum;
	}
};// Math
var luck = {
    roll:function(sides){ 
	//////console.log("--rolling--")
	return Math.round(Math.random()*sides)
	
}, // returns a random number >/= base
    chance:function(sides,atr){
    	var divider = atr/luck.roll(sides)+1
    	if(divider < 1){
    		divider = 1;
    	}
		return atr+(atr/divider);
	}
}; // Gambling 

// =========================================================================
// DRIVETRAIN
// =========================================================================

var travel = function(r){
  var go = find.byName(scenes[_cur].go,r[1]);
  if(typeof go.to !== 'string' && typeof go.to !== Object){
    _isSame = false;
    _cur = go.to
    $('body').css('background',scenes[_cur].back);
    gameLog(scenes[_cur].name,'go');
    events.stand();
  }else if( typeof go.to === 'string'){
    gameLog(go.to)
  }
}
var setTarget = function(val){
	_target = val; 
};
var turn =function(who){

	//console.log('-- who --');
	//console.log(who);
	
	if(who == usr){
		// Apply all effects then return to chain
		var  d = who.drainPool;
		
		if(d.length>0){
			//CLEAN THIS THE FUCK UP AND MAKE SMART
			// If there is drain
			_damage = d[0][2]
			
			usr[d[0][1]] -=d[0][2]
		
			d[0][0].gain(d[0][1],d[0][2])
			
			
			gameLog(who.name+" takes <span class='red'>"+_damage+" damage</span> from <span class='orange'>"+render.titleCase(d[0][3])+"<span>");
			
			gameLog(render.titleCase(d[0][0].name)+" gains <span class='green'>"+d[0][2]+" "+d[0][1]+"</span> from <span class='orange'>"+render.titleCase(d[0][3])+"<span>");
			
			d.splice(0,1); // Remove drain from pool
			
		}
		
	}else{
		var r = find.byName(mob.foes,who);
		//console.log(r+' - '+who.name);
		var rolled = luck.roll(mob.foes[0].attacks.length-1)
		var rand = mob.foes[0].attacks[rolled];
		console.log('random attack: '+rand);
		console.log('rolled number: '+rolled);
		mob.foes[0].attack(usr,rand.name);
	}

};
var thisFoe=function(arr){
	
	for(var i=0; i<arr.length ; i++){

		var obj = new arr[i]();
		var k;
		obj.base=function(){
			compute.add(this.phys.guts,this.phys.earth);
		};
		obj.heal=function(target){
			var h = this.phys.hp/(this.elem.holy*luck.roll(6))
			return h;
		};
		obj.attack=function(target,kind){
			//_target = target		
			var kind = kind
			//////console.log(this);
		
			var j = obj.attacks
		//console.log(obj.attacks);
			if(kind == null || undefined){
				kind = j[luck.roll(j.length-1)-1];/*randomly choose an attack, roll()*/
			
			}else{
			  //console.log( 'p'+find.byName(j,kind), 'p: '+j,kind);
				k = find.byName(j,kind);
			};	

			//--------------------
			gameLog(render.titleCase(this.name)+" attacks with <span class='yellow'>"+render.titleCase(kind)+"</span>");
			//--------------------
			  //console.log(k);
			damage(target,k.func(this));

		};
		obj.afflict=function(target,kind){ 
					
			type = find.byName(this.affs,kind);
			type.func(target,this);
			//--------------------
			gameLog(render.titleCase(this.name)+" inflicts <span class='orange'>"+render.titleCase(kind)+"</span>");
			//--------------------	
				
		};
		obj.drainPool=[];	
		obj.gain=function(what,val){
			this.phys[what] += val;
		}	
		
		mob.foes.push(obj);
		console.log(' created '+obj.name);
		//console.log(mob.foes);
		return find.byName(mob.foes,obj.name);
			
	}
	
	// txt01 --------------------
	gameLog(usr.name+" encounters a <b>"+render.attr('name',(mob.foes))+"</b>!");
	//--------------------
	
};
var damage=function(who,value){
	who.phys.hp -= value;
	gameLog(who.name+" takes <span class='red'>"+value+" damage</span>!");
	_damage = value;
	//who.mp -=value	
	//console.log('- end damage -'+who.phys.hp+' - ' +who.name);
	updateStats();
};
var ambush = function(foeName,odds){
     
      var x = Math.round(Math.random()*odds)
      var y = luck.roll(odds);
      console.log(foeName.name,x,y);
      
      if(!_isSame){
      _isSame = true;
      if(x == y){
         mob.clear();
        _target = thisFoe([ foeName ]);
        setSwitches(1);
        gameLog(' You have been ambushed by a '+render.titleCase(_target.name));
        flip('up');
      };
      };
    };    

// =========================================================================
// BIG GROUPS
// =========================================================================

var scenes=[

  // 0
  {
  name:'>> Your Farm',
  back:"#92D173",
	take:[
	
		{name:'manure',func:[		
			{name:'smell', func:function(){
				gameLog('it smells like a huge bull turd'); }
			},
			{name:'throw', func:function(){
					if(switches[1]){ // if battle event
						gameLog('you fling the manure at '+_target);
						damage(_target,1); 
					}
				}
			}
			
		],take:true},
		{name:'rope',func:[]}
	],	
	look:[ 
	  {name:'around',
	  mes: "You are standing in a field of tall grass darted with wild flowers, behind you is a farmhouse, west of you is a small pier, north of you is the forest."
	  },
	  {name:'west',
	  mes:'You see a small pier, a small boat is bound to it by a rope'
	  },
	  {name:'north',
	  mes:'you see a path into a forest and a sign hanging from two posts by a chain'
	  },
	  {name:'east',
	  mes:'you see a freshly planted field, fresh manure covers it.'
	  },
	  {name:'south',
	  mes:'You see a farmhouse, a woman and a yong girl wave at you and go inside, it is lunch time after all'
	  },
	  {name:'up',
	  mes:'it is a sunny day, clouds dart the sky'
	  }
	],	
	go:[
	  {name:'north',
	  to:1
	  },
	  {name:'east',
	  to:"Beyond the field is impenetrable forest, you can't go that way."
	  },
	  {name:'west',
	  to:'You do not know how to swim, you cannot go that way.'
	  },
	  {name:'south',
	  to:'Your not going back home, not after putting all this gear on and what will the rumors be?'
	  },
	],	
	inspect:[
	  {
	  	name:"sign", 
	 	mes:"The sign is very old and reads: 'Forest, enter at own risk.'"
	  }
  	]  	 
  }, // Your Farm     *   0000:nsew
  {
  name:'>> Forest Trail',
  back:'#6E6736',
	take:[
	
		{name:'acorn',func:[		
			{name:'eat', func:function(){
				gameLog("it's very woody, you decide no to eat it"); }
			},
			{name:'enchant', func:function(){
				gameLog('you say some words, but they are the wrong words.'+_target); }
			}			
		],take:true}
	],	
	look:[ 
	  {name:'around',
	  mes: "You are in a dark forest, eerily quiet, the trees are tightly packed together with very thick brush on either side"
	  },
	  {name:'west',
	  mes:'There is nothing but trees and brush'
	  },
	  {name:'north',
	  mes:'The forest continues, stretching further north, getting lighter though.'
	  },
	  {name:'east',
	  mes:'There is a bridge many paces away, It is very old, stone and covered in moss. There are items along this path.'
	  },
	  {name:'south',
	  mes:'You alot of winding forest trail, you have come very far.'
	  },
	  {name:'up',
	  mes:'Leaves and an acorn falls on your eye'
	  }
	],	
	go:[
	  {name:'east', to:2 },
	  {name:'south',to:0 },
	  {name:'west', to:'It is laced with thorns and poison oak. You do not go that way.'},
	  {name:'north',to:3 }
	],	
	inspect:[
	  {
	  	name:"items", 
	 	mes:"'it looks to be small bones dart the path'"
	  },
	  { name:"bones",
	  mes:"it is clear something ate whatever these bones were part of."
	  }
  	]  	 
  }, // Forest Trail  |   1000
  {
  name:'>> Bridge',
  back:"#789C98",
	take:[],	
	look:[ 
	  {name:'around',
	  mes:'The bridge is covered in moss and overgrowth, a river gently passes beneath the bridge.'
	  },
	  {name:'west',
	  mes:'You see the forest path from where you came'
	  },
	  {name:'north',
	  mes:'You see the forest and the stream'
	  },
	  {name:'east',
	  mes:'You see a door set within a rock face on the other side of the bridge'
	  },
	  {name:'south',
	  mes:'Trees and the stream'
	  },
	  {name:'up',
	  mes:'the forest is still very dense, however som sunlight can be seen here.'
	  }
	],	
	go:[
	  {name:'west',
	  to:1
	  },
	  {name:'east',
	  to:'a voice proclaims "Do not cross my bridge, lest I will eat you", you obey, for now'
	  },
	  {name:'north',
	  to:'The bridge is rather tall, falling would be a bad idea.'
	  },
	  {name:'south',
	  to:'You would fall into the water, you do not go this way'
	  }
	],	
	inspect:[]  	 
  }, // Bridge        -   1010
  {
  name:'>> Meadow',
  back:"#B3F2C4",
	take:[
		{name:'flower',
		func:[
			{name:'smell',
				func:function(){
					gameLog('You smell the flower, it smells like spring')
				}
			}
		]
		}
	],	
	look:[ 
	  {name:'around',
	  mes: 'It is a nice pleasant meadow, there are many flowers and in the distance you can see a windmill.'
	  },
	  {name:'west',
	  mes:'You see more meadow, and beyond it an impenetrable barrier of dark forest'
	  },
	  {name:'north',
	  mes:'You see a windmill'
	  },
	  {name:'east',
	  mes:'You see more meadow, beyond which is the ocean.'
	  },
	  {name:'south',
	  mes:'You see the forest path form which you came.'
	  },
	  {name:'up',
	  mes:'it is very sunny here and seagulls are heading to the ocean'
	  }
	],	
	go:[
	  {name:'north',
	  to:4
	  },
	  {name:'south',
	  to:1
	  },
	  {name:'west',
	  to:'The forest is too dense that way, you do not go that way'
	  },
	  {name:'east',
	  to:'You do not have a boat and you cannot swim in your gear'
	  }
	],	
	inspect:[]  	 
  }, // Meadow        |   2000
  {
  name:'>> Old Windmill',
  back:"#9E9C93",
	take:[],	
	look:[ 
	  {name:'around',
	  mes:'You have reached the end of this demo, thank you for exploring the advent of videogames!'
	  },
	  {name:'west',
	  mes:'You have reached the end of this demo, thank you for exploring the advent of videogames!'
	  },
	  {name:'north',
	  mes:'You have reached the end of this demo, thank you for exploring the advent of videogames!'
	  },
	  {name:'east',
	  mes:'You have reached the end of this demo, thank you for exploring the advent of videogames!'
	  },
	  {name:'south',
	  mes:'You have reached the end of this demo, thank you for exploring the advent of videogames!'
	  },
	  {name:'up',
	  mes:'You have reached the end of this demo, thank you for exploring the advent of videogames!'
	  }
	],	
	go:[
	  {name:'south',
	  to:3
	  },
	  {name:'north',
	  to:'You have reached the end of this demo, thank you for exploring the advent of videogames!'
	  },
	  {name:'west',
	  to:'You have reached the end of this demo, thank you for exploring the advent of videogames!'
	  },
	  {name:'east',
	  to:'You have reached the end of this demo, thank you for exploring the advent of videogames!'
	  }
	],	
	inspect:[]  	 
  }, // Windmill      |   3000

] // massive
var mob = {
	foes:[], // a place to put current foes, these are foes on the screen, otherwise foes are stored as json data.
	clear:function(){_target = undefined, this.foes = []; console.log('foes deleted');}
}; // intended to expand
var foes=[
    // Wooded areas ['owl beast','worms','ooze','spider','Troll'],
		function(){
			this.name='troll';		
			this.phys={
				hp:15,
				mp:2,
				guts : 6, //physical strength -- for strikes and defensive moves -- being poisoned would affect this number
				weak:{
					earth:0,
					wind:1,
					water:1,
					fire:2,
					holy:1
				}
			};
			this.elem={
				earth: 2,
				wind: 1,
				water: 1,
				fire: 4
			};
			this.attacks=[
				{name:'slash', 
				func:function(t){
					//p = t.elem.drain(['fire','water'],.5);
					p = luck.chance(6,t.phys.guts);
						return parseInt(p/2);
				}},
				{name:'slam', 
				func:function(t){
					p = luck.chance(6,t.phys.guts);
					p += compute.add(
						t.elem.earth,
						t.elem.fire
					);
					p += t.elem.fire;				
					return parseInt(p/2);
				}}
			
			];
			this.affs=[
				{name:'drain',
				func:function(target,f){
					freq=luck.roll(4);
					what = 'hp';
					for(var i = 0 ; i<freq ; i++){
						val = Math.round( (f.phys.mp*luck.roll(3))/freq );
						//////console.log(f.mp*roll(3)+" "+freq);
						target.drainPool.push( [f,what,val,'drain'] );
					}
				}}
			];
			return 'hello';
		},// Troll
		function(){
			this.name='owlbeast';		
			this.phys={
				hp:15,
				mp:2,
				guts : 6, //physical strength -- for strikes and defensive moves -- being poisoned would affect this number
				weak:{
					earth:0,
					wind:1,
					water:1,
					fire:2,
					holy:1
				}
			};
			this.elem={
				earth: 2,
				wind: 1,
				water: 1,
				fire: 4
			};
			this.attacks=[
				{name:'dive', 
				func:function(t){
					//p = t.elem.drain(['fire','water'],.5);
					p = luck.chance(6,t.phys.guts);
						return parseInt(p/2);
				}},
				{name:'hoot', 
				func:function(t){1
					p = luck.chance(6,t.phys.guts);
					p += compute.add(
						t.elem.earth,
						t.elem.fire
					);
					p += t.elem.fire;				
					return parseInt(p/2);
				}}
			
			];
			this.affs=[
				{name:'drain',
				func:function(target,f){
					freq=luck.roll(4);
					what = 'hp';
					for(var i = 0 ; i<freq ; i++){
						val = Math.round( (f.phys.mp*luck.roll(3))/freq );
						//////console.log(f.mp*roll(3)+" "+freq);
						target.drainPool.push( [f,what,val,'drain'] );
					}
				}}
			];
			return 'hello';
		}// OwlBeast
]; // massive
var usr={

	name:'Knight',
	phys:{
			//stamina : 100,
			maxHP:50,
			maxMP:10,
			hp : 50, // health -- are you dead or not dead? -- being poisoned would affect this number
			mp : 10, // magic -- used for casting spells or enchantments -- confusion affects this number
			guts : 6, //physical strength -- for strikes and defensive moves -- being poisoned would affect this number
			weak:{
				earth:0,
				wind:1,
				water:1,
				fire:2,
				holy:1
			}
	},	
	elem:{
		
			earth:1, wind:2, water:3, fire:4, holy:1,
			
	},
	base:function(){
			compute.add(this.phys.guts,this.elem.earth)/_level;
	},	
	heal:function(val){
			this.phys.hp+=(this.phys.maxHP*val/100)
			if(this.phys.hp>this.phys.maxHP){
			  this.phys.hp = this.phys.maxHP;
			}
			updateStats();
	},
	inventory:{
	
	 		list:[
	 			{name:'bread', func:[
	 				{name:'eat', func:function(){ gameLog('you eat the bread'); usr.heal(60) }}
	 				
	 			]},
	 			{name:'note',func:[
	 				{name:'read', func:function(){ gameLog('you read the note') }}
	 				
	 			]},
	 			{name:'wild flower',func:[ 		
					{name:'smell', func:function(){ gameLog('you smell the wild flower') }}
				
				]}
	 		],
				
			_use:function(str){
				var f = find.byName(this.list,str).func();
				return f
			},
			
			_add:function(str){
				var f = this.list.push( find.byName(scenes[_cur].take, str) );
				return f
			}
			
	},
	report:function(what){
		var message = '';
			if ( typeof what === 'string' ){
				for(var i = 0; i<this[what].length ; i++){
					message += this[what][i].name+', '
				
				}
			}else{
				for(var i = 0; i<what.length ; i++){
					message += what[i].name+', '
				
				}
			}
			return message;
	},
	attacks:[
			{name:'strike', 
			func:function(t){
				//p = t.elem.drain(['fire','water'],.5);
				p = luck.chance(6,t.phys.guts);
				return parseInt(p);
			}},
			{name:'fire hammer', 
			func:function(t){
				p = luck.chance(6,t.phys.guts);
				p += compute.add(
					t.elem.fire,
					t.elem.earth
				);
				p += t.elem.fire;				
				return parseInt(p);
			}}
			
	],		
	attack:function(target, kind){
		
				kind = find.byName(usr.attacks,kind);
				gameLog(usr.name+" attacks with <span class='yellow'>"+render.titleCase(kind.name)+"</span>");
				_damage = kind.func(usr);
				if(target === undefined){
					gameLog('The air felt nothing');
				}else{
					damage(target,_damage);
				}
			
	},
	afflictions:[],
	drainPool:[],			
	gain:function(what,val){
			this[what] += val
	}
		
};	 // large

// =========================================================================
// SCREEN
// =========================================================================

var render={

	// Text Renderers
	titleCase:function(val){
		//console.log('-- Title Case --')
		str = val.replace(/([A-Z])/g, ' $1')
		str = str.replace(/^./, function(str){ return str.toUpperCase(); })
		return str
	},
	camelCase:function(val){
		////console.log('-- camelCase --')
		return val;
	},
	lowerCase:function(val){
		////console.log('-- lowercase --')
		str = val.replace(/([A-Z])/g, ' $1')
		str = str.replace(/^./, function(str){ return str.toLowerCase(); })
		return str
	},
	attr:function(atr,obj){
		var p = lens.obj(obj);
		var group = '';
		for(var j = 0; j<p ; j++){
			group += obj[j].name
		}
		return group;
	},
	
	img:{
		//append an image to a div and apply a class
	}
	
	//Visual Renderers
	// --- Nothing yet ---
}
var scrollDown = function(){
	// $('#output').animate({scrollTop: $("#report").innerHeight()},300);
};
var responses={
  
  stop:['cut it out', 'your being ludicrous', 'dude...']

}
var gameLog = function(val,go){
	////console.log(val);
	if(go === undefined){
		if(switches[0]){
			if(lineSwitch){
		  
				$('#report').prepend("<p class='darker'>"+val+"</p>");
				lineSwitch = false;
			}else{
				$('#report').prepend("<p class='dark'>"+val+"</p>");
				lineSwitch = true;
			}
			
		}else{
		
			if(running){
				$('#report').prepend("<p class='usr'>"+val+"</p>");
			}else{
				$('#report').prepend("<p class='foe'>"+val+"</p>");
			}
			
		}
		
	}else{
		if(go === 'go'){
			$('#report').prepend("<p class='sceneTitle'>"+val+"</p>");
		}
		if(go === 'question'){
			$('#report').prepend("<p class='question'>"+val+"</p>");
		}
		if(go === 'report'){
			$('#report').prepend("<p class='report'>"+val+"</p>");
		}
	}
	
	scrollDown();
};
var helpMessage="use lower case words only<br/><br/>To go in a direction, type 'go' and then type a cardinal direction.<br/>To inspect something in the field type 'inspect' followed by the item you wish to inspect<br/>To attack, type the name of the attack alone i.e. 'strike'.<br/> To use an item type the name of the item after 'use'.<br/> To look at something type in the direction or object following 'look'. To look at where you are standing simply type 'look' <br/></br>Other useful commands<br/>'heal' - heal yourself<br/>'attacks' - view your attacks<br/>'inventory' - view your inventory<br/>'use' - use an item (use item) <br/> 'look' - look at something (look around)<br/> 'eat' - eat food (eat apple)<br/> 'drink' - drink something (drink potion)<br/>'take' - take something from the area (take pencil)<br/>'speak' - speak to someone/something (talk to tree)"



init();
