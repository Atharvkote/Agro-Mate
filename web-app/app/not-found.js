"use client"

import React from 'react'
import  Link  from 'next/link';
import { ChevronRight } from 'lucide-react'
import { TbError404 } from "react-icons/tb";
import { IoReloadOutline } from "react-icons/io5";


const NotFound = () => {

    const handleReload = () => { window.location.reload(); }

    return (
        <section className="w-full py-12 md:py-16 lg:py-24 bg-gradient-to-b from-white to-green-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-gray-900">
                                Oops! Page Not Found
                            </h1>
                            <p className="max-w-[600px] text-gray-500 md:text-xl">
                                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                                Please check the URL or return to the homepage.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Link href={'/'}>
                                <button className="inline-flex items-center gap-2 justify-center cursor-pointer rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                                    Back to Home <ChevronRight />
                                </button>
                            </Link>
                            <button 
                            onClick={handleReload}
                            className="inline-flex items-center gap-2 justify-center cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                                Try Again <IoReloadOutline className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="relative h-[300px] w-[300px] md:h-[400px] md:w-[400px]">
                            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-green-100 p-4">
                                <TbError404 className="h-64 w-64 text-green-600" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NotFound