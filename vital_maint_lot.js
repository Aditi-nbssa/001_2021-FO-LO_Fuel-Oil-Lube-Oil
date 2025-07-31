(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"vital_maint_lot_atlas_1", frames: [[0,885,1283,227],[0,1504,1265,173],[0,656,1286,227],[0,1679,1236,163],[0,390,1223,264],[0,1114,1257,213],[0,1329,1299,173],[0,0,1295,388],[0,1844,1219,163],[1297,0,527,920]]},
		{name:"vital_maint_lot_atlas_2", frames: [[0,401,1359,99],[1127,755,919,66],[1009,1262,770,119],[1266,1548,701,99],[0,1470,869,99],[1009,1383,887,99],[370,1571,546,99],[370,1672,604,87],[1013,962,960,113],[0,286,1254,113],[0,962,1011,113],[1250,1871,681,113],[352,1262,643,87],[0,1803,1264,66],[0,1871,1248,66],[0,165,1256,119],[0,1369,1007,99],[352,1178,1168,82],[1178,636,553,99],[352,1077,610,99],[1009,1077,1001,99],[0,1986,1220,62],[0,732,1125,113],[0,617,1176,113],[0,847,1095,113],[0,502,1184,113],[0,0,1062,163],[1097,847,899,113],[871,1484,1160,62],[1361,328,376,306],[1554,1649,288,198],[1266,1649,286,216],[1739,0,293,375],[1739,377,291,376],[0,1571,368,230],[1258,0,428,326],[0,1077,350,290]]},
		{name:"vital_maint_lot_atlas_3", frames: [[767,190,480,87],[767,101,528,87],[0,654,218,87],[1249,202,431,87],[1896,660,148,79],[311,101,150,85],[626,669,138,79],[370,444,261,125],[1005,493,255,125],[0,565,332,87],[334,571,292,87],[1262,515,344,87],[0,101,309,137],[498,660,126,87],[633,493,370,87],[891,620,235,87],[1744,660,150,85],[1479,685,138,79],[542,196,157,79],[1297,101,406,99],[909,392,360,99],[1479,604,263,79],[1251,705,98,79],[1351,705,98,79],[628,582,261,85],[0,434,180,124],[767,0,491,99],[1143,291,370,99],[1071,719,91,66],[326,715,96,66],[0,743,88,66],[90,743,88,66],[370,367,104,66],[859,709,104,66],[965,709,104,66],[220,715,104,66],[1271,414,344,99],[1262,604,215,99],[1260,0,471,99],[1705,198,338,113],[190,240,91,113],[766,669,91,113],[542,279,599,62],[1619,685,91,113],[1515,313,367,99],[542,343,365,99],[0,0,507,99],[220,660,276,53],[1896,741,113,53],[1959,0,60,60],[1822,514,180,144],[1884,313,140,199],[509,0,256,194],[311,196,229,169],[1128,620,121,97],[1733,0,224,196],[190,367,178,196],[0,240,188,192],[1617,414,203,162]]}
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



(lib.CachedBmp_481 = function() {
	this.initialize(ss["vital_maint_lot_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_480 = function() {
	this.initialize(ss["vital_maint_lot_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_479 = function() {
	this.initialize(ss["vital_maint_lot_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_478 = function() {
	this.initialize(ss["vital_maint_lot_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_477 = function() {
	this.initialize(ss["vital_maint_lot_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_476 = function() {
	this.initialize(ss["vital_maint_lot_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_475 = function() {
	this.initialize(ss["vital_maint_lot_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_474 = function() {
	this.initialize(ss["vital_maint_lot_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_473 = function() {
	this.initialize(ss["vital_maint_lot_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_472 = function() {
	this.initialize(ss["vital_maint_lot_atlas_2"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_471 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_470 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_469 = function() {
	this.initialize(ss["vital_maint_lot_atlas_2"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_468 = function() {
	this.initialize(ss["vital_maint_lot_atlas_2"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_467 = function() {
	this.initialize(ss["vital_maint_lot_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_466 = function() {
	this.initialize(ss["vital_maint_lot_atlas_1"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_465 = function() {
	this.initialize(ss["vital_maint_lot_atlas_2"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_464 = function() {
	this.initialize(ss["vital_maint_lot_atlas_2"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_463 = function() {
	this.initialize(ss["vital_maint_lot_atlas_1"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_462 = function() {
	this.initialize(ss["vital_maint_lot_atlas_2"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_461 = function() {
	this.initialize(ss["vital_maint_lot_atlas_2"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_460 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_459 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_458 = function() {
	this.initialize(ss["vital_maint_lot_atlas_1"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_457 = function() {
	this.initialize(ss["vital_maint_lot_atlas_2"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_456 = function() {
	this.initialize(ss["vital_maint_lot_atlas_2"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_455 = function() {
	this.initialize(ss["vital_maint_lot_atlas_2"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_454 = function() {
	this.initialize(ss["vital_maint_lot_atlas_1"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_453 = function() {
	this.initialize(ss["vital_maint_lot_atlas_2"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_452 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_451 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_450 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_449 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_448 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_447 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_446 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_445 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_444 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_443 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_442 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_441 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_440 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_439 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_438 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_437 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_436 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_435 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_434 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_433 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_432 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_431 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_430 = function() {
	this.initialize(ss["vital_maint_lot_atlas_2"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_429 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_428 = function() {
	this.initialize(ss["vital_maint_lot_atlas_2"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_427 = function() {
	this.initialize(ss["vital_maint_lot_atlas_2"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_426 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_425 = function() {
	this.initialize(ss["vital_maint_lot_atlas_2"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_424 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_423 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_422 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_421 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_420 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_419 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_418 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_417 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_416 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(36);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_415 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(37);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_414 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(38);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_413 = function() {
	this.initialize(ss["vital_maint_lot_atlas_2"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_412 = function() {
	this.initialize(ss["vital_maint_lot_atlas_2"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_411 = function() {
	this.initialize(ss["vital_maint_lot_atlas_2"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_410 = function() {
	this.initialize(ss["vital_maint_lot_atlas_2"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_409 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(39);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_408 = function() {
	this.initialize(ss["vital_maint_lot_atlas_2"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_407 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(40);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_406 = function() {
	this.initialize(ss["vital_maint_lot_atlas_2"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_405 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(41);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_404 = function() {
	this.initialize(ss["vital_maint_lot_atlas_2"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_403 = function() {
	this.initialize(ss["vital_maint_lot_atlas_2"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_402 = function() {
	this.initialize(ss["vital_maint_lot_atlas_1"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_401 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(42);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_400 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(43);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_399 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(44);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_398 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(45);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_397 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(46);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_396 = function() {
	this.initialize(ss["vital_maint_lot_atlas_1"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_395 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(47);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_394 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(48);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_393 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(49);
}).prototype = p = new cjs.Sprite();



(lib.image132 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(50);
}).prototype = p = new cjs.Sprite();



(lib.image133 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(51);
}).prototype = p = new cjs.Sprite();



(lib.image134 = function() {
	this.initialize(ss["vital_maint_lot_atlas_2"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.image149 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(52);
}).prototype = p = new cjs.Sprite();



(lib.image154 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(53);
}).prototype = p = new cjs.Sprite();



(lib.image167 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(54);
}).prototype = p = new cjs.Sprite();



(lib.image172 = function() {
	this.initialize(ss["vital_maint_lot_atlas_2"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.image173 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(55);
}).prototype = p = new cjs.Sprite();



(lib.image185 = function() {
	this.initialize(ss["vital_maint_lot_atlas_2"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.image2 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(56);
}).prototype = p = new cjs.Sprite();



(lib.image28 = function() {
	this.initialize(ss["vital_maint_lot_atlas_2"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.image29 = function() {
	this.initialize(ss["vital_maint_lot_atlas_2"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.image3 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(57);
}).prototype = p = new cjs.Sprite();



(lib.image4 = function() {
	this.initialize(ss["vital_maint_lot_atlas_2"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.image50 = function() {
	this.initialize(ss["vital_maint_lot_atlas_2"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.lot10 = function() {
	this.initialize(ss["vital_maint_lot_atlas_3"]);
	this.gotoAndStop(58);
}).prototype = p = new cjs.Sprite();



(lib.lot13 = function() {
	this.initialize(ss["vital_maint_lot_atlas_2"]);
	this.gotoAndStop(36);
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
	this.instance = new lib.CachedBmp_481();
	this.instance.setTransform(-149.15,-3.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-149.1,-3.7,453.29999999999995,33);


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
	this.instance = new lib.CachedBmp_480();
	this.instance.setTransform(-1,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-3.4,428,75.7);


(lib.text183 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_479();
	this.instance.setTransform(-1,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-3.4,422,57.699999999999996);


(lib.text182 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_478();
	this.instance.setTransform(-1,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-3.4,306.6,22);


(lib.text181 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_477();
	this.instance.setTransform(-1,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-3.4,429,75.7);


(lib.text180 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_476();
	this.instance.setTransform(-2,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2,-3.4,256.9,39.699999999999996);


(lib.text178 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_475();
	this.instance.setTransform(-4,-3.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.7,233.9,33);


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
	this.instance = new lib.CachedBmp_474();
	this.instance.setTransform(-76.75,-3.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-76.7,-3.7,289.8,33);


(lib.text175 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_473();
	this.instance.setTransform(-79.6,-3.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-79.6,-3.7,295.9,33);


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
	this.instance = new lib.CachedBmp_472();
	this.instance.setTransform(1.95,-3.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(2,-3.7,182.1,33);


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
	this.instance = new lib.CachedBmp_471();
	this.instance.setTransform(39.15,-1.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(39.2,-1.9,160.10000000000002,29);


(lib.text157 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_470();
	this.instance.setTransform(39.15,-2.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(39.2,-2.9,176.10000000000002,29);


(lib.text151 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_469();
	this.instance.setTransform(37.15,-2.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-2.9,201.5,29);


(lib.text148 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_468();
	this.instance.setTransform(-2,-3.5,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2,-3.5,320.3,37.7);


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
	this.instance = new lib.CachedBmp_467();
	this.instance.setTransform(-2,-3.5,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2,-3.5,412.3,54.4);


(lib.text146 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_466();
	this.instance.setTransform(-2,-3.5,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2,-3.5,408,88.1);


(lib.text145 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_465();
	this.instance.setTransform(-1,-3.5,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-3.5,418.3,37.7);


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
	this.instance = new lib.CachedBmp_464();
	this.instance.setTransform(-1,-3.5,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-3.5,337.3,37.7);


(lib.text143 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_463();
	this.instance.setTransform(-1,-3.5,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-3.5,419.3,71.1);


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
	this.instance = new lib.CachedBmp_462();
	this.instance.setTransform(-1,-3.5,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-3.5,227.2,37.7);


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
	this.instance = new lib.CachedBmp_461();
	this.instance.setTransform(39.15,-2.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(39.2,-2.9,214.5,29);


(lib.text138 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_460();
	this.instance.setTransform(37.15,-3.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-3.9,72.7,29);


(lib.text136 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_459();
	this.instance.setTransform(37.15,-3.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(37.2,-3.9,143.7,29);


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
	this.instance = new lib.CachedBmp_458();
	this.instance.setTransform(-3,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3,-3.4,433.3,57.699999999999996);


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
	this.instance = new lib.CachedBmp_457();
	this.instance.setTransform(-4,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,421.7,22);


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
	this.instance = new lib.CachedBmp_456();
	this.instance.setTransform(-4,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,416.3,22);


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
	this.instance = new lib.CachedBmp_455();
	this.instance.setTransform(-4,-3.4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.4,419,39.699999999999996);


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
	this.instance = new lib.CachedBmp_454();
	this.instance.setTransform(-2.95,-4.15,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.9,-4.1,432,129.4);


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
	this.instance = new lib.CachedBmp_453();
	this.instance.setTransform(-3.3,-1.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.3,-1.7,335.90000000000003,33);


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
	this.instance = new lib.CachedBmp_452();
	this.instance.setTransform(51.5,-4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(51.5,-4,49.400000000000006,26.4);


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
	this.instance = new lib.CachedBmp_451();
	this.instance.setTransform(51.45,-3.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(51.5,-3.9,50,28.4);


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
	this.instance = new lib.CachedBmp_450();
	this.instance.setTransform(52.9,-4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(52.9,-4,46.1,26.4);


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
	this.instance = new lib.CachedBmp_449();
	this.instance.setTransform(34.55,-3.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(34.6,-3.9,87,41.699999999999996);


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
	this.instance = new lib.CachedBmp_448();
	this.instance.setTransform(36.1,-3.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(36.1,-3.9,85.1,41.699999999999996);


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
	this.instance = new lib.CachedBmp_447();
	this.instance.setTransform(25.6,-3.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(25.6,-3.9,110.80000000000001,29);


(lib.text118 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_446();
	this.instance.setTransform(31.75,-3.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(31.8,-3.9,97.39999999999999,29);


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
	this.instance = new lib.CachedBmp_445();
	this.instance.setTransform(23.8,-3.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(23.8,-3.9,114.8,29);


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
	this.instance = new lib.CachedBmp_444();
	this.instance.setTransform(20.85,-3.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(20.9,-3.9,103,45.699999999999996);


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
	this.instance = new lib.CachedBmp_443();
	this.instance.setTransform(55.1,-3.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(55.1,-3.9,42.1,29);


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
	this.instance = new lib.CachedBmp_442();
	this.instance.setTransform(18.05,-3.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(18.1,-3.9,123.4,29);


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
	this.instance = new lib.CachedBmp_441();
	this.instance.setTransform(38.5,-3.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(38.5,-3.9,78.4,29);


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
	this.instance = new lib.CachedBmp_440();
	this.instance.setTransform(52.4,-2.9,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(52.4,-2.9,50.1,28.4);


(lib.text111 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_439();
	this.instance.setTransform(52.9,-4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(52.9,-4,46.1,26.4);


(lib.text110 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_438();
	this.instance.setTransform(50.15,-4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(50.2,-4,52.3,26.4);


(lib.text109 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_437();
	this.instance.setTransform(13.25,-3.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(13.3,-3.7,135.39999999999998,33);


(lib.text108 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_436();
	this.instance.setTransform(22.15,-3.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(22.2,-3.7,120.10000000000001,33);


(lib.text107 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_435();
	this.instance.setTransform(34,-4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(34,-4,87.8,26.4);


(lib.text106 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_434();
	this.instance.setTransform(58.95,-4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(59,-4,32.7,26.4);


(lib.text105 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_433();
	this.instance.setTransform(58.95,-4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(59,-4,32.7,26.4);


(lib.text104 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_432();
	this.instance.setTransform(29,-4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(29,-4,87.1,28.4);


(lib.text103 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_431();
	this.instance.setTransform(42.05,-4,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(42.1,-4,59.99999999999999,41.4);


(lib.text61 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_430();
	this.instance.setTransform(0,0,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,389.6,27.4);


(lib.text57 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_429();
	this.instance.setTransform(-4,-3.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.7,163.8,33);


(lib.text56 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_428();
	this.instance.setTransform(-42.3,-3.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-42.3,-3.7,184.5,33);


(lib.text54 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_427();
	this.instance.setTransform(-49.3,-3.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-49.3,-3.7,203.5,33);


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
	this.instance = new lib.CachedBmp_426();
	this.instance.setTransform(-9.4,-3.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.4,-3.7,123.4,33);


(lib.text48 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_425();
	this.instance.setTransform(-4,-3.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.7,333.9,33);


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
	this.instance = new lib.CachedBmp_424();
	this.instance.setTransform(34.3,-3.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(34.3,-3.7,45.5,33);


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
	this.instance = new lib.CachedBmp_423();
	this.instance.setTransform(33.2,-3.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(33.2,-3.7,48,33);


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
	this.instance = new lib.CachedBmp_422();
	this.instance.setTransform(35,-3.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(35,-3.7,44,33);


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
	this.instance = new lib.CachedBmp_421();
	this.instance.setTransform(35,-3.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(35,-3.7,44,33);


(lib.text40 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_420();
	this.instance.setTransform(31.35,-3.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(31.4,-3.7,52.00000000000001,33);


(lib.text39 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_419();
	this.instance.setTransform(31.35,-3.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(31.4,-3.7,52.00000000000001,33);


(lib.text38 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_418();
	this.instance.setTransform(31.35,-3.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(31.4,-3.7,52.00000000000001,33);


(lib.text37 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_417();
	this.instance.setTransform(31.35,-3.7,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(31.4,-3.7,52.00000000000001,33);


(lib.text35 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_416();
	this.instance.setTransform(4.8,-2.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(4.8,-2.7,114.8,33);


(lib.text33 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_415();
	this.instance.setTransform(25.3,-2.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(25.3,-2.7,71.7,33);


(lib.text31 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_414();
	this.instance.setTransform(-14.55,-2.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-14.5,-2.7,157.1,33);


(lib.text27 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_413();
	this.instance.setTransform(-4,-3.5,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.5,407,20.7);


(lib.text26 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_412();
	this.instance.setTransform(-4,-3.5,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.5,375.3,37.7);


(lib.text25 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_411();
	this.instance.setTransform(-4,-3.5,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.5,392.3,37.7);


(lib.text24 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_410();
	this.instance.setTransform(-4,-3.5,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.5,365.3,37.7);


(lib.text23 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_409();
	this.instance.setTransform(-1,-3.5,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-3.5,112.8,37.7);


(lib.text22 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_408();
	this.instance.setTransform(-4,-3.5,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.5,395,37.7);


(lib.text21 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_407();
	this.instance.setTransform(-1,-3.5,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-3.5,30.4,37.7);


(lib.text20 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_406();
	this.instance.setTransform(-4,-3.5,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.5,354.3,54.4);


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
	this.instance = new lib.CachedBmp_405();
	this.instance.setTransform(-1,-3.5,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-3.5,30.4,37.7);


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
	this.instance = new lib.CachedBmp_404();
	this.instance.setTransform(-4,-3.5,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.5,299.9,37.7);


(lib.text17 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_403();
	this.instance.setTransform(-4,-3.5,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-3.5,387,20.7);


(lib.text16 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_402();
	this.instance.setTransform(-1,-3.5,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-3.5,406.6,54.4);


(lib.text15 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_401();
	this.instance.setTransform(-1,-3.5,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-3.5,199.8,20.7);


(lib.text14 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_400();
	this.instance.setTransform(-1,-3.5,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-3.5,30.4,37.7);


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
	this.instance = new lib.CachedBmp_399();
	this.instance.setTransform(-9.5,-3.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-9.5,-3.7,122.4,33);


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
	this.instance = new lib.CachedBmp_398();
	this.instance.setTransform(-7.7,-3.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-7.7,-3.7,121.8,33);


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
	this.instance = new lib.CachedBmp_397();
	this.instance.setTransform(-33.95,-2.7,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-33.9,-2.7,169.1,33);


(lib.shape186 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("EAgUABtMhAnAAAIAAjZMBAnAAAg");
	this.shape.setTransform(-11.475,156.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("EggTABtIAAjZMBAnAAAIAADZg");
	this.shape_1.setTransform(-11.475,156.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FFFFFF").ss(3,1,0,3).p("AhqmaIg6AOAjcl3QgbAMgaAPAAPmjIg9ACAD2lrQgbgNgcgLACFmUIg8gKAHVBzQAJgdAEgfAHmgEQAAgfgFgdAHSh5QgJgcgOgbAGajiIgngtADpFyIA0gdAGeDcIAggyAFOExIAqgnAmXjlQgSAYgPAZAnQh9QgKAcgFAeAnlgHIAAAHQAAAaADAZAlCk6IgtAoAmhDZQARAYAWAXAlNExQAXATAZAQAjoFyQAbANAcAJAh2GYIA8AJAAAGkIA7gDAnWBuQAJAdANAaAB3GYIA6gQAFXkoIgugk");
	this.shape_2.setTransform(68.65,33);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	var sprImg_shape_3 = cjs.SpriteSheetUtils.extractFrame(ss["vital_maint_lot_atlas_2"],31);
	sprImg_shape_3.onload = function(){
		this.shape_3.graphics.bf(sprImg_shape_3, null, new cjs.Matrix2D(1.579,0,0,1.579,-225.9,-170.6)).s().p("EgjSAaqMAAAg1TMBGlAAAMAAAA1Tg")
	}.bind(this);
	this.shape_3.setTransform(0.025,-0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-225.8,-170.6,451.70000000000005,341.2);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AUWBtMgorAAAIAAjZMAorAAAg");
	this.shape.setTransform(23.125,-11.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("A0VBtIAAjZMAorAAAIAADZg");
	this.shape_1.setTransform(23.125,-11.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-108.1,-23.6,262.5,23.8);


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

	// Layer_5
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AWEBtMgsHAAAIAAjZMAsHAAAg");
	this.shape.setTransform(-7.025,178.15);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("A2DBtIAAjZMAsHAAAIAADZg");
	this.shape_1.setTransform(-7.025,178.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_4
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FF9900").ss(3,1,0,3).p("ApFqUIACgCQAYgTAPgWAoFr1QADgOAAgPQAAgRgEgPAoetoQgOgVgXgSQgYgTgbgMAqvu/IgwgEIgMAAAsnu6QgdAIgaAPAuNuAQgXAXgLAaAu8sVIAAADQAAAfALAbAuPqnIATARIAdAUAsoprIA9AJAqyplQAfgFAbgMAMQHbQgcgJgggCAKZHTQgeAEgbAMAO2MIQAHgcAAgfAO3KSQgHgegNgbAOCIoIgOgPQgWgWgYgPAIsIBIgbAYIgRASAHgJdQgNAbgGAdAHILRQABAfAHAcAMdO1QAbgLAZgRAKrPEIA3gBAHnNEQAOAaAWAXAI4OcQAaARAcAKAN+NwQAVgXAOga");
	this.shape_2.setTransform(21.65,13.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_3
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#FF0000").ss(1,0,0,3).p("AwBAAMAgDAAA");
	this.shape_3.setTransform(126.05,-53.25);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Layer_2
	this.shape_4 = new cjs.Shape();
	var sprImg_shape_4 = cjs.SpriteSheetUtils.extractFrame(ss["vital_maint_lot_atlas_2"],30);
	sprImg_shape_4.onload = function(){
		this.shape_4.graphics.bf(sprImg_shape_4, null, new cjs.Matrix2D(0.881,0,0,0.881,-126.8,-87.2)).s().p("AzzNoIAA7PMAnoAAAIAAbPg")
	}.bind(this);
	this.shape_4.setTransform(101.35,107);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	// Layer_1
	this.shape_5 = new cjs.Shape();
	var sprImg_shape_5 = cjs.SpriteSheetUtils.extractFrame(ss["vital_maint_lot_atlas_3"],55);
	sprImg_shape_5.onload = function(){
		this.shape_5.graphics.bf(sprImg_shape_5, null, new cjs.Matrix2D(1.066,0,0,1.066,-119.4,-104.5)).s().p("AyqQVMAAAggpMAlVAAAMAAAAgpg")
	}.bind(this);
	this.shape_5.setTransform(-108.75,-89.7);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-228.2,-194.2,457.79999999999995,388.4);


(lib.shape169 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("APFBfI+JAAIAAi+IeJAAg");
	this.shape.setTransform(15.5,14.35);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#FFCC00","#C4F00F","#FFCC00"],[0,0.494,1],0,-10.7,0,10.8).s().p("AvEBgIAAi/IeJAAIAAC/g");
	this.shape_1.setTransform(15.5,14.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_4
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FF0000").ss(1,0,0,3).p("Ar7AAIX3AA");
	this.shape_2.setTransform(-3.525,-189.9);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_3
	this.shape_3 = new cjs.Shape();
	var sprImg_shape_3 = cjs.SpriteSheetUtils.extractFrame(ss["vital_maint_lot_atlas_3"],54);
	sprImg_shape_3.onload = function(){
		this.shape_3.graphics.bf(sprImg_shape_3, null, new cjs.Matrix2D(1.459,0,0,1.459,-88.2,-70.7)).s().p("AtxLDIAA2FIbkAAIAAWFg")
	}.bind(this);
	this.shape_3.setTransform(-132.45,112.4);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Layer_2
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#FFFFFF").ss(3,0,0,3).p("At4hDIAAn4IbxAAIAASH");
	this.shape_4.setTransform(-132.05,98.35);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	// Layer_1
	this.instance = new lib.lot13();
	this.instance.setTransform(-220,-182,1.2596,1.2596);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-222.4,-190.9,443.3,374.20000000000005);


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

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF9900").ss(3,1,0,3).p("ADEiWQgYgSgbgNADKCRQAZgUARgWAEPAxQAHgXAAgaIgBgJAEIhEQgLgagVgXABiDHQAdgIAbgOAghjSIg7AKAiUizQgZAMgXARAjvhrQgUAYgJAcAkVAEQABAfALAcAjqByQAQATAWARIAGAEAiKC4QAbANAeAHABYjKIg9gJAgUDUIA7gC");
	this.shape.setTransform(-3.55,30.625);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FF9900").ss(3,1,0,3).p("AAAjLQgfAAgbAIAhwiqIggAaIgNAOACshsQgMgTgRgRIgKgJABTi6QgbgMgegEAiQCQQAVAVAYAOAgsDHIAsAFIAQgBABKC+QAcgLAZgUACmB1QASgZAJgcADLAFIAAgFQAAgcgHgaAi8hPQgMAcgDAfAjIAmQAFAeAOAb");
	this.shape_1.setTransform(-104.45,-185.6988);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-126.3,-207.6,152,260.9);


(lib.shape163 = function(mode,startPosition,loop,reversed) {
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
	this.shape.setTransform(-57.35,71.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-90.9,45.6,67.2,51.699999999999996);


(lib.shape161 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#FF0000").ss(3,1,0,3).p("AjFCWIGLkr");
	this.shape.setTransform(-56.975,-215.05);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-78.2,-231.5,42.5,33);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("ALLBfI2VAAIAAi+IWVAAg");
	this.shape.setTransform(5.5,-243.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("ArKBfIAAi9IWVAAIAAC9g");
	this.shape_1.setTransform(5.5,-243.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-67,-254.4,145,21.099999999999994);


(lib.shape156 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AMSBfI4jAAIAAi9IYjAAg");
	this.shape.setTransform(-102.825,106.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AsRBfIAAi+IYjAAIAAC+g");
	this.shape_1.setTransform(-102.825,106.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-182.4,96,159.20000000000002,21.099999999999994);


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

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("APFBfI+JAAIAAi9IeJAAg");
	this.shape.setTransform(-61.5,-68);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#FFCC00","#C4F00F","#FFCC00"],[0,0.494,1],0,-10.7,0,10.8).s().p("AvEBgIAAi/IeJAAIAAC/g");
	this.shape_1.setTransform(-61.5,-68);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_3
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FF0000").ss(1,0,0,3).p("AsJAAIYTAA");
	this.shape_2.setTransform(58.45,-158.8);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_2
	this.instance = new lib.lot10();
	this.instance.setTransform(-276,-264,1.1614,1.1614);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	var sprImg_shape_3 = cjs.SpriteSheetUtils.extractFrame(ss["vital_maint_lot_atlas_3"],53);
	sprImg_shape_3.onload = function(){
		this.shape_3.graphics.bf(sprImg_shape_3, null, new cjs.Matrix2D(1.116,0,0,1.116,-127.8,-94.3)).s().p("Az9OvIAA9dMAn7AAAIAAddg")
	}.bind(this);
	this.shape_3.setTransform(41.275,23.95);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-276,-264,445.1,382.3);


(lib.shape150 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("APFBfI+JAAIAAi+IeJAAg");
	this.shape.setTransform(9.25,10.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#FFCC00","#C4F00F","#FFCC00"],[0,0.494,1],0,-10.7,0,10.8).s().p("AvEBgIAAi/IeJAAIAAC/g");
	this.shape_1.setTransform(9.25,10.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_maint_lot_atlas_3"],52);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(1.774,0,0,1.774,-227,-172)).s().p("EgjeAa5MAAAg1xMBG9AAAMAAAA1xg")
	}.bind(this);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-227,-172,454.1,344.1);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("APFhfIAAC/I+JAAIAAi/g");
	this.shape.setTransform(26.65,3.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.lf(["#FFCC00","#C4F00F","#FFCC00"],[0,0.494,1],0,-10.7,0,10.8).s().p("AvEBfIAAi+IeJAAIAAC+g");
	this.shape_1.setTransform(26.65,3.8);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-70.8,-6.7,195,21.1);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("Ak9hfIJ7AAIAAC/Ip7AAg");
	this.shape.setTransform(148.575,166);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("Ak9BgIAAi/IJ7AAIAAC/g");
	this.shape_1.setTransform(148.575,166);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(115.8,155.5,65.60000000000001,21.099999999999994);


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

	// Layer_6
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AJ5hfIAAC/IzxAAIAAi/g");
	this.shape.setTransform(-160.475,166);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("Ap4BgIAAi/ITxAAIAAC/g");
	this.shape_1.setTransform(-160.475,166);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_5
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FF9900").ss(3,0,0,3).p("AOHLOI8NAAIAA2bIcNAAg");
	this.shape_2.setTransform(130.575,107.525);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_4
	this.shape_3 = new cjs.Shape();
	var sprImg_shape_3 = cjs.SpriteSheetUtils.extractFrame(ss["vital_maint_lot_atlas_3"],50);
	sprImg_shape_3.onload = function(){
		this.shape_3.graphics.bf(sprImg_shape_3, null, new cjs.Matrix2D(1,0,0,1,-90,-72)).s().p("AuDLQIAA2fIcHAAIAAWfg")
	}.bind(this);
	this.shape_3.setTransform(131.85,108.8);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Layer_3
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#FF9900").ss(3,0,0,3).p("AK+vjIAAfHI17AAIAA/Hg");
	this.shape_4.setTransform(-159.9,79.925);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	// Layer_2
	this.shape_5 = new cjs.Shape();
	var sprImg_shape_5 = cjs.SpriteSheetUtils.extractFrame(ss["vital_maint_lot_atlas_3"],51);
	sprImg_shape_5.onload = function(){
		this.shape_5.graphics.bf(sprImg_shape_5, null, new cjs.Matrix2D(1,0,0,1,-70,-99.5)).s().p("Aq7PjIAA/FIV3AAIAAfFg")
	}.bind(this);
	this.shape_5.setTransform(-158.85,81.3);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(1));

	// Layer_1
	this.shape_6 = new cjs.Shape();
	var sprImg_shape_6 = cjs.SpriteSheetUtils.extractFrame(ss["vital_maint_lot_atlas_2"],29);
	sprImg_shape_6.onload = function(){
		this.shape_6.graphics.bf(sprImg_shape_6, null, new cjs.Matrix2D(1.18,0,0,1.18,-221.8,-180.5)).s().p("EgiqAcNMAAAg4ZMBFUAAAMAAAA4Zg")
	}.bind(this);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-231.6,-180.5,454,361.5);


(lib.shape102 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.CachedBmp_396();
	this.instance.setTransform(-27.25,-124.8,0.3336,0.3336);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("Egj1gNjIQMAAIJYAAINmAAIIxAAIYBAAEAkHgJkI4BAAIoxAAItmAAIpYAAIwMAAEAkHgFlI4BAAIoxAAItmAAIpYAAIwMAAEgj1gBmIQMAAIJYAAINmAAIIxAAIYBAAEAkHgRTI4BAAAWvCsIDSAAAWvIeIDSAAAWvQcIDSAAAWvMiIDSAAAF+CsIDSAAAF+IeIDSAAAF+QcIDSAAAF+MiIDSAAEAkHAGXI4BAAIoxAAItmAAIpYAAIwMAAEAkHAKWI4BAAIoxAAItmAAIpYAAIwMAAEgj1AOVIQMAAIJYAAINmAAIIxAAIYBAAAF+VwIDSAAAF+b2IDSAAEgj1ASUIQMAAIJYAAINmAAIIxAAIYBAAEgj1AYfIQMAAIJYAAINmAAIIxAAIYBAAAWvVwIDSAAAWvb2IDSAAEgj1gQ/IgRAAAzp72Iv/OJAqRxTINmAA");
	this.shape.setTransform(-6.225,-13.5372);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(3,0,0,3).p("ADN9lIAAE9IAAF8IAADwIAAD/IAAD/IAAD/IAAH9IAAD/IAAD/IAAD/IAAGLIAAGgItnAAIpYAAIwLAAIAAmgIAAmLIAAj/IAAj/IAAj/IAAn9IAAj/IAAj/IAAj/IAAjcIAArNgAL9dmIAAmgIAAmLIAAj/IAAj/IAAj/IAAn9IAAj/IAAj/IAAj/IAAjwIAAl8IYBAAIAAk9MggxAAAADN4oIIwAAAL9dmIYBAAIAAmgIAAmLIAAj/IAAj/IAAj/IAAn9IAAj/IAAj/IAAj/IAAjwIAAl8AL9dmIowAAAqa4oIAAF8IAADwIAAD/IAAD/IAAD/IAAH9IAAD/IAAD/IAAD/IAAGLIAAGgAzy4oIAAknAzydmIAAmgIAAmLIAAj/IAAj/IAAj/IAAn9IAAj/IAAj/IAAj/IAApsIJYAAADN4oItnAA");
	this.shape_1.setTransform(-5.375,-4.65);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-238.3,-195.5,464.70000000000005,381.7);


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


(lib.shape55 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AOghsIAADZI8/AAIAAjZg");
	this.shape.setTransform(98.625,-5.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AufBtIAAjZIc/AAIAADZg");
	this.shape_1.setTransform(98.625,-5.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(4.8,-17.1,187.7,23.8);


(lib.shape53 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AP/BtI/9AAIAAjZIf9AAg");
	this.shape.setTransform(16.925,167.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("Av+BtIAAjZIf9AAIAADZg");
	this.shape_1.setTransform(16.925,167.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-86.4,155.2,206.7,23.80000000000001);


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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AJlhsIAADZIzJAAIAAjZg");
	this.shape.setTransform(-137.6,-5.2);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("ApkBtIAAjZITJAAIAADZg");
	this.shape_1.setTransform(-137.6,-5.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FF0000").ss(1,0,0,3).p("AqTAAIUnAA");
	this.shape_2.setTransform(-14.575,-166.1);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	var sprImg_shape_3 = cjs.SpriteSheetUtils.extractFrame(ss["vital_maint_lot_atlas_2"],35);
	sprImg_shape_3.onload = function(){
		this.shape_3.graphics.bf(sprImg_shape_3, null, new cjs.Matrix2D(1,0,0,1,-214,-163)).s().p("EghbAZeMAAAgy7MBC3AAAMAAAAy7g")
	}.bind(this);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-214,-167.1,428,330.1);


(lib.shape46 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#FF0000").ss(1,0,0,3).p("A2cAAMAs5AAA");
	this.shape.setTransform(-77.025,-176.65);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-221.7,-177.6,289.4,2);


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
	this.shape.graphics.f("#CDFFFF").s().p("AhdAeIAAg7IC7AAIAAA7g");
	this.shape.setTransform(-193.625,-52.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-203,-55.1,18.80000000000001,6);


(lib.shape36 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#FFFFC7").s().p("Ag7BsIAAjXIB3AAIAADXg");
	this.shape.setTransform(120.325,-19.6);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(114.3,-30.4,12.100000000000009,21.599999999999998);


(lib.shape34 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AH4BtIvvAAIAAjZIPvAAg");
	this.shape.setTransform(-177.5,54.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("An3BtIAAjZIPvAAIAADZg");
	this.shape_1.setTransform(-177.5,54.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-228.9,42.6,102.80000000000001,23.800000000000004);


(lib.shape32 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AkthsIJbAAIAADZIpbAAg");
	this.shape.setTransform(-196.9,-31.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AktBtIAAjZIJbAAIAADZg");
	this.shape_1.setTransform(-196.9,-31.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-228.1,-43.4,62.400000000000006,23.799999999999997);


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

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("Aq1hsIVrAAIAADZI1rAAg");
	this.shape.setTransform(-186.925,-112.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Aq1BtIAAjZIVrAAIAADZg");
	this.shape_1.setTransform(-186.925,-112.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_maint_lot_atlas_2"],32);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(0.788,0,0,0.788,-116.7,-147.7)).s().p("Ax1XGMAAAguKMAjrAAAMAAAAuKg")
	}.bind(this);
	this.shape_2.setTransform(49.75,-11.95);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_1
	this.shape_3 = new cjs.Shape();
	var sprImg_shape_3 = cjs.SpriteSheetUtils.extractFrame(ss["vital_maint_lot_atlas_2"],33);
	sprImg_shape_3.onload = function(){
		this.shape_3.graphics.bf(sprImg_shape_3, null, new cjs.Matrix2D(0.788,0,0,0.788,-114.6,-148.9)).s().p("Ax5W9MAAAgt5MAj0AAAMAAAAt5g")
	}.bind(this);
	this.shape_3.setTransform(-190.65,-11.675);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-305.3,-159.7,469.3,295.5);


(lib.shape12 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f("#000000").s().p("AgRARQgHgGAAgLQAAgJAHgIQAIgHAJAAQALAAAGAHQAIAIAAAJQAAALgIAGQgGAIgLAAQgJAAgIgIg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.5,-2.5,5,5);


(lib.shape8 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AJzBtIzlAAIAAjZITlAAg");
	this.shape.setTransform(-142.65,188.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("ApxBtIAAjZITjAAIAADZg");
	this.shape_1.setTransform(-142.65,188.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-206.3,176.5,127.30000000000001,23.80000000000001);


(lib.shape5 = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#000000").ss(2,0,0,3).p("AtAhsIaBAAIAADZI6BAAg");
	this.shape.setTransform(-99.8,-17.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(255,255,255,0.8)").s().p("AtABtIAAjZIaAAAIAADZg");
	this.shape_1.setTransform(-99.8,-17.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_3
	this.shape_2 = new cjs.Shape();
	var sprImg_shape_2 = cjs.SpriteSheetUtils.extractFrame(ss["vital_maint_lot_atlas_3"],56);
	sprImg_shape_2.onload = function(){
		this.shape_2.graphics.bf(sprImg_shape_2, null, new cjs.Matrix2D(1.149,0,0,1,-102.2,-98)).s().p("Av9PUIAA+nIf7AAIAAeng")
	}.bind(this);
	this.shape_2.setTransform(-118.8,-102.25);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer_2
	this.shape_3 = new cjs.Shape();
	var sprImg_shape_3 = cjs.SpriteSheetUtils.extractFrame(ss["vital_maint_lot_atlas_3"],57);
	sprImg_shape_3.onload = function(){
		this.shape_3.graphics.bf(sprImg_shape_3, null, new cjs.Matrix2D(1.172,0,0,1,-110.2,-96)).s().p("AxNPAIAA9/MAibAAAIAAd/g")
	}.bind(this);
	this.shape_3.setTransform(108.05,-101.35);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Layer_1
	this.shape_4 = new cjs.Shape();
	var sprImg_shape_4 = cjs.SpriteSheetUtils.extractFrame(ss["vital_maint_lot_atlas_2"],34);
	sprImg_shape_4.onload = function(){
		this.shape_4.graphics.bf(sprImg_shape_4, null, new cjs.Matrix2D(1.071,0,0,1.013,-197,-116.5)).s().p("A+xSNMAAAgkaMA9jAAAMAAAAkag")
	}.bind(this);
	this.shape_4.setTransform(-2.4,117.55);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-221,-200.2,439.3,434.29999999999995);


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
	this.instance = new lib.CachedBmp_395();
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
	this.instance = new lib.CachedBmp_394();
	this.instance.setTransform(5,12,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_393();
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


(lib.sprite188 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.text187("synched",0);
	this.instance.setTransform(-65.05,150.65);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_3
	this.instance_1 = new lib.shape186("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite188, new cjs.Rectangle(-225.8,-170.6,464.9,350.6), null);


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

	// Layer_8
	this.instance = new lib.text178("synched",0);
	this.instance.setTransform(25.55,-66.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_7
	this.instance_1 = new lib.text177("synched",0);
	this.instance_1.setTransform(-26.2,-17.85);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_6
	this.instance_2 = new lib.shape176("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer_5
	this.instance_3 = new lib.text175("synched",0);
	this.instance_3.setTransform(-57.95,172.05);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	// Layer_4
	this.instance_4 = new lib.shape174("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite179, new cjs.Rectangle(-228.2,-194.2,483.6,395.6), null);


(lib.sprite170 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_7
	this.instance = new lib.text165("synched",0);
	this.instance.setTransform(-81.25,-203.85);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_6
	this.instance_1 = new lib.text140("synched",0);
	this.instance_1.setTransform(-118.9,7.85);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_5
	this.instance_2 = new lib.shape169("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite170, new cjs.Rectangle(-222.4,-207.5,443.3,390.8), null);


(lib.sprite162 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.shape161("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite162, new cjs.Rectangle(-3.5,-3.3,7,6.699999999999999), null);


(lib.sprite152 = function(mode,startPosition,loop,reversed) {
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
	this.instance = new lib.text151("synched",0);
	this.instance.setTransform(-117.45,4.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_2
	this.instance_1 = new lib.shape150("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite152, new cjs.Rectangle(-227,-172,454.1,344.1), null);


(lib.sprite141 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_11
	this.instance = new lib.text140("synched",0);
	this.instance.setTransform(-106.75,-1.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_10
	this.instance_1 = new lib.shape139("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_9
	this.instance_2 = new lib.text138("synched",0);
	this.instance_2.setTransform(80.9,160.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer_8
	this.instance_3 = new lib.shape137("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	// Layer_7
	this.instance_4 = new lib.text136("synched",0);
	this.instance_4.setTransform(-260.7,160.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	// Layer_6
	this.instance_5 = new lib.shape135("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite141, new cjs.Rectangle(-231.6,-180.5,454,366.1), null);


(lib.sprite131 = function(mode,startPosition,loop,reversed) {
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
	this.frame_1458 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1458).call(this.frame_1458).wait(1));

	// Masked_Layer_66___58
	this.instance = new lib.text130("synched",0);
	this.instance.setTransform(-749.55,50.45);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1459));

	// Masked_Layer_65___58
	this.instance_1 = new lib.text129("synched",0);
	this.instance_1.setTransform(-736.15,17.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1459));

	// Masked_Layer_64___58
	this.instance_2 = new lib.shape12("synched",0);
	this.instance_2.setTransform(-745.15,25.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1459));

	// Masked_Layer_63___58
	this.instance_3 = new lib.text128("synched",0);
	this.instance_3.setTransform(-736.15,-16.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1459));

	// Masked_Layer_62___58
	this.instance_4 = new lib.shape12("synched",0);
	this.instance_4.setTransform(-745.15,-8.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1459));

	// Masked_Layer_61___58
	this.instance_5 = new lib.text127("synched",0);
	this.instance_5.setTransform(-736.15,-63.55);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1459));

	// Masked_Layer_60___58
	this.instance_6 = new lib.shape12("synched",0);
	this.instance_6.setTransform(-745.15,-55.55);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1459));

	// Masked_Layer_59___58
	this.instance_7 = new lib.text126("synched",0);
	this.instance_7.setTransform(-750.05,-205);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1459));

	// Layer_57
	this.instance_8 = new lib.text107("synched",0);
	this.instance_8.setTransform(38.2,-42.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1459));

	// Layer_56
	this.instance_9 = new lib.text107("synched",0);
	this.instance_9.setTransform(113.25,-68.35);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1459));

	// Layer_55
	this.instance_10 = new lib.text107("synched",0);
	this.instance_10.setTransform(113.25,-42.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1459));

	// Layer_54
	this.instance_11 = new lib.text110("synched",0);
	this.instance_11.setTransform(38.2,-68.35);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1459));

	// Layer_53
	this.instance_12 = new lib.text107("synched",0);
	this.instance_12.setTransform(38.2,-93.35);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1459));

	// Layer_52
	this.instance_13 = new lib.text125("synched",0);
	this.instance_13.setTransform(-157.4,-213.55);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1459));

	// Layer_51
	this.instance_14 = new lib.text111("synched",0);
	this.instance_14.setTransform(-173.35,157.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(1459));

	// Layer_50
	this.instance_15 = new lib.text111("synched",0);
	this.instance_15.setTransform(-173.35,118.95);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(1459));

	// Layer_49
	this.instance_16 = new lib.text111("synched",0);
	this.instance_16.setTransform(-173.35,85.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(1459));

	// Layer_48
	this.instance_17 = new lib.text111("synched",0);
	this.instance_17.setTransform(-173.35,61.15);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(1459));

	// Layer_47
	this.instance_18 = new lib.text111("synched",0);
	this.instance_18.setTransform(-173.35,35.15);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(1459));

	// Layer_46
	this.instance_19 = new lib.text111("synched",0);
	this.instance_19.setTransform(-173.35,-4.85);

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(1459));

	// Layer_45
	this.instance_20 = new lib.text111("synched",0);
	this.instance_20.setTransform(-173.35,-42.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(1459));

	// Layer_44
	this.instance_21 = new lib.text111("synched",0);
	this.instance_21.setTransform(-173.35,-68.35);

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(1459));

	// Layer_43
	this.instance_22 = new lib.text111("synched",0);
	this.instance_22.setTransform(-173.35,-93.35);

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(1459));

	// Layer_42
	this.instance_23 = new lib.text122("synched",0);
	this.instance_23.setTransform(-121.35,-93.35);

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(1459));

	// Layer_41
	this.instance_24 = new lib.text122("synched",0);
	this.instance_24.setTransform(-121.35,-68.35);

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(1459));

	// Layer_40
	this.instance_25 = new lib.text122("synched",0);
	this.instance_25.setTransform(-121.35,-42.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(1459));

	// Layer_39
	this.instance_26 = new lib.text124("synched",0);
	this.instance_26.setTransform(-121.35,-4.85);

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(1459));

	// Layer_38
	this.instance_27 = new lib.text122("synched",0);
	this.instance_27.setTransform(-121.35,35.15);

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(1459));

	// Layer_37
	this.instance_28 = new lib.text123("synched",0);
	this.instance_28.setTransform(-121.35,60.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(1459));

	// Layer_36
	this.instance_29 = new lib.text122("synched",0);
	this.instance_29.setTransform(-121.35,85.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(1459));

	// Layer_35
	this.instance_30 = new lib.text122("synched",0);
	this.instance_30.setTransform(-121.35,118.95);

	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(1459));

	// Layer_34
	this.instance_31 = new lib.text122("synched",0);
	this.instance_31.setTransform(-121.35,157.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(1459));

	// Layer_33
	this.instance_32 = new lib.text111("synched",0);
	this.instance_32.setTransform(-78.25,157.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(1459));

	// Layer_32
	this.instance_33 = new lib.text111("synched",0);
	this.instance_33.setTransform(-78.25,118.95);

	this.timeline.addTween(cjs.Tween.get(this.instance_33).wait(1459));

	// Layer_31
	this.instance_34 = new lib.text111("synched",0);
	this.instance_34.setTransform(-78.25,85.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_34).wait(1459));

	// Layer_30
	this.instance_35 = new lib.text111("synched",0);
	this.instance_35.setTransform(-78.25,61.15);

	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(1459));

	// Layer_29
	this.instance_36 = new lib.text111("synched",0);
	this.instance_36.setTransform(-78.25,35.15);

	this.timeline.addTween(cjs.Tween.get(this.instance_36).wait(1459));

	// Layer_28
	this.instance_37 = new lib.text111("synched",0);
	this.instance_37.setTransform(-78.25,-4.85);

	this.timeline.addTween(cjs.Tween.get(this.instance_37).wait(1459));

	// Layer_27
	this.instance_38 = new lib.text121("synched",0);
	this.instance_38.setTransform(-256.5,149.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_38).wait(1459));

	// Layer_26
	this.instance_39 = new lib.text120("synched",0);
	this.instance_39.setTransform(-256.5,110.95);

	this.timeline.addTween(cjs.Tween.get(this.instance_39).wait(1459));

	// Layer_25
	this.instance_40 = new lib.text119("synched",0);
	this.instance_40.setTransform(-256.5,84.95);

	this.timeline.addTween(cjs.Tween.get(this.instance_40).wait(1459));

	// Layer_24
	this.instance_41 = new lib.text118("synched",0);
	this.instance_41.setTransform(-256.5,60.45);

	this.timeline.addTween(cjs.Tween.get(this.instance_41).wait(1459));

	// Layer_23
	this.instance_42 = new lib.text117("synched",0);
	this.instance_42.setTransform(-256.5,34.45);

	this.timeline.addTween(cjs.Tween.get(this.instance_42).wait(1459));

	// Layer_22
	this.instance_43 = new lib.text116("synched",0);
	this.instance_43.setTransform(-255.5,-20.05);

	this.timeline.addTween(cjs.Tween.get(this.instance_43).wait(1459));

	// Layer_21
	this.instance_44 = new lib.text115("synched",0);
	this.instance_44.setTransform(-256.5,-43.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_44).wait(1459));

	// Layer_20
	this.instance_45 = new lib.text114("synched",0);
	this.instance_45.setTransform(-254.5,-69.05);

	this.timeline.addTween(cjs.Tween.get(this.instance_45).wait(1459));

	// Layer_19
	this.instance_46 = new lib.text113("synched",0);
	this.instance_46.setTransform(-256.5,-94.05);

	this.timeline.addTween(cjs.Tween.get(this.instance_46).wait(1459));

	// Layer_18
	this.instance_47 = new lib.text111("synched",0);
	this.instance_47.setTransform(-78.25,-93.35);

	this.timeline.addTween(cjs.Tween.get(this.instance_47).wait(1459));

	// Layer_17
	this.instance_48 = new lib.text112("synched",0);
	this.instance_48.setTransform(-78.25,-68.85);

	this.timeline.addTween(cjs.Tween.get(this.instance_48).wait(1459));

	// Layer_16
	this.instance_49 = new lib.text111("synched",0);
	this.instance_49.setTransform(-78.25,-42.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_49).wait(1459));

	// Layer_15
	this.instance_50 = new lib.text110("synched",0);
	this.instance_50.setTransform(-28.45,-42.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_50).wait(1459));

	// Layer_14
	this.instance_51 = new lib.text110("synched",0);
	this.instance_51.setTransform(-28.45,-68.35);

	this.timeline.addTween(cjs.Tween.get(this.instance_51).wait(1459));

	// Layer_13
	this.instance_52 = new lib.text110("synched",0);
	this.instance_52.setTransform(-28.45,-93.35);

	this.timeline.addTween(cjs.Tween.get(this.instance_52).wait(1459));

	// Layer_12
	this.instance_53 = new lib.text109("synched",0);
	this.instance_53.setTransform(48.7,-184.85);

	this.timeline.addTween(cjs.Tween.get(this.instance_53).wait(1459));

	// Layer_11
	this.instance_54 = new lib.text108("synched",0);
	this.instance_54.setTransform(-129.6,-184.85);

	this.timeline.addTween(cjs.Tween.get(this.instance_54).wait(1459));

	// Layer_10
	this.instance_55 = new lib.text107("synched",0);
	this.instance_55.setTransform(113.25,-93.35);

	this.timeline.addTween(cjs.Tween.get(this.instance_55).wait(1459));

	// Layer_9
	this.instance_56 = new lib.text106("synched",0);
	this.instance_56.setTransform(113.25,-117.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_56).wait(1459));

	// Layer_8
	this.instance_57 = new lib.text106("synched",0);
	this.instance_57.setTransform(-78.25,-117.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_57).wait(1459));

	// Layer_7
	this.instance_58 = new lib.text105("synched",0);
	this.instance_58.setTransform(38.2,-117.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_58).wait(1459));

	// Layer_6
	this.instance_59 = new lib.text105("synched",0);
	this.instance_59.setTransform(-121.35,-117.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_59).wait(1459));

	// Layer_5
	this.instance_60 = new lib.text104("synched",0);
	this.instance_60.setTransform(78.45,-156.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_60).wait(1459));

	// Layer_4
	this.instance_61 = new lib.text104("synched",0);
	this.instance_61.setTransform(-100.85,-156.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_61).wait(1459));

	// Layer_3
	this.instance_62 = new lib.text103("synched",0);
	this.instance_62.setTransform(-28.45,-151.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_62).wait(1459));

	// Layer_2
	this.instance_63 = new lib.text103("synched",0);
	this.instance_63.setTransform(-173.35,-151.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_63).wait(1459));

	// Layer_1
	this.instance_64 = new lib.shape102("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_64).wait(1459));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-753,-215.2,988,402.9);


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


(lib.sprite58 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_9
	this.instance = new lib.text57("synched",0);
	this.instance.setTransform(-79.65,-180.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_8
	this.instance_1 = new lib.text56("synched",0);
	this.instance_1.setTransform(49.05,-12.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_7
	this.instance_2 = new lib.shape55("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer_6
	this.instance_3 = new lib.text54("synched",0);
	this.instance_3.setTransform(-34.85,159.95);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	// Layer_5
	this.instance_4 = new lib.shape53("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	// Layer_4
	this.instance_5 = new lib.text52("synched",0);
	this.instance_5.setTransform(-189.45,-12.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

	// Layer_3
	this.instance_6 = new lib.shape51("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite58, new cjs.Rectangle(-214,-184,428,373.3), null);


(lib.sprite49 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_50
	this.instance = new lib.text48("synched",0);
	this.instance.setTransform(-222.7,-191.05);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_49
	this.instance_1 = new lib.shape46("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_48
	this.instance_2 = new lib.text45("synched",0);
	this.instance_2.setTransform(-221.15,-55.95,0.5145,0.5145);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer_47
	this.instance_3 = new lib.shape41("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	// Layer_46
	this.instance_4 = new lib.text44("synched",0);
	this.instance_4.setTransform(-243.7,-55.95,0.5145,0.5145);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	// Layer_45
	this.instance_5 = new lib.shape41("synched",0);
	this.instance_5.setTransform(-22.55,-3.65,1,0.9333);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

	// Layer_44
	this.instance_6 = new lib.text43("synched",0);
	this.instance_6.setTransform(-266.25,-55.95,0.5145,0.5145);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1));

	// Layer_43
	this.instance_7 = new lib.shape41("synched",0);
	this.instance_7.setTransform(-45.1,-7.65,1,0.8583);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1));

	// Layer_42
	this.instance_8 = new lib.text42("synched",0);
	this.instance_8.setTransform(-289,-55.65,0.5145,0.5145);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1));

	// Layer_41
	this.instance_9 = new lib.shape41("synched",0);
	this.instance_9.setTransform(-67.85,-2.6,1,0.95);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1));

	// Layer_40
	this.instance_10 = new lib.text45("synched",0);
	this.instance_10.setTransform(-224.4,118.95,0.5145,0.5145);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1));

	// Layer_39
	this.instance_11 = new lib.shape41("synched",0);
	this.instance_11.setTransform(-3.25,176.95,1,1.0583);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1));

	// Layer_38
	this.instance_12 = new lib.text44("synched",0);
	this.instance_12.setTransform(-245.95,118.3,0.5145,0.5145);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1));

	// Layer_37
	this.instance_13 = new lib.shape41("synched",0);
	this.instance_13.setTransform(-24.8,170.3,1,0.925);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1));

	// Layer_36
	this.instance_14 = new lib.text43("synched",0);
	this.instance_14.setTransform(-269.15,118.05,0.5145,0.5145);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(1));

	// Layer_35
	this.instance_15 = new lib.shape41("synched",0);
	this.instance_15.setTransform(-48,177.25,1,1.0667);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(1));

	// Layer_34
	this.instance_16 = new lib.text42("synched",0);
	this.instance_16.setTransform(-290.25,118.05,0.5145,0.5145);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(1));

	// Layer_33
	this.instance_17 = new lib.shape41("synched",0);
	this.instance_17.setTransform(-69.1,173.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(1));

	// Layer_32
	this.instance_18 = new lib.text45("synched",0);
	this.instance_18.setTransform(-225.15,22.8,0.5145,0.5145);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(1));

	// Layer_31
	this.instance_19 = new lib.shape41("synched",0);
	this.instance_19.setTransform(-4,124.15,1,1.875);

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(1));

	// Layer_30
	this.instance_20 = new lib.text44("synched",0);
	this.instance_20.setTransform(-245.95,22.8,0.5145,0.5145);

	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(1));

	// Layer_29
	this.instance_21 = new lib.shape41("synched",0);
	this.instance_21.setTransform(-24.8,124.15,1,1.875);

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(1));

	// Layer_28
	this.instance_22 = new lib.text43("synched",0);
	this.instance_22.setTransform(-265.4,22.8,0.5145,0.5145);

	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(1));

	// Layer_27
	this.instance_23 = new lib.shape41("synched",0);
	this.instance_23.setTransform(-44.25,124.15,1,1.875);

	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(1));

	// Layer_26
	this.instance_24 = new lib.text42("synched",0);
	this.instance_24.setTransform(-285,22.8,0.5145,0.5145);

	this.timeline.addTween(cjs.Tween.get(this.instance_24).wait(1));

	// Layer_25
	this.instance_25 = new lib.shape41("synched",0);
	this.instance_25.setTransform(-63.85,124.15,1,1.875);

	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(1));

	// Layer_24
	this.instance_26 = new lib.text40("synched",0);
	this.instance_26.setTransform(116.4,10.1,0.5505,0.5505,-90);

	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(1));

	// Layer_23
	this.instance_27 = new lib.shape36("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_27).wait(1));

	// Layer_22
	this.instance_28 = new lib.text39("synched",0);
	this.instance_28.setTransform(67.95,10.1,0.5505,0.5505,-90);

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(1));

	// Layer_21
	this.instance_29 = new lib.shape36("synched",0);
	this.instance_29.setTransform(-48.45,0);

	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(1));

	// Layer_20
	this.instance_30 = new lib.text38("synched",0);
	this.instance_30.setTransform(18.35,10.1,0.5505,0.5505,-90);

	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(1));

	// Layer_19
	this.instance_31 = new lib.shape36("synched",0);
	this.instance_31.setTransform(-98.05,0);

	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(1));

	// Layer_18
	this.instance_32 = new lib.text37("synched",0);
	this.instance_32.setTransform(-12.45,10.1,0.5505,0.5505,-90);

	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(1));

	// Layer_17
	this.instance_33 = new lib.shape36("synched",0);
	this.instance_33.setTransform(-128.85,0);

	this.timeline.addTween(cjs.Tween.get(this.instance_33).wait(1));

	// Layer_16
	this.instance_34 = new lib.text40("synched",0);
	this.instance_34.setTransform(116.4,148.1,0.5505,0.5505,-90);

	this.timeline.addTween(cjs.Tween.get(this.instance_34).wait(1));

	// Layer_15
	this.instance_35 = new lib.shape36("synched",0);
	this.instance_35.setTransform(0,138);

	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(1));

	// Layer_14
	this.instance_36 = new lib.text39("synched",0);
	this.instance_36.setTransform(67.95,148.1,0.5505,0.5505,-90);

	this.timeline.addTween(cjs.Tween.get(this.instance_36).wait(1));

	// Layer_13
	this.instance_37 = new lib.shape36("synched",0);
	this.instance_37.setTransform(-48.45,138);

	this.timeline.addTween(cjs.Tween.get(this.instance_37).wait(1));

	// Layer_12
	this.instance_38 = new lib.text38("synched",0);
	this.instance_38.setTransform(17.35,148.1,0.5505,0.5505,-90);

	this.timeline.addTween(cjs.Tween.get(this.instance_38).wait(1));

	// Layer_11
	this.instance_39 = new lib.shape36("synched",0);
	this.instance_39.setTransform(-99.05,138);

	this.timeline.addTween(cjs.Tween.get(this.instance_39).wait(1));

	// Layer_10
	this.instance_40 = new lib.text37("synched",0);
	this.instance_40.setTransform(-17.45,148.1,0.5505,0.5505,-90);

	this.timeline.addTween(cjs.Tween.get(this.instance_40).wait(1));

	// Layer_9
	this.instance_41 = new lib.shape36("synched",0);
	this.instance_41.setTransform(-133.85,138);

	this.timeline.addTween(cjs.Tween.get(this.instance_41).wait(1));

	// Layer_8
	this.instance_42 = new lib.text35("synched",0);
	this.instance_42.setTransform(-230,47.35);

	this.timeline.addTween(cjs.Tween.get(this.instance_42).wait(1));

	// Layer_7
	this.instance_43 = new lib.shape34("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_43).wait(1));

	// Layer_6
	this.instance_44 = new lib.text33("synched",0);
	this.instance_44.setTransform(-250.2,-38.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_44).wait(1));

	// Layer_5
	this.instance_45 = new lib.shape32("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_45).wait(1));

	// Layer_4
	this.instance_46 = new lib.text31("synched",0);
	this.instance_46.setTransform(-239.8,-119.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_46).wait(1));

	// Layer_3
	this.instance_47 = new lib.shape30("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_47).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite49, new cjs.Rectangle(-305.3,-194.7,469.3,330.5), null);


(lib.sprite11 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_9
	this.instance = new lib.text10("synched",0);
	this.instance.setTransform(-194.55,182.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_8
	this.instance_1 = new lib.shape8("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_7
	this.instance_2 = new lib.text9("synched",0);
	this.instance_2.setTransform(7.6,-23.35);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer_6
	this.instance_3 = new lib.shape8("synched",0);
	this.instance_3.setTransform(203.15,-204.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	// Layer_5
	this.instance_4 = new lib.text7("synched",0);
	this.instance_4.setTransform(-150.1,-24.15);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	// Layer_4
	this.instance_5 = new lib.shape5("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite11, new cjs.Rectangle(-221,-200.2,439.3,434.29999999999995), null);


(lib.sprite189 = function(mode,startPosition,loop,reversed) {
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
	this.frame_1251 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1251).call(this.frame_1251).wait(1));

	// Masked_Layer_20___15
	this.instance = new lib.text184("synched",0);
	this.instance.setTransform(-748.9,-44.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1252));

	// Masked_Layer_19___15
	this.instance_1 = new lib.text183("synched",0);
	this.instance_1.setTransform(-748.9,53.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1252));

	// Masked_Layer_18___15
	this.instance_2 = new lib.text182("synched",0);
	this.instance_2.setTransform(-749,-80.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1252));

	// Masked_Layer_17___15
	this.instance_3 = new lib.text181("synched",0);
	this.instance_3.setTransform(-748.9,-166);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1252));

	// Masked_Layer_16___15
	this.instance_4 = new lib.text180("synched",0);
	this.instance_4.setTransform(-748,-201.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1252));

	// Layer_10
	this.instance_5 = new lib.sprite188();
	this.instance_5.setTransform(-8.5,-13.2);
	this.instance_5.alpha = 0;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(400).to({_off:false},0).to({alpha:0.9492},17).wait(1).to({alpha:1},0).wait(834));

	// Layer_1
	this.instance_6 = new lib.sprite179();
	this.instance_6.setTransform(-13.05,-12.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(400).to({alpha:0},18).to({_off:true},1).wait(833));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-750,-207.1,992.4,395.6);


(lib.sprite166 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_18
	this.instance = new lib.text165("synched",0);
	this.instance.setTransform(-22.25,-173.75);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_17
	this.instance_1 = new lib.shape164("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer_14
	this.instance_2 = new lib.sprite162();
	this.instance_2.setTransform(-24.45,46.5,1.3545,1.3545,0,53.5231,-126.4769);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer_13
	this.instance_3 = new lib.shape163("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	// Layer_11
	this.instance_4 = new lib.sprite162();
	this.instance_4.setTransform(-77.55,-199.5,1.3545,1.3545,0,-126.4769,53.5231);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

	// Layer_10
	this.instance_5 = new lib.shape160("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1));

	// Layer_9
	this.instance_6 = new lib.text159("synched",0);
	this.instance_6.setTransform(-103.9,-250.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1));

	// Layer_8
	this.instance_7 = new lib.shape158("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1));

	// Layer_7
	this.instance_8 = new lib.text157("synched",0);
	this.instance_8.setTransform(-219.3,100);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1));

	// Layer_6
	this.instance_9 = new lib.shape156("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1));

	// Layer_5
	this.instance_10 = new lib.text151("synched",0);
	this.instance_10.setTransform(-188.2,-74.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1));

	// Layer_4
	this.instance_11 = new lib.shape155("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sprite166, new cjs.Rectangle(-276,-264,445.1,390.1), null);


(lib.sprite59 = function(mode,startPosition,loop,reversed) {
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
	this.frame_1679 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1679).call(this.frame_1679).wait(1));

	// Masked_Layer_81___62
	this.instance = new lib.shape12("synched",0);
	this.instance.setTransform(-748.5,128.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1680));

	// Masked_Layer_80___62
	this.instance_1 = new lib.shape12("synched",0);
	this.instance_1.setTransform(-748.5,105.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1680));

	// Masked_Layer_79___62
	this.instance_2 = new lib.shape12("synched",0);
	this.instance_2.setTransform(-748.5,44.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1680));

	// Masked_Layer_78___62
	this.instance_3 = new lib.text27("synched",0);
	this.instance_3.setTransform(-739,97.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1680));

	// Masked_Layer_77___62
	this.instance_4 = new lib.text26("synched",0);
	this.instance_4.setTransform(-739,76);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1680));

	// Masked_Layer_76___62
	this.instance_5 = new lib.text25("synched",0);
	this.instance_5.setTransform(-739,36.85);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1680));

	// Masked_Layer_75___62
	this.instance_6 = new lib.text24("synched",0);
	this.instance_6.setTransform(-739,121.05);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1680));

	// Masked_Layer_74___62
	this.instance_7 = new lib.shape12("synched",0);
	this.instance_7.setTransform(-748.5,19.4);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1680));

	// Masked_Layer_73___62
	this.instance_8 = new lib.text23("synched",0);
	this.instance_8.setTransform(-753.1,-11.45);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1680));

	// Masked_Layer_72___62
	this.instance_9 = new lib.text22("synched",0);
	this.instance_9.setTransform(-736.1,-120.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1680));

	// Masked_Layer_71___62
	this.instance_10 = new lib.text21("synched",0);
	this.instance_10.setTransform(-753.5,-120.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1680));

	// Masked_Layer_70___62
	this.instance_11 = new lib.text20("synched",0);
	this.instance_11.setTransform(-736.1,-157.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(1680));

	// Masked_Layer_69___62
	this.instance_12 = new lib.text19("synched",0);
	this.instance_12.setTransform(-753.5,-157.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(1680));

	// Masked_Layer_68___62
	this.instance_13 = new lib.text18("synched",0);
	this.instance_13.setTransform(-736.1,-180.95);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1680));

	// Masked_Layer_67___62
	this.instance_14 = new lib.text17("synched",0);
	this.instance_14.setTransform(-739,12.05);

	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(1680));

	// Masked_Layer_66___62
	this.instance_15 = new lib.text16("synched",0);
	this.instance_15.setTransform(-753.5,-78.15);

	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(1680));

	// Masked_Layer_65___62
	this.instance_16 = new lib.text15("synched",0);
	this.instance_16.setTransform(-753.1,-205.15);

	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(1680));

	// Masked_Layer_64___62
	this.instance_17 = new lib.text14("synched",0);
	this.instance_17.setTransform(-753.5,-180.95);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(1680));

	// Masked_Layer_63___62
	this.instance_18 = new lib.shape12("synched",0);
	this.instance_18.setTransform(-748.5,81.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(1680));

	// Layer_52
	this.instance_19 = new lib.sprite11();
	this.instance_19.setTransform(-3.05,-11.7);

	this.instance_20 = new lib.sprite58();
	this.instance_20.setTransform(-7,-20.25);
	this.instance_20.alpha = 0;
	this.instance_20._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(598).to({alpha:0},17).to({_off:true},1).wait(1064));
	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(861).to({_off:false},0).to({alpha:0.9297},13).wait(1).to({alpha:1},0).wait(805));

	// Layer_1
	this.instance_21 = new lib.sprite49();
	this.instance_21.setTransform(63.95,-12.3);
	this.instance_21.alpha = 0;
	this.instance_21._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(598).to({_off:false},0).to({alpha:0.9414},16).wait(1).to({alpha:1},0).wait(246).to({alpha:0},14).to({_off:true},1).wait(804));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-754.5,-211.9,982.4,434.3);


(lib.sprite171 = function(mode,startPosition,loop,reversed) {
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
	this.frame_1575 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1575).call(this.frame_1575).wait(1));

	// Masked_Layer_46___36
	this.instance = new lib.text148("synched",0);
	this.instance.setTransform(-733.05,134.75);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1576));

	// Masked_Layer_45___36
	this.instance_1 = new lib.text21("synched",0);
	this.instance_1.setTransform(-749,134.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1576));

	// Masked_Layer_44___36
	this.instance_2 = new lib.text147("synched",0);
	this.instance_2.setTransform(-733.05,73.85);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1576));

	// Masked_Layer_43___36
	this.instance_3 = new lib.text19("synched",0);
	this.instance_3.setTransform(-749,73.85);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1576));

	// Masked_Layer_42___36
	this.instance_4 = new lib.text146("synched",0);
	this.instance_4.setTransform(-733.05,-9.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1576));

	// Masked_Layer_41___36
	this.instance_5 = new lib.text14("synched",0);
	this.instance_5.setTransform(-749,-9.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1576));

	// Masked_Layer_40___36
	this.instance_6 = new lib.text145("synched",0);
	this.instance_6.setTransform(-749,-53.15);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(1576));

	// Masked_Layer_39___36
	this.instance_7 = new lib.text144("synched",0);
	this.instance_7.setTransform(-748.6,-78.65);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(1576));

	// Masked_Layer_38___36
	this.instance_8 = new lib.text143("synched",0);
	this.instance_8.setTransform(-749,-167.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(1576));

	// Masked_Layer_37___36
	this.instance_9 = new lib.text142("synched",0);
	this.instance_9.setTransform(-748.6,-201.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(1576));

	// Layer_17
	this.instance_10 = new lib.sprite166();
	this.instance_10.setTransform(42.8,61.3);
	this.instance_10.alpha = 0;
	this.instance_10._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(526).to({_off:false},0).to({alpha:0.9414},15).wait(1).to({alpha:1},0).wait(719).to({alpha:0},18).to({_off:true},1).wait(296));

	// Layer_13
	this.instance_11 = new lib.sprite152();
	this.instance_11.setTransform(-5.1,-10.65);
	this.instance_11.alpha = 0;
	this.instance_11._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(282).to({_off:false},0).to({alpha:0.9297},14).wait(1).to({alpha:1},0).wait(229).to({alpha:0},16).to({_off:true},1).wait(1033));

	// Layer_1
	this.instance_12 = new lib.sprite141();
	this.instance_12.setTransform(-7,-11.65);

	this.instance_13 = new lib.sprite170();
	this.instance_13.setTransform(-3.65,-5.6);
	this.instance_13.alpha = 0;
	this.instance_13._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(282).to({alpha:0},15).to({_off:true},1).wait(1278));
	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(1261).to({_off:false},0).to({alpha:0.9492},17).wait(1).to({alpha:1},0).wait(297));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-750,-213.1,972,400.5);


// stage content:
(lib.vital_maint_lot = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = false; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {p1:0,p2:1680,p3:3139,p4:4715};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,1,1678,1679,1680,1681,3137,3138,3139,3140,4713,4714,4715,4716,6009];
	this.streamSoundSymbolsList[1] = [{id:"vital_maint_lot1",startFrame:1,endFrame:1679,loop:1,offset:0}];
	this.streamSoundSymbolsList[1681] = [{id:"vital_maint_lot2_rrrrr",startFrame:1681,endFrame:3138,loop:1,offset:0}];
	this.streamSoundSymbolsList[3140] = [{id:"vital_maint_lot3",startFrame:3140,endFrame:4712,loop:1,offset:0}];
	this.streamSoundSymbolsList[4716] = [{id:"vital_maint_lot4_rrrrr",startFrame:4716,endFrame:6009,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		InitPage(4);
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
			GetUrlMain("vitalmenu_lot");
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
		var soundInstance = playSound("vital_maint_lot1",0);
		this.InsertIntoSoundStreamData(soundInstance,1,1679,1);
	}
	this.frame_1678 = function() {
		this.stop();
	}
	this.frame_1679 = function() {
		this.stop();
	}
	this.frame_1680 = function() {
		Prev(1);
		InitAnim();
	}
	this.frame_1681 = function() {
		var soundInstance = playSound("vital_maint_lot2_rrrrr",0);
		this.InsertIntoSoundStreamData(soundInstance,1681,3138,1);
	}
	this.frame_3137 = function() {
		this.stop();
	}
	this.frame_3138 = function() {
		this.stop();
	}
	this.frame_3139 = function() {
		Next(1);
		InitAnim();
	}
	this.frame_3140 = function() {
		var soundInstance = playSound("vital_maint_lot3",0);
		this.InsertIntoSoundStreamData(soundInstance,3140,4712,1);
	}
	this.frame_4713 = function() {
		this.stop();
	}
	this.frame_4714 = function() {
		this.stop();
	}
	this.frame_4715 = function() {
		Next(0);
		InitAnim();
	}
	this.frame_4716 = function() {
		var soundInstance = playSound("vital_maint_lot4_rrrrr",0);
		this.InsertIntoSoundStreamData(soundInstance,4716,6009,1);
	}
	this.frame_6009 = function() {
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1677).call(this.frame_1678).wait(1).call(this.frame_1679).wait(1).call(this.frame_1680).wait(1).call(this.frame_1681).wait(1456).call(this.frame_3137).wait(1).call(this.frame_3138).wait(1).call(this.frame_3139).wait(1).call(this.frame_3140).wait(1573).call(this.frame_4713).wait(1).call(this.frame_4714).wait(1).call(this.frame_4715).wait(1).call(this.frame_4716).wait(1293).call(this.frame_6009).wait(1));

	// Layer_126_page
	this.page = new cjs.Text("Page number", "italic bold 15px 'Arial'", "#FF9900");
	this.page.name = "page";
	this.page.lineHeight = 17;
	this.page.lineWidth = 193;
	this.page.parent = this;
	this.page.setTransform(23,658,1.4989,1.4989);

	this.timeline.addTween(cjs.Tween.get(this.page).wait(6010));

	// Layer_122_back
	this.back = new lib.button99();
	this.back.name = "back";
	this.back.setTransform(350,645,1.0001,1.0002);
	new cjs.ButtonHelper(this.back, 0, 1, 2, false, new lib.button99(), 3);

	this.timeline.addTween(cjs.Tween.get(this.back).wait(6010));

	// Layer_116_next
	this.next = new lib.button94();
	this.next.name = "next";
	this.next.setTransform(1496.1,5.1,0.9998,0.9999,0,0,0,0.1,0.1);
	new cjs.ButtonHelper(this.next, 0, 1, 2, false, new lib.button94(), 3);

	this.timeline.addTween(cjs.Tween.get(this.next).wait(6010));

	// Layer_111_previous
	this.previous = new lib.button87();
	this.previous.name = "previous";
	this.previous.setTransform(1432,5,1.0003,0.9993);
	new cjs.ButtonHelper(this.previous, 0, 1, 2, false, new lib.button87(), 3);

	this.timeline.addTween(cjs.Tween.get(this.previous).wait(6010));

	// Layer_108_slider
	this.slider = new lib.sprite82();
	this.slider.name = "slider";
	this.slider.setTransform(610.1,670.1,0.9937,0.9983,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.slider).wait(6010));

	// Layer_101_replay
	this.replay = new lib.sprite78();
	this.replay.name = "replay";
	this.replay.setTransform(1045.1,650.1,0.9999,0.9999,0,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.replay).wait(6010));

	// Layer_95_slider_base
	this.instance = new lib.sprite75();
	this.instance.setTransform(600,650);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(6010));

	// Layer_89_playpau
	this.playpau = new lib.sprite71();
	this.playpau.name = "playpau";
	this.playpau.setTransform(555,650,0.9999,0.9999);

	this.timeline.addTween(cjs.Tween.get(this.playpau).wait(6010));

	// Layer_86
	this.instance_1 = new lib.text61("synched",0);
	this.instance_1.setTransform(10,0,1.4989,1.4989);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(6010));

	// Mask_Layer_1 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("Eh8/AyyMAAAhfTMD5/AAAMAAABfTg");
	mask.setTransform(800,325);

	// Masked_Layer_2___1
	this.ani1 = new lib.sprite59();
	this.ani1.name = "ani1";
	this.ani1.setTransform(1150,365,1.4989,1.4989);

	this.ani2 = new lib.sprite131();
	this.ani2.name = "ani2";
	this.ani2.setTransform(1150,365,1.4989,1.4989);

	this.ani3 = new lib.sprite171();
	this.ani3.name = "ani3";
	this.ani3.setTransform(1150,365,1.4989,1.4989);

	this.ani4 = new lib.sprite189();
	this.ani4.name = "ani4";
	this.ani4.setTransform(1150,365,1.4989,1.4989);

	var maskedShapeInstanceList = [this.ani1,this.ani2,this.ani3,this.ani4];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.ani1}]}).to({state:[{t:this.ani2}]},1680).to({state:[{t:this.ani3}]},1459).to({state:[{t:this.ani4}]},1576).wait(1295));

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
		{src:"images/vital_maint_lot_atlas_1.png", id:"vital_maint_lot_atlas_1"},
		{src:"images/vital_maint_lot_atlas_2.png", id:"vital_maint_lot_atlas_2"},
		{src:"images/vital_maint_lot_atlas_3.png", id:"vital_maint_lot_atlas_3"},
		{src:"sounds/vital_maint_lot1.mp3", id:"vital_maint_lot1"},
		{src:"sounds/vital_maint_lot2_rrrrr.mp3", id:"vital_maint_lot2_rrrrr"},
		{src:"sounds/vital_maint_lot3.mp3", id:"vital_maint_lot3"},
		{src:"sounds/vital_maint_lot4_rrrrr.mp3", id:"vital_maint_lot4_rrrrr"}
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