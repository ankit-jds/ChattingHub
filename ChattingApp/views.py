from django.http import HttpResponse , JsonResponse
from django.shortcuts import render ,redirect
from django.contrib.auth.models import User
from django.contrib.auth  import authenticate,  login, logout #for login and logout 
from django.contrib import messages
from .models import Chat, Message

# Create your views here.
def index(request):
	# For displaying chatlist from database
	user_list=User.objects.all()
	params={'chat_list':user_list}
	return render(request,"ChattingApp/index.html",params)


def do_login(request):
	if request.method=='POST':
		#Get username and password for login
		login_username=request.POST['lgusername']
		login_password=request.POST['lgpass']

		user=authenticate(username=login_username,password=login_password)

		if user is not None:
			login(request,user)
			messages.success(request,"Successfully Logged In")
			return redirect('ChattingHub')
		else:
			messages.error(request,"Invalid Credentials...")
			return redirect('ChattingHub')
	else:
		return HttpResponse("404 : 3RR0R")

def do_logout(request):
	logout(request)
	messages.success(request,"Successfully Logged Out")
	return redirect("ChattingHub")

def do_signup(request):
	if request.method == 'POST':
		# Get all POST parameters
		print(len(request.FILES.getlist('avatar')))
		if len(request.FILES.getlist('avatar'))!=0:
			avatar=request.FILES['avatar'];
		else:
			avatar=0;
		fname=request.POST['fname']
		lname=request.POST['lname']
		bio=request.POST['bio']
		birthdate=request.POST['birthdate']

		email=request.POST['email']
		username=request.POST['username']
		password=request.POST['password']
		confirm_pass=request.POST['confirm_pass']

		#Checks validation 
		print("printing,",avatar)

		# Create the User
		new_user=User.objects.create_user(username,email,password)
		new_user.first_name=fname
		new_user.last_name=lname
		new_user.save()
		if avatar!=0:
			new_user.profile.usericon=avatar
		if birthdate!="":
			new_user.profile.birth_date=birthdate
		new_user.profile.about_me=bio
		new_user.profile.save()

		messages.success(request,"User is created")
		return redirect('ChattingHub')
	else:
		return HttpResponse('404 : Error')

def openChat(request):
	userid = request.GET.get('userid', None)
	user=request.user
	print(userid)
	list_user=User.objects.get(pk=userid)
	def chat_return(head1,head2):
		chat=Chat.objects.filter(chat_head1=head1,chat_head2=head2)
		if chat:
			return chat[0]
		else:
			chat=Chat.objects.filter(chat_head2=head1,chat_head1=head2)
			if chat:
				return chat[0]
		return 0
	
	userchat=chat_return(list_user,request.user)
	if userchat!=0:
		# print (Message.objects.filter(chat=userchat).order_by('msg_time')[0:10])
		msgs=Message.objects.filter(chat=userchat).order_by('msg_time')
		# add checks if chat contains zero msg
		if bool(msgs) :
			params={"msgs":msgs[0]}
			msglist=[]
			for i in msgs:
				if i.msg_sender==user or i.msg_sender==list_user:
					msg_sender=i.msg_sender.username
					msg_id=i.msg_id
					msg_time=i.msg_time.time().strftime("%H:%M")
					msg_text=i.msg_text
					msg={"sender":msg_sender,"time":msg_time,"text":msg_text,"id":msg_id}
					msglist.append(msg)
			# is_valid is for indicating if msgs are ther are not....
			params={"msgs":msglist,"is_valid":True,"username":user.username,"chat_id":userchat.chat_id}
			return JsonResponse(params)
		else:
			# Chat is already created but has zero msgs...
			# new_chat means chat is created but 0 msgs are there
			return JsonResponse({"alert":"Type msg to start the chat","new_chat":True,"is_valid":False,"chat_id":userchat.chat_id})
	else:
		# Create a new chat....
		new_chat=Chat.objects.create(chat_head1=user,chat_head2=list_user)
		return JsonResponse({"alert":"Chat is initiated, you can send msgs now","is_valid":False,"created_chat":True,"chat_id":new_chat.chat_id})

def postMsg(request):
	chatId=request.GET.get('chatId',None)
	message=request.GET.get('message',None)
	msg_sender=request.user
	print(chatId,message,msg_sender)
	if chatId is not None:
		chat=Chat.objects.get(chat_id=chatId)
		print(chat)
		msg=Message.objects.create(chat=chat,msg_sender=msg_sender,msg_text=message)
		print("new msg",msg)
		msg_sender=msg.msg_sender.username
		msg_id=msg.msg_id
		msg_time=msg.msg_time.time().strftime("%H:%M")
		msg_text=msg.msg_text
		msg={"sender":msg_sender,"time":msg_time,"text":msg_text,"id":msg_id}
		print(msg)
		return JsonResponse({"msg":msg})
	else:
		messages.error(request,"Enter something blank msgs are worthless...")
		return redirect('ChattingHub')

def createChat(request):

	pass

