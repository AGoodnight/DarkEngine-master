function game(params){

  // constructors
  function scene(objId){
    //json call to create obj -- areas.json
    return this;
  };
  function foe(objId){
    //json call to create obj -- foes.json
    var effectPool=[];
    var attack = function(){};
    var gain = function(){};
    
    return this;
  };
  function puzzle(objId){
    // json call to create obj -- puzzles.json
    return this;
  };
  function item(objId){
    // load json object from -- items.json
    return this;
  };
	
	// data
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
	this.data={
		curArea:{ /* an instance of scene */ }, //longitude and latitude
		inBattle:false,
		foeAttacking:false,
		gameOver:false
		watch:{
		  end:function(){},
		  start:function(){},
		  puzzle:function(){}
		}
		swtichArea(obj){
		  if(!inBattle){
		    curArea = new scene(data.nxtArea);
		  }
		}
	};
	this.usr = {
	  name:'you',
	  inventory:[
	    it.bread1, // an instance of an item object
	    it.bread1,
	    it.pots.hp1,
	    it.note[0]
	  ],
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
				      break;
				  case 3:
				      isLook = ['at','towards','around'];
				      isTake = ['a'];
				      isDrop = ['a'];
				      isInspect = ['the','a'];
				      isAttack = ['with']
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

var w = new game({health:100});
w.gameLoop.start();
w.validate('help');
