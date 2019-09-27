var mongodb = require('mongoose');
var url = require('../constants').dburl;
var http = require('https');
var _ = require('lodash');
var GlobalDataModel = require('../models/global-report-model');
var callendpoint = require('./http-service').callEndPoint;
var globalreportRequest = require("../constants").globalreportRequest;

module.exports.collectGlobalReports = function () {
    var GlobalDataModels = [];
    return new Promise((resolve, reject) => {
        callendpoint(globalreportRequest).then(function (value) {
            console.log(value);
            _.each(value, function (data) {
                GlobalDataModels.push(new GlobalDataModel({
                    region: data.region,
                    country: data.name,
                    capital: data.capital,
                    area: data.area,
                    population: data.population,
                    currencies: data.currencies,
                    timezones: data.timezones,
                    countryCode: data.alpha2Code
                }));
            })
            mongodb.connect(url, { useNewUrlParser: true });
            var db = mongodb.connection;
            db.on('error', console.error.bind(console, 'connection error:'));
            db.once('open', function () {
                if (GlobalDataModels.length > 0) {
                    db.dropCollection('globalreportdatas');
                }
                GlobalDataModel.insertMany(GlobalDataModels, function (err, inserted) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        console.log(inserted.length);
                    
                        resolve("Success");
                    }
                })
            
            })
        }, function (reason) {
            
            reject(reason);
        })
    })
}
module.exports.getRegionData = function (region) {
    return new Promise((resolve, reject) => {

        mongodb.connect(url, { useNewUrlParser: true });
        var db = mongodb.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {
            region = capitalizeFirstLetter(region.toLowerCase());
            GlobalDataModel.find({ region: region }, function (error, response) {
                if (error) {
                    reject(error);
                }
                else {
                   var totalPopulation= _.sumBy(response,function(value){return value.population});
                   var totalArea= _.sumBy(response,function(value){return value.area});
                    resolve({regionData:response,populationToArea:totalPopulation/totalArea,totalarea:totalArea});
                }
            }).then(()=>{
                db.close();
            });
            
        })
   
    });
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}