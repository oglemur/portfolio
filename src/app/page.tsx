"use client";

import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Nav />
      <Hero />
      <Work />
      <About />
      <Footer />
    </motion.main>
  );
}
