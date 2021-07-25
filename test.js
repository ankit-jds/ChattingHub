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

	// For Orange burger menu toggling....
	const menu=document.querySelector('.burger');
	const list=document.querySelector('.list');
	const chatWindow=document.querySelector('.chat-window');
	//the arrow style of function is new type to declare functions
	menu.addEventListener('click',()=>{
		//toggle helps to add and remove class when event occurs
		list.classList.toggle('show');
		chatWindow.classList.toggle('hide');
	} 
	)
}

function change_chat(event){
	var element=event.target;
	while(element.tagName!="LI"){
		var parent=element.parentElement;
		var element=parent;
	}
	var username=element.querySelector('.username').textContent;
	var usericon=element.querySelector('.usericon').src;

	const chat_name=document.querySelector('.chat-name');
	var chat_username=chat_name.querySelector('.username');
	chat_username.textContent=username;
	var chat_usericon=chat_name.querySelector('.usericon');
	chat_usericon.src=usericon;
}

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
	}
}

// For generating timestamp for messages when they are posted....
function timestamp(){
	const msg_datetime=new Date(Date.now());
	const msg_hour=msg_datetime.getHours();
	const msg_mins=msg_datetime.getMinutes();
	if (msg_hour<10){
		var hour="0"+msg_hour;
	}else{
		hour=msg_hour;
	}
	if (msg_mins<10){
		var mins="0"+msg_mins;
	}else{
		mins=msg_mins;
	}
	const msg_timestamp=hour+":"+mins;
	return [msg_timestamp,msg_datetime];
}


