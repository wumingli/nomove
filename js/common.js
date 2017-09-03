/**
 * Created by wumingli on 12/08/2017.
 */
var $form = $('.search form');
var msg = $form.find('input').eq(1).val();
$form.on('submit', function() {
  var $input = $(this).find('input').eq(1);
  if ($input.val() === '' || $input.val() === msg) {
    alert(msg);
    $(this).find('input').focus();
    return false;
  }
}).find('input').on('focus', function () {
  $(this).val('');
}).on('blur', function () {
  if ($(this).val() === '') {
    $(this).val(msg);
  }
});

$('.wrapper').append('<div class="mob-menu"></div>');
$('.mob-menu').on('click', function () {
  $('.wrapper-nav-list').toggle();
});

//菜单自动显示，点击后不再自动显示
function toggleNav() {
  var $nav = $('.wrapper-nav-list');
  if (window.innerWidth <= 768) {
    if (!window.localStorage.getItem('auto_show_nav')) {
      $nav.show();
    } else {
      $nav.hide();
    }
    $nav.find('li a').on('click', function () {
      $nav.hide();
      window.localStorage.setItem('auto_show_nav', '1')
    });
  } else {
    $nav.show();
  }
}
toggleNav();

$(window).on('resize', toggleNav);