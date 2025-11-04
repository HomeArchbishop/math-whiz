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
│   │   └── interface/     # 类型定义
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

```bash
bun i

# 运行项目
bun dev

# 构建项目
bunx expo prebuild --clean
bun build
```

## 开发说明

### 代码规范

- 使用 TypeScript 进行类型检查
- 遵循 ESLint 和 Prettier 配置
- 组件使用函数式组件和 Hooks
- 使用 TypeScript 接口定义类型

### 国际化

多语言文件位于 `src/locales/` 目录，用 YAML 格式存储。运行时会自动生成 JSON 文件，用于在代码中使用。

### 主题系统

支持深色和浅色主题，主题配置位于 `src/theme/` 目录。

### API 接口

API 接口定义在 `src/common/api/` 目录，使用统一的 API 中心管理。
