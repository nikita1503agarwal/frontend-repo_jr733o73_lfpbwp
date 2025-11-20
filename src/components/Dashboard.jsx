import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function Dashboard({ data }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!data) return
    const el = ref.current
    el.innerHTML = ''

    const width = el.clientWidth
    const height = 180

    const svg = d3.select(el).append('svg').attr('width', width).attr('height', height)

    const hr = data.heartRate || []
    const x = d3.scaleLinear().domain([0, hr.length - 1]).range([20, width - 10])
    const y = d3.scaleLinear().domain([d3.min(hr) || 40, d3.max(hr) || 200]).range([height - 20, 10])

    const line = d3
      .line()
      .x((_, i) => x(i))
      .y((d) => y(d))
      .curve(d3.curveCatmullRom.alpha(0.5))

    svg
      .append('path')
      .attr('d', line(hr))
      .attr('fill', 'none')
      .attr('stroke', 'url(#grad)')
      .attr('stroke-width', 2)

    const defs = svg.append('defs')
    const grad = defs
      .append('linearGradient')
      .attr('id', 'grad')
      .attr('x1', '0%')
      .attr('x2', '100%')

    grad.append('stop').attr('offset', '0%').attr('stop-color', '#22d3ee')
    grad.append('stop').attr('offset', '100%').attr('stop-color', '#818cf8')
  }, [data])

  return (
    <div ref={ref} className="rounded-2xl border border-cyan-400/10 bg-slate-800/40 p-5" />
  )
}
