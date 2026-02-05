import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { UserCheck, Stethoscope, Heart, Shield, Clock, Users, Sparkles, ArrowLeft, Calendar, FileText, Globe, Moon, Sun } from "lucide-react";
import { useApp } from "../contexts/AppContext";
import { Logo } from "./Logo";

interface UserTypeSelectorProps {
  onSelectType: (type: 'doctor' | 'patient') => void;
}

export function UserTypeSelector({ onSelectType }: UserTypeSelectorProps) {
  const { t, dir, language, theme, toggleLanguage, toggleTheme } = useApp();

  return (
    <div className="min-h-screen relative overflow-hidden" dir={dir}>
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM2NjdlZWEiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnptLTEyIDBjMy4zMSAwIDYtMi42OSA2LTZzLTIuNjktNi02LTYtNiAyLjY5LTYgNiAyLjY5IDYgNiA2ek0zNiAzOGMzLjMxIDAgNi0yLjY5IDYtNnMtMi42OS02LTYtNi02IDIuNjktNiA2IDIuNjkgNiA2IDZ6bS0xMiAwYzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40" />
        {/* Floating shapes */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      {/* Settings Toggle - Top Right */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 flex gap-2">
        {/* Language Toggle */}
        <Button
          onClick={toggleLanguage}
          variant="outline"
          size="sm"
          className="glass-card border-white/20 hover:border-white/40 shadow-lg backdrop-blur-xl"
        >
          <Globe className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">{language === 'ar' ? 'EN' : 'عربي'}</span>
          <span className="sm:hidden">{language === 'ar' ? 'EN' : 'ع'}</span>
        </Button>

        {/* Theme Toggle */}
        <Button
          onClick={toggleTheme}
          variant="outline"
          size="sm"
          className="glass-card border-white/20 hover:border-white/40 shadow-lg backdrop-blur-xl"
        >
          {theme === 'light' ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8 lg:py-12">
        {/* Hero Section */}
        <div className="text-center mb-6 sm:mb-12 lg:mb-16 animate-fadeIn">
          <div className="flex items-center justify-center mb-3 sm:mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl sm:rounded-3xl blur-xl opacity-30" />
              <div className="relative p-3 sm:p-4 lg:p-5 bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl">
                <Logo className="text-emerald-600 dark:text-emerald-400" size={64} />
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {t('app.name')}
            </span>
          </h1>
          
          <p className="text-base sm:text-xl lg:text-2xl font-semibold text-gray-700 dark:text-gray-300">
            {t('app.tagline')}
          </p>
          
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-2 mt-2">
            {t('app.description')}
          </p>
        </div>

        {/* User Type Cards */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto mb-6 sm:mb-12 lg:mb-16">
          {/* Patient Card */}
          <div className="group animate-scaleIn" style={{ animationDelay: '0.1s' }}>
            <Card className="relative overflow-hidden border-2 border-transparent hover:border-emerald-400 transition-all duration-500 hover:shadow-premium-lg interactive-scale glass-card h-full">
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-green-500/0 group-hover:from-emerald-500/5 group-hover:to-green-500/5 transition-all duration-500" />
              
              <CardHeader className="text-center pb-3 sm:pb-4 relative z-10">
                <div className="relative mb-3 sm:mb-4 mx-auto w-fit">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 rounded-2xl sm:rounded-3xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-emerald-400 to-green-600 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <UserCheck className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-white" />
                  </div>
                </div>
                
                <CardTitle className="text-2xl sm:text-3xl mb-2 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  {t('user.patient')}
                </CardTitle>
                <CardDescription className="text-base dark:text-gray-400">
                  {t('patient.subtitle')}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4 p-6 relative z-10">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { icon: Calendar, text: t('feature.appointments') },
                    { icon: Heart, text: t('feature.health.tracking') },
                    { icon: Clock, text: t('feature.medication.reminder') },
                    { icon: Users, text: t('feature.video.consultation') }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-white/50 dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/20 transition-colors">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/50 dark:to-green-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.text}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full h-12 sm:h-14 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                  size="lg"
                  onClick={() => onSelectType('patient')}
                >
                  <UserCheck className={`h-5 w-5 ${dir === 'rtl' ? 'ml-2' : 'mr-2'} group-hover/btn:scale-110 transition-transform`} />
                  <span className="font-semibold">{t('action.start')}</span>
                  <ArrowLeft className={`h-5 w-5 ${dir === 'rtl' ? 'mr-2 group-hover/btn:-translate-x-1' : 'ml-2 group-hover/btn:translate-x-1'} transition-transform`} />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Doctor Card */}
          <div className="group animate-scaleIn" style={{ animationDelay: '0.2s' }}>
            <Card className="relative overflow-hidden border-2 border-transparent hover:border-blue-400 transition-all duration-500 hover:shadow-premium-lg interactive-scale glass-card h-full">
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-500" />
              
              <CardHeader className="text-center pb-4 relative z-10">
                <div className="relative mb-4 mx-auto w-fit">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <Stethoscope className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                  </div>
                </div>
                
                <CardTitle className="text-2xl sm:text-3xl mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {t('user.doctor')}
                </CardTitle>
                <CardDescription className="text-base dark:text-gray-400">
                  {t('doctor.subtitle')}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4 p-6 relative z-10">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[
                    { icon: Users, text: t('feature.patient.management') },
                    { icon: FileText, text: t('feature.digital.prescription') },
                    { icon: Calendar, text: t('feature.schedule') },
                    { icon: Users, text: t('feature.remote.consultation') }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-white/50 dark:bg-white/10 hover:bg-white/80 dark:hover:bg-white/20 transition-colors">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.text}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full h-12 sm:h-14 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                  size="lg"
                  onClick={() => onSelectType('doctor')}
                >
                  <Stethoscope className={`h-5 w-5 ${dir === 'rtl' ? 'ml-2' : 'mr-2'} group-hover/btn:scale-110 transition-transform`} />
                  <span className="font-semibold">{t('action.join')}</span>
                  <ArrowLeft className={`h-5 w-5 ${dir === 'rtl' ? 'mr-2 group-hover/btn:-translate-x-1' : 'ml-2 group-hover/btn:translate-x-1'} transition-transform`} />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          {[
            {
              icon: Heart,
              title: t('main.feature.comprehensive'),
              description: t('main.feature.comprehensive.desc'),
              color: "from-rose-500 to-pink-500"
            },
            {
              icon: Shield,
              title: t('main.feature.secure'),
              description: t('main.feature.secure.desc'),
              color: "from-blue-500 to-cyan-500"
            },
            {
              icon: Clock,
              title: t('main.feature.available'),
              description: t('main.feature.available.desc'),
              color: "from-purple-500 to-indigo-500"
            }
          ].map((feature, idx) => (
            <Card key={idx} className="glass-card hover:shadow-premium transition-all duration-300 interactive-scale group/feature">
              <CardContent className="p-6 text-center">
                <div className="relative mb-4 mx-auto w-fit">
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg group-hover/feature:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                </div>
                <h3 className="font-semibold mb-2 dark:text-gray-200">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <Card className="glass-card shadow-premium-lg max-w-5xl mx-auto animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <CardContent className="p-8 lg:p-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                { value: "500+", label: t('stats.doctors'), color: "from-blue-600 to-purple-600" },
                { value: "10k+", label: t('stats.patients'), color: "from-emerald-600 to-green-600" },
                { value: "50k+", label: t('stats.consultations'), color: "from-amber-600 to-orange-600" },
                { value: "99%", label: t('stats.satisfaction'), color: "from-rose-600 to-pink-600" }
              ].map((stat, idx) => (
                <div key={idx} className="group/stat">
                  <div className={`text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover/stat:scale-110 transition-transform`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}