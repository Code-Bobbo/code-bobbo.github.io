# 1. 简介

base64编码和大家熟悉的ascii码一样，也是一种编码方式。

ASCII码使用7个二进制位来表示一个字符，7个二进制位刚好可以表示128个不同的字符，包括大小写字母，数字，标点符号和一些不可见的控制字符；

而base64编码使用6个二进制位表示一个字符，6个二进制位刚好可以表示64个不同的字符，包括大小写字母，十个数字以及加号和斜线这两个特殊字符，（还有个填充字符 =）这也是base64编码名称的由来

**Base64 是一种将二进制数据编码为 ASCII 字符串的方式。**

### 两者关系

- **编码过程**：在 Base64 编码中，二进制数据（可以是任何类型的数据，包括文本、图像等）被转换为 ASCII 字符串。这使得二进制数据能够在文本格式的环境中安全传输（例如电子邮件、JSON 等）。
- **兼容性**：Base64 编码的结果是 ASCII 字符串，因此可以在仅支持 ASCII 的环境中使用，确保数据不会因字符集不兼容而导致损坏。



# 2. 原理和过程

编码的过程可以分为三个步骤：

	1. 转换编码的对象为二进制

![image-20241003205201382](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20241003205201382.png)

比如我们编码helloworld字符串，首先把他转为二进制，（使用ASCII码进行对应）（也有别的字符编码）  得到这个字符串的二进制形式

![image-20241003205437424](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20241003205437424.png)

2. 将得到的二进制字符串以6位为单位分组

![image-20241003205551582](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20241003205551582.png)

3. 转换成十进制并对照base64映射

	![image-20241003205706836](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20241003205706836.png)

注意的是，编码后的长度需要是4的倍数，如果不是 后面使用=补齐





# 3. 应用场景

base64编码可以把任意的二进制数据转换成可打印的ascii字符，这样就可以方便的传输或者存储这些数据。

![image-20241003210006310](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20241003210006310.png)