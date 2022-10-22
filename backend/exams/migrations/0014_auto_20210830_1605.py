# Generated by Django 3.2.5 on 2021-08-30 16:05

from django.db import migrations, models
import exams.models


class Migration(migrations.Migration):

    dependencies = [
        ('exams', '0013_question_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='accepted',
            field=models.BooleanField(default=False, null=True),
        ),
        migrations.AlterField(
            model_name='question',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=exams.utils.rename_image_question),
        ),
    ]
