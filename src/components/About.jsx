import { motion } from 'framer-motion';
import profileImage from '../assets/profile.webp';
import { experience, education } from '../data/data';
import LazyImage from './common/LazyImage';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="about" className="py-16 bg-white dark:bg-gray-950 px-4 md:px-8 overflow-hidden">
      <motion.div 
        className="container mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="flex flex-col items-center md:flex-row md:items-start md:justify-center md:space-x-16">
          <motion.div variants={itemVariants} className="md:w-1/3 mb-10 md:mb-0 text-center md:sticky md:top-24 z-10 bg-white dark:bg-gray-950 md:bg-transparent pb-4 md:pb-0">
            <motion.div 
              className="inline-block p-1 rounded-full bg-gradient-to-br from-(--chrysler-blue) via-(--amethyst) to-(--celadon) mb-6 shadow-lg"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ duration: 0.3 }}
            >
              <LazyImage
                src={profileImage}
                alt="Aritro Saha profile picture"
                className="w-56 h-56 rounded-full border-4 border-white object-cover shadow-sm"
              />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-900 dark:text-gray-100 cursor-default">
              About <span className="text-(--amethyst) font-bold">Me</span>
            </h2>
          </motion.div>
          
          <div className="md:w-1/2 text-gray-700 dark:text-gray-300 cursor-default">
            <motion.p variants={itemVariants} className="mb-6 text-lg md:text-xl leading-relaxed">
              I am an <span className="font-medium text-(--amethyst)">Associate Software Developer</span> at <span className="font-medium">Bristol Myers Squibb</span>. As a passionate <span className="font-medium text-(--chrysler-blue)">Data Science Engineer</span> with a strong 
              footing in <span className="font-medium text-(--amethyst)">Full Stack Development</span>, I enjoy bridging the gap between backend logic and user-facing design while leveraging data to drive smart, impactful decisions.
            </motion.p>
            <motion.p variants={itemVariants} className="mb-6 text-lg md:text-xl leading-relaxed">
              I've had the privilege of winning <span className="font-medium text-(--chrysler-blue)">Hack4Bengal 3.0</span>—Eastern India's largest hackathon—where I led the charge on building impactful tech under pressure. Whether it's crafting <span className="font-medium text-(--amethyst)">scalable web apps</span> or building <span className="font-medium text-(--tea-green)">predictive models</span>, I thrive at the intersection of code, creativity, and real-world problem solving.
            </motion.p>
            <motion.p variants={itemVariants} className="mb-6 text-lg md:text-xl leading-relaxed">
              When I'm not coding, you'll find me <span className="font-medium text-(--amethyst)">beatboxing</span>, <span className="font-medium text-(--chrysler-blue)">playing football</span>, or chasing my next creative outlet.
            </motion.p>
            
            <div className="mt-16 flex flex-col md:flex-row gap-12">
              <motion.div variants={itemVariants} className="flex-1">
                <h3 className="text-2xl font-semibold mb-6 text-(--chrysler-blue) border-b pb-2">Experience</h3>
                <div className="space-y-6">
                  {experience.map((item, index) => (
                    <motion.div 
                      key={index}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                      className="border-l-2 border-gray-200 dark:border-gray-800 pl-4 py-1"
                    >
                      <h4 className="font-medium text-lg text-gray-900 dark:text-gray-100">{item.title}</h4>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{item.duration}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex-1">
                <h3 className="text-2xl font-semibold mb-6 text-(--chrysler-blue) border-b pb-2">Education</h3>
                <div className="space-y-6">
                  {education.map((item, index) => (
                    <motion.div 
                      key={index}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                      className="border-l-2 border-gray-200 dark:border-gray-800 pl-4 py-1"
                    >
                      <h4 className="font-medium text-lg text-gray-900 dark:text-gray-100">{item.title}</h4>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{item.institution}, {item.year}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
