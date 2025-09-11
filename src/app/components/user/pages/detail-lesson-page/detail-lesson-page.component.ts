import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { TabsModule } from 'primeng/tabs';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { CommentService } from '../../../../services/comment/comment.service';
import { Observable, switchMap, take } from 'rxjs';
import { CommentRequest, CommentResponse } from '../../../../models/Comment';
import { CommonModule } from '@angular/common';
import { LessonService } from '../../../../services/lesson/lesson.service';
import { Lesson, Sentence } from '../../../../models/Lesson';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { UserProgressRequest, UserProgressResponse } from '../../../../models/User';
import { UserProgressService } from '../../../../services/user-progress/user-progress.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { SentenceReportService } from '../../../../services/sentence-report/sentence-report.service';

@Component({
  selector: 'app-detail-lesson-page',
  imports: [TabsModule, BadgeModule, FormsModule, CommonModule, DialogModule, ButtonModule, AvatarModule, FloatLabelModule,
    InputTextModule, TextareaModule, RouterLink],
  templateUrl: './detail-lesson-page.component.html',
  styleUrl: './detail-lesson-page.component.css'
})
export class DetailLessonPageComponent implements OnInit, AfterViewInit, OnDestroy {
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
  parentCommentId: number | null = null
  selectedFile: File | null = null;

  titleReport: string = ''
  reasonReport: string = ''
  isCompleted = false

  currentSentenceIndex = 0;
  currentSentence: Sentence | null = null;
  userProgress!: UserProgressResponse

  showResult = false;
  isCorrect = false;
  isIncorrect = false;
  userAnswer = '';

  isPlaying = false;
  currentSpeed = 1;
  currentSpeedIndex = 2;
  speeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  currentTime = 0;
  duration = 0;
  progress = 0;

  visibleReportDialog = false;

  startTime!: number
  endTime!: number
  avatar: string = ''
  fullName: string = ''

  constructor(private route: ActivatedRoute, private commentService: CommentService, private authService: AuthService,
    private lessonService: LessonService, private userProgressService: UserProgressService, private reportService: SentenceReportService) { }

  ngAfterViewInit(): void {
    const audio = this.audioPlayer.nativeElement;

    audio.addEventListener('timeupdate', () => {
      this.currentTime = audio.currentTime;
      this.progress = (this.currentTime / this.duration) * 100;
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.lessonService.getDetailLessonById(this.id).pipe(
      switchMap(lesson => {
        this.lesson = lesson;
        this.duration = lesson.estimatedDurationSeconds || 0;
        return this.userProgressService.getUserProgress(this.id);
      })
    ).subscribe(userProgress => {
      this.userProgress = userProgress;
      this.currentSentenceIndex = userProgress.currentSentenceIndex;
      this.currentSentence = this.lesson?.sentences[this.currentSentenceIndex] || null;
      this.loadCurrentExercise();
    });
    this.avatar = this.authService.getUser()?.avatarUrl || '';
    this.fullName = this.authService.getUser()?.fullName || '';

    this.commentService.loadComments(this.id, 1, 10)
    this.comments$ = this.commentService.comments$
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

    this.comments$.pipe(take(1)).subscribe(comments => {
      comments.forEach(c => {
        if (c.replyCount !== 0) {
          this.expandedComments[c.id] = false;
          this.loadedReplyComment[c.id] = false;
        }
      });
    });
    this.startTime = Date.now()
  }

  ngOnDestroy(): void {
    if (!this.isCompleted) {
      let request: UserProgressRequest = {
        lessonId: this.id, status: this.userProgress.status, currentSentenceIndex: this.currentSentenceIndex,
        totalAttempts: this.userProgress.totalAttempts, totalTimeSpentSeconds: this.userProgress.totalTimeSpentSeconds += Date.now() - this.startTime
      }
      this.userProgressService.updateUserProgress(request, this.userProgress.id).subscribe({
        next: () => console.log('Progress saved'),
        error: (err) => console.error('Save failed', err)
      });
    }
  }

  resetExercise() {
    this.userAnswer = '';
    this.showResult = false;
    this.isCorrect = false;
    this.isIncorrect = false;
  }

  checkAnswer() {
    if (this.currentSentence?.chineseText.trim() === this.userAnswer.trim()) {
      this.isCorrect = true;
      this.showResult = true;

      if (this.currentSentenceIndex + 1 === this.lesson?.totalSentences) {
        let timeSpent = Date.now() - this.startTime
        this.userProgressService.completeLesson(this.userProgress.id, timeSpent).subscribe({
          next: () => console.log('Progress saved'),
          error: (err) => console.error('Save failed', err)
        });
        this.isCompleted = true
      }
    } else {
      this.higlightIncorrectAnswer();
      this.isIncorrect = true;
    }
  }

  nextExercise() {
    this.currentSentenceIndex++;
    if (this.currentSentenceIndex >= (this.lesson?.totalSentences ?? 0)) {
      this.currentSentenceIndex = 0;
    }
    this.loadCurrentExercise();
    this.playAudioSegment();
  }

  skipExercise() {
    this.userAnswer = this.currentSentence?.chineseText || '';
    this.checkAnswer();
  }

  loadCurrentExercise() {
    if (this.currentSentenceIndex < (this.lesson?.totalSentences ?? 0)) {
      this.currentSentence = this.lesson?.sentences[this.currentSentenceIndex] ?? null;
      this.resetExercise();
    }
  }

  focusInput() {
    this.isIncorrect = false;
  }

  higlightIncorrectAnswer() {
    if (!this.currentSentence) return;
    let incorrectAnswers = '';
    const correctText = this.currentSentence?.chineseText;
    const size = correctText.length - this.userAnswer.length;

    for (let i = 0; i < this.userAnswer.length; i++) {
      if (correctText[i] === this.userAnswer[i] && this.userAnswer.length >= i) {
        incorrectAnswers += this.userAnswer[i] + ' ';
      } else {
        incorrectAnswers += '***' + ' ';
      }
    }

    for (let i = 0; i < size; i++) {
      incorrectAnswers += '***' + ' ';
    }

    return incorrectAnswers;
  }

  setSpeed(speed: number) {
    this.currentSpeed = speed;
    this.currentSpeedIndex = this.speeds.indexOf(speed);
    this.audioPlayer.nativeElement.playbackRate = speed;
  }

  getSliderPosition(): string {
    const containerWidth = 150;
    const buttonWidth = 50;
    const gap = 10;

    const centerPosition = (containerWidth - buttonWidth) / 2;

    const buttonPosition = this.currentSpeedIndex * (buttonWidth + gap);

    const offset = centerPosition - buttonPosition;

    return `translateX(${offset}px)`;
  }

  playAudioSegment() {
    if (!this.currentSentence) return;
    const audio = this.audioPlayer.nativeElement;
    if (!this.isPlaying) {
      this.isPlaying = !this.isPlaying;

      const startTime = this.currentSentence.startTimeSeconds || 0;
      this.progress = this.currentSentence.startTimeSeconds || 0;
      audio.currentTime = startTime;
      audio.play();

      this.fillProgress(audio);

      const stopAtEnd = () => {
        if (this.currentSentence && audio.currentTime >= this.currentSentence.endTimeSeconds) {
          audio.pause();
          audio.removeEventListener('timeupdate', stopAtEnd);
          this.isPlaying = !this.isPlaying;
        }
      };

      audio.addEventListener('timeupdate', stopAtEnd);
    } else {
      this.isPlaying = !this.isPlaying;
      audio.pause();
    }
  }

  fillProgress(audio: HTMLAudioElement) {
    audio.addEventListener('timeupdate', () => {
      this.currentTime = audio.currentTime;
      this.progress = (this.currentTime / this.duration) * 100;
    });
  }

  formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  toggleReplies(commentId: number) {
    this.expandedComments[commentId] = !this.expandedComments[commentId];
    console.log(this.expandedComments[commentId])
    console.log(this.loadedReplyComment[commentId])
    if (!this.loadedReplyComment[commentId]) {
      this.commentService.loadChildComments(commentId);
      this.loadedReplyComment[commentId] = true

      console.log(this.expandedComments[commentId])
      console.log(this.loadedReplyComment[commentId])
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (this.commentContent.trim()) this.postComment();
    }
  }

  postComment() {
    let comment: CommentRequest = {
      lessonId: this.id, content: this.commentContent, parentCommentId: this.parentCommentId
    }
    const formData = new FormData();
    formData.append('comment', JSON.stringify(comment))
    if (this.selectedFile !== null) {
      formData.append('file', this.selectedFile, this.selectedFile.name)
    }
    this.commentService.postComment(formData)
    this.commentContent = ''
  }

  reply(id: number, name: string) {
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

  postReport(){
    this.reportService.reportSentence(this.titleReport, this.reasonReport, this.currentSentence?.id)
    .subscribe(() => {
      this.titleReport = ''
      this.reasonReport = ' '
    })
  }
}
