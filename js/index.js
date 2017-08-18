import $ from '../libs/jquery-3.2.1';
import '../libs/sideBar.js';
import videojs from 'video.js';
//const $ = require('../libs/jquery');
//let Swipe = require('../libs/swipe');
import 'swiper';
import '../scss/common.scss';
import '../scss/main.scss';

var model = {
  houseData: [],
  cityList: {
    usa: [{
      key: '1',
      value:'纽约'
    }],
    australia: [{
      key: '2',
      value: '城市1'
    }],
    canada: [{
      key: '3',
      value: '加拿大城市'
    }],
    england: [{
      key: '4',
      value: '伦敦'
    }],
    newZealand: [{
      key: '5',
      value: '新西兰城市'
    }]
  }
};

//逻辑判断
var logic = {
  init: function() {
    this.swiper();
    this.videoPlay();
  },
  //轮播图
  swiper:function() {
    var swiper = new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      autoplayDisableOnInteraction: false,
      autoplay: 4000,
      loop: true,
   });
   //二手房源轮播
   var oldHouseSwiper = new Swiper('.old-house-swiper-container',{
     pagination: '.swiper-pagination',
     paginationClickable: true,
     autoplayDisableOnInteraction: false,
     autoplay: 4000,
     loop: true,
   })
  },
  //选择心仪房子的交互
  choiceHouse:function(index) {
    var resultStr = `<li>当前所选：</li>`;
    index = index >　5 ? 5 : index;
    index = index < 0 ? 0 : index;
    if(index != 0){
      for(let i = 0; i < model.houseData.length; i++){
        if(model.houseData[i]){
          resultStr += `<li>${model.houseData[i]}</li>`;
        }
      }
      $(".prev-btn").hide();
      $(".choice-house-result").html(resultStr);
    }else{
      $(".prev-btn").show();
      $(".choice-house-result").html();
    }
    if(index == 5) {
      $(".next-btn").hide();
      $(".submit-btn").show();
    }else{
      $(".next-btn").show();
      $(".submit-btn").hide();
    }
    $(".choice-house-nav").find("li").eq(index).addClass('active').siblings().removeClass('active');
    $(".choice-house-content li").eq(index).show().siblings().hide();
  },
  //播放视频
  videoPlay:function() {
    var myPlayer = videojs('my-video');
  	videojs("my-video").ready(function(){
  		var myPlayer = this;
  		myPlayer.play();
  	});
  }
};
//事件绑定
var Event = {
  init() {
    this.mouseAnimate();
    this.prevNextEvent();
  },
  //新房热卖动画
  mouseAnimate:function() {
    $(".new-house-list li").hover(function() {
      $(this).find(".house-introduce").animate({"height":"150px"},300);
    },function() {
      $(this).find(".house-introduce").animate({"height":"39px"},300);
    });
  },
  //上一步下一步
  prevNextEvent:function() {
    var index = 0;
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
    });
  }
};



var init = function() {
  logic.init();
  Event.init();
};
init();
