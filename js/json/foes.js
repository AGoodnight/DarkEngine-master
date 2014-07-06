{
atks:{evade:function(){},strike:function(){},wind:function(){},rend:function(){}},
list:[

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
	
	
	,'worms','ooze','spider','Troll']
	['Raggamoffyn'],
	['knocker','chocking hand','poisoned canary','cloaker','shrooms','phasm in armor','chain golem','Shadowmist'],
	['cloud beasts','dun stalker','cliff stalker','scrab','Lawman & Wurm'],
	['golem','effigy','forman','molten giant','Dante'],
	['kraken','Guardian'],
	['Tickles & Smiles'],
	['plauge ooze','Wraith'],
	['dead ancestor','Preacherman'],
	['ice wrymlings','Dark Knight'],
	[
		'Hellfire Wrym':{boss:true,health:10000,forms:3,weapon:['bullet','slash','drain','blast','confusion','fear','hypnotism'], size:3.2}	
	]
}