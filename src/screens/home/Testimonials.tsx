'use client'
import { useEffect, useRef } from "react"
import Image from "next/image"

const testimonials = [
    {
        name: "Alice M.",
        title: "House Seeker",
        quote:
            "This platform made house hunting in Kigali way easier. I found my dream home in just two days!",
        image: "/assets/house/inside1.jpg",
    },
    {
        name: "John K.",
        title: "Agent",
        quote:
            "Listing properties has never been simpler. The UI is smooth, and my listings get noticed fast.",
        image: "/assets/house/inside1.jpg",

    },
    {
        name: "Cynthia R.",
        title: "Renter",
        quote:
            "The chatbot assistant saved me time. It showed me exactly what I needed based on my budget.",
        image: "/assets/house/inside1.jpg",

    },
    {
        name: "Eric N.",
        title: "Buyer",
        quote:
            "I moved to Kigali recently and didn’t know where to start. This platform was a lifesaver.",
        image: "/assets/house/inside1.jpg",

    },
    {
        name: "Linda B.",
        title: "House Owner",
        quote:
            "I posted my house and got contacted within 24 hours. Incredible experience!",
        image: "/assets/house/inside1.jpg",

    },
]

export default function Testimonials() {
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const interval = setInterval(() => {
            if (!scrollRef.current) return

            const container = scrollRef.current
            const scrollWidth = container.scrollWidth
            const clientWidth = container.clientWidth
            const maxScrollLeft = scrollWidth - clientWidth

            if (container.scrollLeft >= maxScrollLeft) {
                container.scrollTo({ left: 0, behavior: "smooth" })
            } else {
                container.scrollBy({ left: 320, behavior: "smooth" })
            }
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    return (
        <section className="bg-slate-100 w-full py-20 px-4 md:px-0">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">What Our Users Say</h2>
                <p className="text-gray-500 mb-10 max-w-xl mx-auto text-center">
                    Real stories from users who found homes or clients through our platform.
                </p>
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide"
                >
                    {testimonials.map((t, index) => (
                        <div
                            key={index}
                            className="min-w-[300px] max-w-xs bg-gray-50 p-6 rounded-2xl  flex-shrink-0"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <Image
                                    width={50}
                                    height={50}
                                    src={t.image}
                                    alt={t.name}
                                    className="w-14 h-14 rounded-full object-cover"
                                />
                                <div>
                                    <p className="font-semibold text-gray-800">{t.name}</p>
                                    <p className="text-sm text-gray-500">{t.title}</p>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm">“{t.quote}”</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
