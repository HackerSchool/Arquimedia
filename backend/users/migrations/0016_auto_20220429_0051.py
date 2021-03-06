# Generated by Django 3.2.5 on 2022-04-29 00:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0015_profile_email_confirmation_code'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='last_activity',
            field=models.DateField(auto_now=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='streak',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='achievement',
            name='subject',
            field=models.CharField(choices=[('Matemática', 'Matemática'), ('Fisico-Química', 'Fisico-Química')], default='Geral', max_length=50),
        ),
        migrations.AlterField(
            model_name='subjectinfo',
            name='subject',
            field=models.CharField(choices=[('Matemática', 'Matemática'), ('Fisico-Química', 'Fisico-Química')], max_length=50),
        ),
    ]
