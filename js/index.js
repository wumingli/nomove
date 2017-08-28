import '../libs/sideBar.js';
import videojs from 'video.js';
//const $ = require('../libs/jquery');
//let Swipe = require('../libs/swipe');
import './common';
import 'swiper';
import '../scss/common.scss';
import '../scss/main.scss';

var model = {
  houseData: [],
};

//逻辑判断
var logic = {
  init: function() {
    this.swiper();
    this.videoPlay();
    if (window.localStorage) {
      if (window.localStorage.getItem('has-written-info') !== '1') {
        $('.choice-house-popup').show();
      }
    }
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
    var resultStr = '<li>当前所选：</li>';
    index = index > 5 ? 5 : index;
    index = index < 0 ? 0 : index;
    if (index != 0) {
      for (var i = 0; i < model.houseData.length; i++) {
        if (model.houseData[i]) {
          resultStr += '<li>' + model.houseData[i] + '</li>';
        }
      }
      $('.prev-btn').show();
      $('.choice-house-result').html(resultStr);
    } else {
      $('.prev-btn').hide();
      $('.choice-house-result').html();
    }
    if (index == 5) {
      $('.next-btn').hide();
      $('.submit-btn').show();
    } else {
      $('.next-btn').show();
      $('.submit-btn').hide();
    }
    $('.choice-house-nav').find('li').eq(index).addClass('active').siblings().removeClass('active');
    $('.choice-house-content li').eq(index).show().siblings().hide();
  },
  //播放视频
  videoPlay:function() {
    var myPlayer = videojs('my-video');
  	videojs('my-video').ready(function(){
  		var myPlayer = this;
  		//myPlayer.play();
  	});
  }
};
//事件绑定
var Event = {
  init: function () {
    this.mouseAnimate();
    this.prevNextEvent();
    this.submitEvent();
    this.closeEvent();
  },
  //新房热卖动画
  mouseAnimate: function () {
    $('.new-house-list li').hover(function () {
      $(this).find('.house-introduce').stop().animate({'height': '150px'}, 300);
    }, function () {
      $(this).find('.house-introduce').stop().animate({'height': '39px'}, 300);
    });
    $('.old-house-left,.old-house-right-item').hover(function () {
      $(this).find('.old-house-introduce').stop().animate({'height': '96px'}, 300);
    }, function () {
      $(this).find('.old-house-introduce').stop().animate({'height': '37px'}, 300);
    });
  },
  //上一步下一步
  prevNextEvent: function () {
    var index = 0,
      $houseBtn = $('.choice-house-btn');
    $houseBtn.on('click', '.prev-btn', function () {
      index--;
      index = index < 0 ? 0 : index;
      logic.choiceHouse(index);
    });
    $houseBtn.on('click', '.next-btn', function () {
      index++;
      index = index > 5 ? 5 : index;
      logic.choiceHouse(index);
    });
    $('.choice-house-content').on('click', 'li .icon', function () {
      model.houseData[index] = $(this).data('value');
      index = $(this).parents('li').index() + 1;
      logic.choiceHouse(index);
      $(this).parents('li').find('.icon').removeClass('active');
      $(this).addClass('active');
      var type = $(this).data('type');
      $('.city-content').find('.item-content').eq(type--)
        .show().siblings('.item-content').hide();
    });
  },
  //提交表单
  submitEvent: function () {
    var submitting = false;
    $('.submit-btn').on('click', function () {
      if (submitting) {
        return;
      }
      var $userName = $('#userName'),
        $userTel = $('#userTel');
      if ($userName.val() === '') {
        alert('请填写你的用户名');
        return false;
      }

      if ($userTel.val() === '') {
        alert('请填写你的联系方式');
        return false;
      }

      var data = {
        target: model.houseData[0],
        country: model.houseData[1],
        city: model.houseData[2],
        type: model.houseData[3],
        category: model.houseData[4],
        full_name: $userName.val(),
        contact: $userTel.val(),
      };
      submitting = true;
      $.ajax({
        url: 'http://983056803.p131810.sqnet.cn/index.php?m=IntentionHouse',
        type: 'post',
        data: data,
        success: function (data) {
          //do something
          if (data.status === 1 && data.message && data.message === 'success') {
            alert('提交成功，我们会尽快与您联系！');
            if (window.localStorage) {
              localStorage.setItem('has-written-info', '1');
            }
            $('.choice-house-popup').hide();
          } else {
            alert('提交失败，请稍候尝试！');
          }
          submitting = false;
        },
        error: function () {
          alert('提交出错，请稍候尝试！');
          submitting = false;
          //do something
        }
      })
    })
  },
  //关闭
  closeEvent: function () {
    $('.close-popup-btn').on('click', function () {
      $('.choice-house-popup').hide();
    });
    $('.close-btn, .cancel-btn').on('click', function () {
      $('.ask-float-content').hide();
      return false;
    })
  }
};



var init = function() {
  logic.init();
  Event.init();
};
init();
