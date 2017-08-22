import '../libs/sideBar.js';
import './common';
import 'swiper';
import '../scss/common.scss';
import '../scss/index-search.scss';

new Swiper('.swiper-container', {
  pagination: '.swiper-pagination',
  paginationClickable: true,
  autoplayDisableOnInteraction: false,
  autoplay: 4000,
  loop: true,
});

$('.close-popup-btn').on('click', function () {
  $('.choice-house-popup').hide();
});
$('.close-btn, .cancel-btn').on('click', function () {
  $('.ask-float-content').hide();
  return false;
});