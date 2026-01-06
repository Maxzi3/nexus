import Link from "next/link";

import { Facebook } from "lucide-react";
import { FaTelegram } from "react-icons/fa6";

import Image from "next/image";

const Footer = () => {
  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Track", href: "#track" },
    { label: "Customer Support", href: "#contact" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#" },

    { icon: FaTelegram, href: "https://t.me/nexusgloballogistics" },
  ];

  return (
    <footer id="footer" className="bg-foreground border-t border-white/10 py-16">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-between gap-12">
        {/* Logo & Brand */}
        <div className="flex flex-col">
          <Image
            src="/logo.png"
            alt="logo"
            width={120}
            height={100}
            className="block dark:hidden"
            priority
          />
          <p className="text-sm text-muted-foreground max-w-xs">
            Reliable logistics solutions to move your goods safely and
            efficiently worldwide.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-2">
          <h4 className="text-white font-semibold mb-4">Navigation</h4>
          {navLinks.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-2">
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <p className="text-sm text-muted-foreground">
            nexusgloballogisticscontact@gmail.com
          </p>
          <p className="text-sm text-primary">Respond within a min</p>
        </div>

        {/* Socials */}
        <div className="flex flex-col gap-2">
          <h4 className="text-white font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-4">
            {socialLinks.map((social, i) => {
              const Icon = social.icon;
              return (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Your Logistics Company. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
