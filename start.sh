#!/bin/sh
http-server dist/libroteca-frontend/browser -p ${PORT:-8080} -a 0.0.0.0 -c-1
