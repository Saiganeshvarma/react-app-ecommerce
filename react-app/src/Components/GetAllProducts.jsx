import { useEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { fetchProducts } from '../Slices/ProductSlice'
import { addToCart } from '../Slices/CartSlice'
import { useNavigate } from "react-router-dom"
import { toast, Toaster } from "react-hot-toast"
import SearchFilter from "./SearchFilter"
import DeleteProduct from "./DeleteProduct"
import UpdateProduct from "./UpdateProducts"

const ProductSkeleton = () => (
  <div className="card product-card" style={{ overflow: "hidden" }}>
    <div style={{ aspectRatio: "1/1", background: "rgba(255,255,255,0.05)", animation: "pulse 1.6s ease-in-out infinite" }} />
    <div className="card-body" style={{ gap: 10 }}>
      <div style={{ height: 14, borderRadius: 8, background: "rgba(255,255,255,0.06)", width: "70%", animation: "pulse 1.6s ease-in-out infinite" }} />
      <div style={{ height: 12, borderRadius: 8, background: "rgba(255,255,255,0.04)", animation: "pulse 1.6s ease-in-out infinite" }} />
      <div style={{ height: 12, borderRadius: 8, background: "rgba(255,255,255,0.04)", width: "55%", animation: "pulse 1.6s ease-in-out infinite" }} />
    </div>
  </div>
)

const GetAllProducts = () => {
  const { items, loading, error } = useSelector((state) => state.products)
  const { user } = useSelector((state) => state.auth)
  const { actionLoading } = useSelector((state) => state.cart)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Search & filter state — only used for user view
  const [search, setSearch]         = useState("")
  const [sort, setSort]             = useState("default")
  const [priceRange, setPriceRange] = useState(500000)

  useEffect(() => { dispatch(fetchProducts()) }, [dispatch])

  const handleAddToCart = (productId) => {
    dispatch(addToCart({ productId, quantity: 1 }))
      .unwrap()
      .then(() => toast.success("Added to cart 🛒"))
      .catch((err) => toast.error(err || "Failed to add"))
  }

  // Filter + sort — only applied for non-admin
  const filtered = useMemo(() => {
    if (user?.role === "admin") return items

    let list = items.filter((p) => {
      const matchSearch = p.title?.toLowerCase().includes(search.toLowerCase()) ||
                          p.description?.toLowerCase().includes(search.toLowerCase())
      const matchPrice  = p.price <= priceRange
      return matchSearch && matchPrice
    })

    switch (sort) {
      case "price-asc":  list = [...list].sort((a, b) => a.price - b.price); break
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break
      case "name-asc":   list = [...list].sort((a, b) => a.title.localeCompare(b.title)); break
      case "name-desc":  list = [...list].sort((a, b) => b.title.localeCompare(a.title)); break
      default: break
    }

    return list
  }, [items, search, sort, priceRange, user])

  if (loading) return (
    <div className="grid grid-products">
      {[1,2,3,4,5,6].map(i => <ProductSkeleton key={i} />)}
    </div>
  )

  if (error) return (
    <div className="card">
      <div className="card-body" style={{ color: "var(--danger)" }}>{error}</div>
    </div>
  )

  return (
    <>
      <Toaster />

      {/* Search & filter — user only */}
      {user?.role !== "admin" && (
        <SearchFilter
          search={search}
          onSearch={setSearch}
          sort={sort}
          onSort={setSort}
          priceRange={priceRange}
          onPriceRange={setPriceRange}
          total={items.length}
          filtered={filtered.length}
        />
      )}

      {filtered.length === 0 ? (
        <div className="products-empty">
          <div className="products-empty-icon">🔍</div>
          <h3>No products found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-products">
          {filtered.map((product) => (
            <div key={product._id} className="card product-card">
              <div
                className="product-media"
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/product/${product._id}`)}
              >
                {product.image?.url ? (
                  <img src={product.image.url} alt={product.title} loading="lazy" />
                ) : (
                  <div className="product-no-img">📦</div>
                )}
              </div>

              <div className="card-body">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-desc">{product.description}</p>

                <div className="price-row">
                  <div className="price">₹ {product.price?.toLocaleString()}</div>
                  <button
                    className="btn btn-ghost"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    View
                  </button>
                </div>

                {user?.role === "admin" ? (
                  <div className="actions-row">
                    <UpdateProduct product={product} />
                    <DeleteProduct id={product._id} title={product.title} />
                  </div>
                ) : (
                  <div className="actions-row">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAddToCart(product._id)}
                      disabled={actionLoading}
                    >
                      🛒 Add to Cart
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default GetAllProducts
