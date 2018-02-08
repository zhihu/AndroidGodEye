$(function () {
    var data = [], res = [], totalPoints = 100;
    var updateInterval = 2000;

    for (var i = 0; i < totalPoints; i ++) {
        data.push(0);
    }
    for (var i = 0; i < data.length; i ++) {
        res.push([i, data[i]])
    }

    // setup plot
    var options = {
        series: { shadowSize: 0 },
        yaxis: { min: 0, max: 100, tickFormatter: function(v, axis) { return v + "MB"; } },
        xaxis: { show: false }
    };
    var plot = $.plot($("#mem-chart"), [res], options);

    function updateChart(options) {
        if (options) {
            plot = $.plot($("#mem-chart"), [res], options)
        } else {
            plot.setData([res]);
            plot.draw();
        }
    }

    function fetchMemData() {
        requestUtil.getData("/pss", function (pssInfo) {
            if (!pssInfo) {
                return;
            }

            var updateOptions = false;
            var y = (pssInfo.totalPssKb / 1024).toFixed(2);
            if (y >= options.yaxis.max) {
                options.yaxis.max = y * 1.3;
                updateOptions = true;
            }
            data.push(y);
            $("#mem-cvs").append(y + ", ")

            if (data.length > totalPoints) {
                data = data.slice(data.length - totalPoints);
            }

            res = [];
            for (var i = 0; i < data.length; i ++) {
                res.push([i, data[i]])
            }

            updateChart(updateOptions ? options : null);
            setTimeout(fetchMemData, updateInterval);

        }, function () {
            setTimeout(fetchMemData, updateInterval);
        });
    }
    
    fetchMemData();
});