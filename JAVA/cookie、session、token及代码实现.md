# Cookie、Session、Token请求响应鉴权

## 1. http协议

HTTP协议的无状态特性是其一个核心特点。

无状态（Stateless）指的是每个HTTP请求是独立的，服务器不会自动保留每个请求之间的上下文信息。也就是说，服务器在处理一个请求时，不会记住之前已经处理过的请求信息。

### 1.1 无状态的优点

- **简化服务器设计**：由于服务器不需要存储请求的状态信息，减少了服务器的复杂性。
- **增强可伸缩性**：可以轻松地将请求分发到不同的服务器（比如在负载均衡器的帮助下），因为每个请求都是独立的。
- **故障隔离**：某个请求失败不会影响其他请求。

### 1.2 无状态的缺点

- **需要额外机制管理状态**：在很多应用中，尤其是Web应用中，需要在不同请求之间保持用户的状态，比如用户登录状态、购物车内容等。这就需要额外的机制来管理状态。

###  1.3管理状态的常用方法 引出接下来的技术

尽管HTTP是无状态的，但通过以下几种方法可以在不同请求之间保持状态信息：

首先引出cookies

## 2. cookies

cookie就是小饼干 ，他不是主食，他是零食，我们真正传输的文件是正餐主食，夹带在head里面的东西就是小点心 小饼干

![image-20240621193912673](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20240621193912673.png)

工作流程：（这里的首次并不准确  在有公开接口的登录系统中，设置set-cookie字段 通常是在用户使用登录接口的时候，这是后端代码中写的  只有写了才会返回set-cookie）

 1.  在首次请求时没有什么不同

 2.  在首次响应的时候 ，除了返回首次请求所需要的文件外，还会在响应头中设置set-cookie 字段(格式是key=value形式的数据)返回

 3.  浏览器收到响应之后，如果浏览器发现在响应头中有set-cookie，那么浏览器会把set-cookie 字段(格式是key=value形式的数据)保存在浏览器里面。

     ​	在以后同一个域名发起的后续请求的时候，浏览器会在请求头的cookie字段里面带上之前首次响应头中的set-cookie 字段(格式是key=value形式的数据)的数据

​		当服务器要更新状态，同样的在后续的响应中可以再次通过响应头的set-cookie字段进行更新或者扩充

![image-20240621200019750](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20240621200019750.png)

缺点：明文存储，还可以拿到其他session的cookie 不安全



## 3. session

### 简介

session就像一通电话，从拨电话开始 直到把话说完 把电话挂掉

同样的 只有在后端代码中新建了httpsession对象之后 （在controller层方法的形参上只要有这个对象就会返回）后端才会返回session-id  后续的前端请求才会在请求头cookie中带上session-id访问。

对应到我们使用浏览器访问网站的时候，一个session就是打开网站，然后在这个网站里面跳转 最终把浏览器关掉。![image-20240622190501963](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20240622190501963.png)

如果我们把服务器很多状态信息 都以key-value的形式返回给浏览器 ，让浏览器以cookie的形式保存 。其实是泄露了我们很多后台管理的一些状态，因此引出session 来代替cookie 

代替方案： 服务器很多状态信息在服务器保存，并且将保存状态（session上下文）取个id，字段叫做session-id（Jsessionid子的就是sessionid，Tomcat中生成的就是叫做jsessionid。），通过cookie返回给浏览器，这样的话在浏览器上只会保存一个session-id，没有任何实质的key-value信息，很大程度避免了信息的泄露。

### session的缺点

![image-20240622191326328](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20240622191326328.png)

1. 服务器压力大：每个用户的session都存储在服务器上，如果并发用户非常多，会大幅增加服务器的内存占用和处理压力。
2. 无状态性：服务器端的session无法跨服务器同步，导致在分布式部署时会遇到很大的问题。
3. CSRF攻击：session容易受到跨站请求伪造（CSRF）攻击，因为攻击者可以通过用户的session来进行非法操作。
4. 性能问题：每次用户请求都需要查询session，这会增加处理时间。
5. session一致性问题：如果用户开启多个窗口或者标签页进行操作，session可能会出现一致性问题，如购物车问题。

## token

- json（**JavaScript Object Notation**）
- jwt（**JSON Web Token**）

web应用发展到了前后端分离 前后端数据交换大量使用json，前端的作用也越来越大，很多事情不是再由后端主导、浏览器层面帮着解决；而是前端后端一起来作用。

进而提出后端把需要保存的内容，不保存在服务器里(当然也可以保存一份)，把需要的上下文的一些状态（比如说用户id）打包成一个token，同时把这个token做加密，交给前端。

前端在需要的时候把这个token和请求一起发给后端，后端收到带着token的请求之后，可以把这个token解包，就可以看到token里面的内容。

但是由于前端拿到的token是加密打包签名的，前端无法解析，这样就解决了cookie的明文安全性问题，同时把信息都打包在token里面了，在分布式部署环境下，能很好解决session的跨服务器同步的问题

## 小结：

cookie已经被纳入了标准文档，是标准浏览器必须遵循的协议之一

token是前后端自己定义协商来完成的（请求头的字段啊过期验证等等）





# 前后端网络通讯过程

【【全栈】前后端网络通讯过程】https://www.bilibili.com/video/BV1gG411V7Jn?vd_source=d15f45e46bf4f3e6570a8baae2d38973





# springboot代码实现

## cookie的java代码实现 现在已经过时

这个示例展示了一个简单的基于 Cookie 的登录机制，不使用服务器端的 HttpSession。用户登录后，系统生成一个 Base64 编码的令牌并将其存储在 Cookie 中，以便在后续请求中进行身份验证。

```java
//AuthController中的登录接口

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public UserDTO login(@RequestParam String phone, @RequestParam String password, HttpServletResponse response) {
        UserDTO userDTO = authService.login(phone, password, response);
        if (userDTO == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);  //返回未授权页面
        }
        return userDTO;
    }
}

```

```java
//AuthService业务层

@Service
public class AuthService {

    @Autowired
    private UserService userService;

    public UserDTO login(String phone, String password, HttpServletResponse response) {
        User user = userService.findByPhone(phone);
        if (user != null && user.getPassword().equals(password)) {
            String token = Base64.getEncoder().encodeToString((phone + ":" + password).getBytes());
            Cookie cookie = new Cookie("auth", token); //new cookie
            cookie.setHttpOnly(true);
            cookie.setPath("/");
            response.addCookie(cookie); //添加到响应头中，只有访问login接口之后 给前端返回set-cookie字段
            UserDTO userDTO = new UserDTO();
            BeanUtils.copyProperties(user, userDTO);
            return userDTO;
        }
        return null;
    }
}
```

## session的java代码实现

当你将用户信息存储到session中时（例如，通过`HttpSession`对象），Servlet容器会自动创建一个包含session ID的cookie，并将其添加到响应头中。这个cookie的名称通常是`JSESSIONID`（但也可以配置为其他名称）。

session和cookie相互依靠

```java
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public UserDTO login(@RequestParam String phone, @RequestParam String password, HttpSession session) {
        UserDTO userDTO = authService.login(phone, password, session);
        if (userDTO == null) {
            throw new RuntimeException("Invalid login");
        }
        return userDTO;
    }

    @PostMapping("/logout")
    public void logout(HttpSession session) {
        authService.logout(session);
    }

    @GetMapping("/current-user")
    public UserDTO getCurrentUser(HttpSession session) {
        UserDTO userDTO = authService.getUserFromSession(session);
        if (userDTO == null) {
            throw new RuntimeException("No user logged in");
        }
        return userDTO;
    }
}
```

```java
@Service
public class AuthService {

    @Autowired
    private UserService userService;

    public UserDTO login(String phone, String password, HttpSession session) {
        User user = userService.findByPhone(phone);
        if (user != null && user.getPassword().equals(password)) {
            UserDTO userDTO = new UserDTO();
            BeanUtils.copyProperties(user, userDTO);
            session.setAttribute("user", userDTO); //添加session的字段
            return userDTO;
        }
        return null;
    }

    public void logout(HttpSession session) {
        session.invalidate();
    }

    public UserDTO getUserFromSession(HttpSession session) {
        return (UserDTO) session.getAttribute("user");
    }
}
```

### 解释

- **用户登录**: 用户提交手机号和密码到 `/auth/login` 端点。如果登录成功，后端在 `HttpSession` 中存储 `UserDTO` 对象，并自动将 `JSESSIONID` Cookie 返回给前端。（当用户调用登录接口成功后，服务器会创建一个新的 `HttpSession` 对象，并在响应中通过 `Set-Cookie` 头返回 `JSESSIONID`。）

  ​	对于公开接口，不需要进行会话管理，因此不会涉及到 `JSESSIONID` 的生成和返回。公开接口只需要处理请求并返回相应的数据。

- **获取当前用户**: 前端在后续请求中自动携带 `JSESSIONID` Cookie，后端根据 `HttpSession` 判断用户是否已登录，并返回当前用户信息。

- **注销**: 调用 `/auth/logout` 端点，后端销毁 `HttpSession`，使用户登出。

这样实现了基于 Cookie 和 HttpSession 的登录机制。用户登录成功后，后端将 `JSESSIONID` Cookie 返回给前端，前端在后续请求中自动携带这个 Cookie，后端根据 `HttpSession` 验证用户身份。





## 基于redis的短信登陆

自定义请求头字段 前端配合使用   参考黑马点评

## token的java代码实现

后续添加。
