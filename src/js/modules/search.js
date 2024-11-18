import $ from "jquery";
import { navState } from '../services/fixedNavigation.js';


$(() => {
    const $searchIcon      = $('#mobile-search-icon');
    const $searchIconClose = $('#mobile-search-close');
    const $search          = $('#mobile-search');
    const $overlay         = $('#screen-overlay--fade');
    const $body            = $('body');

    const toggleSearch = () => {
        $search.slideToggle(300);
        $overlay.fadeToggle(300);
        $body.toggleClass('no-scroll');
        navState.isSearchOpen = !navState.isSearchOpen;
    };

    $searchIconClose.on('click', toggleSearch);
    $searchIcon.on('click', toggleSearch);

    $overlay.on('click', () => {
        if (navState.isSearchOpen) {
            toggleSearch();
        }
    });
});
  