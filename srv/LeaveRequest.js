const cds = require("@sap/cds");


module.exports = cds.service.impl(async function () {


    this.on('READ', 'LeaveReport', async (req) => {
        let leaveService = await cds.connect.to("LeaveRequest");

        const{LeaveRequest} = leaveService.entities;

        let requests = await leaveService.run(SELECT.from(LeaveRequest));

        return requests;
    });



});