import React from "react"
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa"
import { Link } from "react-router"

const Footer = () => {
  return (
    <footer className="w-full bg-[var(--heading-color)] text-white">
      <div className="px-4 sm:px-8 md:px-16 py-8 sm:py-12">
        {/* Top Section - Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10 md:gap-20">
          <div>
            <h4 className="font-bold uppercase text-base sm:text-lg mb-3 sm:mb-4">Support</h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-200">
              <li className="hover:text-[var(--secondary-bg-color)] cursor-pointer transition-colors">Service and Warranty</li>
              <li className="hover:text-[var(--secondary-bg-color)] cursor-pointer transition-colors">Return and Exchange</li>
              <li className="hover:text-[var(--secondary-bg-color)] cursor-pointer transition-colors">Contact</li>
              <li className="hover:text-[var(--secondary-bg-color)] cursor-pointer transition-colors">TSA Lock Instructions</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase text-base sm:text-lg mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-200">
              <li className="hover:text-[var(--secondary-bg-color)] cursor-pointer transition-colors">Damage Policy</li>
              <li className="hover:text-[var(--secondary-bg-color)] cursor-pointer transition-colors">Care and Cleaning</li>
              <li className="hover:text-[var(--secondary-bg-color)] cursor-pointer transition-colors">Packing Tips</li>
              <li className="hover:text-[var(--secondary-bg-color)] cursor-pointer transition-colors">Sustainability</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase text-base sm:text-lg mb-3 sm:mb-4">Account</h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-200">
              <Link to="/auth" className="hover:text-[var(--secondary-bg-color)] cursor-pointer block transition-colors">
                Sign In
              </Link>
              <Link to="#" className="hover:text-[var(--secondary-bg-color)] cursor-pointer block transition-colors">
                Shop All Products
              </Link>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mt-8 sm:mt-10 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          {/* Social Icons */}
          <div className="flex gap-3 sm:gap-4">
            <Link className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[var(--secondary-bg-color)] transition-colors">
              <FaInstagram className="text-lg sm:text-xl" />
            </Link>
            <Link className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[var(--secondary-bg-color)] transition-colors">
              <FaFacebook className="text-lg sm:text-xl" />
            </Link>
            <Link className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[var(--secondary-bg-color)] transition-colors">
              <FaYoutube className="text-lg sm:text-xl" />
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-xs sm:text-sm text-gray-300 text-center sm:text-right">
            © 2025, Your Brand. Powered by <span className="underline">Marmeto</span>.
          </p>
        </div>

        {/* Bottom Links */}
        <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-300 flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6">
          <Link to="#" className="hover:text-[var(--secondary-bg-color)] transition-colors">
            Terms & Conditions
          </Link>
          <Link to="#" className="hover:text-[var(--secondary-bg-color)] transition-colors">
            Privacy
          </Link>
          <Link to="#" className="hover:text-[var(--secondary-bg-color)] transition-colors">
            Personal Information Collection Statement
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
