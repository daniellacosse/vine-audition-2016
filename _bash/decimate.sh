#!/bin/bash
rm  ./source/actions/${1}-actions.js
echo "Deleted ${1} action"

rm  ./source/stores/${1}-store.js
echo "Deleted ${1} store"

rm  ./source/components/${1}.jsx
echo "Deleted ${1} view"

ruby ./_bash/decimate.rb ${1}


rm  ./test/actions/${1}-actions.spec.js
echo "Deleted ${1} action test"

rm  ./test/stores/${1}-store.spec.js
echo "Deleted ${1} store test"

rm  ./test/components/${1}.spec.js
echo "Deleted ${1} view test"

echo "==done"
