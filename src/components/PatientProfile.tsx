import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  MapPin, 
  Heart,
  AlertCircle,
  Edit,
  Save,
  X
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useApp } from "../contexts/AppContext";

interface PatientProfileProps {
  onNavigate?: (state: string) => void;
  onBack?: () => void;
}

export function PatientProfile({ onNavigate, onBack }: PatientProfileProps) {
  const { t, dir, language } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: t('default.patient.name'),
    phone: "01234567890",
    email: "osama.reda@example.com",
    birthDate: "1990-01-15",
    gender: "male",
    address: language === 'ar' ? 'مدينة العاشر من رمضان، الشرقية' : '10th of Ramadan City, Sharqia',
    bloodType: "O+",
    height: "175",
    weight: "75",
    emergencyContact: "01987654321",
    emergencyContactName: language === 'ar' ? 'أحمد رضا' : 'Ahmed Reda'
  });

  const [medicalHistory] = useState([
    {
      condition: language === 'ar' ? 'ارتفاع ضغط الدم' : 'Hypertension',
      diagnosedDate: "2022-03-15",
      status: language === 'ar' ? 'مزمن' : 'Chronic',
      medication: language === 'ar' ? 'ليزينوبريل 10 مجم' : 'Lisinopril 10mg'
    },
    {
      condition: language === 'ar' ? 'مرض السكري النوع الثاني' : 'Type 2 Diabetes',
      diagnosedDate: "2021-11-20",
      status: language === 'ar' ? 'مزمن' : 'Chronic',
      medication: language === 'ar' ? 'ميتفورمين 500 مجم' : 'Metformin 500mg'
    }
  ]);

  const [allergies] = useState([
    language === 'ar' ? 'البنسلين' : 'Penicillin',
    language === 'ar' ? 'الأسبرين' : 'Aspirin',
    language === 'ar' ? 'المكسرات' : 'Nuts'
  ]);

  const handleSave = () => {
    // Save profile data
    setIsEditing(false);
    toast.success(language === 'ar' ? 'تم تحديث البيانات بنجاح' : 'Profile updated successfully');
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const updateField = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen" dir={dir}>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('profile.title')}</h1>
          <p className="text-muted-foreground">{language === 'ar' ? 'إدارة وتحديث معلوماتك الشخصية والطبية' : 'Manage and update your personal and medical information'}</p>
        </div>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">{language === 'ar' ? 'المعلومات الشخصية' : 'Personal Information'}</TabsTrigger>
            <TabsTrigger value="medical">{language === 'ar' ? 'التاريخ الطبي' : 'Medical History'}</TabsTrigger>
            <TabsTrigger value="emergency">{language === 'ar' ? 'الطوارئ' : 'Emergency'}</TabsTrigger>
          </TabsList>

          {/* Personal Information */}
          <TabsContent value="personal" className="space-y-6">
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-reverse space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="text-xl">
                        {profileData.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-xl">{profileData.name}</CardTitle>
                      <CardDescription>{language === 'ar' ? 'مريض منذ 2023' : 'Patient since 2023'}</CardDescription>
                    </div>
                  </div>
                  
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)}>
                      <Edit className={`h-4 w-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                      {language === 'ar' ? 'تعديل البيانات' : 'Edit Data'}
                    </Button>
                  ) : (
                    <div className="flex space-x-reverse space-x-2">
                      <Button onClick={handleSave}>
                        <Save className={`h-4 w-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                        {language === 'ar' ? 'حفظ' : 'Save'}
                      </Button>
                      <Button variant="outline" onClick={handleCancel}>
                        <X className={`h-4 w-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                        {language === 'ar' ? 'إلغاء' : 'Cancel'}
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">{language === 'ar' ? 'الاسم الكامل' : 'Full Name'}</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                      />
                    ) : (
                      <div className="flex items-center space-x-reverse space-x-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{profileData.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">{language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                      />
                    ) : (
                      <div className="flex items-center space-x-reverse space-x-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{profileData.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                      />
                    ) : (
                      <div className="flex items-center space-x-reverse space-x-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{profileData.email}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthDate">{language === 'ar' ? 'تاريخ الميلاد' : 'Birth Date'}</Label>
                    {isEditing ? (
                      <Input
                        id="birthDate"
                        type="date"
                        value={profileData.birthDate}
                        onChange={(e) => updateField('birthDate', e.target.value)}
                      />
                    ) : (
                      <div className="flex items-center space-x-reverse space-x-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(profileData.birthDate).toLocaleDateString('ar-EG')}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>{language === 'ar' ? 'النوع' : 'Gender'}</Label>
                    {isEditing ? (
                      <Select value={profileData.gender} onValueChange={(value) => updateField('gender', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">{language === 'ar' ? 'ذكر' : 'Male'}</SelectItem>
                          <SelectItem value="female">{language === 'ar' ? 'أنثى' : 'Female'}</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <span>{profileData.gender === 'male' ? 'ذكر' : 'أنثى'}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bloodType">{language === 'ar' ? 'فصيلة الدم' : 'Blood Type'}</Label>
                    {isEditing ? (
                      <Select value={profileData.bloodType} onValueChange={(value) => updateField('bloodType', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <span>{profileData.bloodType}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="height">{language === 'ar' ? 'الطول (سم)' : 'Height (cm)'}</Label>
                    {isEditing ? (
                      <Input
                        id="height"
                        value={profileData.height}
                        onChange={(e) => updateField('height', e.target.value)}
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <span>{profileData.height} سم</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight">{language === 'ar' ? 'الوزن (كجم)' : 'Weight (kg)'}</Label>
                    {isEditing ? (
                      <Input
                        id="weight"
                        value={profileData.weight}
                        onChange={(e) => updateField('weight', e.target.value)}
                      />
                    ) : (
                      <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <span>{profileData.weight} كجم</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>{language === 'ar' ? 'مؤشر كتلة الجسم' : 'BMI'}</Label>
                    <div className="p-2 bg-blue-50 rounded">
                      <span className="font-medium text-blue-800">
                        {(parseInt(profileData.weight) / Math.pow(parseInt(profileData.height) / 100, 2)).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">{language === 'ar' ? 'العنوان' : 'Address'}</Label>
                  {isEditing ? (
                    <Textarea
                      id="address"
                      value={profileData.address}
                      onChange={(e) => updateField('address', e.target.value)}
                      rows={2}
                    />
                  ) : (
                    <div className="flex items-center space-x-reverse space-x-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{profileData.address}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Medical History */}
          <TabsContent value="medical" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-reverse space-x-2">
                  <Heart className="h-5 w-5" />
                  <span>{language === 'ar' ? 'الأمراض المزمنة' : 'Chronic Conditions'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {medicalHistory.map((condition, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{condition.condition}</h4>
                        <p className="text-sm text-muted-foreground">
                          {language === 'ar' ? 'تم التشخيص:' : 'Diagnosed:'} {new Date(condition.diagnosedDate).toLocaleDateString('ar-EG')}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {language === 'ar' ? 'العلاج:' : 'Medication:'} {condition.medication}
                        </p>
                      </div>
                      <Badge variant={condition.status === 'مزمن' ? 'destructive' : 'secondary'}>
                        {condition.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-reverse space-x-2">
                  <AlertCircle className="h-5 w-5" />
                  <span>{language === 'ar' ? 'الحساسية' : 'Allergies'}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {allergies.map((allergy, index) => (
                    <Badge key={index} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      {allergy}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Emergency Contact */}
          <TabsContent value="emergency" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-reverse space-x-2">
                  <Phone className="h-5 w-5" />
                  <span>{language === 'ar' ? 'جهة الاتصال في الطوارئ' : 'Emergency Contact'}</span>
                </CardTitle>
                <CardDescription>
                  {language === 'ar' ? 'معلومات الاتصال بشخص مقرب في حالات الطوارئ' : 'Contact information for a close relative in case of emergencies'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyName">{language === 'ar' ? 'اسم جهة الاتصال' : 'Contact Name'}</Label>
                    {isEditing ? (
                      <Input
                        id="emergencyName"
                        value={profileData.emergencyContactName}
                        onChange={(e) => updateField('emergencyContactName', e.target.value)}
                      />
                    ) : (
                      <div className="flex items-center space-x-reverse space-x-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{profileData.emergencyContactName}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone">{language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</Label>
                    {isEditing ? (
                      <Input
                        id="emergencyPhone"
                        value={profileData.emergencyContact}
                        onChange={(e) => updateField('emergencyContact', e.target.value)}
                      />
                    ) : (
                      <div className="flex items-center space-x-reverse space-x-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{profileData.emergencyContact}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}