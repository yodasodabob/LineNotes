// Script interpreter class with methods to interpret a script that's formatted to the specifications of linenotes3

class ScriptInterpreter {
    // Takes a list containing the lines of the script, and an object containing 
    constructor(script) {
        this.lines = script
    }

    setCastList(castList) {
        this.castList = castList
    }

    // Takes script as a list of lines and returns a list of objects with scene title and line number

    generateScenes() {
        if (!this.sceneList) {
            let scenes = {}
            for (let i = 0; i < this.lines.length; i++){
                if (this.lines[i].charAt(0) === "$") {
                    scenes[i] = {
                        sceneName: this.lines[i].split("$")[0],
                        sceneLine: i,
                    }
                }
            }
            this.sceneList = scenes
            return scenes
        } else {
            return this.sceneList
        }
    }

    // Returns the speaker(s) saying a given line
    // WIP don't use yet; functionality built into lookForSpeak, returns only the first speaker
    multiSpeakerCheck(line){
        let splitLine = line.split(" ")
        if (splitLine.length > 1) {
            if (splitLine[1] === "&") {
                return([splitLine[0], splitLine[2].split(".")]) 
            } else if (splitLine[0].charAt(splitLine[0].length - 1)) {
                return([splitLine.join("").split(",")])
            } else {
                return splitLine.split(".")
            }
        }
    }

    /* Looks for the closest speaker and returns it;
    
    */
    lookForSpeaker(currentLine) {
        let speaker = null
        while (!speaker) {
            let line = currentLine
            if (this.lines[line].charAt(0) === "#") {
                speaker = this.lines[line].split("#").split(".")[0]
                return speaker
            }
            line -= 1
        }
    }
}

export default ScriptInterpreter