// $(function() {
// 	$.extend(WorkoutLog, {
// 		account: {
// 			profiles: [],

// 			create: function() {

// 				var acct = {
// 					name: $("#name").val(),
// 					weight: $("#weight").val(),
// 					sex: $("#sex").val(),
// 					zip: $("#zip").val()
// 				};
// 				var postData = { account: acct };
// 				var accountprofile = $.ajax({
// 					type: "POST",
// 					url: WorkoutLog.API_BASE + "account",
// 					data: JSON.stringify(postData),
// 					contentType: "application/json"
// 				});

// 				accountprofile.done(function(data){
// 					WorkoutLog.account.profiles.push(data.account);
					

// 				});
// 			}
// 		}
// 	});
// });

// //bindings
// $("#saveProfile").on("click", WorkoutLog.account.create);