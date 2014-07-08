function game(params){
  
  this.init = function(){
    //params
    for(var i = 0 ; i<params.inventory.length ; i++){
      usr.inventory.push(items[ params.inventory[i] ]);
    }
  }
  // constructors
  function scene(objId){
    //json call to create obj -- areas.json
    var obj = region[0].scenes[objId]
    return obj;
  };
  function foe(objId){
    //json call to create obj -- foes.json
    var obj = foes[objId];å   
    obj.effectPool=[];
    obj.attack = function(){};
    obj.gain = function(){};
    return obj;
  };
  function puzzle(objId){
    // json call to create obj -- puzzles.json
    var obj = {};
    obj.started = false;
    obj.unlocked = false;
    obj.complete = false;
    return obj;
  };
  function item(objId){
    // load json object from -- items.json
    var obj = items[objId];
    obj.taken = false;
    obj.dropped = false;
    return obj;
  };
	
	var g = this;
	
	// data and commands
	this.defaults={
		level:1, // chance of being ambushed
		assign:function(params,defaults){
	
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
	};
	this.cmnds={
	
		//single words
		inventory:{str:'i',func:function(){debug(this)}},
		help:{str:'help',func:function(){debug(this)}},
		
		//conjuctive words
		take:{str:'take',func:function(){debug(this)}},
		drop:{str:'drop',func:function(){debug(this)}},
		inspect:{str:'inspect',func:function(){debug(this)}},
		look:{str:'look',func:[
		  [find:function(str,conj){
            // search inventory
            // search take
            // search go
            // search inspect
       }
		  ]
		]}	
			
	};
	this.events = {
	  travel:function(where){
		  if(!g.data.battle){
		    this.scene = new scene(where);
		  }else{
		    gameLog("You are in battle");
		  }
		}
		battle:function(who){
		  if(!g.data.battle){
		    g.data.battle = true
		  }
		}
	};	
	this.data={
		scene:{ /* an instance of scene */ }, //longitude and latitude
		battle:false,
		gameOver:false
		watch:{
		  end:function(){},
		  start:function(){},
		  puzzle:function(){}
		}
	};
	this.usr = {
	  name:'you',
	  inventory:[],
		cmndLog:[], // log the last few commands executed by the user
		effectPool:[],
		attack:function(){},
		gain:function(quant,what){},
		stats:{
		  
		}
	};
	this.foes = {
		cur:{ /* an instance of foe */},
		log:[], // log the last few foes
		ambush:function(){
		  
		    var i = this.cur.iniative;
		    var l = this.cur.luck;
		    var w = this.cur.ambush;
		    
		    if(this.curArea.ambush>0){
		      if(w<chance([i,l])){
		        turn(1);
		        cur.attack();  
		      }else{
		        turn(0);
		      }
		    }
		  
		},
		clear:function(){
			this.log.push(this.cur);
			this.cur = undefined;
		}
	};	
	
	// functions
	this.validate = function(input){
			
			
			/*
			input patterns
			a = 0
			a,b = 1 
			b,a =  1
			a,undefined,b = 2
			b,undefined,a =  2
			*/
			
			var c = this.cmnds;
			var inCmnds = false;

  
      var inp = getLength.input(inp);


      for(var q = 0 ;q<inp.length;q++){
        switch(q){
          // a = 0
          case 1:
            for(j in c){
				      if(c[j].str === input){
					      c[j].func();
					      inCmnds = true;
				      }
				      };
				      break;
				  // a,b = 1, b,a = 1
				  case 2:
				      /*isAttack = w.target]
				      isRead = inventory['str']
				      isKey = inventory['str']
				      isDrop = inventory['str']
				      isInspect inventory['str'], w.scene['str']
				      isTake = w.scene.take['str']
				      isLook = w.scene['str']*/
				      break;
				  case 3:
				      /*isLook = ['at','at the','at a','towards','around'];
				      isTake = ['a','the'];
				      isDrop = ['a','the'];
				      isInspect = ['the','a','from'];
				      isAttack = ['with', 'using'];
				      isKey = ['use', 'use on', 'use with', 'unlock']
				      isRead = ['written by', 'from', 'by']*/
				      break;
			  }
      };			
			
			inCmnds = function (input, t){
			  if(!!this.usr.inventory){
				  var inInv = findIn(t.usr.inventory,input);
					
					if(inInv){
					  inInv.func();}
				  }else{
					  console.log("Error: You must create an inventory on the usr object");}
				}
				
				$('#usrInput').val('');
			
			return this;
	
			};	
	this.gameLoop:function(){
	  start:function(){
	    var key=function(e){ // return key
	      if(e.keyCode == 13){
	        this.turn();
	      }
	    }
	    if(!this.data.gameOver){
	      $('#usrInput').keyup(key)
	    }
	  };
	  turn:function(){
	    this.validate( $('#usrInput').val() );
	      game.data.watch.end();
	    foes.cur.attack();
        game.data.watch.start();
	  };
	};
  
  // exec when creating new instance
	defaults.assign(params,this.defaults);

	// return new instance
	return this
	
}

var w = new game({
  inventory:['bread','apple','note']
});

w.gameLoop.start();
w.validate('help');
