#!/bin/bash
rm  ./app/actions/${1}.js
echo "Deleted ${1} action"

rm  ./app/stores/${1}.js
echo "Deleted ${1} store"

rm  ./app/components/${1}.jsx
echo "Deleted ${1} view"


rm  ./test/actions/${1}.spec.js
echo "Deleted ${1} action test"

rm  ./test/stores/${1}.spec.js
echo "Deleted ${1} store test"

rm  ./app/components/${1}.spec.js
echo "Deleted ${1} view test"

echo "==done"
