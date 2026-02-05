import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Stethoscope, Phone, Mail, MessageCircle } from "lucide-react";
import { useApp } from "../contexts/AppContext";
import { Logo } from "./Logo";

export function Header() {
  const { t, dir } = useApp();
  
  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b dark:border-gray-700 sticky top-0 z-50 animate-fadeIn" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className={`flex items-center ${dir === 'rtl' ? 'space-x-reverse' : ''} space-x-2 sm:space-x-3`}>
            <div className="p-1.5 sm:p-2 bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
              <Logo className="text-emerald-600 dark:text-emerald-400" size={32} />
            </div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{t('app.name')}</span>
          </div>
          
          <div className={`flex items-center ${dir === 'rtl' ? 'space-x-reverse' : ''} space-x-2 sm:space-x-4`}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`flex items-center ${dir === 'rtl' ? 'space-x-reverse' : ''} space-x-1 sm:space-x-2 h-9 sm:h-10 px-2 sm:px-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-violet-50 dark:hover:from-blue-950 dark:hover:to-violet-950 transition-all duration-300 border-violet-200 dark:border-violet-700`}
                >
                  <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm">{dir === 'rtl' ? 'تواصل معنا' : 'Contact Us'}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72 sm:w-80">
                <div className="p-4 space-y-4">
                  <h3 className="font-semibold text-lg">{dir === 'rtl' ? 'تواصل معنا' : 'Contact Us'}</h3>
                  
                  <DropdownMenuItem className={`flex items-center ${dir === 'rtl' ? 'space-x-reverse' : ''} space-x-3 p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800`}>
                    <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-full">
                      <Phone className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium">{dir === 'rtl' ? 'رقم الهاتف' : 'Phone Number'}</p>
                      <p className="text-sm text-muted-foreground" dir="ltr">+2001019616125</p>
                    </div>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem className={`flex items-center ${dir === 'rtl' ? 'space-x-reverse' : ''} space-x-3 p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800`}>
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                      <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium">{dir === 'rtl' ? 'البريد الإلكتروني' : 'Email'}</p>
                      <p className="text-sm text-muted-foreground" dir="ltr">Salamtak@gmail.com</p>
                    </div>
                  </DropdownMenuItem>
                  
                  <div className="pt-2 border-t dark:border-gray-700">
                    <p className="text-xs text-muted-foreground text-center">
                      {dir === 'rtl' ? 'متاحون للرد على استفساراتكم 24/7' : 'Available to answer your questions 24/7'}
                    </p>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}