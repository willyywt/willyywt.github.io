---
layout: book_chapter
navigate_index: navigate_index.html
title: "C++ move code snippet"
---

C++ move code snippet

```cpp
#include <iostream>
class A {
      public:
	int *pointer;
	A() : pointer(new int(1)) { std::cout << "Construct: " << this << "," << pointer << '\n'; }
	A(const A &a) : pointer(new int(*a.pointer)) {
		std::cout << "Copy Construct: " << this << "=" << &a << "," << pointer << '\n';
	}
	A(A &&a) : pointer(a.pointer) {
		a.pointer = nullptr;
		std::cout << "Move Construct: " << this << "=" << &a << "," << pointer << '\n';
	}
	A& operator=(const A &other) {
		*(this->pointer) = *(other.pointer);
		return *this;
	}
	~A() {
		std::cout << "Destruct: " << this << "," << pointer << '\n';
		delete pointer; // delete nullptr is no-op (C++98 Standard)
	}
};
// Prevent Compiler optimization of copy elision and move elision
A return_rvalue(bool test) {
	A a, b;
	if (test)
		return a;
	else
		return b;
}
A optimized_rvalue(bool test) {
	A a, b;
	if (!test) {
		*(a.pointer) = *(b.pointer);
	}
	return a;
}
int main(int argc, char **argv) {
	bool optimized = (argc >= 2) && (argv[1] != nullptr) && (argv[1][0] == 'o');
	A obj = optimized ? optimized_rvalue(false) : return_rvalue(false);
	std::cout << "obj: " << obj.pointer << '\n';
	std::cout << *obj.pointer << '\n';
	return 0;
}
```

Possible output:

```plaintext
> ./main
Construct: 0x7fffe041c548,0x1eb2eb0
Construct: 0x7fffe041c540,0x1eb32e0
Move Construct: 0x7fffe041c580=0x7fffe041c540,0x1eb32e0
Destruct: 0x7fffe041c540,0
Destruct: 0x7fffe041c548,0x1eb2eb0
obj: 0x1eb32e0
1
Destruct: 0x7fffe041c580,0x1eb32e0
> ./main o
Construct: 0x7fff16607e40,0x106deb0
Construct: 0x7fff16607e08,0x106e2e0
Destruct: 0x7fff16607e08,0x106e2e0
obj: 0x106deb0
1
Destruct: 0x7fff16607e40,0x106deb0
```
