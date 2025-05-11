"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import ProductCard from "@/components/product-card"
import { products } from "@/lib/products"

export default function FeaturedProducts() {
  const [currentPage, setCurrentPage] = useState(0)
  const featuredProducts = products.filter((product) => product.featured)
  const productsPerPage = 4
  const totalPages = Math.ceil(featuredProducts.length / productsPerPage)

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const currentProducts = featuredProducts.slice(currentPage * productsPerPage, (currentPage + 1) * productsPerPage)

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Explore our handpicked selection of premium tiles and bathroom products.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={prevPage} disabled={totalPages <= 1}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextPage} disabled={totalPages <= 1}>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" asChild>
              <Link href="/products">View All</Link>
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
