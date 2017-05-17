# LineNotes
Tools to help stage managers create line notes for actors.

Originally created by Laurence Ruberl as part of Earlham Theatre Comapany's production of Acid Dolphin Experiment.

##History
* Original lineNotes used the pypdf library to work with PDF versions of the Acid Dolphin Script.
* Upon the realization that PDFs can be extremely difficult to extract text from, lineNotes2 was created.
* lineNotes2 uses a text file of the script with minimal formatting changes from the original and taking two key files
  * formatting changes include a '#' next to character speaker names and a '$' next to each scene title
  * The first key file contains a lsit of actors and who they play
  * the second key file contains a list of issues and codes associated with them
* In it's current form, linenotes2 is very buggy and needs to be refined.
