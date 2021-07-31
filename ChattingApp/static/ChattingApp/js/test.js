// {% load static %}
window.addEventListener('DOMContentLoaded',prepare());

// prepare function is to prepare webpage after re-load 
// i.e. adding event listeners, and erasing text-area, etc..
function prepare(){
	//This line erases the type area and changes its value to none.
	document.getElementById('type-area').value='';

	//this is to reset the forms...
	$('#validate_s').trigger("reset");
	$('#validate_l').trigger("reset");

	// //this is to add event listener to send button...
	// var send_button=document.getElementsByClassName('send-button');
	// send_button[0].addEventListener('click',function (event) {
	// 	addMsgToChatWindow(event);
	// },false);

	reset();
	//event listener for toggle buttons  
	// i.e.{burger,login_btn,signup_btn}
	$('.toggle').on('click',function(){
		$trget=$(this).attr('data-target');
		element=$(`.${$trget}`);
		if($trget=='login' ||$trget=='signup'){
			if (is_shown($(`.${$trget}`))){
				console.log(is_shown($(`.${$trget}`)));
				$('.slide').slideUp();
				$('.flex').slideDown();

			}
			else{
				$('.flex').slideUp();
				$('.slide').slideDown();
			};
		};

		if ($trget!='list'){
			$burger.hide();
		};

		if (is_shown(element)){
			$('section').slideUp();
			normal_view();
		}
		else{
			hide_all();
			show($trget);
		};
	});

};
//event for close button of messages
$('.close').on('click',function(){
	$('.alert').remove()
})

function change_chat(event){
	var element=event.target;
	while(element.tagName!="LI"){
		var parent=element.parentElement;
		var element=parent;
	}
	var username=element.querySelector('.username').textContent;
	var usericon=element.querySelector('.usericon').src;

	const chat_name=document.querySelector('.cn');
	var chat_username=chat_name.querySelector('.username');
	chat_username.textContent=username;
	var chat_usericon=chat_name.querySelector('.usericon');
	chat_usericon.src=usericon;

};


function addMsgToChatWindow(event){
	var element=document.getElementsByClassName('chat-display')[0];
	var message=document.getElementById('type-area').value;
	const msg_timestamp=timestamp();
	//ajax code for to send msg to views so it can update it in database...

	//if stment to prevent blank msg to update into chatwindow
	if (message!=""){
		var code=`<div class="message-row typer">
					<div class="message typer">
						<p class="text">${message}
						</p>
						<p class="timestamp">${msg_timestamp[0]}</p>
					</div>
					<img class="share-button" src="/static/ChattingApp/icons/reply.png" />
				</div>`;
		element.innerHTML+=code;
		document.getElementById('type-area').value="";
	};

};

// For generating timestamp for messages when they are posted....
function timestamp(){
	const msg_datetime=new Date(Date.now());
	const msg_hour=msg_datetime.getHours();
	const msg_mins=msg_datetime.getMinutes();
	if (msg_hour<10){
		var hour="0"+msg_hour;
	}else{
		hour=msg_hour;
	};
	if (msg_mins<10){
		var mins="0"+msg_mins;
	}else{
		mins=msg_mins;
	};
	const msg_timestamp=hour+":"+mins;
	return [msg_timestamp,msg_datetime];
};



const $burger=$('.burger');
const $login=$('.login');
const $signup=$('.signup');
const $chat=$('.chat-window');
const $list=$('.list');
function reset(){
	if(window.innerWidth<956){
		shown=['chat-window'];
		hidden=['login','signup','list'];
	}else{
		shown=['chat-window','list'];
		hidden=['login','signup'];
	};
};

//array function to check if an element is present or not
function in_array(array,element){
	index=array.indexOf(element);
	if (index>-1){
		return true;
	};
	return false;
};
//array function to remove an element
function remove_fa(array,element){
	if(in_array(array,element)){
		index=array.indexOf(element);
		array.splice(index,1);
	};
};
//function to flex the display of an element
function flex_it(element){
	if (element.css('display')!='flex'){
		element.css('display','flex');
	};
};
//func to check if element is hidden or not
function is_shown(element){
	if (element.css('display')!='none'){
		return true;
	};
};
//func to return to normal view
function normal_view(){
	if (window.innerWidth<956){
		$burger.show();
	}else{
		$list.slideDown();
	}
	$chat.slideDown();
	reset();
};
//func to show an element
function show(element){
	//show the element
	$(`.${element}`).slideDown();
	flex_it($(`.${element}`));

	//add element to shown if not present
	if(!in_array(shown,element)){
		shown.push(element);
	};

	//remove element form hidden if it is there
	if (in_array(hidden,element)){
		remove_fa(hidden,element);
	};

};
//func to hide an element
function hide(element,hide_all_bool){
	//hide the element
	$(`.${element}`).slideUp();

	//add element to hidden if not present
	if(!in_array(hidden,element)){
		hidden.push(element);
	};

	//remove element form shown if it is there
	if (hide_all_bool & in_array(shown,element)){
		remove_fa(shown,element);
	};

};
//func to hide all elememts
function hide_all(){
	//hide the element
	for (var i = 0; i < shown.length; i++) {
		console.log(shown.length);
		hide(shown[i]);
	};
	shown=[];
};

//Signup Form
$('#validate_s input:file').change(function(){
	$('#validate_s img.avatar').attr('src',URL.createObjectURL(this.files[0]));
});
$('#validate_s').validate({
	// onfocusout:true,
	// onkeyup:true,
	rules:{
		fname:"required",
		username:"required",

		email:{
			required:true,
			email:true
		},
		password:{
			required:true,
			minlength: 6
		},
		confirm_pass:{
			equalTo:"#password"
		}
		
	},
	messages:{
		fname: "Enter your first name",
		email: "Enter your email",
		username: "Enter your username",
		password: "Enter your password",
		confirm_pass: "Enter same as above",
	},
});
$('#validate_l').validate({
	rules:{
		lgusername:"required",
		lgpass:"required"
		
	},
});
//Sign up form



// url= openChat/
// data= user id of user that is {{i.id}}

$('a.open').on('click',function(e){
	if(window.innerWidth<956){
		$list.slideUp();
		$chat.slideDown();
	}
	e.preventDefault();
	var element=event.target;
	while(element.tagName!="LI"){
		var parent=element.parentElement;
		var element=parent;
	}
	var userid=element.id
	$.ajax({
		url:'Chat/',
		data: {
			'userid': userid
		},
		dataType: 'json',
		success: function (data) {
			if (data["is_valid"]) {
				change_chat(e)
				last_msg_id=data['msgs'][data['msgs'].length-1]["id"]
				if ($(`#msg${last_msg_id}`).length == 0){
					$('.chat-display').html("")
					for (var i = 0; i < data["msgs"].length; i++) {
						code=""
						if (data["msgs"][i]["sender"] == data["username"]){
							code+=`<div class="message-row typer" 
							id='msg${data["msgs"][i]["id"]}'>
						<div class="message typer">`
						}
						else{
							code+=`<div class="message-row" id='msg${data["msgs"][i]["id"]}'>
						<div class="message">`
						};
						code+=`<p class="text">${data["msgs"][i]["text"]}</p>
						<p class="timestamp">${data["msgs"][i]["time"]}</p>
						</div>
						<img class="share-button" src="/static/ChattingApp/icons/reply.png" />
					</div>`

					$('.chat-display').attr('id',data['chat_id']).append(code);
					};
				}else{
					alert("All messages are already loaded...")
				};
			}
			else {
				console.log('elseis working')
				change_chat(e)
				$('.chat-display').attr('id',data['chat_id']).html(' ');
				alert(data["alert"]);
						
			};
			}
		});
});

// 



$('.send-button').on('click',function(){
	var message=$('#type-area').val();
	$('#type-area').val('');
	if (message !=""){
		var chat_id=$('.chat-display').attr('id')
		if (chat_id !=undefined ){
			$.ajax({
				url:'postMsg/',
				data:{
					"chatId":chat_id,
					"message":message
				},
				dataType:'json',
				success:function(data){
					code=`<div class="message-row typer" id='msg${data["msg"]["id"]}'>
							<div class="message typer">
								<p class="text">${data["msg"]["text"]}</p>
								<p class="timestamp">${data["msg"]["time"]}</p>
							</div>
							<img class="share-button" src="/static/ChattingApp/icons/reply.png" />
						</div>`;
			$('.chat-display').append(code);

				}
			});
		}
		else{
			alert("Enter a Chat or Login ")
		};
	}else{
		alert("Enter something Blank msgs are worthless!!")
	};
})
