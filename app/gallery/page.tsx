"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Gallery from "@/components/gallery"
import AnimatedSection from "@/components/animated-section"

// Sample gallery images - in a real site, you would replace these with actual images
const galleryImages = {
  showroom: [
    "/placeholder.svg?height=800&width=1200",
    "/placeholder.svg?height=800&width=1200",
    "/placeholder.svg?height=800&width=1200",
  ],
  floorTiles: [
    "/placeholder.svg?height=800&width=1200",
    "/placeholder.svg?height=800&width=1200",
    "/placeholder.svg?height=800&width=1200",
  ],
  wallTiles: [
    "/placeholder.svg?height=800&width=1200",
    "/placeholder.svg?height=800&width=1200",
    "/placeholder.svg?height=800&width=1200",
  ],
  kitchenTiles: [
    "/placeholder.svg?height=800&width=1200",
    "/placeholder.svg?height=800&width=1200",
    "/placeholder.svg?height=800&width=1200",
  ],
  bathroomTiles: [
    "/placeholder.svg?height=800&width=1200",
    "/placeholder.svg?height=800&width=1200",
    "/placeholder.svg?height=800&width=1200",
  ],
  washbasins: [
    "/placeholder.svg?height=800&width=1200",
    "/placeholder.svg?height=800&width=1200",
    "/placeholder.svg?height=800&width=1200",
  ],
}

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("showroom")

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <AnimatedSection>
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Our Gallery</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 text-center max-w-3xl mx-auto">
          Explore our showroom and product collections through our gallery. Get inspired for your next project.
        </p>
      </AnimatedSection>

      <Tabs defaultValue="showroom" value={activeTab} onValueChange={setActiveTab} className="mb-12">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full mb-8">
          <TabsTrigger value="showroom">Showroom</TabsTrigger>
          <TabsTrigger value="floorTiles">Floor Tiles</TabsTrigger>
          <TabsTrigger value="wallTiles">Wall Tiles</TabsTrigger>
          <TabsTrigger value="kitchenTiles">Kitchen Tiles</TabsTrigger>
          <TabsTrigger value="bathroomTiles">Bathroom Tiles</TabsTrigger>
          <TabsTrigger value="washbasins">Washbasins</TabsTrigger>
        </TabsList>

        <AnimatedSection>
          <TabsContent value="showroom">
            <h2 className="text-2xl font-bold mb-6">Our Showroom</h2>
            <Gallery images={galleryImages.showroom} title="Devshree Tiles Showroom" />
            <p className="mt-6 text-gray-600 dark:text-gray-300">
              Welcome to Devshree Tiles showroom in Sihor. Our spacious showroom displays our extensive collection of
              tiles and bathroom products. Visit us to explore more and get expert advice for your project.
            </p>
          </TabsContent>

          <TabsContent value="floorTiles">
            <h2 className="text-2xl font-bold mb-6">Floor Tiles Collection</h2>
            <Gallery images={galleryImages.floorTiles} title="Floor Tiles" />
            <p className="mt-6 text-gray-600 dark:text-gray-300">
              Our floor tiles collection includes a variety of sizes including 2×2 and 2×4 options. Choose from
              different materials, finishes, and designs to suit your space.
            </p>
          </TabsContent>

          <TabsContent value="wallTiles">
            <h2 className="text-2xl font-bold mb-6">Wall Tiles Collection</h2>
            <Gallery images={galleryImages.wallTiles} title="Wall Tiles" />
            <p className="mt-6 text-gray-600 dark:text-gray-300">
              Enhance your walls with our stunning collection of wall tiles. Available in various patterns, textures,
              and colors to complement any interior style.
            </p>
          </TabsContent>

          <TabsContent value="kitchenTiles">
            <h2 className="text-2xl font-bold mb-6">Kitchen Tiles Collection</h2>
            <Gallery images={galleryImages.kitchenTiles} title="Kitchen Tiles" />
            <p className="mt-6 text-gray-600 dark:text-gray-300">
              Our kitchen tiles are designed to withstand the demands of busy kitchens while adding style and character
              to your space. Explore our range of backsplash and floor options.
            </p>
          </TabsContent>

          <TabsContent value="bathroomTiles">
            <h2 className="text-2xl font-bold mb-6">Bathroom Tiles Collection</h2>
            <Gallery images={galleryImages.bathroomTiles} title="Bathroom Tiles" />
            <p className="mt-6 text-gray-600 dark:text-gray-300">
              Create a spa-like retreat with our bathroom tiles collection. From non-slip floor tiles to decorative wall
              options, we have everything you need for your bathroom renovation.
            </p>
          </TabsContent>

          <TabsContent value="washbasins">
            <h2 className="text-2xl font-bold mb-6">Washbasins Collection</h2>
            <Gallery images={galleryImages.washbasins} title="Washbasins" />
            <p className="mt-6 text-gray-600 dark:text-gray-300">
              Complete your bathroom with our elegant washbasin collection. Choose from various styles, sizes, and
              designs to match your bathroom aesthetic.
            </p>
          </TabsContent>
        </AnimatedSection>
      </Tabs>

      <AnimatedSection className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Visit Our Showroom</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Experience our products in person at our showroom in Sihor. Our team is ready to help you find the perfect
          tiles and bathroom products for your space.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Address</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Deepmala nagar, near jalaram restaurant, bhavnagar-rajkot highway, Sihor, Gujarat 364240
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Opening Hours</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Monday - Saturday: 9:00 AM - 8:00 PM
              <br />
              Sunday: 10:00 AM - 4:00 PM
            </p>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}
