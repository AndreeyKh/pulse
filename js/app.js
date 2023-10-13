$(document).ready(function () {
	$('.carousel__inner').slick({
		speed: 600,
		adaptiveHeight: true,
		prevArrow: '<button type="button" class= "slick-prev" > <img src="icons/arrow-left.png" alt="back-arrow"></button>',
		nextArrow: '<button type="button" class= "slick-next" > <img src="icons/arrow-right.png" alt="next-arrow"></button>',
		slidesToShow: 1,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					infinite: true,
					dots: true,
					dotsClass: "my-dots",
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					dots: true,
					dotsClass: "my-dots"
				}
			},
			{
				breakpoint: 425,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					dots: true,
					dotsClass: "my-dots"
				}
			}
		]
	});

	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab-active)', function () {
		$(this)
			.addClass('catalog__tab-active').siblings().removeClass('catalog__tab-active')
			.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});

	function toggleSlide(item) {
		$(item).each(function (i) {
			$(this).on('click', function (e) {
				e.preventDefault();
				$('.catalog__item__content').eq(i).toggleClass('catalog__item__content_active')
				$('.catalog__item__list').eq(i).toggleClass('catalog__item__list_active')
				$('.catalog__item_back').eq(i).toggleClass('catalog__item_back_active')
			})
		})
	}
	toggleSlide('.catalog__item_link')
	toggleSlide('.catalog__item_back')

	// Modal windows

	$('[data-modal=consultation]').on('click', function () {
		$('#consultation, .overlay').fadeIn('slow');
	})

	$('.button_mini').each(function (i) {
		$(this).on('click', function () {
			$('#buy .modal__descr').text($('.catalog__item_subtitle').eq(i).text());
			$('#buy, .overlay').fadeIn('slow')
		})
	})

	$('.modal__close').on('click', function () {
		$('#consultation, #thanks, #buy, .overlay').fadeOut('fast');
	})

	// Validate forms

	function validateForms(form) {
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				phone: "required",
				email: {
					required: true,
					email: true
				},
				errorClass: "error"
			},
			messages: {
				name: {
					required: "Введите ваше имя",
					minlength: jQuery.validator.format("Минимум {0} символа!")
				},
				phone: "Пожалуйста, укажите Ваш номер телефона",
				email: {
					required: "Пожалуйста, укажите Вашу почту",
					email: "Почту нужно указать в формате 'name@domain.com'"
				}
			}
		});
	}

	validateForms('#consultation form')
	validateForms('#buy form');
	validateForms('.feed-form');

	$('form').submit(function (e) {
		e.preventDefault();
		$.ajax({
			type: 'POST',
			url: './mailer/smart.php',
			data: $(this).serialize()

		}).done(function () {
			$(this).find('input').val('');
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn('slow');


			$('form').trigger('reset');
		})
		return false
	})

	// scroll
	$(window).scroll(function  () {
		if ($(this).scrollTop() > 1600) {
			$('.page-up').fadeIn();
		} else {
			$('.page-up').fadeOut();
		}
	})
	
	new WOW().init();

});
