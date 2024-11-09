"use client"

import dynamic from 'next/dynamic'

const FinancialPlanner = dynamic(() => import('../components/financial-planner-trm'), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        Carregando Planner Financeiro...
      </h1>
    </div>
  )
})

export default function ClientPage() {
  return <FinancialPlanner />
}