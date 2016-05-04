#!/bin/sh
../manage.py flush
../manage.py migrate
../manage.py shell < initUsers.py
