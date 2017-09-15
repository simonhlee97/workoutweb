$(function() {
	$.extend(WorkoutLog, {
		definition: {
			userDefinitions: [],

			create: function(){
				var runDate = $("#datepicker").val();
				var miles = $("#sldrMiles").val();
				var minutes = $("#sldrMinutes").val();
				var pace = miles / (minutes / 60);
				var calories = miles * 100;

				var def = {
					runDate: runDate,
					miles: miles,
					minutes: minutes,
					pace: pace,
					calories: calories
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
					
					console.log(data.definition.miles);
					$('#calories').html(calories);

					date = data.definition.runDate;

					let newDate = new Date(runDate);
					newDate = newDate.toISOString().slice(0,10)
					$('#date').html(newDate);
					
					$('#pace').html(pace);
					$('a[href="#log"]').tab("show");
				});
			},
			setHistory: function(){
				var history = WorkoutLog.definition.userDefinitions;
				var leng = history.length;
				var dataTable = "";
				

				for (var i=0; i<leng; i++) {
					dataTable += "<tr><td>" + history[i].runDate + "</td><td>" + history[i].miles + "</td><td>" + history[i].minutes + "</td><td>" + history[i].pace + "</td><td>" + history[i].calories + "</td><td>" +
						"<div class='pull-right'>" +
						"<button id='" + history[i].id + "' class='update'><b>U</b></button>" +
						"<button id='" + history[i].id + "' class='remove'><b>X</b></button>" +
					"</div>"
					;
				}
				$("#dataTable").children().remove();
				$("#dataTable").append(dataTable);
			},

			delete: function(){
				
				var thisLog = {
					id: $(this).attr("id")
				};
				var deleteData = { definition: thisLog };
				var deleteLog = $.ajax({
					type: "DELETE",
					url: WorkoutLog.API_BASE + "definition",
					data: JSON.stringify(deleteData),
					contentType: "application/json"
				});

				$(this).closest("tr").remove();

				// deletes item out of workouts array
				for(var i = 0; i < WorkoutLog.definition.userDefinitions.length; i++){
					if(WorkoutLog.definition.userDefinitions[i].id == thisLog.id){
						WorkoutLog.definition.userDefinitions.splice(i, 1);
					}
				}
				deleteLog.fail(function(){
					console.log("nope. you didn't delete it.");
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

	$("#dataTable").delegate('.remove', 'click', WorkoutLog.definition.delete);
	$("#log-update").on("click", WorkoutLog.log.updateWorkout);
	$("#dataTable").delegate('.update', 'click', WorkoutLog.definition.getWorkout);

	//fetch definitions if we already are authenticated and refreshed
	if (window.localStorage.getItem("sessionToken")){
		WorkoutLog.definition.fetchAll();
	}
});

// What does .extend do? It merges objects together.
