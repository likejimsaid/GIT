


//Script authored in 2020 by James McNair
//Buttons_Report_v1.jsx


//Description:

//Generate a tab deliminated report of ALL interactive buttons report







var g = {},
    d = app.activeDocument,
    c = 0;

main();

alert("Le rapport (Button_Report.txt) a été créé dans le même dossier que le document InDesign.");

g = null;





function main() {

    wipeIt("\r");
//start the report file
    logIt("\r" + timeStamp() + "\r");
    logIt("Document InDesign : " + d.name + "\r\r");
    logIt("Page :\t\tNom du bouton :\t\tURL du bouton :\r");

//Iterate through buttons in document
    for (i=0; i<d.buttons.length; i++) {
        g.myButtonName = d.buttons[i].name;
        g.myButtonPage = d.buttons[i].parentPage.name;
        g.myButtonURL = d.buttons[i].gotoURLBehaviors.item(0).url
        
        logIt(g.myButtonPage + "\t\t" + g.myButtonName + "\t\t" + g.myButtonURL + "\r");
    }
    logIt("Fini.\r\r");
}





function logIt(data) {
//Create File object
g.MyReportFile = new File(d.filePath + "/Button_Report.txt");
g.MyReportFile.encoding = 'UTF-8';
g.MyReportFile.open('a');
g.MyReportFile.write(data);
g.MyReportFile.close();
}


function timeStamp(){
    g.date = new Date();
    g.time = g.date.toLocaleString();
    return g.time;
}




function wipeIt(data) {
//Create File object
g.MyReportFile = new File(d.filePath + "/Button_Report.txt");
g.MyReportFile.encoding = 'UTF-8';
g.MyReportFile.open('w');
g.MyReportFile.write(data);
g.MyReportFile.close();
}





