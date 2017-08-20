/**
 * Created by wangningbi on 19/08/2017.
 */
import $ from '../libs/jquery-3.2.1';
import 'swiper';
import '../libs/sideBar.js';
import '../scss/sale.scss';
var logic = {
  init:function(){
    this.swiperSlide();
  },
  //轮播图
  swiperSlide:function(){
    var galleryTop = new Swiper('.gallery-top', {
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      pagination : '.swiper-pagination',
      paginationType: 'fraction',
      loop: true,
    });
    var galleryThumbs = new Swiper('.gallery-thumbs', {
      spaceBetween: 10,
      centeredSlides: true,
      slidesPerView: 'auto',
      touchRatio: 0.2,
      slideToClickedSlide: true,
    });
    var houseGalleryTop = new Swiper('.house-gallery-top', {
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      pagination : '.swiper-pagination',
      paginationType: 'fraction',
      loop: true,
    });
    var houseGalleryThumbs = new Swiper('.house-gallery-thumbs', {
      spaceBetween: 10,
      centeredSlides: true,
      slidesPerView: 'auto',
      touchRatio: 0.2,
      slideToClickedSlide: true,
    });
    galleryTop.params.control = galleryThumbs;
    galleryThumbs.params.control = galleryTop;
    houseGalleryTop.params.control = houseGalleryThumbs;
    houseGalleryThumbs.params.control = houseGalleryTop;
  }
}
var event = {
  init: function(){
    this.houseNavEvent();
  },
  //导航点击
  houseNavEvent: function() {
    $(".house-nav-content").on("click","li",function(){
      $(this).addClass("active").siblings().removeClass("active");
    })
  }
}
var init = function(){
  logic.init();
  event.init();
};
init();
