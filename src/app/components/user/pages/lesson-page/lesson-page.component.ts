import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Lesson, LessonWithProgressResponse, Section } from '../../../../models/Lesson';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from '../../../../services/lesson/lesson.service';

@Component({
    selector: 'app-lesson-page',
    imports: [CommonModule],
    templateUrl: './lesson-page.component.html',
    styleUrl: './lesson-page.component.css'
})
export class LessonPageComponent implements OnInit {
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
    ];

    id: number = 0;

    constructor(private route: ActivatedRoute, private lessonService: LessonService, private router: Router) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
    }

    toggleSection(sectionId: string): void {
        const section = this.sections.find(s => s.id === sectionId);
        if (section) {
            section.isExpanded = !section.isExpanded;

            if (section.isExpanded) {
                this.onSectionExpand(section);
            } else {
                this.onSectionCollapse(section);
            }
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
        if (section.lessons.length === 0) {
            this.lessonService.getLessonByLevelAndCategory(this.id, section.title).subscribe(data => {
                section.lessons = data
                section.isExpanded = true;
            })
        }
    }

    onSectionCollapse(section: Section): void {
        console.log('Section collapsed:', section.title);
        // Thực hiện logic khi section được thu gọn
    }

    onLessonClick(lesson: LessonWithProgressResponse): void {
        this.router.navigate(['/lessons', lesson.id]);
    }

    getBorderColor(status: string) {
        switch (status) {
            case 'COMPLETED': return '#00a88e';
            case 'IN_PROGRESS': return '#f5a623';
            case 'NOT_STARTED': return '#d9534f';
            default: return '#ccc';
        }
    }
}
