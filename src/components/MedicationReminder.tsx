import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Progress } from "./ui/progress";
import { 
  Bell, 
  Clock, 
  Pill, 
  Plus, 
  Settings, 
  Check, 
  X,
  Calendar,
  Trash2
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useApp } from "../contexts/AppContext";

interface MedicationSchedule {
  id: number;
  medicationName: string;
  dosage: string;
  times: string[];
  isActive: boolean;
  nextDose: Date;
  takenToday: string[];
}

interface Reminder {
  id: number;
  type: 'medication' | 'appointment';
  title: string;
  message: string;
  time: Date;
  isRead: boolean;
}

interface MedicationReminderProps {
  onNavigate?: (state: string) => void;
  onBack?: () => void;
}

export function MedicationReminder({ onNavigate, onBack }: MedicationReminderProps) {
  const { t, dir, language } = useApp();
  
  const [schedules, setSchedules] = useState<MedicationSchedule[]>([
    {
      id: 1,
      medicationName: language === 'ar' ? 'أسبرين 100 مجم' : 'Aspirin 100mg',
      dosage: language === 'ar' ? 'قرص واحد' : '1 tablet',
      times: ["08:00", "20:00"],
      isActive: true,
      nextDose: new Date("2024-01-15T20:00:00"),
      takenToday: ["08:00"]
    },
    {
      id: 2,
      medicationName: language === 'ar' ? 'ليزينوبريل 10 مجم' : 'Lisinopril 10mg',
      dosage: language === 'ar' ? 'قرص واحد' : '1 tablet',
      times: ["08:00"],
      isActive: true,
      nextDose: new Date("2024-01-16T08:00:00"),
      takenToday: []
    }
  ]);

  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: 1,
      type: 'medication',
      title: language === 'ar' ? 'وقت تناول الدواء' : 'Medication Time',
      message: language === 'ar' ? 'حان وقت تناول أسبرين 100 مجم' : 'Time to take Aspirin 100mg',
      time: new Date(),
      isRead: false
    },
    {
      id: 2,
      type: 'appointment',
      title: language === 'ar' ? 'موعد طبي غداً' : 'Medical Appointment Tomorrow',
      message: language === 'ar' ? `لديك موعد مع ${t('default.doctor.name')} غداً في 2:00 م` : `You have an appointment with ${t('default.doctor.name')} tomorrow at 2:00 PM`,
      time: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: false
    }
  ]);

  const [newMedication, setNewMedication] = useState({
    name: "",
    dosage: "",
    frequency: "1",
    times: ["08:00"]
  });

  const [isAddingMedication, setIsAddingMedication] = useState(false);

  useEffect(() => {
    // Check for medication reminders every minute
    const interval = setInterval(() => {
      const now = new Date();
      schedules.forEach(schedule => {
        if (schedule.isActive && schedule.nextDose <= now) {
          showMedicationNotification(schedule);
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [schedules]);

  const showMedicationNotification = (schedule: MedicationSchedule) => {
    toast(`حان وقت تناول ${schedule.medicationName}`, {
      description: `الجرعة: ${schedule.dosage}`,
      action: {
        label: "تم التناول",
        onClick: () => markAsTaken(schedule.id, schedule.nextDose)
      }
    });
  };

  const markAsTaken = (scheduleId: number, time: Date) => {
    const timeString = time.toTimeString().slice(0, 5);
    setSchedules(prev => prev.map(schedule => 
      schedule.id === scheduleId 
        ? { 
            ...schedule, 
            takenToday: [...schedule.takenToday, timeString],
            nextDose: getNextDoseTime(schedule)
          }
        : schedule
    ));
    toast.success("تم تسجيل تناول الدواء");
  };

  const getNextDoseTime = (schedule: MedicationSchedule): Date => {
    const now = new Date();
    const today = now.toDateString();
    
    for (const time of schedule.times) {
      const [hours, minutes] = time.split(':').map(Number);
      const doseTime = new Date(today);
      doseTime.setHours(hours, minutes, 0, 0);
      
      if (doseTime > now && !schedule.takenToday.includes(time)) {
        return doseTime;
      }
    }
    
    // Next dose is tomorrow
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const [hours, minutes] = schedule.times[0].split(':').map(Number);
    tomorrow.setHours(hours, minutes, 0, 0);
    return tomorrow;
  };

  const toggleSchedule = (id: number) => {
    setSchedules(prev => prev.map(schedule => 
      schedule.id === id ? { ...schedule, isActive: !schedule.isActive } : schedule
    ));
  };

  const addMedication = () => {
    const newSchedule: MedicationSchedule = {
      id: Math.max(...schedules.map(s => s.id)) + 1,
      medicationName: newMedication.name,
      dosage: newMedication.dosage,
      times: newMedication.times,
      isActive: true,
      nextDose: getNextDoseTime({
        id: 0,
        medicationName: newMedication.name,
        dosage: newMedication.dosage,
        times: newMedication.times,
        isActive: true,
        nextDose: new Date(),
        takenToday: []
      }),
      takenToday: []
    };
    
    setSchedules(prev => [...prev, newSchedule]);
    setNewMedication({ name: "", dosage: "", frequency: "1", times: ["08:00"] });
    setIsAddingMedication(false);
    toast.success("تم إضافة الدواء بنجاح");
  };

  const deleteSchedule = (id: number) => {
    setSchedules(prev => prev.filter(schedule => schedule.id !== id));
    toast.success("تم حذف الدواء");
  };

  const markReminderAsRead = (id: number) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === id ? { ...reminder, isRead: true } : reminder
    ));
  };

  const unreadCount = reminders.filter(r => !r.isRead).length;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen" dir={dir}>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Notifications Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-reverse space-x-2">
            <Bell className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">{language === 'ar' ? 'التذكيرات والإشعارات' : 'Reminders & Notifications'}</h2>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="rounded-full">
                {unreadCount}
              </Badge>
            )}
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Settings className={`h-4 w-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                {language === 'ar' ? 'إعدادات الإشعارات' : 'Notification Settings'}
              </Button>
            </DialogTrigger>
            <DialogContent dir={dir}>
              <DialogHeader>
                <DialogTitle>{language === 'ar' ? 'إعدادات الإشعارات' : 'Notification Settings'}</DialogTitle>
                <DialogDescription>
                  {language === 'ar' ? 'اختر نوع الإشعارات التي تريد استقبالها' : 'Choose the type of notifications you want to receive'}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>{language === 'ar' ? 'إشعارات الأدوية' : 'Medication Notifications'}</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>{language === 'ar' ? 'إشعارات المواعيد' : 'Appointment Notifications'}</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>{language === 'ar' ? 'الإشعارات الصوتية' : 'Sound Notifications'}</Label>
                  <Switch />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Recent Notifications */}
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-reverse space-x-2">
              <Bell className="h-5 w-5" />
              <span>{language === 'ar' ? 'الإشعارات الحديثة' : 'Recent Notifications'}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reminders.map((reminder) => (
                <div 
                  key={reminder.id}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    reminder.isRead ? 'bg-gray-50 dark:bg-gray-900' : 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800'
                  }`}
                >
                  <div className="flex items-center space-x-reverse space-x-3">
                    <div className={`p-2 rounded-full ${
                      reminder.type === 'medication' ? 'bg-green-100 dark:bg-green-950' : 'bg-blue-100 dark:bg-blue-950'
                    }`}>
                      {reminder.type === 'medication' ? (
                        <Pill className="h-4 w-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{reminder.title}</h4>
                      <p className="text-sm text-muted-foreground">{reminder.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {reminder.time.toLocaleString(language === 'ar' ? 'ar-EG' : 'en-US')}
                      </p>
                    </div>
                  </div>
                  
                  {!reminder.isRead && (
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => markReminderAsRead(reminder.id)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Medication Schedules */}
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-reverse space-x-2">
                <Pill className="h-5 w-5" />
                <span>{t('medication.schedule')}</span>
              </CardTitle>
              
              <Dialog open={isAddingMedication} onOpenChange={setIsAddingMedication}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className={`h-4 w-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                    {t('medication.add.new')}
                  </Button>
                </DialogTrigger>
                <DialogContent dir={dir}>
                  <DialogHeader>
                    <DialogTitle>{t('medication.add.new')}</DialogTitle>
                    <DialogDescription>
                      {language === 'ar' ? 'أضف دواء جديد لجدول التذكيرات' : 'Add a new medication to reminder schedule'}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>{t('medication.name')}</Label>
                      <Input
                        placeholder={language === 'ar' ? 'مثال: أسبرين 100 مجم' : 'e.g., Aspirin 100mg'}
                        value={newMedication.name}
                        onChange={(e) => setNewMedication(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>{t('medication.dose')}</Label>
                      <Input
                        placeholder={language === 'ar' ? 'مثال: قرص واحد' : 'e.g., 1 tablet'}
                        value={newMedication.dosage}
                        onChange={(e) => setNewMedication(prev => ({ ...prev, dosage: e.target.value }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>{language === 'ar' ? 'عدد المرات يومياً' : 'Times per Day'}</Label>
                      <Select 
                        value={newMedication.frequency}
                        onValueChange={(value) => {
                          const count = parseInt(value);
                          const times = [];
                          for (let i = 0; i < count; i++) {
                            times.push(`${8 + (i * (12 / count))}:00`.padStart(5, '0'));
                          }
                          setNewMedication(prev => ({ ...prev, frequency: value, times }));
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">{language === 'ar' ? 'مرة واحدة' : 'Once daily'}</SelectItem>
                          <SelectItem value="2">{language === 'ar' ? 'مرتان' : 'Twice daily'}</SelectItem>
                          <SelectItem value="3">{language === 'ar' ? 'ثلاث مرات' : 'Three times'}</SelectItem>
                          <SelectItem value="4">{language === 'ar' ? 'أربع مرات' : 'Four times'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>{language === 'ar' ? 'المواعيد' : 'Times'}</Label>
                      <div className="space-y-2">
                        {newMedication.times.map((time, index) => (
                          <Input
                            key={index}
                            type="time"
                            value={time}
                            onChange={(e) => {
                              const newTimes = [...newMedication.times];
                              newTimes[index] = e.target.value;
                              setNewMedication(prev => ({ ...prev, times: newTimes }));
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full" 
                      onClick={addMedication}
                      disabled={!newMedication.name || !newMedication.dosage}
                    >
                      {t('medication.add.new')}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              {schedules.map((schedule) => (
                <div 
                  key={schedule.id}
                  className="flex items-center justify-between p-4 border dark:border-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-reverse space-x-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-950 rounded-full">
                      <Pill className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    
                    <div>
                      <h4 className="font-medium">{schedule.medicationName}</h4>
                      <p className="text-sm text-muted-foreground">{schedule.dosage}</p>
                      <div className="flex items-center space-x-reverse space-x-2 mt-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {schedule.times.join(', ')}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-reverse space-x-2 mt-1">
                        <span className="text-sm text-muted-foreground">
                          {language === 'ar' ? 'تم التناول اليوم:' : 'Taken today:'}
                        </span>
                        <div className="flex space-x-reverse space-x-1">
                          {schedule.times.map((time) => (
                            <Badge 
                              key={time}
                              variant={schedule.takenToday.includes(time) ? "default" : "outline"}
                              className="text-xs"
                            >
                              {schedule.takenToday.includes(time) ? (
                                <Check className={`h-3 w-3 ${dir === 'rtl' ? 'ml-1' : 'mr-1'}`} />
                              ) : (
                                <X className={`h-3 w-3 ${dir === 'rtl' ? 'ml-1' : 'mr-1'}`} />
                              )}
                              {time}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-reverse space-x-2">
                    <Switch 
                      checked={schedule.isActive}
                      onCheckedChange={() => toggleSchedule(schedule.id)}
                    />
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => deleteSchedule(schedule.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}