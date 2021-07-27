// {% load static %}
window.addEventListener('DOMContentLoaded',prepare());

// prepare function is to prepare webpage after re-load 
// i.e. adding event listeners, and erasing text-area, etc..
function prepare(){
	//This line erases the type area and changes its value to none.
	document.getElementById('type-area').value='';

	//This is to add event listeners to all users iin chatlist...
	var chat_list=document.querySelectorAll('.user');
	for (var i=0 ; i < chat_list.length; i++){
		chat_list[i].addEventListener('click',function(event){
			change_chat(event);
		},false);
	}

	//this is to add event listener to send button...
	var send_button=document.getElementsByClassName('send-button');
	send_button[0].addEventListener('click',function (event) {
		addMsgToChatWindow(event);
	},false);


	//event listener for toggle buttons  
	// i.e.{burger,login_btn,signup_btn}
	$('.toggle').on('click',function(){
		$trget=$(this).attr('data-target');
		element=$(`.${$trget}`);

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

shown=['chat-window'];
hidden=['login','signup','list'];

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
	$burger.show();
	$chat.slideDown();
	shown=['chat-window'];
	hidden=['login','signup','list'];
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
function hide(element){
	//hide the element
	$(`.${element}`).slideUp();

	//add element to hidden if not present
	if(!in_array(hidden,element)){
		hidden.push(element);
	};

	//remove element form shown if it is there
	if (in_array(shown,element)){
		remove_fa(shown,element);
	};

};
//func to hide all elememts
function hide_all(){
	//hide the element
	for (var i = 0; i < shown.length; i++) {
		console.log(shown.length)
		hide(shown[i]);
	}
};



