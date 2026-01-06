"use client";
import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import TrackingInput from "./tracking-input";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const isHome = pathname === "/";

  const navLinks = [
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "track", label: "Track" },
    { id: "footer", label: "Customer Support" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const handleNavClick = (link: { id: string; external?: boolean }) => {
    if (link.external) {
      router.push("/about");
      return;
    }
    if (isHome) {
      scrollToSection(link.id);
    } else {
      router.push(`/#${link.id}`);
    }
    setIsOpen(false);
  };

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close menu on route change
  // useEffect(() => {
  //   setIsOpen(false);
  // }, [pathname]);

  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] lg:w-[90%] max-w-7xl bg-foreground backdrop-blur-lg border border-border/50 rounded-2xl z-40 shadow-soft">
      <div className="px-6" ref={menuRef}>
        <div className="flex items-center justify-between h-17.5">
          {/* Logo */}

          <Image
            src="/logo.png"
            alt="logo"
            width={120}
            height={100}
            className="block dark:hidden pb-4"
            priority
          />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center lg:gap-8 md:gap-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link)}
                className="text-background hover:text-primary transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <TrackingInput className="hidden md:flex" />

            <Button variant="ghost" onClick={() => router.push("/login")}>
              Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link)}
                  className="block w-full text-left px-3 py-2 text-white hover:text-primary transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-4 space-y-2">
                <Button
                  onClick={() => router.push("/login")}
                  className="w-full"
                >
                  Log in
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
