import '../libs/jquery.min.js';
import 'jsviews';
import { pagesTemplates } from '../templates.js';

$(() => {
    const $links = $('.nav-list__link');
    let isScrollingDisabled = false;  // for disabling scrolling

    $links.on('click', reactivityRouting);

    function reactivityRouting(e) {
        e.preventDefault();
        const page = $(this).attr('href').substring(1); // Убираем начальный символ '#'
        const template = pagesTemplates[page];

        if (template) {

            //animation of the links
            $links.removeClass('link--active');
            $(this).addClass('link--active');

            // change breadcrumbs
            const pageName = $(this).text();
            $('.sub-nav__title').fadeOut(300, function() { 
                $(this).text(pageName).fadeIn(300); 
            });
            $('.breadcrumbs__item').eq(1).fadeOut(300, function() { 
                $(this).text(pageName).fadeIn(300); 
            });

            const $app = $('#app');
            const renderedContent = $.templates(template).render({});

            disableScroll();

            // animation of the render
            $app.fadeOut(300, function() {
                $app.html(renderedContent).fadeIn(300, enableScroll);
            });
        } else {
            console.error('Template not found for page:', page);
        }
    }


    function disableScroll() {
        if (!isScrollingDisabled) {
            isScrollingDisabled = true;
            $('body').css({
                'overflow': 'hidden',
            });
        }
    }
    
    function enableScroll() {
        if (isScrollingDisabled) {
            isScrollingDisabled = false;
            $('body').css({
                'overflow': 'auto',
            });
        }
    }
});





