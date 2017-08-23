//import $ from '../libs/jquery-3.2.1';
//const $ = require('../libs/jquery');
import '../libs/sideBar.js';
import '../libs/jqselect';
import './common';
import '../scss/list.scss';

//alert('test');



var logic = {
  init: function () {
    this.originCountry();
    $("#fd-btn").click(function () {
      if (this.checkVal()) {
        this.extTotal();
      }
      return false;
    });
  },
  //目标国汇率计算
  originCountry: function () {
    var from = 'CNY',
      to = 'USD',
      type = {
        CNY: '人民币',
        USD: '美元'
      },
      amount = 100,
      $amount = $('.sum-have').find('input');
    $('#i-have').selectbox({
      change: function () {
        $('.sum-have-type').text($.trim($('[value="' + $('#i-have').val() + '"]').html()));
      }
    });
    $('#i-want').selectbox({
      change: function () {
        $('.sum-cash-type').text($.trim($('[value="' + $('#i-want').val() + '"]').html()));
      }
    });
    $('#i-years').selectbox({
      change: function () {
        $('.sum-years-type').text($.trim($('[value="' + $('#i-years').val() + '"]').html()));
      }
    });
    $('#huilv-btn').on('click', function () {
      if (!/^\d+$/.test($amount.val())) {
        alert('持有金额必须为正整数！');
        return false;
      }
      from = $('#i-have').val();
      to = $('#i-want').val();
      amount = $amount.val();
      $.ajax({
        url: 'index.php?g=api&m=rateList&a=convert',
        //url: 'http://i.58.com/nomove/mock/jsq.json',
        type: 'get',
        dataType: 'json',
        data: {
          from: from,
          to: to,
          amount: amount
        },
        success: function (data) {
          if (data.status == 1) {
            $('.sum-cash input').val(data.data);
          }
        },
        error: function (e) {
          //todo 开发时无法调用，在此写死
          $('.sum-cash input').val('20.17');
        }
      });
      return false;
    });
    $('.price-all li').on('click', function () {
      //debugger;
      var name = $(this).attr('name');
      $('.jsq-container').show();
      $('.jsq-container').find("div[data-jsq-type='"+name+"']").show();
    });
    $('.close').on('click', function () {
      $(this).parent().hide();
      $('.jsq-container').hide();
    });
  },
  //本息还款的月还款额(参数: 年利率/贷款总额/贷款总月份)
  getMonthMoney1: function (lilv, total, month) {
    var lilv_month = lilv / 12; //月利率
    return total * lilv_month * Math.pow(1 + lilv_month, month) / (Math.pow(1 + lilv_month, month) - 1);
  },
  checkVal: function () {
    var loadMoney, loadDate, loadYearRate;
    var $loadMoney = $("#loadMoney"),
      $loadDate = $("#loadDate"),
      $loadYearRate = $("#loadYearRate");
    loadMoney = $loadMoney.val().replace(/(^\s*)/g, "");
    loadDate = $loadDate.val().replace(/(^\s*)/g, "");
    loadYearRate = $loadYearRate.val().replace(/(^\s*)/g, "");
    var regx = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
    var regMonth = /^[1-9]\d*$/;
    if (loadMoney == "") {
      alert("贷款金额不能为空");
      $loadMoney.focus();
      return false;
    }
    if (!regMonth.test(loadMoney)) {
      alert("贷款金额不正确");
      $loadMoney.focus();
      return false;
    }
    if (loadDate == "") {
      alert("贷款期限不能为空");
      $loadDate.focus();
      return false;
    }
    if (!regMonth.test(loadDate)) {
      alert("贷款期限不正确");
      $loadDate.focus();
      return false;
    }
    if (loadYearRate == "") {
      alert("年利率不能为空");
      $loadYearRate.focus();
      return false;
    }
    if (!regx.test(loadYearRate)) {
      alert("年利率不正确");
      $loadYearRate.focus();
      return false;
    }
    return true;
  },
  extTotal: function () {
    var month = $("#loadDate").val();
    var lilv = $("#loadYearRate").val() / 100;
    var daikuan_total = $("#loadMoney").val() * 10000;
    //var daikuantotal = daikuan_total;
    var month_money1 = this.getMonthMoney1(lilv, daikuan_total, month);
    $("#monthPayMoney").text(Math.round(month_money1));
    var all_total1 = month_money1 * month;
    all_total1 = Math.round(all_total1);
    all_total1 = Math.round(all_total1 * 100) / 100;
    $("#totalRateMoney").text(Math.round((all_total1 - daikuan_total) * 100) / 100);
  },
};
logic.init();