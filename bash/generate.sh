#!/bin/bash

ruby ./bash/generate.rb $1 ./bash/templates/action.template ./source/actions/${1}-actions.js
ruby ./bash/generate-test.rb ${1}Actions ./test/actions/${1}-actions.spec.js
# TODO: insert each to _index

ruby ./bash/generate.rb $1 ./bash/templates/store.template ./source/stores/${1}-store.js
ruby ./bash/generate-test.rb ${1}Store ./test/stores/${1}-store.spec.js
# TODO: insert each to _index

ruby ./bash/generate.rb $1 ./bash/templates/component.template ./source/components/${1}.jsx
ruby ./bash/generate-test.rb ${1}Component ./test/components/${1}.spec.js
# TODO: insert each to _index

# TODO: insert component to source/app
echo "==done"
