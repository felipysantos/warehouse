"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit, Trash2, Search, X, ClipboardList } from "lucide-react";
import {
  serviceOrdersApi,
  type ServiceOrder,
  type ServiceOrderProduct,
} from "@/api/service-orders";
import { productsApi, type Product } from "@/api/products";
import moment from "moment";

export default function ServiceOrdersPage() {
  const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>([]);
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingServiceOrder, setEditingServiceOrder] =
    useState<ServiceOrder | null>(null);
  const [formData, setFormData] = useState({
    orderNumber: "",
    requester: "",
    status: "Pending" as ServiceOrder["status"],
  });
  const [selectedProducts, setSelectedProducts] = useState<
    ServiceOrderProduct[]
  >([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [ordersData, productsData] = await Promise.all([
        serviceOrdersApi.getAll(),
        productsApi.getAll(),
      ]);
      setServiceOrders(ordersData);
      setAvailableProducts(productsData);
    } catch (error) {
      console.error("Failed to load data:", error);
      setServiceOrders([]);
      setAvailableProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredServiceOrders = serviceOrders.filter(
    (serviceOrder) =>
      serviceOrder.orderNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      serviceOrder.requester.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: ServiceOrder["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const serviceOrderData = {
        ...formData,
        products: selectedProducts,
        createdDate: new Date().toISOString().split("T")[0],
      };

      if (editingServiceOrder) {
        await serviceOrdersApi.update(editingServiceOrder.id, serviceOrderData);
      } else {
        await serviceOrdersApi.create(serviceOrderData);
      }

      await loadData();
      resetForm();
    } catch (error) {
      console.error("Failed to save service order:", error);
    }
  };

  const handleEdit = (serviceOrder: ServiceOrder) => {
    resetForm();
    setEditingServiceOrder(serviceOrder);
    setFormData({
      orderNumber: serviceOrder.orderNumber,
      requester: serviceOrder.requester,
      status: serviceOrder.status,
    });
    setSelectedProducts([...serviceOrder.products]);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await serviceOrdersApi.delete(id);
      await loadData();
    } catch (error) {
      console.error("Failed to delete service order:", error);
    }
  };

  const addProduct = () => {
    setSelectedProducts([
      ...selectedProducts,
      {
        productId: 0,
        productName: "",
        requestedQuantity: 1,
      },
    ]);
  };

  const removeProduct = (index: number) => {
    setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
  };

  const updateSelectedProduct = (
    index: number,
    field: keyof ServiceOrderProduct,
    value: string | number
  ) => {
    const updated = [...selectedProducts];
    if (field === "productId") {
      const product = availableProducts.find((p) => p.name === value);
      if (product) {
        updated[index] = {
          ...updated[index],
          productId: Number(product.id),
          productName: product.name,
        };
        console.log(product);
      }
    } else {
      updated[index] = { ...updated[index], [field]: Number(value) };
    }
    console.log(updated, index, field, value);
    setSelectedProducts(updated);
  };

  const resetForm = () => {
    setFormData({
      orderNumber: "",
      requester: "",
      status: "Pending",
    });
    setSelectedProducts([]);
    setEditingServiceOrder(null);
    setIsDialogOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando ordens de serviço...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Service Orders</h1>
        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="h-4 w-4 mr-2" />
              Criar Ordem de Serviço
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingServiceOrder
                  ? "Edit Service Order"
                  : "Create New Service Order"}
              </DialogTitle>
              <DialogDescription>
                {editingServiceOrder
                  ? "Update the service order information below."
                  : "Enter the details for the new service order."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="orderNumber" className="text-right">
                    OS #
                  </Label>
                  <Input
                    id="orderNumber"
                    value={formData.orderNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, orderNumber: e.target.value })
                    }
                    className="col-span-3"
                    placeholder="SO-001"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="requester" className="text-right">
                    Requisitante
                  </Label>
                  <Input
                    id="requester"
                    value={formData.requester}
                    onChange={(e) =>
                      setFormData({ ...formData, requester: e.target.value })
                    }
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="col-span-4">
                  <div className="flex items-center justify-between mb-2">
                    <Label>Produtos</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addProduct}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Adicionar item{" "}
                    </Button>
                  </div>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {selectedProducts.map((selectedProduct, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 border rounded"
                      >
                        <Select
                          onValueChange={(value) =>
                            updateSelectedProduct(index, "productId", value)
                          }
                        >
                          <SelectTrigger className="flex-1">
                            <SelectValue placeholder="Select product" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableProducts.map((product) => (
                              <SelectItem key={product.id} value={product.name}>
                                {product.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          type="number"
                          placeholder="Qty"
                          value={selectedProduct.requestedQuantity}
                          onChange={(e) =>
                            updateSelectedProduct(
                              index,
                              "requestedQuantity",
                              Number.parseInt(e.target.value) || 1
                            )
                          }
                          className="w-20"
                          min="1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeProduct(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={selectedProducts.length === 0}>
                  {editingServiceOrder ? "Atualizar" : "Criar"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {serviceOrders.length > 0 && (
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar OS..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      )}

      {serviceOrders.length === 0 ? (
        <div className="text-center py-12">
          <ClipboardList className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Sem ordens de serviço.
          </h3>
          <p className="text-gray-500 mb-6">
            Para começar, crie sua primeira ordem de serviço.
          </p>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Criar primeira ordem de serviço
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>OS #</TableHead>
                <TableHead>Requisitante</TableHead>
                <TableHead>Itens</TableHead>
                <TableHead>Criado</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServiceOrders.map((serviceOrder) => (
                <TableRow key={serviceOrder.id}>
                  <TableCell className="font-medium">
                    {serviceOrder.orderNumber}
                  </TableCell>
                  <TableCell>{serviceOrder.requester}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {serviceOrder.products.map((product, index) => (
                        <div key={index} className="text-sm flex flex-1 ">
                          {/* @ts-ignore */}
                          {product.product.name} - Qty:
                          {product.requestedQuantity}
                        </div>
                      ))}
                    </div>
                  </TableCell>

                  <TableCell>
                    {/* @ts-ignore */}
                    {moment(serviceOrder.createdAt).format(
                      "DD/MM/YYYY [às] HH:mm"
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(serviceOrder)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(serviceOrder.id)}
                      >
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
  );
}
