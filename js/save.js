function saveData(targetElement) {
    var contents = CKEDITOR.instances["editorForm"].getData();
    contents = contents.replace(/\r?\n/g, "\r\n");

    var markers = editor.document.find(".mark");
    console.log("Markers: " + markers);
    var carets = editor.document.find(".hit");
    console.log("Carets: " + carets);
    var caretsList = carets.toArray();
    console.log("Carets Lists: " + caretsList);
    var markersList = markers.toArray();
    console.log("Markers Lists: " + markersList);
    var countMarkers = markers.count();
    console.log("Markers Count: " + countMarkers);
    var count = 1;

    for (i = 0; i < countMarkers; i++) {
        markersList[i].removeClass("mark");
        if (count == countMarkers) {
            var blob = new Blob([CKEDITOR.instances.editorForm.getData()], {
                type: "text/html"
            });
            saveAs(blob, "_work.htm");
            console.log("Saved Data 1");
            return;
        }
        count++;
    }
    if (
        countMarkers == 0 ||
        markersList.length == 0 ||
        carets.count() == 0 ||
        caretsList.length == 0
    ) {
        var blob = new Blob([CKEDITOR.instances.editorForm.getData()], {
            type: "text/html"
        });
        saveAs(blob, "_work.htm");
        console.log("Saved Data 2");
    }

    for (i = 0; i < carets.count(); i++) {
        caretsList[i].remove();
        if (count == carets.count()) {
            var blob = new Blob([CKEDITOR.instances.editorForm.getData()], {
                type: "text/html"
            });
            saveAs(blob, "_work.htm");
            console.log("Saved Data 3");
            return;
        }
        count++;
    }
}