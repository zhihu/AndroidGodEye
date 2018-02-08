#!/bin/bash
if [ ! -d "local" ]; then
  cp -r src local
fi

if [ ! -d "local/index_local.html" ]; then
  sed "s/requestHost = \"\"/requestHost = \"http:\/\/localhost:5390\"/g" local/index.html > local/index_local.html
fi

adb forward tcp:5390 tcp:5390
open local/index_local.html