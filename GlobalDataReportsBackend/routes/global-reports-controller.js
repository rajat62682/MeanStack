var express = require('express');
var router = express.Router();
var globalReportService = require('../services/global-report-service');


router.post('/collectRegionData', function (req, res) {
    res.setHeader("Content-type", "application/json");
    globalReportService.collectGlobalReports().then(function (value) {
        console.log(value);
        res.status(200).json("Success");
    }, function (error) {
        console.log(error);
        res.status(500).json("Unsuccess");
    });

});
router.get("/getRegionData", function (req, res) {
    globalReportService.getRegionData(req.query.region).then(function(value){
        res.status(200).json({success:true,message:"Successfully found region data",data:value});
    },function(error){
        res.status(500).json({success:false,message:error.errmsg,data:{}});
    })
})

module.exports = router;







