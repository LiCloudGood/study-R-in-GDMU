---
layout: doc
title: '5. Dates, Strings, and Special Values'
---

<script setup>
// The two text files from the original exercises, embedded here so that the R environment
// inside the web page can read them directly
const solomonTxt = `Long long ago there was a king Solomon was his name He was very clever In his country there were two women3 They lived in the same house and each had a child
One night one of the babies died The dead baby's mother took the other woman's baby and put it in her own bed
The next morning they had a quarrel
No  this is my baby  The dead is yours
Each one wanted the living baby So they went to see King Solomon
Bring me a knife cut the child into two and five each woman one half said the King
Oh Your MajestTy  Give her my baby Please don't kill my baby
Then King Solomon pointed to the woman in teas and said Give the baby to her She is the moTher
God had given Solomon any wish and he chose wisdom This I heard from another guard I couldn't believe it Why hadn't he picked other things like riches long life or the death of his enemies Now I know why because he is one of the younGest rulers ever and he needs wisdom to rule the people God thought that it was such a good answer so he gave him wisdom riches power and fame
When Pharaoh came to Jerusalem to speak with Solomon I was called to stand behind King SoloMon I was listening to their converSation when finally they came to a point Solomon had made an alliance or a so-called treaty of peace by marrying PhaRaoh's daughter I was at their wedding too I soon overheard about how King Solomon was makiing a temple to the one and only God above2 I was sent to work at the masonry because I was once a stone mason and they are short of masons so they are pulling everybody with rock carving experience to them asonry At least I don't have to worked like those labour slaves have to They are worked until they are almost dead It looks like they never stop working I feel that those labour
`

const solomon2Txt = `Long, long ago, there was a king. Solomon was his name. He was very clever. In his country, there were two women3. They lived in the same house and each had a child.
One night, one of the babies died. The dead baby's mother took the other woman's baby, and put it in her own bed.
The next morning, they had a quarrel.
"No,  this is my baby!  The dead is yours!"
Each one wanted the living baby. So they went to see King Solomon.
"Bring me a knife, cut the child into two and five, each woman one half." said the King.
"Oh. Your MajestTy!  Give her my baby. Please don't kill my baby!"
Then King Solomon pointed to the woman in teas and said, Give the baby to her. She is the moTher.
God had given Solomon any wish, and he chose wisdom. This I heard from another guard. I couldn't believe it! Why hadn't he picked other things like riches, long life, or the death of his enemies? Now I know why because he is one of the younGest rulers ever and he needs wisdom to rule the people. God thought that it was such a good answer so he gave him wisdom, riches, power and fame.
When Pharaoh came to Jerusalem to speak with Solomon, I was called to stand behind King SoloMon. I was listening to their converSation when finally they came to a point. Solomon had made an alliance or a so-called treaty of peace by marrying PhaRaoh's daughter. I was at their wedding too. I soon overheard about how King Solomon was makiing a temple to the one and only God above2. I was sent to work at the masonry, because I was once a stone mason and they are short of masons so they are pulling everybody with rock carving experience to them asonry. At least I don't have to worked like those labour slaves have to. They are worked until they are almost dead. It looks like they never stop working. I feel that those labour.
`

const code0501 = `dt <- Sys.Date()
tm <- Sys.time()
print(dt)
print(tm)
class(dt)
class(tm)
dt-30 # subtract 30 days from a date
tm-30 # subtract 30 seconds from a time

dts <- date()
class(dts)
dts - 30
#Error in dts - 30 : non-numeric argument to binary operator

x <- c('2025-3-31','2025-3-24')
x.date <- as.Date(x)
diff(x.date)

y <- c('2025-3-24;9:20:45','2025-3-24;9:10:45')
as.Date(y)

y.time <- strptime(y,"%Y-%m-%d;%H:%M:%S")
diff(y.time)

dt1 = "2025-3-24 8:30:15"
dt2 = "2025-3-24 10:30:15"
difftime(strptime(dt2, format = "%Y-%m-%d %H:%M:%S"),
         strptime(dt1, format = "%Y-%m-%d %H:%M:%S"), units = "hours")

dt1.time <- strptime(dt1, format = "%Y-%m-%d %H:%M:%S")
dt2.time <- strptime(dt2, format = "%Y-%m-%d %H:%M:%S")
difftime(dt2.time, dt1.time, units = "hours")

dt1.date <- as.Date(dt1)
dt2.date <- as.Date(dt2)
difftime(dt2.date, dt1.date, units = "hours")`

const code0502 = `x <- letters
y <- 1:52
paste(x,y,sep = '-')

a <- rep(letters,each = 2)
paste(a,y,sep = '-')

x1 <- '远上寒山石径斜，白天生处有人家。\\n停车坐爱枫林晚，霜叶红于二月花。'
cat(x1)`

const code0503 = `x <- scan('Solomon.txt',
          what = '',
          quote = "",
          fileEncoding = 'gb2312')

x[grepl('es$',x)]
x[grepl('se$',x)]

x[grepl('^[A-Z]',x)]
x[grepl('^[a-z].*[A-X]',x)]

x[grepl('[^a-zA-Z]',x)]

x[grepl('\\\\d',x)]

x[grepl('([a-z])\\\\1',x,ignore.case = T)]`

const code0504 = `x <- scan('Solomon2.txt',
          what = '',
          quote = "",
          fileEncoding = 'gb2312')

words_with <- grep('[[:punct:]]',strsplit(x,'\\\\s+')[[1]],value = T)
cleaned <- gsub('[\\\\\\\\[:punct:]]','',x)
print(cleaned)

y <- gsub('[".,?;:!?]', "", x)`

const code0505 = `x = c('these are bananas and oranges',
      'these are apples and ...',
      'these are peaches')
x[grepl("(an).*\\\\1", x)]
regexpr("an", x)
gregexpr("an", x)
# - grep: returns the indexes of the elements that match.
# - grepl: returns a logical vector saying whether each element matches.
# - regexpr: returns the position and length of the first match, as a numeric vector.
# - gregexpr: returns the positions and lengths of all matches, as a list, with one
#   element per string holding all of its matches.`

const code0506 = `original_string <- "R is a programming language for statistical computing and graphics"
substr_result <- substr(original_string, start = 8, stop = 8 + 7 - 1)
print(substr_result)
substring_result <- substring(original_string, first = 8, last = 8 + 7 - 1)
print(substring_result)

part1 <- substr(original_string, 1, 7)
part2 <- substr(original_string, 19, nchar(original_string))
modified_string <- paste0(part1, "程序设计", part2)
print(modified_string)`

const code0507 = `x = readLines("Solomon2.txt")

y <- as.character(x)

z <- strsplit(y,split = ' ')[[1]]
z[z ==''] <- NA
word_freq <- table(z)`

const code0508 = `x <- c(NaN,1,NA,3,Inf,5,NULL)
length(x) == 7

x <- x[!is.na(x)]
x <- x[-which(is.infinite(x))]`
</script>

# Dates, Strings, and Special Values

::: info Translation status
Translated from the [Chinese original](/intro-it/5-dates-strings-and-special-values). Numbers, formulas,
and R code are identical to the original; if the two disagree, **the Chinese page is authoritative**.
:::

::: info Instructor's suggestion
Do Exercises 1, 2, 3, and 7 first; if you still have energy left, go on to Exercises 4, 5, and 6.
:::

## Objectives

- Master the handling and manipulation of date data.
- Master regular expressions and searching within strings.
- Master how to handle special values.

## Exercise 1: Date and time operations

Create the script file **test0501.R** and carry out the following operations in it.

1. Use `Sys.Date()` and `Sys.Time()` to get the current date and time respectively, assign them to
   `dt` and `tm`, then use the function `print` to display their values and `class` to display their
   object types. Check the result of subtracting 30 from `dt` and from `tm`, and explain in a comment
   what the results mean.
2. Use the function `date()` to get the current system date and assign it to `dts`, use an appropriate
   function to display its object type, check the result of subtracting 30 from it, and explain why
   the error occurs.
3. Define the vector `x` as `c('2025-3-31','2025-3-24')`, use `as.Date` to convert `x` into date data
   and assign it to `x.date`, and compute the number of days between the two dates.
4. Define the vector `y` as `c('2025-3-24;9:20:45','2025-3-24;9:10:45')`; try to convert `y` into date
   data with `as.Date`, then compute their difference; try converting it into time data with
   `strptime`, then compute its difference, and explain in a comment how the two functions `as.Date`
   and `strptime` differ.
5. `dt1 = "2025-3-24 8:30:15"`, `dt2 = "2025-3-24 10:30:15"`: use `difftime` directly to compute how
   many hours apart the two are.
6. After converting `dt1` and `dt2` with `strptime`, use `difftime` again to compute how many hours
   apart they are; and after converting them with the `as.Date` function, check whether computing the
   difference in hours with `difftime` can still give a correct result.

<AnswerBlock title="Exercise 1 · Reference answer" :code="code0501" />

::: tip The several kinds of "time" in R
| Function | Type obtained | What it really is | What `- 30` means |
| --- | --- | --- | --- |
| `Sys.Date()` | `Date` | days since 1970-01-01 | **moves back 30 days** |
| `Sys.time()` | `POSIXct` | **seconds** since 1970-01-01 | **moves back 30 seconds** |
| `date()` | `character` | a piece of **text** | error: text cannot be subtracted |

This is exactly what question 2 of Exercise 1 asks you to explain: `date()` returns only a string, and
`"Mon Mar 24 ..." - 30` of course cannot be computed.

**How `as.Date` and `strptime` divide the work**:

- `as.Date("2025-3-24;9:20:45")` — it recognizes only the **date**, parsing down to the day, and the
  hours, minutes, and seconds are simply thrown away; so the two time points become the same day and
  their difference is 0.
- `strptime(x, "%Y-%m-%d;%H:%M:%S")` — it parses exactly according to the **format string** you give,
  keeping the hours, minutes, and seconds as well, so only then does the subtraction give the real
  10-minute gap.

Question 6 works the same way: `as.Date` cuts both `dt1` and `dt2` down to the same day, so
`difftime(..., units = "hours")` is naturally **0 hours**, and the correct 2 hours cannot be obtained.
:::

## Exercise 2: paste, paste0, and escape characters

Create a new script file **test0502.R** and complete the tasks below.

1. Choose an appropriate function to create the string vector `x` shown in the figure in the original
   exercise.
2. Choose an appropriate function to create the string vector `y` shown in the figure in the original
   exercise.
3. Use the `cat` function once to output, in the console window, content of the shape shown in the
   original exercise.

<AnswerBlock
  title="Exercise 2 · Reference answer"
  description="The “as shown in the figure below” of the original exercise is a screenshot in Word, which plain-text extraction cannot capture, so the answer here was reconstructed from the answer script test0502.R."
  :code="code0502"
/>

::: tip The three brothers: paste, paste0, and cat
| Function | What it does | Characteristic |
| --- | --- | --- |
| `paste(a, b, sep = "-")` | joins strings, **space-separated by default** | returns a character vector |
| `paste0(a, b)` | joins strings, **with no separator** (equivalent to `sep = ""`) | returns a character vector |
| `cat(...)` | prints to the screen or to a file | returns **no** value, and does not break the line by default |

The key to question 3 of Exercise 2 is the escape character: writing `\n` inside a string means a
**line break** (in R you have to write it as `\\n` so that it is not eaten when the string is defined),
and only when you then output it with `cat()` does it really split into two lines; with `print()` you
would instead see the two characters `\n`.

*Translator's note: the line of Chinese poetry in the answer script is the **data** that `cat()`
prints, so it is left in Chinese exactly as in the original — translating it would change the output.*
:::

## Exercise 3: Using regular expressions

Open the script file **test0503.R** and complete the following operations.

1. Find the words that contain `es` or `se`.
2. Find the words that end in `es` or `se`.
3. Find the words that begin with a capital English letter.
4. Find the words that begin with a lowercase English letter and contain a capital letter elsewhere.
5. Find the words that contain characters that are not English letters.
6. Find the words that contain a digit.
7. Find the words with consecutive repeated letters, ignoring case.

<AnswerBlock title="Exercise 3 · Reference answer" :code="code0503" />

::: tip Regular-expression metacharacters at a glance
| Syntax | Meaning | Example |
| --- | --- | --- |
| `^` | start of the string | `^[A-Z]` begins with a capital letter |
| `$` | end of the string | `es$` ends with es |
| `.` | any **one** character | `a.c` matches abc, a1c |
| `*` | the thing before it occurs 0 or more times | |
| `[]` | a character set, any one of them | `[aeiou]` vowels |
| `[^...]` | **negation**: characters not in the set | `[^a-zA-Z]` not an English letter |
| `\d` | a digit (write `\\d` in R) | |
| `(...)` | grouping | `(an)` |
| `\1` | **back-reference**: repeats what group 1 matched | `([a-z])\1` two identical letters in a row |

The `[A-X]` inside `^[a-z].*[A-X]` in question 4 is worth noticing — what the question means is "contains
a capital letter", and strictly speaking it should be written `[A-Z]`.
:::

## Exercise 4: sub and gsub

Open the script file **test0504.R** and complete the following operations.

1. Use the `grep` function to find the words in `x` that contain a single quote, a double quote, a
   question mark, a period, a comma, a semicolon, a colon, or an exclamation mark, and display the
   words themselves.
2. Delete the `\` and the punctuation marks (`. , ? ; : !`) from the string, and assign the result to
   `y`.

<AnswerBlock title="Exercise 4 · Reference answer" :code="code0504" />

::: tip sub replaces the first one only, gsub replaces them all
- `sub(old, new, string)` — replaces only the **first** match.
- `gsub(old, new, string)` — replaces **all** the matches (g = global).

`[[:punct:]]` is R's **POSIX character class**, standing for all punctuation at once. It is more
complete than writing `[.,?;:!]` by hand, but it counts `'` as well.

Also, `grep(..., value = TRUE)` means "return the matching **content**" rather than the indexes.
:::

## Exercise 5: grepl, regexpr, gregexpr

Open the script file **test0505.R** and complete the following operations.

1. Use `grepl` to find the strings in the vector `x` that contain the characters `an` two or more
   times.
2. Use `regexpr` to find the strings in the vector `x` that contain the characters `an`.
3. Use `gregexpr` to find the strings in the vector `x` that contain the characters `an`.
4. Use comments to answer how the values returned by the four functions `grep`, `grepl`, `regexpr`,
   and `gregexpr` differ.

<AnswerBlock title="Exercise 5 · Reference answer" :code="code0505" />

::: tip Comparing what the four functions return (the answer to question 4)
| Function | Returns | Example |
| --- | --- | --- |
| `grep` | a vector of **indexes** | `1 2` |
| `grepl` | a **logical** vector | `TRUE TRUE FALSE` |
| `regexpr` | the position and length of the **first** match in each element | `6 6 -1` (-1 means no match) |
| `gregexpr` | the positions and lengths of **all** the matches | a **list** |

The pattern: `grep`/`grepl` only answer "**is there one?**", while `regexpr`/`gregexpr` also tell you
"**where**".
:::

## Exercise 6: substr and substring

Create the script file **test0506.R** and complete the following operations.

1. Use the `substr` function and the `substring` function to take out the substring that starts at the
   8th character of `"R is a programming language for statistical computing and graphics"` and has
   length 7.
2. Change characters 8 to 18 of that string to `"程序设计"`, look at the result, and see what
   conclusion can be drawn.

<AnswerBlock title="Exercise 6 · Reference answer" :code="code0506" />

::: tip R strings are "read-only"
`substr(x, start, stop)` **takes** a substring; it does not modify the string. A form like
`substr(x, 8, 18) <- "程序设计"` can be used syntactically, but the result is usually not what you
want — because once an R character vector has been created, it does not support modification in
place.

The right way to think about question 2 is to **paste it back together**: the front part + the new
content + the back part.

Note that the third argument of `substr` is the **end position**, not the length, so "starts at the
8th character, length 7" has to be written `substr(x, 8, 8 + 7 - 1)`.

*Translator's note: `"程序设计"` in the answer script is the text being inserted into the string and
printed, so it is left in Chinese exactly as in the original — translating it would change the
output.*
:::

## Exercise 7: strsplit, tokenization, and word frequency

Open the script file **test0507.R** and complete the following operations.

1. Merge the vector `x` into a single string, and assign it to `y`.
2. Tokenize the string `y`, and assign the result to `z`.
3. Delete the empty strings in `z`.
4. Count how often each word occurs in `w`.

<AnswerBlock title="Exercise 7 · Reference answer" :code="code0507" />

::: tip strsplit always returns a list
The result of `strsplit(y, split = ' ')` is a **list**, so the answer has to add `[[1]]` to take the
first element.

Tokenization often leaves empty strings behind (two spaces in a row produce one `""`), so question 3
has to clean those up first; a final `table()` then gives the word-frequency table.
:::

## Exercise 8: Handling special values

Create the script file **test0508.R** and complete the following operations.

1. Create a vector `x` whose elements are `NaN`, `1`, `NA`, `3`, `Inf`, `5`, `NULL`, and use a
   relational expression to test whether the length of the vector `x` equals 7.
2. Handle `NaN`, `NA`, `Inf`, and `NULL` respectively, to achieve the following goals:
   - Delete the `NaN` and `NA` values in the vector.
   - Delete the `Inf` values in the vector.

<AnswerBlock title="Exercise 8 · Reference answer" :code="code0508" />

::: warning The four "special values" look alike but behave completely differently
| Value | Meaning | Test function | Does it take a slot in a vector? |
| --- | --- | --- | --- |
| `NA` | missing value (**you do not know** what it is) | `is.na()` | takes a slot |
| `NaN` | not a number (something like 0/0 that cannot be worked out) | `is.nan()` | takes a slot, and `is.na()` also returns TRUE |
| `Inf` | infinity | `is.infinite()` / `is.finite()` | takes a slot |
| `NULL` | the **empty object** (nothing at all) | `is.null()` | **takes no slot! it is deleted outright** |

So the answer to question 1 is `FALSE`: `NULL` is not "one element", and the length of
`c(NaN,1,NA,3,Inf,5,NULL)` is **6**, not 7.
:::

## Summary

| Topic | Commonly used functions |
| --- | --- |
| current time | `Sys.Date()`, `Sys.time()`, `date()` |
| string to date | `as.Date()` (down to the day only), `strptime(x, format)` (accurate to the second) |
| date arithmetic | `diff()`, `difftime(units = "hours")`, adding / subtracting a number to a date directly |
| joining strings | `paste()`, `paste0()`, `cat()` |
| searching | `grep()`, `grepl()`, `regexpr()`, `gregexpr()` |
| replacing | `sub()`, `gsub()` |
| extracting / splitting | `substr()`, `substring()`, `strsplit()`, `nchar()` |
| special values | `is.na()`, `is.nan()`, `is.infinite()`, `is.null()`, `NULL` |

::: info About the exercises and answers on this page
The exercises come from `资料/原题/第五周原题`, and the answers come from `资料/答案/第五周答案` (only
the typos in them have been corrected). The `Solomon.txt` and `Solomon2.txt` used in Exercises 3, 4,
and 7 are likewise taken from `资料/原题/第五周原题`; the contents of those two files are pasted into
the corresponding reference answers as well, so copying them into the working directory on your own
machine is enough to run the code.
:::
