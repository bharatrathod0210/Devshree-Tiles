"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Check, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import ProductCard from "@/components/product-card";
import { notFound } from "next/navigation";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const [selectedImage, setSelectedImage] = useState(0);

  // Get related products (same category)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/products"
          className="flex items-center text-primary mb-8 hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative h-[400px] rounded-lg overflow-hidden mb-4">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`relative h-24 rounded-md overflow-hidden cursor-pointer border-2 ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < product.rating
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600 dark:text-gray-400">
                ({product.reviews} reviews)
              </span>
            </div>
            <p className="text-2xl font-bold mb-4">
              ₹{product.price.toLocaleString()}
            </p>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-sm font-medium mb-1">Size</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {product.size}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Category</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {product.category.charAt(0).toUpperCase() +
                    product.category.slice(1)}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Material</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {product.material}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Finish</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {product.finish}
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-medium mb-2">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="flex-1" asChild>
                <Link href="/contact">Contact for Inquiry</Link>
              </Button>
              <Button size="lg" variant="outline" className="flex-1" asChild>
                <Link href="/products">View More Products</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="specifications">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="installation">Installation</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent
              value="specifications"
              className="p-6 border rounded-md mt-2"
            >
              <h3 className="text-xl font-semibold mb-4">
                Technical Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Dimensions</span>
                    <span>{product.size}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Material</span>
                    <span>{product.material}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Finish</span>
                    <span>{product.finish}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Water Resistance</span>
                    <span>{product.waterResistant ? "Yes" : "No"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Slip Resistance</span>
                    <span>{product.slipResistant ? "Yes" : "No"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Usage</span>
                    <span>{product.usage}</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent
              value="installation"
              className="p-6 border rounded-md mt-2"
            >
              <h3 className="text-xl font-semibold mb-4">
                Installation Guidelines
              </h3>
              <div className="space-y-4">
                <p>
                  For optimal results, we recommend professional installation of
                  our {product.category} tiles. However, if you're planning a
                  DIY project, here are some general guidelines:
                </p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    Prepare the surface by ensuring it's clean, dry, and level.
                  </li>
                  <li>
                    Use appropriate adhesive for the specific tile type and
                    installation area.
                  </li>
                  <li>
                    Start from the center of the room and work outwards for even
                    distribution.
                  </li>
                  <li>
                    Use spacers to maintain consistent gaps between tiles.
                  </li>
                  <li>Allow proper drying time before grouting.</li>
                  <li>Apply grout carefully and clean excess promptly.</li>
                  <li>
                    Seal the grout lines if necessary for the specific
                    installation area.
                  </li>
                </ol>
                <p className="mt-4">
                  For detailed installation instructions specific to this
                  product, please contact our team.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="p-6 border rounded-md mt-2">
              <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className={`h-4 w-4 ${
                              j < 4 + (i % 2)
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        {["2 months ago", "1 week ago", "3 months ago"][i]}
                      </span>
                    </div>
                    <h4 className="font-medium">
                      {
                        [
                          "Great quality!",
                          "Excellent product",
                          "Beautiful tiles",
                        ][i]
                      }
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      {
                        [
                          "These tiles look amazing in my bathroom. The quality is excellent and they were easy to install.",
                          "I'm very impressed with the durability and appearance of these tiles. They transformed my kitchen completely.",
                          "The color is exactly as shown in the pictures. Very happy with my purchase from Devshree Tiles.",
                        ][i]
                      }
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
