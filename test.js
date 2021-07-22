window.addEventListener('DOMContentLoaded',function () {
	document.getElementById('type-area').value='';

});

var button=document.getElementsByClassName('send-button');

button[0].addEventListener('click',function () {
	var target=event.target;
	var element=document.getElementsByClassName('chat-display')[0];
	var message=document.getElementById('type-area').value;
	if (message!=""){
		var code=`<div class="message-row typer">
					<div class="message typer">
						<p class="text">${message}
						</p>
						<span class="timestamp">6:55am</span>
					</div>
					<img class="share-button" src="icons/reply.png"></img>
				</div>`;
		element.innerHTML+=code;
		document.getElementById('type-area').value="";
	}
},false);

const menu=document.querySelector('.burger');
const list=document.querySelector('.list');
const chatWindow=document.querySelector('.chat-window');
menu.addEventListener('click',()=>{
	list.classList.toggle('show');
	chatWindow.classList.toggle('hide');

} )
