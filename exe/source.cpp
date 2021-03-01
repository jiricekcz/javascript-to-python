#include <iostream>
#include <string>
#include <stdio.h>
using namespace std;
int main(int argc, char *argv[])
{
    char buffer[1024];
    int l = sprintf(buffer, "node \"H:\\GGTeam\\Projects\\javascript-to-python\" \"%s\" auto --saveSource", argv[1]);
    cout << buffer;
    system(buffer);
    return 0;
}