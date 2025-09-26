import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import allProducts from "../../assets/allProducts.jpeg"
import { getProductsByCategory } from '../../api/productAPI.js'
import { Handbag, Eye, Star, Sparkles, ArrowRight } from "lucide-react"
import AddToCartButton from '../AddToCartButton/AddToCart.jsx'
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Link } from "react-router-dom"

gsap.registerPlugin(ScrollTrigger)

const Slider = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProductsByCategory("luggage")
        setProducts(Array.isArray(res) ? res : [])
      } catch (err) {
        console.error(err)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="my-16 relative">
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-spin mx-auto mb-4 flex items-center justify-center">
            <Handbag className="w-8 h-8 text-white" />
          </div>
          <p className="text-xl font-medium text-gray-600">Loading amazing products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="my-16 relative bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16 px-4 sm:px-6 lg:px-8 rounded-3xl overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full opacity-25 blur-lg"></div>

      {/* Heading */}
      <div className="text-center mb-12 relative px-2 sm:px-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-[var(--heading-color)] to-[var(--secondary-bg-color)] rounded-full flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase text-transparent bg-clip-text bg-gradient-to-r from-[var(--heading-color)] to-[var(--secondary-bg-color)] font-bold">
          Shop Products
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-light capitalize tracking-tight mt-2">
          Our favorite picks for the season
        </p>
      </div>

      {/* Swiper */}
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{
            delay: 4000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true
          }}
          navigation={true}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 25,
              effect: "slide"
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
              effect: "slide"
            }
          }}
          className="!pb-16"
        >
          {/* "View All Products" Slide */}
          <SwiperSlide>
            <div className="group relative w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl overflow-hidden cursor-pointer shadow-2xl hover:shadow-3xl transition-all duration-500">
              <div className="absolute inset-0">
                <img
                  src={allProducts}
                  alt="View All Products"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="relative h-full flex flex-col justify-between p-6 sm:p-8">
                <div className="self-end">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-bold px-4 py-2 rounded-2xl shadow-lg border border-white/30">
                    {products.length} Products
                  </span>
                </div>

                <div className="text-white">
                  <div className="mb-6">
                    <h3 className="text-2xl sm:text-3xl font-black mb-1">Explore All</h3>
                    <p className="text-base sm:text-lg opacity-90">Discover our complete collection</p>
                  </div>

                  <button className="group/btn bg-white/95 backdrop-blur-sm text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold shadow-xl hover:bg-white hover:scale-105 transition-all duration-300 flex items-center gap-2 sm:gap-3">
                    <Link to={"/luggage"} className='flex gap-3 justify-center items-center'> 
                      <Eye size={20} />
                      VIEW ALL
                      <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Product Slides */}
          {products.slice(0, 8).map((product) => {
            const discountPercent = ((product.discount / product.price) * 100).toFixed(0)
            const finalPrice = product.price - product.discount

            return (
              <SwiperSlide key={product._id}>
                <div className="group relative w-full bg-white shadow-xl rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-3xl hover:-translate-y-1 sm:hover:-translate-y-2">

                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

                  {/* Image */}
                  <div className="relative h-[250px] sm:h-[300px] md:h-[350px] overflow-hidden rounded-t-3xl">
                    <img
                      src={product.image.url}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                    />

                    <div className="absolute top-4 left-4 z-30">
                      <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs sm:text-sm px-3 py-1 rounded-2xl font-bold shadow-lg backdrop-blur-sm border border-white/20">
                        {discountPercent}% OFF
                      </span>
                    </div>

                    {discountPercent >= 30 && (
                      <div className="absolute top-4 right-4 z-30">
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs px-2 sm:px-3 py-1 rounded-2xl font-bold shadow-lg flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          DEAL
                        </span>
                      </div>
                    )}

                    <div className="absolute bottom-4 right-4 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <AddToCartButton productId={product._id} />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="relative p-4 sm:p-6 bg-gradient-to-br from-slate-900 to-gray-800 text-white rounded-b-3xl">
                    <h3 className="text-sm sm:text-base md:text-lg font-bold tracking-tight mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors duration-300">
                      {product.name}
                    </h3>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-2 sm:gap-0">
                      <div className="flex items-baseline gap-2 sm:gap-3">
                        <span className="text-lg sm:text-xl font-bold text-green-400">₹{finalPrice.toLocaleString()}</span>
                        <span className="text-xs sm:text-sm text-gray-400 line-through">₹{product.price.toLocaleString()}</span>
                      </div>
                      <div className="text-xs sm:text-sm bg-green-500/20 text-green-300 px-2 py-1 rounded-full border border-green-500/30">
                        Save ₹{product.discount.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-400"></div>
                        ))}
                        <span className="text-gray-400 ml-1">Premium Quality</span>
                      </div>
                      <div className="flex items-center gap-1 text-blue-300">
                        <Handbag className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Travel Ready</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>

        {/* Swiper navigation styles */}
        <style jsx global>{`
          .swiper-button-next,
          .swiper-button-prev {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
            border: 1px solid rgba(255,255,255,0.3);
          }
          .swiper-button-next:after,
          .swiper-button-prev:after {
            font-size: 14px;
            font-weight: bold;
            color: #374151;
          }
          .swiper-pagination-bullet {
            background: rgba(99, 102, 241, 0.3);
            opacity: 1;
          }
          .swiper-pagination-bullet-active {
            background: linear-gradient(45deg, #6366f1, #8b5cf6);
            transform: scale(1.2);
          }
        `}</style>
      </div>
    </div>
  )
}

export default Slider
