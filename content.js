chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    var inputField = document.getElementById('task-modal-task-name');
    sendResponse({data: inputField.value, success: true});
});

