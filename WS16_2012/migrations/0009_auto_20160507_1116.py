# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-07 11:16
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('WS16_2012', '0008_auto_20160507_1115'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='date_finished',
            field=models.DateField(null=True),
        ),
    ]