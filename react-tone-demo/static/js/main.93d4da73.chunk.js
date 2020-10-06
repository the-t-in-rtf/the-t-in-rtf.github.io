(this["webpackJsonpreact-tone-demo"]=this["webpackJsonpreact-tone-demo"]||[]).push([[0],{12:function(e,t,a){e.exports=a(29)},26:function(e,t,a){},27:function(e,t,a){},28:function(e,t,a){},29:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a(1),s=a(3),r=a(2),i=a(7),l=a.n(i),p=a(11),d=a.n(p),c=a(9),h=(a(26),function(e){Object(s.a)(a,e);var t=Object(r.a)(a);function a(e){var o;return Object(n.a)(this,a),(o=t.call(this,e)).onLoaded=function(){o.setState({isLoaded:!0})},o.onStop=function(){o.setState({isPlaying:!1})},o.handleClick=function(e){e.preventDefault(),o.toggleSound()},o.handleKeyDown=function(e){-1!==o.props.watchedKeys.indexOf(e.key)&&(e.preventDefault(),o.toggleSound())},o.player=new c.c(e.path,o.onLoaded),o.player.onstop=o.onStop,o.player.loop=o.props.loop,o.player.toDestination(),o.state={isLoaded:!1,isPlaying:!1},o}return Object(o.a)(a,[{key:"componentDidUpdate",value:function(e,t){(this.player.loop=this.props.loop,e.path!==this.props.path)&&(this.player&&"started"===this.player.state&&(this.player.stop(),this.setState({isPlaying:!1})),this.setState({isLoaded:!1}),this.player.load(this.props.path).then(this.onLoaded))}},{key:"componentWillUnmount",value:function(){this.player&&"started"===this.player.state&&this.player.stop()}},{key:"toggleSound",value:function(){var e=this;!this.props.toneStarted&&this.props.toneStartHook?this.props.toneStartHook().then((function(){e.toggleSound()})):"started"===this.player.state?this.player.stop():(this.setState({isPlaying:!0}),this.player.start())}},{key:"render",value:function(){var e=this.state,t=e.isLoaded,a=e.isPlaying;return t?l.a.createElement("button",{className:this.state.isPlaying?this.props.playingClass:this.props.stoppedClass,onKeyDown:this.handleKeyDown,onClick:this.handleClick},l.a.createElement("div",{className:"button-text"},a?this.props.playingLeader:this.props.stoppedLeader," ",this.props.name)):l.a.createElement("div",null,"Loading sound...")}}]),a}(l.a.Component));h.defaultProps={name:"Sound",playingClass:"playing",stoppedClass:"stopped",playingLeader:"Stop",stoppedLeader:"Play",watchedKeys:["Enter","Space"]};a(27);var u=[{name:"Along the Trail",path:"./sounds/wavestation-along-the-trail.wav",loop:!0},{name:"Bass Drone",path:"./sounds/analog-lab-bass-drone.wav",loop:!0},{name:"Bongo",path:"./sounds/bongo.wav"},{name:"Droid Bass",path:"./sounds/wavestation-droid-bass.wav",loop:!0},{name:"Droid Bass 2",path:"./sounds/wavestation-droid-bass-2.wav",loop:!0},{name:"Euro Percussion Organ",path:"./sounds/wavestation-euro-perc-organ.wav",loop:!0},{name:"Fingernail on Cardboard Tube",path:"./sounds/cardboard-tube-fingernail.wav"},{name:"Into A Maze",path:"./sounds/wavestation-intoamaze.wav",loop:!0},{name:"Kalimba",path:"./sounds/wavestation-kalimba.wav",loop:!0},{name:"Marimba",path:"./sounds/wavestation-marimba.wav",loop:!0},{name:"Nut Pan Beat",path:"./sounds/wavestation-nutpanbeat.wav",loop:!0},{name:"Ocean Drum (Circles)",path:"./sounds/ocean-drum-circles.wav"},{name:"Ocean Drum (Pen Cap)",path:"./sounds/ocean-drum-pen-cap.wav"},{name:"Ocean Drum (Vertical Line)",path:"./sounds/ocean-drum-vertical-line.wav"},{name:"Pen on Cardboard",path:"./sounds/pen-cardboard-lines.wav",loop:!0},{name:"Pen on Cardboard 2",path:"./sounds/pen-cardboard-lines-2.wav",loop:!0},{name:"Pencil Drawing",path:"./sounds/pencil-cardboard-shading.wav"},{name:"Phone Dial",path:"./sounds/fisher-price-dial.wav"},{name:"Phone Dial (Forward)",path:"./sounds/fisher-price-phone-dial-forward.wav"},{name:"Phone Dial (Release)",path:"./sounds/fisher-price-phone-dial-release.wav"},{name:"Phone Rolling",path:"./sounds/fisher-price-phone-rolling.wav"},{name:"Phone Rolling (Backward)",path:"./sounds/fisher-price-phone-rolling-backward.wav"},{name:"Robotic Sequence",path:"./sounds/analog-lab-robotic-sequence.wav",loop:!0},{name:"Techno Sequence",path:"./sounds/analog-lab-techno-sequence.wav",loop:!0},{name:"Toy Box (Falling)",path:"./sounds/wavestation-toy-box-falling.wav",loop:!0}],m=function(e){Object(s.a)(a,e);var t=Object(r.a)(a);function a(e){var o;return Object(n.a)(this,a),(o=t.call(this,e)).handlePrevious=function(e){o.setState((function(e,t){return{selectedSound:0===e.selectedSound?u.length-1:e.selectedSound-1}}))},o.handleNext=function(e){o.setState((function(e,t){return{selectedSound:e.selectedSound===u.length-1?0:e.selectedSound+1}}))},o.state={selectedSound:0},o}return Object(o.a)(a,[{key:"render",value:function(){var e=u[this.state.selectedSound];return l.a.createElement("div",{className:"picker-panel"},l.a.createElement(h,{name:e.name,path:e.path,loop:e.loop,toneStarted:this.props.toneStarted,toneStartHook:this.props.toneStartHook}),l.a.createElement("div",null,l.a.createElement("button",{className:"previous",onClick:this.handlePrevious},"previous"),l.a.createElement("button",{className:"next",onClick:this.handleNext},"next")))}}]),a}(l.a.Component);m.defaultProps={watchedKeys:["Enter","Space"]};var v=Object.assign({},h.defaultProps,{pannerStart:0,oscFreq:4,oscType:"sine",oscPhase:90}),w=function(e){Object(s.a)(a,e);var t=Object(r.a)(a);function a(e){var o;Object(n.a)(this,a),o=t.call(this,e);var s=new c.b(e.pannerStart).toDestination(),r=new c.a({frequency:e.oscFreq,type:e.oscType,phase:e.oscPhase});return r.connect(s.pan),r.start(),o.player.disconnect(),o.player.connect(s),o}return a}(h);w.defaultProps=v;a(28);var S=function(e){Object(s.a)(a,e);var t=Object(r.a)(a);function a(e){var o;return Object(n.a)(this,a),(o=t.call(this,e)).toneStartHook=function(){if(o.state.tonePromise)return o.state.tonePromise;var e=Object(c.d)();return e.then((function(){o.setState({toneStarted:!0})})),o.setState({tonePromise:e}),e},o.state={toneStarted:!1,tonePromise:!1},o}return Object(o.a)(a,[{key:"render",value:function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("h1",null,"React + Tone.js Demos"),l.a.createElement("p",null,"This page presents a few sample sound components created using React and ",l.a.createElement("a",{href:"https://tonejs.github.io"},"Tone.js"),"."),l.a.createElement("h2",null,"Starting / Stopping Sounds"),l.a.createElement("p",null,"Here is a sound that plays once when you click it.  You can stop it manually while it's playing.  The button UI will also update when the sound finishes playing."),l.a.createElement(h,{name:"Phone Dial",path:"./sounds/fisher-price-dial.wav",toneStarted:this.state.toneStarted,toneStartHook:this.toneStartHook}),l.a.createElement("p",null,"Here is a sound that loops, it will not stop and the button UI will not update until you click the button again."),l.a.createElement(h,{name:"Bass Drone",path:"./sounds/analog-lab-bass-drone.wav",loop:!0,toneStarted:this.state.toneStarted,toneStartHook:this.toneStartHook}),l.a.createElement("h2",null,"Sound Picker"),l.a.createElement("p",null,'Here is a "picker" that lets you try all of the sample sounds in this directory.  It also demonstrates making key parameters configurable in real time.  When you change the sound, the previous sound will stop playing.'),l.a.createElement(m,{toneStarted:this.state.toneStarted,toneStartHook:this.toneStartHook}),l.a.createElement("h2",null,"Panner Demo"),l.a.createElement("p",null,'Here is a sound that is "panned" from one ear to the other.  It is timed to match the tempo of the sequence so that each "beat" appears to be traveling from one ear to the other.'),l.a.createElement(w,{name:"Panned Loop (L -> R)",path:"./sounds/wavestation-intoamaze.wav",loop:!0,toneStarted:this.state.toneStarted,toneStartHook:this.toneStartHook}),l.a.createElement("p",null,"Here's a sequence with the phase shifted so that the direction appears to be reversed."),l.a.createElement(w,{name:"Panned Loop (L <- R)",path:"./sounds/analog-lab-bass-drone.wav",oscPhase:270,loop:!0,toneStarted:this.state.toneStarted,toneStartHook:this.toneStartHook}),l.a.createElement("p",null,"Although somewhat effective, this seems unlikely to be precisely readable enough to convey something like speed, and is a bit tiring to listen to for more than a few seconds."))}}]),a}(l.a.Component);d.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(S,null)),document.getElementById("root"))}},[[12,1,2]]]);
//# sourceMappingURL=main.93d4da73.chunk.js.map