import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaJs, FaHtml5, FaCss3Alt, FaNodeJs, FaGitAlt, FaDocker, FaJava, FaPython } from 'react-icons/fa';
import { TbBrandCSharp } from "react-icons/tb";
import { SiTypescript, SiTailwindcss, SiRedux, SiExpress, SiMongodb, SiMysql, SiAmazon, SiSpring } from 'react-icons/si';
import { useTranslation } from 'react-i18next';
import ScrollReveal from './ScrollReveal';
import AnimatedIcon from './AnimatedIcon';

const Skills = () => {
  const { t } = useTranslation();
  const [currentCategory, setCurrentCategory] = useState<string>('frontend');

  // 技能分类
  const categories = [
    { id: 'frontend', name: t('skills.frontend') },
    { id: 'backend', name: t('skills.backend') },
    { id: 'frameworks', name: t('skills.frameworks') },
    { id: 'tools', name: t('skills.tools') }
  ];

  // 前端技能图标
  const frontendSkills = [
    { icon: <FaReact size={40} />, name: 'React' },
    { icon: <FaJs size={40} />, name: 'JavaScript' },
    { icon: <FaHtml5 size={40} />, name: 'HTML5' },
    { icon: <FaCss3Alt size={40} />, name: 'CSS3' },
    { icon: <SiTypescript size={40} />, name: 'TypeScript' }
  ];

  // 后端技能图标
  const backendSkills = [
    { icon: <FaJava size={40} />, name: 'Java' },
    { icon: <FaPython size={40} />, name: 'Python' },
    { icon: <TbBrandCSharp size={40} />, name: 'C#' },
    { icon: <FaNodeJs size={40} />, name: 'Node.js' }
  ];

  // 框架技能图标
  const frameworkSkills = [
    { icon: <SiTailwindcss size={40} />, name: 'Tailwind CSS' },
    { icon: <SiRedux size={40} />, name: 'Redux' },
    { icon: <SiExpress size={40} />, name: 'Express.js' },
    { icon: <SiSpring size={40} />, name: 'Spring Boot' }
  ];

  // 工具技能图标
  const toolSkills = [
    { icon: <FaGitAlt size={40} />, name: 'Git' },
    { icon: <FaDocker size={40} />, name: 'Docker' },
    { icon: <SiMongodb size={40} />, name: 'MongoDB' },
    { icon: <SiMysql size={40} />, name: 'MySQL' },
    { icon: <SiAmazon size={40} />, name: 'AWS' }
  ];

  // 选择当前类别的技能
  const getCurrentSkills = () => {
    switch(currentCategory) {
      case 'frontend':
        return frontendSkills;
      case 'backend':
        return backendSkills;
      case 'frameworks':
        return frameworkSkills;
      case 'tools':
        return toolSkills;
      default:
        return frontendSkills;
    }
  };

  return (
      <section id="skills" className="py-20 bg-background-light dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text dark:text-white text-center">
              {t('skills.title')}
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-12"></div>
          </ScrollReveal>

          {/* 选项卡 */}
          <ScrollReveal delay={0.2}>
            <div className="flex flex-wrap justify-center mb-16 gap-4">
              {categories.map((category) => (
                  <button
                      key={category.id}
                      onClick={() => setCurrentCategory(category.id)}
                      className={`
                  px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${currentCategory === category.id
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

          {/* 技能图标网格 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 max-w-4xl mx-auto">
            {getCurrentSkills().map((skill, index) => (
                <AnimatedIcon
                    key={skill.name}
                    label={skill.name}
                    delay={index * 0.1}
                    size="lg"
                >
                  {skill.icon}
                </AnimatedIcon>
            ))}
          </div>

          {/* 技能评级条 */}
          <ScrollReveal delay={0.4} direction="right" className="mt-16 max-w-3xl mx-auto">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="space-y-6"
            >
              {getCurrentSkills().slice(0, 5).map((skill, index) => (
                  <div key={`rating-${skill.name}`} className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-text dark:text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-primary font-medium">
                    {90 - index * 10}%
                  </span>
                    </div>
                    <div className="h-2 bg-background-dark dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                          className="h-full bg-primary"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${90 - index * 10}%` }}
                          transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                          viewport={{ once: true }}
                      ></motion.div>
                    </div>
                  </div>
              ))}
            </motion.div>
          </ScrollReveal>
        </div>
      </section>
  );
};

export default Skills;