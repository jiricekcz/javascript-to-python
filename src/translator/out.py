# This python file was generated by the javascript-to-python convertor.
# Github: https://github.com/jiricekcz/javascript-to-python
# Convertor author: https://github.com/jiricekcz
import math
class Number(float):
    def __init__(self, n):
        pass
    def toString(self):
        return String(self.valueOf())
    def valueOf(self):
        if int(self) == self: return int(self)
        return float(self)
    def toFixed(self, digits):
        return String(round(self, digits))
    def __add__(self, other): 
        if isinstance(other, Number): 
            return Number(self + other)
        else: 
            return other + self
    def __str__(self):
        return self.toString()
class String(str): 
    def __init__(self, value):
        pass
    def __add__(self, other):
        return String(str(self) + str(other))
    def charAt(self, pos):
        return self[pos]
    def charCodeAt(self, pos):
        return ord(self[pos])
    def concat(self, *others):
        r = self()
        for h in others:
            r += h
        return r
    def indexOf(self, sub, start = 0):
        l = len(self)
        ls = len(sub)
        while start < l - ls:
            if (self[start:start + ls] == sub): return start
            start += 1
        return Number(-1)
    def lastIndexOf(self, sub, start = "h"):
        l = len(self)
        ls = len(sub)
        if (start == "h"): start = ls - l
        while start > 0:
            if (self[start:start + ls] == sub): return start
            start -= 1
        return Number(-1)
    def replace(self, old, new):
        return self.replace(old, new, 1)
    def slice(self, start, end):
        return self[start:end]
    def split(self, sep):
        return Array(self.split(sep))
    def substring(self, start, end): 
        return self.slice(start, end)
    def toLowerCase(self):
        return self.lower()
    def toUpperCase(self):
        return self.upper()
    def trim(self):
        return self.strip()
    def valueOf(self):
        return str(self)
class Array(list):
    def __init__(self, *l): 
        super().__init__(l)
        self.__update()
    def __update(self):
        self.length = len(self)
    def join(self, separator):
        x = separator.join(self)
        self.__update()
        return x 
    def toString(self):
        x = self.join(',')
        self.__update()
        return x
    def push(self, *elements):
        for element in elements:
            self.append(element)
        self.__update()
    def concat(self, array):
        for x in array:
            self.push(x)
    def reverse(self):
        self.reverse()
        self.__update()
        return self
    def shift(self):
        x = self.pop(0)
        self.__update()
        return x
    def slice(self, start, stop):
        return self[start:stop]
    def __swap(self, index1, index2):
        t = self[index1]
        self[index1] = self[index2]
        self[index2] = t
        self.__update()
    def sort(self, compareFunction):
        def sort(left, right):
            def p(pivot, left, right):
                si = left
                pivotValue = self[pivot]
                self.__swap(pivot, right)
                v = left
                while (v < right):
                    if (compareFunction(self[v], pivotValue) < 0):
                        self.__swap(v, si)
                        si+=1
                    v+=1
                self.__swap(right, si)
                return si
            piv = None
            if (left < right):
                piv = left + math.ceil((right - left) * 0.5)
                newPiv = p(piv, left, right)
                sort(left, newPiv - 1)
                sort(newPiv + 1, right) 
        sort(0, self.length - 1)
        self.__update()
        return self
    def splice(self, start, deleteCount):
        h = self[start:start + deleteCount]
        del self[start:start + deleteCount]
        self.__update()
        return h
    def unshift(self, *elements):
        for element in elements:
            self.insert(0, element)
        self.__update()
    def indexOf(self, element):
        self.index(element)
    def lastIndexOf(self, element):
        i = len(self) - 1
        while i > 0:
            if (element == self[i]): return i
    def every(self, condition):
        i = 0
        while i < len(self) - 1:
            if (not self.__callElementCallback(condition, self[i], i, self)): return False
            i+=1
        return True
    def some(self, condition):
        i = 0
        while i < len(self) - 1:
            if (self.__callElementCallback(condition, self[i], i, self)): return True
            i+=1
        return False
    def __callElementCallback(self, callback, element, index, array):
        if (callback.__defaults__ is not None): argCount = callback.__code__.co_argcount - len(callback.__defaults__)
        if (callback.__defaults__ is None): argCount = callback.__code__.co_argcount
        if (argCount == 0):
            return callback()
        if (argCount == 1):
            return callback(element)
        if (argCount == 2):
            return callback(element, index)
        if (argCount == 3):
            return callback(element, index, array)
        
    def forEach(self, callback):
        i = 0
        while i < len(self) - 1:
            self.__callElementCallback(callback, self[i], i, self)
            i+=1
    def filter(self, callback):
        h = []
        i = 0
        while i < len(self) - 1:
            if (self.__callElementCallback(callback, self[i], i, self)): h.append(self[i])
            i+=1
        return Array(*h)
    def map(self, callback):
        h = []
        i = 0
        while i < len(self):
            h.append(self.__callElementCallback(callback, self[i], i, self))
            i+=1
        return Array(*h)
    def includes(self, element):
        for i in self:
            if (i == element): return True
        return False
    def reduce(self, callback):
        a = 0
        for x in self:
            a = callback(a, x)
        return a
h=Number(5.5555)
r=Number(6)
print((String("hhhhhh")+h))