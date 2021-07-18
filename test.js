window.addEventListener('DOMContentLoaded',function () {
	document.getElementById('type-area').value='';

});

console.log(document.onload);
var button=document.getElementsByClassName('send-button');
console.log(button);

button[0].addEventListener('click',function () {
	var target=event.target;
	console.log(target);
	var element=document.getElementsByClassName('chat-display')[0];
	var message=document.getElementById('type-area').value;
	console.log(message);
	var code=`<div class="message-row typer">
				<div class="message typer">
					<p class="message-text">${message}
					</p>
					<span class="timestamp">6:55am</span>
					<img class="reply-button" src="icons/reply.png"></img>
				</div>
			</div>`;
	element.innerHTML+=code;
	document.getElementById('type-area').value="";
	// console.log(text.innerHTML);
},false);
console.log(button);