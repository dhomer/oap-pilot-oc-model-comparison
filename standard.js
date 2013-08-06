(function () {
    function output(inp, divName) {
        var placeholder = document.getElementById(divName);
        placeholder.appendChild(document.createElement('pre')).innerHTML = inp;
				document.getElementsByTagName('pre').className('overflow');
    }

    function syntaxHighlight(json) {
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }

    var ocActivity = {
        "opencontract-organization": {
            "id": "Organization ID - unique using a mechanism similar to IATI org ID",
            "name": "Plain english name of the organization / department",
            "contact": {
                "person-name": "The name of the contact person at the organisation.",
                "telephone": "The contact telephone number, if available. May be repeated for multiple numbers.",
                "email": "The contact email address, if available. May be repeated for multiple addresses.",
                "mailing-address": "The contact mailing address, if available.",
                "region": "State/Region/District of organization - as appropriate",
                "country": "Country of organization",
                "url": "Website of organization",
                "legal-representative": "Name of legal representative for contracts"},
            "currency": "Primary currency of organization.",
            "language": "Language"
        },
        "opencontract-activity": {
            "@generated-datetime": "DateTime stamp of when document was created",
            "meta": {
                "@last-updated-datetime": "DateTime stamp of date this document was last updated.",
                "opencontract-organization-id": {
                    "@organization-type": "Indicates whether organization is a contracting or supplier. Optional. In the meta data this should always be a contracting organization and in the award a supplier.",
                    "#text": "Organization ID links record to organization in registry"
                },
                "opencontract-organization-contact": "Dictionary with same fields as 'opencontract-organization'.'contact' that can be used to override standard contact details.",
                "opencontract-id": "ID to uniquely identify this contracting activity through the workflow from call -> award -> performance -> completion / termination - similar to IATI activity ID",
                "title": "Short title of contract",
                "description": "Full contract description",
                "category": "General category of contract - goods, services, etc. - by code list",
                "sector": "General contract sector - by code list",
                "line-item": [{
                    "id": "ID used by contracting organziation to identify product or service.",
                    "description": "Description of item",
                    }],
                "performance-location": {
                    "@encoding": "Location maybe coded e.g. NUTS, zipcode or just plain text - use code list to identify the type of location",
                    "#text": "Primary location where goods or services are to be delivered."
                },
                "currency": "Contract Currency",
                "url": "Link to bid / award / contract information online"
            },
            "bid": {
                "@last-updated-datetime": "DateTime stamp of date this document was last updated.",
                "date-opening": "Date bid is opened.",
                "date-clarification": "Date clarification enquiries must be submitted by.",
                "date-closing": "Date when bids must be submit by.",
                "CPV": "CPV code - http://simap.europa.eu/codes-and-nomenclatures/codes-cpv/codes-cpv_en.htm",
                "document-request-list": [ {} ],
                "procurement-type": "The method of procurement.",
                "procuring-on-behalf": "If the contracting organization is contracting on behalf of a third party.",
                "sme-friendly": "Is the contract accessible to SMEs",
                "total-budget": "The total amount budgeted for this contract.",
                "budget-line-items" : [{
                    "id": "Corresponds to ID in meta",
                    "quantity": "Quantity of items required",
                    "per-unit-budget": "Budgeted amount per unit",
                }],
                "date-work-commence-scheduled": "Date anticipated for start of work / delivery / performance phase",
                "date-work-end-scheduled": "Date anticipated for end of work / delivery / performance phase",
                "contract-term": "Expected length of performance phase.",
            },
            "award": {
                "@last-updated-datetime": "DateTime stamp of date this document was last updated.",
                "date-award": "Date contract awarded.",
                "date-contractsigned": "Date contract signed.",
                "selection-method": "Method used to select contracted party.",
                "total-award": "The total amount awarded for this contract.",
                "award-line-items" : [{
                    "id": "Corresponds to ID in meta",
                    "quantity": "Quantity of items required",
                    "per-unit-award": "Budgeted amount per unit",
                }],
                "contract": [{
                    "awarded-contract-document-id": "ID of contract document",
                    "signatory-name": [ "List of names of all contract signatories" ],
                    "recipient": {
                        "opencontract-organization-id": {
                        "@organization-type": "Indicates whether organization is a contracting or supplier. Optional. In the meta data this should always be a contracting organization and in the award a supplier.",
                        "#text": "Organization ID links record to organization in registry"
                        },
                        "opencontract-organization-contact": "Dictionary with same fields as 'opencontract-organization'.'contact' that can be used to override standard contact details.",
                    }
                }],
                "date-work-commence-agreed": "Date agreed for start of work / delivery / performance phase",
                "date-work-end-agreed": "Date agreed for end of work / delivery / performance phase",
            },
            "performance": {
                "@last-updated-datetime": "DateTime stamp of date this document was last updated.",
                "date-work-commence-actual": "Actual date of start of work / delivery / performance phase",
                "date-work-end-actual": "Actual date of end of work / delivery / performance phase",
                "payment": [{
    "ref": "Machine-readable identification string for the payment.",
                    "value": "The amount of the contribution (or its value, if in kind).",
                    "currency": "An ISO 639 code for the original currency of the amount.",
                    "date-value": "The date that this value was set (to allow historical currency conversion).",
                    "description": "A human-readable description of the transaction.",
                    "transaction-type": "The type of the transaction (e.g. commitment, disbursement, expenditure, etc.).",
                    "date-transaction": "Date of transaction",
                    "disbursement-channel": "The channel through which the funds will flow for this transaction, from a code list.",
                }],
                "work-item": [{
    "ref": "Machine-readable identification string for the work item.",
                    "description": "A human-readable description of the delivered work item.",
                    "type-work-item": "The type of work item e.g. delivered goods, report, service",
                    "date-work-item": "Date work-item was received",
                    "work-item-line-items" : [{
                        "id": "Corresponds to ID in meta",
                        "quantity": "Quantity of items delivered in work item",
                    }],
                }],
            },
            "termination": {
                "@last-updated-datetime": "DateTime stamp of date this document was last updated.",
                "date-termination": "Date of contract termination",
                "termination-code": "Code to describe the reason for contract terminating, normal or abnormal, from a code list.",
                "termination-description": "Additional notes on termination.",
            },
            "document": [{
                "url": "The target URL of the external document, e.g. http://www.example.org/doc.html.",
                "format": "The MIME type of the external document, e.g. “application/pdf”. A partial list of MIME types appears at http://iatistandard.org/codelists/file_format",
                "title": "A short, human-readable title. May be repeated for different languages.",
                "language": "ISO 2 letter code specifying the language of text in this element.",
                "category": "A category into which this document falls, using the document category code list. Must be specified at least once, and may be repeated for multiple categories."
            }]
        }
    }
		
		var draftModel = {
				"projectMeta": {
						"developmentPartnerProjectId": "The unique project ID number used by the development partner funding the project.",
						"aimsProjectId": "The unique project ID number used by the government in their aid information management system.",
						"developmentPartnerName": "Name of the development partner funding the project.",
						"projectTitle": "Title of the project.",
						"sector": "Simple project sector based on a limited code list for the pilot.",
						"aimsSector": "Project sector based on the government's aid information management system",
						"projectDescription": "Free text description of the project.",
						"partnerMinistry": "Government ministry implementing the project.",
						"partnerDepartment": "Government department implementing the project.",
						"projectStartDate": "Start date of the project.",
						"projectEndDate": "End date of the project.",
						"totalCommitment": "Total financial commitment to the project (USD)",
						"totalDisbursement": "Total financial disbursements to the project (USD)",
						"projectDataSource": "Source of project data (AMP or donor website)"
				},
				"contractMeta": {
						"contractTitle": "An overall title describing the particular procurement process. (e.g. 'Construction of Shani Bheri Phalamegaunda Bridge')",
						"contractDescription": "A detailed description of the procurement process.",
						"procurementCategory": "The category of procurement (e.g. goods, public works, etc.)"
				},
				"bid": {
						"tenderNoticeDocumentId": "A foreign key ID linking to one of the document objects described below."
				},
				"award": {
						"contractorName": "The name of the contractor or supplier.",
						"contractorCountry": "The country where the contractor is located.",
						"awardAmount": "The amount of the award (in any currency.",
						"awardAmountCurrency": "The currency of the contract award.",
						"dateOfAward": "The date on which the contract was awarded.",
						"startDate": "The date on which contract work starts.",
						"endDate": "The date on which contract work ends.",
						"contractDocumentId": "A foreign key ID linking to one of the document objects described below."
				},
				"location": [{
						"geoNameId": "The location id number from the Geonames.org gazetteer.",
						"latitude": "Latitude coordinate for the point in decimal degrees (WGS 1984)",
						"longitude": "Longitude coordinates for the point in decimal degrees (WGS 1984)",
						"precision": "Precision code for the point according to UCDP/IATI coding system",
						"locationName": "Name of the location from geonames.org",
						"adm1Name": "Name of the 1st level administrative sub-division where the location is situated.",
						"adm1Code": "Unique ID code of the 1st level administrative sub-division where the where the location is situated.",
						"adm2Name": "Name of the 2nd level administrative sub-division where the location is situated.",
						"adm2Code": "Unique ID code of the 2nd level administrative sub-division where the location is situated."
				}],
				"document": [{
						"id": "A primary key for each document which allows it to be referenced elsewhere in the data model.",
						"link": "A link to the document.",
						"origin": "The source of the document (e.g. public website, e-procurement portal, etc.)",
						"type": "The document type (e.g. tender notice, contract, etc.)",
						"numPages": "The number of pages in the document."
				}]
		}

    var str = JSON.stringify(ocActivity, undefined, 4);
    output(syntaxHighlight(str),'draftStandard');
		str = JSON.stringify(draftModel, undefined,4);
		output(syntaxHighlight(str), 'pilotModel');
})();
