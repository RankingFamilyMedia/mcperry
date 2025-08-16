
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, ShoppingCart, Utensils, GlassWater, Droplets, Banknote } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Placeholder data
const kitchenItems = [
  { id: 1, name: 'Tomatoes', stock: 20, unit: 'kg' },
  { id: 2, name: 'Rice', stock: 50, unit: 'kg' },
  { id: 3, name: 'Chicken', stock: 15, unit: 'kg', status: 'Low Stock' },
];

const barItems = [
    { id: 1, bar: 'Main Bar', name: 'Beer', stock: 100, unit: 'bottles' },
    { id: 2, bar: 'Main Bar', name: 'Whiskey', stock: 20, unit: 'bottles' },
    { id: 3, bar: 'Beach Bar', name: 'Cocktail Mix', stock: 15, unit: 'liters', status: 'Low Stock' },
    { id: 4, bar: 'Beach Bar', name: 'Soda', stock: 150, unit: 'cans' },
];

const restroomItems = [
    { id: 1, name: 'Toilet Paper', stock: 50, unit: 'rolls' },
    { id: 2, name: 'Hand Soap', stock: 10, unit: 'liters' },
    { id: 3, name: 'Paper Towels', stock: 5, unit: 'packs', status: 'Low Stock' },
]

const expenditures = [
    { id: 1, item: 'Purchase of Vegetables', category: 'Kitchen', amount: 150.00, date: '2024-07-30' },
    { id: 2, item: 'Restock of Sodas', category: 'Bar', amount: 250.50, date: '2024-07-29' },
    { id: 3, item: 'Plumbing Repair', category: 'Maintenance', amount: 300.00, date: '2024-07-28' },
];

export default function ResortManagementPage() {
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
                        <span className="text-green-500 font-bold">$1,250.00</span>
                    </div>
                     <div className="flex justify-between p-3 rounded-lg bg-secondary">
                        <span className="font-medium">Mobile Money</span>
                        <span className="font-bold">$800.00</span>
                    </div>
                     <div className="flex justify-between p-3 rounded-lg bg-secondary">
                        <span className="font-medium">Utility Sales</span>
                        <span className="font-bold">$450.00</span>
                    </div>
                    <Button className="w-full"><PlusCircle className="mr-2"/> Record Transaction</Button>
                </div>
            </CardContent>
        </Card>

        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><ShoppingCart/> Expenditures</CardTitle>
                 <CardDescription>Expenses on items bought or used.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Item</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {expenditures.map(item => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.item}</TableCell>
                                <TableCell>{item.category}</TableCell>
                                <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
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
                <CardHeader>
                    <CardTitle>Kitchen Inventory</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Item</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Unit</TableHead>
                                <TableHead>Status</TableHead>
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
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="bars">
             <Card>
                <CardHeader>
                    <CardTitle>Bar Inventory</CardTitle>
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
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="restrooms">
             <Card>
                <CardHeader>
                    <CardTitle>Restroom Supplies</CardTitle>
                </CardHeader>
                <CardContent>
                      <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Item</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Unit</TableHead>
                                <TableHead>Status</TableHead>
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
