import React, { useEffect, useState } from "react"
import { getProductsByCategory } from "../../api/productAPI.js"
import { Backpack, Compass, Mountain, Star } from "lucide-react"
import SmoothSailing from "../../components/SmoothSailing/SmoothSailing.jsx"
import AddToCartButton from "../../components/AddToCartButton/AddToCart.jsx"
import ReactPaginate from "react-paginate"

const Duffles = () => {
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 9

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const res = await getProductsByCategory("backpacks")
        setProducts(Array.isArray(res) ? res : [])
      } catch (error) {
        console.error("Error fetching backpack products", error)
        setProducts([])
      }
    }
    fetchProductsByCategory()
  }, [])

  // Pagination calculations
  const offset = currentPage * itemsPerPage
  const currentProducts = products.slice(offset, offset + itemsPerPage)
  const pageCount = Math.ceil(products.length / itemsPerPage)

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected)
  }

  return (
    <div className="relative w-full bg-gradient-to-br from-emerald-100 via-white to-sky-100 px-4 sm:px-6 md:px-8 lg:px-12 py-16 sm:py-12 md:py-16 lg:py-20 overflow-hidden">
      <div className="text-center mb-10 sm:mb-12 md:mb-16 relative">
        {/* Adventure Icons */}
        <div className="relative flex justify-center items-center gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform cursor-pointer">
            <Mountain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-sky-500 to-blue-500 rounded-full flex items-center justify-center shadow-xl transform hover:scale-110 transition-transform cursor-pointer">
            <Backpack className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
          </div>
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform cursor-pointer">
            <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
        </div>

        <h2 className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4 tracking-tighter uppercase bg-gradient-to-r from-gray-900 via-emerald-800 to-sky-800 bg-clip-text text-transparent leading-tight drop-shadow-sm">
          Backpacks
        </h2>

        <div className="relative h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent mb-4 sm:mb-6 max-w-xs sm:max-w-sm md:max-w-md mx-auto rounded-full"></div>

        <p className="text-gray-600 text-base sm:text-lg md:text-xl lg:text-2xl font-light max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto leading-relaxed">
          Because every great story starts with what you carry.
        </p>
      </div>

      {/* Products Grid */}
      {currentProducts.length === 0 ? (
        <div className="flex justify-center items-center h-64 sm:h-80">
          <div className="text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-emerald-100 to-sky-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
              <Backpack className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
            </div>
            <p className="text-gray-500 text-lg sm:text-xl font-medium">
              No products available in this category.
            </p>
            <p className="text-gray-400 text-sm sm:text-base mt-2">
              Check back soon for new adventures!
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-7xl mx-auto">
            {currentProducts.map((product) => {
              const discountPercent = ((product.discount / product.price) * 100).toFixed(0)
              const finalPrice = product.price - product.discount

              return (
                <div
                  key={product._id}
                  className="group relative flex flex-col w-full bg-white/80 backdrop-blur-sm shadow-xl sm:shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 hover:shadow-2xl sm:hover:shadow-3xl"
                >
                  {/* Product Image */}
                  <div className="relative w-full h-[280px] sm:h-[320px] md:h-[360px] lg:h-[400px] overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
                    {/* Discount Badge */}
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-40">
                      <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl font-bold shadow-md sm:shadow-xl backdrop-blur-sm border border-white/30 transform hover:scale-105 transition-transform">
                        {discountPercent}% OFF
                      </span>
                    </div>

                    {/* Adventure Badge */}
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-40">
                      <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl font-bold shadow-md sm:shadow-xl flex items-center gap-1">
                        <Mountain className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        ADVENTURE
                      </span>
                    </div>

                    {/* Premium Badge */}
                    {discountPercent >= 35 && (
                      <div className="absolute top-16 sm:top-20 right-3 sm:right-4 z-40">
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl font-bold shadow-md sm:shadow-xl flex items-center gap-1">
                          <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          PREMIUM
                        </span>
                      </div>
                    )}

                    <div className="relative w-full h-full overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
                      <img
                        src={product.image.url}
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 sm:group-hover:scale-115 group-hover:rotate-2"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                      <AddToCartButton productId={product._id} />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="relative p-4 sm:p-6 md:p-8 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white flex-1 rounded-b-2xl sm:rounded-b-3xl">
                    <div className="relative z-10">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight mb-3 sm:mb-4 line-clamp-2 group-hover:text-emerald-300 transition-colors duration-500">
                        {product.name}
                      </h3>

                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div className="flex items-baseline gap-2 sm:gap-3 md:gap-4">
                          <span className="font-bold text-xl sm:text-2xl md:text-3xl text-green-400 drop-shadow-sm">
                            ₹{finalPrice.toLocaleString()}
                          </span>
                          <span className="text-sm sm:text-base text-gray-400 line-through">
                            ₹{product.price.toLocaleString()}
                          </span>
                        </div>
                        <div className="text-xs sm:text-sm bg-green-500/20 text-green-300 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl border border-green-500/40 backdrop-blur-sm">
                          Save ₹{product.discount.toLocaleString()}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <div key={i} className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400"></div>
                            ))}
                          </div>
                          <span className="text-xs sm:text-sm text-gray-400">Adventure Ready</span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-emerald-300">
                          <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          <span>Explore More</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Pagination Controls */}
          {pageCount > 1 && (
            <div className="mt-10 flex justify-center">
              <ReactPaginate
                breakLabel="..."
                nextLabel="Next ›"
                previousLabel="‹ Prev"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                pageCount={pageCount}
                forcePage={currentPage}
                containerClassName="flex gap-1 items-center"
                pageClassName="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-sm"
                activeClassName="!bg-[var(--heading-color)] !text-white"
                previousClassName="px-3 py-1 rounded-md bg-gray-200 text-sm"
                nextClassName="px-3 py-1 rounded-md bg-gray-200 text-sm"
                disabledClassName="opacity-50 cursor-not-allowed"
              />
            </div>
          )}
        </>
      )}

      <SmoothSailing />
    </div>
  )
}

export default Duffles
