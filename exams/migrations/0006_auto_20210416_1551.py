# Generated by Django 3.1.7 on 2021-04-16 14:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('exams', '0005_auto_20210416_1549'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='wrongAnswer',
            field=models.ManyToManyField(related_name='wrongAnswer', to='exams.Answer'),
        ),
    ]
