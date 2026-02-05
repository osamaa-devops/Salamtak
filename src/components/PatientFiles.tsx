import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Input } from "./ui/input";
import { 
  FolderOpen, 
  User,
  Phone,
  Calendar,
  Activity,
  Heart,
  Search,
  Filter,
  FileText,
  Clock,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useApp } from "../contexts/AppContext";

interface PatientFilesProps {
  onNavigate?: (state: string) => void;
  onBack?: () => void;
}

export function PatientFiles({ onNavigate, onBack }: PatientFilesProps) {
  const { language, dir } = useApp();
  const [searchQuery, setSearchQuery] = useState("");

  // ملفات المرضى
  const patientFiles = [
    {
      id: 1,
      patientName: language === 'ar' ? "اسامه رضا رافت" : "Osama Reda Rafat",
      age: 34,
      lastVisit: "2024-01-10",
      condition: language === 'ar' ? "ارتفاع ضغط الدم" : "Hypertension",
      visits: 12,
      phone: "01234567890",
      status: "stable",
      nextAppointment: "2024-01-25"
    },
    {
      id: 2,
      patientName: language === 'ar' ? "فاطمة أحمد محمد" : "Fatima Ahmed Mohamed",
      age: 28,
      lastVisit: "2024-01-12",
      condition: language === 'ar' ? "السكري النوع الثاني" : "Type 2 Diabetes",
      visits: 8,
      phone: "01234567891",
      status: "monitoring",
      nextAppointment: "2024-01-22"
    },
    {
      id: 3,
      patientName: language === 'ar' ? "محمد علي حسن" : "Mohamed Ali Hassan",
      age: 45,
      lastVisit: "2024-01-13",
      condition: language === 'ar' ? "أمراض القلب" : "Heart Disease",
      visits: 15,
      phone: "01234567892",
      status: "critical",
      nextAppointment: "2024-01-18"
    },
    {
      id: 4,
      patientName: language === 'ar' ? "سارة محمود عبدالله" : "Sara Mahmoud Abdullah",
      age: 32,
      lastVisit: "2024-01-14",
      condition: language === 'ar' ? "فحص دوري" : "Periodic Check",
      visits: 5,
      phone: "01234567893",
      status: "healthy",
      nextAppointment: "2024-02-14"
    },
    {
      id: 5,
      patientName: language === 'ar' ? "عمر حسن إبراهيم" : "Omar Hassan Ibrahim",
      age: 52,
      lastVisit: "2024-01-14",
      condition: language === 'ar' ? "آلام المفاصل" : "Joint Pain",
      visits: 20,
      phone: "01234567894",
      status: "stable",
      nextAppointment: "2024-01-28"
    }
  ];

  const filteredPatients = patientFiles.filter(patient =>
    patient.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "healthy":
        return { 
          label: language === 'ar' ? "صحي" : "Healthy", 
          color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200", 
          dotColor: "bg-emerald-500" 
        };
      case "stable":
        return { 
          label: language === 'ar' ? "مستقر" : "Stable", 
          color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200", 
          dotColor: "bg-blue-500" 
        };
      case "monitoring":
        return { 
          label: language === 'ar' ? "تحت المراقبة" : "Monitoring", 
          color: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200", 
          dotColor: "bg-amber-500" 
        };
      case "critical":
        return { 
          label: language === 'ar' ? "حرج" : "Critical", 
          color: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200", 
          dotColor: "bg-red-500" 
        };
      default:
        return { 
          label: language === 'ar' ? "غير محدد" : "Unknown", 
          color: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300", 
          dotColor: "bg-gray-500" 
        };
    }
  };

  const handleViewFile = (patient: any) => {
    toast.success(language === 'ar' ? `فتح ملف ${patient.patientName}` : `Opening ${patient.patientName}'s file`);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-950/30 min-h-screen" dir={dir}>
      <div className="max-w-7xl mx-auto p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
        {/* Header Card */}
        <Card className="border-t-4 border-t-violet-500 shadow-lg bg-gradient-to-r from-white to-violet-50/50 dark:from-gray-800 dark:to-violet-950/50">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl sm:text-2xl lg:text-3xl flex items-center space-x-reverse space-x-2 sm:space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-violet-500 to-blue-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                    <FolderOpen className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <span>{language === 'ar' ? 'ملفات المرضى' : 'Patient Files'}</span>
                </CardTitle>
                <CardDescription className="mt-1.5 sm:mt-2 text-xs sm:text-sm">
                  {language === 'ar' ? 'إدارة ومتابعة جميع ملفات المرضى والتاريخ الطبي' : 'Manage and track all patient files and medical history'}
                </CardDescription>
              </div>
              <div className="hidden sm:block">
                <div className={`${dir === 'rtl' ? 'text-left' : 'text-right'} space-y-0.5 sm:space-y-1`}>
                  <div className="text-2xl sm:text-3xl font-bold text-violet-600 dark:text-violet-400">{patientFiles.length}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{language === 'ar' ? 'إجمالي المرضى' : 'Total Patients'}</div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card className="hover:shadow-md transition-all duration-200 border-r-4 border-r-emerald-500 dark:border-r-emerald-400">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {patientFiles.filter(p => p.status === "healthy").length}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{language === 'ar' ? 'مرضى أصحاء' : 'Healthy Patients'}</div>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-all duration-200 border-r-4 border-r-blue-500 dark:border-r-blue-400">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {patientFiles.filter(p => p.status === "stable").length}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{language === 'ar' ? 'حالات مستقرة' : 'Stable Cases'}</div>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-all duration-200 border-r-4 border-r-amber-500 dark:border-r-amber-400">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-amber-600 dark:text-amber-400">
                    {patientFiles.filter(p => p.status === "monitoring").length}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{language === 'ar' ? 'تحت المراقبة' : 'Under Monitoring'}</div>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 dark:bg-amber-900 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-all duration-200 border-r-4 border-r-red-500 dark:border-r-red-400">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-red-600 dark:text-red-400">
                    {patientFiles.filter(p => p.status === "critical").length}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{language === 'ar' ? 'حالات حرجة' : 'Critical Cases'}</div>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 dark:bg-red-900 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <div className="flex-1 relative">
                <Search className={`absolute ${dir === 'rtl' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground`} />
                <Input
                  placeholder={language === 'ar' ? "ابحث عن مريض بالاسم أو الحالة..." : "Search for patient by name or condition..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={dir === 'rtl' ? 'pr-10' : 'pl-10'}
                />
              </div>
              <Button variant="outline" className="sm:w-auto">
                <Filter className={`h-4 w-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                {language === 'ar' ? 'تصفية' : 'Filter'}
              </Button>
              <Button className="sm:w-auto bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700">
                <User className={`h-4 w-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                {language === 'ar' ? 'إضافة مريض جديد' : 'Add New Patient'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Patients List */}
        <div className="grid gap-4">
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => {
              const statusInfo = getStatusInfo(patient.status);
              return (
                <Card 
                  key={patient.id} 
                  className="hover:shadow-xl transition-all duration-300 hover:scale-[1.01] border-r-4 border-r-transparent hover:border-r-violet-500 cursor-pointer group"
                  onClick={() => handleViewFile(patient)}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Patient Info */}
                      <div className="flex items-center space-x-reverse space-x-4">
                        <div className="relative">
                          <Avatar className="w-16 h-16 ring-4 ring-white shadow-lg">
                            <AvatarFallback className="bg-gradient-to-br from-violet-500 to-blue-500 text-white text-lg">
                              {patient.patientName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${statusInfo.dotColor} rounded-full border-2 border-white`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-reverse space-x-2 mb-1">
                            <h3 className="font-bold text-lg group-hover:text-violet-600 transition-colors">
                              {patient.patientName}
                            </h3>
                            <Badge className={statusInfo.color}>
                              {statusInfo.label}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-muted-foreground dark:text-gray-400">
                            <div className="flex items-center space-x-reverse space-x-1">
                              <User className="h-4 w-4" />
                              <span>{patient.age} {language === 'ar' ? 'سنة' : 'years'}</span>
                            </div>
                            <div className="flex items-center space-x-reverse space-x-1">
                              <Activity className="h-4 w-4" />
                              <span>{patient.visits} {language === 'ar' ? 'زيارة' : 'visits'}</span>
                            </div>
                            <div className="flex items-center space-x-reverse space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{language === 'ar' ? 'آخر زيارة:' : 'Last visit:'} {patient.lastVisit}</span>
                            </div>
                            <div className="flex items-center space-x-reverse space-x-1">
                              <Phone className="h-4 w-4" />
                              <span>{patient.phone}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-reverse space-x-2 mt-2">
                            <Heart className="h-4 w-4 text-red-500 dark:text-red-400" />
                            <span className="text-sm font-medium dark:text-gray-300">{patient.condition}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex lg:flex-col items-center gap-2">
                        <div className="hidden lg:block text-center mb-2">
                          <div className="text-xs text-muted-foreground mb-1">{language === 'ar' ? 'الموعد القادم' : 'Next Appointment'}</div>
                          <Badge variant="outline" className="text-xs">
                            <Clock className={`h-3 w-3 ${dir === 'rtl' ? 'ml-1' : 'mr-1'}`} />
                            {patient.nextAppointment}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Phone className={`h-4 w-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                            {language === 'ar' ? 'اتصال' : 'Call'}
                          </Button>
                          <Button size="sm" className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700">
                            <FileText className={`h-4 w-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                            {language === 'ar' ? 'عرض الملف' : 'View File'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <FolderOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{language === 'ar' ? 'لا توجد نتائج' : 'No Results'}</h3>
                <p className="text-muted-foreground">
                  {language === 'ar' ? 'لم يتم العثور على مرضى بهذا الاسم أو الحالة' : 'No patients found with this name or condition'}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}