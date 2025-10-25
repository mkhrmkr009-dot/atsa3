import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { products, loading } = useProducts();

  const imageAnimation = useScrollAnimation();
  const contentAnimation = useScrollAnimation();
  const relatedAnimation = useScrollAnimation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-[#3d4f5c] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  console.log('Looking for product with slug:', slug);
  console.log('Available products:', products.map(p => ({ id: p.id, name: p.name, slug: p.slug })));

  const product = products.find(p => p.slug === slug || p.id === slug);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#3d4f5c] mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-4">Looking for: {slug}</p>
          <p className="text-gray-600 mb-4">Found {products.length} products total</p>
          <Link to="/" className="text-[#3d4f5c] hover:underline font-semibold">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 py-4 bg-white/80 backdrop-blur-sm shadow-sm">
        <nav className="container mx-auto px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#3d4f5c] hover:text-[#2d3f4c] transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Home</span>
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div ref={imageAnimation.ref} className={`relative transition-all duration-700 ${imageAnimation.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="sticky top-32">
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              )}
            </div>
          </div>

          <div ref={contentAnimation.ref} className={`transition-all duration-700 ${contentAnimation.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <h1 className="text-4xl md:text-5xl font-bold text-[#3d4f5c] mb-6">
              {product.name}
            </h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 leading-relaxed whitespace-pre-wrap">
                {product.bio || product.description}
              </p>
            </div>

            <div className={`mt-12 p-8 bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl border-2 border-[#3d4f5c] transition-all duration-700 delay-300 ${contentAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h2 className="text-2xl font-bold text-[#3d4f5c] mb-4">
                If you are interested, contact us
              </h2>
              <p className="text-gray-600 mb-6">
                Reach out to discuss your requirements and receive a detailed quote.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+96171981996"
                  className="bg-[#3d4f5c] text-white px-8 py-3 rounded-lg hover:bg-[#2d3f4c] transition font-semibold text-center shadow-lg"
                >
                  +961 71 981 996
                </a>
                <a
                  href="tel:+2250150191162"
                  className="bg-[#3d4f5c] text-white px-8 py-3 rounded-lg hover:bg-[#2d3f4c] transition font-semibold text-center shadow-lg"
                >
                  +225 01 50 19 11 62
                </a>
              </div>
            </div>

            <div className={`mt-8 transition-all duration-700 delay-500 ${contentAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h3 className="text-xl font-bold text-[#3d4f5c] mb-4">Our Expertise</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#3d4f5c] rounded-full"></span>
                  Over 30 years of manufacturing experience
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#3d4f5c] rounded-full"></span>
                  Premium quality materials and craftsmanship
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#3d4f5c] rounded-full"></span>
                  Custom fabrication to your specifications
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#3d4f5c] rounded-full"></span>
                  Professional installation available
                </li>
              </ul>
            </div>
          </div>
        </div>

        <section ref={relatedAnimation.ref} className="mt-20">
          <h2 className={`text-3xl font-bold text-[#3d4f5c] mb-8 text-center transition-all duration-700 ${relatedAnimation.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Other Products
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products
              .filter(p => p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct, index) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.slug || relatedProduct.id}`}
                  className={`group transition-all duration-700 ${relatedAnimation.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition">
                    {relatedProduct.imageUrl && (
                      <img
                        src={relatedProduct.imageUrl}
                        alt={relatedProduct.name}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="font-bold text-[#3d4f5c] group-hover:text-[#2d3f4c] transition">
                        {relatedProduct.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}
