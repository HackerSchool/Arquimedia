# Generated by Django 3.2.5 on 2021-08-11 17:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20210427_1902'),
    ]

    operations = [
        migrations.CreateModel(
            name='XPSystem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('xp', models.IntegerField(default=0)),
                ('currentLevel', models.IntegerField(default=0)),
                ('levelXP', models.IntegerField(default=1000)),
            ],
        ),
    ]
