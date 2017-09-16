//meditation timer

$(document).ready(function(){
	var bell = $("#bell")[0];
	var count = parseInt($("#num").html());
	var breakTime = parseInt($("#breakNum").html());


	$("#reset").hide();
	$('#afterBtn').hide();

	$("#start").click(function(){
		var counter= setInterval(timer, 1000);
		count*=60;
		function timer(){
			//hide
			$("#start, #minus5Clock, #add5Clock, #minus5Break,#add5Break,#breakNum, #title1, title2").hide();
			$("#timeType").show();
			$("#timeType").html("Minutes To Enlightenment");
			
			count -=1;
			if(count === 0){
				bell.play();
				clearInterval(counter);
				$("#timeType").html("Enlightenment Achieved");
				$("#num").hide();
				$("#reset").show();
				$('#afterBtn').show();
			}
			if(count%60>=10){
				$("#num").html(Math.floor(count/60) + ":" + count%60);

			}else{
				$("#num").html(Math.floor(count/60) + ":" + "0" + count%60);
			}

			
		}


	});

	$("#reset").click(function(){
		count= 5;
		$("#num").html(count);
		$("#start, #minus5Clock, #add5Clock, #num,#title1, #title2").show();
		$("#timeType, #reset").hide();
	});


	$("#minus5Clock").click(function(){
		if(count>5){
		count -=5;
		$("#num").html(count);
		}
	});


	$("#add5Clock").click(function(){
		count +=5;
		$("#num").html(count);
	});



});