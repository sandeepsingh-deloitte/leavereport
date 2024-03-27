using {LeaveRequest as LeaveRequest} from './external/LeaveRequest';

@impl: './LeaveRequest.js'
@path: 'LeaveRequestReport'
service leave_report {
    entity LeaveReport as projection on LeaveRequest.LeaveRequest
}
