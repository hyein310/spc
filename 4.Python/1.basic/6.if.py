score = 85

if score > 80:
    print("A")
elif score > 70:
    print("B")
elif score > 60:
    print("C")
else:
    print("F")

# pw = input("비밀번호를 입력하세요.")
# # print(type(pw)) str
# if(len(pw) >= 8) :
#     print("정상")
# else:
#     print("비밀번호가 너무 짧습니다.")

filename = "example.txt"

if filename.endswith(".txt"): # 끝 부분을 읽음
    print("텍스트 파일")
elif filename.endswith(".jpg") or filename.endswith(".png"):
    print("이미지 파일")
else:
    print("확장자를 알 수 없습니다.")