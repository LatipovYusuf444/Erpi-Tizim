export const resources = {
  uz: {
    translation: {
      salesList: {
        sotuv_rouhati: "Sotuv Ro'yhati",
        searchPlaceholder: "Qidiruv...",
        loading: "Ma'lumotlar yuklanmoqda",
        errorApi: "Xatolik:",
        emptyNow: "Hozircha yo'q",
        notFound: "Topilmadi",
      },
    returned:{
      qaytarilgan_tovarlar: "Qaytarilgan Tovarlar Royhati",
       searchPlaceholder: "Qidiruv...",
        loading: "Ma'lumotlar yuklanmoqda",
        errorApi: "Xatolik:",
        emptyNow: "Hozircha yo'q",
        notFound: "Topilmadi",
      
    },
    chart: {
  titleDate: "Sana",
  product1: "Tovar 1",
  months: {
    jan: "Yan",
    feb: "Fev",
    mar: "Mart",
    apr: "Apr",
    may: "May",
    jun: "Iyun",
    jul: "Iyul",
    aug: "Avg",
    sep: "Sen",
    oct: "Okt",
    nov: "Noy",
    dec: "Dek",
  },
},
barRace: {
  titleYear: "Yil",
  kassa: "Kassa",
  confirmed: "Tasdiqlangan",
  debt: "Qarzdorlik",
},
      common: {
        add: "Qo'shish",
        edit: "Tahrirlash",
        delete: "O‘chirish",
        actions: "Amallar",
        closeSelects: "Selectni yopish",
          save: "Saqlash",

      },

      table: {
        sn: "S/N",
        clientName: "Mijoz",
        productName: "Tovar",
        quantity: "Miqdori",
        price: "Narxi",
        ndsPercent: "NDS %",
        ndsPrice: "NDS Narxi",
        totalPrice: "Umumiy Narxi",
        date: "Sanasi",
        status: "Statusi",
      },
          salesCreate: {
  title: "Sotuv qo‘shish",
  subtitle: "Mijoz, mahsulot, narx va to‘lov ma’lumotlarini kiriting",
  client: "Mijoz",
  staffFrom: "Shtab",
  from: "qattan",
  staffTo: "Shtab",
  to: "qayerga",

  product: "Mahsulot",
  selectProduct: "Mahsulot tanlang",
  productRequired: "Mahsulot tanlanishi shart",

  quantity: "Miqdori",
  quantityRequired: "Miqdori kiritilishi shart",

  price: "Narxi",
  ndsPercent: "NDS Foizi",
  priceWithNds: "Narxi",
  withNds: "NDS bilan",

},

    },
    
    // kassa:{
    //   hujjatRaqami:"Hujjat Raqami",
    //   sana:"Sana",
      
    // }
  },

  ru: {
    translation: {
      salesList: {
        sotuv_rouhati: "Список продаж",
        searchPlaceholder: "Поиск...",
        loading: "Загрузка данных",
        errorApi: "Ошибка:",
        emptyNow: "Пока нет данных",
        notFound: "Не найдено",
        
      },
      returned:{
       qaytarilgan_tovarlar: "Список возвращенных товаров",
       searchPlaceholder: "Поиск...",
        loading: "Загрузка данных",
        errorApi: "Ошибка:",
        emptyNow: "Пока нет данных",
        notFound: "Не найдено",
    },
chart: {
  titleDate: "Дата",
  product1: "Товар 1",
  months: {
    jan: "Янв",
    feb: "Фев",
    mar: "Мар",
    apr: "Апр",
    may: "Май",
    jun: "Июн",
    jul: "Июл",
    aug: "Авг",
    sep: "Сен",
    oct: "Окт",
    nov: "Ноя",
    dec: "Дек",
  },
},
barRace: {
  titleYear: "Год",
  kassa: "Касса",
  confirmed: "Подтверждено",
  debt: "Долг",
},
salesCreate: {
  title: "Добавить продажу",
  subtitle: "Введите данные клиента, товара, цену и оплату",

  client: "Клиент",
  staffFrom: "Склад",
  from: "откуда",
  staffTo: "Склад",
  to: "куда",

  product: "Товар",
  selectProduct: "Выберите товар",
  productRequired: "Нужно выбрать товар",

  quantity: "Количество",
  quantityRequired: "Количество обязательно",

  price: "Цена",
  ndsPercent: "НДС %",
  priceWithNds: "Цена",
  withNds: "с НДС",
},
      common: {
        add: "Добавить",
        edit: "Изменить",
        delete: "Удалить",
        actions: "Действия",
        closeSelects: "Закрыть селекты",
         save: "Сохранить",

      },

      table: {
        sn: "№",
        clientName: "Kлиент",
        productName: "Товар",
        quantity: "Кол-во",
        price: "Цена",
        ndsPercent: "НДС %",
        ndsPrice: "Цена с НДС",
        totalPrice: "Итоговая цена",
        date: "Дата",
        status: "Статус",
      },
    },
  },
} as const;