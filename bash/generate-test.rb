test_entity, destination_file = *ARGV

test_entity = test_entity.slice(0, 1).capitalize + test_entity.slice(1..-1)

File.open(destination_file, "w").write(
   File.read("./templates/test.template")
     .gsub("@ClassName@", test_entity)
)

puts "created: #{test_entity} testfile"
