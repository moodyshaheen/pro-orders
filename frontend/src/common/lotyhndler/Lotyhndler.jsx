// الواردات (Imports):
// - Lotti: مكون من مكتبة lottie-react لعرض الرسوم المتحركة
// - ملفات JSON: رسوم متحركة مختلفة لحالات التحميل والأخطاء
import Lotti from 'lottie-react'
import mainPageLoder from '../../assets/lottifiles/mainPageloder.json'
import normalPageLoder from '../../assets/lottifiles/normalPageLoder.json'
import error from '../../assets/lottifiles/404 Error - Doodle animation.json'
import catchError from '../../assets/lottifiles/Error animation.json'
import '../lotyhndler/lottyhendler.css'

// مكون LotyHendeler: يعرض رسوم متحركة مختلفة حسب الحالة
// المُدخل: status (نوع الحالة المطلوبة)
// الحالات المتاحة:
// - 'main': تحميل الصفحة الرئيسية (ارتفاع 90vh)
// - 'normal': تحميل الصفحات العادية (ارتفاع 90vh)
// - 'apierr': خطأ في جلب البيانات من API (ارتفاع 50vh)
// - 'error': خطأ عام أو 404 (ارتفاع 90vh)
// يُستخدم في: App.jsx (fallback للتوجيه)، Shop.jsx، Cart.jsx، Profile.jsx
function LotyHendeler({status}) {
    switch (status) {
        case 'main':
            // تحميل الصفحة الرئيسية - رسوم متحركة كبيرة
            return (
                <div className='flex' style={{height:'90vh'}}>
                    <Lotti animationData={mainPageLoder} className='w-50' />
                </div>
            );
            
        case 'normal':
            // تحميل الصفحات العادية - رسوم متحركة متوسطة
            return (
                <div className='flex' style={{height:'90vh'}}>
                    <Lotti animationData={normalPageLoder} className='w-50' />
                </div>
            );
            
        case 'apierr':
            // خطأ في جلب البيانات من السيرفر - رسوم متحركة صغيرة
            return (
                <div className='flex' style={{height:'50vh'}}>
                    <Lotti animationData={catchError} className='w-50' />
                </div>
            );
            
        default:
            // خطأ عام أو صفحة غير موجودة (404) - رسوم متحركة كبيرة
            return (
                <div className='flex' style={{height:'90vh'}}>
                    <Lotti animationData={error} className='w-50' />
                </div>
            );
    }
}

export default LotyHendeler 