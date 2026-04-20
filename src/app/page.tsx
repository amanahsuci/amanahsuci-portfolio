import Image from 'next/image';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import About from '../components/About';
import Skills from '../components/Skills';
import Footer from '../components/Footer';


export default function Home() {
  return (
    <>
      <div className="h-screen overflow-y-scroll snap-y snap-proximity scroll-smooth">
        <section id="home" className="h-screen snap-start">
          <Hero />
        </section>
        <section id="about" className="min-h-screen snap-start">
          <About />
        </section>
        <section id="projects" className="min-h-screen snap-start">
          <Projects />
        </section>
        <section id="skills" className="min-h-screen snap-start">
          <Skills />
        </section>
        <Footer />
      </div>
    </>
    
  )
}