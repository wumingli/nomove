import 'swiper';
import '../libs/jqselect';
import '../libs/sideBar.js';
import '../scss/search.scss';
import './common';

new Swiper('.recommend-house', {
  pagination: '.swiper-pagination',
  paginationClickable: true,
  autoplay: 4000,
  loop: true,
});

//目标国汇率计算
function originCountry() {
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
}
originCountry();

//投资列表下拉修改
$('.fd-selectbox .h_selectbox').on('click', function (e) {
  e.stopPropagation();
  e.cancelBubble = true;
  $('.h_selectbox-wrapper').hide();
  $(this).next().show();
  $(this).blur();
  return false;
});
$('body').on('click', function (e) {
  $('.h_selectbox-wrapper').hide();
});

//海外房贷计算器
var arrayusa = ["华美银行,4.2", "汇丰银行,3.8", "国泰银行,4", "富国银行,4"];
var arrayau = ["西太平洋银行,4.59", "国家银行,4.59", "联邦银行,4.59", "汇丰银行,4.59", "澳新银行,4.59"];
var arrayca = ["皇家银行,2.1"];
var arrayen = ["中国银行,3.89"];
var arrayja = ["中国银行,2.5"];
//海外房贷
$('#hwfd-country').selectbox({
  change: function () {
    var array_bank;
    var country = $("#hwfd-country").val();
    var $bank = $("#hwfd-bank");
    $("#loadYearRate").val('');
    switch (country) {
      case "美国":
        array_bank = arrayusa;
        break;
      case "澳洲":
        array_bank = arrayau;
        break;
      case "加拿大":
        array_bank = arrayca;
        break;
      case "英国":
        array_bank = arrayen;
        break;
      case "新西兰":
        array_bank = arrayja;
        break;
    }

    $bank.html("<option>请选择银行</option>");
    if (array_bank != null) {
      $bank.selectbox('destory');
      for (var i = 0; i < array_bank.length; i++) {
        var _value = array_bank[i];
        // alert(_value);
        $bank.append("<option value='" + _value.split(',')[1] + "'>" + _value.split(',')[0] + "</option>");
      }
      $bank.selectbox({
        change: function () {
          var bank = $('#hwfd-bank').val();
          $("#loadYearRate").val(bank.split(",")[0]);
        }
      });
    }
  }
});
$('#hwfd-bank').selectbox();
//本息还款的月还款额(参数: 年利率/贷款总额/贷款总月份)
function getMonthMoney1(lilv, total, month) {
  var lilv_month = lilv / 12; //月利率
  return total * lilv_month * Math.pow(1 + lilv_month, month) / (Math.pow(1 + lilv_month, month) - 1);
}
function checkVal() {
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
}
function extTotal() {
  var month = $("#loadDate").val();
  var lilv = $("#loadYearRate").val() / 100;
  var daikuan_total = $("#loadMoney").val() * 10000;
  //var daikuantotal = daikuan_total;
  var month_money1 = getMonthMoney1(lilv, daikuan_total, month);
  $("#monthPayMoney").text(Math.round(month_money1));
  var all_total1 = month_money1 * month;
  all_total1 = Math.round(all_total1);
  all_total1 = Math.round(all_total1 * 100) / 100;
  $("#totalRateMoney").text(Math.round((all_total1 - daikuan_total) * 100) / 100);
}

$("#fd-btn").click(function () {
  if (checkVal()) {
    extTotal();
  }
  return false;
});