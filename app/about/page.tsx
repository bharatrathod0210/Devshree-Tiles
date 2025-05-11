"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">About Devshree Tiles</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Your trusted partner for premium tiles and bathroom products in Sihor, Gujarat.
        </p>
      </motion.div>

      {/* Our Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Devshree Tiles was established with a vision to provide high-quality tiles and bathroom products to
            customers in Sihor and surrounding areas. What started as a small family business has grown into a trusted
            name in the industry.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Our journey began with a simple belief: everyone deserves access to beautiful, durable, and affordable tiles
            for their homes and businesses. Over the years, we've expanded our collection to include a wide range of
            products while maintaining our commitment to quality and customer satisfaction.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Today, we continue to source the finest tiles and bathroom products from leading manufacturers, ensuring
            that our customers receive only the best for their spaces.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative h-[400px] rounded-lg overflow-hidden"
        >
          <Image
            src="/placeholder.svg?height=800&width=1200"
            alt="Devshree Tiles showroom"
            fill
            className="object-cover"
          />
        </motion.div>
      </div>

      {/* Our Mission */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 mb-20"
      >
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            At Devshree Tiles, our mission is to help our customers create beautiful and functional spaces through
            high-quality tiles and bathroom products. We strive to provide exceptional customer service, expert
            guidance, and a diverse range of products to meet every need and preference.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              {
                title: "Quality",
                description: "We source only the finest products from trusted manufacturers.",
              },
              {
                title: "Service",
                description: "We provide personalized guidance and support throughout your project.",
              },
              {
                title: "Value",
                description: "We offer competitive pricing without compromising on quality.",
              },
            ].map((value, index) => (
              <div key={index} className="p-4">
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Our Team */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <h2 className="text-2xl font-bold mb-8 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            {
              name: "L.K. Rathod",
              position: "Founder & CEO",
              image: "/placeholder.svg?height=400&width=400",
            },
          
          ].map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md"
            >
              <div className="relative h-64 w-full">
                <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{member.position}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="bg-primary text-white rounded-lg p-8 text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Visit Our Showroom</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Experience our extensive collection of tiles and bathroom products in person. Our team is ready to help you
          find the perfect products for your space.
        </p>
        <Button size="lg" variant="secondary" asChild>
          <Link href="/contact">Contact Us</Link>
        </Button>
      </motion.div>
    </div>
  )
}
