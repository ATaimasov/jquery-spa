import '../libs/jquery.min.js';
import 'jsviews';

const pagesTemplates = {
    'about-us': 
    `
    <h1>hello1</h1>
    `,

    'patients': 
    `
    <h1>hello2</h1>
    `,
}

function reactivityRouting(e) {
    e.preventDefault();
    const page = $(this).attr('href').substring(1); // Убираем начальный символ '#'
    const template = pagesTemplates[page];
    if (template) {
        const renderedContent = $.templates(template).render({});
        $('#app').html(renderedContent);
    } else {
        console.error('Template not found for page:', page);
    }
}

$(document).ready(function() {
    $('.nav-list__link').on('click', reactivityRouting);
});
