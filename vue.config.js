const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    // index: {
    //   entry: './src/login.js',
    //   template: 'public/login.html',
    //   filename: 'login.html',
    //   title: 'login Page'
    // },
    login: {
      entry: './src/login.js',
      template: 'public/login.html',
      filename: 'login.html',
      title: 'login Page'
    },
    studentPortal: {
      entry: './src/student.js',
      template: 'public/student.html',
      filename: 'student.html',
      title: 'student portal'
    },
    teacherPortal: {
      entry: './src/teacher.js',
      template: 'public/teacher.html',
      filename: 'teacher.html',
      title: 'teacher portal'
    },
    adminPortal: {
      entry: './src/admin.js',
      template: 'public/admin.html',
      filename: 'admin.html',
      title: 'administration portal'
    },
  }
})
