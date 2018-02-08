$(function () {
    var updateInterval = 5000;

    function fetchCrashLog() {
        requestUtil.getData("/crash", function (crashInfo) {
            if (!crashInfo) {
                return;
            }

            var time = DateFormat.format(new Date(crashInfo.timestampMillis), 'yyyy/MM/dd hh:mm:ss');
            var html = "<b>Last Crash&nbsp;[&nbsp;" + time + "&nbsp;]</b></br></br><b>Message:</b></br>" + crashInfo.throwableMessage + "</br></br>" + "<b>Stacktrace:</b>&nbsp;</br>"
            for (var j = 0; j < crashInfo.throwableStacktrace.length; j++) {
                var path = crashInfo.throwableStacktrace[j];
                html += "<small><small>" + path + "</small></small></br>"
            }

            $("#crash-detail").html(html);
            setTimeout(fetchCrashLog, updateInterval);

        }, function () {
            setTimeout(fetchCrashLog, updateInterval);
        });
    }

    fetchCrashLog();
});