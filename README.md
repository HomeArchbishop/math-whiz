# Math Whiz - 数学学习应用

## 📋 项目简介

Math Whiz 是一款面向小学生的数学练习应用，帮助孩子们通过日常练习提高数学能力。应用支持用户注册登录、每日数学练习、错题本管理、学习统计等功能。

## 🛠 技术栈

- **React Native** 0.81.5
- **Expo** ~54.0.20
- **Expo Router** ~6.0.13
- **React** 19.1.0
- **TypeScript** ~5.9.2

## 📁 项目结构

```
math-whiz/
├── app/                    # 路由页面（Expo Router）
│   ├── (tabs)/            # 底部标签页
│   │   ├── index.tsx      # 首页（重定向到学习页）
│   │   ├── study.tsx      # 学习页
│   │   └── me.tsx         # 个人中心页
│   ├── auth/              # 认证相关页面
│   │   ├── index.tsx      # 认证入口页
│   │   ├── login.tsx      # 登录页
│   │   └── signup.tsx     # 注册页
│   ├── exercise.tsx       # 练习页面
│   ├── result.tsx         # 结果页面
│   └── wrong-book.tsx     # 错题本页面
├── src/
│   ├── common/            # 公共模块
│   │   ├── api/           # API 接口定义
│   │   ├── components/    # 公共组件
│   │   ├── i18n/          # 国际化配置
│   │   └── interface/      # 类型定义
│   ├── core/              # 核心功能模块
│   │   ├── functional/    # 功能模块（API、异步等）
│   │   ├── request/       # 网络请求
│   │   └── storage/       # 存储管理
│   ├── pages/             # 页面组件
│   │   ├── auth-view/     # 认证视图
│   │   ├── exercise-view/  # 练习视图
│   │   ├── study-tab-view/ # 学习标签页视图
│   │   └── ...
│   ├── theme/             # 主题配置（深色/浅色）
│   └── locales/           # 多语言文件
├── assets/                # 静态资源
└── package.json           # 项目配置
```

## 快速开始

- Bun install

### 运行项目

```bash
# 开发模式（启动开发服务器）
bun dev
# 或
npm run dev

# iOS 模拟器
bun ios
# 或
npm run ios

# Android 模拟器/设备
bun android
# 或
npm run android

# Web 浏览器
bun web
# 或
npm run web
```

### 构建项目

```bash
# 生产构建
bun build
# 或
npm run build
```

## 🔧 开发说明

### 代码规范

- 使用 TypeScript 进行类型检查
- 遵循 ESLint 和 Prettier 配置
- 组件使用函数式组件和 Hooks
- 使用 TypeScript 接口定义类型

### 国际化

多语言文件位于 `src/locales/` 目录：
- `zh-cn.json` - 简体中文
- `en.json` - 英文

### 主题系统

支持深色和浅色主题，主题配置位于 `src/theme/` 目录。

### API 接口

API 接口定义在 `src/common/api/` 目录，使用统一的 API 中心管理。

## 📱 平台支持

- ✅ iOS
- ✅ Android
- ✅ Web（部分功能）

## ❓ 常见问题

### Android 构建失败 - Java 17 未安装

**问题描述**：在运行 `bun android` 或 `npm run android` 时，可能出现以下错误：
```
Cannot find a Java installation on your machine matching: {languageVersion=17, vendor=any vendor}
```

**解决方案**：

1. **使用 Homebrew 安装 Java 17（推荐）**：
   ```bash
   brew install --cask temurin@17
   ```

2. **手动安装 Java 17**：
   - 访问 [Eclipse Adoptium](https://adoptium.net/zh-CN/temurin/releases/?version=17)
   - 下载 macOS ARM64（Apple Silicon）或 x64（Intel）版本的 JDK 17
   - 安装后，验证安装：
     ```bash
     java -version
     # 应该显示 java version "17.x.x"
     ```

3. **配置 JAVA_HOME（如需要）**：
   ```bash
   # 对于 Apple Silicon Mac
   export JAVA_HOME=/Library/Java/JavaVirtualMachines/temurin-17.jdk/Contents/Home
   
   # 或添加到 ~/.zshrc 或 ~/.bash_profile
   echo 'export JAVA_HOME=/Library/Java/JavaVirtualMachines/temurin-17.jdk/Contents/Home' >> ~/.zshrc
   source ~/.zshrc
   ```

4. **验证安装**：
   ```bash
   java -version
   /usr/libexec/java_home -V
   ```

### Android 构建失败 - Gradle 依赖下载问题

**问题描述**：在运行 `bun android` 或 `npm run android` 时，可能出现以下错误：
```
Could not download kotlin-gradle-plugin-api-1.9.24-gradle82.jar
Remote host terminated the handshake
```

**解决方案**：

1. **使用国内镜像（推荐）**：
   在 `android/build.gradle` 中添加阿里云镜像：
   ```gradle
   buildscript {
       repositories {
           maven { url 'https://maven.aliyun.com/repository/google' }
           maven { url 'https://maven.aliyun.com/repository/central' }
           maven { url 'https://maven.aliyun.com/repository/gradle-plugin' }
           google()
           mavenCentral()
       }
   }
   ```

2. **清理 Gradle 缓存**：
   ```bash
   cd android
   ./gradlew clean
   cd ..
   ```

3. **检查网络连接**：
   确保能够访问 Maven 仓库，如果使用代理，请配置 Gradle 代理设置。

### iOS 构建问题

如果遇到 CocoaPods 相关错误：
```bash
cd ios
pod install
cd ..
```

### 依赖安装问题

如果使用 `npm` 安装依赖失败，建议使用 `bun`：
```bash
# 安装 Bun
curl -fsSL https://bun.sh/install | bash

# 使用 Bun 安装依赖
bun install
```

## 📄 许可证

详见 [LICENSE](LICENSE) 文件。

## 👥 开发团队

[在此添加团队成员信息]

---

**注意**：本项目为软件工程课程大作业，仅供学习和演示使用。

