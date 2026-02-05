import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { ArrowRight, User, Mail, Lock, Phone, Calendar } from "lucide-react";
import { useApp } from "../contexts/AppContext";

interface PatientLoginProps {
  onBack: () => void;
  onLogin: () => void;
}

export function PatientLogin({ onBack, onLogin }: PatientLoginProps) {
  const { t, dir, language } = useApp();
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-gray-900 dark:to-emerald-950 flex items-center justify-center p-3 sm:p-4" dir={dir}>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2 pb-4 sm:pb-6">
          <Button 
            variant="ghost" 
            className="self-start p-0 h-auto text-sm"
            onClick={onBack}
          >
            <ArrowRight className="h-4 w-4 ml-2" />
            {t('action.back')}
          </Button>
          <CardTitle className="text-xl sm:text-2xl mt-2 sm:mt-4">
            {isRegistering ? (language === 'ar' ? "تسجيل مريض جديد" : "New Patient Registration") : t('login.title')}
          </CardTitle>
          <CardDescription className="text-sm">
            {isRegistering 
              ? (language === 'ar' ? "املأ البيانات المطلوبة لإنشاء حساب جديد" : "Fill the required data to create a new account")
              : (language === 'ar' ? "ادخل بياناتك للوصول إلى حسابك" : "Enter your credentials to access your account")
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <form className="space-y-3 sm:space-y-4">
            {isRegistering ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="reg-name">{t('register.name')}</Label>
                  <Input
                    id="reg-name"
                    type="text"
                    placeholder={t('register.name.placeholder')}
                    required
                    className="bg-white/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reg-phone">{t('register.phone')}</Label>
                  <Input
                    id="reg-phone"
                    type="tel"
                    placeholder="01234567890"
                    required
                    className="bg-white/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reg-email">{t('register.email')}</Label>
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="example@email.com"
                    required
                    className="bg-white/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reg-birthdate">{t('register.birthdate')}</Label>
                  <Input
                    id="reg-birthdate"
                    type="date"
                    required
                    className="bg-white/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reg-password">{t('register.password')}</Label>
                  <Input
                    id="reg-password"
                    type="password"
                    placeholder="********"
                    required
                    className="bg-white/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reg-confirm-password">{t('register.confirmPassword')}</Label>
                  <Input
                    id="reg-confirm-password"
                    type="password"
                    placeholder="********"
                    required
                    className="bg-white/50"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('login.phone')}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="01234567890"
                    required
                    className="bg-white/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">{t('login.password')}</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    required
                    className="bg-white/50"
                  />
                </div>
              </>
            )}

            <Button 
              type="button"
              onClick={onLogin}
              className="w-full bg-green-600 hover:bg-green-700" 
            >
              {isRegistering ? t('register.submit') : t('login.submit')}
            </Button>
            
            <div className="text-center">
              <Button 
                type="button"
                variant="link" 
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-sm"
              >
                {isRegistering 
                  ? (language === 'ar' ? "لديك حساب بالفعل؟ سجل دخولك" : "Already have an account? Login") 
                  : (language === 'ar' ? "ليس لديك حساب؟ سجل الآن" : "Don't have an account? Register")
                }
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}