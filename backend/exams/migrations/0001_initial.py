# Generated by Django 3.1.7 on 2021-04-05 19:07

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Exam',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('score', models.IntegerField(default=0)),
                ('subject', models.CharField(choices=[('Matemática', 'Matemática'), ('Física-Química', 'Física-Química')], max_length=50)),
                ('year', models.IntegerField(choices=[(0, '0'), (10, '10'), (11, '11'), (12, '12')], default=0)),
                ('difficulty', models.CharField(choices=[('Fácil', 'Fácil'), ('Média', 'Média'), ('Difícil', 'Difícil')], max_length=10, null=True)),
            ],
        ),
    ]
