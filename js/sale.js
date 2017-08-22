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
      slideToClickedSlide: false,
      simulateTouch: false,
      onSlideChangeStart: function(){
        $(".gallery-thumbs .swiper-slide-hover").removeClass("swiper-slide-hover");
        $(".gallery-thumbs .swiper-slide").eq(galleryTop.activeIndex).addClass("swiper-slide-hover");
      }
    });
    var galleryThumbs = new Swiper('.gallery-thumbs', {
      spaceBetween: 10,
      slidesPerView: 5,
      touchRatio: 0.2,
      slideToClickedSlide: false,
      onClick: function() {
        $(".gallery-thumbs .swiper-slide-hover").removeClass("swiper-slide-hover");
        $(".gallery-thumbs .swiper-slide").eq(galleryThumbs.clickedIndex).addClass("swiper-slide-hover");
        galleryTop.slideTo(galleryThumbs.clickedIndex,300);
      }
    });
    var houseGalleryTop = new Swiper('.house-gallery-top', {
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      pagination : '.swiper-pagination',
      paginationType: 'fraction',
      slideToClickedSlide: false,
      simulateTouch: false,
      onSlideChangeStart: function(){
        $(".house-gallery-thumbs .swiper-slide-hover").removeClass("swiper-slide-hover");
        $(".house-gallery-thumbs .swiper-slide").eq(houseGalleryTop.activeIndex).addClass("swiper-slide-hover");
      }
    });
    var houseGalleryThumbs = new Swiper('.house-gallery-thumbs', {
      spaceBetween: 10,
      slidesPerView: 5,
      touchRatio: 0.2,
      slideToClickedSlide: false,
      onClick: function() {
        $(".house-gallery-thumbs .swiper-slide-hover").removeClass("swiper-slide-hover");
        $(".house-gallery-thumbs .swiper-slide").eq(houseGalleryThumbs.clickedIndex).addClass("swiper-slide-hover");
        houseGalleryTop.slideTo(houseGalleryThumbs.clickedIndex,300);
      }

    });
    galleryTop.params.control = galleryThumbs;
    galleryThumbs.params.control = galleryTop;
    houseGalleryTop.params.control = houseGalleryThumbs;
    houseGalleryThumbs.params.control = houseGalleryTop;
  }
};
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
};
var init = function(){
  logic.init();
  event.init();
};
init();
