import React from 'react'
import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden rounded-3xl border border-cyan-400/10 bg-slate-900/20">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/Zn7XRxnnbSat5OJG/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 pointer-events-none flex h-full w-full items-end p-6 md:p-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow">Apex Performance Nexus</h1>
          <p className="mt-3 md:mt-4 text-cyan-200/90 text-sm md:text-base">Футуристическая платформа для профессиональных атлетов: биометрия в реальном времени, 3D-биомеханика и персональная аналитика.</p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
    </section>
  )
}
