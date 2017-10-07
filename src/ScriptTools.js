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
    // Takes an optional argument as to whether to return the scenes or merely create them and store them in *this*
    generateScenes(returnBool = true) {
        if (!this.sceneList) {
            let scenes = {}
            for (let i = 0; i < this.lines.length; i++){
                if (this.lines[i].charAt(0) === "$") {
                    scenes[i] = {
                        sceneName: this.lines[i].split("$")[1],
                        sceneLine: i,
                    }
                }
            }
            this.sceneList = scenes
            if (returnBool === false) {return}
            return scenes
        } else {
            return this.sceneList
        }
    }
    
    findScene(currentLine, title=false) {
        if (!this.sceneList) {
            console.log("No scenes found; generating")
            this.generateScenes(false)
        }
        let tracker = 0
        for (let property in this.sceneList) {
            if (this.sceneList.hasOwnProperty(property)) {
                if (this.sceneList[property].sceneLine <= currentLine) {
                    tracker = Number(property)
                }
            }
        }
        return title ? this.sceneList[tracker].sceneName : tracker
    }

    // Returns the speaker(s) saying a given line
    // WIP don't use yet; functionality built into lookForSpeaker, returns only the first speaker
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


    /* Looks for the closest speaker and returns it; */

    getLineProps(currentLine) {
        let fullLine = this.lines[currentLine]
        if (fullLine.charAt(0) === "#") {
            fullLine = fullLine.split(".")
            fullLine.shift()
            fullLine = fullLine.join(".")
        }
        const lineprops = {
            speaker: this.lookForSpeaker(currentLine),
            scene: this.findScene(currentLine, true),
            line: currentLine,
            fullLine: fullLine
        }
        return lineprops
    }

    lookForSpeaker(currentLine) {
        if (!this.castList) {
            throw "NoCastListError"
        }
        let speaker = null
        let line = currentLine
        while (!speaker) {
            if (this.lines[line].charAt(0) === "#") {
                speaker = this.lines[line].split(".")[0].split("#")[1]
                return this.castList[speaker]
            }
            line -= 1
        }
    }
}

export default ScriptInterpreter