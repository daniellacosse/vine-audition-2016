entity_name, entity_type = *ARGV

case entity_type
when "action"
  entity_class_dash = "#{entity_name}-actions"
  filename = "#{entity_class_dash}.js"
when "store"
  entity_class_dash = "#{entity_name}-store"
  filename = "#{entity_class_dash}.js"
when "component"
  entity_class_dash = "#{entity_name}"
  filename = "#{entity_class_dash}.jsx"
else
  entity_class_dash = "#{entity_name}"
  filename = "#{entity_class_dash}.js"
end

entity_name_camel = entity_name.gsub(/\w+/) { |word| word.capitalize }.gsub("-", "")
entity_class_camel = entity_class_dash.gsub(/\w+/) { |word| word.capitalize }.gsub("-", "")

def insert_after(filepath, insert, line_ending_with)
  file = File.read(filepath)
  line = file.match(/^.*#{line_ending_with}$/m).to_s
  content = file.gsub(line, "#{line}\n#{insert}")

  File.open(filepath, "wb") { |file| file.write(content) }
end

def insert(filepath, insert)
  content = insert + "\n" + File.read(filepath)

  File.open(filepath, "wb") { |file| file.write(content) }
end

interpolate = lambda do |filepath|
  File.read(filepath)
    .gsub("@EntityClass@", entity_class_camel)
    .gsub("@EntityName@", entity_name_camel)
    .gsub("@entity-class@", entity_class_dash)
    .gsub("@entity-name@", entity_name)
    .gsub("@entity-type@", entity_type)
    .gsub("@filename@", filename)
end

File.open("./source/#{entity_type}s/#{filename}", "w").write(
   interpolate.call("./_bash/templates/#{entity_type}.template")
)

insert_after(
  "./source/#{entity_type}s/_index.js",
  "  #{entity_class_camel},",
  "export default {"
)

insert(
  "./source/#{entity_type}s/_index.js",
  "import #{entity_class_camel} from \"./#{filename}\""
)

puts "created: #{entity_class_dash}"

File.open("./test/#{entity_type}s/#{entity_class_dash}.spec.js", "w").write(
  interpolate.call("./_bash/templates/test.template")
)

puts "created: #{entity_class_dash} testfile"
