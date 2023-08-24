import {el, setChildren} from './node_modules/redom/dist/redom.es.js';

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
        }});

    setChildren(form, [
        el('div', {className: 'form__input-wrap form__input-wrap_holder'}, [
            el('label', {htmlFor: '', className: 'form__label form__holder-label'}, 'Card Holder'),
            el('input', {
                className: 'input input__holder',
                maxLength: '20',
                type: 'text',
                oninput({target}) {
                    const name = document.querySelector('.card__name');
                    target.value = target.value
                        .replace(/[^a-z\s'-]/gi, '').toUpperCase();

                    name.textContent = target.value;
                },
            }),
        ]),
        el('div', {className: 'form__input-wrap form__input-wrap_number'}, [
            el('label', {htmlFor: '', className: 'form__label form__number-label'}, 'Card Number'),
            el('input', {
                className: 'input input__number',
                id: 'cardnumber',
                maxLength: '19',
                type: 'text',
                inputMode: 'numeric',
                oninput({target}) {
                    const number = document.querySelector('.card__number');
                    target.value = target.value
                        .replace(/[\D\s]/g, '')
                        .replace(/(\d{4})(?=\d)/g, '$1 ');
                    number.textContent = target.value;
                },
            }),
        ]),
        el('div', {className: 'form__input-wrap form__input-wrap_date'}, [
            el('label', {htmlFor: '', className: 'form__label form__date-label'}, 'Card Expiry'),
            el('input', {
                className: 'input input__date',
                maxLength: '5',
                type: 'text',
                inputMode: 'numeric',
                oninput({target}) {
                    const expire = document.querySelector('.card__date');
                    target.value = target.value
                        .replace(/[\D\s]/g, '')
                        .replace(/(\d{2})(?=\d)/g, '$1/');
                    expire.textContent = target.value;
                },
            }),
        ]),
        el('div', {className: 'form__input-wrap form__input-wrap_cvv'}, [
            el('label', {htmlFor: '', className: 'form__label form__cvv-label'}, 'CVV'),
            el('input', {
                className: 'input input__cvv',
                maxLength: '3',
                type: 'text',
                inputMode: 'numeric',
                oninput({target}) {
                    target.value = target.value.replace(/\D+/g, '');
                },
            }),
        ]),
        el('button', {className: 'form__button'}, 'CHECK OUT'),
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
