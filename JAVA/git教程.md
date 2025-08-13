# git教程



【Git 精简教程，从入门到真的精通 #86】https://www.bilibili.com/video/BV1ky4y1M7HC?p=2&vd_source=d15f45e46bf4f3e6570a8baae2d38973

## 1. 安装与配置

直接去官网安装即可

### 配置

git的配置是有级别的，分为：

​		本地配置 local （.git/config）在当前项目的目录下

​		全局配置 global（当前用户bob）  (~/.gitconfig)

​		系统配置system (所有在用电脑的用户，bob amy 等等)(/etc/gitconfig)

> 如果本地配置和全局配置都设置了不同的用户名，最终生效的是本地配置。也就是说，局部配置优先于全局配置.
>
> 局部配置优先于全局配置，全球配置优先于系统配置。这意味着，如果在本地、全局或系统级别都有设置，局部配置会生效。

配置项都是key value形式的

```shell
//一些有用的配置
git config --local user.name bob    //本地配置

git config --global user.email 123@qq.com    //全局配置

git config --global core.ignorecase true   //忽略大小写，默认在mac和win 下对大小写不敏感，通常用在大小写同名文件上
git config --global core.ignorecase false //区分大小写  在linux下 默认区分大小写 
```



## 2. 命令实操

### git status

用这个命令来查看当前文件夹的git信息

![image-20240925210415702](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20240925210415702.png)

![image-20240925210227530](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20240925210227530.png)

当显示上图，不是一个仓库是，引入下面的这个命令 git init



### git init

初始化git 本地仓库，使本地文件夹与git产生关联

再使用git status 查看确认

![image-20240925210648635](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20240925210648635.png)

图片中写道：没有东西要提交，创建或者复制文件 然后使用 git add 命令来追踪(实际上是添加到暂存区)

引入 git add

### git add

创建了index.html 并且vim 编辑了之后

使用git add index.html 让该文件 加入暂存区，或者使用 git add . (.代表当前目录下的所有变更 都要加入暂存区)

![image-20240925212201932](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20240925212201932.png)

> 图片中引出如果想要撤出暂存区
>
> 使用 git rm --cached index.html 来撤出暂存区



但是我想提交到本地仓库

### git commit

提交暂存区内的更改到本地仓库

-m 代表备注

![image-20240925212605170](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20240925212605170.png)

-a 将工作目录的更改直接提交到本地仓库



### git diff

这时vim编辑一下index.html

使用git diff index.html

展示的时当前本地变更（更改但还没被提交的） 和本地仓库的最新提交之间的差异

减号代表的时仓库的最新提交

加号代表的是本地变更

![image-20240925213010197](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20240925213010197.png)

另外一种用法

如果暂存区有未提交的相关更改，那么使用git diff index.html命令，对比的是：

当前本地修改和暂存区的更改 之间的差异

![image-20240925214356142](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20240925214356142.png)

想要对比暂存区和本地仓库的差异，需要使用

git diff --cached index.html

![image-20240925214713740](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20240925214713740.png)

此外还有很多用法。



### git log

git commit 提交记录

![image-20240925214907242](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20240925214907242.png)







### git rm

用于从工作目录和暂存区（staging area）中移除文件的一个命令

删除的文件必须被提交过，才可以使用这个命令，否则会提示找不到该文件。

**从工作目录和暂存区中移除文件**：(真正的物理删除)

git rm -f index.html

这个命令会从你的工作目录和暂存区中移除指定的文件。如果文件已经被修改过（即，与暂存区中的版本不同），Git 会要求你确认是否真的要删除它。

**仅从暂存区中移除文件，但保留在工作目录中**：（文件从 Git 的版本控制中移除，但并不从文件系统中删除文件）

git rm --cached index.html

这个命令对于处理一些不应该被版本控制的文件（如编译生成的文件或敏感的配置文件）特别有用。



完成删除操作后，使用commit命令提交这次操作，省去了暂存区的操作

> git rm 和rm 命令的对比
>
> ### 1. 使用 `rm` 然后 `git add`
>
> - 步骤
>
> 	：
>
> 	1. `rm filename`：在文件系统中删除文件。
> 	2. `git add filename`：试图将已删除的文件添加到暂存区。
>
> - **效果**：运行 `git add` 后，Git 会认为你在添加一个新文件，但因为该文件已经在文件系统中不存在，所以它实际上会将文件标记为“未追踪”的状态。
>
> ### 2. 使用 `git rm`
>
> - 步骤
>
> 	：
>
> 	1. `git rm filename`：同时在文件系统中删除文件，并通知 Git 这个文件已被删除。
>
> - **效果**：Git 会正确标记该文件为已删除，并将这一变更添加到暂存区。在下一次提交时，Git 会记录这个删除操作。
>
> ### 总结
>
> - **`rm` + `git add`**：Git 可能会将删除的文件标记为未追踪状态，而不是作为删除操作。
> - **`git rm`**：Git 明确记录文件的删除，保持版本控制的准确性。
>
> 因此，使用 `git rm` 是处理文件删除时的推荐做法。







### git mv

重命名操作

也就是说这个命令会把文件重命名 并且把新文件名加入暂存区，让git追踪，然后就可以接git commit提交。(省一步git add 操作，跟git rm 意思差不多)

和mv相比，先mv index.html index_new.html  然后git add . 将该操作加入暂存区，然后git commit 提交

> 使用 `git mv` 和 `mv` 之间的区别主要在于 Git 如何处理文件的重命名操作。
>
> ### 1. 使用 `mv` 命令
>
> - 步骤
>
> 	：
>
> 	1. `mv old_filename new_filename`：在文件系统中将文件重命名。
>
> - **效果**：Git 不会自动识别这个重命名操作。你需要手动运行 `git add new_filename` 和 `git rm old_filename`，才能更新 Git 的状态。这意味着 Git 会将旧文件标记为未追踪，可能导致状态不一致。
>
> ### 2. 使用 `git mv` 命令
>
> - 步骤
>
> 	：
>
> 	1. `git mv old_filename new_filename`：同时在文件系统中重命名文件，并通知 Git 这个文件的重命名。
>
> - **效果**：Git 会自动将旧文件标记为删除，同时将新文件添加到暂存区。这确保了在下次提交时，重命名操作会被正确记录。
>
> ### 总结
>
> - **`mv`**：仅在文件系统中操作，Git 不会知晓变化，需手动更新。
> - **`git mv`**：在文件系统和 Git 中同步更新，保持版本控制的一致性。
>
> 因此，推荐使用 `git mv` 来处理文件的重命名，以确保 Git 正确追踪该操作。



Git 的工作方式是基于快照（snapshot），这意味着它在每次提交时记录整个项目的状态，而不是实时跟踪文件的变化。因此当rm mv（这两个命令都会使源文件消失）时，git并不会实时追踪到。

为了保证为了确保 Git 追踪到文件的消失，建议始终使用 `git rm/git mv`。这样可以保持版本控制的准确性，避免文件意外丢失或未记录的删除。



## 3. 远程仓库管理

【Git 精简教程，从入门到真的精通 #86】https://www.bilibili.com/video/BV1ky4y1M7HC?p=5&vd_source=d15f45e46bf4f3e6570a8baae2d38973





在本地想要推送代码给远程仓库是，要先pull一下远程仓库，再push代码

保证团队开发时没有冲突







## 4. git工作流

![image-20240926175500330](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20240926175500330.png)

## 5. git branch &git tag

### 分支管理

```shell
	//查看本地分支
  git branch
  
  //查看所有分支（本地+远程）
  git branch -a
  
  //查看所有远程分支
  git branch -r
  
  //删除本地库
  git branch -d dev分支名
  
  //新建分支并切换
 git checkout -b dev1 
 
 //切换到dev分支
 git checkout dev 
 
```



### tag管理

Git Tag是给某个特定的提交（commit）打上一个标签，用于标记重要的节点。通常用于发布版本、里程碑或者特定的稳定点。它是一个指向某个具体提交的指针，不会随着代码的进一步开发而移动，相当于对某个特定时间点的快照进行了命名。

```shell
//列出所有tag
git tag

//新建tag 指向cmmit
git tag v1.0 dbakhdk1

//新建tag在当前的commit
git tag v2.0(名字)

//查看某个tag信息
git show tag(名字)
```



## 6. merge rebase

在Git中，合并分支是将一个分支的修改合并到另一个分支中，以便保持代码的同步和一致性。有两种常用的方法来合并分支：合并和变基。

方法一：合并（Merge）
合并（Merge）是将另一个分支的代码合并到当前分支的操作。合并分支的步骤如下：

1. 首先，确保你处于你想要合并的目标分支上。通过使用`git branch`命令可以查看当前所在的分支，然后使用`git checkout`命令切换到目标分支上。
2. 执行`git merge`命令，将另一个分支合并到当前分支。例如，如果你想要将分支feature合并到主分支上，可以执行以下命令：`git merge feature`。
3. Git会尝试自动合并两个分支的代码，如果存在冲突，Git会提示你手动解决冲突。打开有冲突的文件，手动修改并保存。
4. 解决冲突后，使用`git add`命令将修改后的文件标记为已解决状态。
5. 最后，使用`git commit`命令提交合并后的代码。



方法二：变基（Rebase）
变基（Rebase）是将一个分支的修改应用到另一个分支上的操作。变基可以将一系列的提交合并成一次提交，使提交历史更加简洁和线性。与合并不同，变基会改变提交历史。变基分支的步骤如下：

1. 首先，确保你处于你想要变基的分支上。通过使用`git branch`命令可以查看当前所在的分支，然后使用`git checkout`命令切换到变基分支上。
2. 执行`git rebase`命令，将目标分支合并到当前分支上。例如，如果你想在feature分支上变基到主分支上，可以执行以下命令：`git rebase master`。
3. Git会将变基分支的提交应用到目标分支上，并自动解决冲突。如果存在冲突，Git会提示你手动解决冲突。打开有冲突的文件，手动修改并保存。
4. 解决冲突后，使用`git add`命令将修改后的文件标记为已解决状态。
5. 最后，使用`git rebase –continue`命令继续执行变基操作。

> 注意：
>
> ​	当你想变基的时候，在两个分支的任意一个都可以，因为变基会使两条分支变成一条分支
>
> 但是分支上的提交节点先后顺序会不一样，这是由于rebase的机制导致的。比如说main和dev
>
> 在git中每个分支都有一个指针，指向当前分支的最新提交记录，而在执行rebase操作时，git会先找到当前分支（下图中的当前分支是main）与目标分支（下图是dev）的共同祖先
>
> ![image-20240927095815324](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20240927095815324.png)
>
> ![image-20240927095646988](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20240927095646988.png)
>
> 再把当前分支上从共同祖先到最新提交记录的所有提交，都移动到目标分支的最新提交后面
>
> ![image-20240927095955121](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20240927095955121.png)









> 当切换到dev，使用git rebase main 时，
>
> ![image-20240927094801932](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20240927094801932.png)
>
> ![image-20240927094834333](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20240927094834333.png)
>
> 
>
> 当切换到main分支，使用git rebase dev 时，
>
> ![image-20240927095155358](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20240927095155358.png)
>
> ![image-20240927095228753](https://bobbo.oss-cn-beijing.aliyuncs.com/img_for_typora/image-20240927095228753.png)

