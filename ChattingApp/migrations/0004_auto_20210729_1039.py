# Generated by Django 3.2.3 on 2021-07-29 05:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ChattingApp', '0003_auto_20210729_0842'),
    ]

    operations = [
        migrations.RenameField(
            model_name='chat',
            old_name='participants',
            new_name='chat_participants',
        ),
        migrations.AlterField(
            model_name='chat',
            name='chat_name',
            field=models.CharField(blank=True, max_length=20),
        ),
    ]