# Generated by Django 4.1.3 on 2022-12-12 12:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0003_like_remove_subscription_uniquelike_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='like',
            name='id',
        ),
        migrations.RemoveField(
            model_name='subscription',
            name='id',
        ),
        migrations.AddField(
            model_name='like',
            name='likeID',
            field=models.AutoField(auto_created=True, default=0, primary_key=True, serialize=False),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='subscription',
            name='subID',
            field=models.AutoField(auto_created=True, default=0, primary_key=True, serialize=False),
            preserve_default=False,
        ),
    ]
