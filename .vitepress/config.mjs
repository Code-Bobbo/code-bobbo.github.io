import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Bob的文档网站",
  description: "一个文档网站",
  base: '/', // 如果部署到 username.github.io，使用根路径
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Java', link: '/java' },
      { text: 'Spring', link: '/spring' },
      { text: '数据库', link: '/markdown-examples' },
      { text: '项目', link: '/markdown-examples' },
      { text: 'PVE', link: '/pve/' }, // 修改这里，指向pve目录
      { text: 'Docker', link: '/markdown-examples' },
      { text: 'K8S', link: '/markdown-examples' }
    ],

    // 添加搜索功能配置
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '重置搜索',
                backButtonTitle: '关闭搜索',
                noResultsText: '没有找到相关结果',
                footer: {
                  selectText: '选择',
                  selectKeyAriaLabel: '回车',
                  navigateText: '导航',
                  navigateUpKeyAriaLabel: '上箭头',
                  navigateDownKeyAriaLabel: '下箭头',
                  closeText: '关闭',
                  closeKeyAriaLabel: 'esc'
                }
              }
            }
          }
        }
      }
    },

    sidebar: {
      // 示例部分保留
      '/': [
        {
          text: 'Examples',
          items: [
            { text: 'Markdown Examples', link: '/markdown-examples' },
            { text: 'Runtime API Examples', link: '/api-examples' }
          ]
        }
      ],
      // 添加PVE侧边栏
      '/pve/': [
        {
          text: 'PVE',
          items: [
            { text: '1. 主机安装', link: '/pve/主机安装' },
            { text: '2. 系统配置', link: '/pve/系统配置' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Code-Bobbo' }
    ]
  }
})
