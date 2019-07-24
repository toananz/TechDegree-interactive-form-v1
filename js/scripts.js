document.addEventListener("DOMContentLoaded",(e)=>{
    //-------- Set Global Var ---------//
    const $form = $("form");
    const $inpName = $("#name");
    const $inpEmail = $("#mail");
    const fieldBasicInfo =$("#basic-info");
    const $selJobRole = $("#title");
    const $inpOtherRole = $("#other-title");
    const $selColor = $("#colors-js-puns");
    const $selDesign = $("#design");
    const $activities = $("#activities")
    const $activitiesInp = $("#activities label")
    const $total = $("#total");
    const $payment = $("#payment");
    const $paymentOpt = $("#payment option");
    const $cclDiv = $("#credit-card");
    const $cclNum = $("#cc-num");
    const $cclZip = $("#zip");
    const $cclCVV = $("#cvv");
    const $payPalDiv = $("#paypal");
    const $bitcoinDiv = $("#bitcoin");
    const $btnSubmit = $("#sumbit");

    const mailString = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const letters = /^[a-z ,.'-]+$/i;
    const ccRegex = /^\d{13,16}$/;
    const zipRegex = /^\d{5}$/;
    const cvvRegex = /^\d{3}$/;

    
    const validBasicInfo = {
        validName: false,
        validEmail: false,
        validActivities: false,
    };

    const validSelection = {
        validPayment: false,
        validJobOther: false
    };

    let validCCNum = false;
    let validCCZip = false;
    let validCCCVV = false;


    //-------- Global funcation ---------//

    //Hide element
    const hideElement = (target)=>{
        $(target).hide();
        //console.log(target);
    };

    //Show element
    const showElement = (target)=>{
        target.show();
    };

    // Reset input color
    function resetInput(target){
        if (target.nextSibling.className == 'validation-text') {
        target.style.border = '';
        target.parentNode.removeChild(target.nextSibling);
        }
    }


    //--------Show/hide other job role---------//
    $($selJobRole).on('change',function(event){
        let $selectOpt = $(this).find("option:selected").val();
        //console.log($selectOpt);
        if($selectOpt === 'other'){
            showElement($inpOtherRole);
            
        }else{
            hideElement($inpOtherRole);
        }
    });

    //--------Show/hide Tshirt Colors---------//
    const $colorArr_pun = $('#color option:contains(Pun)');
    const $colorArr_lov = $('#color option:contains(JS shirt only)');

    $($selDesign).on('change',function(event){
        let $selectOpt = $(this).find("option:selected").val();
        if($selectOpt === 'js_puns'){
            //console.log($selectOpt);
            showElement($selColor);
        
            for (let index = 0; index < $colorArr_pun.length; index++) {
                showElement($colorArr_pun.eq(index));
            }
            for (let index = 0; index < $colorArr_lov.length; index++) {
                hideElement($colorArr_lov.eq(index));
            }

        }else if($selectOpt ==='heart_js'){
            for (let index = 0; index < $colorArr_pun.length; index++) {
                hideElement($colorArr_pun.eq(index));
            }
            for (let index = 0; index < $colorArr_lov.length; index++) {
                showElement($colorArr_lov.eq(index));
            }
        }
        else{
            hideElement($selColor);
        }
    });


    //--------Activities Selection---------//
    let checkCount = 0;
    let totalPrice = 0;

    //Actities listener
    $activities.on('change',function(event){
        
        let otherSibs = $(event.target).parent().siblings('label');
        let eventTime = $(event.target).parent().find('.time').text();
        let price = parseInt($(event.target).parent().find('.price').text());
        if($(event.target).is(":checked")){
            checkCount++;
            totalPrice += price;    
            for (let index = 0; index < otherSibs.length; index++) {
                if(eventTime === $(otherSibs).eq(index).find(".time").text()){
                    //console.log('match');
                    $(otherSibs).eq(index).find('input').attr("disabled", true)
                    $(otherSibs).eq(index).css({ 'color': 'rgba(0, 0, 0, 0.23)'});
                }
            }
        }else{
            totalPrice -= price;
            for (let index = 0; index < otherSibs.length; index++) {
                if(eventTime === $(otherSibs).eq(index).find(".time").text()){
                    $(otherSibs).eq(index).find('input').attr("disabled", false)
                    $(otherSibs).eq(index).css({ 'color': '#000'});
                }
            }
            checkCount--;
        }
        $total.html("Total: $"+ totalPrice);
        if(checkCount>0){
            showElement($total);
        }else{
            hideElement($total);
        }

        if (checkCount>0){
            validBasicInfo.validActivities = true;
        } else{
            validBasicInfo.validActivities = false;
        }
    });


    //-------- Payment options---------//
    $payment.on('change',function(event){
        let selectVal = $(event.target).val();
        let elementVal = "";
        hideElement($payPalDiv);
        hideElement($bitcoinDiv)
        hideElement($cclDiv);
        if (selectVal==='credit_card'){
            elementVal = $cclDiv;
        } else if (selectVal==='paypal'){
            elementVal = $payPalDiv;
        } else if (selectVal==='bitcoin'){
            elementVal = $bitcoinDiv;
        } else{
            elementVal = '';
        }
        showElement(elementVal);
    });
    

     //-------- Inline validation--------//

    //Display error functions
     const displayError = {
        text:   (target, message)=>{
                $(target).attr('class','inptxtError');
                $(target).after(`<p class="error-text">${message}</p>`);
                }
                
    
    };

    //Reset errors states functions
    const resetTextError = {
        text:   (target)=>{
                 $(target).attr('class','');  
                } 
    };
       
   //Text fiel validation function
   const textValidation = (target,message,regex,id)=>{
        let inpVal = $(target).val(); 
        if(!regex.test(inpVal)){
            if($(target).attr('class') !== 'inptxtError'){
                displayError.text(target, message)
            }
            validBasicInfo[id] = false;
            
        } else{
            validBasicInfo[id] = true;
            if($(target).next().attr('class')==='error-text'){
                resetTextError.text(target);
                $(target).next().remove();    
            }
    
        }
    
   };


   //-------- Post validation--------//
   const validateForm = ()=>{
    //
        if(validBasicInfo.validName && validBasicInfo.validEmail && validBasicInfo.validActivities){
            console.log("Valid");
        } else{
            console.log("invalid");
            
        }
   };


    //Name validation
    $inpName.on("focusout",(e)=>{
        textValidation(e.target,'Valid name required',letters, 'validName');
    });

    //Email validation
    $inpEmail.on("focusout",(e)=>{
        textValidation(e.target,'Valid email required',mailString, 'validEmail');
    });

    //CC number validation
    $cclNum.on("focusout",(e)=>{
        textValidation(e.target,'Valid Number required (13-16 digits)',ccRegex, 'validCCNum');
    });

    //Zip number validation
    $cclZip.on("focusout",(e)=>{
        textValidation(e.target,'Valid Number required (5 digits)',zipRegex, 'validCCZip');
    });    

    //CVV number validation
    $cclCVV.on("focusout",(e)=>{
        textValidation(e.target,'Valid Number required (3 digits)',cvvRegex, 'validCCCVV');
    });    





    //-------- Initial load ---------//
    $inpName.focus();
    hideElement($inpOtherRole);
    hideElement($selColor);
    hideElement($total);
    hideElement($payPalDiv);
    hideElement($bitcoinDiv);
    $paymentOpt.eq(0).attr('disabled', true);
    $paymentOpt.eq(1).attr('selected', true);
    $form.on('submit',(e)=>{
        e.preventDefault();
        validateForm();
    });

    
    


});



