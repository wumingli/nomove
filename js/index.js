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
      autoplay: 4000,
      loop: true,
   });
  },
};
//事件绑定
let Event = {
  init() {
    console.log('事件绑定');
  },
};



let init = function() {
  logic.init();
  Event.init();
};
init();
