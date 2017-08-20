/**
 * Created by wumingli on 15/08/2017.
 */
import 'swiper';
import './common';
import '../scss/news.scss';

new Swiper('.news-focus', {
  pagination: '.swiper-pagination',
  paginationClickable: true,
  autoplay: 4000,
  loop: true,
});

$('.news-list .tab li').on('click', function () {
  $(this).addClass('active').siblings().removeClass('active');
});