import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaInfoCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import ScrollReveal from './ScrollReveal';
import AnimatedCard from './AnimatedCard';
import ProjectDetail, { ProjectDetails } from './ProjectDetail';

// 项目列表数据
const projectsData: ProjectDetails[] = [
  {
    id: 'medimate',
    title: 'MediMate',
    category: 'React',
    description: 'A pharmacy management system built with React and Redux',
    longDescription: 'MediMate is a comprehensive pharmacy management system that helps pharmacists manage inventory, prescriptions, and customer data efficiently. It features a responsive interface, real-time inventory tracking, and prescription management.',
    image: 'https://via.placeholder.com/600x400?text=MediMate',
    demoLink: 'https://example.com/demo',
    githubLink: 'https://github.com/YourUsername/medimate',
    date: '2023-2024',
    features: [
      '药物库存管理和跟踪',
      '处方生成和管理',
      '客户档案和历史记录',
      '自动补货提醒系统',
      '销售报告和分析'
    ],
    technologies: ['React', 'Redux', 'TypeScript', 'Material UI', 'Firebase'],
    screenshots: [
      'https://via.placeholder.com/600x400?text=MediMate+Dashboard',
      'https://via.placeholder.com/600x400?text=MediMate+Inventory',
      'https://via.placeholder.com/600x400?text=MediMate+Prescriptions'
    ]
  },
  {
    id: 'musichat',
    title: 'Musichat',
    category: 'Full Stack',
    description: 'A music streaming platform with social features built on the MERN stack',
    longDescription: 'Musichat is a music streaming platform that combines social networking features with music streaming. Users can create playlists, follow other users, comment on songs, and share their favorite music with friends.',
    image: 'https://via.placeholder.com/600x400?text=Musichat',
    demoLink: 'https://example.com/musichat',
    githubLink: 'https://github.com/YourUsername/musichat',
    date: '2022-2023',
    features: [
      '音乐流媒体播放',
      '创建和分享播放列表',
      '社交网络功能',
      '歌曲评论和点赞',
      '个性化推荐算法'
    ],
    technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'Socket.io', 'AWS S3'],
    screenshots: [
      'https://via.placeholder.com/600x400?text=Musichat+Home',
      'https://via.placeholder.com/600x400?text=Musichat+Player',
      'https://via.placeholder.com/600x400?text=Musichat+Profile'
    ]
  },
  {
    id: 'portfolio',
    title: 'Personal Portfolio',
    category: 'Frontend',
    description: 'A responsive personal portfolio website built with React and Tailwind CSS',
    longDescription: 'This personal portfolio website showcases my skills, projects, and experience as a frontend developer. It features a modern, responsive design with smooth animations and is built using React and Tailwind CSS.',
    image: 'https://via.placeholder.com/600x400?text=Portfolio',
    demoLink: 'https://portfolio-zbxl-clone-fork.same-app.com',
    githubLink: 'https://github.com/YourUsername/portfolio',
    date: '2024',
    features: [
      '响应式设计，适配各种设备',
      '深色/浅色模式切换',
      '多语言支持',
      'AI聊天助手',
      '动态项目展示'
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'i18next']
  }
];

const Projects = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);
  const [filteredProjects, setFilteredProjects] = useState<ProjectDetails[]>(projectsData);

  // 过滤器分类
  const categories = [
    { id: 'all', name: t('projects.all') },
    { id: 'React', name: t('projects.react') },
    { id: 'Frontend', name: t('projects.frontend') },
    { id: 'Full Stack', name: t('projects.fullstack') }
  ];

  // 当选择的分类变化时，更新筛选后的项目
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProjects(projectsData);
    } else {
      setFilteredProjects(
        projectsData.filter(project => project.category === selectedCategory)
      );
    }
  }, [selectedCategory]);

  // 打开项目详情
  const openProjectDetail = (project: ProjectDetails) => {
    setSelectedProject(project);
    // 阻止背景滚动
    document.body.style.overflow = 'hidden';
  };

  // 关闭项目详情
  const closeProjectDetail = () => {
    setSelectedProject(null);
    // 恢复背景滚动
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="projects" className="py-20 bg-background-light dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text dark:text-white text-center">
            {t('projects.title')}
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-12"></div>
        </ScrollReveal>

        {/* 分类过滤器 */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap justify-center mb-12 gap-3">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${selectedCategory === category.id
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-background dark:bg-gray-700 text-text-light dark:text-gray-300 hover:bg-background-dark dark:hover:bg-gray-600'
                  }
                `}
              >
                {category.name}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* 项目网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <AnimatedCard delay={index * 0.1}>
                  <div className="h-full flex flex-col">
                    {/* 项目图片 */}
                    <div className="relative group overflow-hidden rounded-t-lg">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover object-center transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                        {project.demoLink && (
                          <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white bg-primary hover:bg-primary-light p-3 rounded-full transition-colors duration-300"
                            aria-label={`View ${project.title} demo`}
                          >
                            <FaExternalLinkAlt />
                          </a>
                        )}
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors duration-300"
                            aria-label={`View ${project.title} code`}
                          >
                            <FaGithub />
                          </a>
                        )}
                        <button
                          onClick={() => openProjectDetail(project)}
                          className="text-white bg-blue-600 hover:bg-blue-500 p-3 rounded-full transition-colors duration-300"
                          aria-label={`View ${project.title} details`}
                        >
                          <FaInfoCircle />
                        </button>
                      </div>
                    </div>

                    {/* 项目内容 */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-text dark:text-white">{project.title}</h3>
                        <span className="text-xs bg-background-dark dark:bg-gray-700 text-text-light dark:text-gray-300 px-2 py-1 rounded-full">
                          {project.category}
                        </span>
                      </div>
                      <p className="text-text-light dark:text-gray-400 mb-4 flex-1">{project.description}</p>
                      <button
                        onClick={() => openProjectDetail(project)}
                        className="text-primary hover:text-primary-light transition-colors duration-300 font-medium flex items-center"
                      >
                        {t('projectDetail.viewDetails', 'View Details')}
                        <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </AnimatedCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 项目详情弹窗 */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectDetail
              project={selectedProject}
              onClose={closeProjectDetail}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
