class ScriptInterpreter {
    // Takes script as a list of lines and returns a list of objects with scene title and line number
    generateScenes(script) {
        let scenes = {}
        for (i = 0; i < script.length; i++){
            if (script[i].charAt(0) == "$") {
                scenes[i] = {
                    sceneName: script[i].split("$")[0],
                    sceneLine: i,
                }
            }
        }
        return scenes
    }

    
}

export default ScriptInterpreter