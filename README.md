# LineNotes
Tools to help stage managers create line notes for actors.

Originally created by Laurence Ruberl as part of Earlham Theatre Comapany's production of Acid Dolphin Experiment.
Takes the script as a text file, along with two keys denoting actors and issue codes, and outputs it line by line on the command line, allowing the stage manager to input a single character code to indicate when and how an actor messed up
Outputs a table containing the name of the actor who said the line, what the issue was, what scene it was in, and what the full line was

## History
* Original lineNotes used the pypdf library to work with PDF versions of the Acid Dolphin Script.
* Upon the realization that PDFs can be extremely difficult to extract text from with python (or at least this specific PDF), lineNotes2 was created.
* lineNotes2 uses a text file of the script with minimal formatting changes from the original and taking two key files
  * formatting changes include a '#' next to character speaker names and a '$' next to each scene title
  * The first key file contains a lsit of actors and who they play
  * the second key file contains a list of issues and codes associated with them
* In its current form, linenotes2 is very buggy and needs to be refined, however it was successfully used to create the line notes for the Acid Dolphin cast for the last few weeks of rehearsals before the show.

## Future plans
* Rewrite lineNotes2 to be less buggy, more efficient, and to display issue codes correctly in the output as lineNotes3
* Potentially port lineNotes over to JavaScript as lineNotes4
