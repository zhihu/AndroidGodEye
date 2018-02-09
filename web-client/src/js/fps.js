$(function () {
    var data = [], res = [], totalPoints = 200;
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
        yaxis: { min: 0, max: 60, tickFormatter: function(v, axis) { return v + "FPS"; } },
        xaxis: { show: false }
    };
    var plot = $.plot($("#fps-chart"), [res], options);

    function updateChart(options) {
        if (options) {
            plot = $.plot($("#fps-chart"), [res], options)
        } else {
            plot.setData([res]);
            plot.draw();
        }
    }

    function fetchFpsData() {
        requestUtil.getData("/fps", function (fpsInfo) {
            if (!fpsInfo) {
                setTimeout(fetchFpsData, updateInterval);
                return;
            }

            var updateOptions = false;
            var y = Number(Math.round(fpsInfo.currentFps).toFixed(0));
            if (y > options.yaxis.max) {
                options.yaxis.max = y * 1.3;
                updateOptions = true;
            }
            data.push(y);

            if (data.length > totalPoints) {
                data = data.slice(data.length - totalPoints);
            }

            res = [];
            for (var i = 0; i < data.length; i ++) {
                res.push([i, data[i]])
            }

            updateChart(updateOptions ? options : null);
            setTimeout(fetchFpsData, updateInterval);

        }, function () {
            setTimeout(fetchFpsData, updateInterval);
        });
    }
    
    fetchFpsData();

    $("#fps-csv").click(function() {
        saveCsv(this, data, "fps");
    });
});