


var doc = app.activeDocument; 
var myLinks = doc.links;

    var myTxtFile = File.openDialog ("Select a text file", "*.txt", false);

    myTxtFile.open('r');
    var myTxtString = myTxtFile.read(); 
    myTxtFile.close();

        var mySku = new Array;
        var myURL = new Array;
        var allLines = myTxtString.split(/\r\n|\n/)

        for (var i=0; i<allLines.length; i++) {
            mySku.push(allLines[0]);
            myURL.push(allLines[1]);
        }


//iterate through every link in the active document adding hyperlinks on data match

for (var i=0; i<myLinks.length; i++) {
    var myString = myLinks[i].name

    for (var i=0; i<mySku.length; i++) {

            if (myString.search(mySku[i])) {
                addHyperlink(myLinks[i].parent.parent, myURL[i]);
            }

        }
}









 

function addHyperlink(mySRC, myURL) {
   var myURLDest = doc.hyperlinkURLDestinations.add(myURL); 
   var myPageItemSrc = doc.hyperlinkPageItemSources.add(mySRC); 

  myHyperlink = doc.hyperlinks.add(myPageItemSrc,myURLDest); 
  myHyperlink.name = myURL; 
  myHyperlink.visible=false; 

} 

