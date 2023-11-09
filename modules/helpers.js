import {el, mount, unmount} from '../node_modules/redom/dist/redom.es.js';

export const showWarning = (elem) => {
    const warn = el('h2',
        {className: 'js-validate-error-label'},
        'Данные введены некорректно',
    );

    mount(elem.parentElement, warn);

    setTimeout(() => {
        unmount(elem.parentElement, warn);
    }, 2000);
};
