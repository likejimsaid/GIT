


//Script authored in 2020 by James McNair
//Hyperlinks_replace.jsx


//Description:

//Load skus and related urls from 2 column data file

//search and replace existing urls in document according to sku






var g = {},
    d = app.activeDocument,
    c = 0;

main();

alert("Fini.");

g = null;





function main() {
//Get Data
    selectFile("Veuillez sélectionner un fichier de données (tab délimité – sku-url).\rTous les boutons nommés selon le sku + «-url» auront leur url remplacé par celui\rdu fichier de données. Sur tous les calques existants.", "*.txt", false);   //User file prompt (g.myFile)
    if (g.myFile == null) {
        return;
    }

    readTextFile(); //get the data from the file line by line (g.myLines)
    loadData();     //split the lines data into two sku/url arrays (g.mysku, g.myURL)
    logIt("\r" + timeStamp() + "\r");
    logIt("InDesign Document: " + d.name + "\r\r");
    logIt("Page:\tButton Name:\t\tURL changed to:\r");

//ProgressBar
g.myProgressPanel;
myCreateProgressPanel(300, 300);
g.myProgressPanel = myCreateProgressPanel(100,400);
g.myProgressPanel.show();


//Iterate through buttons in document
    for (i=0; i<d.buttons.length; i++) {

    g.myProgressPanel.myProgressBar.value = (100/d.buttons.length)*i
    g.myProgressPanel.myProgressBar.update

    //Make sure the document button name contains series of digits followed by -url
        if (d.buttons[i].name.indexOf(/^\d+-url/i)); {
            //g.myButtonSku = d.buttons[i].name.replace(/(^\d+)(.+$)/i,'$1');
            g.myButtonSku = d.buttons[i].name.replace(/(^\d+)(-url$)/g,'$1');
            g.myButtonPage = d.buttons[i].parentPage.name;

            //for each button iterate through skus from the data file for possible match
            for (var j=0; j<g.mySkus.length; j++) {
                if (g.mySkus[j] == g.myButtonSku) {
                    if (d.buttons[i].gotoURLBehaviors.item(0).url != g.myURLs[j]) {
                            d.buttons[i].gotoURLBehaviors.item(0).url = g.myURLs[j];
                            //d.buttons[i].name = g.mySkus[j] + "-" + g.myURLs[j];
                            g.myCount++;
                            logIt(g.myButtonPage + "\t\t" + g.myButtonSku + "\t\t" + g.myURLs[j] + "\r");
//                       try {
//                        }
//                        catch(x_x){
//                        }
                    }
                }
            }
        }
    }
g.myProgressPanel.close();
logIt("Fini.\r\r");
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
    var mySkuURLs=g.myLines[i].split("\t");
        g.mySkus.push(mySkuURLs[0]);
        g.myURLs.push(mySkuURLs[1]);
    }
}


//create progress panel
function myCreateProgressPanel(myMaximumValue,myProgressBarWidth) {
    g.myProgressPanel = new Window("window","Processing...");
    with (g.myProgressPanel) {
        g.myProgressPanel.myProgressBar = add("progressbar",[12,12,myProgressBarWidth,24],0,myMaximumValue);
    }
    return g.myProgressPanel;
}    



function logIt(data) {
g.logFilePath = g.myFile.parent;
var filename = "/Hyperlinks_replace.log";
//Create File object
g.myLogFile = new File(g.logFilePath + filename);
g.myLogFile.encoding = 'UTF-8';
g.myLogFile.open('a'); //always append to existing log files preserving previous run data
g.myLogFile.write(data);
g.myLogFile.close();
}


function timeStamp(){
    g.date = new Date();
    g.time = g.date.toLocaleString();
    return g.time;
}










