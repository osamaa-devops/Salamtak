import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { 
  Calendar, 
  Clock, 
  Pill, 
  FileText, 
  Bell, 
  LogOut, 
  Settings, 
  Plus,
  Heart,
  User,
  Phone,
  MapPin,
  Video,
  ShoppingCart,
  Star,
  Truck,
  Globe,
  Moon,
  Sun
} from "lucide-react";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { useApp } from "../contexts/AppContext";
import { ApiUser, api } from "../services/api";
import { useAsyncData } from "../hooks/useAsyncData";
import { toast } from "sonner@2.0.3";

interface PatientDashboardProps {
  onLogout: () => void;
  onNavigate?: (state: string) => void;
  currentUser?: ApiUser | null;
}

export function PatientDashboard({ onLogout, onNavigate, currentUser }: PatientDashboardProps) {
  const { t, dir, language, theme, toggleLanguage, toggleTheme } = useApp();
  const [selectedDate] = useState(new Date());
  const { data: appointmentData, setData: setAppointmentData, isLoading: appointmentsLoading, error: appointmentsError } = useAsyncData(() => api.appointments(), []);
  const { data: scheduleData, setData: setScheduleData } = useAsyncData(() => api.medicationSchedules(), []);
  const { data: profileData } = useAsyncData(() => api.patientProfile(), []);

  const appointments = (appointmentData || []).map((appointment) => ({
    id: appointment._id,
    doctorName: appointment.doctor?.name || "",
    specialty: appointment.doctorProfile?.specialty || "",
    doctorPhone: appointment.doctor?.phone || "",
    date: appointment.date,
    time: appointment.time,
    type: appointment.type,
    status: appointment.status,
    clinic: appointment.clinic || "",
  }));
  const todayKey = new Date().toISOString().slice(0, 10);
  const todayAppointments = appointments.filter((appointment) => String(appointment.date).slice(0, 10) === todayKey);
  const upcomingAppointments = appointments.filter((appointment) => String(appointment.date).slice(0, 10) !== todayKey);

  const medicationReminders = (scheduleData || []).flatMap((schedule) =>
    schedule.times.map((time: string) => ({
      id: `${schedule._id}-${time}`,
      scheduleId: schedule._id,
      name: schedule.medicationName,
      time,
      taken: schedule.takenToday?.includes(time),
    })),
  );

  const cancelAppointment = async (id: string) => {
    try {
      const updated = await api.updateAppointment(id, { status: "cancelled" });
      setAppointmentData((appointmentData || []).map((appointment) => appointment._id === id ? updated : appointment));
      toast.success(language === "ar" ? "تم إلغاء الموعد" : "Appointment cancelled");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : language === "ar" ? "تعذر إلغاء الموعد" : "Unable to cancel appointment");
    }
  };

  const markMedicationTaken = async (scheduleId: string, time: string) => {
    const schedule = (scheduleData || []).find((item) => item._id === scheduleId);
    if (!schedule) return;
    const takenToday = Array.from(new Set([...(schedule.takenToday || []), time]));
    try {
      const updated = await api.updateMedicationSchedule(scheduleId, { takenToday });
      setScheduleData((scheduleData || []).map((item) => item._id === scheduleId ? updated : item));
      toast.success(language === "ar" ? "تم تسجيل تناول الدواء" : "Medication marked as taken");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : language === "ar" ? "تعذر تحديث الدواء" : "Unable to update medication");
    }
  };

  const quickActions = [
    {
      title: language === 'ar' ? 'حجز موعد' : 'Book Appointment',
      description: language === 'ar' ? 'احجز موعد مع طبيب مختص' : 'Book an appointment with a specialist doctor',
      icon: Calendar,
      gradient: "from-blue-500 to-blue-600",
      shadowColor: "shadow-blue-500/50",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      iconColor: "text-blue-600 dark:text-blue-400",
      action: () => onNavigate?.('appointment-booking')
    },
    {
      title: language === 'ar' ? 'إدارة الأدوية' : 'Manage Medications',
      description: language === 'ar' ? 'تذكير بمواعيد الأدوية' : 'Medication reminders',
      icon: Pill,
      gradient: "from-emerald-500 to-emerald-600",
      shadowColor: "shadow-emerald-500/50",
      bgColor: "bg-emerald-50 dark:bg-emerald-950",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      action: () => onNavigate?.('medication-reminder')
    },
    {
      title: language === 'ar' ? 'استشارة مرئية' : 'Video Consultation',
      description: language === 'ar' ? 'تواصل مع الطبيب عن بُعد' : 'Connect with your doctor remotely',
      icon: Video,
      gradient: "from-violet-500 to-violet-600",
      shadowColor: "shadow-violet-500/50",
      bgColor: "bg-violet-50 dark:bg-violet-950",
      iconColor: "text-violet-600 dark:text-violet-400",
      action: () => onNavigate?.('video-consultation')
    },
    {
      title: language === 'ar' ? 'طلب أدوية' : 'Order Medications',
      description: language === 'ar' ? 'اطلب أدويتك مع التوصيل' : 'Order your medications with delivery',
      icon: ShoppingCart,
      gradient: "from-amber-500 to-amber-600",
      shadowColor: "shadow-amber-500/50",
      bgColor: "bg-amber-50 dark:bg-amber-950",
      iconColor: "text-amber-600 dark:text-amber-400",
      action: () => onNavigate?.('pharmacy-delivery')
    }
  ];

  const healthMetrics = profileData?.healthMetrics || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed": return language === 'ar' ? "مؤكد" : "Confirmed";
      case "pending": return language === 'ar' ? "في الانتظار" : "Pending";
      case "cancelled": return language === 'ar' ? "ملغي" : "Cancelled";
      default: return language === 'ar' ? "غير محدد" : "Unknown";
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" dir={dir}>
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-green-50/30 to-teal-50/50 dark:from-gray-900 dark:via-emerald-950/50 dark:to-teal-950/50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxMGI5ODEiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnptLTEyIDBjMy4zMSAwIDYtMi42OSA2LTZzLTIuNjktNi02LTYtNiAyLjY5LTYgNiAyLjY5IDYgNiA2ek0zNiAzOGMzLjMxIDAgNi0yLjY5IDYtNnMtMi42OS02LTYtNi02IDIuNjktNiA2IDIuNjkgNiA2IDZ6bS0xMiAwYzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40" />
      </div>

      <div className="relative z-10">
      {/* Header */}
      <header className="glass-header sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-reverse space-x-2 sm:space-x-4">
              <div className="relative">
                <Avatar className="w-10 h-10 sm:w-12 sm:h-12 ring-2 ring-emerald-200 ring-offset-2">
                  <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-green-500 text-white font-semibold">{(currentUser?.name || t('default.patient.name')).split(' ').map(n => n[0]).join('').slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <h1 className="font-bold not-italic text-sm sm:text-base">{currentUser?.name || t('default.patient.name')}</h1>
                <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                  <Heart className="h-3 w-3 text-emerald-500" />
                  {language === 'ar' ? 'مريض منذ 2023' : 'Patient since 2023'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-reverse space-x-1 sm:space-x-2">
              {/* Language Toggle */}
              <Button
                onClick={toggleLanguage}
                variant="ghost"
                size="sm"
                className="hover:bg-emerald-50 dark:hover:bg-emerald-900 h-8 sm:h-10 px-2">
                <Globe className="h-4 w-4" />
                <span className="ml-1 hidden sm:inline">{language === 'ar' ? 'EN' : 'ع'}</span>
              </Button>
              
              {/* Theme Toggle */}
              <Button
                onClick={toggleTheme}
                variant="ghost"
                size="sm"
                className="hover:bg-emerald-50 dark:hover:bg-emerald-900 h-8 sm:h-10 px-2">
                {theme === 'light' ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </Button>
              
              <Button variant="ghost" size="sm" onClick={() => onNavigate?.('medication-reminder')} className="relative hover:bg-emerald-50 dark:hover:bg-emerald-900 h-8 w-8 sm:h-10 sm:w-10 p-0">
                <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onNavigate?.('patient-profile')} className="hover:bg-emerald-50 dark:hover:bg-emerald-900 h-8 w-8 sm:h-10 sm:w-10 p-0">
                <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onLogout} className="hidden sm:flex hover:bg-red-50 dark:hover:bg-red-900 hover:text-red-600">
                <LogOut className="h-4 w-4 ml-1" />
                <span className="hidden lg:inline">{t('action.logout')}</span>
              </Button>
              <Button variant="ghost" size="sm" onClick={onLogout} className="sm:hidden h-8 w-8 p-0 hover:bg-red-50 dark:hover:bg-red-900 hover:text-red-600">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="mb-6 sm:mb-8 animate-fadeIn">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              {t('dashboard.welcome')} {(currentUser?.name || t('default.patient.name')).split(' ')[0]}
            </span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {format(selectedDate, "EEEE، d MMMM yyyy", { locale: language === 'ar' ? ar : enUS })}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <Card className="border-t-4 border-t-blue-500 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-4 lg:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium">{language === 'ar' ? 'مواعيد اليوم' : 'Today\'s Appointments'}</CardTitle>
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 lg:p-6 pt-0">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">{appointmentsLoading ? "..." : todayAppointments.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {appointmentsError || (language === 'ar' ? 'مواعيدك المؤكدة اليوم' : 'confirmed appointments today')}
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-t-4 border-t-emerald-500 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-4 lg:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium">{language === 'ar' ? 'الأدوية اليومية' : 'Daily Medications'}</CardTitle>
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg flex items-center justify-center">
                <Pill className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 lg:p-6 pt-0">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">2</div>
              <p className="text-xs text-muted-foreground mt-1">
                {language === 'ar' ? '1 من 2 تم تناوله' : '1 out of 2 taken'}
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-t-4 border-t-rose-500 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-4 lg:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium">{language === 'ar' ? 'آخر فحص' : 'Last Checkup'}</CardTitle>
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-rose-100 dark:bg-rose-900/50 rounded-lg flex items-center justify-center">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-rose-600 dark:text-rose-400" />
              </div>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 lg:p-6 pt-0">
              <div className="text-2xl sm:text-3xl font-bold text-rose-600 dark:text-rose-400">3</div>
              <p className="text-xs text-muted-foreground mt-1">
                {language === 'ar' ? ' أيام مضت' : 'days ago'}
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-t-4 border-t-amber-500 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-4 lg:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium">{language === 'ar' ? 'الصحة العامة' : 'General Health'}</CardTitle>
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-amber-100 dark:bg-amber-900/50 rounded-lg flex items-center justify-center">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600 dark:text-amber-400" />
              </div>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 lg:p-6 pt-0">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">{language === 'ar' ? 'ممتاز' : 'Excellent'}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {language === 'ar' ? 'جميع المؤشرات طبيعية' : 'all indicators normal'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {quickActions.map((action, index) => (
            <Card 
              key={index}
              className={`group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 ${action.bgColor} hover:scale-[1.02] transform`}
              onClick={action.action}
            >
              <CardContent className="p-4 sm:p-5 lg:p-6 text-center">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 bg-gradient-to-br ${action.gradient} rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-md group-hover:shadow-lg transition-all duration-300`}>
                  <action.icon className="h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 text-white" />
                </div>
                <h4 className="font-bold text-base sm:text-lg mb-1.5 text-gray-800 dark:text-white">{action.title}</h4>
                <p className="text-sm sm:text-base text-muted-foreground line-clamp-2">{action.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="today" className="space-y-3 sm:space-y-4 lg:space-y-6">
          <TabsList className="grid w-full grid-cols-4 h-auto sm:h-12 p-1 sm:p-1.5 gap-1 bg-gray-100 dark:bg-gray-800">
            <TabsTrigger value="today" className="text-xs sm:text-sm md:text-base py-2.5 sm:py-3 px-2 sm:px-4 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 rounded font-medium">
              {language === 'ar' ? 'اليوم' : 'Today'}
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="text-xs sm:text-sm md:text-base py-2.5 sm:py-3 px-2 sm:px-4 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 rounded font-medium">
              {language === 'ar' ? 'القادم' : 'Upcoming'}
            </TabsTrigger>
            <TabsTrigger value="medications" className="text-xs sm:text-sm md:text-base py-2.5 sm:py-3 px-2 sm:px-4 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 rounded font-medium">
              {language === 'ar' ? 'الأدوية' : 'Meds'}
            </TabsTrigger>
            <TabsTrigger value="health" className="text-xs sm:text-sm md:text-base py-2.5 sm:py-3 px-2 sm:px-4 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 rounded font-medium">
              {language === 'ar' ? 'الصحة' : 'Health'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="today" className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
              <h2 className="text-sm sm:text-base lg:text-lg font-semibold">{language === 'ar' ? 'مواعيد اليوم' : 'Today\'s Appointments'}</h2>
              <Button onClick={() => onNavigate?.('appointment-booking')} className="text-xs sm:text-sm h-9 sm:h-10">
                <Plus className={`h-3 w-3 sm:h-4 sm:w-4 ${dir === 'rtl' ? 'ml-1.5 sm:ml-2' : 'mr-1.5 sm:mr-2'}`} />
                {language === 'ar' ? 'حجز موعد جديد' : 'Book New Appointment'}
              </Button>
            </div>
            
            {todayAppointments.length > 0 ? (
              <div className="grid gap-4">
                {todayAppointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-reverse space-x-4">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback>
                              {appointment.doctorName.split(' ')[1]?.[0] || 'د'}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{appointment.doctorName}</h3>
                            <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                            <div className="flex items-center space-x-reverse space-x-2 text-sm text-muted-foreground mt-1">
                              <Clock className="h-4 w-4" />
                              <span>{appointment.time}</span>
                              <MapPin className="h-4 w-4" />
                              <span>{appointment.clinic}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-reverse space-x-2">
                          <Badge className={getStatusColor(appointment.status)}>
                            {getStatusText(appointment.status)}
                          </Badge>
                          <Button variant="outline" size="sm" onClick={() => window.location.href = `tel:${appointment.doctorPhone}`}>
                            <Phone className={`h-4 w-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                            {language === 'ar' ? 'اتصال' : 'Call'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">{language === 'ar' ? 'لا توجد مواعيد اليوم' : 'No Appointments Today'}</h3>
                  <p className="text-muted-foreground mb-4">
                    {language === 'ar' ? 'لا توجد مواعيد مجدولة لهذا اليوم' : 'No appointments scheduled for today'}
                  </p>
                  <Button onClick={() => onNavigate?.('appointment-booking')}>
                    <Plus className={`h-4 w-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                    {language === 'ar' ? 'احجز موعد جديد' : 'Book New Appointment'}
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="upcoming" className="space-y-4">
            <h2 className="text-lg font-semibold">{language === 'ar' ? 'المواعيد القادمة' : 'Upcoming Appointments'}</h2>
            <div className="grid gap-4">
              {upcomingAppointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-reverse space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback>
                            {appointment.doctorName.split(' ')[1]?.[0] || 'د'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{appointment.doctorName}</h3>
                          <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                          <div className="flex items-center space-x-reverse space-x-2 text-sm text-muted-foreground mt-1">
                            <Calendar className="h-4 w-4" />
                            <span>{appointment.date}</span>
                            <Clock className="h-4 w-4" />
                            <span>{appointment.time}</span>
                            <MapPin className="h-4 w-4" />
                            <span>{appointment.clinic}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-reverse space-x-2">
                        <Button variant="outline" size="sm" onClick={() => onNavigate?.('appointment-booking')}>{language === 'ar' ? 'تعديل' : 'Edit'}</Button>
                        <Button variant="outline" size="sm" onClick={() => cancelAppointment(appointment.id)}>{language === 'ar' ? 'إلغاء' : 'Cancel'}</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="medications" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{language === 'ar' ? 'أدوية اليوم' : 'Today\'s Medications'}</h2>
              <Button onClick={() => onNavigate?.('medication-reminder')}>
                {language === 'ar' ? 'إدارة الأدوية' : 'Manage Medications'}
              </Button>
            </div>
            
            <div className="grid gap-4">
              {medicationReminders.map((medication) => (
                <Card key={medication.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-reverse space-x-3">
                        <div className={`w-4 h-4 rounded-full ${
                          medication.taken ? 'bg-green-500' : 'bg-gray-300'
                        }`} />
                        <div>
                          <h4 className="font-medium">{medication.name}</h4>
                          <p className="text-sm text-muted-foreground">{language === 'ar' ? 'موعد التناول' : 'Time'}: {medication.time}</p>
                        </div>
                      </div>
                      
                      {!medication.taken && (
                        <Button size="sm" onClick={() => markMedicationTaken(medication.scheduleId, medication.time)}>
                          {language === 'ar' ? 'تم التناول' : 'Mark as Taken'}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-6">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>{language === 'ar' ? 'التقدم اليومي' : 'Daily Progress'}</span>
                <span>50%</span>
              </div>
              <Progress value={50} className="h-2" />
            </div>
          </TabsContent>
          
          <TabsContent value="health" className="space-y-4">
            <h2 className="text-lg font-semibold">{language === 'ar' ? 'المؤشرات الصحية' : 'Health Metrics'}</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {healthMetrics.map((metric, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{metric.label}</h4>
                        <p className={`text-2xl font-bold ${metric.color}`}>
                          {metric.value}
                        </p>
                      </div>
                      <Heart className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>{language === 'ar' ? 'نصائح صحية' : 'Health Tips'}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-reverse space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>{language === 'ar' ? 'استمر في تناول أدويتك في المواعيد المحددة' : 'Continue taking your medications on schedule'}</span>
                  </li>
                  <li className="flex items-center space-x-reverse space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span>{language === 'ar' ? 'احرص على ممارسة الرياضة 30 دقيقة يومياً' : 'Exercise for 30 minutes daily'}</span>
                  </li>
                  <li className="flex items-center space-x-reverse space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span>{language === 'ar' ? 'اشرب كمية كافية من الماء (8 أكواب يومياً)' : 'Drink enough water (8 glasses daily)'}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      </div>
    </div>
  );
}
