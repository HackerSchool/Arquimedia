# Generated by Django 3.2.5 on 2021-08-11 17:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_xpsystem'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='xp',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='users.xpsystem'),
        ),
    ]