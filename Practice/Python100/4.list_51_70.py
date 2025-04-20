# 51
movie_rank = ["닥터 스트레인지", "스플릿", "럭키"]

# 52
movie_rank.append("배트맨")
print(movie_rank)

# 53
movie_rank2 = ['닥터 스트레인지', '스플릿', '럭키', '배트맨']
movie_rank2.insert(1,"슈퍼맨")
print(movie_rank2)

# 54
movie_rank = ['닥터 스트레인지', '슈퍼맨', '스플릿', '럭키', '배트맨']
movie_rank.remove("럭키")
print(movie_rank)

# 55
# 55-1
# movie_rank2.remove("스플릿", "배트맨") # remove는 한 개만 지울 수 있음
# movie_rank2.remove("스플릿") 
# movie_rank2.remove("배트맨")
# 55-2
del movie_rank2[2]
del movie_rank2[2]
print(movie_rank2)

# 56
lang1 = ["C", "C++", "JAVA"]
lang2 = ["Python", "Go", "C#"]
langs = lang1 + lang2
print(langs)

# 57
nums = [1, 2, 3, 4, 5, 6, 7]
print(f"max: {max(nums)} min: {min(nums)}")

# 58
print(sum(nums))

# 59
cook = ["피자", "김밥", "만두", "양념치킨", "족발", "피자", "김치만두", "쫄면", "소시지", "라면", "팥빙수", "김치전"]
print(len(cook))

# 60
print(sum(nums)/len(cook))

# 61
price = ['20180'
'728', 100, 130, 140, 150, 160, 170]
print(price[1:])

# 62
nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
print(nums[::2])

# 63
print(nums[1::2])

# 64
nums = [1, 2, 3, 4, 5]
print(nums[::-1])

# 65
interest = ['삼성전자', 'LG전자', 'Naver']
print(interest[0], interest[2])

# 66
interest = ['삼성전자', 'LG전자', 'Naver', 'SK하이닉스', '미래에셋대우']
print(" ".join(interest))

# 67
print("/".join(interest))

# 68
print("\n".join(interest))

# 69
string = "삼성전자/LG전자/Naver"
interest = string.split("/")
print(interest)

# 70
data = [2, 4, 3, 1, 5, 10, 9]
data.sort()
print(data)