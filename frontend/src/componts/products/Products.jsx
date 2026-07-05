import React from 'react'
import Product from '../../common/product/Product'

function Products() {
  return (
    <div className='Products'>
         <div className="products container pb-5 my-5">
      
      {/* عنوان الصفحة - وسط الصفحة بالكامل */}
      <div className="text-center w-100">
        <b className="fs-1" style={{ color: 'var(--main-color)' }}>
          Products
        </b>
      </div>

      {/* صف من الأعمدة (Grid system من Bootstrap) */}
      <div className="row g-3 my-4 container">
        {isLoding ? (
          // تحميل وهمي باستخدام شيلتون لو البيانات لسه بتيجي
          <MyLoader />
        ) : errorMainStor ? (
          // لو حصل خطأ في جلب البيانات من الـ API
          <LotyHendeler status="apierr" />
        ) : mainStor && mainStor.length > 0 ? (
          // لو في منتجات، يعرض كل منتج باستخدام مكون Project
          mainStor.map((item) => <Product key={item.id} item={item} />)
        ) : (
          // لو مفيش منتجات نهائي
          <p>No products found.</p>
        )}
      </div>
    </div>
    </div>
  )
}

export default Products