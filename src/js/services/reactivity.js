import '../libs/jquery.min.js';
import 'jsviews';
import { pagesTemplates } from '../templates.js';

$(() => {
    const $links = $('.nav-list__link');

    // determine active link 
    function setActiveLink() {
        const currentPath = window.location.pathname.substring(1).replace('.html', '');
        $links.each(function() {
            const linkPath = $(this).attr('href').substring(1);
            console.log(' ',  linkPath);
            if (linkPath === currentPath) {
                $(this).addClass('link--active');
            } else {
                $(this).removeClass('link--active');
            }
        });
    }

    // Call the function on page load
    $(window).on('load', setActiveLink);


    $links.on('click', reactivityRouting);

    function reactivityRouting(e) {
        e.preventDefault();
        const page = $(this).attr('href').substring(1); // Убираем начальный символ '#'
        const template = pagesTemplates[page];


        if (template) {

            //animation of the links
            $links.removeClass('link--active');
            $(this).addClass('link--active');

            // animation of the background 
            backgroundAnimation();

            // change breadcrumbs
            const pageName = $(this).text();
            breadcrumbsAnimation(pageName);

            // disable scrolling
            disableScroll();

            // render with animation
            const $app = $('#app');
            const renderedContent = $.templates(template).render({});
            $app.fadeOut(300, function() {
                $app.html(renderedContent).fadeIn(300, enableScroll);
            });

            // update history
            const baseUrl = window.location.href; 
            const newUrl = baseUrl.substring(0, baseUrl.lastIndexOf('/') + 1) + page;
            window.history.pushState({}, '', newUrl);
        } else {
            console.error('Template not found for page:', page);
        }
    }

    let isScrollingDisabled = false;  // for disabling scrolling

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

    let backgroundRotated = false

    function backgroundAnimation() {
        const $background = $('.sub-nav__background');
        $background.fadeOut(300, function() {
            $background.toggleClass('sub-nav__background--rotated');
            $background.fadeIn(300);
        });
        backgroundRotated = !backgroundRotated;
    }

    function breadcrumbsAnimation(pageName) {
        $('.sub-nav__title').fadeOut(300, function() { 
            $(this).text(pageName).fadeIn(300); 
        });
        $('.breadcrumbs__item').eq(1).fadeOut(300, function() { 
            $(this).text(pageName).fadeIn(300); 
        });
    }
});





