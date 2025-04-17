# 리스트 컴프리헨션
# [표현식 for 항목 in 리스트객체 if 조건문]

# 1부터 10까지의 숫자 리스트를 만들기
nums = [x for x in range(1,11)]
print("1번 result: ", nums)

# 1부터 20까지의 짝수들로 이루어진 리스트를 만들기
even_nums = [x for x in range(1,11) if(x%2 == 0)]
print("2번 result: ", even_nums)

# 각 문자열을 분리하여 대문자로 변한된 리스트를 만들기
word = "hello"
upper_letters= [word for word in range(len(word))]
print("3번 result: ", upper_letters) # 기대 결과 ["H","E","L","L","O"]

# 글자의 길이가 3글자 이하인 단어만 남기기
word = ["apple","banana","cherry","egg","grapes"]
# short_words = [for i in range 5 if(len(word[x]) <= 3) print word[x]]
# print("4번 result: ", short_words)
