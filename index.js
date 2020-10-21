const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerHTML = message;
}

function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function checkEmail(input){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())){
        showSuccess(input);
    }else{
        showError(input, 'Email is invalid');
    }
}

function checkRequired(inputArr){
    inputArr.forEach(function(input){
        if(input.value.trim() === ''){
            showError(input, `${getFieldName(input)} is required`);
        }else{
            showSuccess(input);
        }
    });
}

function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkLength(input, min, max){
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be atleast ${min} character`);
    }else if(input.value.length > max){
        showError(input, `${getFieldName(input)} must be less than ${max} character`);
    }else{
        showSuccess(input);
    }
}

function checkPasswordsMatch(password1, password2){
    if(password1.value !== password2.value){
        showError(password2, 'Passwords do not match');
    }
}

form.addEventListener('submit', e => {
    e.preventDefault();
    checkRequired([name,email,password,password2]);
    checkLength(name,3,15);
    checkLength(password, 6,25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
});
