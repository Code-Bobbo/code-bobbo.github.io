# java8 新特性



## 1. 函数式接口

### 1.1 为什么学

函数式接口（Functional Interface）是指**只有一个抽象方法**的接口。这种接口可以用于 Lambda 表达式、方法引用或构造方法引用，作为函数式编程的重要基础。

- 没用函数式编程写的（嵌套特别 多）

![image-20240707155556508](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20240707155556508.png)

- 用了函数式编程的效果

![image-20240707160415271](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20240707160415271.png)





### 1.2 函数式编程思想

#### 1.2.1 概念

面向对象思想需要关注用什么对象完成什么事情。而函数式编程思想就类似于我们数学中的函数。它主要关注的是对数据进行了什么操作（不关注类名，方法名）。

#### 1.2.2 优点

- 代码简洁，开发快速
- 接近自然语言 易于理解
- 易于 "并发编程" 并行流（之前的线程池  原子类会更加复杂）





## 2. Lambda表达式

### 2.1 概述

Lambda是jdk8中的语法糖。可以看作是一种语法糖，**它可以对某些匿名内部类的写法进行简化。**他是函数式编程思想的一个重要体现。让我们不用关注是什么对象，而是更关注我们对数据进行了什么操作。

Lambda 表达式是 Java 8 的核心特性之一，它提供了一种简洁的方法来表示**匿名函数**。Lambda 表达式可以将行为（行为即方法逻辑）作为参数传递，使代码更简洁易读，特别是在集合操作和并行流处理中具有重要意义。

### 2.2 核心原则

Lambda 表达式通常用于**函数式接口**，即只有一个抽象方法的接口

> 可推导可省略
>
> 如果一些参数的类型可以被推导出来，那就可以省略掉他的类型
>
> 如果他的方法名可以被推导出来，就可以省略方法名

### 2.3 基本格式

可以看出他只关注参数

```java
（参数列表）->{代码}
```

以下是函数式接口的例子：

只有一个抽象方法的接口（可以有默认方法、静态方法等），即函数式接口

#### 例一

函数式接口的例子  刚开始的时候写不出来lambda表达式写法 ，可以先写匿名内部类然后再修改为lambda写法

我们在创建线程并启动时可以使用匿名内部类的写法：

```java
new Thread(new Runable(){
    @Override
    public void run(){
        System.out.println("hello world");
    }
}).start();
```

可以使用Lambda的格式对其进行修改。修改后如下：

> 实际上，匿名类什么情况下，才可以用Lambda进行简化呢？
>
> ​		如果这个匿名内部类是一个接口的匿名内部类，并且当中只有一个抽象方法需要重写，那我们就可以对他进行简化。不关注类名方法名，关注的是方法的参数，还有就是我们的方法体。

```java
new Thread( ()->{
    System.out.println("hello world");
}).start();
```

#### 例二

函数式接口的例子

现有方法定义如下，其中intBinaryOperator是一个接口。先使用匿名内部类的写法调用该方法。

```java
public static int calculateNum(IntBinaryoperator operator){
    int a = 10;
	int b = 20;
	return operator.applyAsInt(a, b);
}
public static void main(string[] args){
    calculateNum(new IntBinaryoperator(){
        @override
        public int applyAsInt(int left,int rught){
            return left+right;
        }
    }
    )
    })
}
```

```java
public static int calculateNum(IntBinaryoperator operator){
    int a = 10;
	int b = 20;
	return operator.applyAsInt(a, b);
}
public static void main(string[] args){
    calculateNum((int left,int rught)->{
            return left+right;
        }
    }
  
```

### 2.4 省略规则

在**不关注类名方法名，关注的是方法的参数，还有就是我们的方法体。**的前提下，进一步省略

- 参数类型可以省略
- 方法体只有一句代码时，**大括号** **return** 和唯一一句代码的**分号**可以省略
- 方法只有一个参数时 小括号可以省略
- 以上这些规则都记不住 也可以省略不记  哈哈哈  在idea中使用alt+回车 自动省略



> 在Java中，lambda表达式引入于Java 8，主要用于简化代码，使代码更加简洁和可读。以下是Java中使用lambda表达式的一些常见场景：
>
> 1. **函数式接口**：lambda表达式通常用于实现只有一个抽象方法的接口（可以有默认方法、静态方法等），即函数式接口。常见的函数式接口包括`Runnable`、`Callable`、`Comparator`、`ActionListener`等。比如：
>
>    ```java
>    Runnable r = () -> System.out.println("Hello, Lambda!");
>    new Thread(r).start();
>    ```
>
> 2. **集合操作**：lambda表达式与Java的集合框架（尤其是Stream API）结合使用，可以简化集合操作。例如：
>
>    ```java
>    List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
>    names.forEach(name -> System.out.println(name));
>    
>    List<String> filteredNames = names.stream()
>                                      .filter(name -> name.startsWith("A"))
>                                      .collect(Collectors.toList());
>    ```
>
> 3. **事件处理**：在GUI编程中，lambda表达式可以简化事件处理代码。例如：
>
>    ```java
>    JButton button = new JButton("Click Me");
>    button.addActionListener(e -> System.out.println("Button clicked"));
>    ```
>
> 4. **自定义排序**：lambda表达式可以用来定义自定义排序规则。例如：
>
>    ```java
>    List<String> names = Arrays.asList("Charlie", "Bob", "Alice");
>    names.sort((s1, s2) -> s1.compareTo(s2));
>    ```
>
> 5. **线程执行**：在使用线程池执行任务时，lambda表达式可以简化代码。例如：
>
>    ```java
>    ExecutorService executor = Executors.newFixedThreadPool(10);
>    executor.submit(() -> System.out.println("Task executed"));
>    executor.shutdown();
>    ```
>
> 6. **Optional处理**：Java 8引入的`Optional`类可以与lambda表达式结合使用，简化空值检查和处理。例如：
>
>    ```java
>    Optional<String> optional = Optional.ofNullable("Hello");
>    optional.ifPresent(value -> System.out.println(value));
>    ```
>
> 总的来说，Java中的lambda表达式主要用于简化代码，使代码更加简洁、可读性更强，并且减少了样板代码的编写。

## 3. Stream流

### 3.1 概述

java8的Stream使用的是函数式编程模式，里面的方法都是函数式接口定义的，所以可以使用lambda 让stream使用更加快捷。如它的名字一样，他可以被用来集合，数组进行链状流式的操作。可以更方便的让我们对集合和数组操作

之前的是io流（input output Stream），和这里的流不一行的，这里的流是对集合进行操作的。

### 3.2 案例数据准备

```java
@Data
@NoArgsconstructor
@A11ArgsConstructor
@Equa1sAndHashcode//用于后期的去重使用 判断两个对象是否重复
public class Author {
    //id
    private Long id;
    //姓名
    private string name;
    //年龄
    private Integer age;
    //简介
    private string intro;
    //作品
    private List<Book> books;
}
```

```java
@Data
@A11Argsconstructor
@NoArgsconstructor
@Equa1sAndHashcode//用于后期的去重使用 判断两个对象是否重复
public class Book {
//id
private Long id;
//书名
private string name;
/1分类
private string category;
//评分
private Integer score;
//简介
private string intro;
}
```

```java
private static List<Author> getAuthors(){
//数据初始化
Author author = new Author(1L,"蒙多”,33,“一个从菜刀中明悟哲理的祖安人",nu11);
Author author2 = new Author(2L,"亚拉索”,15,“狂风也追逐不上他的思考速度”,nu11);
Author author3 = new Author(3L,“易”,14,"是这个世界在限制他的思维”,nu77);
Author author4 = new Author(3L,"易”,14,"是这个世界在限制他的思维”,nu11);
//书籍列表
List<Book> booksl= new ArrayList<>();
List<Book> books2 = new ArrayList<>();
List<Book> books3 = new ArrayList<>();
books1.add(new Book(1L,“刀的两侧是光明与黑暗",“哲学,爱情”,88,"用一把刀划分了爱恨”));
books1.add(new Book(2L,"一个人不能死在同一把刀下",“个人成长,爱情",99,"讲述如何从失败中明悟真理”));
books2.add(new Book(3L,"那风吹不到的地方",“哲学”,85,“带你用思维去领略世界的尽头”));
books2.add(new Book(3L,"那风吹不到的地方","哲学",85,"带你用思维去领略世界的尽头"));
 books2.add(new Book(4L,"吹或不吹”,"爱情,个人传记”,56,"一个哲学家的恋爱观注定很难把他所在的时代理解"));
books3.add(new Book(5L,"你的剑就是我的剑","爱情",56,"无法想象一个武者能对他的伴侣这么的宽容"));
 books3.add(new Book(6L,“风与剑",“个人传记”,100,"两个哲学家灵魂和肉体的碰撞会激起怎么样的火花呢?"));
 books3.add(new Book(6L,"风与剑","个人传记",100,"两个哲学家灵魂和肉体的碰撞会激起怎么样的火花呢?"));
author.setBooks(books1)；
author2.setBooks(books2)；
author3.setBooks(books3)；
author4.setBooks(books3)；
List<Author> authorList = new ArrayList<>(Arrays.asList(author,author2,author3,author4));
return authorList；
 }
```



### 3.3 快速入门

#### 3.3.1 需求

我们可以调用getAuthors方法获取到作家的集合，现在需要打印所有年龄小于18的作家的名字，并且要注意去重

**实现**

使用匿名内部类的写法

```java
public static void main(string[] args){
    List<Author> authors = getAuthors;
    authors.stream() // 把集合转换成流
        	.distinct() // 先去除 重复的作家  需要借助@Equa1sAndHashcode注解
        	.filter(new Predicate<Author>() {
                @Override
                public boolean test(Author author) {
                    return author.getAge() < 18;
                }
            }) // 筛选年龄小于18的
            .forEach(new Consumer<Author>() {
                @Override
                public void accept(Author author) {
                    System.out.println(author.getName());
                }
            }); // 遍历打印名字
```

优化为 Lambda表达式 写法

```java
public static void main(string[] args){
    List<Author> authors = getAuthors;
    authors.stream() // 把集合转换成流
        	.distinct() // 先去除 重复的作家  需要借助@Equa1sAndHashcode注解 ，这里也可以转为set集合进行去重操作
        	.filter(author->author.getAge() < 18
            ) // 筛选年龄小于18的
            .forEach(author->System.out.println(author.getName())）; // 遍历打印名字
```



### 3.4 常用操作

#### 3.4.1 创建流

单列集合： 集合对象.stream()

```java
List<Author> authors = getAuthors;
Stream<Author> stream = authors.stream();
```



数组： Arrays.stream(数组) 或者使用 Stream.of(数组)来创建

```java
Integer[] arr = {1,2,3,4,5};
stream<Integer> stream=Arrays.stream(arr);
Stream<Integer> stream2=stream.of(arr);
```

双列集合: 转换成单列集合后在创建

使用entryset方法 把map中的键值对封装在一个entryset对象中 ，原来的双列集合变成Set<Entry<key,value>> 形式的set单列集合

```java
Map<string,Integer> map=new HashMap<>();
map.put("蜡笔小新”,19);
map.put("黑子”,17);
map.put("日向翔阳”,16);
Stream<Map,Entry<string, Integer>> stream = map.entryset().stream();
```





#### 3.4.2 中间操作

##### **filter**

可以对流中的元素进行条件过滤，符合过滤条件的才可以继续留在流中

例如:  打印所有姓名长度大于1的作家的姓名

```java
List<Author> authors= getAuthors();
authors.stream
.filter(author -> author.getName().length()>1)
.forEach(author -> system.out.printin(author.getName()));
```

##### **map**

可以把流中的元素进行计算或转换

`map`方法用于将流中的每个元素转换为另一种形式。这是通过提供一个函数，该函数应用于每个元素，并生成一个新的元素。`map`方法的主要目的是对流中的元素进行一对一的转换，而不会改变流的结构或大小。

> ### `map` 方法的作用
>
> 1. **转换元素**：`map`方法用于对流中的元素进行转换。例如，将一个对象转换为其某个属性的值，将一个字符串转换为其长度，等等。
> 2. **保持流的结构和大小**：`map`方法不会改变流的大小和结构。每个输入元素都会对应一个输出元素。
> 3. **链式操作**：`map`方法返回一个新的流，这允许我们继续对流进行进一步的操作，如过滤、排序、收集等。

例如:  打印所有作家的姓名

```java
List<Author> authors = getAuthors();
authors.stream()
.map(author -> author.getName())
.forEach(name->system.out.printin(name));
```



##### **distinct**

可以去除流中的重复元素

`distinct`方法没有参数，它依赖于元素的`equals`和`hashCode`方法来判断元素是否相等。

> 注意：distinct方法 是依赖Object的equals方法来判断是否是相同对象的。所以需要重写equals方法。
>
> 使用lombok生成的equals会比较所有字段  使用@data注解就包含这个功能了
>
> 如果流中的元素是我们自定义的类型，那么一定要重写equals方法，如果不重写用的是object的equals方法，它只是用==号进行比较地址值。

例如： 打印所有作家的姓名，并且要求其中不能有重复元素。

```java
List<Author> authors = getAuthors();
authors.stream()
.map(author -> author.getName())
.distinct()
.forEach(name->system.out.printin(name));
```



##### **sorted**

`sorted`方法用于对流中的元素进行排序。它有两种形式：一种不带参数，使用自然顺序排序；另一种带有一个比较器，用于自定义排序规则。

1. **自然顺序排序**：不带参数的`sorted()`方法使用元素的自然顺序进行排序。元素必须实现`Comparable`接口。
2. **自定义排序**：带有一个`Comparator`参数的`sorted(Comparator<? super T> comparator)`方法允许用户定义自定义的排序规则。



例如：对流中的元素按照年龄进行降序排序，并且要求不能有重复元素

```java
//1. 使用自然顺序排序 ，不带参数的sorted()方法
// 注意前提：流中的元素类型 必须实现Comparable接口，重写接口的抽象方法CompareTo
//在抽象方法中写年龄排序逻辑
@Data
@NoArgsconstructor
@A11ArgsConstructor
@Equa1sAndHashcode//用于后期的去重使用 判断两个对象是否重复
public class Author implements Comparable<Author> {
    //id
    private Long id;
    //姓名
    private string name;
    //年龄
    private Integer age;
    //简介
    private string intro;
    //作品
    private List<Book> books; 
     @Override
    public int compareTo(Author other) {
        return this.getAge() - other.getAge();  //以this为准，this在左是升序，this在右是降序
    }
}

List<Author> authors = getAuthors();
authors.stream()
.map(author -> author.getAge())
.distinct()
.forEach(age->system.out.printin(age));


```

```java
//调用有参的sorted()方法 这种方式 流中元素不需要实现Comparable接口


authors.stream()
.distinct()
.sorted(new Comparator<Author>(){  //因为不熟悉参数  先写成匿名内部类的形式
    @0verride
	public int compare(Author o1, Author o2){
        return o2.getAge()-o1.getAge(); //根据结果修改o1 o2的相对位置，实现升序降序
    }
.forEach (author ->System. out. println(author.getAge()));
    
//优化为lambda表达式写法
authors.stream()
.distinct()
.sorted(（o1,o2)->o2.getAge()-o1.getAge();//根据结果修改o1 o2的相对位置，实现升序降序
.forEach (author ->System. out. println(author.getAge()));
```

##### **limit**

可以设置流的最大长度，超出的部分将被抛弃

例如： 对流中的元素按照年龄进行降序排列，并且要求不能有重复的的元素，然后打印其中年龄最大的两个最大的两个作家的姓名

```java
//优化为lambda表达式写法
authors.stream()
.distinct()
.sorted(（o1,o2)->o2.getAge()-o1.getAge();//根据结果修改o1 o2的相对位置，实现升序降序
.limit(2)
.forEach (author ->System. out. println(author.getName()));
```

##### skip

跳过流中的前n个元素，返回剩下的元素

例如：打印除了年龄最大的作家外的其他作家，要求不能有重复元素，并且按照年龄降序排序

```java
authors.stream()
.distinct()
.sorted(（o1,o2)->o2.getAge()-o1.getAge();//根据结果修改o1 o2的相对位置，实现升序降序
.skip(1)
.forEach (author ->System. out. println(author.getName()));
```

> skip 和limit结合就相当于分页了

##### flatMap

map只能把一个对象转换成另外一个对象来作为流中的元素（entrySet）。

而flatMap 可以把以一个对象转换成多个对象作为流中的元素

例一：打印所有书籍的名字。要求对重复的元素进行去重。

![image-20240708210451218](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20240708210451218.png)

```java
//每个作家都有书籍的属性，作家出版的书籍都在自己的属性中

//错误写法
authors.stream()
.map(author-> author.getBooks())  //这里的author.getBooks()是一个集合，并不是一个book对象
.forEach()
    

//正确写法
authors.stream()
    .flatMap(new Function<Author>,Stream<?>>(){
        @override
        public Stream<?> apply(Author author){
            return author.getBooks().stream(); //获取book集合 然后转化成流  合并在同一个流内
        }
    }).distinct()
    .forEach(new Consumer<Book>(){
        @override
        public void accept(Book book){
           System. out. println(book.getName());
        }
    }
)
    
    
    
//优化为lambda表达式写法
authors.stream()
    .flatMap(author->author.getBooks().stream()//获取book集合 然后转化成流  合并在同一个流内
    ).distinct()
    .forEach(book->System. out. println(book.getName())
```



例二：

#### 3.4.3 终结操作

##### forEach

对流中的元素进行遍历操作，我们通过传入的参数去指定对遍历的元素进行什么具体操作

例子：输出所有作家的名字

```java
authors.stream()
    .forEach(auther->System.out.println(auther.getName()))
```



##### count

可以用来获取当前流中元素的个数

例子：打印这些作家的所出书籍的数目，注意删除重复元素

```java
authors.stream()
    .flatMap(auther->auther.getBooks().stream)
    .distinct()
    .count
```



##### max&min

有参

可以用来获取流中的最值

例子：分别获取这些作家所出的书籍的最高分和最低分并打印

```java
authors.stream()
    .flatMap(auther->auther.getBooks().stream())
    .map(book->book.getScore())
    .max(（o1,o2)->o1-o2)  //返回值是Optional对象
  System.out.println(max.get()); 

authors.stream()
    .flatMap(auther->auther.getBooks().stream())
    .map(book->book.getScore())
    .min(（o1,o2)->o1-o2)  //返回值是Optional对象
  System.out.println(max.get()); 
```



##### collect

把当前流转换成一个集合

例子：获取一个存放所有作者名字的list集合

```java
List<String> names = authors.stream()
    .map(auther->auther.getName())
    .collect(Collectors.toList());
```

例子：获取一个所有书名的Set集合

```java
Set<String> books = authors.stream()
    .flatMap(auther->auther.getbooks().stream())
    .collect(Collectors.toSet())
```

例子：获取一个Map集合，map的key作为作者名，value为List<Book>

```java
List<author> authors = getAuthors();
authors.stream()
    .collect(Collectors.toMap(author->author.getName(),author->author.getBooks))
```

![image-20240725215031038](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20240725215031038.png)

##### 查找与匹配

###### anyMatch

###### allMatch

###### noneMatch

###### findAny

###### findFirst

##### reduce归并

## 4. Optional

## 5. 函数式接口

## 6. 方法引用

