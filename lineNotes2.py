##Tools to make line notes easier for stage managers
##Requires a PDF or text file with the following formatting
##	Scenes must begin with a $
##	Headers for lines (i.e. who is saying them) must begin with #
##Also requires a text file called "castList.txt" containing a list of characters and their roles in the following formatting
##	$Actor
##	Character
##	Character
##	$Actor
##Also requires a file called "key.txt" containing what each one letter code means in the following format
##	$code
##	meaning
##	$code
##END OF BOTH TEXT FILES MUST INCLUDE THE FOLLOWING:
##	$NULL
##	$NULL

##Originally developed by Laurence Ruberl on python 3.4 to work with the Acid Dolphin Experiment script

###to do:
### 	None!

import time
import codecs

def inrange(lineIndex, indexes, titles):
    for i in range(len(indexes) - 1):
        if int(indexes[i][0]) < lineIndex < int(indexes[i][1]):
            return titles[i]
    return("Unknown")
            
#this is a script to turn a file into an iterable list with one line per list; currently supports .txt (or any plain text file; use .txt for any plain text file) and .pdf (pdf must be input as the output of pdfReader.extractText)
def filetoList(file, filetype):
    filetextlist = []
    templist = []
    if filetype == "pdf":
        for char in file:
            if ord(char) != ord("\n"):
                templist.append(char)
            else:
                filetextlist.append("".join(templist))
                templist = []
        #for line in filetextlist:
            #if not(ord("a") < ord(line[0].lower()) < ord("z")) or ord(line[0]) 
    elif filetype == "txt":
        for line in file:
            filetextlist.append(line)
    else:
        raise ValueError("Invalid format given")
    return(filetextlist)

def findLines(linestart, linelist):
    lineindexlist = []
    linecontentlist = []
    linestartlist = []
    for item in linelist:
        if len(item) > 0:
            if ord(item[0]) == ord(linestart):
                linestartlist.append(linelist.index(item))
                linecontentlist.append(item[1:].lower())
    return(linestartlist, linecontentlist)
        

#checks if a string has an entry in the given list and returns False or the index of the item that returned true; list should be given as a list containing lists containing strings, the default output of keyinterpret
def listcheck(string, keyToCheck):
    if len(string) == 1:
        for n in range(len(keyToCheck) - 1):
            keyToCheck[n][0] = keyToCheck[n][0][0]
    elif len(string.split()) >= 2 and len(string.split()[0]) > 1:
        for i in range(len(keyToCheck) - 1):			
            if any(string[0].lower() in item for item in keyToCheck[i]):
                return(i)
        return false
    else:
        for i in range(len(keyToCheck) - 1):			
            if any(string.lower() in item for item in keyToCheck[i]):
                return(i)
        return False

#used to interpret a key file into a list; in this case, built for the list of actors and characters or the key for line issues
#returned as a set of lists contained in a list, with the first item of the sublist always being the header, such as actor one letter issue code
def keyinterpret(filename):
    keyList = []
    keyTempList = []
    with open(filename, "r") as file:
        for line in file:
            if ord(line[0]) == ord("$"):
                if len(keyTempList) == 0:
                    keyTempList.append(line[1:].lower().strip())
                elif len(keyTempList) > 0:
                    keyList.append(keyTempList)
                    keyTempList = [line[1:].lower().strip()]
            else:
                keyTempList.append(line.lower().strip())
    return(keyList)
    
#main line notes function; 
def linenotes2(filename):
    notesList = []
    speaker = ""
    castList = keyinterpret("castList.txt")
    issueKey = keyinterpret("key.txt")
    fileContentsList = []
    userin = ""
    with codecs.open(filename, "r", encoding='utf-8', errors='ignore') as fileVar:
        for line in fileVar:
            fileContentsList.append(line[:-2])
    scene_index, scene_title = findLines("$", fileContentsList)
    
    rangeList = []
    for i in range(len(scene_index) - 2):
        rangeList.append([scene_index[i], scene_index[i+1]])
    rangeList.append([scene_index[-1], len(fileContentsList)-1])
    
    i = 0
    while i < len(fileContentsList):
        if i <= 0:
            print("Scenes")
            for n in range(len(scene_title)):
                print(n, scene_title[n])
            i = scene_index[int(input("what scene number would you like to start with? "))]
        try:
            if ord(fileContentsList[i][0]) == ord("#"):
                speaker = fileContentsList[i][1:].strip()
            elif len(fileContentsList[i]) > 1:
                print(speaker, ":", fileContentsList[i], end=" ")
                userIn = str(input(""))
                if len(userIn) > 0:
                    if ord(userIn.lower()) == ord("n"):
                        i = -314
                        continue
                    elif ord(userIn.lower()) == ord("x"):
                        i = len(fileContentsList) + 1
                        continue
                    elif ord(userIn.lower()) == ord("u"):
                        i = i - int(input("How many lines to go up by?"))
                        continue
                    else:
                        notesList.append([castList[listcheck(speaker.lower().strip(), castList)][0].capitalize(), str(i), inrange(i, rangeList, scene_title), issueKey[listcheck(userIn.lower().strip(),issueKey)][0], fileContentsList[i]])
                        continue
        except IndexError:
            pass
        except TypeError:
            print("Too many characters.  Please only input a single letter.")
            continue
        i = i + 1
        
    # once finished with line notes, compile everything
    sortedList = sorted(notesList, key=lambda x: x[1])
    sortedList = sorted(notesList, key=lambda x: x[0])
    with open("linenotes.txt", "a") as outputfile:
        print (time.strftime("%d/%m/%Y"), file=outputfile)
        for item in sortedList:
            print("\t".join(item), file=outputfile)
        print("\n \n \n ", file=outputfile)
    print("Done!")
    
