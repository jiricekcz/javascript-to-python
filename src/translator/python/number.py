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
            return Number(self.valueOf() + other.valueOf())
        else: 
            return Number(other + self.valueOf())
    def __str__(self):
        return self.toString()
    def __index__(self):
        return int(self)