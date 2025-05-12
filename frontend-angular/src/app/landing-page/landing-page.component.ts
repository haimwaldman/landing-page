import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ContentService } from '../services/content.service';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, ContactFormComponent],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LandingPageComponent implements OnInit {
  contents: any[] = [];
  currentIndex = 0;
  heroImage: string = 'assets/hero.png';

  constructor(
    private contentService: ContentService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.contentService.getAll().subscribe((res: any) => {
      this.contents = (res.contents || []).filter((item: any) => item.visible === true);
      this.startRotation();
    });
  }

  startRotation() {
    setInterval(() => {
      if (this.contents.length > 0) {
        this.currentIndex = (this.currentIndex + 1) % this.contents.length;
      }
    }, 5000);
  }

  extractVideoId(url: string): string {
    const match = url?.match(/(?:youtube\.com.*[?&]v=|youtu\.be\/)([^&\n]+)/);
    return match && match[1] ? match[1] : url;
  }

  getSafeVideoUrl(url: string): SafeResourceUrl {
    const videoId = this.extractVideoId(url);
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + videoId);
  }
}
