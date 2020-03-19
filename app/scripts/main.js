var links = $('.top-nav__link');

links.click(function() {
	links.removeClass('active');
	$(this).addClass('active');
});