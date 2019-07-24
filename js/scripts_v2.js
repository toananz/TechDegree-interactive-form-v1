document.addEventListener("DOMContentLoaded",(e)=>{

    const form = document.querySelector('form');
    const inputName = document.getElementById('name');
    const inputMail = document.getElementById('mail');
    const selJob = document.getElementById('title')
    const fieldBasicInfo = document.getElementById('basic-info');
    const fieldActivities = document.getElementById('activities');
    const selPay = document.getElementById('payment');
    const selDesign = document.getElementById('design');
    const selColor = document.getElementById('color');
    const selDivColor = document.getElementById('colors-js-puns');
    const activities = document.querySelector('#activities');
    const activitiesList = document.querySelectorAll('#activities > label');
    const textCost = document.getElementById('total');
    const btnSubmit = document.getElementById('sumbit');
    const inputOtherJobs = document.getElementById('other-title');
    const numCC = document.getElementById('cc-num');
    const numZip = document.getElementById('zip');
    const numCVV = document.getElementById('cvv');
    const divCreditCard = document.getElementById('divCreditCard');
    const mailString = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const letters = /^[a-z ,.'-]+$/i;
    
    
    let validName = false;
    let validEmail = false;
    let validActivities = 0;
    let validPayment = false;
    let validJobOther = false;
    
    let validCCNum = false;
    let validCCZip = false;
    let validCCCVV = false;
    
    const selPayment = document.getElementById('payment');
    const paymentDivs = [divCreditcard = document.getElementById('credit-card'),
                        divPay = document.getElementById('paypal'),
                        divBitCoin = document.getElementById('bitcoin')
                        ];
    
    let totalCost = 0;
    let totalCount = 0;
    
    //------------ Global functions -------------//
    
    // Switch payment views
    function switchPayment(sel) {
      for (var i = 0; i < paymentDivs.length; i++) {
        paymentDivs[i].style.display='none';
      }
      switch (sel) {
        case 'credit card':
          paymentDivs[0].style.display='';
          break;
        default:
        console.log('meh');
          break;
      }
    }
    
    // Check duplicates
    function checkDuplicates(target){
      let parent = target.parentNode;
      let current = parent.getAttribute('value');
      if (current !=0) {
        if (target.checked) {
          for (var i = 1; i < activitiesList.length; i++) {
            if (parent.children[1].textContent == activitiesList[i].children[1].textContent && current != i) {
              activitiesList[i].style.color = 'rgba(0, 0, 0, 0.23)';
              activitiesList[i].children[0].disabled = true;
            }
          }
    
        }
        if (target.checked == false) {
          for (var i = 1; i < activitiesList.length; i++) {
            if (parent.children[1].textContent == activitiesList[i].children[1].textContent && current != i) {
              activitiesList[i].style.color = '';
              activitiesList[i].children[0].disabled = false;
            }
          }
    
        }
      }
    }
    
    
    // Add total
    function addTotal (target){
    
        if (target.checked) {
          totalCount++;
          textCost.style.display ='';
          totalCost += parseInt(target.value);
          textCost.children[0].textContent = "$"+totalCost;
    
        }
        if (target.checked == false) {
          totalCount--;
          totalCost -= parseInt(target.value);
          textCost.children[0].textContent = "$"+totalCost;
    
        }
        hideTotal();
    
    }
    
    
    //Validate activities
    
    function validateActivities(){
      //console.log(fieldActivities.children[1].textContent);
      if (fieldActivities.children[1].textContent !== 'Must select at least one activity.') {
        let li = createValidationText('Must select at least one activity.');
        let parent = fieldActivities;
        let child = parent.appendChild(li);
        parent.insertBefore(child,parent.children[1]);
      }
      if (totalCount>0) {
        fieldActivities.removeChild(fieldActivities.children[1])
      }
    }
    
    
    // Add positioning to activities
    for (var i = 0; i < activitiesList.length; i++) {
      activitiesList[i].setAttribute('value',i);
    }
    
    
    // Hide elements
    function hideTotal(){
      if (totalCount == 0){
        textCost.style.display ='none';
      }
    }
    
    
    // Switch index
    function swithPayment(){
      for (var i = 0; i < paymentDivs.length; i++) {
        paymentDivs[i].style.display = 'none';
      }
      let current = selPayment.options[selPayment.selectedIndex].value;
      for (var i = 1; i < selPayment.length; i++) {
        let key = selPayment.options[i].value;
        if (current==key) {
          paymentDivs[i-1].style.display = '';
        }
      }
    }
    
    
    
    //------------ Init -------------//
    
    // -> Hide stuff
    inputOtherJobs.style.display = 'none';
    selDivColor.style.display = 'none';
    textCost.style.display = 'none';
    selPayment.selectedIndex = 1;
    switchPayment('credit card');
    
    // -> Focus on intut
    inputName.setAttribute('autofocus','');
    
    
    //------------ Dom manipumation -------------//
    
    // Reset input color
    function resetInput(target){
      if (target.nextSibling.className == 'validation-text') {
        target.style.border = '';
        target.parentNode.removeChild(target.nextSibling);
      }
    }
    
    // Create validation text
    function createValidationText(content) {
      let li = document.createElement('p');
      li.textContent = content;
      li.setAttribute('class','validation-text');
      return li;
    }
    
    
    
    //------------ Inline validation -------------//
    
    // Velidate name
    function validateName(target){
      let value = target.value;
      if(value.match(letters)){
          resetInput(target);
          validName = true;
        } else{
          validName = false;
          resetInput(target);
          target.style.border = '1px solid rgb(204, 95, 66)';
          if (value=="") {
            let vText = createValidationText('Name is required');
            let p = fieldBasicInfo.appendChild(vText);
            fieldBasicInfo.insertBefore(p,inputName.nextSibling);
            return false;
          } else {
             let vText = createValidationText('Please enter valid name, must contain letter only.');
             let p = fieldBasicInfo.appendChild(vText);
             fieldBasicInfo.insertBefore(p,inputName.nextSibling);
             return false;
           }
        }
    }
    
    
    // validateEmail
    function validateEmail(target){
      let value = target.value;
      if(value.match(mailString)){
              resetInput(target);
              validEmail = true;
            } else {
              resetInput(target);
              target.style.border = '1px solid rgb(204, 95, 66)';
    
              if (value=="") {
                let vText = createValidationText('Required field');
                let p = fieldBasicInfo.appendChild(vText);
                fieldBasicInfo.insertBefore(p,inputMail.nextSibling);
                validEmail = false;
              } else {
                 let vText = createValidationText('Please enter valid email eg. jon@snow.com');
                 let p = fieldBasicInfo.appendChild(vText);
                 fieldBasicInfo.insertBefore(p,inputMail.nextSibling);
                 validEmail = false;
               }
            }
    }
    
    // Validae Job
    function validateJob(target){
      if(target.value == "other"){
        inputOtherJobs.style.display = '';
      }else if (target.value !== "other" && document.getElementById('other-title') !== null) {
        inputOtherJobs.style.display = 'none';
      }
    }
    
    
    //Show select colors
    function showColors(){
      for (var i = 0; i < selColor.length; i++) {
          selColor[i].style.display ='';
      }
    }
    
    // Color Filter
    const filterColor = {
    
      js_puns: (key)=>{
        showColors();
        for (var i = 0; i < selColor.length; i++) {
          selDivColor.style.display = '';
          if (selColor[i].getAttribute('name') !== 'js_pun' ) {
            selColor[i].style.display ='none';
          }
        }
      },
      heart_js: ()=>{
        showColors();
        selDivColor.style.display = '';
        for (var i = 0; i < selColor.length; i++) {
          if (selColor[i].getAttribute('name') !== 'i_love_js' ) {
            selColor[i].style.display ='none';
          }
        }
    
      },
      default: ()=>{
        showColors();
      }
    };
    
    // Remove CC text
    function removeText(target){
      if ( target.style.borderColor == 'rgb(204, 95, 66)') {
        target.style.border = '';
        target.parentNode.removeChild(target.nextSibling);
      }
    };
    
    // validare CC num
    function validateCCNum(target){
      let parent = target.parentNode;
      let child = target;
      if (target.value.length >= 13 && target.value.length <=16) {
        removeText(target);
        validCCNum = true;
    
      } else {
        validCCNum = false;
        if (target.value.length == 0) {
          removeText(target);
          let li = createValidationText('Required field');
          let p = parent.appendChild(li);
          parent.insertBefore(child,p);
        } else {
          validPayment = false;
          removeText(target);
          let li = createValidationText('Enter valid credit card number, 13-15 characters.');
          let p = parent.appendChild(li);
          parent.insertBefore(child,p);
        }
        target.style.border = '1px solid rgb(204, 95, 66)';
      }
      if (validCCNum && validCCZip && validCCCVV) {
        validPayment = true;
      }
    }
    
    
    // Validate cc Zip
    function validateCCZip(target){
      let parent = target.parentNode;
      let child = target;
      if (target.value.length == 5) {
        validCCZip = true;
        removeText(target);
      } else {
        validCCZip = false;
        if (target.value.length == 0) {
          removeText(target);
          let li = createValidationText('Required field');
          let p = parent.appendChild(li);
          parent.insertBefore(child,p);
        } else {
          validPayment = false;
          removeText(target);
          let li = createValidationText('Enter valid Zip code.');
          let p = parent.appendChild(li);
          parent.insertBefore(child,p);
        }
        target.style.border = '1px solid rgb(204, 95, 66)';
      }
      if (validCCNum && validCCZip && validCCCVV) {
        validPayment = true;
      }
    }
    
    
    // Validate CVV
    function validateCCCVV(target){
      let parent = target.parentNode;
      let child = target;
      if (target.value.length === 3) {
        validCCCVV = true;
        removeText(target);
        return true;
      } else {
        validCCCVV = false;
        if (target.value.length == 0) {
          removeText(target);
          let li = createValidationText('Required field');
          let p = parent.appendChild(li);
          parent.insertBefore(child,p);
        } else {
          validPayment = false;
          removeText(target);
          let li = createValidationText('Enter valid CVV.');
          let p = parent.appendChild(li);
          parent.insertBefore(child,p);
        }
        target.style.border = '1px solid rgb(204, 95, 66)';
      }
      if (validCCNum && validCCZip && validCCCVV) {
        validPayment = true;
      }
    }
    
    // Validate payment info
    selPay.addEventListener('change',(e)=>{
    
      let target=e.target.value;
      let parent = selPay.parentNode;
      let child = selPay.parentNode.children[2];
      let removeValid = ()=> {
        if (e.target.previousSibling.className == 'validation-text') {
          e.target.parentNode.removeChild(e.target.previousSibling);
        }
      }
      if (target=='select_method') {
          validPayment = false;
          let li = createValidationText('Select payment method.');
          let p = parent.appendChild(li);
          parent.insertBefore(p,child);
    
      } else if (target=='credit card') {
          removeValid();
          validPayment = false;
          console.log(validPayment);
      } else if (target=='paypal') {
          removeValid();
          validPayment = true;
          console.log(validPayment);
      } else if (target=='bitcoin') {
          removeValid();
          validPayment = true;
      }
    
    });
    
    
    //------------ Post validation -------------//
    function validateForm(){
      window.scrollTo(0,top);
    
      if (validName && validEmail && validActivities > 0 && validPayment) {
        console.log(validName, validEmail, validActivities, validPayment);
      }else {
        event.preventDefault();
        console.log(validName, validEmail, validActivities, validPayment);
        let parent = form;
        let li = createValidationText('Please correct the invalid field below');
        let child = form.appendChild(li);
        if (form.children[0].className=='validation-text') {
          console.log(form.children[0].className);
          form.removeChild(form.children[0]);
        }
        form.insertBefore(child,parent.firstChild);
        validateName(inputName);
        validateEmail(inputMail);
        validateCCNum(numCC);
        validateCCZip(numZip);
        validateCCCVV(numCVV);
        validateActivities();
      }
    }
    
    
    //------------ Event Listeners -------------//
    
    inputName.addEventListener('focusout', (e)=>{
      validateName(e.target);
    });
    
    inputMail.addEventListener('focusout',(e)=>{
      validateEmail(e.target);
    });
    
    selJob.addEventListener('change',(e)=>{
      validateJob(e.target);
    });
    
    selDesign.addEventListener('change',(e)=>{
        console.log(e.target.value);
        filterColor[e.target.value]();
    });
    
    activities.addEventListener('change',(e)=>{
      checkDuplicates(e.target);
      addTotal(e.target);
      validateActivities();
    });
    
    selPayment.selectedIndex = 1;
    selPayment.addEventListener('change',(e)=>{
      swithPayment();
    })
    
    numCC.addEventListener('focusout',(e)=>{
      validateCCNum(numCC);
    });
    
    numZip.addEventListener('focusout',(e)=>{
      validateCCZip(numZip);
    });
    
    numCVV.addEventListener('focusout',(e)=>{
      validateCCCVV(numCVV);
    });
    
    btnSubmit.addEventListener('click',()=>{
      //event.preventDefault();
      validateForm();
    });
    
    fieldActivities.addEventListener('change',(e)=>{
      if (e.target.checked) {
        validActivities++;
      } else {
        validActivities--;
      }
    });
    
    
    });
    