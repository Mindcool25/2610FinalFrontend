# Generated by Django 4.2.4 on 2023-12-13 18:50

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_image_topic_post_parent_alter_post_id_delete_reply_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='parent',
            field=models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, to='core.post'),
        ),
    ]
