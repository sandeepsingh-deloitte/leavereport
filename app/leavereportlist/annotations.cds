using LeaveRequest as service from '../../srv/external/LeaveRequest.csn';

annotate service.LeaveRequest with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'RequestNumber',
            Value : RequestNumber,
        },
        {
            $Type : 'UI.DataField',
            Label : 'FromDate',
            Value : FromDate,
        },
        {
            $Type : 'UI.DataField',
            Label : 'ToDate',
            Value : ToDate,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Days',
            Value : Days,
        },
        {
            $Type : 'UI.DataField',
            Label : 'LeaveType',
            Value : LeaveType,
        },
    ]
);
annotate service.LeaveRequest with @(
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'RequestNumber',
                Value : RequestNumber,
            },
            {
                $Type : 'UI.DataField',
                Label : 'FromDate',
                Value : FromDate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'ToDate',
                Value : ToDate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Days',
                Value : Days,
            },
            {
                $Type : 'UI.DataField',
                Label : 'LeaveType',
                Value : LeaveType,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Comments',
                Value : Comments,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup1',
        },
    ]
);
