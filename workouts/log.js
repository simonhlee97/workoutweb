$(function() {
	$.extend(WorkoutLog, {
		log: {
			workouts: [],

			setDefinitions: function() {
				var defs = WorkoutLog.definition.userDefinitions;
				var len = defs.length;
				var opts;
				for (var i = 0; i < len; i++) {
					opts += "<option value='" + defs[i].miles +"'>" + defs[i].minutes + "</option>";
				}
				$("#log-definition").children().remove();
				$("#log-definition").append(opts);
			},
		

			create: function() {
				var itsLog = { 
					note: $("#notes").val(),
		        	// calories: $("#log-description").val(),
		         // 	miles: $("#log-result").val(),
		         // 	minutes: $("#log-definition option:selected").text()
		      	};
		      	var postData = { log: itsLog };
		      	var logger = $.ajax({
		         	type: "POST",
		         	url: WorkoutLog.API_BASE + "log",
		         	data: JSON.stringify(postData),
		         	contentType: "application/json"
		      	});

		      	logger.done(function(data) {
	      			WorkoutLog.log.workouts.push(data);
	      			$("#notes").val("");
					
					$('a[href="#history"]').tab("show");
		      	});
			},

			getWorkout: function() {
				var thisLog = {id: $(this).attr("id")};
				console.log(thisLog);
				logID = thisLog.id;
				var updateData = { log: thisLog };
				var getLog = $.ajax({
					type: "GET",
					url: WorkoutLog.API_BASE + "log/" + logID,
					data: JSON.stringify(updateData),
					contentType: "application/json"
				});
				getLog.done(function(data){
					
				    $('a[href="#update-log"]').tab("show");
					$('#update-result').val(data.result);
					$('#update-description').val(data.description);
					$('#update-id').val(data.id);
				});

			},

			updateWorkout: function() {
				$("#update").text("Update");
				var updateLog = { 
					id: $('#update-id').val(),
					desc: $("#update-description").val(),
						result: $("#update-result").val(),
						def: $("#update-definition option:selected").text()
				};
				for(var i = 0; i < WorkoutLog.log.workouts.length; i++){
					if(WorkoutLog.log.workouts[i].id == updateLog.id){
						WorkoutLog.log.workouts.splice(i, 1);
					}
				}
				WorkoutLog.log.workouts.push(updateLog);
				var updateLogData = { log: updateLog };
				var updater = $.ajax({
						type: "PUT",
						url: WorkoutLog.API_BASE + "log",
						data: JSON.stringify(updateLogData),
						contentType: "application/json"
				});

				updater.done(function(data) {
					console.log(data);
					$("#update-description").val("");
					$("#update-result").val("");
					$('a[href="#history"]').tab("show");
				});
			},


			delete: function(){
				var thisLog = {
					// "this" is the button on the li
			//.attr("id") targets the value of the id attribute of button
					id: $(this).attr("id")
				};
				var deleteData = { log: thisLog };
				var deleteLog = $.ajax({
					type: "DELETE",
					url: WorkoutLog.API_BASE + "log",
					data: JSON.stringify(deleteData),
					contentType: "application/json"
				});

				// removes list item
				// references button then grabs closest li
				$(this).closest("li").remove();

				// deletes item out of workouts array
				for(var i = 0; i < WorkoutLog.log.workouts.length; i++){
					if(WorkoutLog.log.workouts[i].id == thisLog.id){
						WorkoutLog.log.workouts.splice(i, 1);
					}
				}
				deleteLog.fail(function(){
					console.log("nope. you didn't delete it.");
				});
			},

			// history
			fetchAll: function() {
				var fetchDefs = $.ajax({
			         type: "GET",
			         url: WorkoutLog.API_BASE + "log",
			         headers: {
			         	"authorization": window.localStorage.getItem("sessionToken")
			         }
			      })
			      .done(function(data) {
			         WorkoutLog.log.workouts = data;
			      })
			      .fail(function(err) {
			         console.log(err);
			      });
			}
		}
	});

	$("#log-save").on("click", WorkoutLog.log.create);
	$("#history-list").delegate('.remove', 'click', WorkoutLog.log.delete);
	$("#log-update").on("click", WorkoutLog.log.updateWorkout);
	$("#history-list").delegate('.update', 'click', WorkoutLog.log.getWorkout);


	   // fetch history if we already are authenticated and refreshed
   if (window.localStorage.getItem("sessionToken")) {
      WorkoutLog.log.fetchAll();
   }
});