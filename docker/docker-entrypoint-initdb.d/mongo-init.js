conn = new Mongo();
db = conn.getDB('booking');

// Вставка пользователей
db.users.insert({
  email: 'admin@mail.ru',
  passwordHash: '$2b$10$gZDjbdOxxlseV2iih3S/Bue9mrkSWEjQIF/IY/Z.Hgg1Erki1lfxi',
  name: 'Admin',
  contactPhone: '+79998887766',
  role: 'admin',
});

db.users.insert({
  email: 'manager@mail.ru',
  passwordHash: '$2b$10$92Y8Oe8fKdmtH93Dfk9/nuYAFSoqcmPI1yFQ/uvHTR8x5hseNXcvK',
  name: 'Manager',
  contactPhone: '+79998888888',
  role: 'manager',
});

db.users.insert({
  email: 'client@mail.ru',
  passwordHash: '$2b$10$PBe97TUuCnCUVJn4hvgDUubiLQc4Jet.FUBihEdcrVwEeozlKwNHS',
  name: 'Client',
  contactPhone: '+79998887777',
  role: 'client',
});

// Вставка отелей
db.hotels.insert({
  _id: ObjectId('66a03c03efad029c0db37f83'),
  title: 'The Ritz-Carlton, Berlin',
  description: 'Potsdamer Platz 3, 10785 Berlin, Germany\r\nОписание отеля\r\n \r\nThe Ritz-Carlton, Berlin — это роскошный отель, расположенный в самом сердце Берлина, рядом с Потсдамской площадью. Отель предлагает элегантные номера, ресторан с изысканной кухней, спа-центр и фитнес-зал. Гости могут насладиться бесплатным Wi-Fi на всей территории отеля и воспользоваться услугами консьержа.\r\n\r\nВ номерах отеля установлен кондиционер, сейф, телевизор с плоским экраном и мини-бар. Ванные комнаты оснащены халатами, тапочками и бесплатными туалетно-косметическими принадлежностями.\r\n\r\nОтель находится в нескольких минутах ходьбы от таких достопримечательностей, как Бранденбургские ворота и Рейхстаг. Аэропорт Берлин-Тегель расположен в 8 км от отеля.',
  createdAt: ISODate('2024-01-15T10:00:00.000Z'),
  updatedAt: ISODate('2024-01-15T10:05:00.000Z'),
  files: '[{"url":"/public/hotels/The Ritz-Carlton Berlin.jpg","name":"The Ritz-Carlton Berlin.jpg"}]',
});

db.hotels.insert({
  _id: ObjectId('66a03c28efad029c0db37f85'),
  title: 'Hotel Adlon Kempinski, Berlin',
  description: 'Unter den Linden 77, 10117 Berlin, Germany\r\nОписание отеля\r\nHotel Adlon Kempinski — это один из самых известных отелей Берлина, расположенный рядом с Бранденбургскими воротами. Отель предлагает роскошные номера, несколько ресторанов, спа-центр и крытый бассейн. Гости могут воспользоваться бесплатным Wi-Fi и услугами консьержа.\r\n\r\nВ номерах отеля установлен кондиционер, сейф, телевизор с плоским экраном и мини-бар. Ванные комнаты оснащены халатами, тапочками и бесплатными туалетно-косметическими принадлежностями.\r\n\r\nОтель находится в нескольких минутах ходьбы от таких достопримечательностей, как Рейхстаг и Мемориал жертвам Холокоста. Аэропорт Берлин-Тегель расположен в 10 км от отеля.',
  createdAt: ISODate('2024-01-16T12:00:00.000Z'),
  updatedAt: ISODate('2024-01-16T12:05:00.000Z'),
  files: '[{"url":"/public/hotels/Hotel Adlon Kempinski Berlin.jpg","name":"Hotel Adlon Kempinski Berlin.jpg"}]',
});

db.hotels.insert({
  _id: ObjectId('66a03c28efad029c0db37f86'),
  title: 'Mandarin Oriental, Munich',
  description: 'Neuturmstraße 1, 80331 Munich, Germany\r\nОписание отеля\r\nMandarin Oriental, Munich — это роскошный отель, расположенный в историческом центре Мюнхена. Отель предлагает элегантные номера, ресторан с изысканной кухней, спа-центр и фитнес-зал. Гости могут насладиться бесплатным Wi-Fi на всей территории отеля и воспользоваться услугами консьержа.\r\n\r\nВ номерах отеля установлен кондиционер, сейф, телевизор с плоским экраном и мини-бар. Ванные комнаты оснащены халатами, тапочками и бесплатными туалетно-косметическими принадлежностями.\r\n\r\nОтель находится в нескольких минутах ходьбы от таких достопримечательностей, как Мариенплац и Фрауэнкирхе. Аэропорт Мюнхен расположен в 30 км от отеля.',
  createdAt: ISODate('2024-01-19T10:00:00.000Z'),
  updatedAt: ISODate('2024-01-19T10:05:00.000Z'),
  files: '[{"url":"/public/hotels/Mandarin Oriental Munich.jpg","name":"Mandarin Oriental Munich.jpg"}]',
});

db.hotels.insert({
  _id: ObjectId('66a03c28efad029c0db37f87'),
  title: 'The Peninsula, Paris',
  description: '19 Avenue Kléber, 75116 Paris, France\r\nОписание отеля\r\nThe Peninsula, Paris — это роскошный отель, расположенный в самом сердце Парижа, рядом с Триумфальной аркой. Отель предлагает элегантные номера, ресторан с изысканной кухней, спа-центр и фитнес-зал. Гости могут насладиться бесплатным Wi-Fi на всей территории отеля и воспользоваться услугами консьержа.\r\n\r\nВ номерах отеля установлен кондиционер, сейф, телевизор с плоским экраном и мини-бар. Ванные комнаты оснащены халатами, тапочками и бесплатными туалетно-косметическими принадлежностями.\r\n\r\nОтель находится в нескольких минутах ходьбы от таких достопримечательностей, как Эйфелева башня и Елисейские поля. Аэропорт Париж-Шарль-де-Голль расположен в 25 км от отеля.',
  createdAt: ISODate('2024-01-20T12:00:00.000Z'),
  updatedAt: ISODate('2024-01-20T12:05:00.000Z'),
  files: '[{"url":"/public/hotels/The Peninsula Paris.jpg","name":"The Peninsula Paris.jpg"}]',
});

// Вставка номеров
db.rooms.insert({
  hotel: ObjectId('66a03c03efad029c0db37f83'),
  title: 'Deluxe Room with City View',
  description: 'Просторный номер с видом на город, оснащенный кондиционером, телевизором с плоским экраном и мини-баром. Ванная комната с душем и ванной, халатами и тапочками.\r\n\r\nУдобства:\r\n- Бесплатный Wi-Fi\r\n- Сейф\r\n- Мини-бар\r\n- Кофемашина\r\n- Халаты и тапочки',
  images: '[{"url":"/public/rooms/Room.png","name":"Room.png"}]',
  createdAt: ISODate('2024-01-17T14:00:00.000Z'),
  updatedAt: ISODate('2024-01-17T14:05:00.000Z'),
  isAnable: true,
});

db.rooms.insert({
  hotel: ObjectId('66a03c28efad029c0db37f85'),
  title: 'Executive Suite with Balcony',
  description: 'Роскошный номер с балконом и видом на Бранденбургские ворота. Номер оснащен кондиционером, телевизором с плоским экраном, мини-баром и кофемашиной. Ванная комната с душем и ванной, халатами и тапочками.\r\n\r\nУдобства:\r\n- Бесплатный Wi-Fi\r\n- Сейф\r\n- Мини-бар\r\n- Кофемашина\r\n- Халаты и тапочки',
  images: '[{"url":"/public/rooms/Room.png","name":"Room.png"}]',
  createdAt: ISODate('2024-01-18T16:00:00.000Z'),
  updatedAt: ISODate('2024-01-18T16:05:00.000Z'),
  isAnable: true,
});

db.rooms.insert({
  hotel: ObjectId('66a03c28efad029c0db37f86'),
  title: 'Deluxe Room with Garden View',
  description: 'Просторный номер с видом на сад, оснащенный кондиционером, телевизором с плоским экраном и мини-баром. Ванная комната с душем и ванной, халатами и тапочками.\r\n\r\nУдобства:\r\n- Бесплатный Wi-Fi\r\n- Сейф\r\n- Мини-бар\r\n- Кофемашина\r\n- Халаты и тапочки',
  images: '[{"url":"/public/rooms/Room.png","name":"Room.png"}]',
  createdAt: ISODate('2024-01-21T14:00:00.000Z'),
  updatedAt: ISODate('2024-01-21T14:05:00.000Z'),
  isAnable: true,
});

db.rooms.insert({
  hotel: ObjectId('66a03c28efad029c0db37f87'),
  title: 'Luxury Suite with Eiffel Tower View',
  description: 'Роскошный номер с видом на Эйфелеву башню, оснащенный кондиционером, телевизором с плоским экраном, мини-баром и кофемашиной. Ванная комната с душем и ванной, халатами и тапочками.\r\n\r\nУдобства:\r\n- Бесплатный Wi-Fi\r\n- Сейф\r\n- Мини-бар\r\n- Кофемашина\r\n- Халаты и тапочки',
  images: '[{"url":"/public/rooms/Room.png","name":"Room.png"}]',
  createdAt: ISODate('2024-01-22T16:00:00.000Z'),
  updatedAt: ISODate('2024-01-22T16:05:00.000Z'),
  isAnable: true,
});