import os

# 현재 로그인한 사용자 계정 출력(윈도우, 리눅스 가능)
print(os.getlogin())

current_dir = os.getcwd()
print("현재 작업 디렉토리 : ", current_dir)

new_dir = "new_direc"
# os.mkdir(new_dir) 생성
# os.rmdir(new_dir) 삭제
# 생성 및 삭제 가능하지만 중복으로는 불가능함
