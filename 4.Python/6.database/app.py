import sqlite3 # 동기 방식

# 원래의 sqlite3는 connect가 아니지만, db와 python을 connect 한다는 의미를 담은 함수
# DB 접속 및 입출력을 위한 포인터(커서)를 가져오기
connection = sqlite3.connect('users.db')
cursor = connection.cursor() # 입력창의 커서

cursor.execute('''
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        age INTEGER
        )
''')


# 사용자 조회
cursor.execute('SELECT COUNT(*) FROM users')
count = cursor.fetchone()[0] # python의 기본 result는 튜플이기 떄문에, 전달받은 튜플에서의 첫번째 값을 달라
# print(count)

# execute(?,?)는 하나의 인자만을 받기 때문에, 튜플로 묶어서 보냄. JS에서는 리스트 형태로 묶어서 보냈음
if count == 0:
    cursor.execute('INSERT INTO users(name, age) VALUES (?, ?)', ('Alice', 30))
    cursor.execute('INSERT INTO users(name, age) VALUES (?, ?)', ('Bob', 25))
    # 저장
    connection.commit()

else: print(f"이미 데이터가 {count}개 존재함")

# 모든 데이터 가져오기
cursor.execute('SELECT * FROM users')
data = cursor.fetchall() # 모든 데이터 받아오기 , 튜플의 리스토로 반환 [(),()..]
print(data)

for row in data:
    print(f"유저의 이름은: {row[1]}, 나이는: {row[2]}")

# 종료
connection.close()