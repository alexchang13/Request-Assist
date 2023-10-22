$(document).ready(function() {
   
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Month is 0-indexed, so we add 1.
    let yearsDiff;
    let requestOptions = $(".requestOptions");
    requestOptions.hide();
    
    function handleYearButtonClicked() {
        const inputMonth = parseInt($('#inputMonth').val());
        const inputYear = parseInt($('#inputYear').val());

        if (!inputYear) {
            alert('Please enter a year');
            return;
        }

            if (isNaN(inputYear) || inputYear < 1000 || inputYear > 9999) {
                alert('Please enter a valid 4-digit year');
                return;
            }

            if (inputYear > currentYear || (inputYear === currentYear && inputMonth > currentMonth)) {
                alert('Please enter a valid month and year in the past or present.');
                return;
            }

            yearsDiff = currentYear - inputYear;

            // If the selected month is before the current month, add 1 year
            if (inputMonth < currentMonth) {
                yearsDiff++;
            }

            $('#result').text(`Total Number of Years: ${yearsDiff}`);
            $('#yearsResult').text(yearsDiff);
    }

    function clearYearButtonClicked() {
        $('#result').text("");
        $('#inputMonth').val("");
        $('#inputYear').val("");
        $('#yearsResult').text("");
    }

    // Function to add an input field
    function addInputField() {
        // Create a new input element using jQuery
        var input = $("<input>")
            .attr("type", "text")
            .attr("class", "additional-input");

        // Append the input element to the container using jQuery
        $("#inputContainer").append(input);

        
    }

    function showRequestOption(serviceComponentName) {
        requestOptions.show();
        $(".serviceComponent").hide();
        
        // Clear all input fields for PMAR, SCR, and SIR
        $("#pmarConditionOne, #pmarConditionTwo, #pmarConditionThree").val('');
        $("#specificConditionOne, #specificConditionTwo, #specificConditionThree").val('');
        $("#specificInfoOne, #specificInfoTwo, #specificInfoThree").val('');
        $(".additional-input").val('');
      
        // Show the selected service component
        if (serviceComponentName === "PMAR") {
            $("#pmar").show();
            removeRequestAndProviderText();
        } else if (serviceComponentName === "SCR") {
            $("#scr").show();
            removeRequestAndProviderText();
        } else if (serviceComponentName === "SIR") {
            $("#sir").show();
            removeRequestAndProviderText();
        }

        function removeRequestAndProviderText() {
            $("#requestSelect").text('');
            $("#providerInstruction").text('');
        }
    }
    
    function generateInstructions(){
        let selectedValue = $('input[name="infoType"]:checked').val();
        let $pmarField1 = $('#pmarConditionOne');
        let $pmarField2 = $('#pmarConditionTwo');
        let $pmarField3 = $('#pmarConditionThree');
        let $scrField1 = $('#specificConditionOne');
        let $scrField2 = $('#specificConditionTwo');
        let $scrField3 = $('#specificConditionThree');
        let $sirField1 = $('#specificInfoOne');
        let $sirField2 = $('#specificInfoTwo');
        let $sirField3 = $('#specificInfoThree');
                       
         // Function to check if PMAR fields are empty
        function arePMARFieldsEmpty() {
            return [$pmarField1, $pmarField2, $pmarField3].every(field => field.val().trim() === '');
        }
            
        function updatePMARText() {
            const pmarFields = [$pmarField1.val(), $pmarField2.val(), $pmarField3.val()];
            const additionalPmarFields = [];
            
            const $additionalInputs = $(".additional-input");
            for (var i=0; i<$additionalInputs.length; i++) {
                const currentInputEl = $additionalInputs[i];
                const $currentInputEl = $(currentInputEl);
                additionalPmarFields.push($currentInputEl.val());
            }

            const nonEmptyPMARFields = pmarFields.concat(additionalPmarFields).filter(field => field.trim() !== ''); // Filter out empty fields     
            
                pmarText = "";
                for (var i=0; i<nonEmptyPMARFields.length; i++) {
                    pmarText += nonEmptyPMARFields[i]; // pmarText = pmarText + nonEmptyPMARFields[i];

                    const secondToLastElement = nonEmptyPMARFields.length-2
                    if (i === secondToLastElement) pmarText += ", and ";
                    else if (i < secondToLastElement) pmarText += ", ";
                }
        }
        
        function updateSCRText() {
            const scrFields = [$scrField1.val(), $scrField2.val(), $scrField3.val()];
            const nonEmptySCRFields = scrFields.filter(field => field.trim() !== ''); // Filter out empty fields
        
            if (nonEmptySCRFields.length === 0) {
                scrText = ''; // No non-empty fields, set the text to an empty string
            } else if (nonEmptySCRFields.length === 1) {
                scrText = nonEmptySCRFields[0]; // Only one non-empty field
                $('#requestSelect').text(`SCS (Single Condition Summary) or SCR (Specific Condition Report)`);
            } else if (nonEmptySCRFields.length === 2) {
                scrText = nonEmptySCRFields.join(' and '); // Two non-empty fields
            } else if (nonEmptySCRFields.length >= 3) {
                const lastSCRField = nonEmptySCRFields.pop(); // Remove the last field from the array
                scrText = nonEmptySCRFields.join(', ') + ', and ' + lastSCRField; // Join with commas and add ", and" before the last field
            }
        }
        

        function updateSIRText() {
            const sirFields = [$sirField1.val(), $sirField2.val(), $sirField3.val()];
            const nonEmptySIRFields = sirFields.filter(field => field.trim() !== ''); // Filter out empty fields
        
            if (nonEmptySIRFields.length === 0) {
                sirText = ''; // No non-empty fields, set the text to an empty string
            } else if (nonEmptySIRFields.length === 1) {
                sirText = nonEmptySIRFields[0]; // Only one non-empty field
            } else if (nonEmptySIRFields.length === 2) {
                sirText = nonEmptySIRFields.join(' and '); // Two non-empty fields
            } else if (nonEmptySIRFields.length >= 3) {
                const lastSIRField = nonEmptySIRFields.pop(); // Remove the last field from the array
                sirText = nonEmptySIRFields.join(', ') + ', and ' + lastSIRField; // Join with commas and add ", and" before the last field
            }
        }

         // Add event listeners to the input fields
         $pmarField1.on('input', updatePMARText);
         $pmarField2.on('input', updatePMARText);
         $pmarField3.on('input', updatePMARText);
         $scrField1.on('input', updateSCRText);
         $scrField2.on('input', updateSCRText);
         $scrField3.on('input', updateSCRText);
         $sirField1.on('input', updateSIRText);
         $sirField2.on('input', updateSIRText);
         $sirField3.on('input', updateSIRText);

         // Function to check if at least one field is filled
        function isAtLeastOneFieldFilled(fields) {
            return fields.some(field => field.trim() !== '');
        }

        if (selectedValue === '1') {
            $('#requestSelect').text(`PMAR (Personal Medical Attendant's Report)`);

            // Call the updatePMARText() function to get the current value of pmarText
            updatePMARText();

            if (arePMARFieldsEmpty()) {
                $('#providerInstruction').text("Please provide all consult notes, test results, and specialist reports for the specified history period. This is required for the assessment of your patient's insurance application.");
            } else {
                $('#providerInstruction').text(`Please provide all consult notes, test results and specialist reports for the specified history period. This is required for the assessment of your patient's insurance application, in which the following was disclosed - ${pmarText}`);
            }
            
        } else if (selectedValue === '2') {
            $('#requestSelect').text(`SCR (Specific Condition Report)`);

            // Call the updateSCRText() function to get the current value of scrText
            updateSCRText();

            if (!isAtLeastOneFieldFilled([$scrField1.val(), $scrField2.val(), $scrField3.val()])) {
                alert('Please specify at least one specific condition field.');
                return;
            }

            $('#providerInstruction').text(`Please ONLY provide information (consult notes, test results and specialist reports) 
            related to ${scrText} for the specified history period. This is required for the assessment of your patient's insurance
            application. Thank you.`);

        } else if (selectedValue === '3') {
            $('#requestSelect').text(`SIR (Specific Information Report)`);

            // Call the updateSIRText() function to get the current value of sirText
            updateSIRText();

            if (!isAtLeastOneFieldFilled([$sirField1.val(), $sirField2.val(), $sirField3.val()])) {
                alert('Please specify at least one specific information field.');
                return;
            }

            $('#providerInstruction').text(`Please provide copies of ${sirText} for the specified history period. 
            This is required for the assessment of your patient's insurance application.`);
        }

    }
    
        function startOver() {
            location.reload();
        }
    // this is where we register click events
    $('#calculateButton').click(function() { handleYearButtonClicked(); });
    $('#clearHistoryPeriod').click(function() { clearYearButtonClicked(); });
    $("#addMoreConditionsButton").click(function() { addInputField(); });
    $("#allNotes").change(function() { showRequestOption("PMAR"); });
    $("#specificNotes").change(function() { showRequestOption("SCR"); });
    $("#pieceInfo").change(function() { showRequestOption("SIR"); });
    $("#generateInstruction").click(function() { generateInstructions(); });
    $("#startOver").click(function( ) { startOver();});
});
