import 'swiper';
import '../libs/jqselect';
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