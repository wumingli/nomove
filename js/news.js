/**
 * Created by wumingli on 15/08/2017.
 */
import 'swiper';
import './common';
import '../libs/sideBar.js';
import '../scss/news.scss';

new Swiper('.news-focus', {
  pagination: '.swiper-pagination',
  paginationClickable: true,
  autoplay: 4000,
  loop: true,
});

$('.news-list .tab li').on('click', function () {
  $(this).addClass('active').siblings().removeClass('active');
  $('.news-list .news-tab-con').removeClass('active')
    .eq($(this).index()).addClass('active');
});