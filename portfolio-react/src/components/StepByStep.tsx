import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const StepByStep = () => {
  const { t } = useTranslation();

  // 从 i18n 获取步骤数据
  type Step = {
    number: string;
    title: string;
    desc: string;
    image?: string;
  };
  const steps = t('steps.list', { returnObjects: true }) as Step[];

  return (
    <section id="steps" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {t('steps.title')}
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto"></div>
        </motion.div>

        {/* 步骤卡片 */}
        <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center"
            >
              <div className="text-4xl font-bold text-blue-600 mb-4">{step.number}</div>
              {step.image && (
                <div className="mb-4 flex justify-center">
                  <img
                    src={step.image}
                    alt={step.title}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
              )}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default StepByStep;
