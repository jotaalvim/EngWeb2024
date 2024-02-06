import os

try:
    _  = [os.mkdir(f'TPC{i}') for i in range(1,9)]
except:
    print("asd")

try:
    _2 = [ open(f'TPC{i}/.gitkeep','w') for i in range(1,9)]
except:
    print("asd")
