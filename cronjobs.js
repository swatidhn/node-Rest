// cron job which run on every 45 seconds and execute heelo.js file
const cron = require('node-cron');
let val= require('shelljs');
cron.schedule('*/45 * * * * *',()=>{
    if(val.exec('node hello.js'))
    {
        console.log("running");

    }
    else
    {
        console.log("error");
    }
    
});