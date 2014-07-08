{
  
  // Level 1
  // =============================
	giantOwl:{
	  name:'Giant Owl',
    mp:12,
	  hp:20,
	  iniative:3,
	  luck:4,
	  strength:2,
	  encType:[
	    ambush:true, // used in changeScene function
	    engage:true, // used in input validation
	    boss:false, // used in changeScene function
	    special:false], // used if the user has done something special or used a password
	  feats:[
	    {"dodge",atks.evade(this.luck)}],
	  attacks:[
	    {'claw',atks.strike(this.strength)}],
	  magic:[
	    {'hoot',atks.wind(this.mp)}],
	  infect:[
	    {'bite',atks.rend('hp',this.luck)}],
	  drops:[
	    {'feather',usr.gain(1,'mp')}]
	}
  worms:{
    name:'Giant Owl',
    mp:12,
	  hp:20,
	  iniative:3,
	  luck:4,
	  strength:2,
	  encType:[
	    ambush:true, // used in changeScene function
	    engage:true, // used in input validation
	    boss:false, // used in changeScene function
	    special:false], // used if the user has done something special or used a password
	  feats:[
	    {"dodge",atks.evade(this.luck)}],
	  attacks:[
	    {'claw',atks.strike(this.strength)}],
	  magic:[
	    {'hoot',atks.wind(this.mp)}],
	  infect:[
	    {'bite',atks.rend('hp',this.luck)}],
	  drops:[
	    {'feather',usr.gain(1,'mp')}]
	},
  ooze:{
    name:'Giant Owl',
    mp:12,
	  hp:20,
	  iniative:3,
	  luck:4,
	  strength:2,
	  encType:[
	    ambush:true, // used in changeScene function
	    engage:true, // used in input validation
	    boss:false, // used in changeScene function
	    special:false], // used if the user has done something special or used a password
	  feats:[
	    {"dodge",atks.evade(this.luck)}],
	  attacks:[
	    {'claw',atks.strike(this.strength)}],
	  magic:[
	    {'hoot',atks.wind(this.mp)}],
	  infect:[
	    {'bite',atks.rend('hp',this.luck)}],
	  drops:[
	    {'feather',usr.gain(1,'mp')}]
	},
  spider:{
    name:'Giant Owl',
    mp:12,
	  hp:20,
	  iniative:3,
	  luck:4,
	  strength:2,
	  encType:[
	    ambush:true, // used in changeScene function
	    engage:true, // used in input validation
	    boss:false, // used in changeScene function
	    special:false], // used if the user has done something special or used a password
	  feats:[
	    {"dodge",atks.evade(this.luck)}],
	  attacks:[
	    {'claw',atks.strike(this.strength)}],
	  magic:[
	    {'hoot',atks.wind(this.mp)}],
	  infect:[
	    {'bite',atks.rend('hp',this.luck)}],
	  drops:[
	    {'feather',usr.gain(1,'mp')}]
	},
  Troll:{
    name:'Giant Owl',
    mp:12,
	  hp:20,
	  iniative:3,
	  luck:4,
	  strength:2,
	  encType:[
	    ambush:true, // used in changeScene function
	    engage:true, // used in input validation
	    boss:false, // used in changeScene function
	    special:false], // used if the user has done something special or used a password
	  feats:[
	    {"dodge",atks.evade(this.luck)}],
	  attacks:[
	    {'claw',atks.strike(this.strength)}],
	  magic:[
	    {'hoot',atks.wind(this.mp)}],
	  infect:[
	    {'bite',atks.rend('hp',this.luck)}],
	  drops:[
	    {'feather',usr.gain(1,'mp')}]
	}
  
  // Level 2
  // ==============================
	

}
