import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaUser, FaExclamationTriangle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';


interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

// 定义聊天机器人API接口
interface ChatbotAPI {
  sendMessage: (message: string) => Promise<string>;
}

// ChatGPT API实现
class ChatGPTAPI implements ChatbotAPI {
  private apiKey: string;
  private model: string;
  private resumeContext: string;
  private language: string;

  constructor(apiKey: string, language = 'en', model = 'gpt-3.5-turbo') {
    this.apiKey = apiKey;
    this.model = model;
    this.language = language;

    // 设置简历上下文（中英文版本）
    this.resumeContext = this.getResumeContext();
  }

  setLanguage(language: string): void {
    this.language = language;
    this.resumeContext = this.getResumeContext();
  }

  private getResumeContext(): string {
    // 根据当前语言返回相应的简历上下文
    if (this.language === 'zh') {
      return `
你是郭圣元的个人助手，你的任务是帮助访客了解郭圣元的背景和技能。请根据以下信息回答问题：

个人信息：
- 姓名：郭圣元
- 出生年月：1999-12
- 性别：男
- 电话：18634220358
- 邮箱：guoshengyuan123@icloud.com

教育背景：
- 2020-07至2022-11：奥克兰大学（QS 68）计算机科学（本科）
- 2023-02至今：奥克兰大学（QS 68）信息技术（硕士）

实习经历：
2024-07至2024-11：FRW Healthcare Limited 软件开发实习生
项目：MediMate - 基于AI的药品识别与管理系统
- 手机端使用swift开发iOS软件，后台系统使用React开发，后端使用Java SpringBoot，云端使用AWS EC2
- 主要负责基于React的药店管理系统前端开发
- 使用React + Redux开发实时订单系统和药品管理功能
- 使用ECharts实现数据可视化
- 实现基于SSE的实时订单通知系统
- 开发基于Leaflet API的药店地图系统
- 使用Ant Design和Tailwind CSS构建响应式UI界面
- 参与后端API开发和数据采集，使用Python爬虫收集处理9000+药品数据

项目经验：
2024-02至2024-06：Musichat流媒体播放网页（全栈开发）
- 基于MERN堆栈（MongoDB、Express、React、Node.js）构建
- 项目运维：使用Vite搭建初始化构建项目和打包，对项目进行CI/CD配置
- 前端：使用React Native还原界面，使用Axios调用接口，应用Tailwindcss进行样式与布局，使用Redux进行状态管理
- 使用openai接口接入人工智能进行个性化推荐，使用socket.io进行实时在线聊天
- 后端：使用express框架，数据库使用MongoDB

技能特长：
- 前端基础扎实，熟悉HTML、CSS及JavaScript等前端技术
- 掌握React等JavaScript框架，熟悉Redux, React-router, React-dom等常用组件库
- 掌握Bootstrap、Material UI等主流组件框架
- 了解Node.js，express后端开发和git代码管理工具
- 了解Web前端开发规范，具备良好的代码风格与技术文档编写能力
- 了解Python，Java，Linux等后端语言以及SPSS Modeler, R, Spark, Figma, LATEX

回答要简洁、专业，不要过于冗长。如果你不知道答案，请基于以上信息进行合理推测，或表示你需要更多信息来回答这个问题。
`;
    } else {
      return `
You are Guo Shengyuan's personal assistant. Your task is to help visitors learn about Guo Shengyuan's background and skills. Please answer questions based on the following information:

Personal Information:
- Name: Guo Shengyuan
- Date of Birth: 1999-12
- Gender: Male
- Phone: 18634220358
- Email: guoshengyuan123@icloud.com

Education:
- 2020-07 to 2022-11: University of Auckland (QS 68), Bachelor of Computer Science
- 2023-02 to present: University of Auckland (QS 68), Master of Information Technology

Internship Experience:
2024-07 to 2024-11: Software Development Intern at FRW Healthcare Limited
Project: MediMate - AI-based Medication Identification and Management System
- Mobile app developed with Swift for iOS, backend system with React, backend with Java SpringBoot, cloud using AWS EC2
- Mainly responsible for React-based pharmacy management system frontend development
- Used React + Redux to develop real-time order system and medication management features
- Implemented data visualization using ECharts
- Implemented real-time order notification system based on SSE
- Developed pharmacy map system based on Leaflet API
- Built responsive UI interface using Ant Design and Tailwind CSS
- Participated in backend API development and data collection, using Python crawler to collect and process 9000+ medication data

Project Experience:
2024-02 to 2024-06: Musichat Streaming Website (Full Stack Development)
- Built on MERN stack (MongoDB, Express, React, Node.js)
- Project DevOps: Used Vite for initial project setup and packaging, configured CI/CD
- Frontend: Used React Native to restore interfaces, Axios for API calls, Tailwindcss for styling and layout, Redux for state management
- Used OpenAI API for personalized recommendations, Socket.io for real-time online chat
- Backend: Used Express framework, MongoDB for database

Skills:
- Solid foundation in frontend basics, familiar with HTML, CSS, and JavaScript
- Proficient in React and other JavaScript frameworks, familiar with Redux, React-router, React-dom, and other common component libraries
- Proficient in Bootstrap, Material UI, and other mainstream component frameworks
- Familiar with Node.js, Express backend development, and git code management tools
- Understanding of Web frontend development specifications, good code style and technical documentation writing ability
- Familiar with Python, Java, Linux, and other backend languages, as well as SPSS Modeler, R, Spark, Figma, LATEX

Keep answers concise and professional, not too lengthy. If you don't know the answer, make reasonable inferences based on the information above, or indicate that you need more information to answer the question.
`;
    }
  }

  async sendMessage(message: string): Promise<string> {
    try {
      console.log('Sending message to OpenAI API...');
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            { role: 'system', content: this.resumeContext },
            { role: 'user', content: message }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('OpenAI API Error:', errorData);
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Received response from OpenAI API');
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      // 返回一个友好的错误消息，明确指出是API连接问题
      return this.language === 'zh'
          ? '抱歉，我暂时无法连接到ChatGPT。正在使用本地数据回答您的问题，可能无法提供完整信息。请稍后再试。'
          : 'Sorry, I cannot connect to ChatGPT at the moment. I am using local data to answer your question, which may be limited. Please try again later.';
    }
  }
}

// 备用的本地回复生成器（当API调用失败时使用）
class MockChatbotAPI implements ChatbotAPI {
  private botResponses: Record<string, Record<string, string>>;
  private language: string;

  constructor(language = 'en') {
    this.language = language;
    this.botResponses = {
      en: {
        greeting: "Hello! I'm Guo Shengyuan's AI assistant. How can I help you today?",
        skills: "Guo Shengyuan is proficient in frontend development technologies, including React, JavaScript/TypeScript, and various frontend frameworks.",
        education: "Guo Shengyuan obtained his Bachelor's degree in Computer Science from the University of Auckland and is currently pursuing a Master's degree in Information Technology.",
        experience: "Guo Shengyuan worked as a Software Development Intern at FRW Healthcare Limited, mainly responsible for frontend development of a React-based pharmacy management system.",
        contact: "You can contact Guo Shengyuan via email at guoshengyuan123@icloud.com or by phone at +64 18634220358.",
        projects: "His projects include the MediMate pharmacy management system developed with React and Redux, and the Musichat streaming website based on the MERN stack.",
        fallback: "I'm sorry, I don't understand your question. You can ask about Guo Shengyuan's skills, education, work experience, projects, or contact information."
      },
      zh: {
        greeting: "您好！我是郭圣元的AI助手，很高兴为您服务。有什么我能帮助您的吗？",
        skills: "郭圣元精通前端开发技术，包括React、JavaScript/TypeScript和多种前端框架。他还熟悉Node.js和Express等后端技术。",
        education: "郭圣元在奥克兰大学获得了计算机科学本科学位，目前正在该校攻读信息技术硕士学位。",
        experience: "郭圣元曾在FRW Healthcare Limited担任软件开发实习生，主要负责基于React的药店管理系统前端开发。",
        contact: "您可以通过邮箱guoshengyuan123@icloud.com或电话+64 18634220358联系郭圣元。",
        projects: "他的项目包括使用React和Redux开发的MediMate药店管理系统，以及基于MERN堆栈的Musichat流媒体播放网站。",
        fallback: "抱歉，我无法理解您的问题。您可以询问关于郭圣元的技能、教育背景、工作经验、项目或联系方式的信息。"
      }
    };
  }

  setLanguage(language: string): void {
    this.language = language;
  }

  async sendMessage(message: string): Promise<string> {
    const lowerMsg = message.toLowerCase();
    const lang = this.language === 'zh' ? 'zh' : 'en';

    if (lowerMsg.includes('hi') || lowerMsg.includes('hello') || lowerMsg.includes('hey') ||
        lowerMsg.includes('你好') || lowerMsg.includes('您好') || lowerMsg.includes('嗨')) {
      return this.botResponses[lang].greeting;
    } else if (lowerMsg.includes('skill') || lowerMsg.includes('能力') || lowerMsg.includes('技能')) {
      return this.botResponses[lang].skills;
    } else if (lowerMsg.includes('education') || lowerMsg.includes('school') || lowerMsg.includes('university') ||
        lowerMsg.includes('教育') || lowerMsg.includes('学校') || lowerMsg.includes('大学')) {
      return this.botResponses[lang].education;
    } else if (lowerMsg.includes('experience') || lowerMsg.includes('work') || lowerMsg.includes('job') ||
        lowerMsg.includes('经验') || lowerMsg.includes('工作') || lowerMsg.includes('职业')) {
      return this.botResponses[lang].experience;
    } else if (lowerMsg.includes('contact') || lowerMsg.includes('email') || lowerMsg.includes('phone') ||
        lowerMsg.includes('联系') || lowerMsg.includes('邮箱') || lowerMsg.includes('电话')) {
      return this.botResponses[lang].contact;
    } else if (lowerMsg.includes('project') || lowerMsg.includes('portfolio') ||
        lowerMsg.includes('项目') || lowerMsg.includes('作品')) {
      return this.botResponses[lang].projects;
    } else {
      return this.botResponses[lang].fallback;
    }
  }
}

const Chatbot = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 从Vite环境变量获取OpenAI API Key
  const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';

  // 状态跟踪是否已连接到GPT
  const [isConnectedToGPT, setIsConnectedToGPT] = useState<boolean>(false);

  // 创建聊天机器人API实例
  const [chatAPI, setChatAPI] = useState<ChatbotAPI>(() => {
    // 如果有API Key，则使用ChatGPT API，否则使用Mock API
    if (OPENAI_API_KEY && OPENAI_API_KEY.length > 0) {
      try {
        const api = new ChatGPTAPI(OPENAI_API_KEY, i18n.language);
        setIsConnectedToGPT(true);
        return api;
      } catch (error) {
        console.error('Failed to initialize ChatGPT API:', error);
        setIsConnectedToGPT(false);
        return new MockChatbotAPI(i18n.language);
      }
    } else {
      console.warn('Using MockChatbotAPI as OpenAI API key is not provided');
      setIsConnectedToGPT(false);
      return new MockChatbotAPI(i18n.language);
    }
  });

  // 更新语言
  useEffect(() => {
    if (chatAPI instanceof ChatGPTAPI) {
      (chatAPI as ChatGPTAPI).setLanguage(i18n.language);
    } else if (chatAPI instanceof MockChatbotAPI) {
      (chatAPI as MockChatbotAPI).setLanguage(i18n.language);
    }
  }, [i18n.language, chatAPI]);

  // 自动滚动到最新消息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 首次打开时显示欢迎消息
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);

      // 模拟AI思考时间
      const timer = setTimeout(async () => {
        try {
          // 添加连接状态提示（仅在中文界面下）
          let connectionMessage = '';
          if (!isConnectedToGPT) {
            connectionMessage = i18n.language === 'zh'
                ? '（注意：当前未连接到ChatGPT，使用的是本地数据）'
                : '(Note: Currently not connected to ChatGPT, using local data)';
          }

          const greeting = await chatAPI.sendMessage(
              i18n.language === 'zh' ? '你好，介绍一下自己' : 'Hello, introduce yourself'
          );

          // 如果有连接状态信息，添加到问候语后面
          const finalGreeting = connectionMessage ? `${greeting}\n\n${connectionMessage}` : greeting;

          setMessages([{
            text: finalGreeting,
            isBot: true,
            timestamp: new Date()
          }]);
        } catch (error) {
          console.error('Error in welcome message:', error);
          // 如果出错，显示一个基本的欢迎消息
          const fallbackGreeting = i18n.language === 'zh'
              ? '您好！我是郭圣元的AI助手。（注意：当前未连接到ChatGPT，使用的是本地数据）'
              : 'Hello! I am Guo Shengyuan\'s AI assistant. (Note: Currently not connected to ChatGPT, using local data)';

          setMessages([{
            text: fallbackGreeting,
            isBot: true,
            timestamp: new Date()
          }]);
        } finally {
          setIsTyping(false);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, messages.length, chatAPI, i18n.language, isConnectedToGPT]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // 添加用户消息
    const userMessage: Message = {
      text: input,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // 添加延迟以模拟AI思考
      const typingDelay = Math.max(500, Math.min(input.length * 20, 2000));

      // 发送消息到API并获取响应
      const responsePromise = chatAPI.sendMessage(input);

      // 至少显示typing状态一段时间
      await new Promise(resolve => setTimeout(resolve, typingDelay));

      const response = await responsePromise;

      // 如果响应包含API错误提示，则标记为未连接到GPT
      if (response.includes('无法连接到ChatGPT') || response.includes('cannot connect to ChatGPT')) {
        setIsConnectedToGPT(false);
      }

      // 添加机器人回复
      setMessages(prev => [...prev, {
        text: response,
        isBot: true,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Error getting chatbot response:', error);
      setIsConnectedToGPT(false);

      // 构建更明确的错误消息
      const errorMessage = i18n.language === 'zh'
          ? '抱歉，处理您的请求时出现错误。我当前未连接到ChatGPT，正在使用有限的本地数据回答问题。'
          : 'Sorry, I encountered an error while processing your request. I am currently not connected to ChatGPT and using limited local data to answer questions.';

      // 添加错误消息
      setMessages(prev => [...prev, {
        text: errorMessage,
        isBot: true,
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // 打字动画的样式
  const typingAnimationStyles = `
    .typing-animation {
      display: flex;
      align-items: center;
    }

    .dot {
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: currentColor;
      margin: 0 2px;
      opacity: 0.6;
      animation: bounce 1.5s infinite;
    }

    .dot:nth-child(2) {
      animation-delay: 0.2s;
    }

    .dot:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes bounce {
      0%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-6px);
      }
    }
  `;

  // 添加全局样式
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = typingAnimationStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
      <>
        {/* 聊天按钮 */}
        <button
            onClick={toggleChat}
            className="fixed right-4 bottom-4 z-50 bg-primary hover:bg-primary-light text-white rounded-full p-4 shadow-lg transition-colors duration-300"
            aria-label={isOpen ? t('chatbot.close', 'Close chatbot') : t('chatbot.open', 'Open chatbot')}
        >
          {isOpen ? <FaTimes size={24} /> : <FaRobot size={24} />}
        </button>

        {/* 聊天窗口 */}
        <AnimatePresence>
          {isOpen && (
              <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="fixed right-4 bottom-20 z-40 w-80 sm:w-96 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden flex flex-col"
              >
                {/* 聊天头部 */}
                <div className="bg-primary text-white p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <FaRobot className="mr-2" />
                    <h3 className="font-medium">{t('contact.chatbot')}</h3>
                    {!isConnectedToGPT && (
                        <div className="ml-2 flex items-center text-yellow-300 text-xs">
                          <FaExclamationTriangle className="mr-1" />
                          <span>{i18n.language === 'zh' ? '本地模式' : 'Local Mode'}</span>
                        </div>
                    )}
                  </div>
                  <button
                      onClick={toggleChat}
                      className="text-white hover:text-gray-200 focus:outline-none"
                      aria-label={t('chatbot.close', 'Close chatbot')}
                  >
                    <FaTimes />
                  </button>
                </div>

                {/* 聊天消息区域 */}
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-700">
                  {messages.map((message, index) => (
                      <div
                          key={index}
                          className={`mb-4 flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                      >
                        <div
                            className={`
                      max-w-[80%] rounded-lg p-3
                      ${message.isBot
                                ? 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white'
                                : 'bg-primary text-white'
                            }
                    `}
                        >
                          <div className="flex items-center mb-1">
                            {message.isBot ? (
                                <FaRobot className="mr-2 text-xs" />
                            ) : (
                                <FaUser className="mr-2 text-xs" />
                            )}
                            <span className="text-xs opacity-75">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                          </div>
                          <p>{message.text}</p>
                        </div>
                      </div>
                  ))}

                  {isTyping && (
                      <div className="mb-4 flex justify-start">
                        <div className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white max-w-[80%] rounded-lg p-3">
                          <div className="flex items-center">
                            <FaRobot className="mr-2 text-xs" />
                            <div className="typing-animation">
                              <span className="dot"></span>
                              <span className="dot"></span>
                              <span className="dot"></span>
                            </div>
                          </div>
                        </div>
                      </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* 输入区域 */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
                  <div className="flex">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder={t('contact.chatbot.placeholder')}
                    />
                    <button
                        onClick={handleSend}
                        className="bg-primary hover:bg-primary-light text-white rounded-r-md px-4 transition-colors duration-300"
                    >
                      <FaPaperPlane />
                    </button>
                  </div>
                </div>
              </motion.div>
          )}
        </AnimatePresence>
      </>
  );
};

export default Chatbot;