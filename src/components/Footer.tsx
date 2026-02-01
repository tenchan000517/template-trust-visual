import Link from "next/link";
import Image from "next/image";
import { siteInfo, branding, contact, navigation } from "@/lib/site";

const footerLinks = navigation.footer;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-main text-white">
      <div className="max-w-container mx-auto px-4 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-block mb-6">
                <Image
                  src={branding.logo || "/images/logo.svg"}
                  alt={branding.logoAlt || siteInfo.name}
                  width={180}
                  height={45}
                  className="brightness-0 invert"
                />
              </Link>
              {contact.address && (
                <address className="not-italic text-sm text-white/70 leading-relaxed">
                  <p>〒{contact.address.postalCode}</p>
                  <p>
                    {contact.address.prefecture}
                    {contact.address.city}
                    {contact.address.street}
                  </p>
                  {contact.address.building && <p>{contact.address.building}</p>}
                </address>
              )}
            </div>

            {/* Navigation */}
            <div className="lg:col-span-2">
              <nav className="grid grid-cols-2 gap-4">
                {footerLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h4 className="text-sm font-semibold mb-4">お問い合わせ</h4>
              {contact.phone && (
                <div className="mb-4">
                  <a
                    href={`tel:${contact.phoneTel || contact.phone.replace(/-/g, "")}`}
                    className="text-2xl font-bold hover:text-accent transition-colors"
                  >
                    {contact.phone}
                  </a>
                  <p className="text-xs text-white/60 mt-1">{contact.hours}</p>
                </div>
              )}
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  {contact.email}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 border-t border-white/10">
          <p className="text-xs text-white/50 text-center">
            &copy; {currentYear} {siteInfo.name} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
