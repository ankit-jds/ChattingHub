from django.http import HttpResponse
from django.shortcuts import render

def index(request):
	return HttpResponse("<a href='ChattingApp/'><h2>Chatting App</h2></a><br><a href='admin/'><h2>Admin Panel</h2></a>")