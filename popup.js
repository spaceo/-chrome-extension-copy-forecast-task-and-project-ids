
function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

document.addEventListener('DOMContentLoaded', function() {
    const status = document.getElementById('status');
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        const tabUrl = tabs[0].url;
        const projectAndTaskIdMatch = tabUrl.match(/project\/(P-[0-9]+)\/workflow\/(T[0-9]+)/);

        if (
            !projectAndTaskIdMatch
            || projectAndTaskIdMatch[1] === undefined
            || projectAndTaskIdMatch[2] === undefined
        ) {
            status.innerHTML = 'No project or task id was found';
            return;
        }

        chrome.tabs.sendMessage(tabs[0].id, {data: ''}, function(response) {
            const taskId = projectAndTaskIdMatch[2];
            const description = response.data.replace(/ /g, "-").toLowerCase();
            const prefix = `${taskId}-${description}`;

            copyToClipboard(prefix);

            status.innerHTML = `Forecast task id: <span class="what-was-copied">"${prefix}"</span> has been copied to your clipboard`;
        });

    });
}, false);

