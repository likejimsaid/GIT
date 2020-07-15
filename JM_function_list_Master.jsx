//Jim's function list




//Delete Guides
function JM_deleteGuides() {
    guidesStatusBU = app.activeDocument.guidePreferences.guidesLocked;
    app.activeDocument.guidePreferences.guidesLocked = false;
    var mySpreads = app.activeDocument.spreads.everyItem();
    if (mySpreads.guides.length) {
        mySpreads.guides.everyItem().remove();
    }
    app.activeDocument.guidePreferences.guidesLocked = guidesStatusBU;
}



//Query User for File
function JM_userFilePrompt(msg,type,multipleFiles) {
var myFile = File.openDialog(msg, type, multipleFiles);
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


//set grep prefs...
function JM_setGrepPrefsFalse() {
    app.findGrepPreferences = null;
    app.changeGrepPreferences = null;
    app.findChangeGrepOptions.includeFootnotes = false;
    app.findChangeGrepOptions.includeHiddenLayers = false;
    app.findChangeGrepOptions.includeLockedLayersForFind = false;
    app.findChangeGrepOptions.includeLockedStoriesForFind = false;
    app.findChangeGrepOptions.includeMasterPages = false;
}






//Progress bar

/*
//ProgressBar
var myProgressPanel,
myMaximumValue = 300,
myProgressBarWidth= 300


//initiate progress bar
myCreateProgressPanel(myMaximumValue, myProgressBarWidth);
myProgressPanel = myCreateProgressPanel(100,400);
myProgressPanel.show();


//create progress panel
function myCreateProgressPanel(myMaximumValue,myProgressBarWidth) {
    myProgressPanel = new Window("window","Processing Skus...");
    with (myProgressPanel) {
        myProgressPanel.myProgressBar = add("progressbar",[12,12,myProgressBarWidth,24],0,myMaximumValue);
    }
    return myProgressPanel;
}
//insert progress updater in loop
    myProgressPanel.myProgressBar.value = (100/myData.length)*i
    myProgressPanel.myProgressBar.update
*/







}