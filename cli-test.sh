#!/bin/sh

rm -f ./ts-electron.db
NODE_DATADIR=. node cli.js
if [ ! -e ./ts-electron.db ]; then
    exit 1
fi
exit 0

