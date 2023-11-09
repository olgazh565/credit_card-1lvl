import {el, setChildren} from './node_modules/redom/dist/redom.es.js';
import {showWarning} from './modules/helpers.js';
import {
    validateCardHolder,
    validateCardNumber,
    validateCardCVV,
    validateCardExpire,
} from './modules/validate.js';

const creditCard = el('div', {className: 'credit-card'}, [
    el('span', {className: 'card__number'}, 'xxxx xxxx xxxx xxxx'),
    el('div', {className: 'card__personal'}, [
        el('span', {className: 'card__name'}, 'John Doe'),
        el('span', {className: 'card__date'}, '04/24'),
    ]),
]);

const createForm = () => {
    const form = el('form', {
        className: 'form',
        action: '#',
        id: 'form',
        onsubmit(e) {
            e.preventDefault();

            const formData = new FormData(e.target);
            const itemData = Object.fromEntries(formData);

            for (const val of Object.values(itemData)) {
                if (!val.replace(/\s/g, '').length) return;
            }

            const isNameValid = validateCardHolder(form.cardName.value);
            const isNumberValid = validateCardNumber(form.number.value);
            const isCVVValid = validateCardCVV(form.cvv.value);
            const isExpireDateValid = validateCardExpire(form.expire.value);

            if (!isNameValid) showWarning(form.cardName);
            if (!isNumberValid) showWarning(form.number);
            if (!isCVVValid) showWarning(form.cvv);
            if (!isExpireDateValid) showWarning(form.expire);

            if (isNameValid && isNumberValid &&
                    isCVVValid && isExpireDateValid) {
                alert('Данные корректны!');
                form.reset();
            }
        }});

    setChildren(form, [
        el('div', {className: 'form__input-wrap form__input-wrap_holder'}, [
            el('label', {htmlFor: '', className: 'form__label form__holder-label'}, 'Card Holder'),
            el('input', {
                className: 'input input__holder',
                type: 'text',
                name: 'cardName',
                oninput({target}) {
                    const name = document.querySelector('.card__name');
                    target.value = target.value.toUpperCase();

                    name.textContent = target.value;
                },
            }),
        ]),
        el('div', {className: 'form__input-wrap form__input-wrap_number'}, [
            el('label', {htmlFor: '', className: 'form__label form__number-label'}, 'Card Number'),
            el('input', {
                className: 'input input__number',
                id: 'cardnumber',
                type: 'text',
                name: 'number',
                oninput({target}) {
                    const number = document.querySelector('.card__number');
                    target.value = target.value
                        .replace(/(\S{4})(?=\S)/g, '$1 ');
                    number.textContent = target.value;
                },
            }),
        ]),
        el('div', {className: 'form__input-wrap form__input-wrap_date'}, [
            el('label', {htmlFor: '', className: 'form__label form__date-label'}, 'Card Expiry'),
            el('input', {
                className: 'input input__date',
                type: 'text',
                name: 'expire',
                oninput({target}) {
                    const expire = document.querySelector('.card__date');
                    target.value = target.value
                        .replace(/(\d{2})(?=\d)/g, '$1/');
                    expire.textContent = target.value;
                },
            }),
        ]),
        el('div', {className: 'form__input-wrap form__input-wrap_cvv'}, [
            el('label', {htmlFor: '', className: 'form__label form__cvv-label'}, 'CVV'),
            el('input', {
                className: 'input input__cvv',
                type: 'text',
                name: 'cvv',
            }),
        ]),
        el('button', {className: 'form__button', type: 'submit'}, 'CHECK OUT'),
    ]);

    return form;
};

setChildren(document.body,
    el('div', {className: 'wrapper'},
        el('div', {className: 'card'},
            [el('p', {className: 'secure'}, 'Secure Checkout'),
                creditCard,
                createForm(),
            ],
        ),
    ),
);

