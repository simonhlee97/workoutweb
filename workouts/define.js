$(function() {
	$.extend(WorkoutLog, {
		definition: {
			userDefinitions: [],

			create: function(){
				var def = {
					miles: $("#sldrMiles").val(), //changed to sldrMiles
					minutes: $("#sldrMinutes").val(),//changed to sldrMinutes
					runDate: $("#datepicker").val()
				};
				var postData = { definition: def };
				var define = $.ajax({
					type: "POST",
					url: WorkoutLog.API_BASE + "definition",
					data: JSON.stringify(postData),
					contentType: "application/json"
				});

				define.done(function(data){
					WorkoutLog.definition.userDefinitions.push(data.definition);
					
					var calBurned = data.definition.miles * 100; // changed logType to miles
					console.log(data.definition.miles);  // changed logType to miles
					$('#calories').html(calBurned);
					var date = data.definition.runDate;
					console.log(date);
					$('#date').html(date);
					$('a[href="#log"]').tab("show");
				});
			},

			fetchAll: function(){
				var fetchDefs = $.ajax({
					type: "GET",
					url: WorkoutLog.API_BASE + "definition",
					headers: {
						"authorization": window.localStorage.getItem("sessionToken")
					}
				})
				.done(function(data){
					WorkoutLog.definition.userDefinitions = data;
				})
				.fail(function(err){
					console.log(err);
				});
			}
		}
	});
	//bindings
		$("#def-save").on("click", WorkoutLog.definition.create);

	//fetch definitions if we already are authenticated and refreshed
	if (window.localStorage.getItem("sessionToken")){
		WorkoutLog.definition.fetchAll();
	}
});

// What does .extend do? It merges objects together.
