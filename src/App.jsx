import React, { useEffect, useState } from 'react'
import Hero from './components/Hero'
import RealtimePanel from './components/RealtimePanel'
import Dashboard from './components/Dashboard'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function App() {
  const [sample, setSample] = useState(null)

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/biometrics/sample`).then(r => r.json()).then(setSample).catch(() => {})
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
        <Hero />

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RealtimePanel />
          </div>
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-cyan-400/10 bg-slate-800/40 p-5">
              <h3 className="font-semibold">Демо API</h3>
              {!sample ? (
                <p className="mt-2 text-cyan-200/70 text-sm">Загрузка примера…</p>
              ) : (
                <pre className="mt-3 text-xs text-cyan-200/80 overflow-auto max-h-56">{JSON.stringify(sample, null, 2)}</pre>
              )}
            </div>
          </div>
        </section>

        <section className="">
          <h2 className="text-xl font-semibold mb-3 text-cyan-200">Тренды ЧСС</h2>
          <Dashboard data={sample} />
        </section>

        <footer className="pt-4 text-center text-cyan-300/60 text-sm">Apex Performance Nexus • прототип</footer>
      </div>
    </div>
  )
}

export default App
