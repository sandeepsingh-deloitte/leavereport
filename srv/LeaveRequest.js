const cds = require("@sap/cds");


module.exports = cds.service.impl(async function () {


    this.on('READ', 'LeaveRequest', async (req) => {
        let leaveService = await cds.connect.to("LeaveRequest");

        let requests = await leaveService.run(SELECT.from(LeaveRequest));

        return requests;
    });



});