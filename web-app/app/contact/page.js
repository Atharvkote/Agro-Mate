"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, Info, Mail, MapPin, Phone } from "lucide-react"

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-16 lg:py-24 bg-gradient-to-b from-white to-green-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-gray-900">
                    Get in Touch With Our Team
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Have questions about Agromate? We're here to help. Reach out to our team for support, sales
                    inquiries, or partnership opportunities.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <a
                    href="#contact-form"
                    className="inline-flex items-center gap-2 justify-center cursor-pointer rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Contact Form <ChevronRight />
                  </a>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 justify-center cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Back to Home <Info className="w-5 h-5" />
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative h-[300px] w-[300px] md:h-[400px] md:w-[400px]">
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-green-100 p-4">
                    <Mail className="h-32 w-32 text-green-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information Section */}
        <section className="w-full py-12 md:py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900">Contact Information</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl">
                  Multiple ways to reach our team for support and inquiries.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-3">
              <div className="overflow-hidden rounded-lg bg-green-500/10 shadow-xl hover:shadow-2xl transition-transform hover:scale-105 duration-300">
                <div className="p-6 font-medium flex flex-col items-center text-center">
                  <Phone className="h-10 w-10 text-green-600 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Phone</h3>
                  <p className="text-sm text-gray-500 mb-2">Customer Support</p>
                  <p className="text-sm font-bold text-green-600">+91 8238343443</p>
                  <p className="text-sm text-gray-500 mt-4 mb-2">Hardware Inquiries</p>
                  <p className="text-sm font-bold text-green-600">+91 8238343443</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg bg-green-500/10 shadow-xl hover:shadow-2xl transition-transform hover:scale-105 duration-300">
                <div className="p-6 font-medium flex flex-col items-center text-center">
                  <Mail className="h-10 w-10 text-green-600 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Email</h3>
                  <p className="text-sm text-gray-500 mb-2">Customer Support</p>
                  <p className="text-sm font-bold text-green-600">support@Agromate.com</p>
                  <p className="text-sm text-gray-500 mt-4 mb-2">Hardware Inquiries</p>
                  <p className="text-sm font-bold text-green-600">hardwareagromate@Agromate.com</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg bg-green-500/10 shadow-xl hover:shadow-2xl transition-transform hover:scale-105 duration-300">
                <div className="p-6 font-medium flex flex-col items-center text-center">
                  <MapPin className="h-10 w-10 text-green-600 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Office Location</h3>
                  <p className="text-sm text-gray-500 mb-2">College</p>
                  <p className="text-sm font-bold text-green-600">Sanjivani College of Egineering</p>
                  <p className="text-sm text-gray-500">Kopargaon 423601</p>
                  <p className="text-sm text-gray-500 mt-4">Monday - Friday: 10AM - 5PM IST</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact-form" className="w-full py-12 md:py-16 lg:py-24 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900">Send Us a Message</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl">
                  Fill out the form below and our team will get back to you as soon as possible.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl py-12">
              {isSubmitted ? (
                <div className="rounded-lg bg-green-50 p-8 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6 w-6 text-green-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-xl font-medium text-green-800">Thank You!</h3>
                  <p className="mt-2 text-sm text-green-700">
                    Your message has been received. Our team will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-green-500"
                        placeholder="Ram Tiwari"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-green-500"
                        placeholder="xyz@example.com"
                      />
                    </div>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-green-500"
                        placeholder="+91 820812338"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium text-gray-700">
                        Company Name
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-green-500"
                        placeholder="Agromate Inc."
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-green-500"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-75"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900">
                  Frequently Asked Questions
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl">
                  Find answers to common questions about Agromate.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl py-12">
              <div className="space-y-6">
                {/* FAQ Item 1 */}
                <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900">
                    How long does it take to set up Agromate sensors?
                  </h3>
                  <p className="mt-2 text-gray-500">
                    Installation typically takes 1-2 hours per acre, depending on the terrain and sensor density. Our
                    team provides comprehensive installation guides and can offer remote support during setup.
                  </p>
                </div>
                {/* FAQ Item 2 */}
                <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900">What types of crops work best with Agromate?</h3>
                  <p className="mt-2 text-gray-500">
                    Agromate is designed to work with a wide range of crops, including row crops, orchards, vineyards,
                    and specialty crops. Our system can be customized to meet the specific needs of your crops.
                  </p>
                </div>
                {/* FAQ Item 3 */}
                <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900">How often do the sensors need maintenance?</h3>
                  <p className="mt-2 text-gray-500">
                    Our sensors are designed for durability and minimal maintenance. We recommend a basic check every 6
                    months and battery replacement once a year, depending on usage patterns.
                  </p>
                </div>
                {/* FAQ Item 4 */}
                <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-lg font-medium text-gray-900">Do you offer custom solutions for large farms?</h3>
                  <p className="mt-2 text-gray-500">
                    Yes, we offer enterprise solutions for large-scale operations. Our team can work with you to develop
                    a customized deployment plan that meets your specific needs and integrates with your existing farm
                    management systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-16 lg:py-24 bg-green-600 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Get Started?</h2>
                <p className="max-w-[900px] md:text-xl">
                  Contact our team today to learn how Agromate can transform your farming operations.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <a
                  href="#contact-form"
                  className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-green-600 shadow-sm hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600"
                >
                  Contact Us
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-md border border-white bg-transparent px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
