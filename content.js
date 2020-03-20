chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    const inputField = document.getElementById('task-modal-task-name');
    if (inputField) {
        sendResponse({data: inputField.value, success: true});
    }
});

