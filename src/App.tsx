import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { Categories } from '@/components/Categories';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { CustomerReviews } from '@/components/CustomerReviews';
import { OurProcess } from '@/components/OurProcess';
import { About } from '@/components/About';
import { FAQ } from '@/components/FAQ';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { ProductDetails } from '@/components/ProductDetails';
import { Admin } from '@/components/Admin';
import { CartDrawer } from '@/components/CartDrawer';
import { SearchModal } from '@/components/SearchModal';
import { StoreProvider } from '@/store/StoreContext';

type Route = { type: 'home' } | { type: 'product'; id: string } | { type: 'admin' };

function getRouteFromHash(): Route {
  const hash = window.location.hash;
  const productMatch = hash.match(/^#product\/(.+)$/);
  if (productMatch) return { type: 'product', id: productMatch[1] };
  if (hash === '#admin') return { type: 'admin' };
  return { type: 'home' };
}

function App() {
  const [route, setRoute] = useState<Route>(getRouteFromHash());

  useEffect(() => {
    const onHashChange = () => setRoute(getRouteFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const openProduct = (id: string) => {
    window.location.hash = `product/${id}`;
  };

  const goHome = () => {
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <StoreProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          {route.type === 'product' ? (
            <ProductDetails productId={route.id} onBack={goHome} />
          ) : route.type === 'admin' ? (
            <Admin onBack={goHome} />
          ) : (
            <>
              <Hero />
              <FeaturedProducts onSelect={openProduct} />
              <Categories />
              <WhyChooseUs />
              <OurProcess />
              <About />
              <FAQ />
              <Contact />
            </>
          )}
        </main>
        <Footer />
        <WhatsAppFloat />
        <CartDrawer />
        <SearchModal />
      </div>
    </StoreProvider>
  );
}

export default App;
