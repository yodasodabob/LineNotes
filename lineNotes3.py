

class ScriptInterpreter():
    #Takes a file as a parameter
    def __init__(self):
        self._lines = []
        self._scenelist = []
        self._currentactor = []
        self._castlist = {}

    def set_script(self, script):

        with open(script, "r") as newfile:
            self._lines = newfile.readlines()
            self._scenelist = [i for i in self._lines if i[0] == "$"]

    def set_cast_list(self, castlist, reset=False):
        """Takes a filename with lines formatted as "ACTOR ROLE" and writes the contents into a dictionary"""
        if reset: self._castlist = {}
        with open(castlist, "r") as castfile:
            for line in castfile.readlines():
                splitline = line.split()
                self._castlist[splitline[1]] = splitline[0]

        

    
    


            