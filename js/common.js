/**
 * Created by wumingli on 12/08/2017.
 */

$('.search form').on('submit', function() {
  var $input = $(this).find('input'),
    msg = '请输入房产关键字';
  if ($input.val() === '' || $input.val() === msg) {
    alert(msg);
    $(this).find('input').focus();
    return false;
  }
}).find('input').on('focus', function () {
  $(this).val('');
}).on('blur', function () {
  if ($(this).val() === '') {
    $(this).val('请输入房产关键字');
  }
});

$('.wrapper').append('<div class="mob-menu"></div>');
$('.mob-menu').on('click', function () {
  $('.wrapper-nav-list').toggle();
});