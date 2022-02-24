function initElements(element) {
	var $element = $(typeof(element) != 'undefined' ? element : 'body');

	$(window).on('resize',function(){
		onResize();
	});

	$element.find('.modal-close, .close-btn, .modal .js-cancel').click(function(e) {
		e.preventDefault();
		e.stopPropagation();

		/*
		if ($element.find('.modal-wrapper:visible').length > 1) {
			$element.find('.modal-wrapper[data-transparent]').stop().animate({'opacity': 1}, __animationSpeed);
			hideModal(this, true);
		} else {
			hideModal(this, false);
		}
		*/
		// if (!$(this).hasClass('modal-close') || !__isMobileSmall) {
		// 	hideModal(this, false);
		// }
		hideModal(this, false);
	});

	$('body').mouseup(function(e) {
		if ($('#modal-fadeout').css('display') == 'block' && !$('body').hasClass('mfp-zoom-out-cur')) {
			if (!$(e.target).closest('.contents').length) {
				hideModal();
			}

		} else if ($('#rubricator .variants').css('display') == 'block') {
			if (!$(e.target).closest('.variants').length && !$(e.target).closest('input[name="keyword"]').length) {
				var $dropdown = $('#rubricator .variants');
				var $cover = $('#rubricator .cover');
				$dropdown.fadeOut(__animationSpeed);
				$cover.fadeOut(__animationSpeed / 2);
			}
		}

	}).keyup(function(e){
		if (!e)e = window.event;
		var key = e.keyCode||e.which;

		if ($('#modal-fadeout').css('display') == 'block' && !$('body').hasClass('mfp-zoom-out-cur')) {			
			if (key == 27) {
				hideModal();
			} 
		} else if ($('#rubricator .variants').css('display') == 'block') {
			if (key == 27) {
				var $dropdown = $('#rubricator .variants');
				var $cover = $('#rubricator .cover');
				$dropdown.fadeOut(__animationSpeed);
				$cover.fadeOut(__animationSpeed / 2);
			}
		}
	});

	$element.find('.input input').on('input focusout', function() {
		$(this).parent('.input').toggleClass('focused', $(this).val() != '');
	}).each(function(i, item) {
		$(item).parent('.input').toggleClass('focused', $(item).val() != '');
	});

	$element.find('textarea.js-autoheight').each(function(i, textarea) {
		if (!$(textarea).data('autoheight-inited')) {
			$(textarea).attr('rows', 1);
			$(textarea).on('input', function() {
				$(this).css('height', 'auto');
        		if ($(this)[0].scrollHeight > 0) $(this).css('height', $(this)[0].scrollHeight+'px');
			});
			if ($(textarea).css('display') != 'none') $(textarea).trigger('input');
			$(textarea).data('autoheight-inited', true);
		}
	});

	$element.find('.input.pswd>.toggler').click(function() {
		var $input = $(this).parent();
		if (!$input.hasClass('shown')) {
			$input.addClass('shown');
			$input.children('input').prop('type', 'text');
		} else {
			$input.removeClass('shown');
			$input.children('input').prop('type', 'password');
		}
	});
}

var resizeCallbacks = [
];
function onResize() {
	__isMobile = ($(window).width() < __widthMobile);
	__isMobileDesktop = ($(window).width() < __widthMobileDesktop);
	__isMobileDesktopSmall = ($(window).width() < __widthMobileDesktopSmall);
	__isMobileTablet = ($(window).width() < __widthMobileTablet);
	__isMobileTabletMiddle = ($(window).width() < __widthMobileTabletMiddle);
	__isMobileTabletSmall = ($(window).width() < __widthMobileTabletSmall);
	__isMobileSmall = ($(window).width() < __widthMobileSmall);

	$.each(resizeCallbacks, function(i, func) {
		func();
	});
}

function parseUrl(url) {
	if (typeof(url) == 'undefined') url=window.location.toString();
	var a = document.createElement('a');
	a.href = url;

	var pathname = a.pathname.match(/^\/?(\w+)/i);	

	var parser = {
		'protocol': a.protocol,
		'hostname': a.hostname,
		'port': a.port,
		'pathname': a.pathname,
		'search': a.search,
		'hash': a.hash,
		'host': a.host,
		'page': pathname?pathname[1]:''
	}		

	return parser;
} 

function fixSelfHeight(element) {
	var h = $(element).height();
	$(element).height(h);
}
function unfixSelfHeight(element) {
	$(element).height('auto');
}

function showModal(modal_id, dontHideOthers) {
	var $modal = $('#' + modal_id);

	if (typeof(dontHideOthers) == 'undefined' || !dontHideOthers) $('.modal-wrapper:visible').not($modal).attr('data-transparent', true).stop().animate({'opacity': 0}, __animationSpeed, function() {
			$(this).hide().css('opacity', 1);
		});

	//var display = __isMobileSmall ? 'block' : 'table';
	//var display = 'table';
	//var display = 'block';
	//var display = __isMobileSmall ? 'flex' : 'block';

	// header bug fix
	fixSelfHeight($('header'));

	$('#modal-fadeout').stop().fadeIn(300);
	// if (display === 'flex') $modal.stop().css('display', 'flex').hide().fadeIn(450);
	// else $modal.stop().fadeIn(450);
	 $modal.stop().fadeIn(450);

    var oversize = $(window).height() < $modal.find('.contents').outerHeight(true);
    if (__isMobileSmall && !oversize) $modal.css({
    	display: 'flex'
    });
    var modal_h = $modal.find('.contents').outerHeight(true);

    $('html').addClass('html-modal');

	// if ($modal.attr('data-long') || oversize) {
	// 	$('html').addClass('html-modal-long');

	// 	// if (oversize && __isMobile) {
	// 	// 	var modalHeight = $modal.outerHeight() - parseInt($('#layout').css('padding-top'));
	// 	// 	$('#layout').data('scrollTop', $(window).scrollTop()).addClass('js-modal-overflow').height(modalHeight);
	// 	// 	$modal.css('top', 0);
	// 	// 	$('html,body').scrollTop(0);
	// 	// }
	// } else {
	// 	$('html').addClass('html-modal');
	// }

	// $modal.find('.js-scroll').each(function(index, block) {
	// 	scrollInit(block);
	// });
}

function hideModal(sender, onlyModal) {
	var $modal = sender ? $(sender).closest('.modal-wrapper') : $('.modal-wrapper:visible');
	if (typeof(onlyModal) == 'undefined' || !onlyModal) {
		$('#modal-fadeout').stop().fadeOut(300);
		// if ($('#layout').data('scrollTop')) {
		// 	var savedScrollTop =$('#layout').data('scrollTop');
		// 	$('#layout').removeClass('js-modal-overflow').height('auto').removeData('scrollTop');
		// 	$('html,body').scrollTop(savedScrollTop);
		// }
		$modal.stop().fadeOut(450, function() {
			$('html').removeClass('html-modal');
			// $('html').css({
		 //    	overflow: 'visible ',
		 //    	height: 'auto'
		 //    });

			// header bug fix
			unfixSelfHeight($('header'));
		});
	} else {
		$modal.stop().fadeOut(450);
	}
}

/*
function closeModal(sender) {
	if ($('.modal-wrapper:visible').length > 1) {
		$('.modal-wrapper[data-transparent]').stop().animate({'opacity': 1}, __animationSpeed);
		hideModal(sender, true);
	} else {
		hideModal(sender, false);
	}
}
*/

function showModalConfirm(header, btn, action) {
	if (typeof(header) != 'undefined' && header) $('#modal-confirm>.modal>.contents>h1').text(header);
	if (typeof(btn) != 'undefined' && btn) $('#modal-confirm-action-btn').text(btn);
	if (typeof(action) == 'function') {
		$('#modal-confirm-action-btn').click(function(e) {
			e.preventDefault();
			e.stopPropagation();

			action();
			hideModal(this, $('.modal-wrapper:visible').length > 1);
		});
	}
	showModal('modal-confirm', true);
}

function scrollInit(block) {
	if (!$(block).data('inited')) {
		var maxHeight = $(block).attr('data-max-height');
		if (maxHeight < 0) maxHeight = $(block).parent().height() - Math.abs(maxHeight);
		if (maxHeight && $(block).outerHeight() > maxHeight) {
			$(block).css('max-height', maxHeight + 'px').jScrollPane({
					showArrows: false,
					mouseWheelSpeed: 20,
					autoReinitialise: true,
					verticalGutter: 0,
					verticalDragMinHeight: 36
				}
			);
		}
		$(block).data('inited', true);
	}
}

function getOffsetSum(elem) {
	var t = 0, l = 0;
	while (elem) {
		t += t + parseFloat(elem.offsetTop);
		l += l + parseFloat(elem.offsetLeft);
		elem = elem.offsetParent;
	}
	return {top: Math.round(t), left: Math.round(l)};
}
function getOffsetRect(elem) {
	var box = elem.getBoundingClientRect();
	var body = document.body;
	var docElem = document.documentElement;
	var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
	var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
	var clientTop = docElem.clientTop || body.clientTop || 0;
	var clientLeft = docElem.clientLeft || body.clientLeft || 0;
	var t  = box.top +  scrollTop - clientTop;
	var l = box.left + scrollLeft - clientLeft;
	return {top: Math.round(t), left: Math.round(l)};
}
function getOffset(elem) {
	if (elem.getBoundingClientRect) {
		return getOffsetRect(elem);
	} else {
		return getOffsetSum(elem);
	}
}

// Animated scroll to target
function _scrollTo(target, offset) {
	var wh = $(window).height();
	if (typeof(offset) == 'undefined') offset = Math.round($(target).outerHeight() /2) - Math.round(wh / 2);
	else if (offset === false) offset = 0;
	$('html,body').animate({
		scrollTop: $(target).offset().top + offset
	}, 1000);
}

function redirect(url) {
  window.location = url;
}

function reload(forceGet) {
  window.location.reload(forceGet);
}