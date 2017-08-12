/**
 * Created by wumingli on 12/08/2017.
 */

$('.search form').on('submit', function() {
  const $input = $(this).find('input');
  if ($input.val() === '') {
    alert($input.attr('placeholder'));
    return false;
  }
});