import '../libs/jqselect';
import '../libs/sideBar.js';
import '../scss/college.scss';
import './common';

$('.college-tab').find('li').on('click', function() {
  console.log('click');
  $('.college-tab').find('.active').removeClass('active');
  $(this).addClass('active');
  var tabIndex = $(this).index();
  $('.college-content').children('section').addClass('none')
    .eq(tabIndex).removeClass('none');
  location.hash = tabIndex;
}).eq(location.hash.substring(1) / 1 || 0).trigger('click');