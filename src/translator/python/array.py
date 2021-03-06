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
        return Array(*self[start:stop])
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
        h = self[start:Number(start + deleteCount)]
        del self[start:Number(start + deleteCount)]
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