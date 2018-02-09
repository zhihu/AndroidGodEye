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
        yaxis: { min: 0, max: 10, tickFormatter: function(v, axis) { return v + "%"; } },
        xaxis: { show: false }
    };
    var plot = $.plot($("#cpu-chart"), [res], options);

    function updateChart(options) {
        if (options) {
            plot = $.plot($("#cpu-chart"), [res], options)
        } else {
            plot.setData([res]);
            plot.draw();
        }
    }

    function fetchCpuData() {
        requestUtil.getData("/cpu", function (cpuInfos) {
            var updateOptions = false;
            for (var i = 0; i < cpuInfos.length; i++) {
                var cpuInfo = cpuInfos[i];
                var y = cpuInfo.appCpuRatio * 100;
                y = y < 0 ? 0 : y;
                y = y > 100 ? 100 : y;

                if (y > options.yaxis.max) {
                    options.yaxis.max = y * 1.3;
                    if (options.yaxis.max > 100) {
                        options.yaxis.max = 100;
                    }
                    updateOptions = true;
                }
                
                data.push(y);
                // $("#cpu-cvs").append(cpuInfo.appCpuRatio + ", ")
            }
            if (data.length > totalPoints) {
                data = data.slice(data.length - totalPoints);
            }

            res = [];
            for (var i = 0; i < data.length; i ++) {
                res.push([i, data[i]])
            }

            updateChart(updateOptions ? options : null);
            setTimeout(fetchCpuData, updateInterval);

        }, function () {
            setTimeout(fetchCpuData, updateInterval);
        });
    }
    
    fetchCpuData();

    $("#cpu-csv").click(function() {
        saveCsv(this, data, "cpu");
    });
});