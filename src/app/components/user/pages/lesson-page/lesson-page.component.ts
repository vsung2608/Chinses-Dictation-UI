import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Lesson, Section } from '../../../../models/Lesson';

@Component({
    selector: 'app-lesson-page',
    imports: [CommonModule],
    templateUrl: './lesson-page.component.html',
    styleUrl: './lesson-page.component.css'
})
export class LessonPageComponent {
    sections: Section[] = [
        {
            id: 'section1',
            title: 'HSK1',
            lessonsCompleted: 14,
            timesCompleted: 1,
            totalLessons: 14,
            greenStars: 6,
            blueStars: 8,
            isExpanded: false,
            lessons: []
        },
        {
            id: 'section2',
            title: 'HSK2',
            lessonsCompleted: 14,
            timesCompleted: 1,
            totalLessons: 14,
            greenStars: 6,
            blueStars: 8,
            isExpanded: false,
            lessons: []
        },
        {
            id: 'section3',
            title: 'HSK3',
            lessonsCompleted: 14,
            timesCompleted: 1,
            totalLessons: 14,
            greenStars: 6,
            blueStars: 8,
            isExpanded: false,
            lessons: []
        },
        {
            id: 'section4',
            title: 'HSK4',
            lessonsCompleted: 14,
            timesCompleted: 1,
            totalLessons: 14,
            greenStars: 6,
            blueStars: 8,
            isExpanded: false,
            lessons: []
        }
        // Có thể thêm nhiều sections khác...
    ];

    ngOnInit(): void {
        // Khởi tạo component
    }

    toggleSection(sectionId: string): void {
        const section = this.sections.find(s => s.id === sectionId);
        if (section) {
            section.isExpanded = !section.isExpanded;

            // Emit events nếu cần thiết
            if (section.isExpanded) {
                this.onSectionExpand(section);
            } else {
                this.onSectionCollapse(section);
            }
        }
    }

    expandSection(sectionId: string): void {
        const section = this.sections.find(s => s.id === sectionId);
        if (section) {
            section.isExpanded = true;
            this.onSectionExpand(section);
        }
    }

    collapseSection(sectionId: string): void {
        const section = this.sections.find(s => s.id === sectionId);
        if (section) {
            section.isExpanded = false;
            this.onSectionCollapse(section);
        }
    }

    collapseAllSections(): void {
        this.sections.forEach(section => {
            section.isExpanded = false;
        });
    }

    expandAllSections(): void {
        this.sections.forEach(section => {
            section.isExpanded = true;
        });
    }

    onSectionExpand(section: Section): void {
        console.log('Section expanded:', section.title);
        // Thực hiện logic khi section được mở rộng
        // Ví dụ: track analytics, load thêm data, etc.
    }

    onSectionCollapse(section: Section): void {
        console.log('Section collapsed:', section.title);
        // Thực hiện logic khi section được thu gọn
    }

    onLessonClick(lesson: Lesson): void {
        // Xử lý khi user click vào lesson
        // Ví dụ: navigate to lesson detail, start lesson, etc.
    }

    // Helper methods
    getTotalCompletedLessons(): number {
        return this.sections.reduce((total, section) =>
            total + section.lessonsCompleted, 0
        );
    }

    getSectionProgress(section: Section): number {
        return Math.round((section.lessonsCompleted / section.totalLessons) * 100);
    }

    getExpandedSections(): Section[] {
        return this.sections.filter(section => section.isExpanded);
    }
}
