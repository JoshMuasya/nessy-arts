import HeroClient from "./HeroClient";
import Image from "next/image";

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    src="/hero.jpg"
                    alt="Pencil portrait artwork"
                    className="w-full h-full object-cover opacity-40"
                    fill
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
            </div>
            <HeroClient />
        </section>
    )
}

export default Hero