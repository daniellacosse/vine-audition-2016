dash_class_name = *ARGV
title_class_name = dash_class_name.gsub(/\w+/) { |word| word.capitalize }.gsub("-", "")

def remove_line(filepath, line_ending_with)
  file = File.read(filepath)
  line = file.match(/"^.*#{line_ending_with}"$/m)
  content = file.gsub(line, "")

  File.open(filepath, "wb") { |file| file.write(content) }
end

remove_line("./source/actions/_index.js", "#{title_class_name}Actions")
remove_line("./source/stores/_index.js", "#{title_class_name}Store")
remove_line("./source/components/_index.jsx", "#{title_class_name}")
