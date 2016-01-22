#!/bin/bash

ruby ./bash/scaffold.rb $1 ./bash/templates/action.template ./app/action/${1}.js
ruby ./bash/scaffold-test.rb ${1}#actions ./test/actions/${1}.spec.js
# insert each to _index

ruby ./bash/scaffold.rb $1 ./bash/templates/store.template ./app/store/${1}.js
ruby ./bash/scaffold-test.rb ${1}#store ./test/stores/${1}.spec.js
# insert each to _index

ruby ./bash/scaffold.rb $1 ./bash/templates/component.template ./app/component/${1}.jsx
ruby ./bash/scaffold-test.rb ${1}#component ./test/components/${1}.spec.js
# insert each to _index

# insert component to src/app


echo "==done"
