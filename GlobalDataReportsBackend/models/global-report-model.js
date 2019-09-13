var  mongoose= require('mongoose');
var globalReportSchema = new mongoose.Schema({
  region: {
    type: String,
    unique: false,
    required:false
  },
      country:{
          type:String,
          unique:false,
          required:false
      },
      capital:String,
      population:{
          type:Number
      },
      area: {
        type:Number,
    },
      currencies:{
          type:Array,
          default:[]
      },
      timezones:{
          type:Array,
          default:[]
      },
      countryCode:String
});
var GlobalData = mongoose.model('GlobalReportData', globalReportSchema);
module.exports=GlobalData;