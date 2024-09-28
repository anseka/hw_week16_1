const form = document.forms.firstForm;
const nameInput = form.elements.firstName;
const email = form.elements.email;
const age = form.elements.age;
const man = form.elements.man;
const woman = form.elements.woman;
const select = form.elements.prof;
const password = form.elements.password;
const agreeTermsCheckbox = form.elements.agreeTerms;
const button = document.querySelector('button');
// let passRegex = new RegExp(password.getAttribute('pattern'));
let passRegex = /^(?=.*\d)(?=.*[a-z, а-я])(?=.*[A-Z,А-Я]).{8,}$/;
let nameError = document.querySelector('#nameError');
let emailError = document.querySelector('#emailError');
let ageError = document.querySelector('#ageError');
let sexError = document.querySelector('#sexError');
let selectError = document.querySelector('#selectError');
let passwordError = document.querySelector('#passwordError');
let spans = document.querySelectorAll('span');
spans.forEach(function (el) {
	el.style.color = 'red';
});

form.addEventListener('submit', function (evt) {
	evt.preventDefault();
	let hasError = false;
	let nameCorrect = '';
	spans.forEach(function (el) {
		el.innerHTML = '';
	});
	let inputs = [];

	if (nameInput.value === '') {
		nameError.innerHTML = `Введите имя! <br>`;
		hasError = true;
	} else {
		nameCorrect = nameInput.value;
		nameCorrect =
			nameCorrect.slice(0, 1).toUpperCase() +
			nameCorrect.slice(1, nameCorrect.length).toLowerCase();
		inputs.push('Имя: ' + nameCorrect);
	}

	if (email.value === '') {
		emailError.innerHTML += `Введите почту! <br>`;
		hasError = true;
	} else {
		inputs.push('Почта: ' + email.value);
	}

	if (age.value === '') {
		ageError.innerHTML += `Введите возраст! <br>`;
		hasError = true;
	} else if (age.value <= 0) {
		errorMessage.innerHTML += `Введите не отрицательный или нулевой возраст! <br>`;
		hasError = true;
	} else {
		inputs.push('Возраст: ' + age.value);
	}

	if (!man.checked && !woman.checked) {
		sexError.innerHTML += `Выберете пол! <br>`;
		hasError = true;
	} else {
		if (man.checked) {
			inputs.push('Пол: ' + man.value);
		} else {
			inputs.push('Пол: ' + woman.value);
		}
	}

	if (select.value === '') {
		selectError.innerHTML += `Выберете профессию! <br>`;
		hasError = true;
	} else {
		inputs.push('Профессия: ' + select.value);
	}

	if (!passRegex.test(password.value)) {
		passwordError.innerHTML += `В пароле должна содержаться хотя бы одна заглавная буква, хотя бы одна прописная буква, хотя бы одна цифра, а также пароль должен быть не менее 8 символов! <br>`;
		hasError = true;
	} else {
		inputs.push(
			`Пароль: ${password.value} - супер секретно, но там сейчас для теста!`
		);
	}

	if (hasError === false) {
		console.log(inputs.join(', '));
		alert('Форма успешно отправлена, ' + nameCorrect + '!');
		form.reset();
	}
});

agreeTermsCheckbox.addEventListener('change', function () {
	if ((button.disabled = !agreeTermsCheckbox.checked)) {
		button.classList.remove('btn-primary');
		button.classList.add('btn-secondary');
	} else {
		button.classList.remove('btn-secondary');
		button.classList.add('btn-primary');
	}
});
