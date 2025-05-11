import Link from "next/link";
import {
  Award,
  BookOpen,
  Calendar,
  ChevronRight,
  Globe,
  GraduationCap,
  Heart,
  Info,
  Leaf,
  Users,
} from "lucide-react";
import M from "@/public/TeamMale.jpg";
import F from "@/public/TeamFemale.png";
import { Github, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import { FaPeopleGroup } from "react-icons/fa6";

const teamMembers = [
  {
    name: "Sakshi Khomane",
    image: F,
    github: "https://github.com/sakshikhomane",
    linkedin: "https://linkedin.com/in/sakshikhomane",
    twitter: "https://twitter.com/sakshikhomane",
  },
  {
    name: "Bharat Kolhe",
    image: M,
    github: "https://github.com/bharatkolhe",
    linkedin: "https://linkedin.com/in/bharatkolhe",
    twitter: "https://twitter.com/bharatkolhe",
  },
  {
    name: "Bhushan Korde",
    image: M,
    github: "https://github.com/bhushankorde",
    linkedin: "https://linkedin.com/in/bhushankorde",
    twitter: "https://twitter.com/bhushankorde",
  },
  {
    name: "Atharva Kote",
    image: M,
    github: "https://github.com/atharvakote",
    linkedin: "https://linkedin.com/in/atharvakote",
    twitter: "https://twitter.com/atharvakote",
  },
  {
    name: "Priya Kshirsagar",
    image: F,
    github: "https://github.com/priyakshirsagar",
    linkedin: "https://linkedin.com/in/priyakshirsagar",
    twitter: "https://twitter.com/priyakshirsagar",
  },
];

const timelineItems = [
  {
    year: "Jan 2025",
    title: "Idea Phase - The Birth of Agromate",
    description:
      "Agromate emerged from a research initiative at Agricultural University, driven by the need to address critical soil health issues. The innovative concept, combining IoT with soil monitoring, attracted attention from agricultural experts, ultimately leading to the formation of the startup.",
  },
  {
    year: "Jan 2025",
    title: "Requirements Analysis - Understanding the Problem",
    description:
      "In this phase, the team focused on defining the core requirements for the system, identifying key parameters such as soil moisture, pH, and temperature. Initial prototypes were built to test the feasibility of these sensors in real-world agricultural settings, laying the groundwork for future development.",
  },
  {
    year: "Feb 2025",
    title: "System Architecture & Components Designing - Blueprint for Innovation",
    description:
      "The design phase began with creating a detailed system architecture, integrating sensors, microcontrollers, and cloud services. The engineering team worked closely with local farmers to refine prototypes, which were tested across 10 farms, confirming the system’s ability to provide accurate, real-time soil health data.",
  },
  {
    year: "Mar 2025",
    title: "Virtual Circuit Designing - Preparing for Scalable Manufacturing",
    description:
      "As the prototypes showed success, Agromate transitioned to designing virtual circuits and scalable manufacturing processes. This phase marked a significant milestone as the company secured $5 million in Series A funding, enabling the expansion of R&D efforts and preparation for mass production of the system.",
  },
  {
    year: "Apr 2025",
    title: "First Prototype - Bringing the Idea to Life",
    description:
      "The first fully functional prototype was developed, incorporating all the features planned in the earlier phases. Testing began in collaboration with partner farms, providing real-world data that was crucial for refining the design. The company also initiated plans for scaling production, ensuring that the solution could meet growing demand.",
  },
];


export default function Page() {
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
                    Our Mission to Revolutionize Agriculture
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    At Agromate, we're dedicated to empowering farmers with
                    cutting-edge technology for sustainable and efficient
                    farming practices.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center gap-2 justify-center cursor-pointer rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Contact Us <ChevronRight />
                  </Link>
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
                    <FaPeopleGroup className="text-green-600 w-36 h-36"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Leadership Team */}
        <section className="w-full py-12 md:py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900">
                  Our Leadership Team
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl">
                  Meet the experts behind Agromate&apos;s innovative agricultural
                  solutions.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-4"
                >
                  <div className="h-40 w-40 overflow-hidden rounded-full bg-gray-200">
                    <Image
                      src={member.image}
                      alt={`${member.name} portrait`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {member.name}
                    </h3>
                    <div className="flex justify-center gap-4 text-gray-500">
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                           className="bg-green-100 p-2 rounded-full"
                        >
                          <Github className="h-5 w-5 text-green-700  transition-colors" />
                        </a>
                      )}
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-100 p-2 rounded-full"
                        >
                          <Linkedin className="h-5 w-5 text-green-700 transition-colors" />
                        </a>
                      )}
                      {member.twitter && (
                        <a
                          href={member.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                           className="bg-green-100 p-2 rounded-full transition-transform hover:scale-105 duration-300"
                        >
                          <Twitter className="h-5 w-5 text-green-700 transition-colors" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="w-full py-12 md:py-16 lg:py-24 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900">
                  Our Journey
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl">
                  Key milestones in Agromate&apos;s evolution.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl py-12">
              <div className="space-y-8">
                {timelineItems.map((item, index) => (
                  <div key={index} className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white">
                        <Calendar className="text-white h-5 w-5" />
                      </div>
                      {index < timelineItems.length - 1 && (
                        <div className="h-full w-0.5 bg-green-200"></div>
                      )}
                    </div>
                    <div className="pb-8">
                      <div className="text-lg font-bold text-gray-900">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-bold text-green-600">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-gray-500">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-16 lg:py-24 bg-green-600 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Join Our Mission
                </h2>
                <p className="max-w-[900px] md:text-xl">
                  Be part of the agricultural revolution and help us create a
                  more sustainable future for farming.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-green-600 shadow-sm hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600"
                >
                  Contact Us
                </Link>
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
  );
}
