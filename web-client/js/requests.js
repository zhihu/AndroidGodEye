/**
 * Created by kysonchao on 2017/11/27.
 */
'use strict';
var requestUtil = function () {

    function getData(path, callbackSuccess, callbackFail) {
        $.ajax({
            url: "http://localhost:5390" + path,
            success: function (result) {
                result = JSON.parse(result);
                if (result.code === 1) {
                    callbackSuccess(result.data);
                } else {
                    callbackFail();
                }
            },
            error: function (e) {
                callbackFail();
            }
        });
    }

    return {
        getData: getData
    }
}();
