# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-06 16:15
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('WS16_2012', '0006_auto_20160505_2239'),
    ]

    operations = [
        migrations.RenameField(
            model_name='task',
            old_name='name',
            new_name='subject',
        ),
        migrations.RenameField(
            model_name='taskrevision',
            old_name='name',
            new_name='subject',
        ),
        migrations.AddField(
            model_name='project',
            name='task_id',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='task',
            name='code',
            field=models.CharField(default=123, max_length=30, unique=True),
            preserve_default=False,
        ),
    ]
