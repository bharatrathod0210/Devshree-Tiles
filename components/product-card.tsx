"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Star } from "lucide-react"
import type { Product } from "@/lib/products"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="relative h-48 sm:h-64 group">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.isNew && <Badge className="absolute top-2 left-2 bg-primary hover:bg-primary">New</Badge>}
          {product.discount > 0 && (
            <Badge variant="destructive" className="absolute top-2 right-2">
              {product.discount}% OFF
            </Badge>
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <Button size="sm" variant="secondary" asChild>
              <Link href={`/products/${product.id}`}>
                <Eye className="h-4 w-4 mr-1" /> Quick View
              </Link>
            </Button>
          </div>
        </div>
        <CardContent className="pt-4 flex-grow">
          <div className="flex items-center mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < product.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">({product.reviews})</span>
          </div>
          <h3 className="font-medium line-clamp-1">{product.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mb-2">
            {product.size} • {product.material}
          </p>
          <div className="flex items-center">
            <span className="font-bold text-lg">₹{product.price.toLocaleString()}</span>
            {product.discount > 0 && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ₹{Math.round(product.price / (1 - product.discount / 100)).toLocaleString()}
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button className="w-full" size="sm" asChild>
            <Link href={`/products/${product.id}`}>
              <Eye className="h-4 w-4 mr-2" /> View Details
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
