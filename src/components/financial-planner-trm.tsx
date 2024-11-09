"use client"

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'

interface TabContentProps {
  children: React.ReactNode
  value: string
}

const TabContent = ({ children, value }: TabContentProps) => (
  <TabsContent value={value} className="mt-4">
    {children}
  </TabsContent>
)

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      className={`w-full p-2 border rounded shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black ${className}`}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

const FinancialPlanner = () => {
  const [goals, setGoals] = useState({
    shortTerm: '',
    mediumTerm: '',
    longTerm: ''
  })

  const [revenue, setRevenue] = useState({
    products: '',
    services: ''
  })

  const [fixedCosts, setFixedCosts] = useState({
    tools: '',
    hosting: '',
    workspace: ''
  })

  const [variableCosts, setVariableCosts] = useState({
    marketing: '',
    gatewayPercentage: '',
    others: ''
  })

  const [emergency, setEmergency] = useState('')

  const calculateGatewayFee = () => {
    const totalRevenue = calculateTotalRevenue()
    return (totalRevenue * (Number(variableCosts.gatewayPercentage) / 100))
  }

  const calculateTotalRevenue = () => {
    return Object.values(revenue).reduce((a, b) => Number(a) + Number(b || 0), 0)
  }

  const calculateTotalFixedCosts = () => {
    return Object.values(fixedCosts).reduce((a, b) => Number(a) + Number(b || 0), 0)
  }

  const calculateTotalVariableCosts = () => {
    const gatewayFee = calculateGatewayFee()
    return Number(variableCosts.marketing || 0) + Number(variableCosts.others || 0) + gatewayFee
  }

  const calculateProfit = () => {
    return calculateTotalRevenue() - (calculateTotalFixedCosts() + calculateTotalVariableCosts())
  }

  const getHealthStatus = () => {
    const profit = calculateProfit()
    const totalCosts = calculateTotalFixedCosts() + calculateTotalVariableCosts()
    const emergencyNeeded = totalCosts * 3
    
    if (profit <= 0) return "🚨 Atenção: Seu negócio está operando com prejuízo!"
    if (Number(emergency) < emergencyNeeded) return `💡 Recomendamos uma reserva de emergência de R$ ${emergencyNeeded.toLocaleString('pt-BR')} (3x seus custos mensais)`
    return "✅ Parabéns! Seu negócio está saudável financeiramente!"
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 font-[Poppins]">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">Planner Financeiro TRM</h1>

        <Tabs defaultValue="goals" className="w-full">
          <TabsList className="flex space-x-2 mb-6">
            <TabsTrigger 
              value="goals" 
              className="px-4 py-2 rounded hover:bg-gray-100 text-black data-[state=active]:bg-gray-200"
            >
              Metas
            </TabsTrigger>
            <TabsTrigger 
              value="revenue" 
              className="px-4 py-2 rounded hover:bg-gray-100 text-black data-[state=active]:bg-gray-200"
            >
              Receitas
            </TabsTrigger>
            <TabsTrigger 
              value="costs" 
              className="px-4 py-2 rounded hover:bg-gray-100 text-black data-[state=active]:bg-gray-200"
            >
              Custos
            </TabsTrigger>
            <TabsTrigger 
              value="summary" 
              className="px-4 py-2 rounded hover:bg-gray-100 text-black data-[state=active]:bg-gray-200"
            >
              Resumo
            </TabsTrigger>
          </TabsList>

          <TabContent value="goals">
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2 text-black">Meta Curto Prazo (0-3 meses) R$</label>
                <Input
                  type="number"
                  value={goals.shortTerm}
                  onChange={(e) => setGoals({...goals, shortTerm: e.target.value})}
                  placeholder="Ex: 5.000"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-black">Meta Médio Prazo (3-12 meses) R$</label>
                <Input
                  type="number"
                  value={goals.mediumTerm}
                  onChange={(e) => setGoals({...goals, mediumTerm: e.target.value})}
                  placeholder="Ex: 10.000"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-black">Meta Longo Prazo (1-5 anos) R$</label>
                <Input
                  type="number"
                  value={goals.longTerm}
                  onChange={(e) => setGoals({...goals, longTerm: e.target.value})}
                  placeholder="Ex: 100.000"
                />
              </div>
            </div>
          </TabContent>

          <TabContent value="revenue">
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2 text-black">Produtos Digitais R$</label>
                <Input
                  type="number"
                  value={revenue.products}
                  onChange={(e) => setRevenue({...revenue, products: e.target.value})}
                  placeholder="0,00"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-black">Serviços R$</label>
                <Input
                  type="number"
                  value={revenue.services}
                  onChange={(e) => setRevenue({...revenue, services: e.target.value})}
                  placeholder="0,00"
                />
              </div>
            </div>
          </TabContent>

          <TabContent value="costs">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-black">Custos Fixos Mensais</h3>
                <div>
                  <label className="block text-sm mb-2 text-black">Ferramentas (Canva, etc) R$</label>
                  <Input
                    type="number"
                    value={fixedCosts.tools}
                    onChange={(e) => setFixedCosts({...fixedCosts, tools: e.target.value})}
                    placeholder="0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-black">Hospedagem R$</label>
                  <Input
                    type="number"
                    value={fixedCosts.hosting}
                    onChange={(e) => setFixedCosts({...fixedCosts, hosting: e.target.value})}
                    placeholder="0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-black">Workspace R$</label>
                  <Input
                    type="number"
                    value={fixedCosts.workspace}
                    onChange={(e) => setFixedCosts({...fixedCosts, workspace: e.target.value})}
                    placeholder="0,00"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-black">Custos Variáveis Mensais</h3>
                <div>
                  <label className="block text-sm mb-2 text-black">Marketing R$</label>
                  <Input
                    type="number"
                    value={variableCosts.marketing}
                    onChange={(e) => setVariableCosts({...variableCosts, marketing: e.target.value})}
                    placeholder="0,00"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2 text-black">Taxa Gateway (%)</label>
                  <Input
                    type="number"
                    value={variableCosts.gatewayPercentage}
                    onChange={(e) => setVariableCosts({...variableCosts, gatewayPercentage: e.target.value})}
                    placeholder="Ex: 2.99"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Taxa calculada: R$ {calculateGatewayFee().toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                  </p>
                </div>
                <div>
                  <label className="block text-sm mb-2 text-black">Outros R$</label>
                  <Input
                    type="number"
                    value={variableCosts.others}
                    onChange={(e) => setVariableCosts({...variableCosts, others: e.target.value})}
                    placeholder="0,00"
                  />
                </div>
              </div>
            </div>
          </TabContent>

          <TabContent value="summary">
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p className="flex justify-between text-black">
                  <span>Total de Receitas:</span>
                  <span className="text-green-600 font-medium">
                    R$ {calculateTotalRevenue().toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                  </span>
                </p>
                <p className="flex justify-between text-black">
                  <span>Custos Fixos:</span>
                  <span className="text-red-600 font-medium">
                    R$ {calculateTotalFixedCosts().toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                  </span>
                </p>
                <p className="flex justify-between text-black">
                  <span>Custos Variáveis:</span>
                  <span className="text-red-600 font-medium">
                    R$ {calculateTotalVariableCosts().toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                  </span>
                </p>
                <p className="flex justify-between pt-2 border-t text-black">
                  <span>Lucro Mensal:</span>
                  <span className={`font-medium ${calculateProfit() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    R$ {calculateProfit().toLocaleString('pt-BR', {minimumFractionDigits: 2})}
                  </span>
                </p>
              </div>

              <div>
                <label className="block text-sm mb-2 text-black">Reserva de Emergência Atual R$</label>
                <Input
                  type="number"
                  value={emergency}
                  onChange={(e) => setEmergency(e.target.value)}
                  placeholder="0,00"
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <p className="text-blue-800">
                  {getHealthStatus()}
                </p>
              </div>
            </div>
          </TabContent>
        </Tabs>
      </div>
    </div>
  )
}

export default FinancialPlanner