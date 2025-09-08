import React, { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { motion } from 'framer-motion'
import { FiMail, FiGithub, FiLinkedin } from 'react-icons/fi'

// ---------- Simple Typewriter Hook ----------
function useTypewriter(words = [], loop = true, delay = 2000) {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [forward, setForward] = useState(true)

  useEffect(() => {
    if (!words.length) return
    const timeout = setTimeout(() => {
      setText(words[index].slice(0, subIndex))
      if (forward) {
        if (subIndex + 1 <= words[index].length) setSubIndex(s => s + 1)
        else setForward(false)
      } else {
        if (subIndex - 1 >= 0) setSubIndex(s => s - 1)
        else {
          setForward(true)
          setIndex(i => (i + 1) % words.length)
        }
      }
    }, forward ? 80 : 40)
    return () => clearTimeout(timeout)
  }, [subIndex, index, forward, words])

  useEffect(() => {
    if (!loop) return
  }, [loop])

  return text
}

// ---------- 3D Animated Logo (simple shapes) ----------
function FloatingLogo() {
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    ref.current.rotation.y = 0.3 * Math.sin(t / 2)
    ref.current.rotation.x = 0.15 * Math.cos(t / 3)
    ref.current.position.y = 0.2 * Math.sin(t * 1.2)
  })
  return (
    <group ref={ref}>
      <mesh position={[0, 0.1, 0]}>
        <torusGeometry args={[0.9, 0.2, 32, 64]} />
        <meshStandardMaterial metalness={0.9} roughness={0.2} envMapIntensity={1} />
      </mesh>
      <mesh position={[0, 0.65, 0]}>
        <icosahedronGeometry args={[0.35, 1]} />
        <meshStandardMaterial color={'#f59e0b'} metalness={0.8} roughness={0.1} />
      </mesh>

    </group>
  )
}

function Hero3D() {
  return (
    <div className="h-96 md:h-[520px] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900/60 to-slate-800/40">
      <Canvas camera={{ position: [0, 1.2, 3], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <Suspense fallback={null}>
          <FloatingLogo />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} />
      </Canvas>
    </div>
  )
}

// ---------- Project Card ----------
function ProjectCard({ p }) {
  return (
    <motion.a
      whileHover={{ translateY: -8 }}
      className="group block p-6 bg-white/5 border border-white/6 rounded-2xl backdrop-blur-md hover:shadow-2xl transition-shadow duration-300"
      href={p.link || '#'}
      target="_blank"
      rel="noreferrer"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">{p.title}</h3>
          <p className="text-sm text-slate-300 mt-1">{p.summary}</p>
        </div>
        <div className="ml-4 text-slate-300 text-sm">{p.tech}</div>
      </div>
      <div className="mt-4 flex gap-2 text-xs text-slate-400">
        {p.tags?.map((t, i) => (
          <span key={i} className="px-2 py-1 rounded-full bg-white/3">{t}</span>
        ))}
      </div>
    </motion.a>
  )
}

// ---------- Main App ----------
export default function App() {
  const typeText = useTypewriter([
    'Full-Stack Developer',
    'Backend & DevOps Enthusiast',
    'Java Enthusiast',
    'Founder — Game Shiksha'
  ])

  const projects = [
    {
      title: 'Kaamgar Sahayak Junction',
      summary: 'Job facilitation platform connecting daily wage workers with contractors nearby.',
      tech: 'Spring Boot • React • PostgreSQL',
      link: 'https://github.com/ascentway/Kamgar-Portal',
      tags: ['FY Project', 'Job Portal']
    },
    {
      title: 'Auto Billing System',
      summary: 'Automated billing for owners & tenants with PDFs, notifications and payment flow.',
      tech: 'Spring Boot • Kafka • React',
      link: 'https://github.com/ascentway/auto-billing-backend',
      tags: ['Billing', 'Event-Driven']
    },
    {
      title: 'Online Appointment System',
      summary: 'Doctor appointment and health record management system with role-based access.',
      tech: 'Spring Boot • React • PostgreSQL',
      link: 'https://github.com/ascentway/Online-Appointment-System',
      tags: ['Healthcare', 'Full-Stack']
    },
    {
      title: 'ChargeLink',
      summary: 'Smart EV charging station locator with real-time availability & booking.',
      tech: 'Spring Boot • React • Google Maps API',
      link: 'https://github.com/ascentway/ChargeLinK',
      tags: ['EV', 'Maps']
    },
    {
      title: 'Game Shiksha (Startup)',
      summary: 'An education-gamified platform and tournament system for students — founder project.',
      tech: 'Web • Game Systems',
      link: '#',
      tags: ['Startup', 'Founder']
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6 md:p-12">
      <header className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-xl font-bold shadow-lg">DR</div>
          <div>
            <h1 className="text-2xl font-bold">Dhruv Ranjan</h1>
            <p className="text-sm text-slate-300">B.Tech IT — Arya College • Jaipur</p>
          </div>
        </div>
        <nav className="flex items-center gap-4">
          <a className="text-sm text-slate-300 hover:text-white" href="#projects">Projects</a>
          <a className="text-sm text-slate-300 hover:text-white" href="#about">About</a>
          <a className="text-sm text-slate-300 hover:text-white" href="#contact">Contact</a>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <section className="md:col-span-2">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="rounded-2xl p-8 bg-gradient-to-br from-slate-800/40 to-slate-700/30 border border-white/6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-full md:w-1/2">
                  <h2 className="text-3xl md:text-4xl font-extrabold">Hi, I’m Dhruv — <span className="text-indigo-400">{typeText}</span></h2>
                  <p className="mt-4 text-slate-300">I build scalable backend systems, delightful frontend experiences and lead teams in hackathons & startup projects. Currently building <strong>Game Shiksha</strong>, a gamified platform for students and tournament organizers.</p>
                  <div className="mt-6 flex gap-3">
                    <a href="mailto:dhruvranjansharma@gmail.com" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600/90 hover:bg-indigo-500 transition"> <FiMail /> Contact</a>
                    <a href="https://github.com/ascentway" target="_blank" rel="noreferrer" className="px-4 py-2 rounded-full border border-white/6"> <FiGithub className="inline" /> GitHub</a>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <Hero3D />
                </div>
              </div>
            </div>
          </motion.div>

          <section id="projects" className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Selected Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((p, i) => (
                <ProjectCard key={i} p={p} />
              ))}
            </div>
          </section>
        </section>

        <aside className="hidden md:block">
          <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="sticky top-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/40 to-slate-700/30 border border-white/6">
              <h4 className="text-lg font-semibold">Resume Snapshot</h4>
              <p className="mt-3 text-sm text-slate-300">B.Tech IT — Arya College (GPA: 8.1). Internships at Celebal Technologies & Vanillakart. Strong in Spring Boot, React, DevOps & Cloud.</p>
              <div className="mt-4">
                <a href="/Dhruv_Ranjan.pdf" className="block text-center px-4 py-2 rounded-full bg-white/6">Download Resume (PDF)</a>
              </div>

              <div className="mt-6">
                <h5 className="text-sm font-medium">Skills</h5>
                <ul className="mt-2 text-sm text-slate-300 space-y-1">
                  <li>Java • Spring Boot • Microservices</li>
                  <li>React • Tailwind • HTML/CSS</li>
                  <li>PostgreSQL • MongoDB • Kafka</li>
                  <li>Docker • Azure • CI/CD</li>
                </ul>
              </div>

              <div id="contact" className="mt-6">
                <h5 className="text-sm font-medium">Contact</h5>
                <div className="mt-2 flex gap-3 items-center text-slate-300">
                  <a href="mailto:dhruvranjansharma@gmail.com" title="Email"><FiMail /></a>
                  <a href="https://github.com/ascentway" target="_blank" rel="noreferrer" title="GitHub"><FiGithub /></a>
                  <a href="https://linkedin.com/in/dhruvranjan" target="_blank" rel="noreferrer" title="LinkedIn"><FiLinkedin /></a>
                </div>
                <p className="text-xs text-slate-400 mt-3">Phone: +91 8958149867</p>
              </div>
            </div>
          </motion.div>
        </aside>
      </main>

      <footer className="mt-12 max-w-6xl mx-auto text-center text-slate-400 text-sm">
        <p>Made with ❤️ • Designed for clarity & motion. Built by Dhruv Ranjan — Founder of Game Shiksha.</p>
      </footer>
    </div>
  )
}
