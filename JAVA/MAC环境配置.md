# MAC环境配置



## 1. 安装homebrew

```bash

bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

```



## 2. 安装oh-my-zsh

```bash
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

安装zsh-syntax-highlighting和zsh-autosuggestions插件

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

打开本地的zsh配置文件 ,是隐藏文件，可以在访达中使用快捷键 command+shift+. 显示

```bash
plugins=(git zsh-syntax-highlighting zsh-autosuggestions)
```



## 3. 安装item2

https://iterm2.com/



## 4. 安装jdk

https://www.oracle.com/java/technologies/downloads/#java8-mac

打开本地的zsh配置文件

```bash
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-1.8.jdk/Contents/Home
export PATH=$PATH:$JAVA_HOME/bin
```



## 5. 安装maven

https://maven.apache.org/download.cgi

打开本地的zsh配置文件

```bash
export MAVEN_HOME=/Users/bob/devTools/apache-maven-3.9.6
export PATH=$PATH:$MAVEN_HOME/bin
```

修改settings.xml

```bash
<localRepository>/Users/bob/devTools/maven-repository</localRepository>
```

```bash
<mirror>
  <id>aliyunmaven</id>
  <mirrorOf>*</mirrorOf>
  <name>阿里云公共仓库</name>
  <url>https://maven.aliyun.com/repository/public</url>
</mirror>
```

```bash
<profile>
  <id>jdk-1.8</id>
  <activation>
    <activeByDefault>true</activeByDefault>
    <jdk>1.8</jdk>
  </activation>

  <properties>
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
    <maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>
  </properties>
</profile>
```
配置git

```bash
git config --global user.name "bob"
git config --global user.email "123@qq.com"
```


## 6. 安装go

https://go.dev/dl/

打开本地的zsh配置文件

go-path中新建bin, pkg, src三个目录

```bash
export GOROOT=/usr/local/go
export GOPATH=/Users/bob/devTools/go-path
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin
```

终端中执行

```bash
go env -w GOPROXY=https://goproxy.cn,direct
go env -w GO111MODULE=on
```

