import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ArrowRight, Stethoscope } from "lucide-react";
import { useApp } from "../contexts/AppContext";
import { Logo } from "./Logo";

interface SubPageHeaderProps {
  title: string;
  userType: 'doctor' | 'patient';
  userName: string;
  onBack: () => void;
}

export function SubPageHeader({ 
  title, 
  userType, 
  userName, 
  onBack
}: SubPageHeaderProps) {
  const { dir } = useApp();
  
  return (
    <header className="glass-header sticky top-0 z-50 border-b dark:border-gray-700 animate-fadeIn" dir={dir}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Main Header Row */}
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Right Side - User Info */}
          <div className={`flex items-center ${dir === 'rtl' ? 'space-x-reverse' : ''} space-x-2 sm:space-x-3 flex-1 min-w-0`}>
            {/* User Info - Always visible */}
            <div className={`flex items-center ${dir === 'rtl' ? 'space-x-reverse' : ''} space-x-2 min-w-0 flex-1`}>
              <Avatar className="w-8 h-8 sm:w-9 sm:h-9 ring-2 ring-violet-200 dark:ring-violet-700 flex-shrink-0">
                <AvatarFallback className="text-xs sm:text-sm bg-gradient-to-br from-blue-500 to-violet-500 text-white">
                  {userName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className={`${dir === 'rtl' ? 'text-right' : 'text-left'} min-w-0`}>
                <p className="text-xs sm:text-sm font-semibold truncate">{userName}</p>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  {userType === 'doctor' ? (dir === 'rtl' ? 'طبيب' : 'Doctor') : (dir === 'rtl' ? 'مريض' : 'Patient')}
                </p>
              </div>
            </div>
          </div>

          {/* Left Side - Icon + Back Button */}
          <div className={`flex items-center ${dir === 'rtl' ? 'space-x-reverse' : ''} space-x-2 flex-shrink-0`}>
            <div className="hidden sm:block p-1 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <Logo className="text-emerald-600 dark:text-emerald-400" size={24} />
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600 dark:hover:text-blue-400 h-9 sm:h-10 px-2 sm:px-3"
            >
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className={`hidden sm:inline ${dir === 'rtl' ? 'mr-1.5 sm:mr-2' : 'ml-1.5 sm:ml-2'} text-xs sm:text-sm`}>
                {dir === 'rtl' ? 'عودة' : 'Back'}
              </span>
            </Button>
          </div>
        </div>
        
        {/* Mobile: Page Title Below */}
        <div className="pb-2 pt-1 border-t border-gray-100/50 dark:border-gray-700/50">
          <div className={`flex items-center ${dir === 'rtl' ? 'space-x-reverse' : ''} space-x-2`}>
            <div className="sm:hidden p-0.5 bg-white dark:bg-gray-800 rounded-md shadow-sm flex-shrink-0">
              <Logo className="text-emerald-600 dark:text-emerald-400" size={16} />
            </div>
            <h1 className="text-xs sm:text-sm lg:text-base font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent truncate">
              {title}
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}