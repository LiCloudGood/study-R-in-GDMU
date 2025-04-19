x = c('these are bananas and oranges',
      'these are apples and ...',
      'these are peaches')
x[grepl("(an).*\\1", x)]
regexpr("an", x)
gregexpr("an", x)
# - grep：返回匹配的元素的索引。
# - grepl：返回逻辑向量，表示每个元素是否匹配。
# - regexpr：返回第一个匹配项的位置和长度，结果是一个数值向量。
# - gregexpr：返回所有匹配项的位置和长度，结果是一个列表，每个元素对应一个字符串的所有匹配项。