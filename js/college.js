import '../libs/jqselect';
import '../scss/college.scss';
import './common';

$('.college-tab').find('li').on('click', function() {
  console.log('click');
  $('.college-tab').find('.active').removeClass('active');
  $(this).addClass('active');
  var tabIndex = $(this).index();
  $('.college-content').children('section').addClass('none');
  $('.college-content').children('section').eq(tabIndex).removeClass('none');


});