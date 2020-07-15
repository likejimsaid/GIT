//Script authored in 2020 by James McNair
//NameField_Repair.jsx


//Description:

//Search inDesign buttons name fields for series of digits + "-url"

//remove any text in the name field after the url






var d = app.activeDocument,
    c = 0;

main();

alert(c + " noms nettoyés.");

g = null;





function main() {

    //Iterate through buttons in document
    for (i = 0; i < d.buttons.length; i++) {

        //Make sure the document button name contains series of digits followed by -url
        //if it does, check for more after the url and delete
        if (/^\d+-url.+/.test(d.buttons[i].name)) {
            myNewButtonName = d.buttons[i].name.replace(/(^\d+-url)(.+)/g, '$1');
            d.buttons[i].name = myNewButtonName;
            c++;
            }
        //}
    }
}