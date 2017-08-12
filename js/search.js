import '../scss/search.scss';
import './common';
import 'swiper';

new Swiper('.recommend-house', {
  pagination: '.swiper-pagination',
  paginationClickable: true,
  autoplay: 4000,
  loop: true,
});

//alert('test');