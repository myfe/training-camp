const baseUrl = '/trainingcamp';

export const sideNav = [
  {
    key: 'learning materials',
    title: '学习资料',
    icon: 'icon-list-block',
    link: `${baseUrl}/learnmaterials`,
    children: [],
  }, {
    key: 'exercise',
    title: '习题',
    icon: 'icon-list-block',
    children: [
      {
        key: '/exercise/one',
        title: '图片拖拽上传',
        icon: 'bars',
        link: `${baseUrl}/exercise/one`,
      }, {
        key: '/exercise/two',
        title: '评论组件',
        icon: 'bars',
        link: `${baseUrl}/exercise/two`,
      }
    ],
  },
];
export const project = {
  home: `${baseUrl}/home`,
  subTitle: '训练营'
};
