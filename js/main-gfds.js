
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

					var macAddress = getUrlParams();
					
					$("#macAddress").val(macAddress)

					$.ajax({
						type: "POST",
						url: "https://api.nobba.com.mx/api/v1/visitors",
						// url: "http://localhost:3000/api/v1/visitors",
						data: $(form).serializeArray(),
						

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

	var macAddress = getUrlParams();
	if (macAddress) {
		sendMacAddress(macAddress);
	}

	contactForm();

})(jQuery);


 function getUrlParams () {
	//var url_string = "http://portal.nobba.com.mx/?res=notyet&uamip=192.168.211.1&uamport=3990&isHttpsProxy=0&called=00-19-BE-2F-19-EA&mac=94-08-53-B7-F1-1E&ip=192.168.121.9&ssid=.%3a%3a%20Wifi%20Rejon%20%3a%3a.&nasid=chilli_radio1_0_nas&sessionid=621eb7f800000002&apmac=00-19-BE-2F-19-EB&sysname=Poste%20Acceso%20%28.1%29&syslocation=28.612590282158955%2c%20-106.12104169180911&timestamp=2022-03-01%2017%3a19%3a07&uampip=10.5.1.1&uampport=8081&userurl=http%3a%2f%2fwww.msftconnecttest.com%2fredirect&md=D9C74711D547B2BCBEE118F194661CD6"; //window.location.href
	var url_string = window.location.href
	var url = new URL(url_string);
	var macAddress = url.searchParams.get("mac");
	alert(macAddress)
	return macAddress;
}

function sendMacAddress(macAddress) {
	$.ajax({
		type: "POST",
		url: "https://api.nobba.com.mx/api/v1/visitors",
		// url: "http://localhost:3000/api/v1/visitors",
		data: {
			macAddress
		},
		
		success: function (msg) {
			console.log('response', msg)
			if (msg == 'OK') {

				chilliController.logon("invitado", "12345");
				window.location.href = 'https://parquemetropolitanotrespresas.com/';

			} 
		},
		error: function () {
			$('#form-message-warning').html("¡Algo salió mal!, por favor intentalo de nuevo más tarde.");
			$('#form-message-warning').fadeIn();
			$submit.prop('value', 'Enviar');
			$submit.prop('disabled', false);
		}
	});
}

// getUrlParams();