import { motion, useReducedMotion } from 'motion/react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { IntroPreloader } from './components/animations/IntroPreloader';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { FuneralSection } from './components/sections/FuneralSection';
import { MonumentCareSection } from './components/sections/MonumentCareSection';
import { MonumentCatalogSection } from './components/sections/MonumentCatalogSection';
import { WorksGallery } from './components/sections/WorksGallery';
import { ReviewsSection } from './components/sections/ReviewsSection';
import { ContactsSection } from './components/sections/ContactsSection';
import { NotFoundSection } from './components/sections/NotFoundSection';
import {
  HomeIntro,
  HomeDirections,
  HomeMonuments,
  HomeCta,
} from './components/sections/HomeSections';

function PageView() {
  const { currentPage } = useRouter();
  const reduce = useReducedMotion();

  const pageTransition = {
    initial: reduce ? { opacity: 1 } : { opacity: 0, y: 12 },
    animate: reduce ? { opacity: 1 } : { opacity: 1, y: 0 },
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <motion.div key={currentPage} {...pageTransition}>
      {currentPage === 'home' && (
        <>
          <HeroSection />
          <HomeIntro />
          <HomeDirections />
          <HomeMonuments />
          <HomeCta />
          <Footer />
        </>
      )}

      {currentPage === 'funerals' && (
        <>
          <FuneralSection />
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
          <WorksGallery />
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

      {currentPage === 'notfound' && (
        <>
          <NotFoundSection />
          <Footer />
        </>
      )}
    </motion.div>
  );
}

function MainLayout() {
  return (
    <>
      <IntroPreloader />
      <Header />
      <main id="main-content">
        <PageView />
      </main>
      <div aria-live="polite" className="sr-only" id="route-announcer" />
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
