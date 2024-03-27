using {LeaveRequest as LeaveRequest} from './external/LeaveRequest';

@path: 'LeaveRequestReport'
service leave_report {
    // entity LeaveReport as projection on LeaveRequest.LeaveRequest
    entity LeaveReport {
        key Request     : String(10);
            RequestType : String(10);
    }
}
