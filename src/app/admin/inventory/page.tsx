
'use client';

import { useState } from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, ShoppingCart, Utensils, GlassWater, Droplets, Banknote, Edit, Trash2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Initial Data
const initialKitchenItems = [
  { id: 1, name: 'Tomatoes', stock: 20, unit: 'kg', status: 'In Stock' },
  { id: 2, name: 'Rice', stock: 50, unit: 'kg', status: 'In Stock' },
  { id: 3, name: 'Chicken', stock: 15, unit: 'kg', status: 'Low Stock' },
];

const initialBarItems = [
    { id: 1, bar: 'Main Bar', name: 'Beer', stock: 100, unit: 'bottles', status: 'In Stock' },
    { id: 2, bar: 'Main Bar', name: 'Whiskey', stock: 20, unit: 'bottles', status: 'In Stock' },
    { id: 3, bar: 'Beach Bar', name: 'Cocktail Mix', stock: 15, unit: 'liters', status: 'Low Stock' },
    { id: 4, bar: 'Beach Bar', name: 'Soda', stock: 150, unit: 'cans', status: 'In Stock' },
];

const initialRestroomItems = [
    { id: 1, name: 'Toilet Paper', stock: 50, unit: 'rolls', status: 'In Stock' },
    { id: 2, name: 'Hand Soap', stock: 10, unit: 'liters', status: 'In Stock' },
    { id: 3, name: 'Paper Towels', stock: 5, unit: 'packs', status: 'Low Stock' },
];

const initialExpenditures = [
    { id: 1, item: 'Purchase of Vegetables', category: 'Kitchen', amount: 150.00, date: '2024-07-30' },
    { id: 2, item: 'Restock of Sodas', category: 'Bar', amount: 250.50, date: '2024-07-29' },
    { id: 3, item: 'Plumbing Repair', category: 'Maintenance', amount: 300.00, date: '2024-07-28' },
];

const initialMobileMoney = [
    {id: 1, type: 'Cash-In', amount: 500.00, date: '2024-07-30'},
    {id: 2, type: 'Cash-Out', amount: 200.00, date: '2024-07-30'},
    {id: 3, type: 'Withdrawal', amount: 100.00, date: '2024-07-30'},
];

const initialUtilitySales = [
    {id: 1, type: 'Electricity', amount: 300.00, date: '2024-07-30'},
    {id: 2, type: 'Water', amount: 150.00, date: '2024-07-30'},
];


export default function ResortManagementPage() {
  const [kitchenItems, setKitchenItems] = useState(initialKitchenItems);
  const [barItems, setBarItems] = useState(initialBarItems);
  const [restroomItems, setRestroomItems] = useState(initialRestroomItems);
  const [expenditures, setExpenditures] = useState(initialExpenditures);
  const [mobileMoney, setMobileMoney] = useState(initialMobileMoney);
  const [utilitySales, setUtilitySales] = useState(initialUtilitySales);

  const totalSales = mobileMoney.reduce((acc, t) => t.type === 'Cash-In' ? acc + t.amount : acc, 0) + utilitySales.reduce((acc, s) => acc + s.amount, 0);
  const totalMobileMoney = mobileMoney.reduce((acc, t) => acc + t.amount, 0);
  const totalUtilitySales = utilitySales.reduce((acc, s) => acc + s.amount, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-headline text-primary">
            TRB Beach Resort Management
          </h1>
          <p className="text-muted-foreground">
            A comprehensive overview of your resort's operations.
          </p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
         <Card className="lg:col-span-1">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Banknote/> Transactions</CardTitle>
                <CardDescription>Mobile Money & Utility Sales.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex justify-between p-3 rounded-lg bg-secondary">
                        <span className="font-medium">Today's Sales</span>
                        <span className="text-green-500 font-bold">${totalSales.toFixed(2)}</span>
                    </div>
                     <div className="flex justify-between p-3 rounded-lg bg-secondary">
                        <span className="font-medium">Mobile Money</span>
                        <span className="font-bold">${totalMobileMoney.toFixed(2)}</span>
                    </div>
                     <div className="flex justify-between p-3 rounded-lg bg-secondary">
                        <span className="font-medium">Utility Sales</span>
                        <span className="font-bold">${totalUtilitySales.toFixed(2)}</span>
                    </div>
                     <Dialog>
                        <DialogTrigger asChild>
                            <Button className="w-full"><PlusCircle className="mr-2"/> Record Transaction</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader><DialogTitle>Record a Transaction</DialogTitle></DialogHeader>
                            <div className="grid gap-4 py-4">
                               <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="type" className="text-right">Type</Label>
                                    <Select>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="cash-in">Cash-In</SelectItem>
                                            <SelectItem value="cash-out">Cash-Out</SelectItem>
                                            <SelectItem value="withdrawal">Withdrawal</SelectItem>
                                            <SelectItem value="utility">Utility Sale</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="amount" className="text-right">Amount</Label>
                                    <Input id="amount" type="number" className="col-span-3" />
                                </div>
                            </div>
                            <DialogFooter><Button>Add Transaction</Button></DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                 <Table className="mt-4">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mobileMoney.map(t => (
                            <TableRow key={t.id}>
                                <TableCell className="font-medium">{t.type}</TableCell>
                                <TableCell className="text-right">${t.amount.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                 </Table>
            </CardContent>
        </Card>

        <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="flex items-center gap-2"><ShoppingCart/> Expenditures</CardTitle>
                    <CardDescription>Expenses on items bought or used.</CardDescription>
                </div>
                 <Dialog>
                    <DialogTrigger asChild>
                        <Button size="sm"><PlusCircle className="mr-2"/> Record Expense</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader><DialogTitle>Record an Expenditure</DialogTitle></DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="item" className="text-right">Item</Label>
                                <Input id="item" className="col-span-3" />
                            </div>
                           <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="category" className="text-right">Category</Label>
                                <Select>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="kitchen">Kitchen</SelectItem>
                                        <SelectItem value="bar">Bar</SelectItem>
                                        <SelectItem value="restroom">Restroom</SelectItem>
                                        <SelectItem value="maintenance">Maintenance</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="amount" className="text-right">Amount</Label>
                                <Input id="amount" type="number" className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter><Button>Add Expense</Button></DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Item</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {expenditures.map(item => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.item}</TableCell>
                                <TableCell>{item.category}</TableCell>
                                <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant="outline" size="icon"><Edit className="h-4 w-4"/></Button>
                                    <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4"/></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inventory" className="mt-8">
        <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="inventory"><Utensils className="mr-2"/> Kitchen</TabsTrigger>
            <TabsTrigger value="bars"><GlassWater className="mr-2"/> Bars</TabsTrigger>
            <TabsTrigger value="restrooms"><Droplets className="mr-2"/> Restrooms</TabsTrigger>
        </TabsList>
        <TabsContent value="inventory">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Kitchen Inventory</CardTitle>
                     <Dialog>
                        <DialogTrigger asChild>
                            <Button size="sm"><PlusCircle className="mr-2"/> Add Item</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader><DialogTitle>Add Kitchen Item</DialogTitle></DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="item" className="text-right">Item Name</Label>
                                    <Input id="item" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="stock" className="text-right">Stock</Label>
                                    <Input id="stock" type="number" className="col-span-3" />
                                </div>
                                 <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="unit" className="text-right">Unit</Label>
                                    <Input id="unit" className="col-span-3" />
                                </div>
                            </div>
                            <DialogFooter><Button>Add Item</Button></DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Item</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Unit</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {kitchenItems.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell>{item.stock}</TableCell>
                                    <TableCell>{item.unit}</TableCell>
                                    <TableCell>
                                         <Badge variant={item.status === 'Low Stock' ? 'destructive' : 'default'}>
                                            {item.status ?? 'In Stock'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="outline" size="icon"><Edit className="h-4 w-4"/></Button>
                                        <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4"/></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="bars">
             <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Bar Inventory</CardTitle>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size="sm"><PlusCircle className="mr-2"/> Add Item</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader><DialogTitle>Add Bar Item</DialogTitle></DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="bar" className="text-right">Bar</Label>
                                     <Select>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select bar" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="main-bar">Main Bar</SelectItem>
                                            <SelectItem value="beach-bar">Beach Bar</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="item" className="text-right">Item Name</Label>
                                    <Input id="item" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="stock" className="text-right">Stock</Label>
                                    <Input id="stock" type="number" className="col-span-3" />
                                </div>
                                 <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="unit" className="text-right">Unit</Label>
                                    <Input id="unit" className="col-span-3" />
                                </div>
                            </div>
                            <DialogFooter><Button>Add Item</Button></DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                      <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Bar</TableHead>
                                <TableHead>Item</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Unit</TableHead>
                                 <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {barItems.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.bar}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.stock}</TableCell>
                                    <TableCell>{item.unit}</TableCell>
                                    <TableCell>
                                        <Badge variant={item.status === 'Low Stock' ? 'destructive' : 'default'}>
                                            {item.status ?? 'In Stock'}
                                        </Badge>
                                    </TableCell>
                                     <TableCell className="text-right space-x-2">
                                        <Button variant="outline" size="icon"><Edit className="h-4 w-4"/></Button>
                                        <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4"/></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="restrooms">
             <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Restroom Supplies</CardTitle>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size="sm"><PlusCircle className="mr-2"/> Add Item</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader><DialogTitle>Add Restroom Item</DialogTitle></DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="item" className="text-right">Item Name</Label>
                                    <Input id="item" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="stock" className="text-right">Stock</Label>
                                    <Input id="stock" type="number" className="col-span-3" />
                                </div>
                                 <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="unit" className="text-right">Unit</Label>
                                    <Input id="unit" className="col-span-3" />
                                </div>
                            </div>
                            <DialogFooter><Button>Add Item</Button></DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                      <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Item</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Unit</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {restroomItems.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell>{item.stock}</TableCell>
                                    <TableCell>{item.unit}</TableCell>
                                    <TableCell>
                                        <Badge variant={item.status === 'Low Stock' ? 'destructive' : 'default'}>
                                            {item.status ?? 'In Stock'}
                                        </Badge>
                                    </TableCell>
                                     <TableCell className="text-right space-x-2">
                                        <Button variant="outline" size="icon"><Edit className="h-4 w-4"/></Button>
                                        <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4"/></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
