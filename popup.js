
function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

function handleTaskId(taskId, tabs, status) {
    chrome.tabs.sendMessage(tabs[0].id, {data: ''}, function(response) {
        const description = response.data.replace(/ /g, "-").toLowerCase();
        const prefix = `${taskId}-${description}`;

        copyToClipboard(prefix);

        status.innerHTML = `Git prefix: <span class="what-was-copied">"${prefix}"</span> has been copied to your clipboard`;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const status = document.getElementById('status');
    status.innerHTML = 'No project or task id was found';

    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        const tabUrl = tabs[0].url;
        const projectAndTaskIdMatch = tabUrl.match(/my-list\/(T[0-9]+)|project\/(P-[0-9]+)\/[^\/]+\/(T[0-9]+)/);
        console.log(projectAndTaskIdMatch)
        if (
          projectAndTaskIdMatch
          && projectAndTaskIdMatch[1] !== undefined
          && projectAndTaskIdMatch[2] === undefined
        ) {
            handleTaskId(projectAndTaskIdMatch[1], tabs, status);
        }

        if (
          projectAndTaskIdMatch
          && projectAndTaskIdMatch[1] === undefined
          && projectAndTaskIdMatch[2] !== undefined
          && projectAndTaskIdMatch[3] !== undefined
        ) {
            handleTaskId(projectAndTaskIdMatch[3], tabs, status);
        }

        return true;
    });
}, false);

