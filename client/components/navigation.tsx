"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Package, ClipboardList, Wrench } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    {
      href: "/products",
      label: "Produtos",
      icon: Package,
    },
    {
      href: "/service-orders",
      label: "Ordens de Serviço",
      icon: ClipboardList,
    },
  ]

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Wrench className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">ToolCorp Almoxarifado</span>
          </div>
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
