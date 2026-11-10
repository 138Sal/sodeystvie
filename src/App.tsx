import { useState, useCallback } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { IntroPreloader } from './components/animations/IntroPreloader';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { MonumentCareSection } from './components/sections/MonumentCareSection';
import { MonumentCatalogSection } from './components/sections/MonumentCatalogSection';
import { ReviewsSection } from './components/sections/ReviewsSection';
import { ContactsSection } from './components/sections/ContactsSection';
import {
  HomeIntro,
  HomeDirections,
  HomeMonuments,
  HomeCta,
} from './components/sections/HomeSections';

function PageView({ initialIntro }: { initialIntro: boolean }) {
  const { currentPage } = useRouter();
  const reduce = useReducedMotion();

  const pageTransition = {
    initial: reduce
      ? { opacity: 0 }
      : { opacity: 0, y: 14, filter: 'blur(8px)' },
    animate: reduce
      ? { opacity: 1 }
      : { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: reduce
      ? { opacity: 0 }
      : { opacity: 0, y: -10, filter: 'blur(6px)' },
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div key={currentPage} {...pageTransition} className="min-h-[calc(100vh-88px)]">
        {currentPage === 'home' && (
          <>
            <HeroSection initialIntro={initialIntro} />
            <HomeIntro />
            <HomeDirections />
            <HomeMonuments />
            <HomeCta />
            <Footer />
          </>
        )}

        {currentPage === 'care' && (
          <>
            <MonumentCareSection />
            <Footer />
          </>
        )}

        {currentPage === 'monuments' && (
          <>
            <MonumentCatalogSection />
            <Footer />
          </>
        )}

        {currentPage === 'reviews' && (
          <>
            <ReviewsSection />
            <Footer />
          </>
        )}

        {currentPage === 'contacts' && (
          <>
            <ContactsSection />
            <Footer />
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

function MainLayout() {
  const [introDone, setIntroDone] = useState(false);
  const handleIntroComplete = useCallback(() => setIntroDone(true), []);

  return (
    <>
      <IntroPreloader onComplete={handleIntroComplete} />

      <div
        className={`min-h-screen transition-all duration-700 ${
          introDone ? 'opacity-100' : 'opacity-0 blur-[10px]'
        }`}
        aria-hidden={!introDone}
      >
        <Header />
        <main>
          <PageView initialIntro={!introDone} />
        </main>
      </div>
    </>
  );
}

function App() {
  return (
    <RouterProvider>
      <MainLayout />
    </RouterProvider>
  );
}

export default App;
