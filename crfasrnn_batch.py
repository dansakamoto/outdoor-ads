from bs4 import BeautifulSoup
from time import sleep
import os, urllib, re, base64

baseURL = "" # URL where scraped photo set is stored, web-accessible
baseDir = "" # Local directory where scraped photo set is stored
processURL = "http://www.robots.ox.ac.uk/~szheng/crfasrnndemo/classify_url?imageurl=http%3A%2F%2Fvmd.drama.cmu.edu%2Fdsak%2Fads%2F"

resizedDir = "original_resized/"
blurredDir = "blurred/"
processedDir = "processed/"

things = ['Aeroplane', 'Bicycle', 'Bird', 'Boat', 'Bottle', 'Bus', 'Car', 'Cat', 'Chair', 'Cow', 'Dining table', 'Dog', 'Horse', 'Motorbike', 'Person', 'Potted plant', 'Sheep', 'Sofa', 'Train', 'TV/Monitor']

f = open('crfasrnn_tags.csv', 'w')
s = "ID,"
for t in things:
	s += t + ","

f.write(s[0:-1]+'\n')

for ad in os.listdir(baseDir):

	if ad == ".DS_Store":
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