function saveCsv(dom, data, fileNamePrefix) {
    var text = "";
    for(var i = data.length - 1; i >= 0; i --) {
        text += (data[i]).toFixed(2) + ", ";
    }
    if (text.length > 0) {
        text = text.slice(0, text.length - 2);
    }

    var time = DateFormat.format(new Date(), 'yyyy_MM_dd_hh_mm_ss');
    var fileName = fileNamePrefix + "-" + time + ".csv";

    var file = new Blob([text], {type: 'text/plain'});
    dom.href = URL.createObjectURL(file);
    dom.download = fileName;
}