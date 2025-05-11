import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"
import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <Logo className="h-8 w-auto" />
              <span className="ml-2 text-lg font-bold">Devshree Tiles</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Premium tiles and bathroom products for your home and business.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-primary dark:text-gray-300">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-primary dark:text-gray-300">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-primary dark:text-gray-300">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/products", label: "Products" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-600 hover:text-primary dark:text-gray-300 text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-2 shrink-0" />
                <span className="text-gray-600 dark:text-gray-300 text-sm">
                  Deepmala nagar, near jalaram restaurant, bhavnagar-rajkot highway, Sihor, Gujarat 364240
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-2 shrink-0" />
                <span className="text-gray-600 dark:text-gray-300 text-sm">+91 9898273236</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-2 shrink-0" />
                <span className="text-gray-600 dark:text-gray-300 text-sm">lkrathod3236@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Your email" className="max-w-[220px]" />
              <Button type="submit" size="sm">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 text-center text-sm text-gray-600 dark:text-gray-300">
          <p>© {new Date().getFullYear()} Devshree Tiles. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
