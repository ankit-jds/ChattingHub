from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
class Profile(models.Model):
	user=models.OneToOneField(User,on_delete=models.CASCADE)
	about_me=models.TextField(max_length=500,default="My name is ")
	birth_date=models.DateField(max_length=12,default='2001-01-01')
	usericon=models.ImageField(upload_to="usericon_images/",default="usericon_images/user1.svg")

	@receiver(post_save,sender=User)
	def create_user_profile(sender, instance, created, **kwargs):
		if created:
			Profile.objects.create(user=instance)

	@receiver(post_save,sender=User)
	def save_user_profile(sender, instance, **kwargs):
		instance.profile.save()



class Chat(models.Model):
	chat_id=models.AutoField(primary_key=True)
	# # chat_participants=models.JSON
	# # participants will help me in ""group chats""
	# # will create group chat in future too 
	# # maybe in future I will use this...
	chat_name=models.CharField(max_length=20,blank=True)
	# chat_participants=models.ManyToManyField(User)
	chat_head1=models.ForeignKey(User,on_delete=models.CASCADE,related_name="User1")
	chat_head2=models.ForeignKey(User,on_delete=models.CASCADE,related_name="User2")

	def __str__(self):
		if self.chat_name=="":
			return (str(self.chat_id))
		return (self.chat_name)

class Message(models.Model):
	msg_id=models.AutoField(primary_key=True)
	chat=models.ForeignKey(Chat,on_delete=models.CASCADE)
	msg_sender=models.ForeignKey(User,on_delete=models.CASCADE)
	msg_text=models.CharField(max_length=5000,default="This is a test message...")
	msg_time=models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return(self.msg_text[0:33]+" by "+self.msg_sender.username)



