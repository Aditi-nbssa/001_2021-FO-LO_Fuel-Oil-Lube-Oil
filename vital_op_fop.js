(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"vital_op_fop_atlas_1", frames: [[0,1014,1249,924],[0,0,1247,1012]]},
		{name:"vital_op_fop_atlas_2", frames: [[0,0,1257,710],[0,1466,1255,495],[0,712,1077,752]]},
		{name:"vital_op_fop_atlas_3", frames: [[0,984,1159,388],[0,1710,1255,280],[0,1374,1233,334],[0,0,1241,495],[1243,0,645,682],[0,497,1098,485]]},
		{name:"vital_op_fop_atlas_4", frames: [[0,652,1231,280],[0,934,1231,280],[0,1216,1223,280],[0,1498,1212,280],[0,370,1236,280],[0,1850,1294,181],[0,0,943,368],[1214,1498,698,350],[1238,0,528,424],[1233,652,558,426]]},
		{name:"vital_op_fop_atlas_5", frames: [[0,1885,1172,119],[0,1299,1143,167],[0,774,1169,173],[0,1468,1002,173],[0,599,1180,173],[0,949,1164,173],[0,1124,1156,173],[0,1643,1225,119],[0,1764,1214,119],[0,0,1257,173],[1216,1822,739,186],[1158,1246,472,312],[0,175,512,400],[1171,844,434,400],[1259,0,458,464],[514,175,484,422],[1227,1560,534,260],[1182,466,500,376]]},
		{name:"vital_op_fop_atlas_6", frames: [[1112,0,710,163],[331,1047,921,99],[1762,1424,284,99],[336,704,796,119],[1244,321,670,142],[452,0,658,186],[1122,1925,387,87],[452,188,843,119],[1297,165,627,154],[336,926,776,119],[1136,1747,460,87],[616,1800,518,87],[1026,1658,478,87],[616,1889,504,87],[1598,1737,362,87],[408,1353,802,99],[1738,976,265,163],[1290,667,549,99],[1598,1826,313,87],[1714,1297,256,125],[408,309,834,119],[1485,1509,275,125],[1290,566,551,99],[1088,430,136,204],[1254,1138,219,125],[1913,1826,133,204],[408,1269,1082,82],[336,825,952,99],[700,1454,349,186],[1506,1636,320,99],[1051,1557,432,99],[0,1899,472,99],[331,1148,761,119],[1478,1353,234,154],[1708,1141,238,154],[1586,1915,299,87],[1136,1836,448,87],[1290,465,617,99],[1548,768,188,270],[1522,1040,184,214],[0,1583,332,314],[1212,1353,264,202],[1254,970,266,166],[1290,768,256,200],[1738,768,230,206],[1828,1525,180,148],[0,1319,406,262],[0,304,406,324],[408,430,360,272],[0,973,329,344],[0,630,334,341],[770,430,316,236],[334,1680,280,214],[408,1454,290,224],[0,0,450,302],[1824,0,190,148],[700,1642,324,156]]},
		{name:"vital_op_fop_atlas_7", frames: [[241,322,146,142],[0,411,138,142],[618,423,138,142],[0,0,255,99],[758,512,181,99],[833,0,174,142],[0,659,96,119],[98,662,96,119],[550,668,96,119],[648,668,96,119],[140,466,371,50],[0,555,118,102],[435,634,113,102],[301,768,103,72],[746,757,84,102],[435,738,87,102],[868,714,90,102],[301,693,132,73],[443,518,148,114],[267,619,166,72],[546,0,285,87],[936,233,85,80],[681,144,275,87],[540,233,177,125],[746,668,120,87],[0,233,271,87],[0,101,187,122],[0,322,239,87],[273,233,265,87],[758,423,210,87],[719,334,237,87],[196,693,103,99],[871,613,139,99],[140,518,125,142],[719,233,215,99],[257,89,174,142],[433,89,246,99],[267,518,174,99],[389,360,227,87],[257,0,287,87],[593,613,276,53],[681,89,113,53],[189,101,60,60]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_110 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_109 = function() {
	this.initialize(ss["vital_op_fop_atlas_4"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_108 = function() {
	this.initialize(ss["vital_op_fop_atlas_4"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_107 = function() {
	this.initialize(ss["vital_op_fop_atlas_5"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_106 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_105 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_104 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_103 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_102 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_101 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_100 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_99 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_98 = function() {
	this.initialize(ss["vital_op_fop_atlas_4"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_97 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_96 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_95 = function() {
	this.initialize(ss["vital_op_fop_atlas_5"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_94 = function() {
	this.initialize(ss["vital_op_fop_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_93 = function() {
	this.initialize(ss["vital_op_fop_atlas_5"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_92 = function() {
	this.initialize(ss["vital_op_fop_atlas_5"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_91 = function() {
	this.initialize(ss["vital_op_fop_atlas_5"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_90 = function() {
	this.initialize(ss["vital_op_fop_atlas_5"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_89 = function() {
	this.initialize(ss["vital_op_fop_atlas_5"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_88 = function() {
	this.initialize(ss["vital_op_fop_atlas_5"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_87 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_86 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_85 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_84 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_83 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_82 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_81 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_80 = function() {
	this.initialize(ss["vital_op_fop_atlas_5"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_79 = function() {
	this.initialize(ss["vital_op_fop_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_78 = function() {
	this.initialize(ss["vital_op_fop_atlas_5"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_77 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_76 = function() {
	this.initialize(ss["vital_op_fop_atlas_4"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_75 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_74 = function() {
	this.initialize(ss["vital_op_fop_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_73 = function() {
	this.initialize(ss["vital_op_fop_atlas_5"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_72 = function() {
	this.initialize(ss["vital_op_fop_atlas_4"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_71 = function() {
	this.initialize(ss["vital_op_fop_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_70 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_69 = function() {
	this.initialize(ss["vital_op_fop_atlas_3"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_68 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_67 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_66 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_65 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_64 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_63 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_62 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_61 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_60 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_59 = function() {
	this.initialize(ss["vital_op_fop_atlas_4"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_58 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_57 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_56 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_55 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_54 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_53 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_52 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_51 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_50 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_49 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_48 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_47 = function() {
	this.initialize(ss["vital_op_fop_atlas_3"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_46 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_45 = function() {
	this.initialize(ss["vital_op_fop_atlas_3"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_44 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_43 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_42 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_41 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_40 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_39 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_38 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_37 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_36 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_35 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_34 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_33 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_32 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_31 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_30 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_29 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_28 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_27 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_26 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_25 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_24 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_23 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_22 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_21 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_20 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_19 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_18 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(36);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_17 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["vital_op_fop_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(37);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_14 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(38);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(39);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(36);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(37);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["vital_op_fop_atlas_3"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_6 = function() {
	this.initialize(ss["vital_op_fop_atlas_4"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["vital_op_fop_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["vital_op_fop_atlas_3"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(40);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(41);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["vital_op_fop_atlas_7"]);
	this.gotoAndStop(42);
}).prototype = p = new cjs.Sprite();



(lib.image110 = function() {
	this.initialize(ss["vital_op_fop_atlas_4"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.image132 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(38);
}).prototype = p = new cjs.Sprite();



(lib.image133 = function() {
	this.initialize(ss["vital_op_fop_atlas_5"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.image151 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(39);
}).prototype = p = new cjs.Sprite();



(lib.image152 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(40);
}).prototype = p = new cjs.Sprite();



(lib.image162 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(41);
}).prototype = p = new cjs.Sprite();



(lib.image163 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(42);
}).prototype = p = new cjs.Sprite();



(lib.image169 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(43);
}).prototype = p = new cjs.Sprite();



(lib.image170 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(44);
}).prototype = p = new cjs.Sprite();



(lib.image171 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(45);
}).prototype = p = new cjs.Sprite();



(lib.image181 = function() {
	this.initialize(ss["vital_op_fop_atlas_5"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.image182 = function() {
	this.initialize(ss["vital_op_fop_atlas_4"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.image199 = function() {
	this.initialize(ss["vital_op_fop_atlas_5"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.image2 = function() {
	this.initialize(ss["vital_op_fop_atlas_5"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.image204 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(46);
}).prototype = p = new cjs.Sprite();



(lib.image205 = function() {
	this.initialize(ss["vital_op_fop_atlas_5"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.image212 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(47);
}).prototype = p = new cjs.Sprite();



(lib.image217 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(48);
}).prototype = p = new cjs.Sprite();



(lib.image221 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(49);
}).prototype = p = new cjs.Sprite();



(lib.image255 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(50);
}).prototype = p = new cjs.Sprite();



(lib.image256 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(51);
}).prototype = p = new cjs.Sprite();



(lib.image275 = function() {
	this.initialize(ss["vital_op_fop_atlas_5"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.image291 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(52);
}).prototype = p = new cjs.Sprite();



(lib.image292 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(53);
}).prototype = p = new cjs.Sprite();



(lib.image40 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(54);
}).prototype = p = new cjs.Sprite();



(lib.image50 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(55);
}).prototype = p = new cjs.Sprite();



(lib.image56 = function() {
	this.initialize(ss["vital_op_fop_atlas_6"]);
	this.gotoAndStop(56);
}).prototype = p = new cjs.Sprite();



(lib.vital_op_fop_01 = function() {
	this.initialize(ss["vital_op_fop_atlas_5"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.vital_op_fop_02 = function() {
	this.initialize(ss["vital_op_fop_atlas_4"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.sprite75 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// レイヤー_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#666666").s().p("EggfAAyQgUAAAAgUIAAg7QAAgUAUAAMBA/AAAQAUAAAAAUIAAA7QAAAUgUAAg");
	this.shape.setTransform(220,20);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// レイヤー_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFFFF").ss(2,1,1).p("EgiDgDHMBEHAAAQAUAAAAAUIAAFnQAAAUgUAAMhEHAAAQgUAAAAgUIAAlnQAAgUAUAAg");
	this.shape_1.setTransform(220,20);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000066").s().p("EgiDADIQgUAAAAgUIAAlnQAAgUAUAAMBEHAAAQAUAAAAAUIAAFnQAAAUgUAAg");
	this.shape_2.setTransform(220,20);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite75, new cjs.Rectangle(-1,-1,442,42), null);


(lib.トゥイーン2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// レイヤー_1
	this.instance = new lib.vital_op_fop_01();
	this.instance.setTransform(-223.4,-168,0.8936,0.8936);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-223.4,-168,446.8,336);


(lib.トゥイーン1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// レイヤー_1
	this.instance = new lib.vital_op_fop_01();
	this.instance.setTransform(-223.4,-168,0.8936,0.8936);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-223.4,-168,446.8,336);


(lib.text294 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_110();
	this.instance.setTransform(41.15,-0.15,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(41.2,-0.1,236.8,54.300000000000004);


(lib.text290 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_109();
	this.instance.setTransform(-4,-12.95,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-12.9,410.7,93.4);


(lib.text288 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_108();
	this.instance.setTransform(-4,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,410.7,93.4);


(lib.text286 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_107();
	this.instance.setTransform(-4,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,391,39.699999999999996);


(lib.text285 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_106();
	this.instance.setTransform(-2,-3.7,0.3335,0.3335);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2,-3.7,307.2,33);


(lib.text283 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_105();
	this.instance.setTransform(31.7,-3.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(31.7,-3.7,94.8,33);


(lib.text282 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_104();
	this.instance.setTransform(55.3,-2.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(55.3,-2.9,48.7,47.4);


(lib.text281 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_103();
	this.instance.setTransform(56,-3.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(56,-3.7,46.099999999999994,47.400000000000006);


(lib.text280 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_102();
	this.instance.setTransform(54.45,-3.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(54.5,-3.7,46,47.400000000000006);


(lib.text279 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_101();
	this.instance.setTransform(-4,-3.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.7,85.1,33);


(lib.text278 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_100();
	this.instance.setTransform(-4,-3.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.7,60.4,33);


(lib.text277 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_99();
	this.instance.setTransform(-4,-3.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.7,58.1,47.400000000000006);


(lib.text273 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_98();
	this.instance.setTransform(-4,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,408,93.4);


(lib.text272 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_97();
	this.instance.setTransform(-4,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,32,39.699999999999996);


(lib.text271 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_96();
	this.instance.setTransform(-4,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,265.5,39.699999999999996);


(lib.text270 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_95();
	this.instance.setTransform(-4,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,381.3,55.699999999999996);


(lib.text268 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_94();
	this.instance.setTransform(-4,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,386.6,129.5);


(lib.text267 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_93();
	this.instance.setTransform(-4,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,390,57.699999999999996);


(lib.text265 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_92();
	this.instance.setTransform(-4,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,334.3,57.699999999999996);


(lib.text264 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_91();
	this.instance.setTransform(-4,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,393.6,57.699999999999996);


(lib.text263 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_90();
	this.instance.setTransform(-4,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,388.3,57.699999999999996);


(lib.text262 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_89();
	this.instance.setTransform(-4,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,385.6,57.699999999999996);


(lib.text261 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_88();
	this.instance.setTransform(-4,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,408.7,39.699999999999996);


(lib.text260 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_87();
	this.instance.setTransform(-207.35,-2.8,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-207.3,-2.8,223.5,47.4);


(lib.text258 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_86();
	this.instance.setTransform(-206.15,0,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-206.1,0,219.5,62.1);


(lib.text236 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_85();
	this.instance.setTransform(-4,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,32,39.699999999999996);


(lib.text234 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_84();
	this.instance.setTransform(-4,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,32,39.699999999999996);


(lib.text232 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_83();
	this.instance.setTransform(-4,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,32,39.699999999999996);


(lib.text223 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_82();
	this.instance.setTransform(37.95,-1.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(38,-1.9,129.1,29);


(lib.text219 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_81();
	this.instance.setTransform(37.15,-1.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-1.9,123.7,16.7);


(lib.text216 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_80();
	this.instance.setTransform(-4,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,405,39.699999999999996);


(lib.text215 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_79();
	this.instance.setTransform(-4,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,416.7,308.2);


(lib.text210 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_78();
	this.instance.setTransform(-4,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,419.3,57.699999999999996);


(lib.text209 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_77();
	this.instance.setTransform(-4,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,281.2,39.699999999999996);


(lib.text208 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_76();
	this.instance.setTransform(-4,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,404.3,93.4);


(lib.text207 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_75();
	this.instance.setTransform(-4,-3.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.7,209.2,51.400000000000006);


(lib.text202 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_74();
	this.instance.setTransform(-4,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,419.3,236.9);


(lib.text201 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_73();
	this.instance.setTransform(-37.2,-3.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-37.2,-3.7,246.5,62.1);


(lib.text197 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_72();
	this.instance.setTransform(-4,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,412.3,93.4);


(lib.text196 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_71();
	this.instance.setTransform(-4,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,418.7,165.1);


(lib.text195 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_70();
	this.instance.setTransform(-4,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,258.9,39.699999999999996);


(lib.text194 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_69();
	this.instance.setTransform(-4,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,418.7,93.4);


(lib.text192 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_68();
	this.instance.setTransform(54.05,-4.1,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(54.1,-4.1,39.300000000000004,34);


(lib.text191 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_67();
	this.instance.setTransform(56.85,-4.1,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(56.9,-4.1,37.699999999999996,34);


(lib.text190 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_66();
	this.instance.setTransform(59.85,-3.1,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(59.9,-3.1,34.300000000000004,24);


(lib.text189 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_65();
	this.instance.setTransform(59.1,-2.1,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(59.1,-2.1,27.999999999999993,34);


(lib.text188 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_64();
	this.instance.setTransform(55.9,-4.1,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(55.9,-4.1,29.000000000000007,34);


(lib.text187 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_63();
	this.instance.setTransform(58.1,-4.1,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(58.1,-4.1,29.999999999999993,34);


(lib.text186 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_62();
	this.instance.setTransform(53.6,-2.1,0.3324,0.3324);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(53.6,-2.1,43.9,24.3);


(lib.text185 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_61();
	this.instance.setTransform(47.15,-1.6,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(47.2,-1.6,49.3,38.1);


(lib.text184 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_60();
	this.instance.setTransform(51.35,-2.1,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(51.4,-2.1,55.300000000000004,24);


(lib.text177 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_59();
	this.instance.setTransform(37.15,-3.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-3.9,431.6,60.4);


(lib.text173 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_58();
	this.instance.setTransform(37.15,-3.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-3.9,153.39999999999998,29);


(lib.text167 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_57();
	this.instance.setTransform(37.15,-3.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-3.9,172.8,29);


(lib.text165 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_56();
	this.instance.setTransform(37.15,-3.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-3.9,159.39999999999998,29);


(lib.text159 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_55();
	this.instance.setTransform(37.15,-3.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-3.9,168.10000000000002,29);


(lib.text156 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_54();
	this.instance.setTransform(37.15,-3.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-3.9,120.7,29);


(lib.text154 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_53();
	this.instance.setTransform(37.15,-3.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-3.7,267.5,33);


(lib.text149 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_52();
	this.instance.setTransform(37.15,-3.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-3.9,88.39999999999999,54.4);


(lib.text147 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_51();
	this.instance.setTransform(37.15,-3.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-3.7,183.10000000000002,33);


(lib.text144 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_50();
	this.instance.setTransform(37.15,-3.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-3.9,94.99999999999999,29);


(lib.text142 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_49();
	this.instance.setTransform(37.15,-3.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-3.9,104.39999999999999,29);


(lib.text140 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_48();
	this.instance.setTransform(37.15,-3.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-3.9,85.39999999999999,41.699999999999996);


(lib.text130 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_47();
	this.instance.setTransform(-4,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,411.3,111.4);


(lib.text129 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_46();
	this.instance.setTransform(-4,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,278.2,39.699999999999996);


(lib.text128 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_45();
	this.instance.setTransform(-4,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,414,165.1);


(lib.text127 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_44();
	this.instance.setTransform(61.95,-3,0.3333,0.3333);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(62,-3,28.299999999999997,26.7);


(lib.text126 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_43();
	this.instance.setTransform(35.5,-3.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(35.5,-3.9,91.8,29);


(lib.text125 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_42();
	this.instance.setTransform(42,-3.9,0.3333,0.3333);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(42,-3.9,59,41.699999999999996);


(lib.text124 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_41();
	this.instance.setTransform(57.95,-2.9,0.3333,0.3333);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(58,-2.9,40,29);


(lib.text123 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_40();
	this.instance.setTransform(27.45,-2.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(27.5,-2.9,91.7,41.699999999999996);


(lib.text122 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_39();
	this.instance.setTransform(36.1,-3.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(36.1,-3.9,90.4,29);


(lib.text121 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_38();
	this.instance.setTransform(41.05,-0.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(41.1,-0.9,62.4,40.699999999999996);


(lib.text120 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_37();
	this.instance.setTransform(37.9,-3.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.9,-3.9,79.69999999999999,29);


(lib.text119 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_36();
	this.instance.setTransform(-4.75,-3.7,0.3333,0.3333);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4.7,-3.7,183.6,33);


(lib.text117 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_35();
	this.instance.setTransform(49.25,-6.65,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(49.3,-6.6,45.3,68);


(lib.text116 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_34();
	this.instance.setTransform(34,-3.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(34,-3.9,88.4,29);


(lib.text115 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_33();
	this.instance.setTransform(41.1,-3.9,0.3333,0.3333);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(41.1,-3.9,73,41.699999999999996);


(lib.text114 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_32();
	this.instance.setTransform(52.25,-0.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(52.3,-0.7,44.3,68.10000000000001);


(lib.text113 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_31();
	this.instance.setTransform(42.25,-3.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(42.3,-3.9,70,29);


(lib.text112 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_30();
	this.instance.setTransform(38.25,-3.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(38.3,-3.9,79,29);


(lib.text69 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_29();
	this.instance.setTransform(0,0,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,361,27.4);


(lib.text63 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_28();
	this.instance.setTransform(-85.35,-2.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-85.3,-2.7,317.5,33);


(lib.text55 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_27();
	this.instance.setTransform(21.7,-3.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(21.7,-3.7,116.39999999999999,62.1);


(lib.text53 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_26();
	this.instance.setTransform(59.2,-3.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(59.2,-3.7,34.39999999999999,33);


(lib.text52 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_25();
	this.instance.setTransform(26.35,-3.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(26.4,-3.7,106.69999999999999,33);


(lib.text49 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_24();
	this.instance.setTransform(37.15,-3.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-3.7,144.10000000000002,33);


(lib.text47 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_23();
	this.instance.setTransform(53.8,-3.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(53.8,-3.7,46.400000000000006,33);


(lib.text46 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_22();
	this.instance.setTransform(52.2,-3.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(52.2,-3.7,41.7,47.400000000000006);


(lib.text45 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_21();
	this.instance.setTransform(42.2,-3.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(42.2,-3.7,71.7,33);


(lib.text44 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_20();
	this.instance.setTransform(3.3,-3.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(3.3,-3.7,157.5,33);


(lib.text43 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_19();
	this.instance.setTransform(43.85,-3.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(43.9,-3.7,58.00000000000001,47.400000000000006);


(lib.text42 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_18();
	this.instance.setTransform(37.55,-3.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.6,-3.7,82,33);


(lib.text19 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_17();
	this.instance.setTransform(-4,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,253.9,39.699999999999996);


(lib.text18 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_16();
	this.instance.setTransform(-4,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,416,337.59999999999997);


(lib.text13 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_15();
	this.instance.setTransform(28.5,-3.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(28.5,-3.7,58.099999999999994,33);


(lib.text12 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_14();
	this.instance.setTransform(14.5,-3.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(14.5,-3.7,78.1,51.400000000000006);


(lib.text11 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_13();
	this.instance.setTransform(11.8,-3.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(11.8,-3.7,79.4,51.400000000000006);


(lib.text10 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_12();
	this.instance.setTransform(19.9,-3.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(19.9,-3.9,75.69999999999999,29);


(lib.text9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_11();
	this.instance.setTransform(11.7,-3.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(11.7,-3.9,95.8,29);


(lib.text8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_10();
	this.instance.setTransform(10.85,-3.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(10.9,-3.9,99.69999999999999,29);


(lib.text7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_9();
	this.instance.setTransform(-13.65,-3.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-13.6,-3.9,149.4,29);


(lib.text5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_8();
	this.instance.setTransform(-35.75,-3.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-35.7,-3.7,205.8,33);


(lib.shape293 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("ATAjxIAAHjMgl/AAAIAAnjg");
	this.shape.setTransform(-3.15,16);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("Ay/DxIAAniMAl/AAAIAAHig");
	this.shape_1.setTransform(-3.15,16);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_op_fop_atlas_6"],52);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(0.899,0,0,0.899,-125.9,-96.2)).s().p("AzqPCIAA+EMAnVAAAIAAeEg")
	}.bind(this);
	this.shape_2.setTransform(-3.725,102.4);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	var sprImg_shape_3 = cjs.SpriteSheetUtils.extractFrame(ss["vital_op_fop_atlas_6"],53);
	sprImg_shape_3.onload = function(){
		this.shape_3.graphics.bf(sprImg_shape_3, null, new cjs.Matrix2D(0.885,0,0,0.885,-128.3,-99.1)).s().p("A0CPfIAA+9MAoFAAAIAAe9g")
	}.bind(this);
	this.shape_3.setTransform(-1.35,-97.85);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-129.6,-196.9,256.6,395.6);


(lib.shape284 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(1,0,0,3).p("A1VAAMAqrAAA");
	this.shape.setTransform(-1.15,-160.7);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-138.7,-161.7,275.1,2);


(lib.shape276 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFF00").s().p("AnLCWIAAkrIOXAAIAAErg");
	this.shape.setTransform(95.375,-110.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AQuJsIAAiMIHqAAIAACMgAmPjRIAAigIGjAAIAACggA4YkhIAAlKIHhAAIAAFKg");
	this.shape_1.setTransform(20.35,-21.475);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFF00").s().p("AnVCgIAAkhIBGAAIAAgeINlAAIAAB4IgeAAIAADHg");
	this.shape_2.setTransform(-4.65,53.55);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF3300").s().p("A11GGIAAm3IG4AAIAAG3gAQJBLIAAlsIFtAAIAAFsgAglAeIAAmjIFoAAIAAGjg");
	this.shape_3.setTransform(-65.925,-10.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(1));

	// Layer_1
	this.shape_4 = new cjs.Shape();
	var sprImg_shape_4 = cjs.SpriteSheetUtils.extractFrame(ss["vital_op_fop_atlas_5"],16);
	sprImg_shape_4.onload = function(){
		this.shape_4.graphics.bf(sprImg_shape_4, null, new cjs.Matrix2D(0.92,0,0,0.92,-245.6,-119.6)).s().p("EgmYASsMAAAglXMBMwAAAMAAAAlXg")
	}.bind(this);
	this.shape_4.setTransform(26,-13);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-219.6,-132.6,491.29999999999995,239.2);


(lib.shape259 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AR+C0Mgj7AAAIAAlnMAj7AAAg");
	this.shape.setTransform(114.55,176.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("Ax8C0IAAlnMAj6AAAIAAFng");
	this.shape_1.setTransform(114.55,176.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.4,158,231.9,38);


(lib.shape257 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AR+kNIAAIbMgj7AAAIAAobg");
	this.shape.setTransform(-119.125,10.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("Ax9EOIAAobMAj7AAAIAAIbg");
	this.shape_1.setTransform(-119.125,10.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_op_fop_atlas_6"],50);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(0.7,0,0,0.7,-116.9,-119.3)).s().p("AyQSpMAAAglRMAkhAAAMAAAAlRg")
	}.bind(this);
	this.shape_2.setTransform(114.55,76.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	var sprImg_shape_3 = cjs.SpriteSheetUtils.extractFrame(ss["vital_op_fop_atlas_6"],51);
	sprImg_shape_3.onload = function(){
		this.shape_3.graphics.bf(sprImg_shape_3, null, new cjs.Matrix2D(0.78,0,0,0.78,-123.2,-92)).s().p("AzPOYIAA8vMAmgAAAIAAcvg")
	}.bind(this);
	this.shape_3.setTransform(-110.85,-111.1);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-235.1,-203.1,466.6,399);


(lib.shape226 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF3300").s().p("Ah/CQIAAkfID/AAIAAEfg");
	this.shape.setTransform(-5.075,-147.8);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF3300").s().p("Ah/CQIAAkfID/AAIAAEfg");
	this.shape_1.setTransform(-85.925,-147.65);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF3300").s().p("AXaEGIAAiCIDcAAIAACCgA61iNIAAh4IGzAAIAAB4g");
	this.shape_2.setTransform(-18.875,-89.725);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AQGHyIAAjmID3AAIAADmgAGzHyIAAjXIEOAAIAAhqIEEAAIAADTIkEAAIAABugAz8j9IAAj1IFWAAIAAD1gAnQlhIAAh4IFzAAIAAB4g");
	this.shape_3.setTransform(-16.15,-127.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	// Layer_1
	this.shape_4 = new cjs.Shape();
	var sprImg_shape_4 = cjs.SpriteSheetUtils.extractFrame(ss["vital_op_fop_atlas_4"],8);
	sprImg_shape_4.onload = function(){
		this.shape_4.graphics.bf(sprImg_shape_4, null, new cjs.Matrix2D(0.868,0,0,0.868,-229.2,-184.1)).s().p("EgjzAcxMAAAg5hMBHnAAAMAAAA5hg")
	}.bind(this);
	this.shape_4.setTransform(-1.35,0.35);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-230.6,-183.7,458.5,368.2);


(lib.shape225 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("ACYjDIkvGH");
	this.shape.setTransform(-77.625,-88.225);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-94.3,-109.3,33.4,42.2);


(lib.shape224 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("ACYjDIkvGH");
	this.shape.setTransform(-77.625,94.825);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-94.3,73.8,33.4,42.10000000000001);


(lib.shape222 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AqEizIUJAAIAAFnI0JAAg");
	this.shape.setTransform(-103.55,164.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AqEC0IAAlnIUJAAIAAFng");
	this.shape_1.setTransform(-103.55,164.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_3
	this.instance = new lib.CachedBmp_7();
	this.instance.setTransform(-89.55,-150.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_op_fop_atlas_6"],49);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(1.1,0,0,1.1,-180.9,-189.2)).s().p("A8RdkMAAAg7HMA4jAAAMAAAA7Hg")
	}.bind(this);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("EglMAgNMAAAhAYMBKYAAAMAAABAYg");
	this.shape_3.setTransform(-1.7,-8.35);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-239.7,-214.4,476.1,412.1);


(lib.shape220 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("ACYjDIkvGH");
	this.shape.setTransform(-38.825,40.825);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-55.5,19.8,33.4,42.099999999999994);


(lib.shape218 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AJjBfIzFAAIAAi+ITFAAg");
	this.shape.setTransform(-86.3,69.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("ApiBfIAAi+ITFAAIAAC+g");
	this.shape_1.setTransform(-86.3,69.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.instance = new lib.CachedBmp_6();
	this.instance.setTransform(-170.1,-94.5,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_op_fop_atlas_6"],48);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(1.27,0,0,1.27,-228.6,-172.8)).s().p("EgjuAbAMAAAg1/MBHdAAAMAAAA1/g")
	}.bind(this);
	this.shape_2.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-228.6,-172.7,457.29999999999995,345.5);


(lib.shape213 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["vital_op_fop_atlas_6"],47);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(1.123,0,0,1.123,-228,-181.9)).s().p("EgjnAccMAAAg43MBHPAAAMAAAA43g")
	}.bind(this);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-228,-181.9,456,363.9);


(lib.shape206 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_5
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(1,0,0,3).p("AuSBTIK8AAAuShSIclAA");
	this.shape.setTransform(64.5,-148.45);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_4
	this.shape_1 = new cjs.Shape();
	var sprImg_shape_1 = cjs.SpriteSheetUtils.extractFrame(ss["vital_op_fop_atlas_6"],46);
	sprImg_shape_1.onload = function(){
		this.shape_1.graphics.bf(sprImg_shape_1, null, new cjs.Matrix2D(1,0,0,1,-203,-131)).s().p("A/tUeMAAAgo7MA/bAAAMAAAAo7g")
	}.bind(this);
	this.shape_1.setTransform(-14.25,-53.3);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_3
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("EgjnAYBMAAAgwBMBHPAAAMAAAAwBg");
	this.shape_2.setTransform(-2.975,-42.35);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_2
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AwSDwIAAnfMAgkAAAIAAHfg");
	this.shape_3.setTransform(72.25,-149.2);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Layer_1
	this.shape_4 = new cjs.Shape();
	var sprImg_shape_4 = cjs.SpriteSheetUtils.extractFrame(ss["vital_op_fop_atlas_5"],15);
	sprImg_shape_4.onload = function(){
		this.shape_4.graphics.bf(sprImg_shape_4, null, new cjs.Matrix2D(0.937,0,0,0.929,-226.7,-196.1)).s().p("EgjaAepMAAAg9RMBG1AAAMAAAA9Rg")
	}.bind(this);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-230.9,-196.1,457.6,392.2);


(lib.shape200 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("ARWEOMgirAAAIAAobMAirAAAg");
	this.shape.setTransform(-87.625,166.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AxVEOIAAobMAirAAAIAAIbg");
	this.shape_1.setTransform(-87.625,166.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_op_fop_atlas_5"],13);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(1,0,0,1,-217.5,-200.5)).s().p("ADhfLIAApEMgjTAAAIAA8bIiCAAIAA42MAgWAAAIAAJiIb9AAIAAdNIHWAAIAAXmg")
	}.bind(this);
	this.shape_2.setTransform(4,-5);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-212.5,-204.5,433,399.1);


(lib.shape183 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_5
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF3300").s().p("AiGCQIAAkfIENAAIAAEfg");
	this.shape.setTransform(-1.575,-147.8);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_4
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF3300").s().p("AiJCQIAAkfIETAAIAAEfg");
	this.shape_1.setTransform(-88.375,-147.65);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_3
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AGfIcIAAkFIFVAAIAAiCIFIAAIAABiIEGAAIAAENIkvAAIAAhvIkfAAIAACHgA1BkSIAAkJIFVAAIAAEJgAnzliIAAiCIGPAAIAACCg");
	this.shape_2.setTransform(-12.65,-127.7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF3300").s().p("AYqEfIAAi3ID4AAIAAC3gA8himIAAh4IGzAAIAAB4g");
	this.shape_3.setTransform(-15.075,-87.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	// Layer_2
	this.shape_4 = new cjs.Shape();
	var sprImg_shape_4 = cjs.SpriteSheetUtils.extractFrame(ss["vital_op_fop_atlas_5"],12);
	sprImg_shape_4.onload = function(){
		this.shape_4.graphics.bf(sprImg_shape_4, null, new cjs.Matrix2D(0.924,0,0,0.924,-236.5,-184.8)).s().p("Egk8Ac4MAAAg5vMBJ5AAAMAAAA5vg")
	}.bind(this);
	this.shape_4.setTransform(3.15,0.325);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	// Layer_1
	this.shape_5 = new cjs.Shape();
	var sprImg_shape_5 = cjs.SpriteSheetUtils.extractFrame(ss["vital_op_fop_atlas_4"],8);
	sprImg_shape_5.onload = function(){
		this.shape_5.graphics.bf(sprImg_shape_5, null, new cjs.Matrix2D(0.868,0,0,0.868,-229.2,-184.1)).s().p("EgjzAcxMAAAg5hMBHnAAAMAAAA5hg")
	}.bind(this);
	this.shape_5.setTransform(-1.35,0.35);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-233.4,-184.5,473.1,369.7);


(lib.shape178 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("ACEioIkHFR");
	this.shape.setTransform(38.9,129.375);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(24.3,111,29.3,36.80000000000001);


(lib.shape176 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AfDEDMg+FAAAIAAoFMA+FAAAg");
	this.shape.setTransform(-10.925,172.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("A/CEDIAAoFMA+FAAAIAAIFg");
	this.shape_1.setTransform(-10.925,172.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-210.6,145.7,399.4,53.80000000000001);


(lib.shape175 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AhdjlIC7HL");
	this.shape.setTransform(-101.275,124.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-112.1,100,21.69999999999999,48.900000000000006);


(lib.shape174 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AhdjlIC7HL");
	this.shape.setTransform(93.175,-66.275);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(82.3,-90.7,21.799999999999997,48.900000000000006);


(lib.shape172 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_5
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("ArKhfIWVAAIAAC/I2VAAg");
	this.shape.setTransform(135,-30.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("ArKBfIAAi+IWVAAIAAC+g");
	this.shape_1.setTransform(135,-30.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_4
	this.instance = new lib.CachedBmp_5();
	this.instance.setTransform(-172.75,-119.8,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_3
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_op_fop_atlas_6"],43);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(1,0,0,1,-128,-100)).s().p("Az/PoIAA/PMAn/AAAIAAfPg")
	}.bind(this);
	this.shape_2.setTransform(117.925,87.775);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_2
	this.shape_3 = new cjs.Shape();
	var sprImg_shape_3 = cjs.SpriteSheetUtils.extractFrame(ss["vital_op_fop_atlas_6"],44);
	sprImg_shape_3.onload = function(){
		this.shape_3.graphics.bf(sprImg_shape_3, null, new cjs.Matrix2D(1,0,0,1,-115,-103)).s().p("Ax9QGMAAAggLMAj7AAAMAAAAgLg")
	}.bind(this);
	this.shape_3.setTransform(-130.9,90.75);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Layer_1
	this.shape_4 = new cjs.Shape();
	var sprImg_shape_4 = cjs.SpriteSheetUtils.extractFrame(ss["vital_op_fop_atlas_6"],45);
	sprImg_shape_4.onload = function(){
		this.shape_4.graphics.bf(sprImg_shape_4, null, new cjs.Matrix2D(1.171,0,0,1.171,-105.4,-86.7)).s().p("AwdNjIAA7FMAg7AAAIAAbFg")
	}.bind(this);
	this.shape_4.setTransform(-11.65,-107.125);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-245.9,-193.8,491.9,387.6);


(lib.shape166 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AMXBgI4tAAIAAi/IYtAAg");
	this.shape.setTransform(10.675,181.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AsWBgIAAi/IYtAAIAAC/g");
	this.shape_1.setTransform(10.675,181.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-69.4,171.2,160.2,21.100000000000023);


(lib.shape164 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("ALLBgI2VAAIAAi/IWVAAg");
	this.shape.setTransform(3.05,7.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("ArKBfIAAi+IWVAAIAAC+g");
	this.shape_1.setTransform(3.05,7.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_op_fop_atlas_6"],41);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(1,0,0,1,-132,-101)).s().p("A0nPyIAA/jMApPAAAIAAfjg")
	}.bind(this);
	this.shape_2.setTransform(1,-90.35);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	var sprImg_shape_3 = cjs.SpriteSheetUtils.extractFrame(ss["vital_op_fop_atlas_6"],42);
	sprImg_shape_3.onload = function(){
		this.shape_3.graphics.bf(sprImg_shape_3, null, new cjs.Matrix2D(1,0,0,1,-133,-83)).s().p("A0xM+IAA57MApjAAAIAAZ7g")
	}.bind(this);
	this.shape_3.setTransform(0,104);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-133,-191.3,266,378.3);


(lib.shape160 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AA2h/IhrD/");
	this.shape.setTransform(-144.65,33.275);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-151.5,19,13.800000000000011,28.6);


(lib.shape158 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AMDBgI4FAAIAAi/IYFAAg");
	this.shape.setTransform(-68.975,145);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AsCBfIAAi+IYFAAIAAC+g");
	this.shape_1.setTransform(-68.975,145);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-147,134.5,156.1,21.099999999999994);


(lib.shape157 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AFBjyIqBHl");
	this.shape.setTransform(-5.65,109.175);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-39.2,83.4,67.2,51.599999999999994);


(lib.shape155 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AIkBfIxHAAIAAi9IRHAAg");
	this.shape.setTransform(-169.725,58.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AojBfIAAi+IRHAAIAAC+g");
	this.shape_1.setTransform(-169.725,58.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-225.5,48.3,111.6,21.10000000000001);


(lib.shape153 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_5
	this.instance = new lib.CachedBmp_4();
	this.instance.setTransform(-159.6,-74.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("AyPAAMAkfAAA");
	this.shape.setTransform(121.3,-170.8);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FF0000").ss(2,0,0,3).p("AQTykMAAAAlJMgglAAAMAAAglJg");
	this.shape_1.setTransform(-122.5,-86.65);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_op_fop_atlas_6"],39);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(1.117,0,0,1.117,-102.7,-119.5)).s().p("AwDSrMAAAglVMAgGAAAMAAAAlVg")
	}.bind(this);
	this.shape_2.setTransform(-121.8,-84.1);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	var sprImg_shape_3 = cjs.SpriteSheetUtils.extractFrame(ss["vital_op_fop_atlas_6"],40);
	sprImg_shape_3.onload = function(){
		this.shape_3.graphics.bf(sprImg_shape_3, null, new cjs.Matrix2D(1,0,0,1,-166,-157)).s().p("A57YiMAAAgxDMAz3AAAMAAAAxDg")
	}.bind(this);
	this.shape_3.setTransform(58.9,20.2);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-227.7,-206.5,466.79999999999995,383.7);


(lib.shape148 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AGEEOIsHAAIAAobIMHAAg");
	this.shape.setTransform(-181.2,109.275);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AmDEOIAAobIMHAAIAAIbg");
	this.shape_1.setTransform(-181.2,109.275);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-221,81.3,79.6,56.000000000000014);


(lib.shape146 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("AsLAAIYXAA");
	this.shape.setTransform(98.925,161.2);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(20,160.2,157.9,2);


(lib.shape145 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("ABgjkIi/HJ");
	this.shape.setTransform(149.075,-97.125);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(138,-121.5,22.19999999999999,48.8);


(lib.shape143 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("Am3hUINvAAIAACpItvAAg");
	this.shape.setTransform(158.3,-62.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("Am3BWIAAiqINvAAIAACqg");
	this.shape_1.setTransform(158.3,-62.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(113.3,-71.8,90.00000000000001,19.099999999999994);


(lib.shape141 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AHTBVIulAAIAAipIOlAAg");
	this.shape.setTransform(70.625,-105.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AnSBWIAAiqIOlAAIAACqg");
	this.shape_1.setTransform(70.625,-105.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(23,-115.2,95.3,19.10000000000001);


(lib.shape139 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AGEiVIAAErIsHAAIAAkrg");
	this.shape.setTransform(-56.8,-102.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AmDCWIAAkrIMHAAIAAErg");
	this.shape_1.setTransform(-56.8,-102.95);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-96.6,-118.9,79.6,32);


(lib.shape138 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("Aj1AfIHrg9");
	this.shape.setTransform(-122.975,-105.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-149.1,-109.7,52.3,9.299999999999997);


(lib.shape137 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("AjFCWIGLkr");
	this.shape.setTransform(21.225,-80);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,-96.5,42.5,33);


(lib.shape135 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("AAIAXIgPAAIgbAJIAjhAIAiBBg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.5,-3.3,7,6.699999999999999);


(lib.shape134 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(3,0,0,3).p("ACwBKIlfiT");
	this.shape.setTransform(-128.175,129);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FF0000").ss(2,0,0,3).p("ANXzJMAAAAmTI6tAAMAAAgmTg");
	this.shape_1.setTransform(-150.15,48.375);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_op_fop_atlas_6"],38);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(0.911,0,0,0.911,-85.6,-123)).s().p("AtXTOMAAAgmbIavAAMAAAAmbg")
	}.bind(this);
	this.shape_2.setTransform(-150.25,48.775);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	var sprImg_shape_3 = cjs.SpriteSheetUtils.extractFrame(ss["vital_op_fop_atlas_5"],11);
	sprImg_shape_3.onload = function(){
		this.shape_3.graphics.bf(sprImg_shape_3, null, new cjs.Matrix2D(1,0,0,1,-236,-156)).s().p("Egk3AYYMAAAgwvMBJvAAAMAAAAwvg")
	}.bind(this);
	this.shape_3.setTransform(0,-43.2);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-236.6,-199.2,472.6,371.2);


(lib.shape131 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF9900").ss(2,0,0,3).p("AmPlGIgfAAIAAA8AkXlGIg8AAAiflGIg8AAAmuCZIAAA8AmuAhIAAA8AmuhWIAAA8AmujOIAAA8AGvk9IAAgJIgzAAAgnlGIg8AAABQlGIg8AAADIlGIg8AAAGvhNIAAg8AGvAqIAAg7AGvCiIAAg8AFAlGIg8AAAGvjFIAAg8AFjFHIA8AAABzFHIA8AAAgEFHIA7AAADrFHIA8AAAj0FHIA8AAAlsFHIA8AAAmuERIAAA2IAGAAAh8FHIA8AAAGvEaIAAg8");
	this.shape.setTransform(173.5,-27.175);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(129.4,-60.8,88.19999999999999,67.3);


(lib.shape118 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("AreAAIW9AA");
	this.shape.setTransform(-10.3,143.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-84.8,142.5,149,2);


(lib.shape111 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(3,0,0,3).p("AiuldIg8AAIAAA8AjqhtIAAA8AjqjlIAAA8Ag2ldIg8AAABBldIg8AAAC5ldIg8AAADrkXIAAg8ADrifIAAg8ADrgnIAAg8ADrDIIAAg8ADrFAIAAg8ACRFeIA8AAAAZFeIA8AAAheFeIA8AAAjqD6IAAA8AjqCCIAAA8AjWFeIA8AAADrBQIAAg8AjqAKIAAA8");
	this.shape.setTransform(-104.3,-4.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AjqFeIAAq7IHVAAIAAK7g");
	this.shape_1.setTransform(-104.3,-4.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_op_fop_atlas_4"],7);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(0.669,0,0,0.693,-233.6,-121.3)).s().p("EgkgAS9MAAAgl5MBJBAAAMAAAAl5g")
	}.bind(this);
	this.shape_2.setTransform(3.1,0.375);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-230.5,-120.9,467.3,242.60000000000002);


(lib.shape79 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgdCWQgUAAAAgUIAAkDQAAgUAUAAIA7AAQAUAAAAAUIAAEDQAAAUgUAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5,-15,10,30);


(lib.shape65 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("AtWAAIatAA");
	this.shape.setTransform(0.175,195.7);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	var sprImg_shape_1 = cjs.SpriteSheetUtils.extractFrame(ss["vital_op_fop_atlas_5"],14);
	sprImg_shape_1.onload = function(){
		this.shape_1.graphics.bf(sprImg_shape_1, null, new cjs.Matrix2D(0.828,0,0,0.828,-189.6,-192.1)).s().p("A9neBMAAAg8BMA7PAAAMAAAA8Bg")
	}.bind(this);
	this.shape_1.setTransform(0.05,-8.25);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-189.5,-200.3,379.2,397);


(lib.shape62 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.instance = new lib.vital_op_fop_02();
	this.instance.setTransform(-223,-176,0.8083,0.8082);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("AVdAAMgq5AAA");
	this.shape.setTransform(4.75,204.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-223,-176,451,381.1);


(lib.shape57 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["vital_op_fop_atlas_6"],56);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(0.724,0,0,0.724,-114,-63.8)).s().p("Av/HrIAAvVIKMAAIgFEbIABAAIABCTIgBAAIgBEUQAAAFADgCIAEADQADAEAEACIA+gGIAEgCQANgDAJgIQACgFAFgEQAHgMAEgNIAFAMIACALQAEAHAFABQAHADAGgFQAFgEACgGIABgOQADAAAFAEIAHAFQAGADAOABQALAAAHgCIALgEIAQADQAGACAIAAQAIABAGgEQAJgEgBgIQABgHgIgGQgIgKgPgFIgNgFIgOgHQgMgHgPgPIgbgWQgGgEgEgDQgLgEgBgEQgBgCABgDQACgWgEgMQgBgFABgCIAEgDIALgFIAMgDQAHgFAEgBQAEAAAKAAQAKABAFgCQAKgGgBgQIgBAAIACgFQABgIACgGQAIgPARgFIAMAAIAAgjIAEgCIAlgFIAAAAIAJABIAWAIIAAgBIAIAEIABAAIAzgIIAAgBQAFgEAGABIAHgDIAJAAIAMAKIABABQAIgPgCgRIACgRIAigKIAtAMIABgBIAWACIAVAKIASgBIABgCQADgDAAgEIACgSQAIABgDgLIAAgMIAEgFQAQgJARgDIACAAIAaATIACgBIAigGIACABIAAAAIAAAAIADADIABABIACgFIAngMIAMABQALAEAIAGIABAAQADgFAAgHIABgEIAGgIIA/gTIAHADIAAABIABgGIBLgXQAHAEAFAFIABABQADgHADgIIA0gQIADACIASAEQADgGABgIIAhgKIABAAIABAAIADgCIAZAAQAJACAFAHIABAAQABgBgBgFIABABIAAABIAAgKIAGgBIAFgCIAAgOIAggIIAKAKQAAgIgBgHIACAAIABgJIAlgGIAYAMIAAgBIAygLIBZBqIABgHIABACIAXgCIAXgJIAAEmInkAAIAADMIuFAAIAADrgAjNg3IABABIgDAAgANFlEIABAAIAAAAgAhvm4QgOgRgYAEIgxAAIgBgDQgFgRgJgPIgBgCIDhAAQg9AYg8AeIgBgEg")
	}.bind(this);
	this.shape.setTransform(38.45,174.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-64,125.9,204.9,98.19999999999999);


(lib.shape54 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AqJE2IAAiqIUTAAIAACqgAqJCCIAAm3IUJAAIAAG3g");
	this.shape.setTransform(-163.275,6.25);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-228.2,-24.7,129.89999999999998,62);


(lib.shape51 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(3,0,0,3).p("AjtAAIHbAA");
	this.shape.setTransform(-97.825,69.725);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgsAAIBZguIgOAkIAAAKIAAALIAOAkg");
	this.shape_1.setTransform(-124.675,69.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(3,0,0,3).p("AjtAAIHbAA");
	this.shape_2.setTransform(-97.825,105.275);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgsAAIBZguIgOAkIAAAKIAAALIAOAkg");
	this.shape_3.setTransform(-124.675,105.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	// Layer_1
	this.shape_4 = new cjs.Shape();
	var sprImg_shape_4 = cjs.SpriteSheetUtils.extractFrame(ss["vital_op_fop_atlas_6"],55);
	sprImg_shape_4.onload = function(){
		this.shape_4.graphics.bf(sprImg_shape_4, null, new cjs.Matrix2D(1,0,0,1,-76.9,-74)).s().p("AqoLkIAA3HIAtAAIAAGTIUJAAIAAmTIAbAAIAAXHgAFjHAIBZAwIgNgkIAAgXIANgkgAp7icIUTAAIAAiqI0TAAg")
	}.bind(this);
	this.shape_4.setTransform(-164.65,51.95);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-232.7,-22,160.2,148);


(lib.shape48 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(1,0,0,3).p("ApeAAIS9AA");
	this.shape.setTransform(-0.5,-158);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-62.2,-159,123.4,2);


(lib.shape41 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	var sprImg_shape = cjs.SpriteSheetUtils.extractFrame(ss["vital_op_fop_atlas_6"],54);
	sprImg_shape.onload = function(){
		this.shape.graphics.bf(sprImg_shape, null, new cjs.Matrix2D(0.869,0,0,0.869,-195.5,-131.2)).s().p("A+iUgMAAAgo/MA9FAAAMAAAAo/g")
	}.bind(this);
	this.shape.setTransform(45.4,-1.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-150.1,-133.1,391,262.4);


(lib.shape33 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("AJpS2IAAgwIRPAAIAAgtIAvAAIAABdgAEuS2IAAgwIB7AAIAAAwgAnBSEIAAm2IkEAAIAACZIgmAAIAAi0IFIAAIAAGwICvAAIAAAhgA7mSBIAAtHIMJAAIAAAYIrkAAIAAMHIDdAAIAAnOIDUAAIAADhIgjAAIAAjGIiRAAIAAHbgAlnFSIgBgYICIAAIABAYgAqrFSIAAgYICHAAIAAAYgAvIFSIAAgYIEFAAIAAAYgA6TnhIA4AAIAAIzIOsABIAAk/IHMAAIAAAtImpAAIAAEuIwHABgA6TqaIAAhDIA4AAIAABDgA6TwpIAAiMIDgAAIAAAyIiqAAIAABagAtGyDIAAgyIB1AAIAAAygAz/yDIAAgyID7AAIAAAyg");
	this.shape.setTransform(5.075,27.625);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-171.6,-92.9,353.4,241.1);


(lib.shape30 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("APNS2IAAgwIB7AAIAAAwgADdSEIAAm2IkDAAIAACZIglAAIAAi0IFGAAIAAGwICvAAIAAAhgAxHSBIAAtHIMJAAIAAAYIrkAAIAAMHIDdAAIAAnOIDUAAIAADhIgjAAIAAjGIiRAAIAAHbgAE4FSIgBgYICHAAIABAYgAgMFSIAAgYICGAAIAAAYgAkpFSIAAgYIEFAAIAAAYgAvznhIA4AAIAAIzIOrABIAAk/IHLAAIAAAtImpAAIAAEuIwFABgAvzqaIAAhDIA4AAIAABDgAvzwpIAAiMIDfAAIAAAyIiqAAIAABagAinyDIAAgyIB1AAIAAAygApgyDIAAgyID7AAIAAAyg");
	this.shape.setTransform(-62.05,27.625);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-171.6,-92.9,219.2,241.1);


(lib.shape27 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("AsCMYIAAhAIMHAAIAAAYIriAAIAAAogAJ8LwIgBgYICHAAIABAYgAE3LwIAAgYICHAAIAAAYgAAaLwIAAgYIEGAAIAAAYgAqvhDIA4AAIAAIzIOrABIAAlAIHMAAIAAAtImpAAIAAEvIwGAAgAqvj8IAAhEIA4AAIAABEgAqvqLIAAiMIDgAAIAAAyIirAAIAABagACdrlIAAgyIB1AAIAAAygAkbrlIAAgyID7AAIAAAyg");
	this.shape.setTransform(-94.5,-13.75);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-171.6,-92.9,154.29999999999998,158.4);


(lib.shape25 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("ArXBBIA4AAIAAI0IOrABIAAlAIHMAAIAAAtImpAAIAAEvIwGABgArXh3IAAhDIA4AAIAABDgArXoGIAAiMIDgAAIAAAyIirAAIAABagAB1pgIAAgyIB1AAIAAAygAlDpgIAAgyID7AAIAAAyg");
	this.shape.setTransform(-90.5,-27.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-163.3,-92.9,145.60000000000002,131.7);


(lib.shape23 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("AngENIAAhDIA4AAIAABDgAngiAIAAiNIDgAAIAAAzIirAAIAABagAFsjaIAAgzIB1AAIAAAzgAhMjaIAAgzID6AAIAAAzg");
	this.shape.setTransform(-115.2,-66);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-163.3,-92.9,96.20000000000002,53.900000000000006);


(lib.shape21 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("AngBGIAAiLIDgAAIAAAyIirAAIAABZgAFsgTIAAgyIB1AAIAAAygAhMgTIAAgyID6AAIAAAyg");
	this.shape.setTransform(-115.2,-85.95);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-163.3,-92.9,96.20000000000002,14);


(lib.shape16 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("AJpS2IAAgwIRPAAIAA6RIknAAIACgmIFNAAIAHbngAEuS2IAAgwIB7AAIAAAwgAnBSEIAAm2IkEAAIAACZIgmAAIAAi0IFIAAIAAGwICvAAIAAAhgA7mSBIAAtHIMJAAIAAAYIrkAAIAAMHIDdAAIAAnOIDUAAIAADhIgjAAIAAjGIiRAAIAAHbgAlnFSIgBgYICIAAIABAYgAqrFSIAAgYICHAAIAAAYgAvIFSIAAgYIEFAAIAAAYgA6TnhIA4AAIAAIzIOsABIAAk/IHMAAIAAAtImpAAIAAEuIwHABgA6TqaIAAhDIA4AAIAABDgA6TwpIAAiMIDgAAIAAAyIiqAAIAABagAtGyDIAAgyIB1AAIAAAygAz/yDIAAgyID7AAIAAAyg");
	this.shape.setTransform(5.075,27.625);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-171.6,-92.9,353.4,241.1);


(lib.shape14 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("AJdosIAAERIh7AAIAAgrIBaAAIAAkEICyAAIAAAegAWRoOIEnAAIAAaSIxPAAIAAAvIR+AAIgH7mIlNAAgAGpSzIh7AAIAAgvIB7AAgAwEy3IAAAyA2zyFIAAgyAz/yFIAAgyAtGyFIAAgyArRy3IAAAyA6TqcIA4AAA5brgIg4AAA6TnjIA4AAA5bBPIOsACIAAk/IHMAAIAAAtImpAAIAAEtIwHABAokE3IAAAZIiHAAIAAgZArDE3IAAAZIkFAAIAAgZAjgE3IABAZIiIAAIgBgZAmjKwIAAGxICvAAIAAAgIjNAAIAAm1IkEAAIAACYIgmAAIAAi0gA7mE3IAANIIEiAAIAAnbICRAAIAADFIAjAAIAAjhIjUAAIAAHPIjdAAIAAsHILkAAIAAgZ");
	this.shape.setTransform(5.0761,27.875);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,0,0,3).p("AnPr3IjgAAIAACMIA2AAIAAhaICqAAAqvkfIAABDAp2jcIAAhDAggrFIj7AAAkbr3ID7AAACdr3IB2AAAETrFIh2AAAE4L4ICHAAAJ8L4ICHAAAAbL4IEFAAAAGL4IsIAAAp2gjIAAIzAqvIuIAApR");
	this.shape_1.setTransform(-94.55,-16.975);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FF0000").s().p("AiFCXIAAgqIBaAAIAAkDICxAAIAAAeIiQAAIAAEPg");
	this.shape_2.setTransform(66.675,-15.675);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AJpS2IAAgwIRPAAIAA6RIknAAIACgmIFNAAIAHbngAEuS2IAAgwIB7AAIAAAwgAnBSEIAAm2IkEAAIAACZIgmAAIAAi0IFIAAIAAGwICvAAIAAAhgA7mSBIAAtHIMJAAIAAAYIrkAAIAAMHIDdAAIAAnOIDUAAIAADhIgjAAIAAjGIiRAAIAAHbgAlnFSIgBgYICIAAIABAYgAqrFSIAAgYICHAAIAAAYgAvIFSIAAgYIEFAAIAAAYgA6TnhIA4AAIAAIzIOsABIAAk/IHMAAIAAAtImpAAIAAEuIwHABgA6TqaIAAhDIA4AAIAABDgA6TwpIAAiMIDgAAIAAAyIiqAAIAABagAtGyDIAAgyIB1AAIAAAygAz/yDIAAgyID7AAIAAAyg");
	this.shape_3.setTransform(5.075,27.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-172.6,-93.9,355.4,243.1);


(lib.shape3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(2,0,0,3).p("AtWAAIatAA");
	this.shape.setTransform(0.175,195.7);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	var sprImg_shape_1 = cjs.SpriteSheetUtils.extractFrame(ss["vital_op_fop_atlas_5"],14);
	sprImg_shape_1.onload = function(){
		this.shape_1.graphics.bf(sprImg_shape_1, null, new cjs.Matrix2D(0.828,0,0,0.828,-189.6,-192.1)).s().p("A9neBMAAAg8BMA7PAAAMAAAA8Bg")
	}.bind(this);
	this.shape_1.setTransform(0.05,-8.25);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-189.5,-200.3,379.2,397);


(lib.button99 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// レイヤー_2
	this.instance = new lib.CachedBmp_3();
	this.instance.setTransform(7.95,11.95,0.4999,0.4999);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4));

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2,1,1).p("AqJj5IUTAAQBkAAAABkIAAErQAABkhkAAI0TAAQhkAAAAhkIAAkrQAAhkBkAAg");
	this.shape.setTransform(75,25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000066").s().p("AqJD6QhkAAAAhkIAAkrQAAhkBkAAIUTAAQBkAAAABkIAAErQAABkhkAAg");
	this.shape_1.setTransform(75,25);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#0099FF").s().p("AqJD6QhkAAAAhkIAAkrQAAhkBkAAIUTAAQBkAAAABkIAAErQAABkhkAAg");
	this.shape_2.setTransform(75,25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).to({state:[{t:this.shape_2},{t:this.shape}]},1).to({state:[{t:this.shape_2},{t:this.shape}]},1).to({state:[{t:this.shape_2},{t:this.shape}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,152,52);


(lib.button94 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// レイヤー_2
	this.instance = new lib.CachedBmp_2();
	this.instance.setTransform(5,12,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_1();
	this.instance_1.setTransform(58,10,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(4));

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(2,1,1).p("AnAj5IOBAAQAyAAAAAyIAAGPQAAAygyAAIuBAAQgyAAAAgyIAAmPQAAgyAyAAg");
	this.shape.setTransform(50.0378,24.9974,1.0012,0.9999);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000066").s().p("AnAD6QgyAAAAgyIAAmPQAAgyAyAAIOBAAQAyAAAAAyIAAGPQAAAygyAAg");
	this.shape_1.setTransform(50.0378,24.9974,1.0012,0.9999);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#0099FF").s().p("AnAD6QgyAAAAgyIAAmPQAAgyAyAAIOBAAQAyAAAAAyIAAGPQAAAygyAAg");
	this.shape_2.setTransform(49.9878,24.9974,1.0012,0.9999);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape,p:{x:50.0378}}]}).to({state:[{t:this.shape_2},{t:this.shape,p:{x:49.9878}}]},1).to({state:[{t:this.shape_2},{t:this.shape,p:{x:49.9878}}]},1).to({state:[{t:this.shape_2},{t:this.shape,p:{x:49.9878}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,102,52);


(lib.button87 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// レイヤー_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AiVAAIEriVIAAErg");
	this.shape.setTransform(28,25);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	// Layer 4
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFFFF").ss(2,1,1).p("Aj5j5IHzAAQAyAAAAAyIAAGPQAAAygyAAInzAAQgyAAAAgyIAAmPQAAgyAyAAg");
	this.shape_1.setTransform(30.0418,25.0474,1.0013,0.9999);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000066").s().p("Aj5D6QgxAAAAgyIAAmPQAAgyAxAAIHzAAQAxAAAAAyIAAGPQAAAygxAAg");
	this.shape_2.setTransform(30.0418,25.0474,1.0013,0.9999);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#0099FF").s().p("Aj5D6QgxAAAAgyIAAmPQAAgyAxAAIHzAAQAxAAAAAyIAAGPQAAAygxAAg");
	this.shape_3.setTransform(29.9918,24.9974,1.0013,0.9999);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1,p:{x:30.0418,y:25.0474}}]}).to({state:[{t:this.shape_3},{t:this.shape_1,p:{x:29.9918,y:24.9974}}]},1).to({state:[{t:this.shape_3},{t:this.shape_1,p:{x:29.9918,y:24.9974}}]},1).to({state:[{t:this.shape_3},{t:this.shape_1,p:{x:29.9918,y:24.9974}}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,62.1,52.1);


(lib.button76 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// レイヤー_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhJBqQgmgrAAg+IgmAAIBBiWIBBCWIgpAAQAAAkAYAcQAVAZAhAAQAhAAAWgZQAYgcAAgkQAAgmgYgaQgUgZgggBIAAg8QA0AAAmAsQAnArAAA/QAAA+gnArQgmAsg2AAQg2AAgmgsg");
	this.shape.setTransform(19,20);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	// Layer 3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFFFF").ss(2,1,1).p("AizjHIFnAAQAUAAAAAUIAAFnQAAAUgUAAIlnAAQgUAAAAgUIAAlnQAAgUAUAAg");
	this.shape_1.setTransform(20,20);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000066").s().p("AizDIQgUAAAAgUIAAlnQAAgUAUAAIFnAAQAUAAAAAUIAAFnQAAAUgUAAg");
	this.shape_2.setTransform(20,20);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#0099FF").s().p("AizDIQgUAAAAgUIAAlnQAAgUAUAAIFnAAQAUAAAAAUIAAFnQAAAUgUAAg");
	this.shape_3.setTransform(20,20);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).to({state:[{t:this.shape_3},{t:this.shape_1}]},1).to({state:[{t:this.shape_3},{t:this.shape_1}]},1).to({state:[{t:this.shape_3},{t:this.shape_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,42,42);


(lib.button69 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// レイヤー_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAaBkIAAjHIBKAAIAADHgAhjBkIAAjHIBKAAIAADHg");
	this.shape.setTransform(20,20);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	// Layer 1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFFFF").ss(2,1,1).p("AizjHIFnAAQAUAAAAAUIAAFnQAAAUgUAAIlnAAQgUAAAAgUIAAlnQAAgUAUAAg");
	this.shape_1.setTransform(20,20);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000066").s().p("AizDIQgUAAAAgUIAAlnQAAgUAUAAIFnAAQAUAAAAAUIAAFnQAAAUgUAAg");
	this.shape_2.setTransform(20,20);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#0099FF").s().p("AizDIQgUAAAAgUIAAlnQAAgUAUAAIFnAAQAUAAAAAUIAAFnQAAAUgUAAg");
	this.shape_3.setTransform(20,20);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).to({state:[{t:this.shape_3},{t:this.shape_1}]},1).to({state:[{t:this.shape_3},{t:this.shape_1}]},1).to({state:[{t:this.shape_3},{t:this.shape_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,42,42);


(lib.button67 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// レイヤー_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AhjhjIDHBjIjHBkg");
	this.shape.setTransform(20,20);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(4));

	// Layer 1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FFFFFF").ss(2,1,1).p("AizjHIFnAAQAUAAAAAUIAAFnQAAAUgUAAIlnAAQgUAAAAgUIAAlnQAAgUAUAAg");
	this.shape_1.setTransform(20,20);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000066").s().p("AizDIQgUAAAAgUIAAlnQAAgUAUAAIFnAAQAUAAAAAUIAAFnQAAAUgUAAg");
	this.shape_2.setTransform(20,20);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#0099FF").s().p("AizDIQgUAAAAgUIAAlnQAAgUAUAAIFnAAQAUAAAAAUIAAFnQAAAUgUAAg");
	this.shape_3.setTransform(20,20);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).to({state:[{t:this.shape_3},{t:this.shape_1}]},1).to({state:[{t:this.shape_3},{t:this.shape_1}]},1).to({state:[{t:this.shape_3},{t:this.shape_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,42,42);


(lib.sprite295 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		/* stopAllSounds ();
		*/
	}
	this.frame_949 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(949).call(this.frame_949).wait(1));

	// Layer_17
	this.instance = new lib.text294("synched",0);
	this.instance.setTransform(-167.95,-18.55);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(668).to({_off:false},0).to({alpha:0.9492},18).wait(1).to({alpha:1},0).wait(263));

	// Layer_16
	this.instance_1 = new lib.shape293("synched",0);
	this.instance_1.setTransform(-4.65,-13.4);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(668).to({_off:false},0).to({alpha:0.9492},18).wait(1).to({alpha:1},0).wait(263));

	// Masked_Layer_22___14
	this.instance_2 = new lib.text290("synched",0);
	this.instance_2.setTransform(-745.95,-74.45,0.9999,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(950));

	// Masked_Layer_19___14
	this.instance_3 = new lib.text288("synched",0);
	this.instance_3.setTransform(-744.45,-174.05,0.9999,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(950));

	// Masked_Layer_15___14
	this.instance_4 = new lib.text286("synched",0);
	this.instance_4.setTransform(-746,-206.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(950));

	// Layer_13
	this.instance_5 = new lib.text285("synched",0);
	this.instance_5.setTransform(-143.2,-182.65,1.0002,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(668).to({startPosition:0},0).to({alpha:0},19).to({_off:true},1).wait(262));

	// Layer_12
	this.instance_6 = new lib.shape284("synched",0);
	this.instance_6.setTransform(-7.5,-8.85);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(668).to({startPosition:0},0).to({alpha:0},19).to({_off:true},1).wait(262));

	// Layer_11
	this.instance_7 = new lib.text283("synched",0);
	this.instance_7.setTransform(74.65,20.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(668).to({x:72.65},0).to({alpha:0},19).to({_off:true},1).wait(262));

	// Layer_10
	this.instance_8 = new lib.text282("synched",0);
	this.instance_8.setTransform(-23.35,-53.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(668).to({startPosition:0},0).to({alpha:0},19).to({_off:true},1).wait(262));

	// Layer_9
	this.instance_9 = new lib.text281("synched",0);
	this.instance_9.setTransform(-131.4,-53.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(668).to({startPosition:0},0).to({alpha:0},19).to({_off:true},1).wait(262));

	// Layer_8
	this.instance_10 = new lib.text280("synched",0);
	this.instance_10.setTransform(-265.45,-22.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(668).to({startPosition:0},0).to({alpha:0},19).to({_off:true},1).wait(262));

	// Layer_7
	this.instance_11 = new lib.text279("synched",0);
	this.instance_11.setTransform(-50.5,31.45);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(668).to({y:30.45},0).to({alpha:0},19).to({_off:true},1).wait(262));

	// Layer_6
	this.instance_12 = new lib.text279("synched",0);
	this.instance_12.setTransform(53.5,-131.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(668).to({y:-133.6},0).to({alpha:0},19).to({_off:true},1).wait(262));

	// Layer_5
	this.instance_13 = new lib.text278("synched",0);
	this.instance_13.setTransform(-27.5,-63.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(668).to({startPosition:0},0).to({alpha:0},19).to({_off:true},1).wait(262));

	// Layer_4
	this.instance_14 = new lib.text277("synched",0);
	this.instance_14.setTransform(-141.55,-85.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(668).to({startPosition:0},0).to({alpha:0},19).to({_off:true},1).wait(262));

	// Layer_3
	this.instance_15 = new lib.shape276("synched",0);
	this.instance_15.setTransform(-7.5,-8.85);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(668).to({startPosition:0},0).to({alpha:0},19).to({_off:true},1).wait(262));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-750,-210.3,1014.2,395.6);


(lib.sprite274 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		/* stopAllSounds ();
		*/
	}
	this.frame_2198 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2198).call(this.frame_2198).wait(1));

	// Masked_Layer_17___7
	this.instance = new lib.text273("synched",0);
	this.instance.setTransform(-724,83);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2199));

	// Masked_Layer_16___7
	this.instance_1 = new lib.text272("synched",0);
	this.instance_1.setTransform(-745.5,83);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2199));

	// Masked_Layer_15___7
	this.instance_2 = new lib.text271("synched",0);
	this.instance_2.setTransform(-746,-159.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(2199));

	// Masked_Layer_14___7
	this.instance_3 = new lib.text270("synched",0);
	this.instance_3.setTransform(-725,36);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(2199));

	// Masked_Layer_13___7
	this.instance_4 = new lib.text236("synched",0);
	this.instance_4.setTransform(-745.5,36);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(2199));

	// Masked_Layer_12___7
	this.instance_5 = new lib.text268("synched",0);
	this.instance_5.setTransform(-725,-82);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(2199));

	// Masked_Layer_11___7
	this.instance_6 = new lib.text234("synched",0);
	this.instance_6.setTransform(-745.5,-82);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(2199));

	// Masked_Layer_10___7
	this.instance_7 = new lib.text267("synched",0);
	this.instance_7.setTransform(-725,-134);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(2199));

	// Masked_Layer_9___7
	this.instance_8 = new lib.text232("synched",0);
	this.instance_8.setTransform(-745.5,-134);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(2199));

	// Masked_Layer_8___7
	this.instance_9 = new lib.text261("synched",0);
	this.instance_9.setTransform(-745.6,-206.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(2199));

	// Layer_6
	this.instance_10 = new lib.text260("synched",0);
	this.instance_10.setTransform(202.45,152.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(2199));

	// Layer_5
	this.instance_11 = new lib.shape259("synched",0);
	this.instance_11.setTransform(-7.5,-8.85);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(2199));

	// Layer_4
	this.instance_12 = new lib.text258("synched",0);
	this.instance_12.setTransform(-31.25,-22);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(2199));

	// Layer_3
	this.instance_13 = new lib.shape257("synched",0);
	this.instance_13.setTransform(-7.5,-8.85);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(2199));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-750,-212,974,409.2);


(lib.sprite266 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		/* stopAllSounds ();
		*/
	}
	this.frame_940 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(940).call(this.frame_940).wait(1));

	// Masked_Layer_15___7
	this.instance = new lib.text265("synched",0);
	this.instance.setTransform(-746,-165.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(941));

	// Masked_Layer_14___7
	this.instance_1 = new lib.text264("synched",0);
	this.instance_1.setTransform(-725,-14);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(941));

	// Masked_Layer_13___7
	this.instance_2 = new lib.text236("synched",0);
	this.instance_2.setTransform(-745.5,-14);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(941));

	// Masked_Layer_12___7
	this.instance_3 = new lib.text263("synched",0);
	this.instance_3.setTransform(-725,-74);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(941));

	// Masked_Layer_11___7
	this.instance_4 = new lib.text234("synched",0);
	this.instance_4.setTransform(-745.5,-74);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(941));

	// Masked_Layer_10___7
	this.instance_5 = new lib.text262("synched",0);
	this.instance_5.setTransform(-725,-134);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(941));

	// Masked_Layer_9___7
	this.instance_6 = new lib.text232("synched",0);
	this.instance_6.setTransform(-745.5,-134);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(941));

	// Masked_Layer_8___7
	this.instance_7 = new lib.text261("synched",0);
	this.instance_7.setTransform(-745.6,-206.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(941));

	// Layer_6
	this.instance_8 = new lib.text260("synched",0);
	this.instance_8.setTransform(202.45,152.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(941));

	// Layer_5
	this.instance_9 = new lib.shape259("synched",0);
	this.instance_9.setTransform(-7.5,-8.85);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(941));

	// Layer_4
	this.instance_10 = new lib.text258("synched",0);
	this.instance_10.setTransform(-31.25,-22);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(941));

	// Layer_3
	this.instance_11 = new lib.shape257("synched",0);
	this.instance_11.setTransform(-7.5,-8.85);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(941));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-750,-212,974,409.2);


(lib.sprite214 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.shape213("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite214, new cjs.Rectangle(-228,-181.9,456,363.9), null);


(lib.sprite211 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		/* stopAllSounds ();
		*/
	}
	this.frame_644 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(644).call(this.frame_644).wait(1));

	// Masked_Layer_10___7
	this.instance = new lib.text210("synched",0);
	this.instance.setTransform(-745.6,-80.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(645));

	// Masked_Layer_9___7
	this.instance_1 = new lib.text209("synched",0);
	this.instance_1.setTransform(-745.6,-206.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(645));

	// Masked_Layer_8___7
	this.instance_2 = new lib.text208("synched",0);
	this.instance_2.setTransform(-746,-170.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(645));

	// Layer_6
	this.instance_3 = new lib.text207("synched",0);
	this.instance_3.setTransform(-31.35,-184.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(645));

	// Layer_5
	this.instance_4 = new lib.shape206("synched",0);
	this.instance_4.setTransform(-9.35,-14.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(645));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-750,-210.7,967.4,392.2);


(lib.sprite203 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		/* stopAllSounds ();
		*/
	}
	this.frame_1035 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1035).call(this.frame_1035).wait(1));

	// Masked_Layer_6___4
	this.instance = new lib.text195("synched",0);
	this.instance.setTransform(-745.6,-206.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1036));

	// Masked_Layer_5___4
	this.instance_1 = new lib.text202("synched",0);
	this.instance_1.setTransform(-746,-170.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1036));

	// Layer_3
	this.instance_2 = new lib.text201("synched",0);
	this.instance_2.setTransform(-180.3,136.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1036));

	// Layer_2
	this.instance_3 = new lib.shape200("synched",0);
	this.instance_3.setTransform(-7.5,-8.85);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1036));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-750,-213.3,963,407.9);


(lib.sprite193 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_14
	this.instance = new lib.text192("synched",0);
	this.instance.setTransform(-75.1,-157.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_13
	this.instance_1 = new lib.text191("synched",0);
	this.instance_1.setTransform(-160.95,-157.35);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_12
	this.instance_2 = new lib.text190("synched",0);
	this.instance_2.setTransform(80.75,-67.85);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer_11
	this.instance_3 = new lib.text189("synched",0);
	this.instance_3.setTransform(34.05,-97.95);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	// Layer_10
	this.instance_4 = new lib.text188("synched",0);
	this.instance_4.setTransform(3.45,-109.45);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	// Layer_9
	this.instance_5 = new lib.text187("synched",0);
	this.instance_5.setTransform(-33,-98.35);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

	// Layer_8
	this.instance_6 = new lib.text186("synched",0);
	this.instance_6.setTransform(-113.95,-174.15,1,1.0035);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1));

	// Layer_7
	this.instance_7 = new lib.text185("synched",0);
	this.instance_7.setTransform(-202.5,-173.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1));

	// Layer_6
	this.instance_8 = new lib.text184("synched",0);
	this.instance_8.setTransform(-249.9,-113.95);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1));

	// Layer_5
	this.instance_9 = new lib.shape183("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite193, new cjs.Rectangle(-233.4,-184.5,473.1,369.7), null);


(lib.sprite168 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_6
	this.instance = new lib.text167("synched",0);
	this.instance.setTransform(-102.35,177.25);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_5
	this.instance_1 = new lib.shape166("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_4
	this.instance_2 = new lib.text165("synched",0);
	this.instance_2.setTransform(-102.35,3.45);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer_3
	this.instance_3 = new lib.shape164("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite168, new cjs.Rectangle(-133,-191.3,266,393.70000000000005), null);


(lib.sprite136 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.shape135("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite136, new cjs.Rectangle(-3.5,-3.3,7,6.699999999999999), null);


(lib.sprite82 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		MoveSlider();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// Layer_1
	this.instance = new lib.shape79("synched",0);
	this.instance.setTransform(0,0,1.0064,1.0012);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5,-15,10.1,30);


(lib.sprite78 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.button76();
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.button76(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite78, new cjs.Rectangle(-1,-1,42,42), null);


(lib.sprite71 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.button67();
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.button67(), 3);

	this.instance_1 = new lib.button69();
	new cjs.ButtonHelper(this.instance_1, 0, 1, 2, false, new lib.button69(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,42.1,42.1);


(lib.sprite66 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_10
	this.instance = new lib.text13("synched",0);
	this.instance.setTransform(-80.75,-145.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_9
	this.instance_1 = new lib.text12("synched",0);
	this.instance_1.setTransform(62.3,-5.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_8
	this.instance_2 = new lib.text11("synched",0);
	this.instance_2.setTransform(-32.35,13.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer_7
	this.instance_3 = new lib.text10("synched",0);
	this.instance_3.setTransform(-3.95,110.85);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	// Layer_6
	this.instance_4 = new lib.text9("synched",0);
	this.instance_4.setTransform(-179.15,71.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	// Layer_5
	this.instance_5 = new lib.text8("synched",0);
	this.instance_5.setTransform(-162.85,-35.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

	// Layer_4
	this.instance_6 = new lib.text7("synched",0);
	this.instance_6.setTransform(41.05,-166.85);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1));

	// Layer_3
	this.instance_7 = new lib.text5("synched",0);
	this.instance_7.setTransform(-51.65,182);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1));

	// Layer_2
	this.instance_8 = new lib.shape65("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite66, new cjs.Rectangle(-189.5,-200.3,379.2,411.6), null);


(lib.sprite64 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.instance = new lib.text63("synched",0);
	this.instance.setTransform(-49.5,186.05);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_2
	this.instance_1 = new lib.shape62("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite64, new cjs.Rectangle(-223,-176,451,392.4), null);


(lib.sprite227 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		/* stopAllSounds ();
		*/
	}
	this.frame_1346 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1346).call(this.frame_1346).wait(1));

	// Masked_Layer_27___25
	this.instance = new lib.text216("synched",0);
	this.instance.setTransform(-745.6,-206.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1347));

	// Masked_Layer_26___25
	this.instance_1 = new lib.text215("synched",0);
	this.instance_1.setTransform(-746,-170.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1347));

	// Layer_23
	this.instance_2 = new lib.sprite136();
	this.instance_2.setTransform(-66.25,-112.55,1.3545,1.3545,0,38.5229,-141.4771);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(599).to({_off:false},0).to({alpha:0.9297},14).wait(1).to({alpha:1},0).wait(345).to({alpha:0.0508},19).wait(1).to({alpha:0},0).wait(368));

	// Layer_22
	this.instance_3 = new lib.shape225("synched",0);
	this.instance_3.setTransform(-4.45,-3.95);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(599).to({_off:false},0).to({alpha:0.9297},14).wait(1).to({alpha:1},0).to({startPosition:0},345).to({alpha:0.0508},19).wait(1).to({alpha:0},0).wait(368));

	// Layer_20
	this.instance_4 = new lib.sprite136();
	this.instance_4.setTransform(-66.25,70.5,1.3545,1.3545,0,38.5229,-141.4771);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(599).to({_off:false},0).to({alpha:0.9297},14).wait(1).to({alpha:1},0).wait(345).to({alpha:0.0508},19).wait(1).to({alpha:0},0).wait(368));

	// Layer_19
	this.instance_5 = new lib.shape224("synched",0);
	this.instance_5.setTransform(-4.45,-3.95);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(599).to({_off:false},0).to({alpha:0.9297},14).wait(1).to({alpha:1},0).to({startPosition:0},345).to({alpha:0.0508},19).wait(1).to({alpha:0},0).wait(368));

	// Layer_18
	this.instance_6 = new lib.text223("synched",0);
	this.instance_6.setTransform(-209.7,146.9);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(599).to({_off:false},0).to({alpha:0.9297},14).wait(1).to({alpha:1},0).to({startPosition:0},345).to({alpha:0.0508},19).wait(1).to({alpha:0},0).wait(368));

	// Layer_17
	this.instance_7 = new lib.shape222("synched",0);
	this.instance_7.setTransform(-4.45,-3.95);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(599).to({_off:false},0).to({alpha:0.9297},14).wait(1).to({alpha:1},0).wait(345).to({startPosition:0},0).to({alpha:0.0508},19).wait(1).to({alpha:0},0).wait(368));

	// Layer_13
	this.instance_8 = new lib.text192("synched",0);
	this.instance_8.setTransform(-86.1,-170);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(959).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(368));

	// Layer_12
	this.instance_9 = new lib.text191("synched",0);
	this.instance_9.setTransform(-166.15,-169.85);
	this.instance_9.alpha = 0;
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(959).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(368));

	// Layer_11
	this.instance_10 = new lib.text190("synched",0);
	this.instance_10.setTransform(60.15,-87.35);
	this.instance_10.alpha = 0;
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(959).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(368));

	// Layer_10
	this.instance_11 = new lib.text189("synched",0);
	this.instance_11.setTransform(17.65,-113.95);
	this.instance_11.alpha = 0;
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(959).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(368));

	// Layer_9
	this.instance_12 = new lib.text188("synched",0);
	this.instance_12.setTransform(-11.55,-121.95);
	this.instance_12.alpha = 0;
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(959).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(368));

	// Layer_8
	this.instance_13 = new lib.sprite136();
	this.instance_13.setTransform(-34.1,11.1,1.3545,1.3545,0,38.5229,-141.4771);
	this.instance_13.alpha = 0;
	this.instance_13._off = true;

	this.instance_14 = new lib.text187("synched",0);
	this.instance_14.setTransform(-41,-110.85);
	this.instance_14.alpha = 0;
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(400).to({_off:false},0).to({alpha:0.9492},17).wait(1).to({alpha:1},0).to({_off:true},196).wait(733));
	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(959).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(368));

	// Layer_7
	this.instance_15 = new lib.shape220("synched",0);
	this.instance_15.setTransform(-11.1,-9.35);
	this.instance_15.alpha = 0;
	this.instance_15._off = true;

	this.instance_16 = new lib.text186("synched",0);
	this.instance_16.setTransform(-121.95,-186.65,1,1.0035);
	this.instance_16.alpha = 0;
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(400).to({_off:false},0).to({alpha:0.9492},17).wait(1).to({alpha:1},0).to({_off:true},196).wait(733));
	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(959).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(368));

	// Layer_6
	this.instance_17 = new lib.text219("synched",0);
	this.instance_17.setTransform(-196.35,54.1);
	this.instance_17.alpha = 0;
	this.instance_17._off = true;

	this.instance_18 = new lib.text185("synched",0);
	this.instance_18.setTransform(-204.95,-189.65);
	this.instance_18.alpha = 0;
	this.instance_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(400).to({_off:false},0).to({alpha:0.9492},17).wait(1).to({alpha:1},0).to({_off:true},196).wait(733));
	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(959).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(368));

	// Layer_5
	this.instance_19 = new lib.shape218("synched",0);
	this.instance_19.setTransform(-11.1,-9.35);
	this.instance_19.alpha = 0;
	this.instance_19._off = true;

	this.instance_20 = new lib.text184("synched",0);
	this.instance_20.setTransform(-250.9,-126.45);
	this.instance_20.alpha = 0;
	this.instance_20._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(400).to({_off:false},0).to({alpha:0.9492},17).wait(1).to({alpha:1},0).to({_off:true},196).wait(733));
	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(959).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(368));

	// Layer_4
	this.instance_21 = new lib.shape226("synched",0);
	this.instance_21.setTransform(-8,-12.5);
	this.instance_21.alpha = 0;
	this.instance_21._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(959).to({_off:false},0).to({alpha:0.9492},19).wait(1).to({alpha:1},0).wait(368));

	// Layer_1
	this.instance_22 = new lib.sprite214();
	this.instance_22.setTransform(-5.55,-6.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(400).to({alpha:0},18).to({_off:true},1).wait(928));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-750,-218.3,981.9,412.1);


(lib.sprite198 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		/* stopAllSounds ();
		*/
	}
	this.frame_1552 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1552).call(this.frame_1552).wait(1));

	// Masked_Layer_20___16
	this.instance = new lib.text197("synched",0);
	this.instance.setTransform(-746,66.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1553));

	// Masked_Layer_19___16
	this.instance_1 = new lib.text196("synched",0);
	this.instance_1.setTransform(-746,-177.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1553));

	// Masked_Layer_18___16
	this.instance_2 = new lib.text195("synched",0);
	this.instance_2.setTransform(-745.6,-206.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1553));

	// Masked_Layer_17___16
	this.instance_3 = new lib.text194("synched",0);
	this.instance_3.setTransform(-746,-23.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1553));

	// Layer_1
	this.instance_4 = new lib.sprite193();
	this.instance_4.setTransform(-7.95,-4.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1553));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-750,-210,981.8,391);


(lib.sprite179 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_16
	this.instance = new lib.sprite136();
	this.instance.setTransform(52.6,111.65,1.3544,1.3544,0,38.5233,-141.4767);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_15
	this.instance_1 = new lib.shape178("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_14
	this.instance_2 = new lib.text177("synched",0);
	this.instance_2.setTransform(-245,151.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer_13
	this.instance_3 = new lib.shape176("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	// Layer_11
	this.instance_4 = new lib.sprite136();
	this.instance_4.setTransform(-111,100.5,1.3544,1.3544,0,-21.4769,158.5231);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	// Layer_10
	this.instance_5 = new lib.shape175("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

	// Layer_8
	this.instance_6 = new lib.sprite136();
	this.instance_6.setTransform(83.45,-90.2,1.3544,1.3544,0,-21.4769,158.5231);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1));

	// Layer_7
	this.instance_7 = new lib.shape174("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1));

	// Layer_6
	this.instance_8 = new lib.text173("synched",0);
	this.instance_8.setTransform(29.8,-35.55);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1));

	// Layer_5
	this.instance_9 = new lib.shape172("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite179, new cjs.Rectangle(-245.9,-193.8,491.9,402.1), null);


(lib.sprite161 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_14
	this.instance = new lib.sprite136();
	this.instance.setTransform(-138.9,19.5,1.3544,1.3544,0,23.5234,-156.4766);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_13
	this.instance_1 = new lib.shape160("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_12
	this.instance_2 = new lib.text159("synched",0);
	this.instance_2.setTransform(-179.15,140.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer_11
	this.instance_3 = new lib.shape158("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	// Layer_9
	this.instance_4 = new lib.sprite136();
	this.instance_4.setTransform(27.25,84.25,1.3545,1.3545,0,53.5231,-126.4769);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	// Layer_8
	this.instance_5 = new lib.shape157("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

	// Layer_7
	this.instance_6 = new lib.text156("synched",0);
	this.instance_6.setTransform(-259.45,54.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1));

	// Layer_6
	this.instance_7 = new lib.shape155("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1));

	// Layer_5
	this.instance_8 = new lib.text154("synched",0);
	this.instance_8.setTransform(-34.65,-185.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1));

	// Layer_4
	this.instance_9 = new lib.shape153("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite161, new cjs.Rectangle(-227.7,-206.5,497.8,383.7), null);


(lib.sprite150 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_28
	this.instance = new lib.text149("synched",0);
	this.instance.setTransform(-254.35,88.45);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_27
	this.instance_1 = new lib.shape148("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_26
	this.instance_2 = new lib.text147("synched",0);
	this.instance_2.setTransform(-16.2,145.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer_25
	this.instance_3 = new lib.shape146("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	// Layer_23
	this.instance_4 = new lib.sprite136();
	this.instance_4.setTransform(159.15,-120.75,1.3545,1.3545,0,23.5226,-156.4771);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	// Layer_22
	this.instance_5 = new lib.shape145("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

	// Layer_21
	this.instance_6 = new lib.text144("synched",0);
	this.instance_6.setTransform(80.65,-67.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1));

	// Layer_20
	this.instance_7 = new lib.shape143("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1));

	// Layer_19
	this.instance_8 = new lib.text142("synched",0);
	this.instance_8.setTransform(-12.1,-110.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1));

	// Layer_18
	this.instance_9 = new lib.shape141("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1));

	// Layer_16
	this.instance_10 = new lib.sprite136();
	this.instance_10.setTransform(0.65,-64.45,1.3545,1.3545,0,-126.4769,53.5231);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1));

	// Layer_15
	this.instance_11 = new lib.shape137("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1));

	// Layer_14
	this.instance_12 = new lib.text140("synched",0);
	this.instance_12.setTransform(-129.5,-114.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1));

	// Layer_13
	this.instance_13 = new lib.shape139("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1));

	// Layer_11
	this.instance_14 = new lib.sprite136();
	this.instance_14.setTransform(-148.55,-102,1.3545,1.3545,0,-96.4762,83.5238);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(1));

	// Layer_10
	this.instance_15 = new lib.shape138("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(1));

	// Layer_8
	this.instance_16 = new lib.sprite136();
	this.instance_16.setTransform(-135.95,-64.45,1.3545,1.3545,0,-126.4769,53.5231);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(1));

	// Layer_7
	this.instance_17 = new lib.shape137("synched",0);
	this.instance_17.setTransform(-136.6,0);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(1));

	// Layer_5
	this.instance_18 = new lib.sprite136();
	this.instance_18.setTransform(-109.8,136.75,1.3544,1.3544,0,113.5234,-66.4766);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(1));

	// Layer_4
	this.instance_19 = new lib.shape134("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite150, new cjs.Rectangle(-236.6,-199.2,472.6,374.29999999999995), null);


(lib.sprite67 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		/* stopAllSounds ();
		*/
	}
	this.frame_2989 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2989).call(this.frame_2989).wait(1));

	// Layer_17
	this.instance = new lib.text49("synched",0);
	this.instance.setTransform(-107.6,-207.45);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(846).to({_off:false},0).to({alpha:0.9414},16).wait(1).to({alpha:1},0).to({_off:true},725).wait(1402));

	// Masked_Layer_18___16
	this.instance_1 = new lib.text19("synched",0);
	this.instance_1.setTransform(-745.6,-206.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2990));

	// Masked_Layer_17___16
	this.instance_2 = new lib.text18("synched",0);
	this.instance_2.setTransform(-746,-170.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(2990));

	// Layer_16
	this.instance_3 = new lib.shape48("synched",0);
	this.instance_3.setTransform(-7.2,-36.65);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(846).to({_off:false},0).to({alpha:0.9414},16).wait(1).to({alpha:1},0).to({_off:true},725).wait(1402));

	// Layer_15
	this.instance_4 = new lib.shape21("synched",0);
	this.instance_4.setTransform(4.6,-14.8);

	this.instance_5 = new lib.shape23("synched",0);
	this.instance_5.setTransform(4.6,-14.8);

	this.instance_6 = new lib.shape25("synched",0);
	this.instance_6.setTransform(4.6,-14.8);

	this.instance_7 = new lib.shape27("synched",0);
	this.instance_7.setTransform(4.6,-14.8);

	this.instance_8 = new lib.shape30("synched",0);
	this.instance_8.setTransform(4.6,-14.8);

	this.instance_9 = new lib.shape33("synched",0);
	this.instance_9.setTransform(4.6,-14.8);

	this.instance_10 = new lib.shape16("synched",0);
	this.instance_10.setTransform(4.6,-14.8);
	this.instance_10._off = true;

	this.instance_11 = new lib.text55("synched",0);
	this.instance_11.setTransform(-241,-57.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_4}]},32).to({state:[{t:this.instance_5}]},31).to({state:[{t:this.instance_6}]},19).to({state:[{t:this.instance_7}]},31).to({state:[{t:this.instance_8}]},49).to({state:[{t:this.instance_9}]},20).to({state:[{t:this.instance_10}]},20).to({state:[{t:this.instance_10}]},629).to({state:[{t:this.instance_10}]},14).to({state:[]},1).to({state:[{t:this.instance_11}]},67).to({state:[]},675).wait(1402));
	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(202).to({_off:false},0).wait(629).to({startPosition:0},0).to({alpha:0},14).to({_off:true},1).wait(2144));

	// Layer_14
	this.instance_12 = new lib.text55("synched",0);
	this.instance_12.setTransform(-241,-57.85);

	this.instance_13 = new lib.shape54("synched",0);
	this.instance_13.setTransform(-7.2,-36.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_12}]},873).to({state:[]},10).to({state:[{t:this.instance_12}]},10).to({state:[]},10).to({state:[{t:this.instance_13}]},10).to({state:[]},675).wait(1402));

	// Layer_13
	this.instance_14 = new lib.shape54("synched",0);
	this.instance_14.setTransform(-7.2,-36.65);

	this.instance_15 = new lib.text53("synched",0);
	this.instance_15.setTransform(-185.6,11.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_14}]},873).to({state:[]},10).to({state:[{t:this.instance_14}]},10).to({state:[]},10).to({state:[{t:this.instance_15}]},10).to({state:[]},675).wait(1402));

	// Mask_Layer_12 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_0 = new cjs.Graphics().p("AgsBiIAAjDIBZAAIAADDg");
	var mask_graphics_1 = new cjs.Graphics().p("AhBBhIAAjBICDAAIAADBg");
	var mask_graphics_2 = new cjs.Graphics().p("AhWBhIAAjBICtAAIAADBg");
	var mask_graphics_3 = new cjs.Graphics().p("AhqBiIAAjDIDVAAIAADDg");
	var mask_graphics_4 = new cjs.Graphics().p("Ah/BhIAAjCID/AAIAADCg");
	var mask_graphics_5 = new cjs.Graphics().p("AiUBhIAAjCIEpAAIAADCg");
	var mask_graphics_6 = new cjs.Graphics().p("AipBiIAAjCIFTAAIAADCg");
	var mask_graphics_7 = new cjs.Graphics().p("Ai+BhIAAjCIF9AAIAADCg");
	var mask_graphics_8 = new cjs.Graphics().p("AjSBhIAAjCIGmAAIAADCg");
	var mask_graphics_9 = new cjs.Graphics().p("AjnBhIAAjBIHPAAIAADBg");
	var mask_graphics_10 = new cjs.Graphics().p("Aj8BhIAAjBIH5AAIAADBg");
	var mask_graphics_11 = new cjs.Graphics().p("AkRBiIAAjDIIjAAIAADDg");
	var mask_graphics_12 = new cjs.Graphics().p("AkmBhIAAjBIJNAAIAADBg");
	var mask_graphics_13 = new cjs.Graphics().p("Ak6BhIAAjBIJ1AAIAADBg");
	var mask_graphics_14 = new cjs.Graphics().p("AlPBiIAAjDIKfAAIAADDg");
	var mask_graphics_15 = new cjs.Graphics().p("AlkBhIAAjBILJAAIAADBg");
	var mask_graphics_16 = new cjs.Graphics().p("Al5BhIAAjBILzAAIAADBg");
	var mask_graphics_17 = new cjs.Graphics().p("AmOBiIAAjDIMdAAIAADDg");
	var mask_graphics_18 = new cjs.Graphics().p("AmiBhIAAjCINFAAIAADCg");
	var mask_graphics_19 = new cjs.Graphics().p("Am3BhIAAjCINvAAIAADCg");
	var mask_graphics_20 = new cjs.Graphics().p("AnMBiIAAjCIOZAAIAADCg");
	var mask_graphics_21 = new cjs.Graphics().p("AnhBhIAAjCIPDAAIAADCg");
	var mask_graphics_22 = new cjs.Graphics().p("An2BhIAAjCIPtAAIAADCg");
	var mask_graphics_23 = new cjs.Graphics().p("AoLBhIAAjBIQWAAIAADBg");
	var mask_graphics_24 = new cjs.Graphics().p("AofBhIAAjBIQ/AAIAADBg");
	var mask_graphics_25 = new cjs.Graphics().p("Ao0BiIAAjDIRpAAIAADDg");
	var mask_graphics_26 = new cjs.Graphics().p("ApJBhIAAjBISTAAIAADBg");
	var mask_graphics_27 = new cjs.Graphics().p("ApeBhIAAjBIS9AAIAADBg");
	var mask_graphics_28 = new cjs.Graphics().p("ApzBiIAAjDITnAAIAADDg");
	var mask_graphics_29 = new cjs.Graphics().p("AqIBhIAAjBIUQAAIAADBg");
	var mask_graphics_30 = new cjs.Graphics().p("AqcBhIAAjBIU5AAIAADBg");
	var mask_graphics_31 = new cjs.Graphics().p("AqxBiIAAjDIVjAAIAADDg");
	var mask_graphics_32 = new cjs.Graphics().p("AqxBiIAAjDIVjAAIAADDg");
	var mask_graphics_33 = new cjs.Graphics().p("AqdB1IAAjpIU7AAIAADpg");
	var mask_graphics_34 = new cjs.Graphics().p("AqKCJIAAkRIUVAAIAAERg");
	var mask_graphics_35 = new cjs.Graphics().p("Ap2CdIAAk5ITtAAIAAE5g");
	var mask_graphics_36 = new cjs.Graphics().p("ApiCwIAAlgITFAAIAAFgg");
	var mask_graphics_37 = new cjs.Graphics().p("ApPDEIAAmHISfAAIAAGHg");
	var mask_graphics_38 = new cjs.Graphics().p("Ao7DYIAAmvIR3AAIAAGvg");
	var mask_graphics_39 = new cjs.Graphics().p("AonDsIAAnXIRPAAIAAHXg");
	var mask_graphics_40 = new cjs.Graphics().p("AoUEAIAAn/IQpAAIAAH/g");
	var mask_graphics_41 = new cjs.Graphics().p("AoAETIAAolIQBAAIAAIlg");
	var mask_graphics_42 = new cjs.Graphics().p("AnsEnIAApNIPZAAIAAJNg");
	var mask_graphics_43 = new cjs.Graphics().p("AnZE7IAAp1IOzAAIAAJ1g");
	var mask_graphics_44 = new cjs.Graphics().p("AnFFOIAAqcIOLAAIAAKcg");
	var mask_graphics_45 = new cjs.Graphics().p("AmxFiIAArDINjAAIAALDg");
	var mask_graphics_46 = new cjs.Graphics().p("AmeF2IAArrIM9AAIAALrg");
	var mask_graphics_47 = new cjs.Graphics().p("AmKGKIAAsTIMVAAIAAMTg");
	var mask_graphics_48 = new cjs.Graphics().p("Al2GeIAAs7ILtAAIAAM7g");
	var mask_graphics_49 = new cjs.Graphics().p("AljGxIAAthILHAAIAANhg");
	var mask_graphics_50 = new cjs.Graphics().p("AlPHFIAAuJIKfAAIAAOJg");
	var mask_graphics_51 = new cjs.Graphics().p("Ak7HZIAAuxIJ3AAIAAOxg");
	var mask_graphics_52 = new cjs.Graphics().p("AkoHsIAAvYIJRAAIAAPYg");
	var mask_graphics_53 = new cjs.Graphics().p("AkUIAIAAv/IIpAAIAAP/g");
	var mask_graphics_54 = new cjs.Graphics().p("AkAIUIAAwnIIBAAIAAQng");
	var mask_graphics_55 = new cjs.Graphics().p("AjtIoIAAxPIHbAAIAARPg");
	var mask_graphics_56 = new cjs.Graphics().p("AjZI7IAAx2IGzAAIAAR2g");
	var mask_graphics_57 = new cjs.Graphics().p("AjFJPIAAydIGLAAIAASdg");
	var mask_graphics_58 = new cjs.Graphics().p("AiyJjIAAzFIFlAAIAATFg");
	var mask_graphics_59 = new cjs.Graphics().p("AieJ3IAAztIE9AAIAATtg");
	var mask_graphics_60 = new cjs.Graphics().p("AiKKLIAA0VIEVAAIAAUVg");
	var mask_graphics_61 = new cjs.Graphics().p("Ah3KeIAA07IDvAAIAAU7g");
	var mask_graphics_62 = new cjs.Graphics().p("AhjKyIAA1jIDHAAIAAVjg");
	var mask_graphics_63 = new cjs.Graphics().p("AhjKyIAA1jIDHAAIAAVjg");
	var mask_graphics_64 = new cjs.Graphics().p("AiPKyIAA1jIEfAAIAAVjg");
	var mask_graphics_65 = new cjs.Graphics().p("Ai7KyIAA1jIF3AAIAAVjg");
	var mask_graphics_66 = new cjs.Graphics().p("AjnKyIAA1jIHPAAIAAVjg");
	var mask_graphics_67 = new cjs.Graphics().p("AkUKyIAA1jIIpAAIAAVjg");
	var mask_graphics_68 = new cjs.Graphics().p("AlAKyIAA1jIKBAAIAAVjg");
	var mask_graphics_69 = new cjs.Graphics().p("AlsKyIAA1jILZAAIAAVjg");
	var mask_graphics_70 = new cjs.Graphics().p("AmYKyIAA1jIMxAAIAAVjg");
	var mask_graphics_71 = new cjs.Graphics().p("AnEKyIAA1jIOJAAIAAVjg");
	var mask_graphics_72 = new cjs.Graphics().p("AnwKyIAA1jIPhAAIAAVjg");
	var mask_graphics_73 = new cjs.Graphics().p("AodKyIAA1jIQ7AAIAAVjg");
	var mask_graphics_74 = new cjs.Graphics().p("ApJKyIAA1jISTAAIAAVjg");
	var mask_graphics_75 = new cjs.Graphics().p("Ap1KyIAA1jITrAAIAAVjg");
	var mask_graphics_76 = new cjs.Graphics().p("AqhKyIAA1jIVDAAIAAVjg");
	var mask_graphics_77 = new cjs.Graphics().p("ArNKyIAA1jIWbAAIAAVjg");
	var mask_graphics_78 = new cjs.Graphics().p("Ar5KyIAA1jIXzAAIAAVjg");
	var mask_graphics_79 = new cjs.Graphics().p("AsmKyIAA1jIZNAAIAAVjg");
	var mask_graphics_80 = new cjs.Graphics().p("AtSKyIAA1jIalAAIAAVjg");
	var mask_graphics_81 = new cjs.Graphics().p("At+KyIAA1jIb9AAIAAVjg");
	var mask_graphics_82 = new cjs.Graphics().p("At+KyIAA1jIb9AAIAAVjg");
	var mask_graphics_83 = new cjs.Graphics().p("AhXAvIAAhdICvAAIAABdg");
	var mask_graphics_84 = new cjs.Graphics().p("AhzAvIAAhdIDnAAIAABdg");
	var mask_graphics_85 = new cjs.Graphics().p("AiPAvIAAhdIEfAAIAABdg");
	var mask_graphics_86 = new cjs.Graphics().p("AirAvIAAhdIFYAAIAABdg");
	var mask_graphics_87 = new cjs.Graphics().p("AjIAvIAAhdIGRAAIAABdg");
	var mask_graphics_88 = new cjs.Graphics().p("AjkAvIAAhdIHJAAIAABdg");
	var mask_graphics_89 = new cjs.Graphics().p("AkAAvIAAhdIICAAIAABdg");
	var mask_graphics_90 = new cjs.Graphics().p("AkdAvIAAhdII7AAIAABdg");
	var mask_graphics_91 = new cjs.Graphics().p("Ak5AvIAAhdIJzAAIAABdg");
	var mask_graphics_92 = new cjs.Graphics().p("AlWAvIAAhdIKtAAIAABdg");
	var mask_graphics_93 = new cjs.Graphics().p("AlyAvIAAhdILlAAIAABdg");
	var mask_graphics_94 = new cjs.Graphics().p("AmPAvIAAhdIMfAAIAABdg");
	var mask_graphics_95 = new cjs.Graphics().p("AmrAvIAAhdINXAAIAABdg");
	var mask_graphics_96 = new cjs.Graphics().p("AnHAvIAAhdIOPAAIAABdg");
	var mask_graphics_97 = new cjs.Graphics().p("AnkAvIAAhdIPJAAIAABdg");
	var mask_graphics_98 = new cjs.Graphics().p("AoAAvIAAhdIQBAAIAABdg");
	var mask_graphics_99 = new cjs.Graphics().p("AodAvIAAhdIQ6AAIAABdg");
	var mask_graphics_100 = new cjs.Graphics().p("Ao5AvIAAhdIRzAAIAABdg");
	var mask_graphics_101 = new cjs.Graphics().p("ApVAvIAAhdISrAAIAABdg");
	var mask_graphics_102 = new cjs.Graphics().p("ApyAvIAAhdITkAAIAABdg");
	var mask_graphics_103 = new cjs.Graphics().p("AqOAvIAAhdIUdAAIAABdg");
	var mask_graphics_104 = new cjs.Graphics().p("AqqAvIAAhdIVVAAIAABdg");
	var mask_graphics_105 = new cjs.Graphics().p("ArHAvIAAhdIWOAAIAABdg");
	var mask_graphics_106 = new cjs.Graphics().p("ArjAvIAAhdIXHAAIAABdg");
	var mask_graphics_107 = new cjs.Graphics().p("Ar/AvIAAhdIX/AAIAABdg");
	var mask_graphics_108 = new cjs.Graphics().p("AscAvIAAhdIY4AAIAABdg");
	var mask_graphics_109 = new cjs.Graphics().p("As4AvIAAhdIZxAAIAABdg");
	var mask_graphics_110 = new cjs.Graphics().p("AtUAvIAAhdIapAAIAABdg");
	var mask_graphics_111 = new cjs.Graphics().p("AtxAvIAAhdIbjAAIAABdg");
	var mask_graphics_112 = new cjs.Graphics().p("AuNAvIAAhdIcbAAIAABdg");
	var mask_graphics_113 = new cjs.Graphics().p("AuND9IAAhfIcbAAIAABfg");
	var mask_graphics_114 = new cjs.Graphics().p("AhHAvIAAhdICPAAIAABdg");
	var mask_graphics_115 = new cjs.Graphics().p("AhHBJIAAiRICPAAIAACRg");
	var mask_graphics_116 = new cjs.Graphics().p("AhHBiIAAjDICPAAIAADDg");
	var mask_graphics_117 = new cjs.Graphics().p("AhHB8IAAj3ICPAAIAAD3g");
	var mask_graphics_118 = new cjs.Graphics().p("AhHCWIAAkqICPAAIAAEqg");
	var mask_graphics_119 = new cjs.Graphics().p("AhHCvIAAldICPAAIAAFdg");
	var mask_graphics_120 = new cjs.Graphics().p("AhHDJIAAmRICPAAIAAGRg");
	var mask_graphics_121 = new cjs.Graphics().p("AhHDiIAAnDICPAAIAAHDg");
	var mask_graphics_122 = new cjs.Graphics().p("AhHD8IAAn3ICPAAIAAH3g");
	var mask_graphics_123 = new cjs.Graphics().p("AhHEWIAAoqICPAAIAAIqg");
	var mask_graphics_124 = new cjs.Graphics().p("AhHEvIAApdICPAAIAAJdg");
	var mask_graphics_125 = new cjs.Graphics().p("AhHFJIAAqRICPAAIAAKRg");
	var mask_graphics_126 = new cjs.Graphics().p("AhHFiIAArDICPAAIAALDg");
	var mask_graphics_127 = new cjs.Graphics().p("AhHF8IAAr3ICPAAIAAL3g");
	var mask_graphics_128 = new cjs.Graphics().p("AhHGWIAAsrICPAAIAAMrg");
	var mask_graphics_129 = new cjs.Graphics().p("AhHGvIAAtdICPAAIAANdg");
	var mask_graphics_130 = new cjs.Graphics().p("AhHHJIAAuRICPAAIAAORg");
	var mask_graphics_131 = new cjs.Graphics().p("AhHHiIAAvDICPAAIAAPDg");
	var mask_graphics_132 = new cjs.Graphics().p("AhHHiIAAvDICPAAIAAPDg");
	var mask_graphics_133 = new cjs.Graphics().p("AhtHiIAAvDIDbAAIAAPDg");
	var mask_graphics_134 = new cjs.Graphics().p("AiUHiIAAvDIEpAAIAAPDg");
	var mask_graphics_135 = new cjs.Graphics().p("Ai6HiIAAvDIF1AAIAAPDg");
	var mask_graphics_136 = new cjs.Graphics().p("AjhHiIAAvDIHDAAIAAPDg");
	var mask_graphics_137 = new cjs.Graphics().p("AkIHiIAAvDIIQAAIAAPDg");
	var mask_graphics_138 = new cjs.Graphics().p("AkuHiIAAvDIJdAAIAAPDg");
	var mask_graphics_139 = new cjs.Graphics().p("AlVHiIAAvDIKqAAIAAPDg");
	var mask_graphics_140 = new cjs.Graphics().p("Al7HiIAAvDIL3AAIAAPDg");
	var mask_graphics_141 = new cjs.Graphics().p("AmiHiIAAvDINFAAIAAPDg");
	var mask_graphics_142 = new cjs.Graphics().p("AnIHiIAAvDIORAAIAAPDg");
	var mask_graphics_143 = new cjs.Graphics().p("AnvHiIAAvDIPfAAIAAPDg");
	var mask_graphics_144 = new cjs.Graphics().p("AoVHiIAAvDIQrAAIAAPDg");
	var mask_graphics_145 = new cjs.Graphics().p("Ao8HiIAAvDIR5AAIAAPDg");
	var mask_graphics_146 = new cjs.Graphics().p("ApiHiIAAvDITGAAIAAPDg");
	var mask_graphics_147 = new cjs.Graphics().p("AqJHiIAAvDIUTAAIAAPDg");
	var mask_graphics_148 = new cjs.Graphics().p("AqvHiIAAvDIVgAAIAAPDg");
	var mask_graphics_149 = new cjs.Graphics().p("ArWHiIAAvDIWtAAIAAPDg");
	var mask_graphics_150 = new cjs.Graphics().p("Ar9HiIAAvDIX7AAIAAPDg");
	var mask_graphics_151 = new cjs.Graphics().p("AsjHiIAAvDIZHAAIAAPDg");
	var mask_graphics_152 = new cjs.Graphics().p("AtKHiIAAvDIaVAAIAAPDg");
	var mask_graphics_153 = new cjs.Graphics().p("AtwHiIAAvDIbhAAIAAPDg");
	var mask_graphics_154 = new cjs.Graphics().p("AuXHiIAAvDIcvAAIAAPDg");
	var mask_graphics_155 = new cjs.Graphics().p("Au+HiIAAvDId8AAIAAPDg");
	var mask_graphics_156 = new cjs.Graphics().p("AvkHiIAAvDIfJAAIAAPDg");
	var mask_graphics_157 = new cjs.Graphics().p("AwLHiIAAvDMAgWAAAIAAPDg");
	var mask_graphics_158 = new cjs.Graphics().p("AwxHiIAAvDMAhjAAAIAAPDg");
	var mask_graphics_159 = new cjs.Graphics().p("AxYHiIAAvDMAixAAAIAAPDg");
	var mask_graphics_160 = new cjs.Graphics().p("Ax+HiIAAvDMAj9AAAIAAPDg");
	var mask_graphics_161 = new cjs.Graphics().p("AylHiIAAvDMAlLAAAIAAPDg");
	var mask_graphics_162 = new cjs.Graphics().p("AykKuIAAvDMAlJAAAIAAPDg");
	var mask_graphics_163 = new cjs.Graphics().p("AggAqIAAhTIBBAAIAABTg");
	var mask_graphics_164 = new cjs.Graphics().p("AhDAsIAAhXICHAAIAABXg");
	var mask_graphics_165 = new cjs.Graphics().p("AhnAtIAAhZIDPAAIAABZg");
	var mask_graphics_166 = new cjs.Graphics().p("AiKAvIAAhdIEVAAIAABdg");
	var mask_graphics_167 = new cjs.Graphics().p("AiuAwIAAhfIFcAAIAABfg");
	var mask_graphics_168 = new cjs.Graphics().p("AjRAxIAAhhIGjAAIAABhg");
	var mask_graphics_169 = new cjs.Graphics().p("Aj0AzIAAhlIHpAAIAABlg");
	var mask_graphics_170 = new cjs.Graphics().p("AkYA0IAAhnIIxAAIAABng");
	var mask_graphics_171 = new cjs.Graphics().p("Ak7A2IAAhqIJ3AAIAABqg");
	var mask_graphics_172 = new cjs.Graphics().p("AlfA3IAAhtIK/AAIAABtg");
	var mask_graphics_173 = new cjs.Graphics().p("AmCA4IAAhvIMFAAIAABvg");
	var mask_graphics_174 = new cjs.Graphics().p("AmmA6IAAhzINNAAIAABzg");
	var mask_graphics_175 = new cjs.Graphics().p("AnJA7IAAh1IOTAAIAAB1g");
	var mask_graphics_176 = new cjs.Graphics().p("AnsA8IAAh3IPZAAIAAB3g");
	var mask_graphics_177 = new cjs.Graphics().p("AoQA+IAAh7IQhAAIAAB7g");
	var mask_graphics_178 = new cjs.Graphics().p("AozA/IAAh9IRnAAIAAB9g");
	var mask_graphics_179 = new cjs.Graphics().p("ApXBAIAAh/ISvAAIAAB/g");
	var mask_graphics_180 = new cjs.Graphics().p("Ap6BCIAAiDIT1AAIAACDg");
	var mask_graphics_181 = new cjs.Graphics().p("AqdBDIAAiFIU8AAIAACFg");
	var mask_graphics_182 = new cjs.Graphics().p("AqdBDIAAiFIU8AAIAACFg");
	var mask_graphics_183 = new cjs.Graphics().p("AqNB0IAAjnIUbAAIAADng");
	var mask_graphics_184 = new cjs.Graphics().p("Ap8ClIAAlJIT5AAIAAFJg");
	var mask_graphics_185 = new cjs.Graphics().p("ApsDWIAAmrITZAAIAAGrg");
	var mask_graphics_186 = new cjs.Graphics().p("ApbEHIAAoMIS3AAIAAIMg");
	var mask_graphics_187 = new cjs.Graphics().p("ApKE4IAApuISVAAIAAJug");
	var mask_graphics_188 = new cjs.Graphics().p("Ao5FoIAArPIRzAAIAALPg");
	var mask_graphics_189 = new cjs.Graphics().p("AooGZIAAsxIRSAAIAAMxg");
	var mask_graphics_190 = new cjs.Graphics().p("AoYHKIAAuTIQxAAIAAOTg");
	var mask_graphics_191 = new cjs.Graphics().p("AoHH7IAAv1IQPAAIAAP1g");
	var mask_graphics_192 = new cjs.Graphics().p("An2IrIAAxVIPtAAIAARVg");
	var mask_graphics_193 = new cjs.Graphics().p("AnmJcIAAy3IPMAAIAAS3g");
	var mask_graphics_194 = new cjs.Graphics().p("AnVKNIAA0ZIOrAAIAAUZg");
	var mask_graphics_195 = new cjs.Graphics().p("AnEK+IAA17IOJAAIAAV7g");
	var mask_graphics_196 = new cjs.Graphics().p("Am0LuIAA3bINoAAIAAXbg");
	var mask_graphics_197 = new cjs.Graphics().p("AmjMfIAA49INHAAIAAY9g");
	var mask_graphics_198 = new cjs.Graphics().p("AmSNQIAA6fIMlAAIAAafg");
	var mask_graphics_199 = new cjs.Graphics().p("AmCOBIAA8BIMEAAIAAcBg");
	var mask_graphics_200 = new cjs.Graphics().p("AlxOyIAA9jILjAAIAAdjg");
	var mask_graphics_201 = new cjs.Graphics().p("AlgPjIAA/FILBAAIAAfFg");
	var mask_graphics_202 = new cjs.Graphics().p("AEFPjIAA/FILCAAIAAfFg");
	var mask_graphics_831 = new cjs.Graphics().p("AEFPjIAA/FILCAAIAAfFg");
	var mask_graphics_832 = new cjs.Graphics().p("AEFPjIAA/FILCAAIAAfFg");
	var mask_graphics_833 = new cjs.Graphics().p("AEFPjIAA/FILCAAIAAfFg");
	var mask_graphics_834 = new cjs.Graphics().p("AEFPjIAA/FILCAAIAAfFg");
	var mask_graphics_835 = new cjs.Graphics().p("AEFPjIAA/FILCAAIAAfFg");
	var mask_graphics_836 = new cjs.Graphics().p("AEFPjIAA/FILCAAIAAfFg");
	var mask_graphics_837 = new cjs.Graphics().p("AEFPjIAA/FILCAAIAAfFg");
	var mask_graphics_838 = new cjs.Graphics().p("AEFPjIAA/FILCAAIAAfFg");
	var mask_graphics_839 = new cjs.Graphics().p("AEFPjIAA/FILCAAIAAfFg");
	var mask_graphics_840 = new cjs.Graphics().p("AEFPjIAA/FILCAAIAAfFg");
	var mask_graphics_841 = new cjs.Graphics().p("AEFPjIAA/FILCAAIAAfFg");
	var mask_graphics_842 = new cjs.Graphics().p("AEFPjIAA/FILCAAIAAfFg");
	var mask_graphics_843 = new cjs.Graphics().p("AEFPjIAA/FILCAAIAAfFg");
	var mask_graphics_844 = new cjs.Graphics().p("AEFPjIAA/FILCAAIAAfFg");
	var mask_graphics_845 = new cjs.Graphics().p("AEFPjIAA/FILCAAIAAfFg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:mask_graphics_0,x:-43.3,y:-98.6}).wait(1).to({graphics:mask_graphics_1,x:-45.025,y:-98.65}).wait(1).to({graphics:mask_graphics_2,x:-46.75,y:-98.65}).wait(1).to({graphics:mask_graphics_3,x:-48.475,y:-98.7}).wait(1).to({graphics:mask_graphics_4,x:-50.225,y:-98.75}).wait(1).to({graphics:mask_graphics_5,x:-51.95,y:-98.75}).wait(1).to({graphics:mask_graphics_6,x:-53.65,y:-98.8}).wait(1).to({graphics:mask_graphics_7,x:-55.375,y:-98.85}).wait(1).to({graphics:mask_graphics_8,x:-57.1,y:-98.85}).wait(1).to({graphics:mask_graphics_9,x:-58.825,y:-98.9}).wait(1).to({graphics:mask_graphics_10,x:-60.55,y:-98.9}).wait(1).to({graphics:mask_graphics_11,x:-62.275,y:-98.95}).wait(1).to({graphics:mask_graphics_12,x:-64.025,y:-99}).wait(1).to({graphics:mask_graphics_13,x:-65.75,y:-99}).wait(1).to({graphics:mask_graphics_14,x:-67.475,y:-99.05}).wait(1).to({graphics:mask_graphics_15,x:-69.2,y:-99.1}).wait(1).to({graphics:mask_graphics_16,x:-70.9,y:-99.1}).wait(1).to({graphics:mask_graphics_17,x:-72.625,y:-99.15}).wait(1).to({graphics:mask_graphics_18,x:-74.35,y:-99.2}).wait(1).to({graphics:mask_graphics_19,x:-76.075,y:-99.2}).wait(1).to({graphics:mask_graphics_20,x:-77.825,y:-99.25}).wait(1).to({graphics:mask_graphics_21,x:-79.55,y:-99.3}).wait(1).to({graphics:mask_graphics_22,x:-81.275,y:-99.3}).wait(1).to({graphics:mask_graphics_23,x:-83,y:-99.35}).wait(1).to({graphics:mask_graphics_24,x:-84.725,y:-99.35}).wait(1).to({graphics:mask_graphics_25,x:-86.45,y:-99.4}).wait(1).to({graphics:mask_graphics_26,x:-88.15,y:-99.45}).wait(1).to({graphics:mask_graphics_27,x:-89.875,y:-99.45}).wait(1).to({graphics:mask_graphics_28,x:-91.625,y:-99.5}).wait(1).to({graphics:mask_graphics_29,x:-93.35,y:-99.55}).wait(1).to({graphics:mask_graphics_30,x:-95.075,y:-99.55}).wait(1).to({graphics:mask_graphics_31,x:-96.8,y:-99.6}).wait(1).to({graphics:mask_graphics_32,x:-96.8,y:-99.6}).wait(1).to({graphics:mask_graphics_33,x:-98.775,y:-97.625}).wait(1).to({graphics:mask_graphics_34,x:-100.725,y:-95.65}).wait(1).to({graphics:mask_graphics_35,x:-102.7,y:-93.675}).wait(1).to({graphics:mask_graphics_36,x:-104.675,y:-91.7}).wait(1).to({graphics:mask_graphics_37,x:-106.625,y:-89.725}).wait(1).to({graphics:mask_graphics_38,x:-108.6,y:-87.75}).wait(1).to({graphics:mask_graphics_39,x:-110.575,y:-85.775}).wait(1).to({graphics:mask_graphics_40,x:-112.525,y:-83.8}).wait(1).to({graphics:mask_graphics_41,x:-114.5,y:-81.825}).wait(1).to({graphics:mask_graphics_42,x:-116.475,y:-79.85}).wait(1).to({graphics:mask_graphics_43,x:-118.425,y:-77.875}).wait(1).to({graphics:mask_graphics_44,x:-120.4,y:-75.9}).wait(1).to({graphics:mask_graphics_45,x:-122.375,y:-73.925}).wait(1).to({graphics:mask_graphics_46,x:-124.325,y:-71.95}).wait(1).to({graphics:mask_graphics_47,x:-126.3,y:-69.975}).wait(1).to({graphics:mask_graphics_48,x:-128.275,y:-68}).wait(1).to({graphics:mask_graphics_49,x:-130.225,y:-66.025}).wait(1).to({graphics:mask_graphics_50,x:-132.2,y:-64.05}).wait(1).to({graphics:mask_graphics_51,x:-134.175,y:-62.075}).wait(1).to({graphics:mask_graphics_52,x:-136.125,y:-60.1}).wait(1).to({graphics:mask_graphics_53,x:-138.1,y:-58.125}).wait(1).to({graphics:mask_graphics_54,x:-140.075,y:-56.15}).wait(1).to({graphics:mask_graphics_55,x:-142.025,y:-54.175}).wait(1).to({graphics:mask_graphics_56,x:-144,y:-52.2}).wait(1).to({graphics:mask_graphics_57,x:-145.975,y:-50.225}).wait(1).to({graphics:mask_graphics_58,x:-147.925,y:-48.25}).wait(1).to({graphics:mask_graphics_59,x:-149.9,y:-46.275}).wait(1).to({graphics:mask_graphics_60,x:-151.875,y:-44.3}).wait(1).to({graphics:mask_graphics_61,x:-153.825,y:-42.325}).wait(1).to({graphics:mask_graphics_62,x:-155.8,y:-40.35}).wait(1).to({graphics:mask_graphics_63,x:-155.8,y:-40.35}).wait(1).to({graphics:mask_graphics_64,x:-151.375,y:-40.35}).wait(1).to({graphics:mask_graphics_65,x:-146.975,y:-40.35}).wait(1).to({graphics:mask_graphics_66,x:-142.55,y:-40.35}).wait(1).to({graphics:mask_graphics_67,x:-138.125,y:-40.35}).wait(1).to({graphics:mask_graphics_68,x:-133.725,y:-40.35}).wait(1).to({graphics:mask_graphics_69,x:-129.3,y:-40.35}).wait(1).to({graphics:mask_graphics_70,x:-124.875,y:-40.35}).wait(1).to({graphics:mask_graphics_71,x:-120.475,y:-40.35}).wait(1).to({graphics:mask_graphics_72,x:-116.05,y:-40.35}).wait(1).to({graphics:mask_graphics_73,x:-111.625,y:-40.35}).wait(1).to({graphics:mask_graphics_74,x:-107.225,y:-40.35}).wait(1).to({graphics:mask_graphics_75,x:-102.8,y:-40.35}).wait(1).to({graphics:mask_graphics_76,x:-98.375,y:-40.35}).wait(1).to({graphics:mask_graphics_77,x:-93.975,y:-40.35}).wait(1).to({graphics:mask_graphics_78,x:-89.55,y:-40.35}).wait(1).to({graphics:mask_graphics_79,x:-85.125,y:-40.35}).wait(1).to({graphics:mask_graphics_80,x:-80.725,y:-40.35}).wait(1).to({graphics:mask_graphics_81,x:-76.3,y:-40.35}).wait(1).to({graphics:mask_graphics_82,x:-76.2928,y:-40.3669}).wait(1).to({graphics:mask_graphics_83,x:0.15,y:45.775}).wait(1).to({graphics:mask_graphics_84,x:-2.675,y:45.775}).wait(1).to({graphics:mask_graphics_85,x:-5.525,y:45.775}).wait(1).to({graphics:mask_graphics_86,x:-8.35,y:45.775}).wait(1).to({graphics:mask_graphics_87,x:-11.2,y:45.775}).wait(1).to({graphics:mask_graphics_88,x:-14.025,y:45.775}).wait(1).to({graphics:mask_graphics_89,x:-16.85,y:45.775}).wait(1).to({graphics:mask_graphics_90,x:-19.7,y:45.775}).wait(1).to({graphics:mask_graphics_91,x:-22.525,y:45.775}).wait(1).to({graphics:mask_graphics_92,x:-25.375,y:45.775}).wait(1).to({graphics:mask_graphics_93,x:-28.2,y:45.775}).wait(1).to({graphics:mask_graphics_94,x:-31.05,y:45.775}).wait(1).to({graphics:mask_graphics_95,x:-33.875,y:45.775}).wait(1).to({graphics:mask_graphics_96,x:-36.7,y:45.775}).wait(1).to({graphics:mask_graphics_97,x:-39.55,y:45.775}).wait(1).to({graphics:mask_graphics_98,x:-42.35,y:45.775}).wait(1).to({graphics:mask_graphics_99,x:-45.2,y:45.775}).wait(1).to({graphics:mask_graphics_100,x:-48.025,y:45.775}).wait(1).to({graphics:mask_graphics_101,x:-50.85,y:45.775}).wait(1).to({graphics:mask_graphics_102,x:-53.7,y:45.775}).wait(1).to({graphics:mask_graphics_103,x:-56.525,y:45.775}).wait(1).to({graphics:mask_graphics_104,x:-59.375,y:45.775}).wait(1).to({graphics:mask_graphics_105,x:-62.2,y:45.775}).wait(1).to({graphics:mask_graphics_106,x:-65.05,y:45.775}).wait(1).to({graphics:mask_graphics_107,x:-67.875,y:45.775}).wait(1).to({graphics:mask_graphics_108,x:-70.7,y:45.775}).wait(1).to({graphics:mask_graphics_109,x:-73.55,y:45.775}).wait(1).to({graphics:mask_graphics_110,x:-76.375,y:45.775}).wait(1).to({graphics:mask_graphics_111,x:-79.225,y:45.775}).wait(1).to({graphics:mask_graphics_112,x:-82.05,y:45.775}).wait(1).to({graphics:mask_graphics_113,x:-82.1242,y:25.26}).wait(1).to({graphics:mask_graphics_114,x:-165.875,y:45.775}).wait(1).to({graphics:mask_graphics_115,x:-165.875,y:48.325}).wait(1).to({graphics:mask_graphics_116,x:-165.875,y:50.875}).wait(1).to({graphics:mask_graphics_117,x:-165.875,y:53.4}).wait(1).to({graphics:mask_graphics_118,x:-165.875,y:55.95}).wait(1).to({graphics:mask_graphics_119,x:-165.875,y:58.525}).wait(1).to({graphics:mask_graphics_120,x:-165.875,y:61.075}).wait(1).to({graphics:mask_graphics_121,x:-165.875,y:63.6}).wait(1).to({graphics:mask_graphics_122,x:-165.875,y:66.15}).wait(1).to({graphics:mask_graphics_123,x:-165.875,y:68.7}).wait(1).to({graphics:mask_graphics_124,x:-165.875,y:71.25}).wait(1).to({graphics:mask_graphics_125,x:-165.875,y:73.775}).wait(1).to({graphics:mask_graphics_126,x:-165.875,y:76.325}).wait(1).to({graphics:mask_graphics_127,x:-165.875,y:78.9}).wait(1).to({graphics:mask_graphics_128,x:-165.875,y:81.45}).wait(1).to({graphics:mask_graphics_129,x:-165.875,y:83.975}).wait(1).to({graphics:mask_graphics_130,x:-165.875,y:86.525}).wait(1).to({graphics:mask_graphics_131,x:-165.875,y:89.075}).wait(1).to({graphics:mask_graphics_132,x:-165.875,y:89.075}).wait(1).to({graphics:mask_graphics_133,x:-162.025,y:89.075}).wait(1).to({graphics:mask_graphics_134,x:-158.175,y:89.075}).wait(1).to({graphics:mask_graphics_135,x:-154.325,y:89.075}).wait(1).to({graphics:mask_graphics_136,x:-150.45,y:89.075}).wait(1).to({graphics:mask_graphics_137,x:-146.6,y:89.075}).wait(1).to({graphics:mask_graphics_138,x:-142.75,y:89.075}).wait(1).to({graphics:mask_graphics_139,x:-138.9,y:89.075}).wait(1).to({graphics:mask_graphics_140,x:-135.075,y:89.075}).wait(1).to({graphics:mask_graphics_141,x:-131.225,y:89.075}).wait(1).to({graphics:mask_graphics_142,x:-127.375,y:89.075}).wait(1).to({graphics:mask_graphics_143,x:-123.525,y:89.075}).wait(1).to({graphics:mask_graphics_144,x:-119.65,y:89.075}).wait(1).to({graphics:mask_graphics_145,x:-115.8,y:89.075}).wait(1).to({graphics:mask_graphics_146,x:-111.95,y:89.075}).wait(1).to({graphics:mask_graphics_147,x:-108.1,y:89.075}).wait(1).to({graphics:mask_graphics_148,x:-104.25,y:89.075}).wait(1).to({graphics:mask_graphics_149,x:-100.4,y:89.075}).wait(1).to({graphics:mask_graphics_150,x:-96.525,y:89.075}).wait(1).to({graphics:mask_graphics_151,x:-92.675,y:89.075}).wait(1).to({graphics:mask_graphics_152,x:-88.825,y:89.075}).wait(1).to({graphics:mask_graphics_153,x:-84.975,y:89.075}).wait(1).to({graphics:mask_graphics_154,x:-81.15,y:89.075}).wait(1).to({graphics:mask_graphics_155,x:-77.3,y:89.075}).wait(1).to({graphics:mask_graphics_156,x:-73.45,y:89.075}).wait(1).to({graphics:mask_graphics_157,x:-69.6,y:89.075}).wait(1).to({graphics:mask_graphics_158,x:-65.725,y:89.075}).wait(1).to({graphics:mask_graphics_159,x:-61.875,y:89.075}).wait(1).to({graphics:mask_graphics_160,x:-58.025,y:89.075}).wait(1).to({graphics:mask_graphics_161,x:-54.175,y:89.075}).wait(1).to({graphics:mask_graphics_162,x:-54.2211,y:68.645}).wait(1).to({graphics:mask_graphics_163,x:63.1,y:133.075}).wait(1).to({graphics:mask_graphics_164,x:66.6,y:132.925}).wait(1).to({graphics:mask_graphics_165,x:70.125,y:132.8}).wait(1).to({graphics:mask_graphics_166,x:73.625,y:132.65}).wait(1).to({graphics:mask_graphics_167,x:77.15,y:132.525}).wait(1).to({graphics:mask_graphics_168,x:80.675,y:132.375}).wait(1).to({graphics:mask_graphics_169,x:84.2,y:132.225}).wait(1).to({graphics:mask_graphics_170,x:87.7,y:132.1}).wait(1).to({graphics:mask_graphics_171,x:91.225,y:131.95}).wait(1).to({graphics:mask_graphics_172,x:94.725,y:131.825}).wait(1).to({graphics:mask_graphics_173,x:98.225,y:131.65}).wait(1).to({graphics:mask_graphics_174,x:101.75,y:131.5}).wait(1).to({graphics:mask_graphics_175,x:105.25,y:131.375}).wait(1).to({graphics:mask_graphics_176,x:108.775,y:131.225}).wait(1).to({graphics:mask_graphics_177,x:112.3,y:131.075}).wait(1).to({graphics:mask_graphics_178,x:115.825,y:130.95}).wait(1).to({graphics:mask_graphics_179,x:119.325,y:130.8}).wait(1).to({graphics:mask_graphics_180,x:122.85,y:130.675}).wait(1).to({graphics:mask_graphics_181,x:126.35,y:130.525}).wait(1).to({graphics:mask_graphics_182,x:126.35,y:130.525}).wait(1).to({graphics:mask_graphics_183,x:128.025,y:125.65}).wait(1).to({graphics:mask_graphics_184,x:129.7,y:120.75}).wait(1).to({graphics:mask_graphics_185,x:131.35,y:115.875}).wait(1).to({graphics:mask_graphics_186,x:133.025,y:111}).wait(1).to({graphics:mask_graphics_187,x:134.7,y:106.1}).wait(1).to({graphics:mask_graphics_188,x:136.375,y:101.225}).wait(1).to({graphics:mask_graphics_189,x:138.05,y:96.35}).wait(1).to({graphics:mask_graphics_190,x:139.7,y:91.45}).wait(1).to({graphics:mask_graphics_191,x:141.375,y:86.575}).wait(1).to({graphics:mask_graphics_192,x:143.025,y:81.675}).wait(1).to({graphics:mask_graphics_193,x:144.7,y:76.8}).wait(1).to({graphics:mask_graphics_194,x:146.35,y:71.9}).wait(1).to({graphics:mask_graphics_195,x:148.025,y:67.025}).wait(1).to({graphics:mask_graphics_196,x:149.7,y:62.15}).wait(1).to({graphics:mask_graphics_197,x:151.375,y:57.25}).wait(1).to({graphics:mask_graphics_198,x:153.05,y:52.375}).wait(1).to({graphics:mask_graphics_199,x:154.7,y:47.5}).wait(1).to({graphics:mask_graphics_200,x:156.375,y:42.6}).wait(1).to({graphics:mask_graphics_201,x:158.05,y:37.725}).wait(1).to({graphics:mask_graphics_202,x:96.675,y:37.725}).wait(629).to({graphics:mask_graphics_831,x:96.675,y:37.725}).wait(1).to({graphics:mask_graphics_832,x:96.675,y:37.725}).wait(1).to({graphics:mask_graphics_833,x:96.675,y:37.725}).wait(1).to({graphics:mask_graphics_834,x:96.675,y:37.725}).wait(1).to({graphics:mask_graphics_835,x:96.675,y:37.725}).wait(1).to({graphics:mask_graphics_836,x:96.675,y:37.725}).wait(1).to({graphics:mask_graphics_837,x:96.675,y:37.725}).wait(1).to({graphics:mask_graphics_838,x:96.675,y:37.725}).wait(1).to({graphics:mask_graphics_839,x:96.675,y:37.725}).wait(1).to({graphics:mask_graphics_840,x:96.675,y:37.725}).wait(1).to({graphics:mask_graphics_841,x:96.675,y:37.725}).wait(1).to({graphics:mask_graphics_842,x:96.675,y:37.725}).wait(1).to({graphics:mask_graphics_843,x:96.675,y:37.725}).wait(1).to({graphics:mask_graphics_844,x:96.675,y:37.725}).wait(1).to({graphics:mask_graphics_845,x:96.675,y:37.725}).wait(2145));

	// Masked_Layer_13___12
	this.instance_16 = new lib.shape16("synched",0);
	this.instance_16.setTransform(4.6,-14.8);

	var maskedShapeInstanceList = [this.instance_16];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(831).to({startPosition:0},0).to({alpha:0},14).to({_off:true},1).wait(2144));

	// Layer_12
	this.instance_17 = new lib.text53("synched",0);
	this.instance_17.setTransform(-185.6,11.8);

	this.instance_18 = new lib.text52("synched",0);
	this.instance_18.setTransform(-167.15,48.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_17}]},873).to({state:[]},10).to({state:[{t:this.instance_17}]},10).to({state:[]},10).to({state:[{t:this.instance_18}]},10).to({state:[]},675).wait(1402));

	// Layer_11
	this.instance_19 = new lib.shape14("synched",0);
	this.instance_19.setTransform(4.6,-14.8);

	this.instance_20 = new lib.text52("synched",0);
	this.instance_20.setTransform(-167.15,48.55);

	this.instance_21 = new lib.shape51("synched",0);
	this.instance_21.setTransform(-7.2,-36.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_19}]}).to({state:[{t:this.instance_19}]},831).to({state:[{t:this.instance_19}]},14).to({state:[]},1).to({state:[{t:this.instance_20}]},27).to({state:[]},10).to({state:[{t:this.instance_20}]},10).to({state:[]},10).to({state:[{t:this.instance_21}]},10).to({state:[]},675).wait(1402));
	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(831).to({startPosition:0},0).to({alpha:0},14).to({_off:true},1).wait(2144));

	// Layer_10
	this.instance_22 = new lib.text13("synched",0);
	this.instance_22.setTransform(-76.15,-160.4);

	this.instance_23 = new lib.shape51("synched",0);
	this.instance_23.setTransform(-7.2,-36.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_22}]}).to({state:[{t:this.instance_22}]},831).to({state:[{t:this.instance_22}]},14).to({state:[]},1).to({state:[{t:this.instance_23}]},27).to({state:[]},10).to({state:[{t:this.instance_23}]},10).to({state:[]},10).wait(2087));
	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(831).to({startPosition:0},0).to({alpha:0},14).to({_off:true},1).wait(2144));

	// Layer_9
	this.instance_24 = new lib.text12("synched",0);
	this.instance_24.setTransform(66.9,-20.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(831).to({startPosition:0},0).to({alpha:0},14).to({_off:true},1).wait(2144));

	// Layer_8
	this.instance_25 = new lib.text11("synched",0);
	this.instance_25.setTransform(-27.75,-1.2);

	this.instance_26 = new lib.shape57("synched",0);
	this.instance_26.setTransform(-7.2,-36.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_25}]}).to({state:[{t:this.instance_25}]},831).to({state:[{t:this.instance_25}]},14).to({state:[]},1).to({state:[{t:this.instance_26}]},75).to({state:[]},10).to({state:[{t:this.instance_26}]},10).to({state:[]},10).to({state:[{t:this.instance_26}]},10).to({state:[]},627).wait(1402));
	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(831).to({startPosition:0},0).to({alpha:0},14).to({_off:true},1).wait(2144));

	// Layer_7
	this.instance_27 = new lib.text10("synched",0);
	this.instance_27.setTransform(0.65,96.05);

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(831).to({startPosition:0},0).to({alpha:0},14).to({_off:true},1).wait(2144));

	// Layer_6
	this.instance_28 = new lib.text9("synched",0);
	this.instance_28.setTransform(-175,56.95);

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(831).to({startPosition:0},0).to({alpha:0},14).to({_off:true},1).wait(2144));

	// Layer_5
	this.instance_29 = new lib.text8("synched",0);
	this.instance_29.setTransform(-158.25,-50.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(831).to({startPosition:0},0).to({alpha:0},14).to({_off:true},1).wait(2144));

	// Layer_4
	this.instance_30 = new lib.text7("synched",0);
	this.instance_30.setTransform(44.45,-183.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(831).to({startPosition:0},0).to({alpha:0},14).to({_off:true},1).wait(2144));

	// Layer_3
	this.instance_31 = new lib.text5("synched",0);
	this.instance_31.setTransform(-47.05,167.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(831).to({startPosition:0},0).to({alpha:0},14).to({_off:true},1).wait(2144));

	// Layer_2
	this.instance_32 = new lib.shape3("synched",0);
	this.instance_32.setTransform(4.6,-14.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(831).to({startPosition:0},0).to({alpha:0},14).to({_off:true},1).wait(2144));

	// Layer_7
	this.instance_33 = new lib.text47("synched",0);
	this.instance_33.setTransform(-116.45,-167.8);
	this.instance_33.alpha = 0;
	this.instance_33._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_33).wait(831).to({_off:false},0).to({alpha:0.9414},16).wait(1).to({alpha:1},0).to({_off:true},740).wait(1402));

	// Layer_6
	this.instance_34 = new lib.text46("synched",0);
	this.instance_34.setTransform(59.95,-38);
	this.instance_34.alpha = 0;
	this.instance_34._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_34).wait(831).to({_off:false},0).to({alpha:0.9414},16).wait(1).to({alpha:1},0).to({_off:true},740).wait(1402));

	// Layer_5
	this.instance_35 = new lib.text45("synched",0);
	this.instance_35.setTransform(5.5,21.45);
	this.instance_35.alpha = 0;
	this.instance_35._off = true;

	this.instance_36 = new lib.トゥイーン1("synched",0);
	this.instance_36.setTransform(-12.6,-23);
	this.instance_36.alpha = 0;
	this.instance_36._off = true;

	this.instance_37 = new lib.トゥイーン2("synched",0);
	this.instance_37.setTransform(-12.6,-23);
	this.instance_37._off = true;

	this.instance_38 = new lib.sprite66();
	this.instance_38.setTransform(-11.55,-16.1);
	this.instance_38.alpha = 0;
	this.instance_38._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(831).to({_off:false},0).to({alpha:0.9414},16).wait(1).to({alpha:1},0).to({_off:true},740).wait(1402));
	this.timeline.addTween(cjs.Tween.get(this.instance_36).wait(1588).to({_off:false},0).to({_off:true,alpha:1},15).wait(1387));
	this.timeline.addTween(cjs.Tween.get(this.instance_37).wait(1588).to({_off:false},15).wait(840).to({startPosition:0},0).to({alpha:0},16).to({_off:true},1).wait(530));
	this.timeline.addTween(cjs.Tween.get(this.instance_38).wait(2954).to({_off:false},0).to({alpha:1},18).wait(18));

	// Layer_4
	this.instance_39 = new lib.text44("synched",0);
	this.instance_39.setTransform(-53.95,-112.3);
	this.instance_39.alpha = 0;
	this.instance_39._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_39).wait(831).to({_off:false},0).to({alpha:0.9414},16).wait(1).to({alpha:1},0).to({_off:true},740).wait(1402));

	// Layer_3
	this.instance_40 = new lib.text43("synched",0);
	this.instance_40.setTransform(120.95,-28.3);
	this.instance_40.alpha = 0;
	this.instance_40._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_40).wait(831).to({_off:false},0).to({alpha:0.9414},16).wait(1).to({alpha:1},0).to({_off:true},740).wait(1402));

	// Layer_2
	this.instance_41 = new lib.text42("synched",0);
	this.instance_41.setTransform(-208.9,-89.8);
	this.instance_41.alpha = 0;
	this.instance_41._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_41).wait(831).to({_off:false},0).to({alpha:0.9414},16).wait(1).to({alpha:1},0).to({_off:true},740).wait(1402));

	// Layer_1
	this.instance_42 = new lib.shape41("synched",0);
	this.instance_42.setTransform(-7.2,-36.65);
	this.instance_42.alpha = 0;
	this.instance_42._off = true;

	this.instance_43 = new lib.sprite64();
	this.instance_43.setTransform(-8.2,-26);
	this.instance_43.alpha = 0;
	this.instance_43._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_42).wait(831).to({_off:false},0).to({alpha:0.9414},16).wait(1).to({alpha:1},0).to({_off:true},740).wait(1402));
	this.timeline.addTween(cjs.Tween.get(this.instance_43).wait(2443).to({_off:false},0).to({alpha:0.9414},16).wait(495).to({alpha:1},0).to({alpha:0},18).wait(18));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-750,-216.4,983.7,412.9);


(lib.sprite180 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		/* stopAllSounds ();
		*/
	}
	this.frame_1317 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1317).call(this.frame_1317).wait(1));

	// Masked_Layer_41___38
	this.instance = new lib.text130("synched",0);
	this.instance.setTransform(-745.9,-35.85);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1318));

	// Masked_Layer_40___38
	this.instance_1 = new lib.text129("synched",0);
	this.instance_1.setTransform(-745.6,-206.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1318));

	// Masked_Layer_39___38
	this.instance_2 = new lib.text128("synched",0);
	this.instance_2.setTransform(-746,-173.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1318));

	// Layer_37
	this.instance_3 = new lib.text127("synched",0);
	this.instance_3.setTransform(32.1,-70.95,1.0007,1);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1301).to({_off:false},0).to({alpha:1},16).wait(1));

	// Layer_36
	this.instance_4 = new lib.text126("synched",0);
	this.instance_4.setTransform(48.7,-129);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1301).to({_off:false},0).to({alpha:1},16).wait(1));

	// Layer_35
	this.instance_5 = new lib.text124("synched",0);
	this.instance_5.setTransform(-290.8,-159.95,1.0007,1);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1301).to({_off:false},0).to({alpha:1},16).wait(1));

	// Layer_34
	this.instance_6 = new lib.text125("synched",0);
	this.instance_6.setTransform(-110.45,-95.95,1.0007,1);
	this.instance_6.alpha = 0;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1301).to({_off:false},0).to({alpha:1},16).wait(1));

	// Layer_33
	this.instance_7 = new lib.text124("synched",0);
	this.instance_7.setTransform(-52.8,-129.95,1.0007,1);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1301).to({_off:false},0).to({alpha:1},16).wait(1));

	// Layer_32
	this.instance_8 = new lib.text121("synched",0);
	this.instance_8.setTransform(-126,-159.4);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1301).to({_off:false},0).to({alpha:1},16).wait(1));

	// Layer_31
	this.instance_9 = new lib.text123("synched",0);
	this.instance_9.setTransform(28.9,-99.5);
	this.instance_9.alpha = 0;
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1301).to({_off:false},0).to({alpha:1},16).wait(1));

	// Layer_30
	this.instance_10 = new lib.text122("synched",0);
	this.instance_10.setTransform(75,-10.5);
	this.instance_10.alpha = 0;
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1301).to({_off:false},0).to({alpha:1},16).wait(1));

	// Layer_29
	this.instance_11 = new lib.text121("synched",0);
	this.instance_11.setTransform(-264.75,-7.4);
	this.instance_11.alpha = 0;
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1301).to({_off:false},0).to({alpha:1},16).wait(1));

	// Layer_28
	this.instance_12 = new lib.text120("synched",0);
	this.instance_12.setTransform(-79.6,-32.4);
	this.instance_12.alpha = 0;
	this.instance_12._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1301).to({_off:false},0).to({alpha:1},16).wait(1));

	// Layer_27
	this.instance_13 = new lib.text119("synched",0);
	this.instance_13.setTransform(-90.75,92.7,1.0007,1);
	this.instance_13.alpha = 0;
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1301).to({_off:false},0).to({alpha:1},16).wait(1));

	// Layer_26
	this.instance_14 = new lib.shape118("synched",0);
	this.instance_14.setTransform(-8.3,-37.45);
	this.instance_14.alpha = 0;
	this.instance_14._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(1301).to({_off:false},0).to({alpha:1},16).wait(1));

	// Layer_25
	this.instance_15 = new lib.text117("synched",0);
	this.instance_15.setTransform(-184.75,-64.75);
	this.instance_15.alpha = 0;
	this.instance_15._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(1301).to({_off:false},0).to({alpha:1},16).wait(1));

	// Layer_24
	this.instance_16 = new lib.text116("synched",0);
	this.instance_16.setTransform(-233.5,57.95);
	this.instance_16.alpha = 0;
	this.instance_16._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(1301).to({_off:false},0).to({alpha:1},16).wait(1));

	// Layer_23
	this.instance_17 = new lib.text115("synched",0);
	this.instance_17.setTransform(-82.8,31.05,1.0007,1);
	this.instance_17.alpha = 0;
	this.instance_17._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(1301).to({_off:false},0).to({alpha:1},16).wait(1));

	// Layer_22
	this.instance_18 = new lib.text114("synched",0);
	this.instance_18.setTransform(-254.25,-119.9);
	this.instance_18.alpha = 0;
	this.instance_18._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(1301).to({_off:false},0).to({alpha:1},16).wait(1));

	// Layer_21
	this.instance_19 = new lib.shape131("synched",0);

	this.instance_20 = new lib.sprite150();
	this.instance_20.setTransform(-6.6,-12.6);
	this.instance_20.alpha = 0;
	this.instance_20._off = true;

	this.instance_21 = new lib.text113("synched",0);
	this.instance_21.setTransform(75.6,31.05);
	this.instance_21.alpha = 0;
	this.instance_21._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_19}]},124).to({state:[]},10).to({state:[{t:this.instance_19}]},10).to({state:[]},10).to({state:[{t:this.instance_20}]},205).to({state:[{t:this.instance_20}]},15).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_20}]},189).to({state:[{t:this.instance_20}]},16).to({state:[]},1).to({state:[{t:this.instance_21}]},720).to({state:[{t:this.instance_21}]},16).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(359).to({_off:false},0).to({alpha:0.9414},15).wait(1).to({alpha:1},0).wait(189).to({alpha:0},16).to({_off:true},1).wait(737));
	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(1301).to({_off:false},0).to({alpha:1},16).wait(1));

	// Layer_20
	this.instance_22 = new lib.text127("synched",0);
	this.instance_22.setTransform(32.9,-42.35,1.0007,1);

	this.instance_23 = new lib.text112("synched",0);
	this.instance_23.setTransform(93.7,-84.95);
	this.instance_23.alpha = 0;
	this.instance_23._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(359).to({startPosition:0},0).to({alpha:0},16).to({_off:true},1).wait(942));
	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(1301).to({_off:false},0).to({alpha:1},16).wait(1));

	// Layer_19
	this.instance_24 = new lib.text126("synched",0);
	this.instance_24.setTransform(49.5,-100.4);

	this.instance_25 = new lib.shape111("synched",0);
	this.instance_25.setTransform(-8.3,-37.45);
	this.instance_25.alpha = 0;
	this.instance_25._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(359).to({startPosition:0},0).to({alpha:0},16).to({_off:true},1).wait(942));
	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(1301).to({_off:false},0).to({alpha:1},16).wait(1));

	// Layer_18
	this.instance_26 = new lib.text124("synched",0);
	this.instance_26.setTransform(-290,-131.35,1.0007,1);

	this.instance_27 = new lib.sprite168();
	this.instance_27.setTransform(-10.75,-12.15);
	this.instance_27.alpha = 0;
	this.instance_27._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(359).to({startPosition:0},0).to({alpha:0},16).to({_off:true},1).wait(942));
	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(760).to({_off:false},0).to({alpha:0.9414},16).wait(1).to({alpha:1},0).wait(177).to({alpha:0},17).to({_off:true},1).wait(346));

	// Layer_17
	this.instance_28 = new lib.text125("synched",0);
	this.instance_28.setTransform(-109.65,-67.35,1.0007,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(359).to({startPosition:0},0).to({alpha:0},16).to({_off:true},1).wait(942));

	// Layer_16
	this.instance_29 = new lib.text124("synched",0);
	this.instance_29.setTransform(-52,-101.35,1.0007,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(359).to({startPosition:0},0).to({alpha:0},16).to({_off:true},1).wait(942));

	// Layer_15
	this.instance_30 = new lib.text121("synched",0);
	this.instance_30.setTransform(-120.95,-130.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(359).to({startPosition:0},0).to({alpha:0},16).to({_off:true},1).wait(942));

	// Layer_14
	this.instance_31 = new lib.text123("synched",0);
	this.instance_31.setTransform(29.7,-70.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(359).to({startPosition:0},0).to({alpha:0},16).to({_off:true},1).wait(942));

	// Layer_13
	this.instance_32 = new lib.text122("synched",0);
	this.instance_32.setTransform(75.8,18.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(359).to({startPosition:0},0).to({alpha:0},16).to({_off:true},1).wait(942));

	// Layer_12
	this.instance_33 = new lib.text121("synched",0);
	this.instance_33.setTransform(-263.95,21.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_33).wait(359).to({startPosition:0},0).to({alpha:0},16).to({_off:true},1).wait(942));

	// Layer_11
	this.instance_34 = new lib.text120("synched",0);
	this.instance_34.setTransform(-78.8,-3.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_34).wait(359).to({startPosition:0},0).to({alpha:0},16).to({_off:true},1).wait(942));

	// Layer_10
	this.instance_35 = new lib.text119("synched",0);
	this.instance_35.setTransform(-89.95,121.3,1.0007,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(359).to({startPosition:0},0).to({alpha:0},16).to({_off:true},1).wait(942));

	// Layer_9
	this.instance_36 = new lib.shape118("synched",0);
	this.instance_36.setTransform(-7.5,-8.85);

	this.timeline.addTween(cjs.Tween.get(this.instance_36).wait(359).to({startPosition:0},0).to({alpha:0},16).to({_off:true},1).wait(942));

	// Layer_8
	this.instance_37 = new lib.text117("synched",0);
	this.instance_37.setTransform(-183.95,-36.15);

	this.timeline.addTween(cjs.Tween.get(this.instance_37).wait(359).to({startPosition:0},0).to({alpha:0},16).to({_off:true},1).wait(942));

	// Layer_7
	this.instance_38 = new lib.text116("synched",0);
	this.instance_38.setTransform(-232.7,86.55);

	this.timeline.addTween(cjs.Tween.get(this.instance_38).wait(359).to({startPosition:0},0).to({alpha:0},16).to({_off:true},1).wait(942));

	// Layer_6
	this.instance_39 = new lib.text115("synched",0);
	this.instance_39.setTransform(-82,59.65,1.0007,1);

	this.timeline.addTween(cjs.Tween.get(this.instance_39).wait(359).to({startPosition:0},0).to({alpha:0},16).to({_off:true},1).wait(942));

	// Layer_5
	this.instance_40 = new lib.text114("synched",0);
	this.instance_40.setTransform(-253.45,-91.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_40).wait(359).to({startPosition:0},0).to({alpha:0},16).to({_off:true},1).wait(942));

	// Layer_4
	this.instance_41 = new lib.text113("synched",0);
	this.instance_41.setTransform(76.4,59.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_41).wait(359).to({startPosition:0},0).to({alpha:0},16).to({_off:true},1).wait(942));

	// Layer_3
	this.instance_42 = new lib.text112("synched",0);
	this.instance_42.setTransform(94.5,-56.35);

	this.timeline.addTween(cjs.Tween.get(this.instance_42).wait(359).to({startPosition:0},0).to({alpha:0},16).to({_off:true},1).wait(942));

	// Layer_2
	this.instance_43 = new lib.shape111("synched",0);
	this.instance_43.setTransform(-7.5,-8.85);

	this.timeline.addTween(cjs.Tween.get(this.instance_43).wait(359).to({startPosition:0},0).to({alpha:0},16).to({_off:true},1).wait(942));

	// Layer_1
	this.instance_44 = new lib.sprite161();
	this.instance_44.setTransform(-9.9,-3.1);
	this.instance_44.alpha = 0;
	this.instance_44._off = true;

	this.instance_45 = new lib.sprite179();
	this.instance_45.setTransform(8.85,-18.9);
	this.instance_45.alpha = 0;
	this.instance_45._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_44).wait(564).to({_off:false},0).to({alpha:0.9414},15).wait(1).to({alpha:1},0).wait(180).to({alpha:0},17).to({_off:true},1).wait(540));
	this.timeline.addTween(cjs.Tween.get(this.instance_45).wait(954).to({_off:false},0).to({alpha:0.9414},16).wait(1).to({alpha:1},0).wait(289).to({alpha:0},16).to({_off:true},1).wait(41));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-750,-212.7,1010.2,402.9);


// stage content:
(lib.vital_op_fop = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {p1:0,p2:2990,p3:4308,p4:5861,p5:6897,p6:7542,p7:8889,p8:9830,p9:12029};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,1,2988,2989,2990,2991,4306,4307,4308,4309,5859,5860,5861,5862,6895,6896,6897,6898,7540,7541,7542,7543,8887,8888,8889,8890,9828,9829,9830,9831,12027,12028,12029,12030,12976];
	this.streamSoundSymbolsList[1] = [{id:"vital_op_fop1_rrrrrr",startFrame:1,endFrame:2989,loop:1,offset:200}];
	this.streamSoundSymbolsList[2991] = [{id:"vital_op_fop2_rrrrr",startFrame:2991,endFrame:4305,loop:1,offset:0}];
	this.streamSoundSymbolsList[4309] = [{id:"vital_op_fop3_rrrrr",startFrame:4309,endFrame:5860,loop:1,offset:0}];
	this.streamSoundSymbolsList[5862] = [{id:"vital_op_fop4_rrrrr",startFrame:5862,endFrame:6896,loop:1,offset:0}];
	this.streamSoundSymbolsList[6898] = [{id:"vital_op_fop5",startFrame:6898,endFrame:7541,loop:1,offset:0}];
	this.streamSoundSymbolsList[7543] = [{id:"vital_op_fop6_rrrrr",startFrame:7543,endFrame:8887,loop:1,offset:0}];
	this.streamSoundSymbolsList[8890] = [{id:"vital_op_fop7_rrrrr",startFrame:8890,endFrame:9830,loop:1,offset:0}];
	this.streamSoundSymbolsList[9831] = [{id:"vital_op_fop8_rrrrr",startFrame:9831,endFrame:12029,loop:1,offset:0}];
	this.streamSoundSymbolsList[12030] = [{id:"vital_op_fop9_rrrrrrrrrr",startFrame:12030,endFrame:12976,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		InitPage(9);
		Next(1);
		Prev(0);
		InitAnim();
		
		//-------------------------------------
		//ページ移動
		//-------------------------------------
		// NEXTボタンクリック
		this.next.addEventListener("click", ClickNext);
		// PREVボタンクリック
		this.previous.addEventListener("click", ClickPrev);
		// Back to Topicクリック
		this.back.addEventListener("click", function(){
			GetUrlMain("vitalmenu_fop");
		});
		
		//-------------------------------------
		// スライダー操作関連
		//-------------------------------------
		// 再生/停止ボタンクリック
		this.playpau.addEventListener("click", ClickPlayPau);
		// リプレイボタンクリック
		this.replay.addEventListener("click", ClickReplay);
	}
	this.frame_1 = function() {
		var soundInstance = playSound("vital_op_fop1_rrrrrr",0,200);
		this.InsertIntoSoundStreamData(soundInstance,1,2989,1,200);
	}
	this.frame_2988 = function() {
		this.stop();
	}
	this.frame_2989 = function() {
		this.stop();
	}
	this.frame_2990 = function() {
		Prev(1);
		InitAnim();
	}
	this.frame_2991 = function() {
		var soundInstance = playSound("vital_op_fop2_rrrrr",0);
		this.InsertIntoSoundStreamData(soundInstance,2991,4305,1);
	}
	this.frame_4306 = function() {
		this.stop();
	}
	this.frame_4307 = function() {
		this.stop();
	}
	this.frame_4308 = function() {
		InitAnim();
	}
	this.frame_4309 = function() {
		var soundInstance = playSound("vital_op_fop3_rrrrr",0);
		this.InsertIntoSoundStreamData(soundInstance,4309,5860,1);
	}
	this.frame_5859 = function() {
		this.stop();
	}
	this.frame_5860 = function() {
		this.stop();
	}
	this.frame_5861 = function() {
		InitAnim();
	}
	this.frame_5862 = function() {
		var soundInstance = playSound("vital_op_fop4_rrrrr",0);
		this.InsertIntoSoundStreamData(soundInstance,5862,6896,1);
	}
	this.frame_6895 = function() {
		this.stop();
	}
	this.frame_6896 = function() {
		this.stop();
	}
	this.frame_6897 = function() {
		InitAnim();
	}
	this.frame_6898 = function() {
		var soundInstance = playSound("vital_op_fop5",0);
		this.InsertIntoSoundStreamData(soundInstance,6898,7541,1);
	}
	this.frame_7540 = function() {
		this.stop();
	}
	this.frame_7541 = function() {
		this.stop();
	}
	this.frame_7542 = function() {
		InitAnim();
	}
	this.frame_7543 = function() {
		var soundInstance = playSound("vital_op_fop6_rrrrr",0);
		this.InsertIntoSoundStreamData(soundInstance,7543,8887,1);
	}
	this.frame_8887 = function() {
		this.stop();
	}
	this.frame_8888 = function() {
		this.stop();
	}
	this.frame_8889 = function() {
		InitAnim();
	}
	this.frame_8890 = function() {
		var soundInstance = playSound("vital_op_fop7_rrrrr",0);
		this.InsertIntoSoundStreamData(soundInstance,8890,9830,1);
	}
	this.frame_9828 = function() {
		this.stop();
	}
	this.frame_9829 = function() {
		this.stop();
	}
	this.frame_9830 = function() {
		Next(1);
		InitAnim();
	}
	this.frame_9831 = function() {
		var soundInstance = playSound("vital_op_fop8_rrrrr",0);
		this.InsertIntoSoundStreamData(soundInstance,9831,12029,1);
	}
	this.frame_12027 = function() {
		this.stop();
	}
	this.frame_12028 = function() {
		this.stop();
	}
	this.frame_12029 = function() {
		Next(0);
		InitAnim();
	}
	this.frame_12030 = function() {
		var soundInstance = playSound("vital_op_fop9_rrrrrrrrrr",0);
		this.InsertIntoSoundStreamData(soundInstance,12030,12976,1);
	}
	this.frame_12976 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(2987).call(this.frame_2988).wait(1).call(this.frame_2989).wait(1).call(this.frame_2990).wait(1).call(this.frame_2991).wait(1315).call(this.frame_4306).wait(1).call(this.frame_4307).wait(1).call(this.frame_4308).wait(1).call(this.frame_4309).wait(1550).call(this.frame_5859).wait(1).call(this.frame_5860).wait(1).call(this.frame_5861).wait(1).call(this.frame_5862).wait(1033).call(this.frame_6895).wait(1).call(this.frame_6896).wait(1).call(this.frame_6897).wait(1).call(this.frame_6898).wait(642).call(this.frame_7540).wait(1).call(this.frame_7541).wait(1).call(this.frame_7542).wait(1).call(this.frame_7543).wait(1344).call(this.frame_8887).wait(1).call(this.frame_8888).wait(1).call(this.frame_8889).wait(1).call(this.frame_8890).wait(938).call(this.frame_9828).wait(1).call(this.frame_9829).wait(1).call(this.frame_9830).wait(1).call(this.frame_9831).wait(2196).call(this.frame_12027).wait(1).call(this.frame_12028).wait(1).call(this.frame_12029).wait(1).call(this.frame_12030).wait(946).call(this.frame_12976).wait(1));

	// Layer_126_page
	this.page = new cjs.Text("Page number", "italic bold 15px 'Arial'", "#FF9900");
	this.page.name = "page";
	this.page.lineHeight = 17;
	this.page.lineWidth = 193;
	this.page.parent = this;
	this.page.setTransform(23,658,1.4989,1.4989);

	this.timeline.addTween(cjs.Tween.get(this.page).wait(12977));

	// Layer_122_back
	this.back = new lib.button99();
	this.back.name = "back";
	this.back.setTransform(350,645,1.0001,1.0002);
	new cjs.ButtonHelper(this.back, 0, 1, 2, false, new lib.button99(), 3);

	this.timeline.addTween(cjs.Tween.get(this.back).wait(12977));

	// Layer_116_next
	this.next = new lib.button94();
	this.next.name = "next";
	this.next.setTransform(1496.1,5.1,0.9998,0.9999,0,0,0,0.1,0.1);
	new cjs.ButtonHelper(this.next, 0, 1, 2, false, new lib.button94(), 3);

	this.timeline.addTween(cjs.Tween.get(this.next).wait(12977));

	// Layer_111_previous
	this.previous = new lib.button87();
	this.previous.name = "previous";
	this.previous.setTransform(1432,5,1.0003,0.9993);
	new cjs.ButtonHelper(this.previous, 0, 1, 2, false, new lib.button87(), 3);

	this.timeline.addTween(cjs.Tween.get(this.previous).wait(12977));

	// Layer_108_slider
	this.slider = new lib.sprite82();
	this.slider.name = "slider";
	this.slider.setTransform(610.1,670.1,0.9937,0.9983,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.slider).wait(12977));

	// Layer_101_replay
	this.replay = new lib.sprite78();
	this.replay.name = "replay";
	this.replay.setTransform(1045.1,650.1,0.9999,0.9999,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.replay).wait(12977));

	// Layer_95_slider_base
	this.instance = new lib.sprite75();
	this.instance.setTransform(600,650,1,0.9999);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(12977));

	// Layer_89_playpau
	this.playpau = new lib.sprite71();
	this.playpau.name = "playpau";
	this.playpau.setTransform(555,650,0.9999,0.9999);

	this.timeline.addTween(cjs.Tween.get(this.playpau).wait(12977));

	// Layer_58
	this.instance_1 = new lib.text69("synched",0);
	this.instance_1.setTransform(10,0,1.4989,1.4989);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(12977));

	// Mask_Layer_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("Eh8/AyyMAAAhfTMD5/AAAMAAABfTg");
	mask.setTransform(800,325);

	// Masked_Layer_1
	this.ani1 = new lib.sprite67();
	this.ani1.name = "ani1";
	this.ani1.setTransform(1150,370,1.4989,1.4989);

	this.ani2 = new lib.sprite180();
	this.ani2.name = "ani2";
	this.ani2.setTransform(1150,370,1.4989,1.4989);

	this.ani3 = new lib.sprite198();
	this.ani3.name = "ani3";
	this.ani3.setTransform(1151.35,370,1.4989,1.4989);

	this.ani4 = new lib.sprite203();
	this.ani4.name = "ani4";
	this.ani4.setTransform(1150,370,1.4989,1.4989);

	this.ani5 = new lib.sprite211();
	this.ani5.name = "ani5";
	this.ani5.setTransform(1150,370,1.4989,1.4989);

	this.ani6 = new lib.sprite227();
	this.ani6.name = "ani6";
	this.ani6.setTransform(1150,370,1.4989,1.4989);

	this.ani7 = new lib.sprite266();
	this.ani7.name = "ani7";
	this.ani7.setTransform(1150,370,1.4989,1.4989);

	this.ani8 = new lib.sprite274();
	this.ani8.name = "ani8";
	this.ani8.setTransform(1150,370,1.4989,1.4989);

	this.ani9 = new lib.sprite295();
	this.ani9.name = "ani9";
	this.ani9.setTransform(1150,370,1.4989,1.4989);

	var maskedShapeInstanceList = [this.ani1,this.ani2,this.ani3,this.ani4,this.ani5,this.ani6,this.ani7,this.ani8,this.ani9];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.ani1}]}).to({state:[{t:this.ani2}]},2990).to({state:[{t:this.ani3}]},1318).to({state:[{t:this.ani4}]},1553).to({state:[{t:this.ani5}]},1036).to({state:[{t:this.ani6}]},645).to({state:[{t:this.ani7}]},1347).to({state:[{t:this.ani8}]},941).to({state:[{t:this.ani9}]},2199).wait(948));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(810,350,787,346);
// library properties:
lib.properties = {
	id: '786DCE5F8407AE4380EFB6EA9159D292',
	width: 1600,
	height: 700,
	fps: 25,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/vital_op_fop_atlas_1.png", id:"vital_op_fop_atlas_1"},
		{src:"images/vital_op_fop_atlas_2.png", id:"vital_op_fop_atlas_2"},
		{src:"images/vital_op_fop_atlas_3.png", id:"vital_op_fop_atlas_3"},
		{src:"images/vital_op_fop_atlas_4.png", id:"vital_op_fop_atlas_4"},
		{src:"images/vital_op_fop_atlas_5.png", id:"vital_op_fop_atlas_5"},
		{src:"images/vital_op_fop_atlas_6.png", id:"vital_op_fop_atlas_6"},
		{src:"images/vital_op_fop_atlas_7.png", id:"vital_op_fop_atlas_7"},
		{src:"sounds/vital_op_fop1_rrrrrr.mp3", id:"vital_op_fop1_rrrrrr"},
		{src:"sounds/vital_op_fop2_rrrrr.mp3", id:"vital_op_fop2_rrrrr"},
		{src:"sounds/vital_op_fop3_rrrrr.mp3", id:"vital_op_fop3_rrrrr"},
		{src:"sounds/vital_op_fop4_rrrrr.mp3", id:"vital_op_fop4_rrrrr"},
		{src:"sounds/vital_op_fop5.mp3", id:"vital_op_fop5"},
		{src:"sounds/vital_op_fop6_rrrrr.mp3", id:"vital_op_fop6_rrrrr"},
		{src:"sounds/vital_op_fop7_rrrrr.mp3", id:"vital_op_fop7_rrrrr"},
		{src:"sounds/vital_op_fop8_rrrrr.mp3", id:"vital_op_fop8_rrrrr"},
		{src:"sounds/vital_op_fop9_rrrrrrrrrr.mp3", id:"vital_op_fop9_rrrrrrrrrr"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['786DCE5F8407AE4380EFB6EA9159D292'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;