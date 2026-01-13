'use client';

export default function SplitSection({ section }: { section: any }) {
    return (
        <section className="h-screen flex relative z-30 bg-black">
            <div className="w-1/2 h-full relative overflow-hidden border-r border-white/10 group">
                <img src={section.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 filter hue-rotate-180" />
            </div>
            <div className="w-1/2 h-full relative overflow-hidden group">
                <img src={section.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-8 py-4 border border-white/20">
                <span className="font-mono text-xs tracking-[0.5em] uppercase">VS</span>
            </div>
        </section>
    )
}
