import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Calendar } from "./ui/calendar";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Star, 
  User, 
  Phone,
  Video
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useApp } from "../contexts/AppContext";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  experience: number;
  clinic: string;
  address: string;
  fee: number;
  availableSlots: string[];
  type: 'clinic' | 'video';
}

interface AppointmentBookingProps {
  onNavigate?: (state: string) => void;
  onBack?: () => void;
}

export function AppointmentBooking({ onNavigate, onBack }: AppointmentBookingProps) {
  const { t, dir, language } = useApp();
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [symptoms, setSymptoms] = useState("");

  const doctors: Doctor[] = [
    {
      id: 1,
      name: t('default.doctor.name'),
      specialty: t('specialty.cardiology'),
      rating: 4.8,
      experience: 15,
      clinic: language === 'ar' ? 'مستشفى النور' : 'Al-Nour Hospital',
      address: language === 'ar' ? 'شارع النيل، المعادي، القاهرة' : 'Nile Street, Maadi, Cairo',
      fee: 200,
      availableSlots: ["09:00", "10:00", "11:00", "14:00", "15:00"],
      type: 'clinic'
    },
    {
      id: 2,
      name: t('default.doctor2.name'),
      specialty: t('specialty.dermatology'),
      rating: 4.9,
      experience: 12,
      clinic: language === 'ar' ? 'عيادة الجمال' : 'Beauty Clinic',
      address: language === 'ar' ? 'شارع التحرير، وسط البلد، القاهرة' : 'Tahrir Street, Downtown, Cairo',
      fee: 150,
      availableSlots: ["10:00", "11:00", "16:00", "17:00"],
      type: 'clinic'
    },
    {
      id: 3,
      name: t('default.doctor3.name'),
      specialty: t('specialty.cardiology'),
      rating: 4.7,
      experience: 10,
      clinic: language === 'ar' ? 'استشارة عن بعد' : 'Online Consultation',
      address: language === 'ar' ? 'متاح أونلاين' : 'Available Online',
      fee: 100,
      availableSlots: ["08:00", "09:00", "20:00", "21:00"],
      type: 'video'
    },
    {
      id: 4,
      name: t('default.doctor.name'),
      specialty: t('specialty.orthopedics'),
      rating: 4.6,
      experience: 18,
      clinic: language === 'ar' ? 'مستشفى القاهرة الجديدة' : 'New Cairo Hospital',
      address: language === 'ar' ? 'شارع التسعين، القاهرة الجديدة' : '90th Street, New Cairo',
      fee: 250,
      availableSlots: ["09:30", "11:30", "14:30", "16:30"],
      type: 'clinic'
    },
    {
      id: 5,
      name: t('default.doctor2.name'),
      specialty: t('specialty.pediatrics'),
      rating: 4.8,
      experience: 14,
      clinic: language === 'ar' ? 'عيادة الأطفال' : 'Pediatric Clinic',
      address: language === 'ar' ? 'شارع الهرم، الجيزة' : 'Haram Street, Giza',
      fee: 180,
      availableSlots: ["10:30", "12:00", "15:30", "17:30"],
      type: 'clinic'
    },
    {
      id: 6,
      name: t('default.doctor3.name'),
      specialty: t('specialty.general'),
      rating: 4.5,
      experience: 8,
      clinic: language === 'ar' ? 'استشارة عن بعد' : 'Online Consultation',
      address: language === 'ar' ? 'متاح أونلاين' : 'Available Online',
      fee: 80,
      availableSlots: ["07:00", "08:30", "21:30", "22:00"],
      type: 'video'
    }
  ];

  const specialties = [
    { value: t('specialty.cardiology'), label: t('specialty.cardiology') },
    { value: t('specialty.dermatology'), label: t('specialty.dermatology') },
    { value: t('specialty.orthopedics'), label: t('specialty.orthopedics') },
    { value: t('specialty.pediatrics'), label: t('specialty.pediatrics') },
    { value: t('specialty.neurology'), label: t('specialty.neurology') },
    { value: t('specialty.general'), label: t('specialty.general') },
  ];

  const filteredDoctors = selectedSpecialty 
    ? doctors.filter(doctor => doctor.specialty === selectedSpecialty)
    : doctors;

  const handleBookAppointment = () => {
    if (selectedDoctor && selectedDate && selectedTime) {
      toast.success(
        language === 'ar' 
          ? `تم حجز موعد مع ${selectedDoctor.name} في ${selectedTime} بتاريخ ${selectedDate.toLocaleDateString('ar-EG')}`
          : `Appointment booked with ${selectedDoctor.name} at ${selectedTime} on ${selectedDate.toLocaleDateString('en-US')}`
      );
      setTimeout(() => {
        onBack?.();
      }, 2000);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen" dir={dir}>
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{language === 'ar' ? 'حجز موعد طبي' : 'Book Medical Appointment'}</h1>
          <p className="text-muted-foreground">{language === 'ar' ? 'اختر طبيبك واحجز موعدك بسهولة' : 'Choose your doctor and book your appointment easily'}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Search and Filters */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-lg">{language === 'ar' ? 'البحث والتصفية' : 'Search & Filter'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>{t('appointment.select.specialty')}</Label>
                  <Select onValueChange={setSelectedSpecialty}>
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'ar' ? 'اختر التخصص' : 'Select specialty'} />
                    </SelectTrigger>
                    <SelectContent>
                      {specialties.map((specialty) => (
                        <SelectItem key={specialty.value} value={specialty.value}>
                          {specialty.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{t('appointment.type')}</Label>
                  <Select onValueChange={setAppointmentType}>
                    <SelectTrigger>
                      <SelectValue placeholder={language === 'ar' ? 'اختر نوع الموعد' : 'Select appointment type'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consultation">{language === 'ar' ? 'كشف جديد' : 'New Consultation'}</SelectItem>
                      <SelectItem value="followup">{language === 'ar' ? 'متابعة' : 'Follow-up'}</SelectItem>
                      <SelectItem value="emergency">{language === 'ar' ? 'حالة طارئة' : 'Emergency'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{t('appointment.reason')}</Label>
                  <Textarea
                    placeholder={language === 'ar' ? 'اكتب وصف مختصر للأعراض...' : 'Describe your symptoms...'}
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Selected Appointment Details */}
            {selectedDoctor && selectedDate && selectedTime && (
              <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950">
                <CardHeader>
                  <CardTitle className="text-lg text-green-800 dark:text-green-400">{language === 'ar' ? 'تفاصيل الحجز' : 'Booking Details'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-reverse space-x-2">
                    <User className="h-4 w-4" />
                    <span>{selectedDoctor.name}</span>
                  </div>
                  <div className="flex items-center space-x-reverse space-x-2">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{selectedDate.toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US')}</span>
                  </div>
                  <div className="flex items-center space-x-reverse space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{selectedTime}</span>
                  </div>
                  <div className="flex items-center space-x-reverse space-x-2">
                    <span className="font-medium">{language === 'ar' ? 'الرسوم:' : 'Fee:'} {selectedDoctor.fee} {t('currency.short')}</span>
                  </div>
                  <Button className="w-full" onClick={handleBookAppointment}>
                    {t('appointment.confirm')}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Doctors List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">{language === 'ar' ? 'الأطباء المتاحون' : 'Available Doctors'}</h2>
              <Badge variant="secondary">{filteredDoctors.length} {language === 'ar' ? 'طبيب' : 'doctor(s)'}</Badge>
            </div>

            <div className="space-y-4">
              {filteredDoctors.map((doctor) => (
                <Card 
                  key={doctor.id} 
                  className={`cursor-pointer transition-all dark:bg-gray-800 ${
                    selectedDoctor?.id === doctor.id ? 'ring-2 ring-primary' : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-reverse space-x-4">
                        <Avatar className="w-16 h-16">
                          <AvatarFallback className="text-lg">
                            {doctor.name.split(' ')[1]?.[0] || 'د'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg">{doctor.name}</h3>
                          <p className="text-muted-foreground">{doctor.specialty}</p>
                          <div className="flex items-center space-x-reverse space-x-2 mt-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{doctor.rating}</span>
                            <span className="text-sm text-muted-foreground">
                              ({doctor.experience} {language === 'ar' ? 'سنة خبرة' : 'years exp.'})
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className={dir === 'rtl' ? 'text-left' : 'text-right'}>
                        <div className="flex items-center space-x-reverse space-x-1 mb-2">
                          {doctor.type === 'video' ? (
                            <Video className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          ) : (
                            <Phone className="h-4 w-4 text-green-600 dark:text-green-400" />
                          )}
                          <span className="text-sm font-medium">
                            {doctor.type === 'video' 
                              ? (language === 'ar' ? 'استشارة مرئية' : 'Video Call')
                              : (language === 'ar' ? 'زيارة عيادة' : 'Clinic Visit')
                            }
                          </span>
                        </div>
                        <div className="text-lg font-bold text-primary">
                          {doctor.fee} {t('currency.short')}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-reverse space-x-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{doctor.clinic}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {doctor.address}
                      </div>
                    </div>

                    {selectedDoctor?.id === doctor.id && (
                      <div className="mt-4 pt-4 border-t dark:border-gray-700 space-y-4">
                        <div>
                          <Label className="text-sm font-medium mb-2 block">{t('appointment.select.date')}</Label>
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) => date < new Date()}
                            className="rounded-md border dark:border-gray-700"
                          />
                        </div>

                        {selectedDate && (
                          <div>
                            <Label className="text-sm font-medium mb-2 block">{language === 'ar' ? 'المواعيد المتاحة' : 'Available Slots'}</Label>
                            <div className="grid grid-cols-3 gap-2">
                              {doctor.availableSlots.map((slot) => (
                                <Button
                                  key={slot}
                                  variant={selectedTime === slot ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => setSelectedTime(slot)}
                                >
                                  {slot}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}