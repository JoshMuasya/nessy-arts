import Link from "next/link"

const Footer = () => {
    return (
        <footer className="border-t border-border bg-card py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="font-display text-xl font-semibold mb-3">
                            <span className="text-gradient-gold">Nessy</span> Art
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed  w-full md:w-2/3">
                            Transforming cherished moments into timeless pencil and charcoal portraits.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-display text-sm font-semibold text-primary mb-3 uppercase tracking-wider">Quick Links</h4>
                        <div className="flex flex-col gap-2">
                            {["Gallery", "About", "Pricing", "Order"].map((l) => (
                                <Link key={l} href={`/${l.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    {l}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-display text-sm font-semibold text-primary mb-3 uppercase tracking-wider">Contact</h4>
                        <p className="text-sm text-muted-foreground">hello@nessyart.com</p>
                        <p className="text-sm text-muted-foreground mt-1">Follow us on Instagram</p>
                    </div>
                </div>
                <div className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground">
                    © {new Date().getFullYear()} Nessy Art. All rights reserved.
                </div>
            </div>
        </footer>
    )
}

export default Footer