import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Plus, Trash2, Printer, Save, User, Calendar, Clock, FileText } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useApp } from "../contexts/AppContext";

interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

interface PrescriptionFormProps {
  onNavigate?: (state: string) => void;
  onBack?: () => void;
}

export function PrescriptionForm({ onNavigate, onBack }: PrescriptionFormProps) {
  const { t, dir, language } = useApp();
  const [medications, setMedications] = useState<Medication[]>([
    { id: 1, name: "", dosage: "", frequency: "", duration: "", instructions: "" }
  ]);
  
  const [patientInfo] = useState({
    name: t('default.patient.name'),
    age: language === 'ar' ? '34 سنة' : '34 years',
    date: language === 'ar' ? '15 يناير 2024' : 'January 15, 2024',
    time: '14:30'
  });

  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");

  const addMedication = () => {
    const newId = Math.max(...medications.map(m => m.id)) + 1;
    setMedications([...medications, {
      id: newId,
      name: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: ""
    }]);
  };

  const removeMedication = (id: number) => {
    setMedications(medications.filter(m => m.id !== id));
  };

  const updateMedication = (id: number, field: keyof Medication, value: string) => {
    setMedications(medications.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    ));
  };

  const handleSave = () => {
    toast.success(t('prescription.save') + ' ' + (language === 'ar' ? 'بنجاح' : 'successfully'));
  };

  const handlePrint = () => {
    window.print();
    toast.success(language === 'ar' ? 'تم إرسال الروشتة للطباعة' : 'Prescription sent to print');
  };

  const commonMedications = language === 'ar' ? [
    "باراسيتامول 500 مجم",
    "إيبوبروفين 400 مجم",
    "أموكسيسيلين 500 مجم",
    "أسبرين 100 مجم",
    "أوميبرازول 20 مجم"
  ] : [
    "Paracetamol 500mg",
    "Ibuprofen 400mg",
    "Amoxicillin 500mg",
    "Aspirin 100mg",
    "Omeprazole 20mg"
  ];

  const commonDiagnoses = language === 'ar' ? [
    "التهاب الحلق",
    "نزلة برد",
    "ارتفاع ضغط الدم",
    "التهاب المعدة",
    "صداع نصفي"
  ] : [
    "Pharyngitis",
    "Common cold",
    "Hypertension",
    "Gastritis",
    "Migraine"
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen" dir={dir}>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Card className="border-t-4 border-t-emerald-500 shadow-md dark:bg-gray-800">
          <CardHeader className="pb-4 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950 dark:to-blue-950">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl flex items-center space-x-reverse space-x-2">
                  <FileText className="h-6 w-6 text-emerald-600" />
                  <span>{t('prescription.title')}</span>
                </CardTitle>
                <p className="text-muted-foreground mt-1">{t('default.doctor.name')} - {t('specialty.cardiology')}</p>
              </div>
              <div className={dir === 'rtl' ? 'text-left' : 'text-right'}>
                <Badge variant="outline" className="mb-2 border-emerald-500 text-emerald-700 dark:border-emerald-400 dark:text-emerald-400">
                  {patientInfo.date}
                </Badge>
                <p className="text-sm text-muted-foreground">{patientInfo.time}</p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Patient Information */}
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <h3 className="font-medium mb-2 flex items-center">
                <User className={`h-4 w-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                {language === 'ar' ? 'معلومات المريض' : 'Patient Information'}
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">{language === 'ar' ? 'الاسم: ' : 'Name: '}</span>
                  <span>{patientInfo.name}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">{language === 'ar' ? 'العمر: ' : 'Age: '}</span>
                  <span>{patientInfo.age}</span>
                </div>
              </div>
            </div>

            {/* Diagnosis */}
            <div className="space-y-2">
              <Label htmlFor="diagnosis" className="flex items-center">
                <FileText className={`h-4 w-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                {t('prescription.diagnosis')}
              </Label>
              <Input
                id="diagnosis"
                placeholder={language === 'ar' ? 'ابدأ بكتابة التشخيص...' : 'Start typing diagnosis...'}
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                list="diagnoses"
              />
              <datalist id="diagnoses">
                {commonDiagnoses.map((d, index) => (
                  <option key={index} value={d} />
                ))}
              </datalist>
            </div>

            <Separator />

            {/* Medications */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{language === 'ar' ? 'الأدوية الموصوفة' : 'Prescribed Medications'}</h3>
                <Button onClick={addMedication} size="sm">
                  <Plus className={`h-4 w-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                  {t('prescription.add.medication')}
                </Button>
              </div>

              {medications.map((med, index) => (
                <Card key={med.id} className="p-4 dark:bg-gray-900">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{language === 'ar' ? `الدواء ${index + 1}` : `Medication ${index + 1}`}</span>
                      {medications.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeMedication(med.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>{t('prescription.medication.name')}</Label>
                        <Input
                          placeholder={language === 'ar' ? 'ابحث عن الدواء...' : 'Search for medication...'}
                          value={med.name}
                          onChange={(e) => updateMedication(med.id, 'name', e.target.value)}
                          list="medications"
                        />
                        <datalist id="medications">
                          {commonMedications.map((medication, idx) => (
                            <option key={idx} value={medication} />
                          ))}
                        </datalist>
                      </div>

                      <div className="space-y-2">
                        <Label>{t('prescription.dosage')}</Label>
                        <Input
                          placeholder={language === 'ar' ? 'مثال: قرص واحد' : 'e.g., 1 tablet'}
                          value={med.dosage}
                          onChange={(e) => updateMedication(med.id, 'dosage', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>{t('prescription.frequency')}</Label>
                        <Select onValueChange={(value) => updateMedication(med.id, 'frequency', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder={language === 'ar' ? 'اختر عدد المرات' : 'Select frequency'} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={language === 'ar' ? 'مرة واحدة يومياً' : 'Once daily'}>{language === 'ar' ? 'مرة واحدة يومياً' : 'Once daily'}</SelectItem>
                            <SelectItem value={language === 'ar' ? 'مرتان يومياً' : 'Twice daily'}>{language === 'ar' ? 'مرتان يومياً' : 'Twice daily'}</SelectItem>
                            <SelectItem value={language === 'ar' ? 'ثلاث مرات يومياً' : 'Three times daily'}>{language === 'ar' ? 'ثلاث مرات يومياً' : 'Three times daily'}</SelectItem>
                            <SelectItem value={language === 'ar' ? 'أربع مرات يومياً' : 'Four times daily'}>{language === 'ar' ? 'أربع مرات يومياً' : 'Four times daily'}</SelectItem>
                            <SelectItem value={language === 'ar' ? 'عند الحاجة' : 'As needed'}>{language === 'ar' ? 'عند الحاجة' : 'As needed'}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>{t('prescription.duration')}</Label>
                        <Select onValueChange={(value) => updateMedication(med.id, 'duration', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder={language === 'ar' ? 'اختر المدة' : 'Select duration'} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={language === 'ar' ? '3 أيام' : '3 days'}>{language === 'ar' ? '3 أيام' : '3 days'}</SelectItem>
                            <SelectItem value={language === 'ar' ? '5 أيام' : '5 days'}>{language === 'ar' ? '5 أيام' : '5 days'}</SelectItem>
                            <SelectItem value={language === 'ar' ? '7 أيام' : '7 days'}>{language === 'ar' ? '7 أيام' : '7 days'}</SelectItem>
                            <SelectItem value={language === 'ar' ? '10 أيام' : '10 days'}>{language === 'ar' ? '10 أيام' : '10 days'}</SelectItem>
                            <SelectItem value={language === 'ar' ? '14 يوم' : '14 days'}>{language === 'ar' ? '14 يوم' : '14 days'}</SelectItem>
                            <SelectItem value={language === 'ar' ? 'شهر واحد' : '1 month'}>{language === 'ar' ? 'شهر واحد' : '1 month'}</SelectItem>
                            <SelectItem value={language === 'ar' ? 'حسب الحاجة' : 'As needed'}>{language === 'ar' ? 'حسب الحاجة' : 'As needed'}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>{language === 'ar' ? 'تعليمات إضافية' : 'Additional Instructions'}</Label>
                      <Textarea
                        placeholder={language === 'ar' ? 'تعليمات خاصة للمريض...' : 'Special instructions for patient...'}
                        value={med.instructions}
                        onChange={(e) => updateMedication(med.id, 'instructions', e.target.value)}
                        rows={2}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Separator />

            {/* Additional Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">{t('prescription.notes')}</Label>
              <Textarea
                id="notes"
                placeholder={language === 'ar' ? 'ملاحظات أو تعليمات عامة للمريض...' : 'Notes or general instructions for patient...'}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6 border-t dark:border-gray-700">
              <div className="flex space-x-reverse space-x-2">
                <Button onClick={handleSave}>
                  <Save className={`h-4 w-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                  {t('prescription.save')}
                </Button>
                <Button variant="outline" onClick={handlePrint}>
                  <Printer className={`h-4 w-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                  {t('prescription.print')}
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <div className="flex items-center space-x-reverse space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{patientInfo.date}</span>
                  <Clock className="h-4 w-4" />
                  <span>{patientInfo.time}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}