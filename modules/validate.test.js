import {validateCardHolder, validateCardNumber, validateCardCVV, validateCardExpire} from './validate.js';

describe('Проверка имени держателя карты', () => {
    it('Проверка на 1 слово работает корректно', () => {
        expect(validateCardHolder('Ivanpetrov')).toBe(false);
        expect(validateCardHolder('IVANPETROV')).toBe(false);
        expect(validateCardHolder('ivan petrov')).toBe(true);
    });
    it('Проверка на кирилицу работает корректно', () => {
        expect(validateCardHolder('иван петров')).toBe(false);
        expect(validateCardHolder('иванпетров')).toBe(false);
        expect(validateCardHolder('IVAN PETROV')).toBe(true);
    });
    it('Проверка на содержание цифр работает корректно', () => {
        expect(validateCardHolder('1van petrov')).toBe(false);
        expect(validateCardHolder('ivan petro8')).toBe(false);
        expect(validateCardHolder('IVAN petrov')).toBe(true);
    });
});

describe('Проверка номера карты', () => {
    it('Проверка на кирилицу работает корректно', () => {
        expect(validateCardNumber('1234авпи4568апст')).toBe(false);
        expect(validateCardNumber('55рраап55рреннне')).toBe(false);
        expect(validateCardNumber('5555544448888111')).toBe(true);
    });
    it('Проверка на латиницу работает корректно', () => {
        expect(validateCardNumber('3456ddhb2345piyt')).toBe(false);
        expect(validateCardNumber('35363647hhhhh777')).toBe(false);
        expect(validateCardNumber('1314365869798000')).toBe(true);
    });
    it('Проверка на знаки препинания работает корректно', () => {
        expect(validateCardNumber('1222-5555-5555-2222')).toBe(false);
        expect(validateCardNumber('3456/4566/2346/5779')).toBe(false);
        expect(validateCardNumber('4647586793343546')).toBe(true);
    });
    it('Проверка на количество цифр работает корректно', () => {
        expect(validateCardNumber('23456543567890')).toBe(false);
        expect(validateCardNumber('123456789098765432')).toBe(false);
        expect(validateCardNumber('3456234567894567')).toBe(true);
    });
});

describe('Проверка CVV кода', () => {
    it('Проверка на кирилицу работает корректно', () => {
        expect(validateCardCVV('4и4')).toBe(false);
        expect(validateCardCVV('п55')).toBe(false);
        expect(validateCardCVV('488')).toBe(true);
    });
    it('Проверка на латиницу работает корректно', () => {
        expect(validateCardCVV('56d')).toBe(false);
        expect(validateCardCVV('h77')).toBe(false);
        expect(validateCardCVV('131')).toBe(true);
    });
    it('Проверка на знаки препинания работает корректно', () => {
        expect(validateCardCVV('2-5')).toBe(false);
        expect(validateCardCVV('6/4')).toBe(false);
        expect(validateCardCVV('464')).toBe(true);
    });
    it('Проверка на количество цифр работает корректно', () => {
        expect(validateCardCVV('2345')).toBe(false);
        expect(validateCardCVV('12')).toBe(false);
        expect(validateCardCVV('345')).toBe(true);
    });
});

describe('Проверка срока действия карты', () => {
    it('Проверка на кирилицу работает корректно', () => {
        expect(validateCardExpire('ццц')).toBe(false);
        expect(validateCardExpire('гг/гг')).toBe(false);
        expect(validateCardExpire('05/25')).toBe(true);
    });
    it('Проверка на латиницу работает корректно', () => {
        expect(validateCardExpire('yy/yy')).toBe(false);
        expect(validateCardExpire('h2/y5')).toBe(false);
        expect(validateCardExpire('12/24')).toBe(true);
    });
    it('Проверка на неверную дату', () => {
        expect(validateCardExpire('15/25')).toBe(false);
        expect(validateCardExpire('09/45')).toBe(false);
        expect(validateCardExpire('01/26')).toBe(true);
    });
    it('Проверка на количество символов работает корректно', () => {
        expect(validateCardExpire('12/2024')).toBe(false);
        expect(validateCardExpire('1/25')).toBe(false);
        expect(validateCardExpire('08/25')).toBe(true);
    });
});

