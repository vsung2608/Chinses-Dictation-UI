import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { TabsModule } from 'primeng/tabs';
import { FormsModule } from '@angular/forms';
import { CommentService } from '../../../../services/comment/comment.service';
import { Observable } from 'rxjs';
import { CommentResponse } from '../../../../models/Comment';
import { CommonModule } from '@angular/common';
import { LessonService } from '../../../../services/lesson/lesson.service';
import { Lesson, Sentence } from '../../../../models/Lesson';
import { After } from 'v8';

@Component({
  selector: 'app-detail-lesson-page',
  imports: [TabsModule, BadgeModule, FormsModule, CommonModule],
  templateUrl: './detail-lesson-page.component.html',
  styleUrl: './detail-lesson-page.component.css'
})
export class DetailLessonPageComponent implements OnInit, AfterViewInit {
  @ViewChild('replyInput') replyInput!: ElementRef;
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;
  responsiveOptions: any[] | undefined;
  id = 0;
  expandedComments: { [commentId: string]: boolean } = {};
  loadedReplyComment: { [commentId: string]: boolean } = {};

  lesson: Lesson | undefined;
  comments$: Observable<Array<CommentResponse>> | undefined;
  replies$: Observable<Array<CommentResponse>> | undefined;
  commentContent: string = ''
  parentCommentId: string = ''

  currentSentenceIndex = 0;
  currentSentence: Sentence | null = null;

  showResult = false;
  isCorrect = false;
  userAnswer = '';

  isPlaying = false;
  currentSpeed = 1;
  speeds = [0.5, 0.75, 1, 1.25];

  currentTime = 0;
  duration = 0;
  progress = 0;

  constructor(private route: ActivatedRoute, private commentService: CommentService, private lessonService: LessonService) { }

  ngAfterViewInit(): void {
    const audio = this.audioPlayer.nativeElement;
    this.duration = this.lesson?.estimatedDurationSeconds || 0;
    this.currentSentence = this.lesson?.sentences[0] || null;

    audio.addEventListener('timeupdate', () => {
      this.currentTime = audio.currentTime;
      this.progress = (this.currentTime / this.duration) * 100;
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.lessonService.getDetailLessonById(this.id).pipe()
      .subscribe(lesson => { this.lesson = lesson })
    this.commentService.loadComments(this.id, 1, 10)
    this.comments$ = this.commentService.comments$
    this.replies$ = this.commentService.replies$
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
      }
    ]

    this.comments$.subscribe(comments => {
      comments.forEach(c => {
        if (c.replyCount != 0) {
          this.expandedComments[c.id] = false
          this.loadedReplyComment[c.id] = false
        }
      })
    })
  }

  resetExercise() {
    this.userAnswer = '';
    this.showResult = false;
    this.isCorrect = false;
  }

  checkAnswer() {
  }

  nextExercise() {
    this.currentSentenceIndex++;
    if (this.currentSentenceIndex >= (this.lesson?.totalSentences ?? 0)) {
      // Reset to beginning or show completion message
      this.currentSentenceIndex = 0;
    }
    this.loadCurrentExercise();
  }

  loadCurrentExercise() {
    if (this.currentSentenceIndex < (this.lesson?.totalSentences ?? 0)) {
      this.currentSentence = this.lesson?.sentences[this.currentSentenceIndex] ?? null;
      this.resetExercise();
    }
  }

  setSpeed(speed: number) {
    this.currentSpeed = speed;
    this.audioPlayer.nativeElement.playbackRate = speed;
  }

  playSegment(start: number, end: number) {
    const audio = this.audioPlayer.nativeElement;
    audio.currentTime = start;
    audio.play();

    const checkTime = () => {
      if (audio.currentTime >= end) {
        audio.pause();
        audio.removeEventListener('timeupdate', checkTime);
      }
    };

    audio.addEventListener('timeupdate', checkTime);
  }

  formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  toggleReplies(commentId: string) {
    this.expandedComments[commentId] = !this.expandedComments[commentId];

    if (!this.loadedReplyComment[commentId]) {
      this.commentService.loadReplyComments(commentId);
      this.loadedReplyComment[commentId] = true
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (this.commentContent.trim()) this.postComment();
    }
  }

  postComment() {
    this.commentService.postComment(this.id, this.commentContent, this.parentCommentId)
    this.commentContent = ''
  }

  reply(id: string, name: string) {
    this.parentCommentId = id;
    this.replyInput.nativeElement.focus();
    this.commentContent = name + ' ';
  }

  deleteComment(id: number) {
    this.commentService
  }

  updateComment(id: number) {

  }

  reportComment(id: number) {

  }
}
