import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import LandingPage from './LandingPage'

describe('LandingPage', () => {
  it('renders the logo', () => {
    render(<LandingPage />)
    expect(screen.getAllByText('PLANCOST').length).toBeGreaterThan(0)
  })

  it('renders all 9 module tabs', () => {
    render(<LandingPage />)
    const tabLabels = ['Honorarios','Presupuestos','Proyectos','Finanzas',
      'Clientes','PDF','Asistente IA','Escaneo','Cuestionario']
    tabLabels.forEach(label => {
      expect(screen.getAllByText(label, { exact: false }).length).toBeGreaterThan(0)
    })
  })

  it('shows Honorarios content by default', () => {
    render(<LandingPage />)
    expect(screen.getByText('Calculadora de Honorarios')).toBeInTheDocument()
  })

  it('switches module content when tab is clicked', () => {
    render(<LandingPage />)
    fireEvent.click(screen.getByText('Presupuestos', { exact: false }))
    expect(screen.getByText('Presupuestos profesionales')).toBeInTheDocument()
  })

  it('renders all 3 plan names', () => {
    render(<LandingPage />)
    expect(screen.getByText('Free')).toBeInTheDocument()
    expect(screen.getByText('Plus')).toBeInTheDocument()
    expect(screen.getByText('Premium')).toBeInTheDocument()
  })

  it('shows Popular badge on Plus plan', () => {
    render(<LandingPage />)
    expect(screen.getByText('Popular')).toBeInTheDocument()
  })

  it('toggles to light theme when button is clicked', () => {
    render(<LandingPage />)
    const toggleBtn = screen.getByRole('button', { name: /claro/i })
    fireEvent.click(toggleBtn)
    expect(screen.getByRole('button', { name: /oscuro/i })).toBeInTheDocument()
  })
})
