(function ($) {

	"use strict";


	// Form
	var contactForm = function () {
		if ($('#contactForm').length > 0) {
			$("#contactForm").validate({
				rules: {
					nombre: "required",
					edad: "required",
					email: {
						required: true,
						email: true
					},
					otro_genero: {
						required: true,
						minlength: 5
					},
					politica: "required"
				},
				messages: {
					nombre: "Por favor ingresa tu nombre.",
					edad: "Edad no valida.",
					email: "Dirección de correo electrónico no valido.",
					genero: "Por favor elige una opción.",
					politica: "Por favor acepta la política de privacidad."
				},
				/* submit via ajax */

				submitHandler: function (form) {
					var $submit = $('.submitting'),
						waitText = 'Guardando información...';

					$.ajax({
						type: "POST",
						url: "http://localhost:3000/api/v1/visitors",
						data: $(form).serialize(),

						beforeSend: function () {
							$submit.css('display', 'block').text(waitText);
						},
						success: function (msg) {
							console.log('response', msg)
							if (msg == 'OK') {
								chilliController.logon("invitado", "12345");
								$('#form-message-warning').hide();
								setTimeout(function () {
									$('#contactForm').fadeIn();
								}, 1000);
								setTimeout(function () {
									$('#form-message-success').fadeIn();
								}, 1400);

								setTimeout(function () {
									$('#form-message-success').fadeOut();
								}, 8000);

								setTimeout(function () {
									$submit.css('display', 'none').text(waitText);
								}, 1400);

								setTimeout(function () {
									$('#contactForm').each(function () {
										this.reset();
									});
								}, 1400);

							} else {
								$('#form-message-warning').html(msg);
								$('#form-message-warning').fadeIn();
								$submit.css('display', 'none');
							}
						},
						error: function () {
							$('#form-message-warning').html("¡Algo salió mal!, por favor intentalo de nuevo más tarde.");
							$('#form-message-warning').fadeIn();
							$submit.css('display', 'none');
						}
					});
				} // end submitHandler

			});
		}
	};
	contactForm();

})(jQuery);
