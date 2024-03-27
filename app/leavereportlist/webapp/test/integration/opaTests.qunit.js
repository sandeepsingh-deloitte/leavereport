sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'leavereportlist/test/integration/FirstJourney',
		'leavereportlist/test/integration/pages/LeaveRequestList',
		'leavereportlist/test/integration/pages/LeaveRequestObjectPage'
    ],
    function(JourneyRunner, opaJourney, LeaveRequestList, LeaveRequestObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('leavereportlist') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheLeaveRequestList: LeaveRequestList,
					onTheLeaveRequestObjectPage: LeaveRequestObjectPage
                }
            },
            opaJourney.run
        );
    }
);