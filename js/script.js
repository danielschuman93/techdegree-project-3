//set focus to the `Name` field on page load
$('#name').focus();



//initally hide `other-title` input field
$('#other-title').hide();



//intially hide activity validation message
$('#select-activity').hide();



//set credit card info as the default display and make `Select Payment Method` unselectable
$('#credit-card').show();
$('#paypal').hide();
$('#bitcoin').hide();
$('#payment').val('Credit Card');
$('option[value="select method"]').attr('disabled', true);



//function to make `other-title` input field appear when `Other` is slected from `Job Role`
$('#title').on('change', function(){
 if($('#title').val() === 'other'){
  $('#other-title').show();
 } else {
    $('#other-title').hide();
   }
})



//function to hide tshirt color options while theme has not been selected
function hideShirtColors() {
  if ($('#design').val() === 'Select Theme'){
    $('#colors-js-puns').hide();
    $('#design option').first().attr('disabled', true);
  }
}

hideShirtColors();



//event listener to display correct shirt colors when theme is selected
$('#design').on('change', function(){
  $('#colors-js-puns').show();
  $('#color').val('')
  $('#design option').first().hide();
  if($('#design').val() === 'js puns') {  
     $('#color option').hide();
     $('#color option:contains(Puns)').show();
  } else if($('#design').val() === 'heart js') {  
           $('#color option').hide();
           $('#color option:contains(I)').show();
    }
});



//event listener for checkboxes
$('input[type="checkbox"]').on('click', function(e){
  let total = 0;
  
  if($(e.target).prop('checked') === true){
   $('input[type="checkbox"]').each(function(){
    if($(e.target).data('dayAndTime') === $(this).data('dayAndTime')){
      $(this).attr('disabled', true);
      $(e.target).attr('disabled', false);
      }
   })
  } else {
        $('input[type="checkbox"]').each(function(){
        if($(e.target).data('dayAndTime') === $(this).data('dayAndTime')){
         $(this).attr('disabled', false);
      }
     })
    }
  
  $('input[type="checkbox"]').each(function(){
    if($(this).prop('disabled') === true){
      $(this).parent().wrap("<strike>");
    } else {
        if($(this).parent().parent().is('strike')){
          $(this).parent().unwrap();
        }
       }
  })
  
  $('input[type="checkbox"]').each(function(){
    if($(this).prop('checked') === true){
      total += parseFloat($(this).data('cost').substring(1));
    }
  })
  $('#total').text('Total: $' + total); 
})



//event listener for payment info
$('#payment').on('change', function(){
  $('option[value="select method"]').hide();
  if($('#payment').val() === 'Credit Card'){
    $('#credit-card').show();
    $('#paypal').hide();
    $('#bitcoin').hide();
  } else if($('#payment').val() === 'PayPal'){
    $('#credit-card').hide();
    $('#paypal').show();
    $('#bitcoin').hide();
  } else if($('#payment').val() === 'Bitcoin'){
    $('#credit-card').hide();
    $('#paypal').hide();
    $('#bitcoin').show();
  }
})



//FORM VALIDATIONS:

//Name
function checkName(){
  let nameRegex = /^[a-zA-Z]+$/;
  if(nameRegex.test($('#name').val())){
    return true;
  } else {
      return false;
  } 
}

//Email
function checkEmail(){
  let emailRegex = /[^@]+@[^\.]+\..+/;
  if(emailRegex.test($('#mail').val())){
    return true;
  } else {
      return false;
  } 
}

//Credit card number
function checkCreditCard(){
  let creditCardRegex = /^[0-9]{13,16}$/;
  let creditCardIncompleteRegex = /^\d+$/;
  if(creditCardRegex.test($('#cc-num').val())){
    return true;
  } else if(creditCardIncompleteRegex.test($('#cc-num').val())) {
      return -1;
    }else {
      return false;
     } 
}

//Zipcode
function checkZip(){
  let zipRegex = /^[0-9]{5}$/;
  if(zipRegex.test($('#zip').val())){
    return true;
  } else {
      return false;
  } 
}

//CVV
function checkCvv(){
  let cvvRegex = /^[0-9]{3}$/;
  if(cvvRegex.test($('#cvv').val())){
    return true;
  } else {
      return false;
  } 
}

//Activities
function checkActivities(){
  if($('input[type=checkbox]:checked').length < 1){
    return false;
  } else {
      return true;
    }
}



//function to run all validations
function checkForm(){
  if($('#payment').val() === 'Credit Card'){
    if(checkName() && checkEmail() && checkActivities() && checkCreditCard() && checkZip() && checkCvv()){
    return true;
  } else {
      return false;
    }
  } else {
      if(checkName() && checkEmail() && checkActivities()){
        return true;
      } else {
          return false;
        }
      }
}



//function to display validation messages
function validationMessages(){
  if(!checkName()){
    $('label[for="name"]').text('Name: Please enter your name.').css('color', 'red');
  };
  
  if(!checkEmail()){
    $('label[for="mail"]').text('Email: Please enter a valid email address.').css('color', 'red');
  };
  
  if(!checkActivities()){
    $('#select-activity').show();
    $('#select-activity').css('color', 'red');
  }
  
  if($('#payment').val() === 'Credit Card'){
    if(!checkCreditCard()){
      $('label[for="cc-num"]').text('Card Number: Please enter a credit card number.').css('color', 'red');
    } else if(checkCreditCard() === -1){
        $('label[for="cc-num"]').text('Card Number: Please enter a 13-16 digit credit card number.').css('color', 'red');
      };
    
    if(!checkZip()){
      $('label[for="zip"]').text('Zip Code: Please enter a 5 digit Zipcode.').css('color', 'red');
    };
    
    if(!checkCvv()){
      $('label[for="cvv"]').text('CVV: Please enter your 3 digit CVV.').css('color', 'red');
    };
  }
}



//EVENT LISTENERS FOR REAL-TIME VALIDATION:

//Name
$('#name').on('keyup', function(){
  if(!checkName()){
    $('label[for="name"]').text('Name: Please enter your name.').css('color', 'red');
  } else {
      $('label[for="name"]').text('Name:').css('color', 'black')
    }
})

//Email
$('#mail').on('keyup', function(){
  if(!checkEmail()){
    $('label[for="mail"]').text('Email: Please enter a valid email address.').css('color', 'red');
  } else {
      $('label[for="mail"]').text('Email:').css('color', 'black');
    }
})

//Credit Card Number
$('#cc-num').on('keyup', function(){
  if(!checkCreditCard()){
      $('label[for="cc-num"]').text('Card Number: Please enter a credit card number.').css('color', 'red');
    } else if(checkCreditCard() === -1){
        $('label[for="cc-num"]').text('Card Number: Please enter a 13-16 digit credit card number.').css('color', 'red');
      } else {
          $('label[for="cc-num"]').text('Card Number:').css('color', 'black');
        }
})



//event listener on submit button
$('button[type="submit"]').on('click', function(e){
  if(checkForm()){
    alert('Thank you for registering!')
  } else {
      e.preventDefault();
      validationMessages();
    }
})