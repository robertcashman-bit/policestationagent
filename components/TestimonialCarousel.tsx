"use client";

import { useState, useEffect, useCallback } from "react";

interface Testimonial {
  quote: string;
  author: string;
  location: string;
  rating?: number;
}

interface TestimonialCarouselProps {
  /**
   * When true, auto-rotation pauses while the user's pointer is over the carousel.
   * Defaults to false to avoid appearing "stuck" when users scroll and their cursor
   * happens to be over the section.
   */
  pauseOnHover?: boolean;
  /** Auto-rotate interval in milliseconds. */
  autoRotateInterval?: number;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Robert helped me when I was arrested in Swanley. I was very worried but he calmed me down and got me released without charge. Excellent service.",
    author: "AK",
    location: "Swanley",
    rating: 5,
  },
  {
    quote: "Your attendance made the difference between a prison sentence and freedom.",
    author: "MR X",
    location: "Swanley",
    rating: 5,
  },
  {
    quote:
      "Professional, calm and extremely knowledgeable. Robert explained everything clearly and was there throughout the entire process.",
    author: "JB",
    location: "Maidstone",
    rating: 5,
  },
  {
    quote:
      "I was terrified when the police contacted me. Robert attended quickly and handled everything professionally. Case dropped.",
    author: "TC",
    location: "Canterbury",
    rating: 5,
  },
  {
    quote:
      "Excellent duty solicitor. Arrived within 30 minutes and gave me confidence during a very stressful time.",
    author: "DM",
    location: "Medway",
    rating: 5,
  },
  {
    quote:
      "Robert's experience showed from the start. He knew exactly what questions to challenge and protected my rights throughout.",
    author: "SS",
    location: "Gravesend",
    rating: 5,
  },
];

export default function TestimonialCarousel({
  pauseOnHover = false,
  autoRotateInterval = 5000,
}: Readonly<TestimonialCarouselProps>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      goToNext();
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [isPaused, goToNext, autoRotateInterval]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section
      className="py-20 bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 relative overflow-hidden"
      onMouseEnter={pauseOnHover ? () => setIsPaused(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setIsPaused(false) : undefined}
      // Pause when keyboard users focus controls; resume when focus leaves section.
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(e) => {
        const nextFocused = e.relatedTarget as Node | null;
        if (!nextFocused || !e.currentTarget.contains(nextFocused)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_70%)]"></div>
      </div>
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-1 mb-4">
            {["1", "2", "3", "4", "5"].map((k) => (
              <svg
                key={`header-star-${k}`}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-star w-5 h-5 text-amber-400 fill-current"
              >
                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
              </svg>
            ))}
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Trusted by Clients Across Kent
          </h2>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Real experiences from clients we've helped through challenging times
          </p>
        </div>

        <div className="relative">
          <div className="rounded-xl text-card-foreground bg-white/95 backdrop-blur-sm shadow-2xl border-0 overflow-hidden min-h-[400px] flex flex-col justify-center">
            <div className="p-8 md:p-12 relative">
              {/* Quote Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-quote w-12 h-12 text-amber-400 mb-6 opacity-50 absolute top-8 left-8"
              >
                <path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path>
                <path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"></path>
              </svg>

              <div className="pt-10" style={{ opacity: 1, transform: "none" }}>
                <div className="mb-6">
                  {/* Star Rating */}
                  <div className="flex items-center mb-4">
                    {Array.from({ length: currentTestimonial.rating ?? 5 }, (_, i) => i + 1).map(
                      (starNumber) => (
                      <svg
                        key={`rating-star-${starNumber}`}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-star w-5 h-5 text-amber-400 fill-current"
                      >
                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                      </svg>
                      ),
                    )}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-slate-800 text-xl md:text-2xl font-medium leading-relaxed mb-8">
                    "{currentTestimonial.quote}"
                  </blockquote>
                </div>

                {/* Author */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                  <div>
                    <p className="font-bold text-slate-900 text-lg">{currentTestimonial.author}</p>
                    <p className="text-sm text-slate-600">from {currentTestimonial.location}</p>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="absolute bottom-8 right-8 flex items-center gap-2 z-20">
                <button
                  onClick={goToPrev}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-sm hover:text-accent-foreground h-9 w-9 rounded-full hover:bg-blue-50 border-slate-200"
                  aria-label="Previous testimonial"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-left w-5 h-5 text-slate-600"
                  >
                    <path d="m15 18-6-6 6-6"></path>
                  </svg>
                </button>
                <button
                  onClick={goToNext}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-sm hover:text-accent-foreground h-9 w-9 rounded-full hover:bg-blue-50 border-slate-200"
                  aria-label="Next testimonial"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-right w-5 h-5 text-slate-600"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((t, index) => (
              <button
                key={`${t.author}-${t.location}-${index}`}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-amber-400 w-8" : "bg-white/20 hover:bg-white/40 w-2"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
