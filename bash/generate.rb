dash_class_name, source_file, destination_file = *ARGV
title_class_name = dash_class_name.gsub(/\w+/) { |word| word.capitalize }.gsub("-", "")

File.open(destination_file, "w").write(
   File.read(source_file)
      .gsub("@ClassName@", title_class_name)
      .gsub("@class-name@", dash_class_name)
)

debug_source_file_type = source_file.split("/")[2].split("-")[0].gsub(/\w+/) { |word| word.capitalize }
puts "created: #{title_class_name}#{debug_source_file_type}"
