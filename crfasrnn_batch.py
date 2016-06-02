'''
Requirements: Beautiful Soup 4: https://www.crummy.com/software/BeautifulSoup/
'''

from bs4 import BeautifulSoup
from time import sleep
import os, urllib, re, base64



# EDIT THESE TWO:
baseURL = "" # Publically-accessibly URL of the photo set directory
baseDir = "original_photos/" # Local location of photo set directory on hard drive. You shouldn't need to change this if you leave everything in place within the outdoor-ads folder.



if baseURL[-1:] != "/":
	baseURL = baseURL + "/"
baseURL = baseURL.replace(":", "%3A").replace("/", "%2F")
processURL = "http://www.robots.ox.ac.uk/~szheng/crfasrnndemo/classify_url?imageurl=" + baseURL

resizedDir = "CRFasRNN_results/looped_small/"
blurredDir = "CRFasRNN_results/blurred_small/"
processedDir = "CRFasRNN_results/processed_small/"

things = ['Aeroplane', 'Bicycle', 'Bird', 'Boat', 'Bottle', 'Bus', 'Car', 'Cat', 'Chair', 'Cow', 'Dining table', 'Dog', 'Horse', 'Motorbike', 'Person', 'Potted plant', 'Sheep', 'Sofa', 'Train', 'TV/Monitor']

f = open('crfasrnn_tags.csv', 'w')
s = "ID,"
for t in things:
	s += t + ","

f.write(s[0:-1]+'\n')

for ad in os.listdir(baseDir):

	if ad == ".DS_Store" or ad == ".gitignore" or os.path.isdir(baseDir + ad):
		continue

	imgID = ad[0:ad.find('.')]
	requestURL = processURL + ad
	html_doc = urllib.urlopen(requestURL).read()
	soup = BeautifulSoup(html_doc, 'lxml')
	result = soup.find('div', attrs={'name': 'legend'})

	while result is None:
		print("Page load error on " + ad + ", pausing for 10 seconds and then retrying.")
		sleep(10)
		html_doc = urllib.urlopen(requestURL).read()
		soup = BeautifulSoup(html_doc, 'lxml')
		result = soup.find('div', attrs={'name': 'legend'})
	
	div = result.div.div.next_sibling.next_sibling.stripped_strings
	objInImg = []
	for i in div:
		objInImg.append(i)

	if objInImg[0] != "Objects appearing in the image:":
		print("ERROR ON " + ad)
		continue

	s = imgID + ','

	for t in things:
		if t in objInImg:
			s += "1,"
		else:
			s += "0,"

	f.write(s[0:-1]+'\n')


	result = soup.find_all('img', class_="img-responsive")
	imgdata = base64.b64decode(result[0]['src'][22:])
	filename = resizedDir + imgID + ".png"
	imgFile = open(filename, 'wb')
	imgFile.write(imgdata)
	imgFile.close()

	result = soup.find_all('img', class_="img-responsive")
	imgdata = base64.b64decode(result[0]['data-alt-src'][22:])
	filename = blurredDir + imgID + ".png"
	imgFile = open(filename, 'wb')
	imgFile.write(imgdata)
	imgFile.close()

	imgdata = base64.b64decode(result[1]['src'][22:])
	filename = processedDir + imgID + ".png"
	imgFile = open(filename, 'wb')
	imgFile.write(imgdata)
	imgFile.close()

	print("Processed " + imgID)
	sleep(0.5)

f.close()