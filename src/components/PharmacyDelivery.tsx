import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Separator } from "./ui/separator";
import { 
  ShoppingCart, 
  MapPin, 
  Clock, 
  Star, 
  Truck, 
  CreditCard,
  Plus,
  Minus,
  Phone,
  CheckCircle
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useApp } from "../contexts/AppContext";
import { api } from "../services/api";
import { useAsyncData } from "../hooks/useAsyncData";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  price: number;
  inStock: boolean;
  prescriptionRequired: boolean;
}

interface Pharmacy {
  id: string;
  name: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  address: string;
  phone: string;
  medications: Medication[];
}

interface CartItem {
  medication: Medication;
  quantity: number;
  pharmacyId: string;
}

export function PharmacyDelivery() {
  const { t, dir, language } = useApp();
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const { data: pharmacyData, isLoading, error } = useAsyncData(() => api.pharmacies(), []);

  const pharmacies: Pharmacy[] = (pharmacyData || []).map((pharmacy) => ({
    id: pharmacy._id,
    name: pharmacy.name,
    rating: pharmacy.rating,
    deliveryTime: pharmacy.deliveryTime,
    deliveryFee: pharmacy.deliveryFee,
    minOrder: pharmacy.minOrder,
    address: pharmacy.address,
    phone: pharmacy.phone,
    medications: (pharmacy.medications || []).map((medication: any) => ({
      id: medication._id,
      name: medication.name,
      dosage: medication.dosage,
      price: medication.price,
      inStock: medication.inStock,
      prescriptionRequired: medication.prescriptionRequired,
    })),
  }));

  const addToCart = (medication: Medication, pharmacyId: string) => {
    const existingItem = cart.find(item => 
      item.medication.id === medication.id && item.pharmacyId === pharmacyId
    );

    if (existingItem) {
      setCart(prev => prev.map(item =>
        item.medication.id === medication.id && item.pharmacyId === pharmacyId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart(prev => [...prev, { medication, quantity: 1, pharmacyId }]);
    }

    toast.success(`تم إضافة ${medication.name} إلى السلة`);
  };

  const removeFromCart = (medicationId: string, pharmacyId: string) => {
    setCart(prev => prev.filter(item => 
      !(item.medication.id === medicationId && item.pharmacyId === pharmacyId)
    ));
  };

  const updateQuantity = (medicationId: string, pharmacyId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(medicationId, pharmacyId);
      return;
    }

    setCart(prev => prev.map(item =>
      item.medication.id === medicationId && item.pharmacyId === pharmacyId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.medication.price * item.quantity), 0);
  };

  const getDeliveryFee = () => {
    if (cart.length === 0) return 0;
    const pharmacyId = cart[0].pharmacyId;
    const pharmacy = pharmacies.find(p => p.id === pharmacyId);
    return pharmacy?.deliveryFee || 0;
  };

  const getFinalTotal = () => {
    return getCartTotal() + getDeliveryFee();
  };

  const filteredMedications = selectedPharmacy?.medications.filter(med =>
    med.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error("السلة فارغة");
      return;
    }

    if (!deliveryAddress) {
      toast.error("يرجى إدخال عنوان التوصيل");
      return;
    }

    try {
      const order = await api.createOrder({
        pharmacy: cart[0].pharmacyId,
        items: cart.map((item) => ({ medication: item.medication.id, quantity: item.quantity })),
        deliveryAddress,
        paymentMethod,
      });
      toast.success(`تم تأكيد الطلب بقيمة ${order.total} جنيه مصري. سيتم التوصيل خلال ${selectedPharmacy?.deliveryTime}`);
      setCart([]);
      setShowCart(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "تعذر تأكيد الطلب");
    }
  };

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 dark:bg-gray-900" dir={dir}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">{t('pharmacy.title')}</h1>
          <p className="text-muted-foreground">{language === 'ar' ? 'اطلب أدويتك وسيتم توصيلها إلى منزلك' : 'Order your medications and get them delivered to your home'}</p>
        </div>
        
        <Dialog open={showCart} onOpenChange={setShowCart}>
          <DialogTrigger asChild>
            <Button className="relative">
              <ShoppingCart className={`h-4 w-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
              {t('pharmacy.cart')}
              {cartItemsCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className={`absolute -top-2 ${dir === 'rtl' ? '-left-2' : '-right-2'} rounded-full w-6 h-6 flex items-center justify-center text-xs`}
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl" dir={dir}>
            <DialogHeader>
              <DialogTitle>{t('pharmacy.cart')}</DialogTitle>
              <DialogDescription>{language === 'ar' ? 'مراجعة طلبك وإتمام الشراء' : 'Review your order and complete purchase'}</DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {cart.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">{language === 'ar' ? 'السلة فارغة' : 'Cart is empty'}</p>
              ) : (
                cart.map((item) => (
                  <div key={`${item.medication.id}-${item.pharmacyId}`} className="flex items-center justify-between p-3 border dark:border-gray-700 rounded-lg">
                    <div>
                      <h4 className="font-medium">{item.medication.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.medication.dosage}</p>
                      <p className="text-sm font-medium">{item.medication.price} {t('currency.short')}</p>
                    </div>
                    
                    <div className="flex items-center space-x-reverse space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => updateQuantity(item.medication.id, item.pharmacyId, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="px-3">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => updateQuantity(item.medication.id, item.pharmacyId, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {cart.length > 0 && (
              <>
                <Separator />
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>{t('pharmacy.delivery.address')}</Label>
                    <Textarea
                      placeholder={language === 'ar' ? 'أدخل عنوانك التفصيلي...' : 'Enter your detailed address...'}
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>{t('pharmacy.payment.method')}</Label>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-reverse space-x-2">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card">{t('pharmacy.card')}</Label>
                      </div>
                      <div className="flex items-center space-x-reverse space-x-2">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash">{t('pharmacy.cash')}</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="space-y-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex justify-between">
                      <span>{language === 'ar' ? 'إجمالي الأدوية:' : 'Medications Total:'}</span>
                      <span>{getCartTotal()} {t('currency.short')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{language === 'ar' ? 'رسوم التوصيل:' : 'Delivery Fee:'}</span>
                      <span>{getDeliveryFee()} {t('currency.short')}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>{t('pharmacy.total')}</span>
                      <span>{getFinalTotal()} {t('currency.short')}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full" onClick={handleCheckout}>
                    <CreditCard className={`h-4 w-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                    {t('pharmacy.place.order')}
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Pharmacies List */}
        <div className="lg:col-span-1">
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle>{language === 'ar' ? 'الصيدليات المتاحة' : 'Available Pharmacies'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {isLoading && <p className="text-center text-muted-foreground py-6">{language === 'ar' ? 'جاري تحميل الصيدليات...' : 'Loading pharmacies...'}</p>}
              {error && <p className="text-center text-red-600 py-6">{error}</p>}
              {!isLoading && !error && pharmacies.length === 0 && <p className="text-center text-muted-foreground py-6">{language === 'ar' ? 'لا توجد صيدليات متاحة' : 'No pharmacies available'}</p>}
              {pharmacies.map((pharmacy) => (
                <div
                  key={pharmacy.id}
                  className={`p-3 border dark:border-gray-700 rounded-lg cursor-pointer transition-colors ${
                    selectedPharmacy?.id === pharmacy.id ? 'border-primary bg-blue-50 dark:bg-blue-950' : 'hover:bg-gray-50 dark:hover:bg-gray-900'
                  }`}
                  onClick={() => setSelectedPharmacy(pharmacy)}
                >
                  <h3 className="font-medium">{pharmacy.name}</h3>
                  <div className="flex items-center space-x-reverse space-x-1 mt-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{pharmacy.rating}</span>
                  </div>
                  <div className="flex items-center space-x-reverse space-x-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{pharmacy.deliveryTime}</span>
                  </div>
                  <div className="flex items-center space-x-reverse space-x-1 text-sm text-muted-foreground">
                    <Truck className="h-4 w-4" />
                    <span>{language === 'ar' ? 'رسوم التوصيل:' : 'Delivery Fee:'} {pharmacy.deliveryFee} {t('currency.short')}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Medications */}
        <div className="lg:col-span-3">
          {selectedPharmacy ? (
            <div className="space-y-4">
              <Card className="dark:bg-gray-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{selectedPharmacy.name}</CardTitle>
                      <div className="flex items-center space-x-reverse space-x-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-reverse space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{selectedPharmacy.rating}</span>
                        </div>
                        <div className="flex items-center space-x-reverse space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{selectedPharmacy.deliveryTime}</span>
                        </div>
                        <div className="flex items-center space-x-reverse space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{selectedPharmacy.address}</span>
                        </div>
                        <div className="flex items-center space-x-reverse space-x-1">
                          <Phone className="h-4 w-4" />
                          <span>{selectedPharmacy.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <Label>{language === 'ar' ? 'البحث في الأدوية' : 'Search Medications'}</Label>
                    <Input
                      placeholder={t('pharmacy.search')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMedications.map((medication) => (
                  <Card key={medication.id} className="dark:bg-gray-800">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-medium">{medication.name}</h3>
                          <p className="text-sm text-muted-foreground">{medication.dosage}</p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-primary">
                            {medication.price} {t('currency.short')}
                          </span>
                          
                          <div className="flex items-center space-x-reverse space-x-2">
                            {medication.inStock ? (
                              <Badge variant="secondary" className="bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-400">
                                <CheckCircle className={`h-3 w-3 ${dir === 'rtl' ? 'ml-1' : 'mr-1'}`} />
                                {t('pharmacy.available')}
                              </Badge>
                            ) : (
                              <Badge variant="destructive">{t('pharmacy.out.of.stock')}</Badge>
                            )}
                            
                            {medication.prescriptionRequired && (
                              <Badge variant="outline">{t('pharmacy.prescription.required')}</Badge>
                            )}
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full" 
                          disabled={!medication.inStock}
                          onClick={() => addToCart(medication, selectedPharmacy.id)}
                        >
                          <Plus className={`h-4 w-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                          {t('pharmacy.add.to.cart')}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <Card className="dark:bg-gray-800">
              <CardContent className="p-12 text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">{language === 'ar' ? 'اختر صيدلية' : 'Select a Pharmacy'}</h3>
                <p className="text-muted-foreground">
                  {language === 'ar' ? 'اختر صيدلية من القائمة لعرض الأدوية المتوفرة' : 'Select a pharmacy from the list to view available medications'}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
