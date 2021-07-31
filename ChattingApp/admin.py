from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

#Read the docs at following page to extend the user model  
# https://docs.djangoproject.com/en/3.2/topics/auth/customizing/#extending-user

from .models import Chat, Message, Profile
# Register your models here.
class ProfileInline(admin.StackedInline):
	model=Profile
	can_delete=False
	verbose_plural_name='profile'

class UserAdmin(BaseUserAdmin):
	inlines=(ProfileInline,)


admin.site.unregister(User)
admin.site.register(User,UserAdmin)
admin.site.register(Chat)
admin.site.register(Message)
