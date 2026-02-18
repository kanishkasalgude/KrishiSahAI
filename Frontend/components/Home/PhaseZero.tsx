import React from 'react';
import { useLanguage } from '../../src/context/LanguageContext';

const images = [
    '/phase_zero/WhatsApp Image 2026-02-15 at 12.39.14 PM.jpeg',
    '/phase_zero/WhatsApp Image 2026-02-15 at 12.39.15 PM.jpeg',
    '/phase_zero/WhatsApp Image 2026-02-15 at 12.39.16 PM.jpeg',
    '/phase_zero/WhatsApp Image 2026-02-15 at 12.41.32 PM.jpeg',
    '/phase_zero/WhatsApp Image 2026-02-15 at 12.42.22 PM.jpeg',
    '/phase_zero/WhatsApp Image 2026-02-15 at 12.42.25 PM.jpeg',
    '/phase_zero/WhatsApp Image 2026-02-15 at 12.42.26 PM.jpeg',
    '/phase_zero/WhatsApp Image 2026-02-15 at 12.42.28 PM.jpeg',
    '/phase_zero/WhatsApp Image 2026-02-15 at 12.42.29 PM.jpeg',
    '/phase_zero/WhatsApp Image 2026-02-15 at 12.42.30 PM.jpeg',
    '/phase_zero/WhatsApp Image 2026-02-15 at 12.42.31 PM.jpeg',
    '/phase_zero/WhatsApp Image 2026-02-15 at 12.42.32 PM.jpeg',
    '/phase_zero/WhatsApp Image 2026-02-15 at 12.47.11 PM.jpeg',
];

const PhaseZero: React.FC = () => {
    const { t } = useLanguage();

    // Duplicate list for seamless loop
    const displayImages = [...images, ...images];

    return (
        <section id="validation" className="w-full bg-[#FAF4E8] py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-8 mb-12 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F3E5D0] text-[#8B5E3C] rounded-full text-sm font-bold mb-4">
                    <span className="w-2 h-2 rounded-full bg-[#8B5E3C] animate-pulse"></span> {t.validationBadge}
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#2D241E] leading-tight">
                    {t.validationTitle}
                </h2>
            </div>

            <div className="relative group">
                <div className="flex animate-scroll hover:pause-scroll">
                    {displayImages.map((src, index) => (
                        <div
                            key={`${src}-${index}`}
                            className="px-4 flex-shrink-0"
                            style={{ width: 'calc(100vw / 1.2)', maxWidth: '360px' }}
                        >
                            <div className="bg-white rounded-[20px] shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-[#E8DCC4]">
                                <div className="aspect-[4/5] relative">
                                    <img
                                        src={src}
                                        alt={`Validation phase ${index + 1}`}
                                        loading="lazy"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-360px * ${images.length} - 32px * ${images.length}));
          }
        }

        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 25s linear infinite;
        }

        .hover\\:pause-scroll:hover {
          animation-play-state: paused;
        }

        @media (min-width: 768px) {
           @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-360px * ${images.length} - 32px * ${images.length}));
            }
          }
        }
      `}</style>
        </section>
    );
};

export default PhaseZero;
