import Link from "next/link";
import {
  BarChart3,
  CheckCircle,
  ChevronRight,
  Info,
  Leaf,
  LogIn,
  Menu,
  TreesIcon as Plant,
  Sprout,
} from "lucide-react";
import Image from "next/image";
import Logo from "@/public/agroLogo.png";
import { AlertTitle } from "@/components/UI/alert";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-16 lg:py-24 bg-gradient-to-b from-white to-green-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-5xl/none text-gray-900">
                  Agriculture Monitoring and recommendation Tech-based Evaluation
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Revolutionize your agricultural practices with IoT-based
                    soil health monitoring and intelligent recommendations.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <button className="inline-flex items-center gap-2 justify-center cursor-pointer rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                    Get Started <ChevronRight />
                  </button>
                  <button className="inline-flex items-center gap-2 justify-center cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                    Learn More <Info className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative h-[300px] w-[300px] md:h-[400px] md:w-[400px]">
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-green-100 p-4">
                    <Image src={Logo} width={360} height={360} alt="logo" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="w-full py-12 md:py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900">
                  What We Offer
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl">
                  Agromate provides comprehensive soil health monitoring and
                  intelligent recommendations to optimize your farming
                  practices.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="overflow-hidden rounded-lg bg-green-500/10  shadow-xl hover:shadow-2xl transition-transform hover:scale-105 duration-300">
                <div className="p-6 font-medium">
                  <Leaf className="h-10 w-10 text-green-600 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Real-time Monitoring
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Track soil moisture, nutrients, pH levels, and temperature
                    in real-time.
                  </p>
                  <p className="text-sm text-gray-500">
                    Our IoT sensors provide continuous data collection, giving
                    you up-to-the-minute insights about your soil's health.
                  </p>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg bg-green-500/10  shadow-xl hover:shadow-2xl transition-transform hover:scale-105 duration-300">
                <div className="p-6 font-medium">
                  <BarChart3 className="h-10 w-10 text-green-600 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Data Analytics
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Advanced analytics to interpret soil data and identify
                    patterns.
                  </p>
                  <p className="text-sm text-gray-500">
                    Our AI-powered platform analyzes soil data to provide
                    actionable insights and predictive recommendations.
                  </p>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg  bg-green-500/10  shadow-xl hover:shadow-2xl transition-transform hover:scale-105 duration-300">
                <div className="p-6 font-medium">
                  <Sprout className="h-10 w-10 text-green-600 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Smart Recommendations
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Personalized recommendations for optimal crop growth.
                  </p>
                  <p className="text-sm text-gray-500">
                    Receive tailored suggestions for irrigation, fertilization,
                    and crop rotation based on your soil's specific needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* System Flow Section */}
        <section className="w-full py-12 md:py-16 lg:py-24 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900">
                  How It Works
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl">
                  Our streamlined process makes soil monitoring and optimization
                  simple and effective.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl py-10">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 py-6">
                <div className="md:w-1/2 order-2 md:order-1">
                  <div className="space-y-2">
                    <div className="inline-flex items-center rounded-full border border-green-200 px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                      Step 1
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Install Sensors
                    </h3>
                    <p className="text-gray-500">
                      Place our IoT sensors in your fields to begin collecting
                      soil data. The installation process is simple and requires
                      no technical expertise.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-center order-1 md:order-2">
                  <div className="relative h-[200px] w-[200px] rounded-full bg-green-100 flex items-center justify-center">
                    <Plant className="h-20 w-20 text-green-600" />
                  </div>
                </div>
              </div>

              {/* Connector */}
              <div className="flex justify-center">
                <div className="h-12 w-0.5 bg-green-200"></div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 py-6">
                <div className="md:w-1/2 flex justify-center">
                  <div className="relative h-[200px] w-[200px] rounded-full bg-green-100 flex items-center justify-center">
                    <BarChart3 className="h-20 w-20 text-green-600" />
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="space-y-2">
                    <div className="inline-flex items-center rounded-full border border-green-200 px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                      Step 2
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Data Collection & Analysis
                    </h3>
                    <p className="text-gray-500">
                      Our sensors continuously collect data on soil moisture,
                      nutrients, pH levels, and temperature. This data is
                      transmitted to our cloud platform for analysis.
                    </p>
                  </div>
                </div>
              </div>

              {/* Connector */}
              <div className="flex justify-center">
                <div className="h-12 w-0.5 bg-green-200"></div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 py-6">
                <div className="md:w-1/2 order-2 md:order-1">
                  <div className="space-y-2">
                    <div className="inline-flex items-center rounded-full border border-green-200 px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                      Step 3
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Receive Recommendations
                    </h3>
                    <p className="text-gray-500">
                      Based on the analyzed data, our AI generates personalized
                      recommendations for irrigation, fertilization, and crop
                      management.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-center order-1 md:order-2">
                  <div className="relative h-[200px] w-[200px] rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-20 w-20 text-green-600" />
                  </div>
                </div>
              </div>

              {/* Connector */}
              <div className="flex justify-center">
                <div className="h-12 w-0.5 bg-green-200"></div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 py-6">
                <div className="md:w-1/2 flex justify-center">
                  <div className="relative h-[200px] w-[200px] rounded-full bg-green-100 flex items-center justify-center">
                    <Sprout className="h-20 w-20 text-green-600" />
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="space-y-2">
                    <div className="inline-flex items-center rounded-full border border-green-200 px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                      Step 4
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Implement & Optimize
                    </h3>
                    <p className="text-gray-500">
                      Apply the recommendations to your farming practices and
                      monitor the improvements. Our system continuously learns
                      and adapts to provide increasingly accurate
                      recommendations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Milestones Section */}
        <section className="w-full py-12 md:py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900">
                  Our Milestones
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl">
                  Tracking our journey to revolutionize agricultural practices.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center space-y-2 border bg-green-500/10 border-green-500 transition-transform hover:scale-105 duration-300 rounded-lg p-4 shadow-sm">
                <div className="text-3xl font-bold text-green-600">1000+</div>
                <p className="text-sm text-center text-gray-500 font-semibold">
                  Sensors Deployed
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border bg-green-500/10 border-green-500 transition-transform hover:scale-105 duration-300 rounded-lg p-4 shadow-sm">
                <div className="text-3xl font-bold text-green-600">500+</div>
                <p className="text-sm text-center text-gray-500 font-semibold">
                  Farms Optimized
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border bg-green-500/10 border-green-500 transition-transform hover:scale-105 duration-300 rounded-lg p-4 shadow-sm">
                <div className="text-3xl font-bold text-green-600">30%</div>
                <p className="text-sm text-center text-gray-500 font-semibold">
                  Average Yield Increase
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border bg-green-500/10 border-green-500 transition-transform hover:scale-105 duration-300 rounded-lg p-4 shadow-sm">
                <div className="text-3xl font-bold text-green-600">25%</div>
                <p className="text-sm text-center text-gray-500 font-semibold">
                  Water Usage Reduction
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-16 lg:py-24 bg-green-600 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Ready to Transform Your Farming?
                </h2>
                <p className="max-w-[900px] md:text-xl">
                  Join thousands of farmers who have already optimized their
                  agricultural practices with Agromate.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <button className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-green-600 shadow-sm hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600">
                  Get Started
                </button>
                <button className="inline-flex items-center justify-center rounded-md border border-white bg-transparent px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
