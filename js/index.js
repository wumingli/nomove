import $ from '../libs/jquery-3.2.1';
import '../libs/sideBar.js'
//const $ = require('../libs/jquery');
//let Swipe = require('../libs/swipe');
import 'swiper';
import '../scss/common.scss';
import '../scss/main.scss';

let model = {
  houseData: [],
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
  //选择心仪房子的交互
  choiceHouse(index){
    let resultStr = `<li>当前所选：</li>`;
    index = index >　5 ? 5 : index;
    index = index < 0 ? 0 : index;
    if(index != 0){
      for(let i = 0; i < model.houseData.length; i++){
        if(model.houseData[i]){
          resultStr += `<li>${model.houseData[i]}</li>`;
        }
      }
      $(".choice-house-result").html(resultStr);
    }else{
      $(".choice-house-result").html();
    }
    $(".choice-house-nav").find("li").eq(index).addClass('active').siblings().removeClass('active');
    $(".choice-house-content li").eq(index).show().siblings().hide();
  }
};
//事件绑定
let Event = {
  init() {
    this.mouseAnimate();
    this.prevNextEvent();
  },
  //新房热卖动画
  mouseAnimate() {
    $(".new-house-list li").hover(function() {
      $(this).find(".house-introduce").animate({"height":"150px"},300);
    },function() {
      $(this).find(".house-introduce").animate({"height":"39px"},300);
    });
  },
  //上一步下一步
  prevNextEvent() {
    let index = 0;
    $(".choice-house-btn").on("click",".prev-btn",function(){
      index--;
      index = index < 0 ? 0 : index;
      logic.choiceHouse(index);
    });
    $(".choice-house-btn").on("click",".next-btn",function(){
      index++;
      index = index > 5 ? 5 : index;
      logic.choiceHouse(index);
    });
    $(".choice-house-content").on("click","li .icon",function(){
      model.houseData[index] = $(this).data("value");
      index = $(this).parents("li").index() + 1;
      logic.choiceHouse(index);
      $(this).parents("li").find(".icon").removeClass("active");
      $(this).addClass("active");
    })
  }
};



let init = function() {
  logic.init();
  Event.init();
};
init();
