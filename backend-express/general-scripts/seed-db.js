import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { nanoid } from 'nanoid';
import fs from 'fs';

const adapter = new JSONFile('db.json');
const db = new Low(adapter);

await db.read();

db.data ||= {
  contents: [],
  user: {
    email: 'admin@example.com',
    passwordHash: '' // מלא כאן את ה-hash שלך אם צריך
  }
};

if (!db.data.contents || db.data.contents.length === 0) {
  db.data.contents = [
    {
      id: nanoid(),
      type: 'text',
      title: 'למה הקורס חשוב?',
      body: 'בקורס תלמדו איך להגיב מתוך הבנה, להציב גבולות בלי עונשים, ולגדל ילדים עם ביטחון עצמי.'
    },
    {
      id: nanoid(),
      type: 'video',
      title: 'הצצה לפרק הראשון',
      body: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    {
      id: nanoid(),
      type: 'text',
      title: 'מי אני?',
      body: 'אני מיכל, מדריכת הורים עם ניסיון של מעל 12 שנה. ליוויתי מאות משפחות בתהליכים משני חיים.'
    },
    {
      id: nanoid(),
      type: 'video',
      title: 'המלצה חמה מאמא',
      body: 'https://youtu.be/3GwjfUFyY6M'
    }
  ];

  console.log('✔️ תוכן לדוגמה נוסף בהצלחה.');
} else {
  console.log('ℹ️ כבר קיימים תכנים - לא בוצע שינוי.');
}

await db.write();
