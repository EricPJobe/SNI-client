import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { DataService } from '../../../Services/data.service';
import { ParsedWord } from '../../../models/parsedword.model';

@Component({
  selector: 'app-unit-reader',
  imports: [],
  templateUrl: './unit-reader.component.html',
  styleUrl: './unit-reader.component.css'
})
export class UnitReaderComponent implements OnInit {
  http = inject(HttpClient);
  dataService = inject(DataService);
  text: ParsedWord[] | null = null;
  hoveredWord: ParsedWord | null = null;
  audio: HTMLAudioElement | null = null;

  ngOnInit(): void {
    console.log('Unit Reader Component Initialized');
    this.http.get(this.dataService.findPath + "parsedword/unit/1").pipe(
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
    console.log('Play button clicked');
    // Logic to play the audio
  }

  onPause() {
    console.log('Pause button clicked');
    // Logic to pause the audio
  }
  onStop() {
    console.log('Stop button clicked');
    // Logic to stop the audio
  }

  onWordHover(word: ParsedWord) {
    this.hoveredWord = word;
  }
  onHoverOut() {
    this.hoveredWord = null;
  }
}
