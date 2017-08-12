import $ from '../libs/jquery-3.2.1';
//const $ = require('../libs/jquery');
//let Swipe = require('../libs/swipe');
import 'swiper';
import '../scss/common.scss';
import '../scss/main.scss';

let model = {
};

//逻辑判断
let logic = {
  init() {
    this.swiper();

  },
  //轮播图
  swiper() {
    const swiper = new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      autoplayDisableOnInteraction: false,
      autoplay: 4000,
      loop: true,
   });
   //二手房源轮播
  //  const oldHouseSwiper = new Swiper('.old-house-swiper-container',{
  //    pagination: '.old-swiper-pagination',
  //    paginationClickable: true,
  //    autoplayDisableOnInteraction: false,
  //    autoplay: 4000,
  //    loop: true,
  //  })
  },
};
//事件绑定
let Event = {
  init() {
    //console.log('事件绑定');
    //Event.hostHouseAnimate();
  },
  //新房热卖动画
  hostHouseAnimate() {
    $(".house-introduce").hover(() => {
      console.log("鼠标移进");
      $(".house-introduce").css("height","150px");
      $(".house-introduce").addClass('animated');
    },() => {
      console.log("鼠标移出");
      $(".house-introduce").css("height","39px");
      $(".house-introduce").addClass('animated');
    });
  }
};



let init = function() {
  logic.init();
  Event.init();
};
init();
