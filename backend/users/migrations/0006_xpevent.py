# Generated by Django 3.2.5 on 2021-10-10 00:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_auto_20210811_1829'),
    ]

    operations = [
        migrations.CreateModel(
            name='XPEvent',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_now_add=True)),
                ('amount', models.IntegerField()),
            ],
        ),
    ]
