import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, throwError } from 'rxjs';
import { DataService } from '../../../Services/data.service';
import { ParsedWord } from '../../../models/parsedword.model';
import ParseString from '../../../helpers/parse-string';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCirclePlay, faCirclePause } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-unit-reader',
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './unit-reader.component.html',
  styleUrl: './unit-reader.component.css'
})
export class UnitReaderComponent implements OnInit {
  http = inject(HttpClient);
  dataService = inject(DataService);
  text: ParsedWord[] | null = null;
  hoveredWord: ParsedWord | null = null;
  audioSrc = 'assets/audio/Unit2test.mp3';
  isPlaying: boolean = false;
  faCirclePlay = faCirclePlay;
  faCirclePause = faCirclePause;
  duration: number = 0;
  currentTime: number = 0;

  @ViewChild('audio') audioRef!: ElementRef<HTMLAudioElement>;

  ngOnInit(): void {
    console.log('Unit Reader Component Initialized');
    this.http.get(this.dataService.findPath + "parsedword/unit/2").pipe(
      catchError(err => {
        console.error(err);
        return throwError(() => new Error("Failed to fetch courses."));
      })
    ).subscribe((resp: any) => {
      console.log(resp);
      this.text = resp;
    });

  }

  onPlay() {
    const audio = this.audioRef.nativeElement;
    audio.play();
    this.isPlaying = true;
  }

  onPause() {
    const audio = this.audioRef.nativeElement;
    audio.pause();
    this.isPlaying = false;
  }

  onTimeUpdate(): void {
    const audio = this.audioRef.nativeElement;
    this.currentTime = audio.currentTime;
  }

  onLoadedMetadata(): void {
    const audio = this.audioRef.nativeElement;
    this.duration = audio.duration;
  }

  seekTo(event: Event): void {
    const input = event.target as HTMLInputElement;
    const time = parseFloat(input.value);
    this.audioRef.nativeElement.currentTime = time;
  }

  formatTime(time: number): string {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  onWordHover(word: ParsedWord) {
    let prettierWord = {
      ...word,
      parsing: ParseString.parseString(word.parsing),
    }
    this.hoveredWord = prettierWord;
  }
  onHoverOut() {
    this.hoveredWord = null;
  }
}
