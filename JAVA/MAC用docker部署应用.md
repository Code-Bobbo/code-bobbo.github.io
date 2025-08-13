# mac用docker部署应用

## 1. 安装orbstack



https://orbstack.dev/

```bash
//配置文件目录
cd ~/.orbstack/config/
```





## 2. 常用docker命令

```bash
查找docker镜像
docker search [image-name]
查看所有的docker镜像
docker images
查看所有的容器
docker ps -a
删除docker镜像
docker rmi [image-name]
删除docker容器
docker rm [container-name]
启动/停止/重启容器
\# 启动一个或多个已经被停止的容器
docker start [container-name]
\# 停止一个运行中的容器
docker stop [container-name]
\# 重启容器
docker restart [container-name]
在容器中开启一个交互模式的终端
docker exec -it [container-name] /bin/bash
跟踪日志输出
docker logs -f [container-name]
查看容器的信息
docker inspect [container-name]
查看所有的数据卷
docker volume ls
查看数据卷的信息
docker volume inspect [volume-name]
更新容器配置
docker update [options] [container-name]
```



## 3. 部署mysql

要先创建两个数据卷,不提前创建也可以，启动命令会自动创建。但是配置文件就拖不进去了。

```bash
docker volume create mysql_data

docker volume create mysql_conf
```



mysql配置文件 my.cnf  ,并且拖到上面的conf数据卷里

```bash
[mysqld]
character-set-server=utf8
max_connections=1000
[client]
default-character-set=utf8
[mysql]
default-character-set=utf8
```

 

启动mysql

```bash
docker run -p 3306:3306 \
 --name mysql \
 -v mysql_data:/var/lib/mysql \
 -v mysql_conf:/etc/mysql/conf.d \
 --privileged=true \
 -e MYSQL_ROOT_PASSWORD=123456 \
 -d arm64v8/mysql
```



## 4. 部署redis

```bash
docker run -p 6379:6379 \
--name redis \
-v redis_data:/data \
-v redis_conf:/etc/redis/redis.conf \
-d arm64v8/redis \
redis-server /etc/redis/redis.conf
```



## 5. 部署nacos

```bash
docker run -p 8848:8848 \
--name nacos \
--env MODE=standalone \
-d nacos/nacos-server:v2.3.0-slim
```



## 6. 部署nginx

```bash
# 需要通过host.docker.internal或者设置host模式来访问宿主机
docker run -p 8801:8801 \
-p 8802:8802 \
--name nginx \
-v nginx_data:/home \
-v nginx_conf:/etc/nginx \
-e TZ='Asia/Shanghai' \
-d arm64v8/nginx
```



## 7. 部署minio

```bash
# 9000 java代码访问端口 9001浏览器访问端口
docker run -p 9000:9000 \
-p 9001:9001 \
--name minio \
-e "MINIO_ACCESS_KEY=minio" \
-e "MINIO_SECRET_KEY=minio123" \
-v minio_data:/data \
-v minio_conf:/root/.minio \
-d minio/minio \
server /data --console-address ":9001"
```



## 8. 部署zookeeper

```bash
docker run -p 2181:2181 \
--name zookeeper \
-d arm64v8/zookeeper
```



## 9. 部署kafka

```bash
docker run -p 9092:9092 \
--name kafka \
-e KAFKA_BROKER_ID=0 \
-e KAFKA_ZOOKEEPER_CONNECT=host.docker.internal:2181/kafka \
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://host.docker.internal:9092 \
-e KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092 \
-d bitnami/kafka
```



## 10. 部署xxl-job

```bash
docker run -p 7397:8080 \
--name xxl-job-admin \
-e PARAMS="--spring.datasource.url=jdbc:mysql://host.docker.internal/xxl_job?useUnicode=true&characterEncoding=UTF-8&autoReconnect=true&useSSL=false&zeroDateTimeBehavior=convertToNull --spring.datasource.username=root --spring.datasource.password=123456 " \
-d h295203236/xxl-job-admin:2.3.0-aarch64
```



# 11. 部署rabbitmq

```bash
docker run -p 5672:5672 \
-p 15672:15672 \
--name rabbitmq \
-e RABBITMQ_DEFAULT_USER=admin \
-e RABBITMQ_DEFAULT_PASS=admin \
-v rabbitmq:/etc/rabbitmq \
-d arm64v8/rabbitmq
```

