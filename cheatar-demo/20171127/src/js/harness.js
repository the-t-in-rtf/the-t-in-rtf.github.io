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

    fluid.defaults("cheatar.harness", {
        gradeNames: ["fluid.viewComponent"],
        pitchbendTarget: "pitchbend.value",
        toggleClass: "hide",
        model: {
            inversion: "root",
            strumDuration: 150,
            pauseDuration: 500
        },
        selectors: {
            midiInputSelector:  "#input-selector",
            midiOutputSelector: "#output-selector",
            optionsToggle:      "#options-toggle",
            optionsPanel:       "#options-panel",
            inversionControls:  "#inversion-controls"
        },
        bindings: {
            "inversionControls": "inversion"
        },
        components: {
            enviro: "{flock.enviro}",
            arpeggiator: {
                type: "cheatar.arpeggiator"
            },
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
            // TODO: make each note touchable and play a chord
            keyChordDisplay: {
                type: "cheatar.keyChordDisplay",
                container: ".key-chord-display",
                options: {
                    model: {
                        keyChords: "{arpeggiator}.model.keyChords"
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
            // },
            // TODO: Replace this with separate controls for key / scale
            twoAxisControl: {
                type: "cheatar.twoAxisControl",
                container: ".auto-chord-twoAxisControl",
                options: {
                    possibleValues: {
                        x: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
                        y: ["none", "major", "minor", "major7th", "minor7th", "melodicHarmonic", "minorHarmonic"]
                    },
                    model: {
                        selectedIndex: {
                            x: 0,
                            y: 0
                        },
                        axisValue: {
                            x: "{arpeggiator}.model.chordKey",
                            y: "{arpeggiator}.model.chordScale"
                        }
                    }
                }
            }
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
