import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  FileText, 
  Bell, 
  LogOut, 
  Settings,
  Video,
  Star,
  Stethoscope,
  Users,
  FolderOpen,
  TrendingUp,
  Activity,
  Heart,
  Globe,
  Moon,
  Sun
} from "lucide-react";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { useApp } from "../contexts/AppContext";

interface DoctorDashboardProps {
  onLogout: () => void;
  onNavigate?: (state: string) => void;
}

export function DoctorDashboard({ onLogout, onNavigate }: DoctorDashboardProps) {
  const { t, dir, language, theme, toggleLanguage, toggleTheme } = useApp();
  const [selectedDate] = useState(new Date());

  // Mock data for appointments
  const todayAppointments = [
    {
      id: 1,
      patientName: t('default.patient.name'),
      time: "09:00",
      type: t('doctor.appointment.new'),
      phone: "01234567890",
      status: "confirmed"
    },
    {
      id: 2,
      patientName: language === 'ar' ? "فاطمة أحمد" : "Fatima Ahmed",
      time: "10:30",
      type: t('doctor.appointment.followup'),
      phone: "01234567891",
      status: "waiting"
    },
    {
      id: 3,
      patientName: language === 'ar' ? "محمد علي" : "Mohamed Ali",
      time: "11:15",
      type: t('doctor.appointment.video'),
      phone: "01234567892",
      status: "confirmed"
    }
  ];

  const upcomingAppointments = [
    {
      id: 4,
      patientName: language === 'ar' ? "سارة محمود" : "Sara Mahmoud",
      date: "2024-01-15",
      time: "14:00",
      type: t('doctor.appointment.new')
    },
    {
      id: 5,
      patientName: language === 'ar' ? "عمر حسن" : "Omar Hassan",
      date: "2024-01-16",
      time: "10:00",
      type: t('doctor.appointment.followup')
    }
  ];

  // عدد المرضى المحجوزين للاستشارة المرئية
  const videoConsultationPatients = 5;

  // ملفات المرضى
  const patientFiles = [
    {
      id: 1,
      patientName: t('default.patient.name'),
      age: 34,
      lastVisit: "2024-01-10",
      condition: t('condition.hypertension'),
      visits: 12,
      phone: "01234567890"
    },
    {
      id: 2,
      patientName: language === 'ar' ? "فاطمة أحمد محمد" : "Fatima Ahmed Mohamed",
      age: 28,
      lastVisit: "2024-01-12",
      condition: t('condition.diabetes'),
      visits: 8,
      phone: "01234567891"
    },
    {
      id: 3,
      patientName: language === 'ar' ? "محمد علي حسن" : "Mohamed Ali Hassan",
      age: 45,
      lastVisit: "2024-01-13",
      condition: t('condition.heartDisease'),
      visits: 15,
      phone: "01234567892"
    },
    {
      id: 4,
      patientName: language === 'ar' ? "سارة محمود عبدالله" : "Sara Mahmoud Abdullah",
      age: 32,
      lastVisit: "2024-01-14",
      condition: language === 'ar' ? "فحص دوري" : "Periodic Check",
      visits: 5,
      phone: "01234567893"
    },
    {
      id: 5,
      patientName: language === 'ar' ? "عمر حسن إبراهيم" : "Omar Hassan Ibrahim",
      age: 52,
      lastVisit: "2024-01-14",
      condition: t('condition.arthritis'),
      visits: 20,
      phone: "01234567894"
    }
  ];

  const quickActions = [
    {
      title: t('page.prescription'),
      description: language === 'ar' ? "كتابة روشتة طبية جديدة" : "Write new medical prescription",
      icon: FileText,
      gradient: "from-emerald-500 to-emerald-600",
      shadowColor: "shadow-emerald-500/50",
      bgColor: "bg-emerald-50 dark:bg-emerald-950",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      count: null,
      action: () => onNavigate?.('prescription')
    },
    {
      title: t('feature.video.consultation'),
      description: language === 'ar' ? "بدء استشارة مرئية مع المرضى" : "Start video consultation with patients",
      icon: Video,
      gradient: "from-blue-500 to-blue-600",
      shadowColor: "shadow-blue-500/50",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      iconColor: "text-blue-600 dark:text-blue-400",
      count: videoConsultationPatients,
      action: () => onNavigate?.('doctor-video-consultation')
    },
    {
      title: t('doctor.dashboard.patient.files'),
      description: language === 'ar' ? "استعراض وإدارة ملفات المرضى" : "View and manage patient files",
      icon: FolderOpen,
      gradient: "from-violet-500 to-violet-600",
      shadowColor: "shadow-violet-500/50",
      bgColor: "bg-violet-50 dark:bg-violet-950",
      iconColor: "text-violet-600 dark:text-violet-400",
      count: patientFiles.length,
      action: () => onNavigate?.('patient-files')
    },
    {
      title: language === 'ar' ? 'التقييمات والمراجعات' : 'Ratings & Reviews',
      description: language === 'ar' ? "استعراض تقييمات ومراجعات المرضى" : "View patient ratings and reviews",
      icon: Star,
      gradient: "from-amber-500 to-amber-600",
      shadowColor: "shadow-amber-500/50",
      bgColor: "bg-amber-50 dark:bg-amber-950",
      iconColor: "text-amber-600 dark:text-amber-400",
      count: 127,
      action: () => onNavigate?.('rating-system')
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "waiting": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "completed": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed": return language === 'ar' ? "مؤكد" : "Confirmed";
      case "waiting": return language === 'ar' ? "في الانتظار" : "Waiting";
      case "completed": return language === 'ar' ? "مكتمل" : "Completed";
      default: return language === 'ar' ? "غير محدد" : "Unknown";
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" dir={dir}>
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/50 dark:from-gray-900 dark:via-indigo-950/50 dark:to-purple-950/50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM2NjdlZWEiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnptLTEyIDBjMy4zMSAwIDYtMi42OSA2LTZzLTIuNjktNi02LTYtNiAyLjY5LTYgNiAyLjY5IDYgNiA2ek0zNiAzOGMzLjMxIDAgNi0yLjY5IDYtNnMtMi42OS02LTYtNiLTYgMi42OS02IDYgMi42kgNiA2IDZ6bS0xMiAwYzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40" />
      </div>

      {/* Header */}
      <header className="relative z-20 glass-header sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-reverse space-x-4">
              <div className="relative">
                <Avatar className="w-12 h-12 ring-2 ring-blue-200 ring-offset-2">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                    {t('default.doctor.name').split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
              </div>
              <div className={dir === 'rtl' ? 'mr-2' : 'ml-2'}>
                <h1 className="font-bold">{t('default.doctor.name')}</h1>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Stethoscope className="h-3 w-3" />
                  {t('specialty.cardiology')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-reverse space-x-2">
              {/* Language Toggle */}
              <Button
                onClick={toggleLanguage}
                variant="ghost"
                size="sm"
                className="hover:bg-blue-50 dark:hover:bg-blue-900">
                <Globe className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">{language === 'ar' ? 'EN' : 'ع'}</span>
              </Button>
              
              {/* Theme Toggle */}
              <Button
                onClick={toggleTheme}
                variant="ghost"
                size="sm"
                className="hover:bg-blue-50 dark:hover:bg-blue-900">
                {theme === 'light' ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
              
              <Button variant="ghost" size="sm" className="relative hover:bg-blue-50 dark:hover:bg-blue-900">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-blue-50 dark:hover:bg-blue-900">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onLogout} className="hover:bg-red-50 dark:hover:bg-red-900 hover:text-red-600">
                <LogOut className="h-5 w-5 ml-1" />
                <span className="hidden sm:inline">{t('action.logout')}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="mb-4 sm:mb-6 lg:mb-8 animate-fadeIn">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-muted-foreground flex items-center gap-1 sm:gap-2">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
            {format(selectedDate, "EEEE، d MMMM yyyy", { locale: language === 'ar' ? ar : enUS })}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <Card className="glass-card border-0 shadow-premium hover:shadow-premium-lg transition-all overflow-hidden group hover:scale-105 active:scale-95">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-4 lg:p-6 relative z-10">
              <CardTitle className="text-xs sm:text-sm font-medium">{language === 'ar' ? 'مواعيد اليوم' : 'Today\'s Appointments'}</CardTitle>
              <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10 p-3 sm:p-4 lg:p-6 pt-0">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">3</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-emerald-500" />
                {language === 'ar' ? '+2 من الأمس' : '+2 from yesterday'}
              </p>
            </CardContent>
          </Card>
          
          <Card className="glass-card border-0 shadow-premium hover:shadow-premium-lg transition-all overflow-hidden group hover:scale-105 active:scale-95">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-4 lg:p-6 relative z-10">
              <CardTitle className="text-xs sm:text-sm font-medium">{language === 'ar' ? 'المرضى الجدد' : 'New Patients'}</CardTitle>
              <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                <User className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10 p-3 sm:p-4 lg:p-6 pt-0">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">1</div>
              <p className="text-xs text-muted-foreground mt-1">
                {language === 'ar' ? 'هذا الأسبوع' : 'This week'}
              </p>
            </CardContent>
          </Card>
          
          <Card className="glass-card border-0 shadow-premium hover:shadow-premium-lg transition-all overflow-hidden group hover:scale-105 active:scale-95">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-amber-600/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-4 lg:p-6 relative z-10">
              <CardTitle className="text-xs sm:text-sm font-medium">{language === 'ar' ? 'التقييم' : 'Rating'}</CardTitle>
              <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10 p-3 sm:p-4 lg:p-6 pt-0">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">4.8</div>
              <p className="text-xs text-muted-foreground mt-1">
                {language === 'ar' ? 'من 127 تقييم' : 'from 127 reviews'}
              </p>
            </CardContent>
          </Card>
          
          <Card className="glass-card border-0 shadow-premium hover:shadow-premium-lg transition-all overflow-hidden group hover:scale-105 active:scale-95">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-4 lg:p-6 relative z-10">
              <CardTitle className="text-xs sm:text-sm font-medium">{language === 'ar' ? 'استشارات مرئية' : 'Video Consultations'}</CardTitle>
              <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                <Video className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10 p-3 sm:p-4 lg:p-6 pt-0">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-violet-600 to-violet-500 bg-clip-text text-transparent">{videoConsultationPatients}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {language === 'ar' ? 'مريض محجوز اليوم' : 'patients booked today'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <h2 className="text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 lg:mb-6 flex items-center gap-2">
            <div className="w-1 h-4 sm:h-5 lg:h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full" />
            {language === 'ar' ? 'الإجراءات السريعة' : 'Quick Actions'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {quickActions.map((action, index) => (
              <Card 
                key={index}
                className={`group cursor-pointer hover:shadow-lg transition-all duration-300 border-2 ${action.bgColor} hover:scale-[1.02] transform`}
                onClick={action.action}
              >
                <CardContent className="p-4 sm:p-5 lg:p-6 text-center relative">
                  {action.count !== null && action.count > 0 && (
                    <Badge className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full min-w-5 h-5 sm:min-w-6 sm:h-6 flex items-center justify-center shadow-md border-2 border-white text-sm">
                      {action.count}
                    </Badge>
                  )}
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18 bg-gradient-to-br ${action.gradient} rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-md group-hover:shadow-lg transition-all duration-300`}>
                    <action.icon className="h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 text-white" />
                  </div>
                  <h4 className="font-bold text-base sm:text-lg mb-1.5 text-gray-800 dark:text-white">{action.title}</h4>
                  <p className="text-sm sm:text-base text-muted-foreground line-clamp-2">{action.description}</p>
                  {action.count !== null && action.count > 0 && (
                    <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold">{action.count} {language === 'ar' ? 'محجوز' : 'booked'}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Tabs defaultValue="today" className="space-y-3 sm:space-y-4 lg:space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-auto sm:h-12 p-1 sm:p-1.5 gap-1 bg-gray-100 dark:bg-gray-800">
            <TabsTrigger value="today" className="text-xs sm:text-sm md:text-base py-2.5 sm:py-3 px-2 sm:px-4 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 rounded font-medium">{language === 'ar' ? 'مواعيد اليوم' : 'Today'}</TabsTrigger>
            <TabsTrigger value="upcoming" className="text-xs sm:text-sm md:text-base py-2.5 sm:py-3 px-2 sm:px-4 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 rounded font-medium">{language === 'ar' ? 'القادمة' : 'Upcoming'}</TabsTrigger>
            <TabsTrigger value="patients" className="text-xs sm:text-sm md:text-base py-2.5 sm:py-3 px-2 sm:px-4 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 rounded font-medium">{language === 'ar' ? 'المرضى' : 'Patients'}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="today" className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-3">
              <h2 className="text-sm sm:text-base lg:text-lg font-semibold">{language === 'ar' ? `مواعيد اليوم (${todayAppointments.length})` : `Today's Appointments (${todayAppointments.length})`}</h2>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-reverse sm:space-x-2">
                <Button onClick={() => onNavigate?.('prescription')} className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-xs sm:text-sm h-9 sm:h-10">
                  <FileText className={`h-3 w-3 sm:h-4 sm:w-4 ${dir === 'rtl' ? 'ml-1.5 sm:ml-2' : 'mr-1.5 sm:mr-2'}`} />
                  {language === 'ar' ? 'كتابة روشتة' : 'Write Prescription'}
                </Button>
                <Button onClick={() => onNavigate?.('doctor-video-consultation')} className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-xs sm:text-sm h-9 sm:h-10">
                  <Video className={`h-3 w-3 sm:h-4 sm:w-4 ${dir === 'rtl' ? 'ml-1.5 sm:ml-2' : 'mr-1.5 sm:mr-2'}`} />
                  {language === 'ar' ? 'الاستشارات المرئية' : 'Video Consultations'}
                </Button>
              </div>
            </div>
            
            <div className="grid gap-3 sm:gap-4">
              {todayAppointments.map((appointment, idx) => (
                <Card key={appointment.id} className="glass-card border-0 shadow-premium hover:shadow-premium-lg transition-all group overflow-hidden animate-fadeIn" style={{ animationDelay: `${idx * 0.1}s` }}>
                  <CardContent className="p-3 sm:p-4 lg:p-6">
                    <div className="flex flex-col gap-3 sm:gap-4">
                      <div className="flex items-center space-x-reverse space-x-2 sm:space-x-3">
                        <div className="relative flex-shrink-0">
                          <Avatar className="w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 ring-2 ring-white shadow-lg">
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold text-xs sm:text-sm">
                              {appointment.patientName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-4 sm:h-4 bg-emerald-500 border-2 border-white rounded-full" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-sm sm:text-base lg:text-lg truncate">{appointment.patientName}</h3>
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-muted-foreground mt-0.5 sm:mt-1">
                            <div className="flex items-center space-x-reverse space-x-1">
                              <Clock className="h-3 w-3" />
                              <span className="font-medium">{appointment.time}</span>
                            </div>
                            <span>•</span>
                            <span>{appointment.type}</span>
                          </div>
                        </div>
                        <Badge className={getStatusColor(appointment.status) + " shadow-sm text-xs whitespace-nowrap"}>
                          {getStatusText(appointment.status)}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-reverse space-x-2 gap-2">
                        <Button variant="outline" size="sm" className="flex-1 sm:flex-none hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 h-8 sm:h-9 text-xs">
                          <Phone className={`h-3 w-3 ${dir === 'rtl' ? 'sm:ml-1.5' : 'sm:mr-1.5'}`} />
                          <span className="hidden sm:inline">{language === 'ar' ? 'اتصال' : 'Call'}</span>
                        </Button>
                        <Button size="sm" className="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md h-8 sm:h-9 text-xs">
                          <FolderOpen className={`h-3 w-3 ${dir === 'rtl' ? 'sm:ml-1.5' : 'sm:mr-1.5'}`} />
                          <span>{language === 'ar' ? 'عرض الملف' : 'View File'}</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="upcoming" className="space-y-3 sm:space-y-4">
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <h2 className="text-sm sm:text-base lg:text-lg font-semibold">{language === 'ar' ? `المواعيد القادمة (${upcomingAppointments.length})` : `Upcoming Appointments (${upcomingAppointments.length})`}</h2>
            </div>
            <div className="grid gap-3 sm:gap-4">
              {upcomingAppointments.map((appointment) => (
                <Card key={appointment.id} className="glass-card border-0 shadow-premium hover:shadow-premium-lg transition-all">
                  <CardContent className="p-3 sm:p-4 lg:p-6">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center space-x-reverse space-x-2 sm:space-x-3">
                        <Avatar className="w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0">
                          <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-500 text-white text-xs sm:text-sm">
                            {appointment.patientName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm sm:text-base truncate">{appointment.patientName}</h3>
                          <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{appointment.date}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{appointment.time}</span>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">{appointment.type}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-reverse space-x-2 gap-2">
                        <Button variant="outline" size="sm" className="flex-1 text-xs h-8">{language === 'ar' ? 'تعديل' : 'Edit'}</Button>
                        <Button variant="outline" size="sm" className="flex-1 text-red-600 hover:bg-red-50 text-xs h-8">{language === 'ar' ? 'إلغاء' : 'Cancel'}</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="patients" className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-3">
              <h2 className="text-sm sm:text-base lg:text-lg font-semibold">{language === 'ar' ? `ملفات المرضى (${patientFiles.length} مريض)` : `Patient Files (${patientFiles.length} Patient)`}</h2>
              <Button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-xs sm:text-sm h-9 sm:h-10">
                <User className="h-3 w-3 sm:h-4 sm:w-4 ml-1.5 sm:ml-2" />
                {language === 'ar' ? 'إضافة مريض جديد' : 'Add New Patient'}
              </Button>
            </div>
            
            <div className="grid gap-3 sm:gap-4">
              {patientFiles.map((patient) => (
                <Card key={patient.id} className="glass-card border-0 shadow-premium hover:shadow-premium-lg transition-all">
                  <CardContent className="p-3 sm:p-4 lg:p-6">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start space-x-reverse space-x-2 sm:space-x-3">
                        <Avatar className="w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex-shrink-0">
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs sm:text-sm">
                            {patient.patientName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm sm:text-base mb-1 truncate">{patient.patientName}</h3>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2 text-xs text-muted-foreground dark:text-gray-400">
                            <div className="flex items-center space-x-reverse space-x-1">
                              <User className="h-3 w-3 flex-shrink-0" />
                              <span>{patient.age} {language === 'ar' ? 'سنة' : 'years'}</span>
                            </div>
                            <div className="flex items-center space-x-reverse space-x-1">
                              <Activity className="h-3 w-3 flex-shrink-0" />
                              <span>{patient.visits} {language === 'ar' ? 'زيارة' : 'visits'}</span>
                            </div>
                            <div className="flex items-center space-x-reverse space-x-1 col-span-2 sm:col-span-1">
                              <Calendar className="h-3 w-3 flex-shrink-0" />
                              <span className="truncate">{language === 'ar' ? 'آخر:' : 'Last:'} {patient.lastVisit}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-reverse space-x-1 mt-1.5">
                            <Heart className="h-3 w-3 text-red-500 dark:text-red-400 flex-shrink-0" />
                            <span className="text-xs truncate dark:text-gray-300">{patient.condition}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-reverse space-x-2 gap-2">
                        <Button variant="outline" size="sm" className="flex-1 sm:flex-none text-xs h-8">
                          <Phone className="h-3 w-3 sm:ml-1.5" />
                          <span className="hidden sm:inline">{language === 'ar' ? 'اتصال' : 'Call'}</span>
                        </Button>
                        <Button size="sm" className="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-xs h-8">
                          <FolderOpen className="h-3 w-3 sm:ml-1.5" />
                          <span>{language === 'ar' ? 'عرض الملف' : 'View File'}</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}