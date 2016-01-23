#!/bin/bash

ruby ./bash/generate.rb $1 action
ruby ./bash/generate.rb $1 store
ruby ./bash/generate.rb $1 component

echo "==done"
