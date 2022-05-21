---
layout: book_chapter
navigate_bar: navigate_bar.html
title: "C++ move code snippet"
---

C++ move code snippet

```cpp
#include <iostream>
class A {
      public:
	int *pointer;
	A() : pointer(new int(1)) { std::cout << "构造" << this << "," << pointer << '\n'; }
	A(A &a) : pointer(new int(*a.pointer)) { std::cout << "拷贝" << this << "=" << &a << "," << pointer << '\n'; }
	A(A &&a) : pointer(a.pointer) {
		a.pointer = nullptr;
		std::cout << "移动" << this << "=" << &a << "," << pointer << '\n';
	}
	~A() {
		std::cout << "析构" << this << "," << pointer << '\n';
		delete pointer;
	}
};
// 防止编译器优化
A return_rvalue(bool test) {
	A a, b;
	if (test)
		return a; // 等价于 static_cast<A&&>(a);
	else
		return b; // 等价于 static_cast<A&&>(b);
}
A optimized_rvalue(bool test) {
	A a, b;
	if (!test) {
		*(a.pointer) = *(b.pointer);
	}
	return a;
}
int main() {
	// A obj = return_rvalue(false);
	A obj = optimized_rvalue(false);
	std::cout << "obj:" << obj.pointer << '\n';
	std::cout << *obj.pointer << '\n';
	return 0;
}
```
