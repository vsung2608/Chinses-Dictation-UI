export interface Lesson {
  id: number;
  titleChinese: string;
  titleVietnamese: string;
  description: string;
  audioFilePath: string;
  level: string;
  displayOrder: number;
  totalSentences: number;
  estimatedDurationSeconds: number;
  sentences: Sentence[];
}

export interface Section {
  id: string;
  title: string;
  lessonsCompleted: number;
  timesCompleted: number;
  totalLessons: number;
  greenStars: number;
  blueStars: number;
  isExpanded: boolean;
  lessons: Lesson[];
}

export interface Sentence {
  id: number,
  sentenceOrder: number,
  chineseText: string,
  pinyinText: string,
  vietnameseTranslation: string,
  startTimeSeconds: number,
  endTimeSeconds: number
}