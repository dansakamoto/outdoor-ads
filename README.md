# People Extractor

by Dan Sakamoto

Originally for research/art projects examining images of people in the [Road 2.0 Archive of Outdoor Advertising Images](http://library.duke.edu/digitalcollections/outdooradvertising/). These scripts can be used to automate highlighting certain objects in a set of photos via [this browser-based semantic image segmentation tool](http://www.robots.ox.ac.uk/%7Eszheng/crfasrnndemo/). The Photoshop javascript + action combo can then be used on the results to automatically cut out the highlighted people (tested with Photoshop CS6).

Note that because cars are highlighted by the image segmentation tool in grey, and the PS action uses color difference to identify the highlighted area, _cars are extracted in addition to people_. Though unintended, these results generated interesting material for the original project, so a more discerning method was never arrived at.

For more information on the process and results, see this blog post: [http://golancourses.net/2016/dans/05/10/dan-sakamoto-final-project-billboard-people/](http://golancourses.net/2016/dans/05/10/dan-sakamoto-final-project-billboard-people/)


-----


#Instructions

###Part 1: Setup

Place your image set inside of the original_photos directory.

This tool was designed to be run off of a public web server, so as to simplify the requests to the semantic image segmentation server. In order to run the code without modification, place the outdoor-ads directory in a place where it is accessible from the web.

-

###Part 2: crfasrnn_batch.py
#####Requires:
[Beautiful Soup 4](https://www.crummy.com/software/BeautifulSoup/)
#####Usage:
Use to batch-process images using the [CRF as RNN Semantic Image Segmentation Demo](http://www.robots.ox.ac.uk/~szheng/crfasrnndemo/)
#####Instructions:
- Set baseURL to the URL of the original_photos directory on the web.
- Make sure baseDir is set to the location of the directory on your hard drive. You shouldn't need to change anything if you left everything in place within the outdoor-ads folder.
- Run the script.

The CRFasRNN tool returns a small version of the unedited image, a version where all found objects are highlighted, and a version where the image has been blurred except for the found objects. These results are placed in the 'CRFasRNN\_results' directory in 'looped\_small', 'processed\_small', and 'blurred\_small', respectively.

-

###Part 3: PS Action.atn and peopleFind.js
#####Usage:
Use these tools in Photoshop to automate cutting out people identified by CRF as RNN.

Uses divide blend mode and Color Range selection tool. This has only been tested with Photoshop CS6.
#####Instructions:
- Resize all of the images in 'looped_small' back to original size and place them in ‘original\_photos/looped\_large’.
- Resize all of the images in 'processed_small' back up to original size and place in ‘original\_photos/processed\_large'
- Install peopleFind.js by placing it in /Applications/Adobe Photoshop CS6/Presets/Scripts
- Install PS Action.atn by double-clicking it
- In Photoshop, go to File -> Automate -> Batch… Set the action to ‘BatchPeopleV2’, set source to ‘Folder’ and select the folder of original images. Make sure all checkboxes are unchecked and destination is set to ‘None'
- Run the batch

Cutouts will be saved to 'original\_photos/found\_people'.