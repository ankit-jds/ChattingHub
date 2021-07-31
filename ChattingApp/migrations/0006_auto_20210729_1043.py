# Generated by Django 3.2.3 on 2021-07-29 05:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('ChattingApp', '0005_auto_20210729_1043'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chat',
            name='chat_head1',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='User1', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='chat',
            name='chat_head2',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='User2', to=settings.AUTH_USER_MODEL),
        ),
    ]