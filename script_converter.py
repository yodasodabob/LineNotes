import docx

def script_convert(filename, speaker_ending=":", file_format="txt"):
    """Function to convert a document for use in Linenotes3 systems (like SMHub).
    Currently only converts speaker headings
        
        filename: name of the file
        speaker_ending: character used to differentiate the speaker from the rest of the line; default ":"
        file_format: format of the file; currently supports text file ("txt") and word document ("docx")"""
    if file_format == "txt":
        unique_speakers = []
        with open(filename, "r") as script:
            lines = script.readlines()
            for i in len(lines):
                splitline = lines[i].split(":")
                if len(splitline) > 0:
                    if splitline[0].isupper():
                        if splitline[0] not in unique_speakers:
                            unique_speakers.append(splitline[0])
                        lines[i] = "#"+splitline[0] + splitline[1:]
    if file_format == "docx":
        unique_speakers = []
        file = docx.Document(filename)
        