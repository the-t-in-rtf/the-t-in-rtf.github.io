/* global require */
(function (fluid) {

    "use strict";
    fluid = fluid || require("infusion");
    var cheatar = fluid.registerNamespace("cheatar");

    fluid.registerNamespace("cheatar.arpeggiator");
    cheatar.arpeggiator.playChord  = function (that, destination, payload) {
        var midiNote     = cheatar.arpeggiator.midiNoteToKey(payload.note);
        var modifier     = "none";

        if (that.model.chordScale !== "none") {
            modifier = that.model.chordType;
            var fullChordName = that.model.chordKey + that.model.chordScale;
            var modifiers = that.options.chordKeyModifiers[fullChordName];
            if (modifiers && modifiers[midiNote]) {
                modifier = modifiers[midiNote];
            }
        }

        var inversionPattern = that.model.inversion && that.options.inversion && that.options.inversion[that.model.inversion] ? that.options.inversion[that.model.inversion] : false;

        var chordPattern = that.options.chords[modifier];
        var playingChord = midiNote + modifier;
        that.applier.change("playingChord", playingChord);

        // Adjust the strum duration so that harder strums are played more quickly.  The hardest note is played 50%
        // faster, the softest is played 50% slower.
        var velocityAdjust = ((63.5 - payload.velocity) / 127) * that.model.strumDuration;
        var msBetweenStrings = (that.model.strumDuration + velocityAdjust) / chordPattern.length;
        fluid.each(chordPattern, function (chordOffset, index) {
            var delayMs = index * msBetweenStrings;
            var singleNoteNoteOn = fluid.copy(payload);

            var combinedOffset = inversionPattern && inversionPattern[index] ? chordOffset + inversionPattern[index] : chordOffset;
            singleNoteNoteOn.note += combinedOffset;

            var singleNoteNoteOff = fluid.filterKeys(singleNoteNoteOn, ["channel", "note"]);
            singleNoteNoteOff.type = "noteOff";
            singleNoteNoteOff.velocity = 0;

            if (that.activeTimeouts[index]) {
                clearTimeout(that.activeTimeouts[index]);
                that.activeTimeouts[index] = undefined;
            }

            that.activeTimeouts[index] = setTimeout(function () {
                destination.send(singleNoteNoteOn);
            }, delayMs);
        });
    };

    cheatar.arpeggiator.sendNoteOn = function (that, destination, payload) {
        // Play the chord once
        cheatar.arpeggiator.playChord(that, destination, payload);
    };

    // cheatar.arpeggiator.sendSingleNoteOff = function (that, destination, index, payload) {
    //     var singleNoteTimeout = that.activeTimeouts[index];
    //     if (singleNoteTimeout) {
    //         clearTimeout(singleNoteTimeout);
    //     }
    //     destination.send(payload);
    // };

    cheatar.arpeggiator.sendNoteOff = function (that, destination, payload) {
        // TODO: Standardise and sanitise this.
        var midiNote     = cheatar.arpeggiator.midiNoteToKey(payload.note);
        var modifier     = "none";

        if (that.model.chordScale !== "none") {
            modifier = that.model.chordType;
            var fullChordName = that.model.chordKey + that.model.chordScale;
            var modifiers = that.options.chordKeyModifiers[fullChordName];
            if (modifiers && modifiers[midiNote]) {
                modifier = modifiers[midiNote];
            }
        }

        var inversionPattern = that.model.inversion && that.options.inversion && that.options.inversion[that.model.inversion] ? that.options.inversion[that.model.inversion] : false;

        var chordPattern = that.options.chords[modifier];
        that.applier.change("playingChord", false);

        fluid.each(chordPattern, function (chordOffset, index) {
            var singleNoteOff = fluid.copy(payload);

            var combinedOffset = inversionPattern && inversionPattern[index] ? chordOffset + inversionPattern[index] : chordOffset;
            singleNoteOff.note += combinedOffset;
            destination.send(singleNoteOff);
        });

        // TODO: Remove this once we have exercised the above more.
        // // Rather than inspect or otherwise manage currently playing notes, send "All notes off" control code.
        // // This allows us to very cleanly switch between finger picking and chords without having to manage timeouts.
        // destination.send({type: "control", "number": 120, value: 0});
    };

    cheatar.arpeggiator.noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

    cheatar.arpeggiator.midiNoteToKey = function (midiNote) {
        return cheatar.arpeggiator.noteNames[midiNote % 12];
    };

    cheatar.arpeggiator.keyToMidiNote = function (keyString) {
        var matches = keyString.match(/([A-Z]\#?)([0-9]+)/);
        if (matches) {
            var offsetWithinOctave = cheatar.arpeggiator.noteNames.indexOf(matches[1]);
            var octave = parseInt(matches[2], 10);
            // By this logic, C4 is 72, or zero [the index in noteNames] plus (4 [octave] * 12) plus 24 [offset].
            var midiNote = offsetWithinOctave + (octave * 12) + 24;
            return midiNote;
        }
        else {
            fluid.fail("Can't parse note '", keyString, "'.");
        }
    };

    cheatar.arpeggiator.updateKeyChords = function (that) {
        var combinedChord = that.model.chordScale === "none" ? "none" : that.model.chordKey + that.model.chordScale;
        // TODO:  Work out how to clobber an array properly.
        that.applier.change("keyChords", false);

        var chordMap = fluid.copy(that.options.baseChordMap);
        var chordModifiers = that.options.chordKeyModifiers[combinedChord];
        if (chordModifiers) {
            fluid.each(chordModifiers, function (type, key) {
                chordMap[key].type  = type;
                chordMap[key].inKey = 1;
                chordMap[key].isKeyItself = (key === that.model.chordKey) ? 1 : 0;
            });
        }

        if (that.model.playingChord) {
            var matches = that.model.playingChord.match(/([A-Z]#?).+/);
            if (matches && matches[1]) {
                $(".chord[key='" + that.model.chordKey + "']").addClass("active");
                // // TODO: Break this out as a separate variable, tracking it as part of the chord causes a redraw for every note played!
                // chordMap[matches[1]].active = 1;
            }
        }

        that.applier.change("keyChords", chordMap);
    };

    // TODO:  Get rid of the "none" pattern in favor of playing notes directly when arpeggiation is disabled.  Also, explicitly clobber any notes playing at the moment when arpeggiation is toggled.
    cheatar.arpeggiator.disableArpeggiation = function (that) {
        if (that.model.arpeggiation) {
            that.applier.change("chordScale", that.lastActiveChordScale);
        }
        else {
            that.lastActiveChordScale = that.model.chordScale;
            that.applier.change("chordScale", "none");
        }
    };

    fluid.defaults("cheatar.arpeggiator", {
        gradeNames: ["fluid.modelComponent"],
        model: {
            inversion:     "root",
            chordKey:      "C",
            chordType:     "major",
            keyChords:     "{that}.options.chordKeyModifiers.Cmajor",
            chordScale:    "major",
            playingChord:  "-",
            strumDuration: 150,
            noteMs:        1000,
            pauseDuration: 500,
            arpeggiation:  true
        },
        members: {
            activeTimeouts: [],
            lastActiveChordScale: "major"
        },
        baseChordMap: {
            "C":  { type: "major"},
            "C#": { type: "major"},
            "D":  { type: "major"},
            "D#": { type: "major"},
            "E":  { type: "major"},
            "F":  { type: "major"},
            "F#": { type: "major"},
            "G":  { type: "major"},
            "G#": { type: "major"},
            "A":  { type: "major"},
            "A#": { type: "major"},
            "B":  { type: "major"}
        },
        // Which chord to automatically use for a given note when we're set to use a particular "chord key"
        // Thanks to http://www.guitaristsource.com/lessons/chords/keys/ for an excellent breakdown of guitar chord keys.
        chordKeyModifiers: cheatar.keyChords,
        chords: {
            // Thanks to http://edmprod.com/different-chord-types/ for an excellent explanation of various chords.
            none:     [0],
            major:    [0, 4, 7],
            minor:    [0, 3, 7],
            major7:   [0, 4, 7, 11],
            minor7:   [0, 3, 7, 10],
            dom7:     [0, 4, 7, 10],
            maj6:     [0, 4, 7, 9],
            min6:     [0, 3, 7, 9],
            sus4:     [0, 5, 7],
            ninth:    [0, 4, 7, 13],
            dim:      [0, 3, 6],
            aug:      [0, 4, 8],
            halfDim7: [0, 3, 6, 10]
            // TODO: Reenter harmonic minor chord keys and associate chords
            // TODO: Extract chord data to "holder" grade and restructure for easier reuse.
        },
        // TODO: Add strum patterns, low to high, high to low, low to high to low.
        // Thanks to http://www.musictheory.net/lessons/42 for the clear explanation and variation names.
        inversion: {
            root:   [0,  0,  0], // The default order of notes
            first:  [12, 0,  0], // The first note is now an octave higher
            second: [12, 12, 0]  // The first and second notes are now an octave higher
        },
        invokers: {
            noteOn: {
                funcName: "cheatar.arpeggiator.sendNoteOn",
                args: ["{that}", "{arguments}.0", "{arguments}.1"] // destination, payload
            },
            noteOff: {
                funcName: "cheatar.arpeggiator.sendNoteOff",
                args: ["{that}", "{arguments}.0", "{arguments}.1"] // destination, payload
            }
        },
        modelListeners: {
            chordKey: {
                funcName:      "cheatar.arpeggiator.updateKeyChords",
                args:          ["{that}"],
                excludeSource: "init"
            },
            // playingChord: {
            //     funcName:      "cheatar.arpeggiator.updateKeyChords",
            //     args:          ["{that}"],
            //     excludeSource: "init"
            // },
            chordScale: {
                funcName:      "cheatar.arpeggiator.updateKeyChords",
                args:          ["{that}"]
            },
            arpeggiation: {
                funcName:      "cheatar.arpeggiator.disableArpeggiation",
                args:          ["{that}"],
                excludeSource: "init"
            }
        }
    });
})(fluid);
