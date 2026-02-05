import { useState, useEffect } from "react";
import { AppProvider, useApp } from "./contexts/AppContext";
import { Header } from "./components/Header";
import { UserTypeSelector } from "./components/UserTypeSelector";
import { DoctorLogin } from "./components/DoctorLogin";
import { PatientLogin } from "./components/PatientLogin";
import { DoctorDashboard } from "./components/DoctorDashboard";
import { PatientDashboard } from "./components/PatientDashboard";
import { PrescriptionForm } from "./components/PrescriptionForm";
import { AppointmentBooking } from "./components/AppointmentBooking";
import { MedicationReminder } from "./components/MedicationReminder";
import { PharmacyDelivery } from "./components/PharmacyDelivery";
import { VideoConsultation } from "./components/VideoConsultation";
import { RatingSystem } from "./components/RatingSystem";
import { PatientProfile } from "./components/PatientProfile";
import { DoctorVideoConsultation } from "./components/DoctorVideoConsultation";
import { PatientFiles } from "./components/PatientFiles";
import { SubPageHeader } from "./components/SubPageHeader";
import { MobileOptimizer } from "./components/MobileOptimizer";
import { Toaster } from "./components/ui/sonner";

type AppState =
  | "home"
  | "doctor-login"
  | "patient-login"
  | "doctor-dashboard"
  | "patient-dashboard"
  | "prescription"
  | "appointment-booking"
  | "medication-reminder"
  | "pharmacy-delivery"
  | "video-consultation"
  | "doctor-video-consultation"
  | "rating-system"
  | "patient-profile"
  | "patient-files";

type UserType = "doctor" | "patient" | null;

function AppContent() {
  const { language } = useApp();
  const [currentState, setCurrentState] =
    useState<AppState>("home");
  const [userType, setUserType] = useState<UserType>(null);

  // Mobile First & PWA Setup
  useEffect(() => {
    // Force mobile-friendly viewport
    const setMobileViewport = () => {
      let viewport = document.querySelector('meta[name="viewport"]');
      if (!viewport) {
        viewport = document.createElement('meta');
        viewport.setAttribute('name', 'viewport');
        document.head.appendChild(viewport);
      }
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
    };

    setMobileViewport();

    // Detect device and optimize accordingly
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    
    if (isMobile) {
      document.body.classList.add('mobile-device');
    } else if (isTablet) {
      document.body.classList.add('tablet-device');
    }

    // Request notification permission for mobile
    if ('Notification' in window && Notification.permission === 'default' && isMobile) {
      setTimeout(() => {
        Notification.requestPermission().then(permission => {
          console.log('Notification permission:', permission);
        });
      }, 3000); // Delay to avoid immediate popup
    }

    // PWA detection
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                        (window.navigator as any).standalone || 
                        document.referrer.includes('android-app://');
    
    if (isStandalone) {
      console.log('Running as PWA');
      document.body.classList.add('pwa-mode');
    }

    // Prevent zoom on double tap for mobile
    if (isMobile) {
      let lastTouchEnd = 0;
      document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
          event.preventDefault();
        }
        lastTouchEnd = now;
      }, false);
    }

    // Handle orientation change
    const handleOrientationChange = () => {
      setTimeout(() => {
        setMobileViewport();
      }, 100);
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  // Mock user data - في التطبيق الحقيقي ستأتي من قاعدة البيانات
  const userData = {
    doctor: {
      name: "د. مختار نبيل",
      specialty: "أمراض القلب",
    },
    patient: {
      name: "اسامه رضا",
      info: "مريض منذ 2023",
    },
  };

  const handleUserTypeSelect = (type: "doctor" | "patient") => {
    setUserType(type);
    setCurrentState(
      type === "doctor" ? "doctor-login" : "patient-login",
    );
  };

  const handleLogin = () => {
    setCurrentState(
      userType === "doctor"
        ? "doctor-dashboard"
        : "patient-dashboard",
    );
  };

  const handleLogout = () => {
    setCurrentState("home");
    setUserType(null);
  };

  const handleBackToHome = () => {
    setCurrentState("home");
    setUserType(null);
  };

  const handleBackToDashboard = () => {
    setCurrentState(
      userType === "doctor"
        ? "doctor-dashboard"
        : "patient-dashboard",
    );
  };

  const handleNavigate = (state: AppState) => {
    setCurrentState(state);
  };

  const getPageTitle = (state: AppState): string => {
    const titles: { [key: string]: string } = {
      prescription: language === 'ar' ? "كتابة روشتة طبية" : "Write Prescription",
      "appointment-booking": language === 'ar' ? "حجز موعد" : "Book Appointment",
      "medication-reminder": language === 'ar' ? "تذكير الأدوية" : "Medication Reminder",
      "pharmacy-delivery": language === 'ar' ? "طلب أدوية" : "Order Medications",
      "video-consultation": language === 'ar' ? "استشارة مرئية" : "Video Consultation",
      "doctor-video-consultation": language === 'ar' ? "استشارة مرئية - طبيب" : "Video Consultation - Doctor",
      "rating-system": language === 'ar' ? "التقييمات والمراجعات" : "Ratings & Reviews",
      "patient-profile": language === 'ar' ? "الملف الشخصي" : "Patient Profile",
      "patient-files": language === 'ar' ? "ملفات المرضى" : "Patient Files",
    };
    return (
      titles[state as keyof typeof titles] ||
      (language === 'ar' ? "نظام المتابعة الطبية" : "Medical Follow-up System")
    );
  };

  const renderSubPageWithHeader = (
    Component: React.ComponentType<any>,
    props: any = {},
  ) => {
    const userName =
      userType === "doctor"
        ? userData.doctor.name
        : userData.patient.name;

    return (
      <>
        <SubPageHeader
          title={getPageTitle(currentState)}
          userType={userType!}
          userName={userName}
          onBack={handleBackToDashboard}
        />
        <Component {...props} />
      </>
    );
  };

  const renderContent = () => {
    switch (currentState) {
      case "home":
        return (
          <UserTypeSelector
            onSelectType={handleUserTypeSelect}
          />
        );

      case "doctor-login":
        return (
          <DoctorLogin
            onBack={handleBackToHome}
            onLogin={handleLogin}
          />
        );

      case "patient-login":
        return (
          <PatientLogin
            onBack={handleBackToHome}
            onLogin={handleLogin}
          />
        );

      case "doctor-dashboard":
        return (
          <DoctorDashboard
            onLogout={handleLogout}
            onNavigate={handleNavigate}
          />
        );

      case "patient-dashboard":
        return (
          <PatientDashboard
            onLogout={handleLogout}
            onNavigate={handleNavigate}
          />
        );

      case "prescription":
        return renderSubPageWithHeader(PrescriptionForm, {
          onNavigate: handleNavigate,
          onBack: handleBackToDashboard,
        });

      case "appointment-booking":
        return renderSubPageWithHeader(AppointmentBooking, {
          onNavigate: handleNavigate,
          onBack: handleBackToDashboard,
        });

      case "medication-reminder":
        return renderSubPageWithHeader(MedicationReminder, {
          onNavigate: handleNavigate,
          onBack: handleBackToDashboard,
        });

      case "pharmacy-delivery":
        return renderSubPageWithHeader(PharmacyDelivery, {
          onNavigate: handleNavigate,
          onBack: handleBackToDashboard,
        });

      case "video-consultation":
        return renderSubPageWithHeader(VideoConsultation, {
          onNavigate: handleNavigate,
          onBack: handleBackToDashboard,
          userType: userType,
        });

      case "doctor-video-consultation":
        return renderSubPageWithHeader(
          DoctorVideoConsultation,
          {
            onNavigate: handleNavigate,
            onBack: handleBackToDashboard,
          },
        );

      case "rating-system":
        return renderSubPageWithHeader(RatingSystem, {
          onNavigate: handleNavigate,
          onBack: handleBackToDashboard,
        });

      case "patient-profile":
        return renderSubPageWithHeader(PatientProfile, {
          onNavigate: handleNavigate,
          onBack: handleBackToDashboard,
        });

      case "patient-files":
        return renderSubPageWithHeader(PatientFiles, {
          onNavigate: handleNavigate,
          onBack: handleBackToDashboard,
        });

      default:
        return (
          <UserTypeSelector
            onSelectType={handleUserTypeSelect}
          />
        );
    }
  };

  return (
    <MobileOptimizer>
      <div className="min-h-screen bg-background dark:bg-gray-900 touch-manipulation">
        {currentState === "home" && <Header />}
        {renderContent()}
        <Toaster />
      </div>
    </MobileOptimizer>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}