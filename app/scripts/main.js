var links = $('.top-nav__link');

links.click(function() {
	links.removeClass('active');
	$(this).addClass('active');
});

function setCounter(button, value) {
	var counter = $('.js-counter', $(button).parent()),
		value = + counter.val() + value,
		min = counter.attr('min'),
		max = counter.attr('max');
	if (min != null && min > value) value = min;
	if (max != null && max < value) value = max;
	counter.val(value);
}

$('.js-plus').click(function() {
	setCounter(this, +1)
});

$('.js-minus').click(function() {
	setCounter(this, -1)
});