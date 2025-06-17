"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Search, Package } from "lucide-react"
import { productsApi, type Product } from "@/api/products"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    quantity: 0,
  })

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const data = await productsApi.getAll()
      setProducts(data)
    } catch (error) {
      console.error("Failed to load products:", error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.code.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: Product["status"]) => {
    switch (status) {
      case "Em estoque":
        return "bg-green-100 text-green-800"
      case "Baixo estoque":
        return "bg-yellow-100 text-yellow-800"
      case "Sem estoque":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatus = (quantity: number): Product["status"] => {
    if (quantity === 0) return "Sem estoque"
    if (quantity <= 50) return "Baixo estoque"
    return "Em estoque"
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const productData = {
        ...formData,
        status: getStatus(formData.quantity),
      }

      if (editingProduct) {
        await productsApi.update(editingProduct.id, formData)
      } else {
        await productsApi.create(formData)
      }

      await loadProducts()
      resetForm()
    } catch (error) {
      console.error("Failed to save product:", error)
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      code: product.code,
      quantity: product.quantity,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await productsApi.delete(id)
      await loadProducts()
    } catch (error) {
      console.error("Failed to delete product:", error)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      quantity: 0,
    })
    setEditingProduct(null)
    setIsDialogOpen(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando produtos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Produtos</h1>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open)
            if (!open) resetForm()
          }}
        >
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Produto
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
              <DialogDescription>
                {editingProduct ? "Update the product information below." : "Enter the details for the new product."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nome
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="code" className="text-right">
                    Código
                  </Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right">
                    Quantidade
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: Number.parseInt(e.target.value) || 0 })}
                    className="col-span-3"
                    min="0"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
                <Button type="submit">{editingProduct ? "Update" : "Create"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {products.length > 0 && (
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar item..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      )}

      {products.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Sem produtos em estoque</h3>
          <p className="text-gray-500 mb-6">Adicione produtos no inventário.</p>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Primeiro Produto
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Código</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.code}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(getStatus(product.quantity))}>{getStatus(product.quantity)}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(product.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
