import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import {FaLinkedin, FaGithub, FaEnvelope, FaWeixin} from 'react-icons/fa';
import { Trans,useTranslation } from 'react-i18next';
import { useState } from 'react';
const Hero = () => {
  const { t } = useTranslation();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showWechat, setShowWechat] = useState(false);
  const toggleWechat = () => {
    setShowWechat(!showWechat);
  };
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-20 pb-10 bg-background dark:bg-gray-900"
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* AIVIDA Brand Title - Left Side */}
        <motion.div
          className="md:w-1/2 mb-10 md:mb-0 flex justify-center items-center"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-center">
            
  {/* 三颗菱形容器 */}
  <div className="relative w-[280px] h-[140px] flex items-center justify-start overflow-visible mb-10 translate-x-16">
    {/* 大菱形 */}
    <div className="absolute left-0 top-1/2 w-[140px] h-[140px] bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 rounded-md transform -translate-y-1/2 rotate-45 animate-pulse"></div>
    
    {/* 中菱形 - 左边对齐到大菱形中心 */}
    <div className="absolute left-[70px] top-1/2 w-[110px] h-[110px] bg-gradient-to-br from-purple-400 to-blue-500 rounded-md transform -translate-y-1/2 rotate-45 animate-pulse"
         style={{ animationDelay: '0.1s' }}></div>
    
    {/* 小菱形 - 左边对齐到中菱形中心 */}
    <div className="absolute left-[140px] top-1/2 w-[80px] h-[80px] bg-gradient-to-br from-blue-400 to-purple-400 rounded-md transform -translate-y-1/2 rotate-45 animate-pulse"
         style={{ animationDelay: '0.3s' }}></div>
  </div>
            <motion.span 
              className="text-9xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x block leading-none"
              style={{
                backgroundSize: '200% 200%',
                animation: 'gradient 3s ease infinite'
              }}
            >
              {t('nav.WEB')}
            </motion.span>
          </div>
        </motion.div>

        {/* Content - Right Side */}
        <motion.div
          className="md:w-1/2 mb-10 md:mb-0"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-5xl md:text-5xl lg:text-6xl font-bold mb-4 text-text dark:text-white"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {/*{t('hero.greeting')}{' '}*/}
            <Trans i18nKey="hero.greetingWithName">
              你好，我是<span className="text-primary">郭圣元</span>
            </Trans>
          </motion.h1>

          <motion.span 
            className="text-transparent text-6xl bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block mb-8"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            {t('hero.title')}
          </motion.span>

          <motion.p 
            className="text-text-light dark:text-gray-400 text-lg mb-8 leading-relaxed"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            {t('hero.description')}
          </motion.p>

          <motion.div 
            className="flex space-x-4 mb-8"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          >
            <a
                href="www.linkedin.com/in/shengyuan-guo-51a180305"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-light transition-colors duration-300"
                aria-label="LinkedIn"
            >
              <FaLinkedin size={24}/>
            </a>
            <a
                href="https://github.com/GFORGALEN"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-light transition-colors duration-300"
                aria-label="GitHub"
            >
              <FaGithub size={24}/>
            </a>
            <a
                href="mailto:guoshengyuan123@icloud.com"
                className="text-primary hover:text-primary-light transition-colors duration-300"
                aria-label="Email"
            >
              <FaEnvelope size={24}/>
            </a>
            <div className="relative">
              <button
                  onClick={toggleWechat}
                  className="text-primary hover:text-primary-light transition-colors duration-300"
                  aria-label="WeChat"
              >
                <FaWeixin size={24}/>
              </button>

              {showWechat && (
                  <div
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white p-4 rounded-lg shadow-lg z-10">
                    <p className="text-text mb-2 text-center font-medium">{t('contact.wechat')}</p>
                    <div className="w-32 h-32 bg-gray-200 flex items-center justify-center">
                      <img
                          src="https://i.ibb.co/sw982MQ/21ff19196044ccd28421627485d4371.jpg"
                          alt="WeChat QR Code"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://via.placeholder.com/128x128?text=WeChat";
                          }}
                      />
                    </div>
                    <div className="w-4 h-4 bg-white transform rotate-45 absolute -bottom-2 left-1/2 -ml-2"></div>
                  </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
          >
            <Link
                to="contact"
                spy={true}
                smooth={true}
                duration={500}
                offset={-70}
                className="inline-block bg-primary hover:bg-primary-light text-white font-medium py-3 px-6 rounded-md transition-colors duration-300 shadow-md"
            >
              {t('hero.cta')}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <Link
            to="about"
            spy={true}
            smooth={true}
            duration={500}
            offset={-70}
            className="text-primary cursor-pointer"
        >
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
          >
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
