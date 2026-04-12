import React from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Container } from '../../components/layout/Container';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar mid />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <Container maxWidth="2xl">
            <div className="text-center space-y-4">
              <h1 className="text-5xl font-bold">About Plastopol</h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Crafting quality seating solutions since inception — built on recycled plastics, built to last.
              </p>
            </div>
          </Container>
        </section>

        {/* Story */}
        <section className="py-20 bg-white">
          <Container maxWidth="2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">Who We Are</h2>
                <p className="text-gray-600 leading-relaxed">
                  Plastopol is a furniture manufacturer specialising in high-quality chairs made from recycled,
                  semi-virgin, and virgin plastic materials. We combine sustainable sourcing with rigorous
                  manufacturing to deliver seating that performs in offices, dining rooms, lounges, and outdoors.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Every chair we make is a commitment — to the environment, to our customers, and to the
                  craftspeople behind every mould and finish.
                </p>
              </div>
              <div className="bg-gray-100 rounded-2xl h-72 flex items-center justify-center">
                <span className="text-gray-400 text-sm">Factory / team photo</span>
              </div>
            </div>
          </Container>
        </section>

        {/* Values */}
        <section className="py-20 bg-gray-50">
          <Container maxWidth="2xl">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What We Stand For</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Sustainability',
                  body: 'We prioritise recycled plastics in our production, reducing landfill waste without compromising quality.',
                },
                {
                  title: 'Durability',
                  body: 'Our chairs are load-tested and weather-rated, built to withstand years of real-world use.',
                },
                {
                  title: 'Transparency',
                  body: 'We are upfront about materials, lead times, and sourcing — no surprises after the order.',
                },
              ].map(({ title, body }) => (
                <div key={title} className="bg-white rounded-xl p-8 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Location */}
        <section className="py-20 bg-white">
          <Container maxWidth="2xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Find Us</h2>
            <div className="rounded-2xl overflow-hidden border border-gray-200 h-96 w-full">
              {/*
                REPLACE THIS COMMENT WITH YOUR GOOGLE MAPS EMBED IFRAME.

                To get the embed link:
                  1. Open Google Maps and search for your location.
                  2. Click Share → Embed a map.
                  3. Copy the <iframe ...> tag and paste it here,
                     replacing this entire comment block.

                The iframe should look roughly like:
                  <iframe
                    src="https://www.google.com/maps/embed?pb=..."
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
              */}
            </div>
          </Container>
        </section>

        {/* Contact nudge */}
        <section className="py-16 bg-blue-600 text-white">
          <Container maxWidth="2xl">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Get in Touch</h2>
              <p className="text-blue-100">
                Interested in bulk orders, custom colours, or have a question? We would love to hear from you.
              </p>
              <p className="font-medium">info@plastopol.com</p>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
