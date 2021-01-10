class Array(list):
    def __init__(self, l): 
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
    def push(self, element):
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
