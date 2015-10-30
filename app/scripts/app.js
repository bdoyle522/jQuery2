$(document).ready(function(){
	
	if(localStorage['listo']){
		var listo = JSON.parse(localStorage['listo']);
		for(var e in listo){
			console.log(listo[e]);
 			if(listo[e].id === 'new'){
 				$('#newList').append('<a href="#finish" class="" id="item"><li class="list-group-item">' + listo[e].task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
 			}
 			else if(listo[e].id === 'inProgress'){
 				$('#currentList').append('<a href="#finish" class="" id="item"><li class="list-group-item">' + listo[e].task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
 			}
 			else{
 				$('#archivedList').append('<a href="#finish" class="" id="item"><li class="list-group-item">' + listo[e].task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
 			}
	} 
	}else {var listo = [];}


	$('#newTaskForm').hide();

	var advanceTask = function(task){
		var modified = task.innerText.trim();
		console.log(listo);
		for(var i in listo){
			if(listo[i].task === modified){
				if(listo[i].id === 'new'){
					listo[i].id = 'inProgress';
					localStorage['listo'] = JSON.stringify(listo);					
				} else if (listo[i].id === 'inProgress'){
					listo[i].id = 'archived';
					localStorage['listo'] = JSON.stringify(listo);
				} else {
					listo.splice(i,1);
					localStorage['listo'] = JSON.stringify(listo);
				}
				break;
			}
		}
		task.remove();
	}

	var Task = function(task){
		this.task = task;
		this.id = 'new';
	};

	var addTask = function(task){
		if(task){
			task = new Task(task);
			listo.push(task);
			localStorage['listo'] = JSON.stringify(listo);
			$('#newItemInput').val('');
			$('#newList').append('<a href="#finish" class="" id="item"><li class="list-group-item">' + task.task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>');
		}
		$('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
	};
	

	$('#saveNewItem').on('click', function(e){
		e.preventDefault();
		var task = $('#newItemInput').val().trim();
		addTask(task);
	});

	//open the form
	$('#newListItem').on('click', function(){
		$('#newTaskForm, #newListItem').fadeToggle('fast','linear');
	});

	//close the form
	$('#cancel').on('click',function (e){
		e.preventDefault();
		$('#newTaskForm, #newListItem').fadeToggle('fast','linear');
	});

	$(document).on('click','#item',function(e){
		e.preventDefault();
		var task = this;
		advanceTask(task);
		this.id = 'inProgress';
		$('#currentList').append(this.outerHTML);
	});

	$(document).on('click','#inProgress', function (e){
		e.preventDefault();
		var task = this;
		task.id = "archived";
		var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
		advanceTask(task);
		$('#archivedList').append(changeIcon);
	});

	$(document).on('click','#archived',function (e){
		e.preventDefault();
		var task = this;
		advanceTask(task);
	});


})

