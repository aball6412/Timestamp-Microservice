var express = require("express");
var moment = require("moment");
var app = express();

var port = process.env.PORT || 3000;


app.get("/", function(request, response) {
  
   response.send("<html><head></head><body><h1>FCC Timestamp Microservice API Basejump</h1></body></html>");
});


app.get("/:time", function(request, response) {
  
    var date = Number(request.params.time);
    
    //If date is not a unixdate
    if (!date) {
        
        //Get readable date (need to get variable again as string)
        date = request.params.time;
        var dateadj = request.params.time + " 00:00:00 UTC";
        
        //Convert to unix timestamp
        var unixdate = Date.parse(dateadj)/1000;

        //This is for the natural date formatting purposes
        //Getting the unix timestamp and converting back to natural date
        var realdate = moment.unix(unixdate).format();
        
        if (realdate !== "Invalid date") {
            
            realdate = moment.utc(realdate).format("MMMM DD, YYYY");

            //Create object and display in JSON (res.send automatically converts to JSON)
            var display = {
                "Unixdate": unixdate,
                "Natural Date": realdate
            }
            
            response.send(display);
            
        }
        else {
            var display = {
                "Unixdate": null,
                "Natural Date": null
            }  
            response.send(display);
        }

    } //End if
    

    //If date is a unixdate
    else {
        //Convert it to readable date 
        var realdate = moment.unix(date).format();
        realdate = moment.utc(realdate).format("MMMM DD, YYYY");

        
        //Create object and display in JSON (res.send automatically converts to JSON)
        var display = {
            "Unixdate": date,
            "Natural Date": realdate
        }
        
        response.send(display);
        
    } //End else
 
 
});


app.listen(3000);