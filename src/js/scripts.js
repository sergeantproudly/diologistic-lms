document.addEventListener('DOMContentLoaded', function() {

	initElements();

	// ССЫЛКИ НА МОДАЛЫ
	$('.js-modal-link').click(function(e) {
		e.preventDefault();
		showModal($(this).attr('href') ? $(this).attr('href').substring(1) : $(this).attr('data-target').substring(1));
	});

	// ЛАЙТБОКСЫ
	var galleries = new Array();
	$('.js-lightbox').each(function(i, a) {
		if (!$(a).is('[data-gallery]')) {
			$(a).magnificPopup({
				type: 'image',
				removalDelay: 300,
  				mainClass: 'mfp-fade',
				// callbacks: {
			 //        beforeOpen: function() {
			 //            $(this.contentContainer).removeClass('fadeOut').addClass('animated fadeIn');
			 //        },
			 //        beforeClose: function() {
			 //        	$(this.contentContainer).removeClass('fadeIn').addClass('fadeOut');
			 //        }
			 //    },
				midClick: true
			});
		} else {
			if (typeof(galleries[$(a).attr('data-gallery')]) == 'undefined') galleries.push($(a).attr('data-gallery'));
		}
	});
	$.each(galleries, function(i, gallery) {
		$('.js-lightbox[data-gallery="' + gallery + '"]').magnificPopup({
			type: 'image',
			removalDelay: 300,
			callbacks: {
		        beforeOpen: function() {
		             $(this.contentContainer).removeClass('fadeOut').addClass('animated fadeIn');
		        },
		        beforeClose: function() {
		        	$(this.contentContainer).removeClass('fadeIn').addClass('fadeOut');
		        }
		    },
			gallery: {
				enabled: true
			},
			midClick: true
		});
	});

	// БУРГЕР
	function asideOpen() {
		$('html').addClass('mobile-opened');
		var aside_h = $('aside>nav').outerHeight() + $('aside>#mn-footer').outerHeight() + $('aside>#bl-copyrights').outerHeight();
		$('html').addClass('html-modal');
		if (aside_h > $(window).height()) $('html').addClass('html-modal-long');
	}
	function asideClose() {
		$('html').removeClass('html-modal mobile-opened');
	}
	$('#ico-burger').click(function() {
		if (__isMobile) {
			asideOpen();
		}
	});
	$('aside .close').click(function() {
		if (__isMobile) {
			asideClose();
		}
	});
	$('aside').swipe({
		swipeLeft: function(event, direction, distance) {
			if (__isMobile) {
				asideClose();
			}
			
		},
		threshold: 20
	});

	// ПОИСК В РУБРИКАТОРЕ
	$('#rubricator .search>input:text').keyup(function() {
		var $dropdown = $(this).siblings('.variants');
		var $cover = $(this).siblings('.cover');
		var value = $(this).val();
		if (value) {
			// DEMO HERE
			if (value.length > 5) {
				$dropdown.html('<div class="empty">Увы, ничего не найдено, попробуйте другой запрос</div>');
			}

			$dropdown.fadeIn(__animationSpeed);
			$cover.fadeIn(__animationSpeed / 2);
		} else {
			$dropdown.fadeOut(__animationSpeed);
			$cover.fadeOut(__animationSpeed / 2);
		}
	});
	$('#rubricator .variants>.item').click(function() {
		var $dropdown = $(this).parent();
		var $cover = $dropdown.siblings('.cover');
		var $input = $dropdown.prev('input:text');
		var value = $(this).text();

		$input.val(value);
		$dropdown.fadeOut(__animationSpeed);
		$cover.fadeOut(__animationSpeed / 2);
	});

	// КАРТА
	// if ($('#map').length) {
	// 	$(document).ready(function() {
	// 		ymaps.ready(function () {
	// 		    var map = new ymaps.Map('map', {
	// 		        center: [55.794124, 49.148462],
	// 		        zoom: 8
	// 		    });
	// 		});
	// 	});
	// }

	// ФОРМЫ
	function checkFormInputs(form) {
		var button = $(form).find('input:submit, button').get(0);
		var error = false;
		$(form).find('input, textarea').not('input:submit').each(function(j, input) {
			if (!$(input).val()) error = true;
		});
		if (error) $(button).prop('disabled', true);
		else $(button).removeAttr('disabled');
	}
	$('.form').each(function(i, form) {
		$(form).find('input, textarea').not('input:submit').on('input', function() {
			checkFormInputs($(this).closest('.form'));
		});
		checkFormInputs(form);
	});

	// ФОРМА АВТОРИЗАЦИИ
	if ($('#modal-authorisation').length) {
		$('#modal-authorisation form').submit(function(e) {
			e.preventDefault();

			// DEMO HERE
			redirect('subjects.html');
		});
	}

	// ФОРМА РЕГИСТРАЦИЯ
	if ($('#modal-registration').length) {
		$('#modal-registration form').submit(function(e) {
			e.preventDefault();

			// DEMO HERE
			redirect('subjects.html');
		});
	}

	// ФОРМА ЗАБЫЛИ ПАРОЛЬ
	if ($('#modal-forget').length) {
		$('#modal-forget form').submit(function(e) {
			e.preventDefault();

			// DEMO HERE
			showModal('modal-done');
		});
	}

});