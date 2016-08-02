$('section > h3').on('click', function() {
  if ($($(this).attr('data-target')).is(':visible')) {
    $(this).removeClass('minus').addClass('plus');
  } else {
    $(this).removeClass('plus').addClass('minus');
  }
  $($(this).attr('data-target')).slideToggle('fast');
});
