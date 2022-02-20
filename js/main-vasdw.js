(function ($) {

	"use strict";


	// Form
	var contactForm = function () {
		if ($('#contactForm').length > 0) {
			$("#contactForm").validate({
				rules: {
					nombre: "required",
					edad: "required",
					procedencia: "required",
					genero: "required",
					email: {
						required: true,
						email: true
					},
					politica: "required"
				},
				messages: {
					nombre: "Por favor ingresa tu nombre.",
					edad: "Edad no valida.",
					email: "Dirección de correo electrónico no valido.",
					genero: "Por favor elige una opción.",
					politica: "Por favor acepta la política de privacidad.",
					procedencia: "Procedencia no valida"
				},
				/* submit via ajax */

				submitHandler: function (form) {
					var $submit = $('#btnEnviar'),
						waitText = 'Enviando información';

					$.ajax({
						type: "POST",
						url: "https://api.nobba.com.mx/api/v1/visitors",
						data: $(form).serialize(),

						beforeSend: function () {
							$submit.prop('value', waitText);
							$submit.prop('disabled', true);
						},
						success: function (msg) {
							console.log('response', msg)
							if (msg == 'OK') {
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
								chilliController.logon("invitado", "12345");
								window.location.href = 'https://parquemetropolitanotrespresas.com/';

							} else {
								$('#form-message-warning').html(msg);
								$('#form-message-warning').fadeIn();
								$submit.prop('value', 'Enviar');
								$submit.prop('disabled', false);
							}
						},
						error: function () {
							$('#form-message-warning').html("¡Algo salió mal!, por favor intentalo de nuevo más tarde.");
							$('#form-message-warning').fadeIn();
							$submit.prop('value', 'Enviar');
							$submit.prop('disabled', false);
						}
					});
				} // end submitHandler

			});
		}
	};
	contactForm();

})(jQuery);
