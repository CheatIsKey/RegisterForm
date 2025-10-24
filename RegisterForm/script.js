const wrapperBox = document.getElementById("wrapper");
const inputFieldGroup = document.getElementsByClassName("inputGroup");
const allInputs = document.querySelector("input");
const userNickname = document.getElementById("nickname");
const userEmail = document.getElementById("email");
const userPassword = document.getElementById("userPassword");
const confirmPassword = document.getElementById("confirmPassword");
const userPhone = document.getElementById("phone");
const registrationForm = document.getElementById("registrationForm");

const FIELD_LABEL = {
    nickname: "닉네임",
    email: "이메일",
    userPassword: "비밀번호",
    confirmPassword: "비밀번호 확인",
    phone: "휴대폰 번호",
};

// input은 각각의 입력 필드 '태그'
const updatedHelperText = (input, message, isValid) => {
    const inputGroup = input.parentElement;
    const helperText = inputGroup.getElementsByClassName("helperText")[0];

    if (isValid == true) {
        inputGroup.classList.remove('invalid');
        inputGroup.classList.add('valid');
        helperText.style.visibility = 'hidden';
    }

    if (isValid == false) {
        inputGroup.classList.remove('valid');
        inputGroup.classList.add('invalid');
        helperText.style.visibility = 'visible';
        helperText.innerText = message;
    }
};


const checkEmptyInput = (input, fieldName) => {
    const label = fieldName || FIELD_LABEL[input.id] || "이 필드"; 
    const ch = label.charCodeAt(label.length - 1);
    const hasFinal = 0xac00 <= ch && ch <= 0xd7a3 ? ((ch - 0xac00) % 28) !== 0 : false;
    const particle = hasFinal ? "은" : "는";

    if (input.value.trim() === "") {
    updatedHelperText(input, `${label}${particle} 필수입니다!`, false);
    return false;
    } else {
    updatedHelperText(input, "", true);
    return true;
    }
};

const validateEmailFormat = (input) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    if (emailPattern.test(input.value.trim()) == true) {
        updatedHelperText(input, '', true);
        return true;
    } else {
        updatedHelperText(input, "이메일 주소를 다시 한 번 확인해주세요!", false);
        return false;
    }
};

const checkPasswordStrength = (password) => {
    const strongPattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/
    if (strongPattern.test(password.value.trim()) == true) {
        updatedHelperText(password, '', true);
        return true;
    } else {
        updatedHelperText(password, "비밀번호는 8자 이상이어야 합니다!", false);
        return false;
    }
};

const validatePasswordMatch = (passwordInput, confirmInput) => {
    if (passwordInput.value !== confirmInput.value) {
        updatedHelperText(confirmInput, "비밀번호가 일치하지 않습니다!", false);
        return false;
    } else {
        updatedHelperText(confirmInput, "", true);
        return true;
    }
};

const validatePhoneNumber = (input) => {
    const phonePattern = /^0\d{1,2}-\d{3,4}-\d{4}$/;
    if (phonePattern.test(input.value.trim()) == true) {
        updatedHelperText(input, "", true);
        return true;
    } else {
        updatedHelperText(input, "휴대폰 번호를 다시 한 번 확인해주세요!", false);
        return false;
    }
};

const validateForm = () => {
    const isNicknameValid = checkEmptyInput(userNickname);
    const isEmailValid = validateEmailFormat(userEmail);
    const isPasswordStrong = checkPasswordStrength(userPassword);
    const isPasswordMatch = validatePasswordMatch(userPassword, confirmPassword);
    const isPhoneValid = validatePhoneNumber(userPhone); 

    return isNicknameValid && isEmailValid && isPasswordStrong && isPasswordMatch && isPhoneValid;
};

registrationForm.addEventListener('submit', (e) => {
    // 폼 안의 버튼을 누르면 이벤트 발생 -> {key:value} 형태로 객체 데이터를 담은 e가 생성
    // 폼 제출을 하면 자동으로 새로고침 수행
    e.preventDefault();
    if (validateForm() == true) {
        console.log("모든 필드가 유효합니다.");
    } else {
        console.log("필드 중 유효하지 않은 데이터가 있습니다.");
    }
});

document.querySelectorAll("input").forEach(input => {
    input.addEventListener('input', () => {
        switch (input.id) {
            case 'nickname':
                checkEmptyInput(input);
                break;
            case 'email':
                validateEmailFormat(input);
                break;
            case 'userPassword':
                checkPasswordStrength(input);
                break;
            case 'confirmPassword':
                validatePasswordMatch(userPassword, confirmPassword);
                break;
            case 'phone':
                validatePhoneNumber(input);
                break;
        }
    });
});