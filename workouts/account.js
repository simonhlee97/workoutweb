$(function() {
	$.extend(WorkoutLog, {
		account: {
			profiles: [],

			create: function() {

				var prof = {
					name: $("#name").val(), //changed to sldrMiles
					weight: $("#weight").val(),//changed to sldrMinutes
					sex: $("#sex").val(),
					zip: $("#zip").val()
				};
				var postData = { account: prof };
				var accountprofile = $.ajax({
					type: "POST",
					url: WorkoutLog.API_BASE + "account",
					data: JSON.stringify(postData),
					contentType: "application/json"
				});

				accountprofile.done(function(data){
					WorkoutLog.account.profiles.push(data.account);

				});
			}
		}
	});
});

//bindings
$("#saveProfile").on("click", WorkoutLog.account.create);