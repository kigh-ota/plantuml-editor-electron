#!/bin/sh

rm -f ./plantuml-editor-electron.db
NODE_DATADIR=. node cli.js
if [ ! -e ./plantuml-editor-electron.db ]; then
    exit 1
fi
exit 0

