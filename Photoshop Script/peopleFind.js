//var srcDoc = app.activeDocument;

// call the current document
var srcDoc = app.activeDocument;
activeDocument.selection.selectAll()
activeDocument.selection.copy();
activeDocument.paste();


// set original width and height
//var imageW = srcDoc.width.value;
//var imageH = srcDoc.height.value;

// get the info out of the source doc
var fileName = srcDoc.name;
var docName = fileName.substring(0,fileName.length -4);
var filePath = srcDoc.path.toString();
var fileExt = fileName.substring(fileName.length -4, fileName.length);

//var nameCheck = fileName.substring(0,fileName.indexOf("_"));

//if (nameCheck <1)
//{
   // no underscore so we need to open it's namesake
   // alert(nameCheck)

var lowRes = filePath + "/looped_large/" + docName + ".png";
openThisFile(lowRes);
activeDocument.selection.selectAll()
activeDocument.selection.copy();
app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
app.activeDocument = srcDoc;
activeDocument.paste();


var filePair = filePath + "/processed_large/" + docName + ".png";
openThisFile(filePair);
activeDocument.activeLayer.adjustCurves([[0,0] , [155,255]]);
activeDocument.selection.selectAll()
activeDocument.selection.copy();
app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
app.activeDocument = srcDoc;
activeDocument.paste();
activeDocument.activeLayer.blendMode = BlendMode.DIFFERENCE;


var newLayerSet = activeDocument.layerSets.add();
activeDocument.artLayers.getByName("Layer 2").move(newLayerSet, ElementPlacement.INSIDE);  
activeDocument.artLayers.getByName("Layer 3").move(newLayerSet, ElementPlacement.INSIDE);

newLayerSet.merge();

doAction('FindPeople', 'Outdoor Ads');
saveMe(filePath + "/found_people/non-adjusted/" + docName + ".png")
doAction('autoAdjust', 'Outdoor Ads');
saveMe(filePath + "/found_people/adjusted/" + docName + ".png")

app.activeDocument.close()



//activeDocument.resizeCanvas(imageW *2, imageH, AnchorPosition.MIDDLELEFT);
//selectRect(0, imageW, imageW*2, imageH)
//activeDocument.flatten();
//var newName = filePath + "/" + docName + "_done" + fileExt
//saveMe(newName)
//}
//    else
//    {
//      app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
//    }

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

/*
function selectRect(top, left, right, bottom)
{
    srcDoc.selection.deselect()
    // =======================================================
    var id1 = charIDToTypeID( "setd" );
    var desc1 = new ActionDescriptor();
    var id2 = charIDToTypeID( "null" );
    var ref1 = new ActionReference();
    var id3 = charIDToTypeID( "Chnl" );
    var id4 = charIDToTypeID( "fsel" );
    ref1.putProperty( id3, id4 );
    desc1.putReference( id2, ref1 );
    var id5 = charIDToTypeID( "T   " );
    var desc2 = new ActionDescriptor();
    var id6 = charIDToTypeID( "Top " );
    var id7 = charIDToTypeID( "#Pxl" );
    desc2.putUnitDouble( id6, id7, top );
    var id8 = charIDToTypeID( "Left" );
    var id9 = charIDToTypeID( "#Pxl" );
    desc2.putUnitDouble( id8, id9, left );
    var id10 = charIDToTypeID( "Btom" );
    var id11 = charIDToTypeID( "#Pxl" );
    desc2.putUnitDouble( id10, id11, bottom );
    var id12 = charIDToTypeID( "Rght" );
    var id13 = charIDToTypeID( "#Pxl" );
    desc2.putUnitDouble( id12, id13, right );
    var id16 = charIDToTypeID( "Rctn" );
    desc1.putObject( id5, id16, desc2 );
    executeAction( id1, desc1, DialogModes.NO );
}
*/


function saveMe(fPath)
{

// save out the image
var pngFile = new File(fPath);
pngSaveOptions = new PNGSaveOptions();
pngSaveOptions.embedColorProfile = true;
pngSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
pngSaveOptions.matte = MatteType.NONE; pngSaveOptions.quality = 1;
activeDocument.saveAs(pngFile, pngSaveOptions, false, Extension.LOWERCASE);
}
