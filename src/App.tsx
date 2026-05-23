import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Terminal from './components/Terminal';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Articles from './components/Articles';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [loadingState, setLoadingState] = useState<'splash' | 'skeletons' | 'ready'>('splash');

  useEffect(() => {
    // Elegant title on load
    document.title = "Abdul Haseeb Khan | Cybersecurity & AI Specialist";
  }, []);

  useEffect(() => {
    if (loadingState === 'skeletons') {
      const timer = setTimeout(() => {
        setLoadingState('ready');
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [loadingState]);

  return (
    <div className="bg-[#080808] text-neutral-300 min-h-screen selection:bg-[#F27D26]/30 selection:text-[#F27D26]">
      <AnimatePresence mode="wait">
        {loadingState === 'splash' && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-[#080808]"
          >
            <SplashScreen onComplete={() => setLoadingState('skeletons')} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Core site rendered sequentially after splash */}
      {loadingState !== 'splash' && (
        <motion.div
          key="main-app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Dynamic Header */}
          <Header />

          {/* Main Layout Rows */}
          <main className="relative">
            {/* Interactive Hero with Canvas */}
            <Hero />

            {/* Interactive Terminal Sandbox */}
            <Terminal isLoading={loadingState === 'skeletons'} />

            {/* Skills Tracker */}
            <Skills />

            {/* Projects inventory filtering & modal */}
            <Projects isLoading={loadingState === 'skeletons'} />

            {/* Medium Articles Grid */}
            <Articles isLoading={loadingState === 'skeletons'} />

            {/* Credentials education track */}
            <Timeline />

            {/* Contact reporting box */}
            <Contact />
          </main>

          {/* Static Footer */}
          <Footer />
        </motion.div>
      )}
    </div>
  );
}
