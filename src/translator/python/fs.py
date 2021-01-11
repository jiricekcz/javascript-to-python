class fs:
    @staticmethod
    def readFileSync(path):
        f = open(path)
        return f.read()

