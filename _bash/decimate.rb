dash_class_name = ARGV[0]
title_class_name = dash_class_name.gsub(/\w+/) { |word| word.capitalize }.gsub("-", "")

def remove_line(filepath, line_ending_with)
  file = File.read(filepath)
  content = file.gsub("\n  #{line_ending_with}", "")

  File.open(filepath, "wb") { |file| file.write(content) }
end

remove_line("./source/actions/_index.js", "#{title_class_name}Actions,")
remove_line("./source/stores/_index.js", "#{title_class_name}Store,")
remove_line("./source/components/_index.js", "#{title_class_name},")
