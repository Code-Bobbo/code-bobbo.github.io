【黑马程序员Spring视频教程，深度讲解spring5底层原理】 https://www.bilibili.com/video/BV1P44y1N7QG/?p=2&share_source=copy_web&vd_source=d15f45e46bf4f3e6570a8baae2d38973



# 1. 容器接口

借助于springboot项目的启动类，run方法有一个返回值，返回的结果就是我们的spring容器。

![image-20250112212718140](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20250112212718140.png)

ConfigurableApplicationContext其实是一个子接口，将光标移动到该子接口 使用快捷键CTRL+alt+u 会出现java类图  ConfigurableApplicationContext继承了很多的接口。

其中继承的顶层的接口是BeanFactory。意味着他对BeanFactory进行了一些功能拓展，主要是中间的那几个接口（为了更加规范，中间使用的接口）。

![image-20250112213045219](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20250112213045219.png)

因此BeanFactory才是spring的核心容器，主要的ApplicationContext都实现或者组合了BeanFactory的功能,这意味着BeanFactory实际上是我们ApplicationContext的一个成员变量。

## 1.1 什么是BeanFactory

- 它是 ApplicationContext 的父接口

- 它才是 Spring 的核心容器，主要的 ApplicationContext 实现 组合 了它的功能，也就是说，BeanFactory 是 ApplicationContext 中的一个成员变量。
- 常用的 context.getBean("xxx") 方法，其实是调用了 BeanFactory 的 getBean() 方法。

## 1.2 BeanFactory 能做什么？

进入 BeanFactory 接口，在 IDEA 中使用快捷键 Ctrl + F12 查看这个接口中所有的方法定义：

![image-20250113132858923](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20250113132858923.png)

通过这些方法定义可知，BeanFactory 表面上只有 getBean() 方法，在 Spring 框架中，**`BeanFactory` 接口**是容器的核心接口，提供了获取 Bean 的基本能力，但 Spring 的许多高级功能（如控制反转、依赖注入、Bean 生命周期管理等）是通过其实现类扩展和提供的。

查看 DefaultListableBeanFactory 类的类图：

![image-20250113133000742](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20250113133000742.png)

DefaultListableBeanFactory 实现了 BeanFactory 接口，它能管理 Spring 中所有的 Bean，当然也包含 Spring 容器中的那些单例对象。

DefaultListableBeanFactory 还继承了 DefaultSingletonBeanRegistry 类，这个类就是用来管理 Spring 容器中的单例对象。

在 IDEA 提供的类图中选中 DefaultSingletonBeanRegistry，然后按下 F4 进入这个类。它有一个 Map 类型的成员变量 singletonObjects：

```java
private final Map<String, Object> singletonObjects = new ConcurrentHashMap<>(256);
```

Map 的 key 就是 Bean 的名字，而 value 是对应的 Bean，即单例对象。

现有如下两个 Bean：

```java
@Component
public class Component1 {
}

@Component
public class Component2 {
}
```

查看 singletonObjects 中是否存在这两个 Bean 的信息： 借助反射

```java

@Slf4j
@SpringBootApplication
public class A01Application {
    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(A01Application.class, args);

        Field singletonObjects = DefaultSingletonBeanRegistry.class.getDeclaredField("singletonObjects");
        singletonObjects.setAccessible(true);
        ConfigurableListableBeanFactory beanFactory = context.getBeanFactory();
        Map<String, Object> map = (Map<String, Object>) singletonObjects.get(beanFactory);
        map.entrySet().stream().filter(e -> e.getKey().startsWith("component"))
            .forEach(e -> System.out.println(e.getKey() + "=" + e.getValue()));
    
        context.close();
    }

}
```

运行 main() 方法后，控制台打印出：

```java
component1=indi.mofan.bean.a01.Component1@25a5c7db
component2=indi.mofan.bean.a01.Component2@4d27d9d
```



## 1.3 ApplicationContext 的功能（国际事件 资源环境）

回顾 ConfigurableApplicationContext 类的类图：

![image-20250113133452392](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20250113133452392.png)

ApplicationContext 除了继承 BeanFactory 外，还继承了：

- MessageSource：使其具备处理国际化资源的能力

- ResourcePatternResolver：使其具备使用通配符进行资源匹配的能力
- EnvironmentCapable：使其具备读取 Spring 环境信息、配置文件信息的能力
- ApplicationEventPublisher：使其具备发布事件的能力

> MessageSource 的使用
>

在 SpringBoot 项目的 resources 目录下创建 messages.properties、messages_en.properties、messages_zh_CN.properties、messages_zh_TW.properties 四个国际化文件，除 messages.properties 外，其余三个文件内容如下：

```java

thanks=Thank you

thanks=谢谢

thanks=謝謝
```

测试 MessageSource 接口中 getMessage() 方法的使用：

```java
@SneakyThrows
@SuppressWarnings("unchecked")
public static void main(String[] args) {
    ConfigurableApplicationContext context = SpringApplication.run(A01Application.class, args);
    // --snip--

    System.out.println(context.getMessage("thanks", null, Locale.ENGLISH));
    System.out.println(context.getMessage("thanks", null, Locale.SIMPLIFIED_CHINESE));
    System.out.println(context.getMessage("thanks", null, Locale.TRADITIONAL_CHINESE));
    context.close();

}
```

运行 main() 方法后，控制台打印出：

```java
Thank you
谢谢
謝謝
```

国际化资源由 ResourceBundleMessageSource 进行处理，使用“干净”的 Spring 容器 GenericApplicationContext，并添加对应的 Bean：

~~~java
public static void main(String[] args) {
    GenericApplicationContext context = new GenericApplicationContext();

```
context.registerBean("messageSource", MessageSource.class, () -> {
    ResourceBundleMessageSource ms = new ResourceBundleMessageSource();
    // 设置编码格式
    ms.setDefaultEncoding("utf-8");
    // 设置国际化资源文件的 basename
    ms.setBasename("messages");
    return ms;
});

context.refresh();

System.out.println(context.getMessage("thanks", null, Locale.ENGLISH));
System.out.println(context.getMessage("thanks", null, Locale.SIMPLIFIED_CHINESE));
System.out.println(context.getMessage("thanks", null, Locale.TRADITIONAL_CHINESE));
```

}
~~~



> ResourcePatternResolver 的使用

常见的资源前缀包括：

- `classpath:`：从类路径加载。
- `file:`：从文件系统加载。
- `http:` 或 `https:`：从网络加载。

**类路径就是 Java 程序加载类和资源的搜索路径**。

```java
@SneakyThrows
@SuppressWarnings("unchecked")
public static void main(String[] args) {
    ConfigurableApplicationContext context = SpringApplication.run(A01Application.class, args);
    // --snip--

    Resource[] resources = context.getResources("classpath:application.properties");
    Assert.isTrue(resources.length > 0, "加载类路径下的 application.properties 文件失败");
    
    // 使用 classpath* 可以加载 jar 里类路径下的 resource
    resources = context.getResources("classpath*:META-INF/spring.factories");
    Assert.isTrue(resources.length > 0, "加载类路径下的 META-INF/spring.factories 文件失败");
    context.close();

}
```

> EnvironmentCapable 的使用
>

```java
@SneakyThrows
@SuppressWarnings("unchecked")
public static void main(String[] args) {
    ConfigurableApplicationContext context = SpringApplication.run(A01Application.class, args);
    // --snip--

    System.out.println(context.getEnvironment().getProperty("java_home"));
    System.out.println(context.getEnvironment().getProperty("properties.name"));
    context.close();

}
```

java_home 是从环境变量中读取，properties.name 则是从 application.yml 配置文件中读取。

```java

properties:
  name: "mofan"
  age: 20
person:
  gender: "man"
```

运行 main() 方法后，控制台打印出：

```java
D:\environment\JDK1.8
mofan
```

> ApplicationEventPublisher 的使用
>

这种事件发布有点像微服务中使用的mq 但是这种事件发布默认是同步的，在单机应用中可以使用

定义事件类 UserRegisteredEvent：

```java
public class UserRegisteredEvent extends ApplicationEvent {
    private static final long serialVersionUID = 6319117283222183184L;

    public UserRegisteredEvent(Object source) {
        super(source);
    }

}
```

将 Component1 作为发送事件的 Bean：

```java

@Slf4j
@Component
public class Component1 {
    @Autowired
    private ApplicationEventPublisher context;

    public void register() {
        log.debug("用户注册");
        context.publishEvent(new UserRegisteredEvent(this));
    }

}
```

将 Component2 作为事件监听器：

```java
@Slf4j
@Component
public class Component2 {
    @EventListener
    public void aaa(UserRegisteredEvent event) {
        log.debug("{}", event);
        log.debug("发送短信");
    }
}
```

在 main() 方法中使用 Component1 发送事件：

```java
@SneakyThrows
@SuppressWarnings("unchecked")
public static void main(String[] args) {
    ConfigurableApplicationContext context = SpringApplication.run(A01Application.class, args);
    // --snip--

    context.getBean(Component1.class).register();
    context.close();

}
```

运行 main() 方法后，控制台打印出：

```java
indi.mofan.bean.a01.Component1      - 用户注册 
indi.mofan.bean.a01.Component2      - indi.mofan.bean.a01.UserRegisteredEvent[source=indi.mofan.bean.a01.Component1@25a5c7db] 
indi.mofan.bean.a01.Component2      - 发送短信 
```





# 2. 容器实现

