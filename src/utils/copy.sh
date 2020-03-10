#!/bin/sh
cd /Users/gulifan/Documents/learn_project/blog-node-project/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log