/**
 * Created by wumingli on 12/08/2017.
 */

$('.search form').on('submit', function() {
  var $input = $(this).find('input');
  if ($input.val() === '') {
    alert($input.attr('placeholder'));
    return false;
  }
});

$('.wrapper').append('<div class="mob-menu"></div>');
$('.mob-menu').on('click', function () {
  $('.wrapper-nav-list').toggle();
});