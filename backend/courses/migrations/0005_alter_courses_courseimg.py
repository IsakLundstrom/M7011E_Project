# Generated by Django 4.1.3 on 2022-12-13 08:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0004_remove_like_id_remove_subscription_id_like_likeid_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='courses',
            name='courseIMG',
            field=models.ImageField(upload_to='courses'),
        ),
    ]