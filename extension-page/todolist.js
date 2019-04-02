'use strict';
var todoTextarea = document.getElementById('raw-todos');
var fileChooser = document.getElementById('upload');

fileChooser.addEventListener('change', onFileSelected, false);

/**
 * Handles the result of the file selection dialog.
 * @param {Event} event - The event of the file input.
 */
function onFileSelected (event) {
    if (this.files.length === 0) {
        return cancelledFileSelection();
    }
    return loadFile(this.files[0]).then(onFileLoaded).catch(onError);
}

/**
 * Handles the case, that the user cancelled the file selection.
 */
function cancelledFileSelection () {
    console.log('No file selected');
    return null;
}

/**
 * If the user picked a file, read its content as text.
 * @params {File} file - The selected file
 * @returns {Promise} - Resolves with the text content or rejects with a reason.
 */
function loadFile (file) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onload = function (event) {
            var text = event.srcElement.result || '';
            return resolve(text);
        };
        reader.onerror = function (reason) {
            return reject(reason);
        };

        reader.readAsText(file);
    });
}

/**
 * Handles the content of a file.
 * @params {String} text - The content.
 */
function onFileLoaded (text) {
    todoTextarea.textContent = text;
    browser.runtime.sendMessage({message: "chooseFile", payload: text});
}

/**
 * Handles the case, that something went wrong.
 * @params {Error} reason - The reason something happened.
 */
function onError (reason) {
    console.error('Problem', reason);
}
