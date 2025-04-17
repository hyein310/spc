row = 5

# for i in range(시작값, 끝값, 스텝)
for i in range(1, row + 1):
    print(f"{"*" * i}")

for i in range(1, row+1):
    print(" " * (row-i) + "*" * i)

for i in range(1, row+1):
    print(" " * (row-i) + "*" * (2 * i - 1))

for i in range(1, row+1):
    print(" " * (row-i) + "*" * (2 * i - 1))
for i in range(row-1, 0, -1):
    print(" " * (row - i) + "*" * (2 * i - 1))