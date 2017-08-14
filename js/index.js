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
   const oldHouseSwiper = new Swiper('.old-house-swiper-container',{
     pagination: '.swiper-pagination',
     paginationClickable: true,
     autoplayDisableOnInteraction: false,
     autoplay: 4000,
     loop: true,
   })
  },
};
//事件绑定
let Event = {
  init() {
    //console.log('事件绑定');
    //Event.hostHouseAnimate();
    this.mouseAnimate();
  },
  //新房热卖动画
  mouseAnimate() {
    $(".new-house-list li").hover(function() {
      console.log("鼠标移进");
      $(this).find(".house-introduce").animate({"height":"150px"},300);
    },function() {
      console.log("鼠标移出");
      $(this).find(".house-introduce").animate({"height":"39px"},300);
    });
  }
};



let init = function() {
  logic.init();
  Event.init();
};
init();
