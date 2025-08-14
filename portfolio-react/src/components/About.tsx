import { motion } from 'framer-motion';
import { FaLaptopCode, FaGraduationCap, FaCode } from 'react-icons/fa';
import { FcGraduationCap, FcBriefcase  ,FcTabletAndroid,FcMultipleDevices} from "react-icons/fc";
import { Trans,useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-20 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text">{t('about.title')}</h2>
          <div className="w-16 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid gap-12 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] items-start">

          <motion.div
              initial={{opacity: 0, x: 30}}
              whileInView={{opacity: 1, x: 0}}
              transition={{duration: 0.5, delay: 0.4}}
              viewport={{once: true}}
              className="w-full grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"
          >
            <div className="dark:bg-gray-900 rounded-xl shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white text-3xl mb-4 shadow-lg">
                <FcTabletAndroid />
              </div>
              <h4 className="text-xl font-bold mb-3 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">{t('about.techstack')}</h4>
              <p className="text-text-light leading-relaxed">
                {t('about.techstack.desc')}
              </p>
            </div>


            <div className="dark:bg-gray-900 rounded-xl shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white text-3xl mb-4 shadow-lg">
              <FcGraduationCap />
              </div>
              <h4 className="text-xl font-bold mb-3 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">{t('about.education')}</h4>
              <p className="text-text-light leading-relaxed">
                {t('about.education.desc')}
              </p>
            </div>

            <div className="dark:bg-gray-900 rounded-xl shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white text-3xl mb-4 shadow-lg">
              <FcMultipleDevices />
              </div>
              <h4 className="text-xl font-bold mb-3 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">{t('about.projects')}</h4>
              <p className="text-text-light leading-relaxed">
                {t('about.projects.desc')}
              </p>
            </div>

            <div className="dark:bg-gray-900 rounded-xl shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 p-6 border border-gray-200 dark:border-gray-700">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white text-3xl mb-4 shadow-lg">
                <FcBriefcase  />
              </div>
              <h4 className="text-xl font-bold mb-3 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">{t('about.Digital strategy & advisory')}</h4>
              <p className="text-text-light leading-relaxed">
                {t('about.Digital strategy & advisory.desc')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
