export const validateCardHolder = (str) => {
    const test = str.toString();
    const regExpName = /^[a-zA-Z]+\s{1,1}[a-zA-Z]+$/gi;

    if (!regExpName.test(test)) return false;

    return true;
};

export const validateCardNumber = (str) => {
    const test = str.toString();
    const result = test.replace(/\s+/g, '');
    const regExpNumber = /^[\d]+$/g;

    if (!regExpNumber.test(result) || result.length !== 16) return false;

    return true;
};

export const validateCardCVV = (str) => {
    const test = str.toString();
    const regExpCVV = /^[\d]+$/g;

    if (!regExpCVV.test(test) || test.length !== 3) return false;

    return true;
};

export const validateCardExpire = (str) => {
    const test = str.toString();
    const regExpExpire = /^(0[1-9]|1[0-2])\/2([3-9])$/g;

    if (!regExpExpire.test(test) || test.length !== 5) return false;

    return true;
};

