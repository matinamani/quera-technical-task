# Generated by Django 5.1.4 on 2024-12-17 10:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("forms", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="question",
            old_name="question_type",
            new_name="type",
        ),
        migrations.AlterField(
            model_name="answer",
            name="email_ans",
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
        migrations.AlterField(
            model_name="answer",
            name="long_ans",
            field=models.CharField(blank=True, max_length=5000, null=True),
        ),
        migrations.AlterField(
            model_name="answer",
            name="num_ans",
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="answer",
            name="short_ans",
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
