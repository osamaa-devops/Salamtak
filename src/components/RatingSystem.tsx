import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare,
  User,
  Calendar,
  Filter,
  TrendingUp
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useApp } from "../contexts/AppContext";

interface Review {
  id: number;
  patientName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
  category: 'doctor' | 'clinic' | 'lab' | 'hospital';
  targetId: number;
  targetName: string;
}

interface RatingStats {
  overall: number;
  totalReviews: number;
  distribution: { [key: number]: number };
  categories: {
    quality: number;
    waiting: number;
    staff: number;
    cleanliness: number;
    value: number;
  };
}

export function RatingSystem() {
  const { t, dir, language } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<'doctor' | 'clinic' | 'lab' | 'hospital'>('doctor');
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
    targetId: 1,
    categories: {
      quality: 0,
      waiting: 0,
      staff: 0,
      cleanliness: 0,
      value: 0
    }
  });

  const reviews: Review[] = [
    {
      id: 1,
      patientName: language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohamed',
      rating: 5,
      comment: language === 'ar' ? 'طبيب ممتاز ومتفهم. شرح لي حالتي بوضوح وكان العلاج فعال جداً. أنصح به بشدة.' : 'Excellent and understanding doctor. Explained my condition clearly and the treatment was very effective. Highly recommend.',
      date: "2024-01-10",
      verified: true,
      helpful: 12,
      category: 'doctor',
      targetId: 1,
      targetName: t('default.doctor.name')
    },
    {
      id: 2,
      patientName: language === 'ar' ? 'فاطمة علي' : 'Fatima Ali',
      rating: 4,
      comment: language === 'ar' ? 'عيادة نظيفة وموظفين محترمين. وقت الانتظار كان قليل. الطبيب كان جيد و��كن أتمنى لو أعطى وقت أكثر للشرح.' : 'Clean clinic with respectful staff. Waiting time was short. The doctor was good but I wish he had given more time for explanation.',
      date: "2024-01-08",
      verified: true,
      helpful: 8,
      category: 'clinic',
      targetId: 1,
      targetName: "مستشفى النور"
    },
    {
      id: 3,
      patientName: language === 'ar' ? 'محمد حسن' : 'Mohamed Hassan',
      rating: 5,
      comment: language === 'ar' ? 'تحاليل دقيقة ونتائج سريعة. الأسعار معقولة والخدمة ممتازة.' : 'Accurate tests with quick results. Prices are reasonable and the service is excellent.',
      date: "2024-01-05",
      verified: true,
      helpful: 15,
      category: 'lab',
      targetId: 1,
      targetName: "معمل الفا للتحاليل"
    }
  ];

  const ratingStats: RatingStats = {
    overall: 4.7,
    totalReviews: 234,
    distribution: {
      5: 156,
      4: 45,
      3: 20,
      2: 8,
      1: 5
    },
    categories: {
      quality: 4.8,
      waiting: 4.2,
      staff: 4.6,
      cleanliness: 4.9,
      value: 4.4
    }
  };

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex space-x-reverse space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onRate && onRate(star)}
          />
        ))}
      </div>
    );
  };

  const filteredReviews = reviews.filter(review => {
    if (review.category !== selectedCategory) return false;
    if (filterRating && review.rating !== filterRating) return false;
    return true;
  });

  const submitReview = () => {
    if (newReview.rating === 0) {
      toast.error(language === 'ar' ? 'يرجى اختيار تقييم' : 'Please select a rating');
      return;
    }

    if (newReview.comment.trim().length < 10) {
      toast.error(language === 'ar' ? 'يرجى كتابة تعليق أكثر تفصيلاً' : 'Please write a more detailed comment');
      return;
    }

    toast.success(language === 'ar' ? 'تم إضافة تقييمك بنجاح. شكراً لك!' : 'Your review has been added successfully. Thank you!');
    setShowAddReview(false);
    setNewReview({
      rating: 0,
      comment: "",
      targetId: 1,
      categories: {
        quality: 0,
        waiting: 0,
        staff: 0,
        cleanliness: 0,
        value: 0
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 dark:bg-gray-900" dir={dir}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">{t('rating.title')}</h1>
          <p className="text-muted-foreground">{language === 'ar' ? 'اقرأ تجارب المرضى واترك تقييمك' : 'Read patient experiences and leave your review'}</p>
        </div>
        
        <Dialog open={showAddReview} onOpenChange={setShowAddReview}>
          <DialogTrigger asChild>
            <Button>
              <Star className={`h-4 w-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
              {language === 'ar' ? 'إضافة تقييم' : 'Add Review'}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl dark:bg-gray-800" dir={dir}>
            <DialogHeader>
              <DialogTitle>{language === 'ar' ? 'إضافة تقييم جديد' : 'Add New Review'}</DialogTitle>
              <DialogDescription>{language === 'ar' ? 'شارك تجربتك لمساعدة المرضى الآخرين' : 'Share your experience to help other patients'}</DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>{language === 'ar' ? 'التقييم العام' : 'Overall Rating'}</Label>
                <div className="flex items-center space-x-reverse space-x-2">
                  {renderStars(newReview.rating, true, (rating) => 
                    setNewReview(prev => ({ ...prev, rating }))
                  )}
                  <span className="text-sm text-muted-foreground">
                    {newReview.rating > 0 && `${newReview.rating} ${language === 'ar' ? 'من' : 'out of'} 5`}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{language === 'ar' ? 'جودة الخدمة' : 'Service Quality'}</Label>
                  {renderStars(newReview.categories.quality, true, (rating) =>
                    setNewReview(prev => ({
                      ...prev,
                      categories: { ...prev.categories, quality: rating }
                    }))
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label>{language === 'ar' ? 'وقت الانتظار' : 'Waiting Time'}</Label>
                  {renderStars(newReview.categories.waiting, true, (rating) =>
                    setNewReview(prev => ({
                      ...prev,
                      categories: { ...prev.categories, waiting: rating }
                    }))
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label>{language === 'ar' ? 'تعامل الموظفين' : 'Staff Behavior'}</Label>
                  {renderStars(newReview.categories.staff, true, (rating) =>
                    setNewReview(prev => ({
                      ...prev,
                      categories: { ...prev.categories, staff: rating }
                    }))
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label>{language === 'ar' ? 'النظافة' : 'Cleanliness'}</Label>
                  {renderStars(newReview.categories.cleanliness, true, (rating) =>
                    setNewReview(prev => ({
                      ...prev,
                      categories: { ...prev.categories, cleanliness: rating }
                    }))
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>{language === 'ar' ? 'التعليق' : 'Comment'}</Label>
                <Textarea
                  placeholder={language === 'ar' ? 'اكتب تعليقك هنا...' : 'Write your comment here...'}
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  rows={4}
                />
                <p className="text-xs text-muted-foreground">
                  {language === 'ar' ? `الحد الأدنى 10 أحرف (${newReview.comment.length}/10)` : `Minimum 10 characters (${newReview.comment.length}/10)`}
                </p>
              </div>
              
              <Button className="w-full" onClick={submitReview}>
                {language === 'ar' ? 'نشر التقييم' : 'Post Review'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Statistics Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle>{language === 'ar' ? 'إحصائيات التقييم' : 'Rating Statistics'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">{ratingStats.overall}</div>
                <div className="flex justify-center mt-1">
                  {renderStars(Math.round(ratingStats.overall))}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {language === 'ar' ? `من ${ratingStats.totalReviews} تقييم` : `from ${ratingStats.totalReviews} reviews`}
                </p>
              </div>
              
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-reverse space-x-2">
                    <span className="text-sm w-4">{rating}</span>
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <Progress 
                      value={(ratingStats.distribution[rating] / ratingStats.totalReviews) * 100} 
                      className="flex-1 h-2" 
                    />
                    <span className="text-sm w-8 text-muted-foreground">
                      {ratingStats.distribution[rating]}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle>{language === 'ar' ? 'تقييم مفصل' : 'Detailed Rating'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(ratingStats.categories).map(([key, value]) => {
                const labels = language === 'ar' ? {
                  quality: "جودة الخدمة",
                  waiting: "وقت الانتظار",
                  staff: "تعامل الموظفين",
                  cleanliness: "النظافة",
                  value: "جودة السعر"
                } : {
                  quality: "Service Quality",
                  waiting: "Waiting Time",
                  staff: "Staff Behavior",
                  cleanliness: "Cleanliness",
                  value: "Value for Money"
                };
                
                return (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm">{labels[key as keyof typeof labels]}</span>
                    <div className="flex items-center space-x-reverse space-x-1">
                      <span className="text-sm font-medium">{value}</span>
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Reviews Content */}
        <div className="lg:col-span-3 space-y-4">
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{language === 'ar' ? 'المراجعات' : 'Reviews'}</CardTitle>
                <div className="flex items-center space-x-reverse space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className={`h-4 w-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                    {language === 'ar' ? 'تصفية' : 'Filter'}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as any)}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="doctor">{language === 'ar' ? 'الأطباء' : 'Doctors'}</TabsTrigger>
                  <TabsTrigger value="clinic">{language === 'ar' ? 'العيادات' : 'Clinics'}</TabsTrigger>
                  <TabsTrigger value="lab">{language === 'ar' ? 'المعامل' : 'Labs'}</TabsTrigger>
                  <TabsTrigger value="hospital">{language === 'ar' ? 'المستشفيات' : 'Hospitals'}</TabsTrigger>
                </TabsList>
                
                <TabsContent value={selectedCategory} className="space-y-4 mt-6">
                  {/* Rating Filter */}
                  <div className="flex items-center space-x-reverse space-x-2 mb-4 flex-wrap">
                    <span className="text-sm">{language === 'ar' ? 'تصفية حسب التقييم:' : 'Filter by rating:'}</span>
                    <div className="flex space-x-reverse space-x-1">
                      <Button
                        variant={filterRating === null ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterRating(null)}
                      >
                        {language === 'ar' ? 'الكل' : 'All'}
                      </Button>
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <Button
                          key={rating}
                          variant={filterRating === rating ? "default" : "outline"}
                          size="sm"
                          onClick={() => setFilterRating(rating)}
                        >
                          {rating} <Star className={`h-3 w-3 ${dir === 'rtl' ? 'mr-1' : 'ml-1'}`} />
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Reviews List */}
                  <div className="space-y-4">
                    {filteredReviews.map((review) => (
                      <Card key={review.id} className="dark:bg-gray-700">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-reverse space-x-3">
                              <Avatar>
                                <AvatarFallback>
                                  {review.patientName.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center space-x-reverse space-x-2">
                                  <h4 className="font-medium">{review.patientName}</h4>
                                  {review.verified && (
                                    <Badge variant="secondary" className="text-xs">
                                      {language === 'ar' ? 'مُوثق' : 'Verified'}
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center space-x-reverse space-x-2 mt-1">
                                  {renderStars(review.rating)}
                                  <span className="text-sm text-muted-foreground">
                                    {language === 'ar' ? `للـ ${review.targetName}` : `for ${review.targetName}`}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-reverse space-x-1 text-xs text-muted-foreground mt-1">
                                  <Calendar className="h-3 w-3" />
                                  <span>{review.date}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-gray-700 dark:text-gray-300 mb-4">{review.comment}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-reverse space-x-4">
                              <Button variant="ghost" size="sm">
                                <ThumbsUp className={`h-4 w-4 ${dir === 'rtl' ? 'ml-1' : 'mr-1'}`} />
                                {language === 'ar' ? `مفيد (${review.helpful})` : `Helpful (${review.helpful})`}
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MessageSquare className={`h-4 w-4 ${dir === 'rtl' ? 'ml-1' : 'mr-1'}`} />
                                {language === 'ar' ? 'رد' : 'Reply'}
                              </Button>
                            </div>
                            
                            <Badge variant="outline">
                              {selectedCategory === 'doctor' && (language === 'ar' ? 'طبيب' : 'Doctor')}
                              {selectedCategory === 'clinic' && (language === 'ar' ? 'عيادة' : 'Clinic')}
                              {selectedCategory === 'lab' && (language === 'ar' ? 'معمل' : 'Lab')}
                              {selectedCategory === 'hospital' && (language === 'ar' ? 'مستشفى' : 'Hospital')}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}