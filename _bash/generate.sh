#!/bin/bash

ruby ./_bash/generate.rb $1 action
ruby ./_bash/generate.rb $1 store
ruby ./_bash/generate.rb $1 component

echo "==done"
