with open("example.txt", "w", encoding="utf-8") as file:
    file.write("hello, world!\n")
    file.write("기록중......\n")
    file.write("--끝--")

print("파일을 다 썼어용")

# 파일 읽기
with open("example.txt", "r", encoding="utf-8") as file:
    for line in file:
        print(line)
        # print(line, end="") 밑에 띄어씌기 없이