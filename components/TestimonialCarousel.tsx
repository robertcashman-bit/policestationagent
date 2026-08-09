"use client";

import { useState, useEffect, useCallback } from "react";

interface Testimonial {
  quote: string;
  author: string;
  location: string;
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
  },
  {
    quote: "Your attendance made the difference between a prison sentence and freedom.",
    author: "MR X",
    location: "Swanley",
  },
  {
    quote:
      "Professional, calm and extremely knowledgeable. Robert explained everything clearly and was there throughout the entire process.",
    author: "JB",
    location: "Maidstone",
  },
  {
    quote:
      "I was terrified when the police contacted me. Robert attended quickly and handled everything professionally. Case dropped.",
    author: "TC",
    location: "Canterbury",
  },
  {
    quote:
      "Excellent duty solicitor. Arrived within 30 minutes and gave me confidence during a very stressful time.",
    author: "DM",
    location: "Medway",
  },
  {
    quote:
      "Robert's experience showed from the start. He knew exactly what questions to challenge and protected my rights throughout.",
    author: "SS",
    location: "Gravesend",
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
      className="relative overflow-hidden bg-primary-dark py-16 text-white md:py-20"
      onMouseEnter={pauseOnHover ? () => setIsPaused(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setIsPaused(false) : undefined}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(e) => {
        const nextFocused = e.relatedTarget as Node | null;
        if (!nextFocused || !e.currentTarget.contains(nextFocused)) {
          setIsPaused(false);
        }
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 20% 20%, rgb(201 162 39 / 0.12), transparent 55%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-6">
        <div className="mb-10 max-w-measure md:mb-12">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-accent-light">
            Client voices
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-white md:text-4xl">
            What people in Kent say after we helped
          </h2>
          <p className="mt-3 text-base text-white/70 md:text-lg">
            Straight feedback from clients we sat with through custody and interview
          </p>
        </div>

        <div className="relative border-t border-white/15 pt-10">
          <p className="font-display text-6xl leading-none text-accent/40 md:text-7xl" aria-hidden="true">
            “
          </p>
          <blockquote className="-mt-6 max-w-3xl font-display text-xl font-medium leading-relaxed text-white md:text-2xl lg:text-[1.75rem]">
            {currentTestimonial.quote}
          </blockquote>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-6 border-t border-white/10 pt-6">
            <div>
              <p className="text-lg font-bold text-white">{currentTestimonial.author}</p>
              <p className="text-sm text-accent-light">from {currentTestimonial.location}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={goToPrev}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/25 text-white transition-colors hover:border-accent hover:bg-white/5"
                aria-label="Previous testimonial"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={goToNext}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/25 text-white transition-colors hover:border-accent hover:bg-white/5"
                aria-label="Next testimonial"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-8 flex gap-2" role="tablist" aria-label="Testimonial slides">
            {testimonials.map((t, index) => (
              <button
                key={`${t.author}-${t.location}-${index}`}
                type="button"
                onClick={() => goToSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-accent"
                    : "w-2 bg-white/25 hover:bg-white/45"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={index === currentIndex ? "true" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
