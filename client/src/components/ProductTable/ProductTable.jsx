import { useState } from "react"
import ReactPaginate from "react-paginate"
import ProductRow from "../ProductRow/ProductRow"

const ProductTable = ({ products, loading, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(0) // react-paginate uses 0-based index
  const itemsPerPage = 5

  // Calculate pagination
  const pageCount = Math.ceil(products.length / itemsPerPage)
  const startIndex = currentPage * itemsPerPage
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage)

  // Handle page change
  const handlePageClick = (event) => {
    setCurrentPage(event.selected)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="py-4 px-6 text-left">Image</th>
              <th className="py-4 px-6 text-left">Product Details</th>
              <th className="py-4 px-6 text-left">Price</th>
              <th className="py-4 px-6 text-left">Category</th>
              <th className="py-4 px-6 text-left">Discount</th>
              <th className="py-4 px-6 text-left">Stock</th>
              <th className="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="py-12 text-center">
                  Loading products...
                </td>
              </tr>
            ) : currentProducts.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-12 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            ) : (
              currentProducts.map((p) => (
                <ProductRow
                  key={p._id}
                  product={p}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!loading && products.length > 0 && (
        <div className="flex justify-center px-6 py-4 border-t bg-gray-50">
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
    </div>
  )
}

export default ProductTable
