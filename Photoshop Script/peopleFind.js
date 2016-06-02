var srcDoc = app.activeDocument;

//activeDocument.selection.selectAll()
//activeDocument.selection.copy();
//activeDocument.paste();


var fileName = srcDoc.name;
var docName = fileName.substring(0,fileName.length -4);
var filePath = srcDoc.path.toString();
var fileExt = fileName.substring(fileName.length -4, fileName.length);


var lowRes = filePath + "/looped_large/" + docName + ".png";
openThisFile(lowRes);
var lowResDoc = app.activeDocument
activeDocument.activeLayer.adjustCurves([[0,0] , [255,155]]);
//activeDocument.selection.selectAll()
//activeDocument.selection.copy();
//app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
//app.activeDocument = srcDoc;
//activeDocument.paste();


var filePair = filePath + "/processed_large/" + docName + ".png";
openThisFile(filePair);
activeDocument.selection.selectAll()
activeDocument.selection.copy();
app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
app.activeDocument = lowResDoc;
activeDocument.paste();
activeDocument.activeLayer.blendMode = BlendMode.DIFFERENCE;
activeDocument.flatten();

app.activeDocument.artLayers.add();
//layerRef.kind = LayerKind.SOLIDFILL;

newColor = new SolidColor;
newColor.rgb.red = 193;
newColor.rgb.green = 128;
newColor.rgb.blue = 129;
app.activeDocument.selection.selectAll();
app.activeDocument.selection.fill(newColor);
app.activeDocument.selection.deselect();
activeDocument.activeLayer.blendMode = BlendMode.DIVIDE;
activeDocument.flatten();
activeDocument.activeLayer.adjustCurves([[0,0] , [40,255]]);

activeDocument.selection.selectAll()
activeDocument.selection.copy();
app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
app.activeDocument = srcDoc;
activeDocument.paste();


doAction('FindPeopleV2', 'Outdoor Ads');
saveMe(filePath + "/found_people/" + docName + ".png")

app.activeDocument.close()



/*

var newLayerSet = activeDocument.layerSets.add();
activeDocument.artLayers.getByName("Layer 2").move(newLayerSet, ElementPlacement.INSIDE);  
activeDocument.artLayers.getByName("Layer 3").move(newLayerSet, ElementPlacement.INSIDE);

newLayerSet.merge();

doAction('FindPeople', 'Outdoor Ads');
saveMe(filePath + "/found_people/non-adjusted/" + docName + ".png")
doAction('autoAdjust', 'Outdoor Ads');
saveMe(filePath + "/found_people/adjusted/" + docName + ".png")

app.activeDocument.close()

/*
*/


function openThisFile(masterFileNameAndPath)
{
    var fileRef = new File(masterFileNameAndPath)
    if (fileRef.exists)
    //open that doc
    {
        app.open(fileRef);
    }
    else
    {
        alert("error opening " + masterFileNameAndPath)
    }
}



function saveMe(fPath)
{
    var pngFile = new File(fPath);
    pngSaveOptions = new PNGSaveOptions();
    pngSaveOptions.embedColorProfile = true;
    pngSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
    pngSaveOptions.matte = MatteType.NONE; pngSaveOptions.quality = 1;
    activeDocument.saveAs(pngFile, pngSaveOptions, false, Extension.LOWERCASE);
}
