import React, { useEffect, useRef, useState } from 'react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function RealtimePanel() {
  const [frame, setFrame] = useState(null)
  const [connected, setConnected] = useState(false)
  const esRef = useRef(null)

  useEffect(() => {
    const url = `${BACKEND_URL}/api/biometrics/stream`
    const es = new EventSource(url)
    esRef.current = es

    es.onopen = () => setConnected(true)
    es.onerror = () => setConnected(false)
    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data)
        setFrame(data)
      } catch {}
    }
    return () => {
      es.close()
    }
  }, [])

  return (
    <div className="rounded-2xl border border-cyan-400/10 bg-slate-800/40 p-5 text-cyan-100">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Биометрия (Live)</h3>
        <div className={`h-2 w-2 rounded-full ${connected ? 'bg-green-400' : 'bg-red-400'}`}></div>
      </div>

      {!frame ? (
        <p className="mt-4 text-cyan-200/70 text-sm">Ожидание данных…</p>
      ) : (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <Metric label="SpO2" value={`${frame.oxygenSaturation}%`} />
          <Metric label="Порог лактата" value={`${frame.lactateThreshold} mmol/L`} />
          <Metric label="HR(avg)" value={`${Math.round(frame.heartRate.reduce((a,b)=>a+b,0)/frame.heartRate.length)} bpm`} />
          <Metric label="EMG(ch1)" value={frame.emgSignals.channels[0]?.toFixed(3)} />
          <Metric label="EEG(beta)" value={frame.neuralActivity.beta} />
          <Metric label="Pos" value={`x:${frame.motionCapture.x.toFixed(2)} y:${frame.motionCapture.y.toFixed(2)}`} />
        </div>
      )}
    </div>
  )
}

function Metric({ label, value }) {
  return (
    <div className="rounded-lg bg-slate-900/40 border border-cyan-400/10 p-3">
      <div className="text-cyan-300/70 text-xs">{label}</div>
      <div className="font-mono text-lg">{value}</div>
    </div>
  )
}
