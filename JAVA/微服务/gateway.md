# gateway

![image-20241111131715354](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20241111131715354.png)



## 断言

判断路由的规则

```
server:
  port: 10010 # 网关端口
spring:
  application:
    name: gateway # 服务名称
  cloud:
    nacos:
      server-addr: localhost:8848 # nacos地址
    gateway:
      routes: # 网关路由配置
        - id: user-service # 路由id，自定义，只要唯一即可
          # uri: http://127.0.0.1:8081 # 路由的目标地址 http就是固定地址
          uri: lb://userservice # 路由的目标地址 lb就是负载均衡，后面跟服务名称
          predicates: # 路由断言，也就是判断请求是否符合路由规则的条件
            - Path=/user/** # 这个是按照路径匹配，只要以/user/开头就符合要求
```

spring提供了11种断言工厂：![image-20241111132034294](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20241111132034294.png)



## 路由过滤器

可以对进入网关中的请求和微服务返回的响应做处理

![image-20241111132519995](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20241111132519995.png)

那具体做出什么样的处理呢？

**Spring提供了31种不同的路由过滤器工厂。**例如 还有很多

![](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20241111132800847.png)

作用：配置在路由下的过滤器只对当前路由的请求生效

```
 spring:
  cloud:
    gateway:
      routes:
      - id: user-service 
        uri: lb://userservice 
        predicates: 
        - Path=/user/** 
        filters: # 过滤器
        - AddRequestHeader=Truth, helloworld # 添加请求头
```

### 默认过滤器

如果要对所有的路由都生效，则可以将过滤器工厂写到default下。格式如下：

```
spring:
  cloud:
    gateway:
      routes:
      - id: user-service 
        uri: lb://userservice 
        predicates: 
        - Path=/user/**
      default-filters: # 默认过滤项
      - AddRequestHeader=Truth, helloworld
```

### 全局过滤器 GlobalFilter

全局过滤器的作用也是处理一切进入网关的请求和微服务响应，与上面的作用相同

区别在于：之前的gatewayfilter 通过配置定义，处理逻辑是固定的，而GlobalFilter的逻辑需要自己写代码实现

定义方法是实现GlobalFilter 接口

```
	@Component
	public class MyGlobalFilter implements GlobalFilter, Ordered {
	
	    @Override
	    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
	        ServerHttpRequest request = exchange.getRequest();
	        System.out.println("Global Filter: " + request.getPath());
	        // 在此处添加你的过滤逻辑
	        return chain.filter(exchange); // 继续执行下一个过滤器
	    }
	
	    @Override
	    public int getOrder() {
	        return -1; // 自定义执行顺序 数值越小优先级越高
	    }
	}
```

### 过滤器的执行顺序

![image-20241111133826737](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20241111133826737.png)







## 网关的跨域问题

![image-20241111134020289](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20241111134020289.png)

网关处理跨域问题采用的童颜三个hicors方案，并且只需要简单配置

```
    gateway:
      # 。。。
      globalcors: # 全局的跨域处理
        add-to-simple-url-handler-mapping: true # 解决options请求被拦截问题
        corsConfigurations:
          '[/**]': // 是一个通配符配置，表示允许该配置应用于所有URL路径。它的作用是使跨域设置适用于所有请求路径，不论请求的具体路径是什么。
            allowedOriginPatterns: # 允许哪些网站的跨域请求
              - "*" //表示允许任意来源（所有域）进行跨域请求。
            allowedMethods: # 允许的跨域ajax的请求方式
              - "GET"
              - "POST"
              - "DELETE"
              - "PUT"
              - "OPTIONS"
            allowedHeaders: "*" # 允许在请求中携带的头信息
            allowCredentials: true # 是否允许携带cookie
            maxAge: 360000 # 这次跨域检测的有效期
```

