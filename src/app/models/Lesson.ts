export interface Lesson {
  id: number;
  titleChinese: string;
  titleVietnamese: string;
  categoryId: number;
  description: string;
  audioFilePath: string;
  level: string;
  displayOrder: number;
  totalSentences: number;
  estimatedDurationSeconds: number;
  sentences: Sentence[];
}

export interface LessonWithProgressResponse {
  id: number;
  titleChinese: string;
  titleVietnamese: string;
  level: string;
  totalSentences: number;
  estimatedDurationSeconds: number;
  status: string;
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
  lessons: LessonWithProgressResponse[];
}
export interface Category {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
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

export interface CategoryStatistics {
  categoryId: number;
  categoryName: string;
  description: string;
  imageUrl: string;
  isActive: string;
  totalLessons: number;
  totalStudents: number;
  totalAttempt: number;
}