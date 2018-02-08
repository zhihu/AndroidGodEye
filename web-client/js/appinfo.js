'use strict';
$(document).ready(function () {
    refresh();
});

function refresh() {
    requestUtil.getData("/appinfo", function (data) {
        refreshView(data);
    }, function () {
        refreshView(null);
    });
}

function refreshView(data) {
    function addAppInfoBadge(key, value) {
        var label = "<li><div class=\"left\"><strong>" + key + "</strong></div>" +
            "<div class=\"right\"><strong>" + value + "</strong></div></li>";
        $("#appinfo-box").append(label);
    }

    if (data) {
        addAppInfoBadge("PackageName", data.packageName)
    }
    var extensions = [];
    if (data && data.extentions && data.extentions.length > 0) {
        extensions = data.extentions;
    }
    for (var i = 0; i < extensions.length; i++) {
        addAppInfoBadge(extensions[i][0], extensions[i][1])
    }
}