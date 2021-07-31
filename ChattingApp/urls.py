from django.urls import path
from . import views

urlpatterns=[
	path("", views.index, name="ChattingHub"),
	path("login/",views.do_login,name="login"),
	path("logout/",views.do_logout,name="logout"),
	path("signup/",views.do_signup,name="do_signup"),
	path("Chat/",views.openChat,name="openChat"),
	path("postMsg/",views.postMsg,name="postMsg"),
]