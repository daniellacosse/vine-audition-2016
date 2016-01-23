dash_class_name, dash_class_type = *ARGV
title_class_name = dash_class_name.gsub(/\w+/) { |word| word.capitalize }.gsub("-", "")
title_class_type = dash_class_type.gsub(/\w+/) { |word| word.capitalize }.gsub("-", "")

def insert_after(filepath, insert, line_ending_with)
  file = File.read(filepath)
  line = file.match(/"^.*#{line_ending_with}"$/m)
  content = file.gsub(line, "#{line}\n#{insert}\n")

  File.open(filepath, "wb") { |file| file.write(content) }
end

File.open("./source/#{dash_class_type}s/#{dash_class_name}-#{dash_class_type}.js", "w").write(
   File.read("./bash/templates/#{dash_class_type}.template")
      .gsub("@ClassName@", title_class_name)
      .gsub("@class-name@", dash_class_name)
)

insert_after(
  "./source/#{dash_class_type}/_index.js",
  "#{title_class_name}#{title_class_type}",
  "export default {"
)

puts "created: #{dash_class_name} #{dash_class_type}"

File.open("./test/#{dash_class_type}s/#{dash_class_name}-#{dash_class_type}.spec.js", "w").write(
   File.read("./bash/templates/test.template")
     .gsub("@ClassName@", title_class_name)
     .gsub("@class-name@", dash_class_name)
     .gsub("@class-type@", dash_class_type)
)

puts "created: #{dash_class_name} #{dash_class_type} testfile"
