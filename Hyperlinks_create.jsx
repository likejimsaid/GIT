


//Script authored in 2020 by James McNair
//Hyperlinks_create.jsx


//Description:

//Find the skus: series of 9 digits in an established sheet style (Sku MY21)

//Creation of a box identical to the text box of the sku found. 
//	On a separate layer and 
//	conversion of this box into a button with the name (of the button) the sku + “-url”
//     add a GO TO URL to the button
//     insertion of the URL
//The url comes from a 2 column tab text file sku / url






var g = {};
    d = app.activeDocument;

main();

g = null;


function main() {

//Get Data
    selectFile();   //User file prompt (g.myFile)
    readTextFile(); //get the data from the file line by line (g.myLines)
    loadData();     //split the lines data into two sku/url arrays (g.mysku, g.myURL)

//Iterate through skus in Datafile
    for (var i=0; i<g.mySkus.length; i++) {

        if (matchSkuInDoc(g.mySkus[i])) {
            createButton ();
            //makeBoxWithCoords ();
            //convBoxToButton ();
            //addGoToURL ();
        }
    }
}





function createButton() {

//color check
try {
    if (d.colors.item("buttons").name) { 
        alert("Exists!");
    };
    }
catch (myError){
    var buttons = d.colors.add();
        buttons.properties = {
            name:"buttons", 
            model:ColorModel.PROCESS,
            space:ColorSpace.CMYK,
            colorValue:[0,50,0,0]};
    }


//create the button
var myCreateFrame = d.pages[g.myFoundTextFramePage].textFrames.add();
myCreateFrame.properties =
{
    geometricBounds : g.myFoundTextFrameBounds,
    strokeWeight : 2,
    strokeColor : buttons,
    fillColor : "None",
    contents : ""
};
}


function matchSkuInDoc(mySku) {
app.findTextPreferences = app.changeTextPreferences = NothingEnum.NOTHING;
app.findTextPreferences.findWhat = mySku;
g.foundSku = d.findText();
g.myFoundTextFrame = g.foundSku[0].parentTextFrames[0];
g.myFoundTextFrameBounds = g.foundSku[0].parentTextFrames[0].geometricBounds;
g.myFoundTextFramePage = (g.foundSku[0].parentTextFrames[0].parentPage.name - 1);
app.findTextPreferences = app.changeTextPreferences = NothingEnum.NOTHING;
return g.foundSku[0]
}


//Query User for File
function selectFile(msg,type,multipleFiles) {
    g.myFile = File.openDialog(msg, type, multipleFiles);
}


//open a text file and return contents in lines
function readTextFile() {
    g.myFile.open("r");
    g.myLines = g.myFile.read().split("\n");
    g.myFile.close();
}


//split two column text file into two arrays
function loadData() {
    g.mySkus = new Array;
    g.myURLs = new Array;
for (var i=0; i<g.myLines.length; i++) {
    var myColumn=g.myLines[i].split("\t");
        g.mySkus.push(myColumn[0]);
        g.myURLs.push(myColumn[1]);
    }
}





















//iterate through every link in the active document adding hyperlinks on data match
function something () {
for (var i=0; i<myLinks.length; i++) {
    var myString=myLinks[i].name;

    for (var j=0; j<mySku.length; j++) {
        if (myString.indexOf(mySku[j])) {
            addHyperlink(myLinks[j].parent.parent, myURL[j]);
        }

    }
}
}










function addHyperlink(mySRC, myDEST) {
    
    var myDestination=doc.hyperlinkURLDestinations.add(myDEST);
    var mySource=doc.hyperlinkPageItemSources.add(mySRC);

    myHyperlink=doc.hyperlinks.add(mySource, myDestination);
    myHyperlink.name=myDEST;
    myHyperlink.visible=false;

}