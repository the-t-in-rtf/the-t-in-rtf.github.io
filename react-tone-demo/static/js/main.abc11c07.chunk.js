(this["webpackJsonpreact-tone-demo"]=this["webpackJsonpreact-tone-demo"]||[]).push([[0],{19:function(e,t,a){e.exports=a(36)},33:function(e,t,a){},34:function(e,t,a){},36:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a(1),s=a(3),r=a(2),l=a(7),i=a.n(l),c=a(17),p=a.n(c),h=a(14),u=a(8),d=(a(33),function(e){Object(s.a)(a,e);var t=Object(r.a)(a);function a(e){var o;return Object(n.a)(this,a),(o=t.call(this,e)).onLoaded=function(){o.setState({isLoaded:!0})},o.onStop=function(){o.setState({isPlaying:!1})},o.handleClick=function(e){e.preventDefault(),o.toggleSound()},o.handleKeyDown=function(e){-1!==o.props.watchedKeys.indexOf(e.key)&&(e.preventDefault(),o.toggleSound())},o.player=new u.c(e.path,o.onLoaded),o.player.onstop=o.onStop,o.player.loop=o.props.loop,o.player.toDestination(),o.state={isLoaded:!1,isPlaying:!1},o}return Object(o.a)(a,[{key:"componentDidUpdate",value:function(e,t){(this.player.loop=this.props.loop,e.path!==this.props.path)&&(this.player&&"started"===this.player.state&&(this.player.stop(),this.setState({isPlaying:!1})),this.setState({isLoaded:!1}),this.player.load(this.props.path).then(this.onLoaded))}},{key:"componentWillUnmount",value:function(){this.player&&"started"===this.player.state&&this.player.stop()}},{key:"toggleSound",value:function(){var e=this;!this.props.toneStarted&&this.props.toneStartHook?this.props.toneStartHook().then((function(){e.toggleSound()})):"started"===this.player.state?this.player.stop():(this.setState({isPlaying:!0}),this.player.start())}},{key:"render",value:function(){var e=this.state,t=e.isLoaded,a=e.isPlaying;return t?i.a.createElement("button",{className:this.state.isPlaying?this.props.playingClass:this.props.stoppedClass,onKeyDown:this.handleKeyDown,onClick:this.handleClick},i.a.createElement("div",{className:"button-text"},a?this.props.playingLeader:this.props.stoppedLeader," ",this.props.name)):i.a.createElement("div",null,"Loading sound...")}}]),a}(i.a.Component));d.defaultProps={name:"Sound",playingClass:"playing",stoppedClass:"stopped",playingLeader:"Stop",stoppedLeader:"Play",watchedKeys:["Enter","Space"]};a(34);var m=[{name:"Along the Trail",path:"./sounds/wavestation-along-the-trail.wav",loop:!0},{name:"Bass Drone",path:"./sounds/analog-lab-bass-drone.wav",loop:!0},{name:"Bongo",path:"./sounds/bongo.wav"},{name:"Droid Bass",path:"./sounds/wavestation-droid-bass.wav",loop:!0},{name:"Droid Bass 2",path:"./sounds/wavestation-droid-bass-2.wav",loop:!0},{name:"Euro Percussion Organ",path:"./sounds/wavestation-euro-perc-organ.wav",loop:!0},{name:"Fingernail on Cardboard Tube",path:"./sounds/cardboard-tube-fingernail.wav"},{name:"Into A Maze",path:"./sounds/wavestation-intoamaze.wav",loop:!0},{name:"Kalimba",path:"./sounds/wavestation-kalimba.wav",loop:!0},{name:"Marimba",path:"./sounds/wavestation-marimba.wav",loop:!0},{name:"Nut Pan Beat",path:"./sounds/wavestation-nutpanbeat.wav",loop:!0},{name:"Ocean Drum (Circles)",path:"./sounds/ocean-drum-circles.wav"},{name:"Ocean Drum (Pen Cap)",path:"./sounds/ocean-drum-pen-cap.wav"},{name:"Ocean Drum (Vertical Line)",path:"./sounds/ocean-drum-vertical-line.wav"},{name:"Pen on Cardboard",path:"./sounds/pen-cardboard-lines.wav",loop:!0},{name:"Pen on Cardboard 2",path:"./sounds/pen-cardboard-lines-2.wav",loop:!0},{name:"Pencil Drawing",path:"./sounds/pencil-cardboard-shading.wav"},{name:"Phone Dial",path:"./sounds/fisher-price-dial.wav"},{name:"Phone Dial (Forward)",path:"./sounds/fisher-price-phone-dial-forward.wav"},{name:"Phone Dial (Release)",path:"./sounds/fisher-price-phone-dial-release.wav"},{name:"Phone Rolling",path:"./sounds/fisher-price-phone-rolling.wav"},{name:"Phone Rolling (Backward)",path:"./sounds/fisher-price-phone-rolling-backward.wav"},{name:"Robotic Sequence",path:"./sounds/analog-lab-robotic-sequence.wav",loop:!0},{name:"Techno Sequence",path:"./sounds/analog-lab-techno-sequence.wav",loop:!0},{name:"Toy Box (Falling)",path:"./sounds/wavestation-toy-box-falling.wav",loop:!0}],g=function(e){Object(s.a)(a,e);var t=Object(r.a)(a);function a(e){var o;return Object(n.a)(this,a),(o=t.call(this,e)).handlePrevious=function(e){o.setState((function(e,t){return{selectedSound:0===e.selectedSound?m.length-1:e.selectedSound-1}}))},o.handleNext=function(e){o.setState((function(e,t){return{selectedSound:e.selectedSound===m.length-1?0:e.selectedSound+1}}))},o.state={selectedSound:0},o}return Object(o.a)(a,[{key:"render",value:function(){var e=m[this.state.selectedSound];return i.a.createElement("div",{className:"picker-panel"},i.a.createElement(d,{name:e.name,path:e.path,loop:e.loop,toneStarted:this.props.toneStarted,toneStartHook:this.props.toneStartHook}),i.a.createElement("div",null,i.a.createElement("button",{className:"previous",onClick:this.handlePrevious},"previous"),i.a.createElement("button",{className:"next",onClick:this.handleNext},"next")))}}]),a}(i.a.Component);g.defaultProps={watchedKeys:["Enter","Space"]};var w=Object.assign({},d.defaultProps,{pannerStart:0,oscFreq:4,oscType:"sine",oscPhase:90}),v=function(e){Object(s.a)(a,e);var t=Object(r.a)(a);function a(e){var o;Object(n.a)(this,a),o=t.call(this,e);var s=new u.b(e.pannerStart).toDestination(),r=new u.a({frequency:e.oscFreq,type:e.oscType,phase:e.oscPhase});return r.connect(s.pan),r.start(),o.player.disconnect(),o.player.connect(s),o}return a}(d);v.defaultProps=w;var f=a(15),b=a(18),y=function(e){Object(s.a)(a,e);var t=Object(r.a)(a);function a(e){var o;return Object(n.a)(this,a),(o=t.call(this,e)).initialiseSampler=function(e){o.sampler=new u.d({urls:e.samplerURLs,release:e.samplerRelease,baseUrl:e.samplerBaseURL}),o.sampler.toDestination()},o.handleKeyDown=function(e){if(e.key&&-1!==o.props.watchedKeys.indexOf(e.key))switch(e.preventDefault(),e.key){case"ArrowLeft":o.setState((function(e){var t=e.cursorCol-1;return t>=o.props.minCol?{cursorCol:t}:null}));break;case"ArrowRight":o.setState((function(e){var t=e.cursorCol+1;return t<=o.props.maxCol?{cursorCol:t}:null}));break;case"ArrowUp":o.setState((function(e){var t=e.cursorRow-1;return t>=o.props.minRow?{cursorRow:t}:null}));break;case"ArrowDown":o.setState((function(e){var t=e.cursorRow+1;return t<=o.props.maxRow?{cursorRow:t}:null}));break;case"Enter":o.playNote()}},o.playNote=function(){var e=o.props.samplerBaseOctave+(o.props.numRows-o.state.cursorRow),t=a.noteByColumn[o.state.cursorCol];o.sampler.releaseAll(),o.sampler.triggerAttack([t+e])},o.componentDidUpdate=function(e,t){t.cursorCol===o.state.cursorCol&&t.cursorRow===o.state.cursorRow||o.playNote()},o.drawGrid=function(e,t){for(var a=[],n=0;n<o.props.numRows;n++)for(var s=0;s<o.props.numCols;s++){var r=e+(s-1)*o.props.cellWidth,l=t+(n-1)*o.props.cellHeight,c=n+"-"+s;a.push(i.a.createElement("rect",{key:c,x:r,y:l,width:o.props.cellWidth,height:o.props.cellHeight,fill:"white",stroke:"black",strokeWidth:"2"}))}return a},o.initialiseSampler(e),o.state={cursorCol:e.startCol,cursorRow:e.startRow},o}return Object(o.a)(a,[{key:"render",value:function(){var e=(this.props.maxCol-this.props.minCol+1)*this.props.cellHeight,t=(this.props.maxRow-this.props.minRow+1)*this.props.cellWidth,a=(1-this.props.minCol)*this.props.cellWidth,n=(1-this.props.minRow)*this.props.cellHeight,o=a+this.props.cellWidth*(this.state.cursorCol-.5),s=n+this.props.cellWidth*(this.state.cursorRow-.5);return i.a.createElement(h.a,null,i.a.createElement(b.a,null,i.a.createElement(f.a,{md:"6"},i.a.createElement("svg",{width:t,height:e,tabIndex:"1",onKeyDown:this.handleKeyDown},i.a.createElement("defs",null,i.a.createElement("radialGradient",{id:"boundaries"},i.a.createElement("stop",{offset:"35%",stopColor:"grey"}),i.a.createElement("stop",{offset:"75%",stopColor:"black"}))),i.a.createElement("rect",{x:"0",y:"0",width:t,height:e,fill:"url('#boundaries')"}),this.drawGrid(a,n),i.a.createElement("circle",{cx:o,cy:s,r:.3*this.props.cellWidth,fill:"#ffcccc",stroke:"#ff0000",strokeWidth:"1%"}))),i.a.createElement(f.a,{md:"6"},i.a.createElement("div",{className:"alert alert-dark"},"Focus on the element, then use arrow keys to change position and space/enter to play the note corresponding to the current position."))))}}]),a}(i.a.Component);y.noteByColumn={"-2":"C","-1":"C#",0:"D",1:"D#",2:"E",3:"F",4:"F#",5:"G",6:"A"},y.defaultProps={startRow:2,startCol:2,minCol:-2,maxCol:6,minRow:-2,maxRow:6,numCols:5,numRows:5,cellHeight:30,cellWidth:30,watchedKeys:["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Enter"],samplerBaseOctave:2,samplerBaseURL:"./sounds/",samplerRelease:1,samplerURLs:{E2:"bongo.wav"}};var S=function(e){Object(s.a)(a,e);var t=Object(r.a)(a);function a(e){var o;return Object(n.a)(this,a),(o=t.call(this,e)).initialisePanner=function(e){o.sampler.disconnect(),o.panner=new u.b(0),o.panner.toDestination(),o.sampler.connect(o.panner)},o.playNote=function(){o.sampler.releaseAll();var e=a.noteByRow[o.state.cursorRow],t=(o.props.maxCol+o.props.minCol)/2,n=(o.state.cursorCol-t)/4;o.panner.pan.rampTo(n,o.props.samplerNoteDuration),o.sampler.triggerAttack([e+o.props.samplerBaseOctave])},o.initialisePanner(e),o}return a}(y);S.defaultProps=y.defaultProps,S.noteByRow={"-2":"G#","-1":"G",0:"F#",1:"F",2:"E",3:"D#",4:"D",5:"C#",6:"C"};a(35);var E=function(e){Object(s.a)(a,e);var t=Object(r.a)(a);function a(e){var o;return Object(n.a)(this,a),(o=t.call(this,e)).toneStartHook=function(){if(o.state.tonePromise)return o.state.tonePromise;var e=Object(u.e)();return e.then((function(){o.setState({toneStarted:!0})})),o.setState({tonePromise:e}),e},o.state={toneStarted:!1,tonePromise:!1},o}return Object(o.a)(a,[{key:"render",value:function(){return i.a.createElement(h.a,null,i.a.createElement("h1",null,"React + Tone.js Demos"),i.a.createElement("p",null,"This page presents a few sample sound components created using React and ",i.a.createElement("a",{href:"https://tonejs.github.io"},"Tone.js"),"."),i.a.createElement("h2",null,"Starting / Stopping Sounds"),i.a.createElement("p",null,"Here is a sound that plays once when you click it.  You can stop it manually while it's playing.  The button UI will also update when the sound finishes playing."),i.a.createElement(d,{name:"Phone Dial",path:"./sounds/fisher-price-dial.wav",toneStarted:this.state.toneStarted,toneStartHook:this.toneStartHook}),i.a.createElement("p",null,"Here is a sound that loops, it will not stop and the button UI will not update until you click the button again."),i.a.createElement(d,{name:"Bass Drone",path:"./sounds/analog-lab-bass-drone.wav",loop:!0,toneStarted:this.state.toneStarted,toneStartHook:this.toneStartHook}),i.a.createElement("h2",null,"Sound Picker"),i.a.createElement("p",null,'Here is a "picker" that lets you try all of the sample sounds in this directory.  It also demonstrates making key parameters configurable in real time.  When you change the sound, the previous sound will stop playing.'),i.a.createElement(g,{toneStarted:this.state.toneStarted,toneStartHook:this.toneStartHook}),i.a.createElement("h2",null,"Using a Panned Loop to Suggest Direction"),i.a.createElement("p",null,'Here is a sound loop that is repeatedly "panned" from one ear to the other.  It is timed to match the tempo of the sequence so that each "beat" appears to be traveling from one ear to the other.  The oscillator that we use for this is a sine wave, we change the starting phase so that played notes occur on the right part of the "slope".'),i.a.createElement(v,{name:"Panned Loop (L -> R)",path:"./sounds/wavestation-intoamaze.wav",loop:!0,toneStarted:this.state.toneStarted,toneStartHook:this.toneStartHook}),i.a.createElement("p",null,"Here's another sound loop with the phase shifted so that the direction appears to be reversed."),i.a.createElement(v,{name:"Panned Loop (L <- R)",path:"./sounds/analog-lab-bass-drone.wav",oscPhase:270,loop:!0,toneStarted:this.state.toneStarted,toneStartHook:this.toneStartHook}),i.a.createElement("p",null,"Although somewhat effective, this seems unlikely to be precisely readable enough to convey something like speed, and is a bit tiring to listen to for more than a few seconds."),i.a.createElement("h2",null,"Suggesting Position Using Pitch"),i.a.createElement("p",null,"Some MIDI grid controllers are tuned so that the lowest note is on the bottom left, and the highest note is on the upper right.  Each cell corresponds to a single note.  In some tunings, the cell to the right of a given cell corresponds to the next highest note, either a single step higher or the next note in a particular key.  In some tunings, the next highest row of cells can be thought of like the next set of keys on a piano keyboard.  For example, if there are eight columns in the grid, the next cell up is eight steps (or notes in a key) higher.  In other tunings, the next cell up is an octave higher."),i.a.createElement("p",null,"My initial thinking about easily representing a specific sound for each cell in our grid was to use two of these conventions. Each cell would be one note higher than the cell to the left, and one octave higher than the cell above it, as demonstrated in the following examples."),i.a.createElement("h3",null,"Percussive Sound"),i.a.createElement("p",null,"With a short percussive sound, the range of octaves scales well enough, but is a bit soft on the ends of the range."),i.a.createElement(y,null),i.a.createElement("h3",null,"Arpeggiated Sound"),i.a.createElement("p",null,"A longer sound is more difficult to scale over the range, even if you loop or record long samples, the higher octaves quickly become gibberish."),i.a.createElement(y,{samplerURLs:{E2:"analog-lab-bass-drone.wav"}}),i.a.createElement("h2",null,"Suggesting Position Using Pitch and Panning"),i.a.createElement("p",null,"The above approach gives each cell a distinct pitch, but ends up covering a huge range of notes.  It might be difficult to find an instrument that is audible and pleasant to listen to over the whole range.  If we reserve pitch for the rows and use panning to represent how far left or right the column is, then each character's voice can stay roughly within the same octave.  This lends itself to approaches like giving each character their own octave."),i.a.createElement("h3",null,"Percussive Sound"),i.a.createElement(S,null),i.a.createElement("h3",null,"Arpeggiated Sound"),i.a.createElement(S,{samplerURLs:{E2:"analog-lab-robotic-sequence.wav"}}),i.a.createElement("h2",null,"Suggesting Boundaries Using a Low Pass Filter"),"TODO",i.a.createElement("h2",null,"Suggesting Boundaries Using Sound Volume"),"TODO",i.a.createElement("h2",null,"Suggesting Boundaries Using Reverb"),i.a.createElement("h2",null,"Suggesting Boundaries Using All Three"))}}]),a}(i.a.Component);p.a.render(i.a.createElement(E,null),document.getElementById("root"))}},[[19,1,2]]]);
//# sourceMappingURL=main.abc11c07.chunk.js.map