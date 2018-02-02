/*

 A harness to handle passing "noteOn", "noteOff", and "pitchbend" events to a synth.  Designed to work with grades
 that extend `cheatar`.

 */
/* globals flock */
(function (fluid, flock) {
    "use strict";
    fluid = fluid || require("infusion");
    flock = flock || require("flocking");

    var environment = flock.init(); // eslint-disable-line no-unused-vars

    var cheatar = fluid.registerNamespace("cheatar");
    fluid.registerNamespace("cheatar.harness");

    cheatar.harness.filterKeyPress = function (that, event) {
        if (event.keyCode === 13) {
            that.performToggle(event);
        }
    };

    cheatar.harness.performToggle = function (that, event) {
        event.preventDefault();

        var elementToToggle = that.locate("optionsPanel");

        $(elementToToggle).toggleClass(that.options.toggleClass);
    };

    cheatar.harness.relayRawMessage = function (that, payload) {
        var payloadAsJson = flock.midi.read(payload);
        var destination = fluid.get(that, "midiOutputSelector.connection");
        if (destination) {
            if (payloadAsJson.type === "noteOn") {
                that.arpeggiator.noteOn(destination, payloadAsJson);
            }
            else if (payloadAsJson.type === "noteOff") {
                that.arpeggiator.noteOff(destination, payloadAsJson);
            }
            else {
                destination.sendRaw(payload);
            }
        }
    };

    cheatar.harness.relayScreenInput = function (that, key, isOn) {
        var destination = fluid.get(that, "midiOutputSelector.connection");
        if (destination) {
            var note = cheatar.arpeggiator.keyToMidiNote(key + that.model.octave);
            var payload = {
                note: note,
                type: isOn ? "noteOn" : "noteOff"
            };
            if (isOn) {
                payload.velocity = 125;
            }
            that.arpeggiator[isOn ? "noteOn" : "noteOff"](destination, payload);
        }
    };

    fluid.defaults("cheatar.harness", {
        gradeNames: ["fluid.viewComponent"],
        pitchbendTarget: "pitchbend.value",
        toggleClass: "hide",
        model: {
            octave:        3, // TODO: Add a control for this.
            inversion:     "root",
            strumDuration: 150,
            pauseDuration: 500,
            playingNotes:  {},
            arpeggiation: "{arpeggiator}.model.arpeggiation"
        },
        selectors: {
            midiInputSelector:  "#input-selector",
            midiOutputSelector: "#output-selector",
            optionsToggle:      "#options-toggle",
            optionsPanel:       "#options-panel",
            inversionControls:  "#inversion-controls",
            arpeggiationToggle: "#strumming-on-off"
        },
        bindings: {
            "inversionControls": "inversion",
            "arpeggiationToggle": {
                selector: "arpeggiationToggle",
                path:     "arpeggiation",
                rules: {
                    domToModel: {
                        "": {
                            transform: {
                                type: "gpii.binder.transforms.checkToBoolean",
                                inputPath: ""
                            }
                        }
                    },
                    modelToDom: {
                        "": {
                            transform: {
                                type: "gpii.binder.transforms.booleanToCheck",
                                inputPath: ""
                            }
                        }
                    }
                }
            }
        },
        components: {
            enviro: "{flock.enviro}",
            arpeggiator: {
                type: "cheatar.arpeggiator"
            },
            // TODO: Save the current settings to a cookie and attempt to use them on startup.
            midiInputSelector: {
                type: "flock.ui.midiConnector",
                container: "{that}.dom.midiInputSelector",
                options: {
                    portType: "input",
                    strings: {
                        selectBoxLabel: "MIDI Input:"
                    },
                    components: {
                        connection: {
                            options: {
                                listeners: {
                                    raw: {
                                        funcName: "cheatar.harness.relayRawMessage",
                                        args:     ["{harness}", "{arguments}.0.data"]
                                    }
                                },
                                sysex: true
                            }
                        }
                    }
                }
            },
            midiOutputSelector: {
                type: "flock.ui.midiConnector",
                container: "{that}.dom.midiOutputSelector",
                options: {
                    portType: "output",
                    strings: {
                        selectBoxLabel: "MIDI Output:"
                    },
                    distributeOptions: {
                        source: "{that}.options.selectBoxLabel",
                        target: "{that fluid.ui.selectbox}.options.strings.selectBoxLabel"
                    },
                    components: {
                        connection: {
                            options: {
                                sysex: true
                            }
                        }
                    }
                }
            },
            keyChordDisplay: {
                type: "cheatar.keyChordDisplay",
                container: ".key-chord-display",
                options: {
                    model: {
                        playingNotes: "{harness}.model.playingNotes",
                        keyChords:    "{arpeggiator}.model.keyChords",
                        chordKey:     "{arpeggiator}.model.chordKey",
                        chordScale:   "{arpeggiator}.model.chordScale"
                    }
                }
            },
            strumPatternControl: {
                type: "cheatar.select",
                container: ".strum-pattern-controls",
                options: {
                    // TODO: Wire this into the arpeggiator's model once we have support for strum patterns.
                    select: {
                        options: {
                            lowToHigh: {
                                label: "Low to High",
                                value: "lowHigh"
                            },
                            none: {
                                label: "Finger Picking",
                                value: "none"
                            }
                        }
                    }
                }
            },
            scaleControl: {
                type: "cheatar.select",
                container: ".scale-controls",
                options: {
                    model: {
                        select: "{arpeggiator}.model.chordScale"
                    },
                    select: {
                        options: {
                            none:     { label: "none", value: "none"},
                            major:    { label: "major", value: "major"},
                            minor:    { label: "minor", value: "minor"},
                            // TODO: Figure out why these don't work.
                            // major7:   { label: "major7", value: "major7"},
                            // minor7:   { label: "minor7", value: "minor7"},
                            // dom7:     { label: "dom7", value: "dom7"},
                            // maj6:     { label: "maj6", value: "maj6"},
                            // min6:     { label: "min6", value: "min6"},
                            // sus4:     { label: "sus4", value: "sus4"},
                            // ninth:    { label: "ninth", value: "ninth"},
                            // dim:      { label: "dim", value: "dim"},
                            // aug:      { label: "aug", value: "aug"},
                            // halfDim7: { label: "halfDim7", value: "halfDim7"}
                        }
                    }
                }
            },
            // TODO: Get a replacement for these working.
            // strumSpeedControl: {
            //     type: "fluid.textfieldSlider",
            //     container: ".strum-slider",
            //     options: {
            //         range: {
            //             min: 50,
            //             max: 500
            //         },
            //         sliderOptions: {
            //             step: 50
            //         },
            //         model: {
            //             value: "{harness}.model.strumDuration"
            //         }
            //     }
            // }
        },
        invokers: {
            filterKeyPress: {
                funcName: "cheatar.harness.filterKeyPress",
                args:     ["{that}", "{arguments}.0"] // event
            },
            performToggle: {
                funcName: "cheatar.harness.performToggle",
                args:     ["{that}", "{arguments}.0"] // event
            }
        },
        modelListeners: {
            "playingNotes.*": {
                funcName: "cheatar.harness.relayScreenInput",
                args:     ["{that}", "{change}.path.1", "{change}.value"] // that, key, isOn)
            }
        },
        listeners: {
            onCreate: [
                "{that}.enviro.start()",
                {
                    "this": "{that}.dom.optionsToggle",
                    method: "keydown",
                    args:   "{that}.filterKeyPress"
                },
                {
                    "this": "{that}.dom.optionsToggle",
                    method: "click",
                    args:   "{that}.performToggle"
                },
                {
                    "funcName": "gpii.binder.applyBinding",
                    "args":     "{that}"
                }
            ]
        }
    });
})(fluid, flock);
