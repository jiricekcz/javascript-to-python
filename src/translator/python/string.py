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
        return String(self.replace(old, new, 1))
    def slice(self, start, end):
        return String(self[start:end])
    def split(self, sep):
        if sep == "": return Array(*list(str(self)))
        return Array(str(self).split(sep))
    def substring(self, start, end): 
        return String(self.slice(start, end))
    def toLowerCase(self):
        return String(self.lower())
    def toUpperCase(self):
        return String(self.upper())
    def trim(self):
        return String(self.strip())
    def valueOf(self):
        return str(self)
    def startsWith(self, symbol):
        l = len(symbol)
        return self.slice(0,l) == symbol
