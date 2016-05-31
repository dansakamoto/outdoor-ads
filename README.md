# Outdoor Ads People Finder

by Dan Sakamoto

Originally for research/art projects examining images of people in the [Road 2.0 Archive of Outdoor Advertising Images](http://library.duke.edu/digitalcollections/outdooradvertising/)

For more information on the process and results, see this blog post: [http://golancourses.net/2016/dans/05/10/dan-sakamoto-final-project-billboard-people/](http://golancourses.net/2016/dans/05/10/dan-sakamoto-final-project-billboard-people/)


-----


###Part 1: crfasrnn_batch.py
#####Requires:
[Beautiful Soup 4](https://www.crummy.com/software/BeautifulSoup/)
#####Usage:
Use to batch-process images using the [CRF as RNN Semantic Image Segmentation Live Demo](http://www.robots.ox.ac.uk/~szheng/crfasrnndemo/)
#####Instructions:
- Upload directory of images to a publically accessible web server.
- Set baseURL to the URL of this directory on the web, and set baseDir to the location of the directory on your hard drive.
- Create directories 'original\_resized', 'blurred', and 'processed' in the same directory as crfasrnn_batch.py
- Run

-

###Part 2: PS Action.atn and peopleFind.js
#####Usage:
Use these tools in Photoshop CS6 to automate cutting out people identified by CRF as RNN. Uses divide blend mode and Color Range selection tool.
#####Instructions:
- Inside the folder of original images, create folders ‘looped\_large’, ‘processed\_large’, and ‘found\_people’. Inside ‘found\_people’, create ‘non-adjusted’
- Resize all of the shrunk, but otherwise unedited images returned by CFRasRNN back up to original size and place in ‘looped\_large’.
- Resize all of the images highlighted by CRS as RNN back up to original size and place in ‘processed\_large'
- Install peopleFind.js by placing it in /Applications/Adobe Photoshop CS6/Presets/Scripts
- Install PS Action.atn by double-clicking it
- In Photoshop, go to File -> Automate -> Batch… Set the action to ‘BatchPeopleV2’, set source to ‘Folder’ and select the folder of original images. Make sure all checkboxes are unchecked and destination is set to ‘None'
- Run batch