# maven教程

【一小时Maven教程】 https://www.bilibili.com/video/BV1uApMeWErY/?share_source=copy_web&vd_source=d15f45e46bf4f3e6570a8baae2d38973

【黑马程序员Maven全套教程，maven项目管理从基础到高级，Java项目开发必会管理工具maven】https://www.bilibili.com/video/BV1Ah411S7ZE?p=13&vd_source=d15f45e46bf4f3e6570a8baae2d38973

## 1. maven简介

### 1. 1 为什么要使用maven

maven是由阿帕奇软件基金会开源的自动化构建项目，主要是为了解决java项目中最常见的两个问题：依赖管理和项目构建。

- **依赖管理**：Java项目中会有很多的依赖库文件，这些库文件可能有很多的依赖关系，如果我们手动去下载这些依赖的话，不但非常的麻烦，而且不同的依赖版本之间可能会有冲突，这个时候就可以使用Maven来帮助我们管理这些依赖，我们需要做的就是在POM文件中告诉Maven我们需要哪些依赖，然后Maven就可以自动的将这个jar包，以及它所依赖的其他所有jar包全部都下载并导入到项目中，非常的方便。
- **构建管理**：在Java项目中，我们需要把Java的源文件编译成字节码文件，然后再把字节码文件打包成一个可执行的jar包或者war包，如果没有一个自动化的构建工具的话，这个过程就会非常的繁琐，而且容易出错，Maven提供了一个标准的项目结构和构建生命周期流程，只需要按照这个标准来组织项目，就可以非常轻松方便的构建Java项目。

> clean：清理生成的文件。
> validate：验证项目是否正确，所有必要信息是否可用。
> compile：编译源代码。
> test：使用单元测试框架运行测试。
> package：将编译好的代码打包成可分发的格式，如 JAR 或 WAR。
> verify：运行任何检查来验证包的有效性和质量。
> install：将包安装到本地仓库，以供本地项目使用。
> deploy：将最终的包复制到远程仓库，以供共享使用。

- **项目管理**：Maven提供了一个标准的项目结构和构建流程，只需要按照这个标准来组织项目，就可以非常轻松方便的构建Java项目。



### 1.2 Maven的核心概念及工作原理

Maven的核心概念是项目对象模型（Project Object Model，POM），它是一个XML文件，也是 Maven 项目的核心文件，定义了项目的配置、依赖、插件以及构建的过程。Maven读取pom.xml文件之后，会根据这个文件中定义的规则去下载依赖包，然后编译工程中的源代码，最后将工程打包成一个可执行的jar包或者war包，这个过程中会有很多的插件来帮助我们完成这些工作，比如说编译插件、打包插件、测试插件等等，这些插件都是Maven提供的，我们只需要在pom.xml文件中配置一下就可以了，Maven会自动的去执行这些插件，完成构建的过程。

### 1.3 Maven仓库

Maven中有一个仓库的概念，仓库简单来说就是指存放jar包的地方，按照作用范围的不同可以分为本地仓库、远程仓库和中央仓库。

- 本地仓库就是我们自己电脑上的一个目录，一般默认是在用户家目录(`$HOME`)下的`.m2`这个目录里面，这个位置可以在Maven的配置文件中修改（通常我们会进行修改）

	```xml
	<settings xmlns="http://maven.apache.org/SETTINGS/1.2.0"
	        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	        xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.2.0 https://maven.apache.org/xsd/settings-1.2.0.xsd">
	<!--
	 | The path to the local repository maven will use to store artifacts.
	 | Default: ${user.home}/.m2/repository
	-->
	<localRepository>/path/to/local/repo</localRepository>
	
	```

- 远程仓库也叫做私服仓库，一般是公司内部搭建的一个仓库，用来给公司内部的项目提供统一的依赖管理，这样就可以避免jar包的重复下载，而且也可以把一些公司内部发布的私有的jar包放到这个仓库里面，供其他项目来使用，一般由公司内部专门的运维人员来维护，最常用的搭建私服仓库的工具是 *[Nexus](https://help.sonatype.com/en/download.html)*，远程仓库并不是必须的，如果没有配置的话，Maven会直接去中央仓库中下载依赖。

- 中央仓库是Maven官方提供的一个仓库，里面包含了大量的开源项目，地址是 https://repo.maven.apache.org/maven2

> 注意，通常我们会配置阿里云镜像，在mirror标签中，本质上阿里云镜像就是一个私服仓库

## 2. 安装配置

### 2.1 安装配置JDK

Maven要求JDK版本至少在1.7以上，所以首先需要安装JDK，可以到[Oracle官网](https://www.oracle.com/java/technologies/downloads/)下载JDK，然后配置系统环境变量`JAVA_HOME`和`PATH`。

* Linux/Mac系统

```bash
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_291.jdk/Contents/Home
export PATH=$JAVA_HOME/bin:$PATH
```

* Windows系统

Windows系统下找到系统环境变量，添加`JAVA_HOME`和`PATH`，如下图所示：

找到系统属性中的环境变量：
`JAVA_HOME`和`PATH`，`JAVA_HOME`的值为`JDK`的安装路径，`PATH`中添加`%JAVA_HOME%\bin`

### 2.2 下载安装Maven

[官网下载地址](https://maven.apache.org/download.cgi)

配置系统环境变量`MAVEN_HOME`和`PATH`

### 2.3 系统环境变量配置

#### 2.3.1 Linux/Mac系统

根据使用的`Shell`不同，配置文件也不同，
可以使用`echo $SHELL`来查看当前使用的`Shell`，一般是`bash`或者`zsh`。
在`~/.bashrc`或者`~/.zshrc`文件中添加如下内容：

```bash
export MAVEN_HOME=/Users/yiny/soft/apache-maven-3.9.8
export PATH=$MAVEN_HOME/bin:$PATH
```

配置完成之后需要重启一下终端，或者使用`source ~/.bashrc`或者`source ~/.zshrc`来使配置生效。

#### 2.3.2 Windows 系统

Windows系统下找到系统环境变量，添加`MAVEN_HOME`和`PATH`。

### 2.4 配置镜像仓库和重写本地仓库

在setting文件中进行设置

由于中央仓库是部署在国外的服务器上，所以下载速度可能会比较慢，我们可以配置一个国内的镜像仓库来加速下载速度，比如阿里云的镜像仓库，配置方法如下：

```xml
<!-- settings.xml -->
<mirrors>
  <mirror>
    <id>aliyunmaven</id>
    <mirrorOf>*</mirrorOf> //哪些仓库需要使用这个镜像 *代表全部，会导致访问私服仓库有影响
    <name>阿里云公共仓库</name>
    <url>https://maven.aliyun.com/repository/public</url>
  </mirror>
</mirrors>
```

### 2.5 配置profile

maven 默认使用的版本是1.7，如果让maven默认使用我们安装的jdk版本的话，就需要在prfile中配置一下，但是我感觉没必要

使用 profiles 的主要目的是根据不同的构建环境或条件定制构建配置

```xml
<profiles>
    <profile>
        <id>jdk-1.8</id>
        <activation>
            <jdk>1.8</jdk>
        </activation>
        <properties>
            <maven.compiler.source>1.8</maven.compiler.source>
            <maven.compiler.target>1.8</maven.compiler.target>
        </properties>
    </profile>
</profiles>
```

配置好之后会在idea的maven栏显示![image-20241002201547513](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20241002201547513.png)



## 3. Maven工程的目录结构

Maven的工程目录结构是有一定的规范的，这样可以方便Maven来自动的构建项目，下面是一个标准的Maven工程目录结构：

```bash
project                     # 项目根目录
|-- src                     # 源代码目录
|   |-- main                # 主目录
|   |   |-- java            # Java源代码目录
|   |   |-- resources       # 资源文件目录
|   |   |-- webapp          # Web应用目录
|   |-- test                # 测试目录
|       |-- java            # 测试源代码目录
|       |-- resources       # 测试资源文件目录
|-- target                  # 项目构建目录
|-- pom.xml                 # 项目配置文件
```

例如：

![](https://neucms.com/img/20240805231706.png)

## 4. POM文件

POM文件是Maven项目的核心文件，它是一个XML文件，定义了项目的配置、依赖、插件以及构建的过程。

以下是一个简单的POM文件示例：

```xml
<project xmlns = "http://maven.apache.org/POM/4.0.0"
    xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation = "http://maven.apache.org/POM/4.0.0
    http://maven.apache.org/xsd/maven-4.0.0.xsd">

  <!-- 模型版本 -->
  <modelVersion>4.0.0</modelVersion>
  <!-- 公司或者组织的唯一标志，并且配置时生成的路径也是由此生成，
        如：com.companyname.project-group，
        maven会将该项目打成的jar包放本地路径：
        /com/companyname/project-group -->
  <groupId>com.companyname.project-group</groupId>

  <!-- 项目的唯一ID，一个groupId下面可能多个项目，就是靠artifactId来区分的 -->
  <artifactId>project</artifactId>

  <!-- 版本号 -->
  <version>1.0</version>

  <!-- 属性变量 -->
  <properties>
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
  </properties>

  <!-- 依赖 -->
  <dependencies>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-core</artifactId>
      <version>5.3.9</version>
    </dependency>
  </dependencies>

  <!-- 依赖管理 -->
  <dependencyManagement>
    <dependencies>
      <dependency>
          <groupId>org.springframework</groupId>
          <artifactId>spring-core</artifactId>
          <version>5.3.9</version>
      </dependency>
    </dependencies>
  </dependencyManagement>

  <!-- 仓库管理 -->
  <repositories>
    <repository>
        <id>central</id>
        <url>https://repo.maven.apache.org/maven2</url>
    </repository>
  </repositories>

  <!-- 构建 -->
  <build>
    <!-- 插件管理 -->
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>3.8.1</version>
        <configuration>
          <source>1.8</source>
          <target>1.8</target>
        </configuration>
      </plugin>
    </plugins>
  </build>

</project>
```

## 5. 构建生命周期

Maven提供了三种主要的生命周期：`Clean`、`Default`和`Site`

Default 包括的是除了Clean 和 Site 。

在同一个生命周期内，执行某个命令 会把该命令之前的命令都执行一遍。



> **Clean 生命周期**:
>
> - 主要用于清理项目构建产生的文件。
> - 包含的主要阶段有：
> 	- `pre-clean`: 进行清理之前的准备工作。
> 	- `clean`: 删除上一次构建生成的文件。
> 	- `post-clean`: 清理之后的后续工作。
>
> **Default 生命周期**:
>
> - 这是最常用的生命周期，用于处理项目的构建、测试、打包和安装。
> - 包含的主要阶段有：
> 	- `validate`: 从pom.xml文件中验证项目是否正确，并且所有必要的信息都可用。
> 	- `compile`: 编译源代码，生成class文件。
> 	- `test`: 使用适当的测试框架运行测试。
> 	- `package`: 打包编译后的代码到可分发的格式（如 JAR、WAR）。
> 	- `install`: 将包安装到本地仓库，以便其他项目使用。
> 	- `deploy`: 将包复制到远程私服仓库，以便共享。
>
> **Site 生命周期**:
>
> - 用于生成项目的站点文档和报告。
> - 包含的主要阶段有：
> 	- `pre-site`: 进行站点生成之前的准备工作。
> 	- `site`: 生成项目的站点文档。
> 	- `post-site`: 生成站点之后的后续工作。
> 	- `site-deploy`: 将生成的站点文档部署到远程服务器。

### 5.1 `Clean`：用于项目清理（`mvn clean`）

执行`clean`生命周期，会删除`target`目录下的所有文件，包括编译后的字节码文件、打包后的jar包、生成的站点等等。

```bash
mvn clean
```

### 5.2 `Default` ：用于项目部署

```
validate` => `compile` => `test` => `package` => `verify` => `install` => `deploy
```



| 阶段           | 处理     | 描述                                                     |
| -------------- | -------- | -------------------------------------------------------- |
| `mvn validate` | 验证项目 | 验证项目是否正确且所有必须信息是可用的                   |
| `mvn compile`  | 执行编译 | 源代码编译在此阶段完成                                   |
| `mvn test`     | 测试     | 使用适当的单元测试框架（例如JUnit）运行测试。            |
| `mvn package`  | 打包     | 将编译后的代码打包成可分发的格式，例如 JAR 或 WAR        |
| `mvn verify`   | 检查     | 对集成测试的结果进行检查，以保证质量达标                 |
| `mvn install`  | 安装     | 安装打包的项目到本地仓库，以供其他项目使用               |
| `mvn deploy`   | 部署     | 拷贝最终的工程包到远程仓库中，以共享给其他开发人员和工程 |

### 5.3 Site：用于生成项目站点

用于生成项目站点网站，包括项目的文档、报告、API文档等等。

```bash
# 生成站点文档
mvn site
# 部署站点文档
mvn site:deploy
```



### mvn命令小技巧

在mvn 后面可以跟上不同的生命周期阶段，常用的例如 mvn clean compile   , mvn clean package（也会执行同一周期之前的命令，只是这样更简洁），在很多cicd自动化构建脚本中 常使用这样的方式



### 5.4 插件命令

[maven常用插件详解](https://blog.csdn.net/weixin_43888891/article/details/130549878)

插件使用的两种类型：

一种插件是需要绑定到生命周期进行使用的，使用的时候需要引入到项目当中，然后将插件绑定到指定的生命周期，然后执行声明周期命令会自动调用该插件，例如：mvn clean、mvn install
		还有一部分插件可以脱离生命周期单独调用，也就是不需要引入到项目一样可以使用，直接通过如下命令可以直接调用插件。
		使用 Maven 命令执行插件的目标，语法如：mvn [插件名]:[目标名]
		例如，调用 maven-compiler-plugin 插件的 compile 目标，命令如：mvn compiler:compile（注意不能使用插件的全名，一定是缩写名，不然会报找不到插件）

Maven 内置了一些插件，这些插件会自动与特定的生命周期阶段关联。因此，即使在 `pom.xml` 中未明确声明，它们仍然可以使用。

> **默认插件**：Maven 自带了一些默认插件，如 `maven-compiler-plugin` 和 `maven-surefire-plugin`，它们在常见的构建过程中会被自动调用。
>
> **生命周期阶段**：Maven 有一套预定义的生命周期阶段（如 `compile`、`test`、`package` 等），这些阶段会自动触发相应的默认插件。如果没有指定，Maven 会使用这些插件的默认行为。
>
> **便于快速开始**：这种设计使得用户在创建新项目时，可以快速开始构建，而不必立即配置所有细节。对于简单项目，自动使用默认插件可以减少配置工作。
>
> **约定优于配置**：Maven 强调约定优于配置的原则，即通过默认设置减少用户的配置负担。

如果不在下图中这样自定义插件的配置项，只引入插件，Maven 会使用插件默认配置

<img src="https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20241002214357685.png" alt="image-20241002214357685" style="zoom: 33%;" />

> 自己思考：
>
> 在生命周期中选择某个阶段 会执行同一生命周期内的先前阶段，而阶段是由对应插件支撑的
>
> 但在插件栏直接使用插件  ，只会执行这个插件



## 6 . maven的坐标

Maven 的坐标是用来唯一标识一个项目（通常是一个依赖）在 Maven 仓库中的信息。每个 Maven 坐标由以下几个部分组成：

1. **`groupId`**:
	- 表示项目的组织或公司。通常是反向域名格式，例如 `com.example`。
2. **`artifactId`**:
	
	- 表示项目的名称或模块名。例如 `my-app`。
3. **`version`**:
	
	- 表示项目的版本号。例如 `1.0.0`。可以使用特定版本号、快照版本（如 `1.0-SNAPSHOT`）或范围版本。
4. **`packaging`** (可选): 用在当前项目的命名
	- 指定项目的打包类型，常见的有 `jar`、`war`、`pom` 等。默认值是 `jar`。
	- ![image-20241002210135023](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20241002210135023.png)

5. **scope** (可选): 可表示依赖的作用域。用在引入依赖坐标

	- 指定依赖的作用域，在接下来的依赖管理中引入

	![image-20241002210441891](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20241002210441891.png)

## 6. 依赖管理

### 6.1 依赖的范围

> - compile：**默认范围**，可省略不写。
> - provided：编译和测试时需要，但在运行时由外部环境提供。适用于如 Servlet API 这样的库，通常运行时由容器（如 Tomcat）提供。
> - runtime： 编译时不需要，但在运行时需要。适用于 JDBC 驱动程序等库。
>
> **编译时**：项目依赖于 JDBC 的接口，确保编译能够通过，因为接口在编译期可用。编译时只需要这些接口，因为代码中只需要知道如何调用这些方法，而不需要知道具体的实现细节。
>
> **运行时**：需要添加具体的 JDBC 驱动实现依赖，以确保应用程序能够在运行时正常连接和操作数据库。
>
> - test：只在测试阶段需要，不会包含在最终的构建包中。适用于 JUnit 等测试框架。
> - system：与 provided 类似，但需要在本地文件系统中指定路径，通常不推荐使用。
> - `import`：导入依赖的范围，导入其他pom文件中的依赖，但实际不会引入依赖。只是用来管理依赖的版本号，等后面父子工程时，详细讲解

![image-20241003191103309](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20241003191103309.png)

[理解 Maven 依赖范围及编译与运行时的需求](https://blog.csdn.net/weixin_54574094/article/details/141750653)

### 6.2 依赖的传递性

Maven会自动的解决依赖的传递性，比如说A依赖B，B依赖C，那么Maven会自动的将C也导入到A中，这样就不需要我们手动的去导入C了。
只有当依赖的范围是`compile`或者`runtime`的时候，依赖才会被传递，如果依赖的范围是`provided`或者`test`的时候，依赖是不会被传递的。


### 6.3 依赖的排除

有时候我们引入的依赖包中可能会包含一些我们不需要的依赖，
这个时候我们可以在引入的pom使用`<exclusions>`标签来排除这些依赖。

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-core</artifactId>
    <version>6.1.11</version>
    <exclusions>
        <exclusion>
            <groupId>org.springframework</groupId>
            <artifactId>spring-beans</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

也可以通过`<optional>`标签在导出的pom文件来指定依赖是否可选，如果依赖是可选的，那么在引入这个依赖的时候，可以不用引入这个依赖的依赖。

### 6.4 依赖的版本冲突

当通过依赖传递导入的两个依赖包版本不一致时，Maven会根据一定的规则来解决这个冲突，
一个是最短路径优先，另一个是先在pom中声明优先。

### 6.5 父子工程的依赖继承

Maven 的父子工程（Multi-module Project）是一种项目结构，允许将多个 Maven 子模块组织在一个父模块下。这样可以更好地管理大型项目中的多个模块。

**共享配置**：可以在父模块中定义通用的依赖、插件和属性，子模块可以继承这些配置，避免重复定义。

**统一管理**：通过父模块统一管理多个子模块的版本和构建过程，使得整个项目的一致性和可维护性更高。

**模块化开发**：将项目拆分为多个模块，便于团队协作和版本管理。

> 之前说到只有当依赖传递的范围是`compile`或者`runtime`的时候，依赖才会被传递，但在父子工程的依赖继承中，父工程定义了，就都会无条件继承到子工程中的。
>
> 但在实际的项目开发中，很少这样去做，会导致子模块和父模块之间的耦合度太高，无论子模块是否需要这个依赖，都会被强制继承。因此引出另外一个标签dependencyMangement.
>
> 在父模块中使用该标签管理依赖，在子模块中，需要手动引入依赖，但不需要指定版本了（父工程已经指定）
>
> 配合properties标签（用来定义公共的属性），写依赖的版本号
>
> ![image-20241003195311303](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20241003195311303.png)







## 7. Nexus私服仓库

Nexus是最常用的Maven私服仓库，可以用来存放公司内部的jar包，以及一些第三方的jar包，这样就可以避免重复下载，提高构建速度。

### 7.1 下载安装Nexus 

下载地址：[https://help.sonatype.com/en/download.html](https://help.sonatype.com/en/download.html)

### 7.2 安装配置Nexus

#### 7.2.1 直接解压安装

下载完成之后解压到本地，然后进入到解压后的目录，执行`bin/nexus run`命令，启动Nexus服务。

Linux或者Mac环境可以直接执行`bin/nexus run`命令来启动，
Windows环境可以执行`bin/nexus.bat run`命令来启动，
启动之后可以通过浏览器访问`http://localhost:8081`来访问Nexus的管理界面，
第一次登录会提示输入用户名和密码，
用户名默认是admin，
密码可以在`nexus-data/admin.password`文件中查看。

#### 7.2.1 使用Docker安装

* Mac (Apple Silicon)

```bash
docker pull klo2k/nexus3
docker run -d -p 8081:8081 --name nexus klo2k/nexus3
```

* Windows 和其他系统

```bash
docker run -d -p 8081:8081 --name nexus sonatype/nexus3
```

### 7.3 登录Nexus

第一次登录需要到配置文件中修改默认密码

```bash
docker exec -it nexus cat /nexus-data/admin.password
```

登录后修改即可

### 7.4 创建和管理仓库

登录之后，可以在左侧的`Repositories`菜单中创建仓库，
一般会创建四个仓库：

- `releases`：用来存放正式版本的jar包
- `snapshots`：用来存放快照版本的jar包
- `proxy`：代理中央仓库，用来缓存中央仓库的jar包
- `public`：用来发布jar包，组合了以上三种仓库


### 7.5 配置连接私服仓库

#### 7.5.1 修改Maven的settings.xml文件

修改`settings.xml`，配置私服仓库地址，
使得Maven可以从私服仓库中下载jar包。

```xml
<mirrors>
  <mirror>
    <id>maven-nexus</id>
    <mirrorOf>*</mirrorOf>
    <name>Nexus私服</name>
    <url>http://localhost:8081/repository/maven-public/</url>
  </mirror>
</mirrors>
```

如果Nexus中不允许匿名访问，需要在`settings.xml`中配置用户名和密码

```xml
<servers>
  <server>
    <id>maven-nexus</id>
    <username>admin</username>
    <password>admin</password>
  </server>
```

#### 7.5.2 修改项目的pom.xml配置

修改项目中的`pom.xml`文件，配置私服仓库地址，
使项目可以从私服仓库中下载jar包，或者上传jar包到私服仓库中。

```xml
<!-- 发布管理 -->
<distributionManagement>
  <!-- 正式版本 -->
  <repository>
    <id>maven-nexus</id>
    <name>Project Releases Repositories</name>
    <url>http://localhost:8081/repository/maven-releases/</url>
  </repository>
  <!-- 快照版本 -->
  <snapshotRepository>
    <id>maven-nexus</id>
    <name>Project Snapshots Repositories</name>
    <url>http://localhost:8081/repository/maven-snapshots/</url>
  </snapshotRepository>
</distributionManagement>
```

注意：这里的id要和settings.xml中的id一致

### 7.6 上传jar包到私服仓库

执行一个`mvn deploy`命令，就可以将jar包上传到私服仓库中，
上传之后在Nexus的管理界面中就可以看到对应的jar包。