#!/bin/bash
cp -rfv ./plugin/* ~/subversion/qr-scanner-redirect/trunk/
cp -rfv ./readme.txt ~/subversion/qr-scanner-redirect/trunk/
cd ~/subversion/qr-scanner-redirect/
svn add --force trunk/*
svn commit