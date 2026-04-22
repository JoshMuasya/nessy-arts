import AnimatedSection from "./AnimatedSection"

interface Props {
    title: string;
    subtitle?: string;
    gold?: boolean;
}

const SectionHeading = ({ title, subtitle, gold = true }: Props) => {
    return (
        <AnimatedSection className="text-center mb-7">
            <h2 className={`font-display text-3xl md:text-4xl font-semibold mb-3 ${gold ? "bg-gradient-to-r from-[oklch(0.82_0.12_85)] via-[oklch(0.72_0.16_75)] to-[oklch(0.58_0.18_70)] bg-clip-text text-transparent" : "text-foreground"}`}>
                {title}
            </h2>
            {subtitle && <p className="text-muted-foreground max-w-xl mx-auto">{subtitle}</p>}
            <div className="w-16 h-0.5 bg-primary mx-auto mt-4" />
        </AnimatedSection>
    )
}

export default SectionHeading