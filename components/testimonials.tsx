"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, ArrowRight, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Rajesh Patel",
    role: "Homeowner",
    content:
      "We renovated our entire house with tiles from Devshree Tiles. The quality is exceptional and the team provided excellent guidance in selecting the perfect tiles for each room.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Interior Designer",
    content:
      "As an interior designer, I've worked with many tile suppliers, but Devshree Tiles stands out for their extensive collection and quality products. My clients are always satisfied with the results.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Amit Singh",
    role: "Contractor",
    content:
      "I've been sourcing tiles from Devshree Tiles for my construction projects for years. Their products are durable, aesthetically pleasing, and reasonably priced. Highly recommended!",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Neha Desai",
    role: "Restaurant Owner",
    content:
      "We used Devshree Tiles for our restaurant renovation. The kitchen tiles are not only beautiful but also practical and easy to clean. Excellent service and quality products.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 5,
    name: "Vikram Mehta",
    role: "Architect",
    content:
      "Devshree Tiles offers a great selection of premium tiles that meet the high standards required for my architectural projects. Their team is knowledgeable and professional.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export default function Testimonials() {
  const [currentPage, setCurrentPage] = useState(0)
  const testimonialsPerPage = 3
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage)

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const currentTestimonials = testimonials.slice(
    currentPage * testimonialsPerPage,
    (currentPage + 1) * testimonialsPerPage,
  )

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience with
            Devshree Tiles.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {currentTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-primary/40 mb-4" />
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{testimonial.content}</p>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-4">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-2">
          <Button variant="outline" size="icon" onClick={prevPage} disabled={totalPages <= 1}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextPage} disabled={totalPages <= 1}>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
