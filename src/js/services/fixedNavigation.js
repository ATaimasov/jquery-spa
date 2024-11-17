import $ from 'jquery';
import { throttle } from '../utils/throttle.js';



  //  correct import ↔ export of the navigation state

const navState = {
  isScrolling : false,
  isBurgerOpen: false,
  isSearchOpen: false,
}

  // fixed nav script

const $nav          = $('#nav-sm'),
      $navAppearing = 'navigation-wrapper--appearing',
      $navHidden    = 'navigation-wrapper--hidden';

let $tempScrollTop = $(window).scrollTop();

function fixedNavigation () {

  if (navState.isScrolling || navState.isBurgerOpen || navState.isSearchOpen) return; 
  
  let $currentScrollTop = $(window).scrollTop();

  if ($currentScrollTop > $nav.height()) {
    $nav.addClass($navHidden);
    if ( $tempScrollTop > $currentScrollTop ) {
      $nav.addClass($navAppearing);
    } else {
    $nav.removeClass($navAppearing);
    }
  } else {
    $nav.removeClass($navHidden);
    $nav.removeClass($navAppearing);
  }
  $tempScrollTop = $currentScrollTop;
  };

  const throttledfixedNavigation = throttle(fixedNavigation, 200);
  $(window).on('scroll', throttledfixedNavigation), {passive: true};


  export {$nav, $navAppearing, $navHidden}; 
  export { navState };