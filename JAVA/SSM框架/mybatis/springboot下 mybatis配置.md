在 Spring Boot 中，MyBatis 的配置文件大大简化了，因为 Spring Boot 会自动配置数据源、MyBatis 等组件。你只需要在 `application.yml` 或 `application.properties` 文件中配置数据库相关的信息，MyBatis 的 XML 配置可以通过注解或更简化的方式实现。

以下是一个典型的 Spring Boot 中使用 MyBatis 的配置示例：

### 1. `application.yml` 配置文件：

```yml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/mybatis
    username: root
    password: XDP

mybatis:
  mapper-locations: classpath:mapper/*.xml
  type-aliases-package: com.example.demo.model
  //它用于指定一个包路径，在这个包路径下的所有类都可以作为 MyBatis 的别名（type aliases），不需要在 MyBatis 映射xml文件中写全类名。
```

### 2. `Mapper` 接口：

在 Spring Boot 中，你可以直接使用注解或通过 `@Mapper` 注解来自动扫描并注册你的 `Mapper` 类。例如：

```java
package com.example.demo.mapper;

import com.example.demo.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UserMapper {

    @Select("SELECT * FROM user WHERE id = #{id}")
    User findById(int id);
}
```

### 3. `Mapper` XML 文件（如果需要使用 XML 配置）：

假设你还是想使用 XML 文件来配置 SQL 语句，`mapper` 文件路径在 `application.yml` 中已经指定：

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
    PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
    "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.example.demo.mapper.UserMapper">
    <select id="findById" parameterType="int" resultType="com.example.demo.model.User">
        SELECT * FROM user WHERE id = #{id}
    </select>
</mapper>
```

### 总结：

- Spring Boot 自动配置了数据源，你只需要在 `application.yml` 或 `application.properties` 中定义数据库的连接信息。
- MyBatis 的 `Mapper` 接口可以直接用注解或者通过 XML 文件定义 SQL 查询。
- `@Mapper` 注解自动扫描并注册 `Mapper`，无需手动在 XML 中指定。