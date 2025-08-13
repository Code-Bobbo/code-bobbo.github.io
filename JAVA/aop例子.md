**AOP**

AOP（Aspect Oriented Programming），即面向切面编程，可以说是OOP（Object Oriented Programming，面向对象编程）的补充和完善。OOP引入封装、继承、多态等概念来建立一种对象层次结构，用于模拟公共行为的一个集合。不过OOP允许开发者定义纵向的关系，但并不适合定义横向的关系，例如日志功能。日志代码往往横向地散布在所有对象层次中，而与它对应的对象的核心功能毫无关系对于其他类型的代码，如安全性、异常处理和透明的持续性也都是如此，这种散布在各处的无关的代码被称为横切（cross cutting），在OOP设计中，它导致了大量代码的重复，而不利于各个模块的重用。

AOP技术恰恰相反，它利用一种称为"横切"的技术，剖解开封装的对象内部，并将那些影响了多个类的公共行为封装到一个可重用模块，并将其命名为"Aspect"，即切面。所谓"切面"，简单说就是那些与业务无关，却为业务模块所共同调用的逻辑或责任封装起来，便于减少系统的重复代码，降低模块之间的耦合度，并有利于未来的可操作性和可维护性。

使用"横切"技术，AOP把软件系统分为两个部分：**核心关注点**和**横切关注点**。业务处理的主要流程是核心关注点，与之关系不大的部分是横切关注点。横切关注点的一个特点是，他们经常发生在核心关注点的多处，而各处基本相似，比如权限认证、日志、事物。AOP的作用在于分离系统中的各种关注点，将核心关注点和横切关注点分离开来

**AOP核心概念**

1、横切关注点

对哪些方法进行拦截，拦截后怎么处理，这些关注点称之为横切关注点

2、切面（aspect）

类是对物体特征的抽象，切面就是对横切关注点的抽象

3、连接点（joinpoint）

被拦截到的点，因为Spring只支持方法类型的连接点，所以在Spring中连接点指的就是被拦截到的方法，实际上连接点还可以是字段或者构造器

4、切入点（pointcut）

对连接点进行拦截的定义

5、通知（advice）

所谓通知指的就是指拦截到连接点之后要执行的代码，通知分为前置、后置、异常、最终、环绕通知五类

6、目标对象

代理的目标对象

7、织入（weave）

将切面应用到目标对象并导致代理对象创建的过程

8、引入（introduction）

在不修改代码的前提下，引入可以在**运行期**为类动态地添加一些方法或字段

####  创建切面类（Aspect）

切面类用来定义我们要在目标方法执行前后插入的逻辑。在 Spring 中，切面类通常使用 `@Aspect` 注解标注。

```
java复制代码import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

    // 定义前置通知：在目标方法执行之前执行
    @Before("execution(* com.example.demo.UserService.register(..))")
    public void logBefore() {
        System.out.println("Logging before method execution.");
    }
}
```

### 1. `@Pointcut` 注解的使用

#### 语法

```
@Pointcut("execution(* com.example.demo.UserService.register(..))")
public void registerMethod() {}
```

- **`@Pointcut`**：定义一个切点表达式的方法，方法本身不需要做任何事情，只要声明一个切点。
- 然后，你可以在通知中引用这个切点方法。

#### 示例：结合 `@Pointcut` 和通知

首先，定义切点方法：

```
java复制代码import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

    // 定义切点
    @Pointcut("execution(* com.example.demo.UserService.register(..))")
    public void registerMethod() {}

    // 使用切点进行前置通知
    @Before("registerMethod()")
    public void logBefore() {
        System.out.println("Logging before method execution.");
    }
}
```

### 3. 其他切点表达式的使用方式

除了 **`execution()`**，Spring AOP 还支持其他几种切点表达式：

- **`@annotation()`**：匹配带有指定注解的方法
- **`args()`**：匹配带有特定参数类型的方法
- **`within()`**：匹配在指定类或包内的方法
- **`this()`** 和 **`target()`**：匹配代理对象和目标对象
- **`bean()`**：匹配特定名字的 Spring Bean