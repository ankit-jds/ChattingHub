"""ChattingHub URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include #include for linking app views.py
from django.conf import settings #for include static and media files:)
from django.conf.urls.static import static #For static files
from . import views #for views.py

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
	path('ChattingApp/', include('ChattingApp.urls'))
]+ static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
