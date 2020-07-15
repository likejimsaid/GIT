//BRP_CAT_Sku-Price.jsx
//
//
//Description:
//
//BRP Catalog
//Prices to be inserted throughout using Sku for ref.
//Data must be two column text file with Sku in first column and price in 2nd column
//
//Script authored in 2020 by James McNair



main();


function main (){


//ProgressBar
var myProgressPanel,
myMaximumValue = 300,
myProgressBarWidth= 300




//vars
var myDoc = app.activeDocument
var myFile = "";
var myData = "";
var col = "";
var Sku = "";
var Price = "";
var gQuery = "";


//calls
myFile = JM_userFilePrompt("Selectionner le fichier texte", "*.txt", false);
if (myFile == null) {
    exit();
}
myData = JM_readTextFile(myFile)
JM_setGrepPrefsFalse();


//opt-in/out
var response = confirm (myData.length + " sku/prix trouvés. Cela peut prendre quelques minutes. Voulez-vous continuer ?");
if (response != true) {
    return;
}



//Check the data file
for (var j = 0; j < myData.length; j++) {
    var column = myData[j].split("\t");
    var firstCol = column[0];
    var seconCol = column[1];


    if (!(/\d/.test(firstCol))) {
        alert("SVP vérifier votre fichier txt, ensuite recommencer le script. (pas de 'retour' a la fin.)")
        return;
    }
}


//initiate progress bar
myCreateProgressPanel(myMaximumValue, myProgressBarWidth);
myProgressPanel = myCreateProgressPanel(100,400);
myProgressPanel.show();


//main loop
for (var i = 0; i < myData.length; i++) {

    myProgressPanel.myProgressBar.value = (100/myData.length)*i
    myProgressPanel.update();


    col = myData[i].split("\t");
    Sku = col[0];
    Price = col[1];
    var Price = Price.replace("$", "\\$");

    //gQuery = "((?<=" + Sku + "\\r))(\\$XX\\.XX)"
    gQuery = "(?:" + Sku + ".*?\\r)\\K\\$XX\\.XX";

    JM_resetGrepPrefs();

    app.findGrepPreferences.findWhat = gQuery;
    app.changeGrepPreferences.changeTo = Price;
    app.changeGrep();
}
JM_resetGrepPrefs();

myProgressPanel.close();

alert("Fini.");

























//Query User for File
function JM_userFilePrompt(msg, type, mul) {
    var myFile = File.openDialog(msg, type, mul);
    myFile.close();
    return myFile;
}



//open a text file and return contents row by row
function JM_readTextFile(myfile) {
    myfile.open("r");
    myContents = myfile.read().split("\n");
    myfile.close();
return myContents;
}




//reset grep prefs
function JM_resetGrepPrefs() {
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
}



function JM_setGrepPrefsFalse() {
    app.findGrepPreferences = null;
    app.changeGrepPreferences = null;
    app.findChangeGrepOptions.includeFootnotes = false;
    app.findChangeGrepOptions.includeHiddenLayers = false;
    app.findChangeGrepOptions.includeLockedLayersForFind = false;
    app.findChangeGrepOptions.includeLockedStoriesForFind = false;
    app.findChangeGrepOptions.includeMasterPages = false;
}


function myCreateProgressPanel(myMaximumValue,myProgressBarWidth) {
    myProgressPanel = new Window("window","Processing Skus...");
    with (myProgressPanel) {
        myProgressPanel.myProgressBar = add("progressbar",[12,12,myProgressBarWidth,24],0,myMaximumValue);
    }
    return myProgressPanel;
}








}