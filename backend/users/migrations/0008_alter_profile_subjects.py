# Generated by Django 3.2.5 on 2021-10-10 01:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_xpevent_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='subjects',
            field=models.ManyToManyField(related_name='profile', to='users.SubjectInfo'),
        ),
    ]
