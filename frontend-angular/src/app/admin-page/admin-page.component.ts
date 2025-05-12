import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ContentService } from '../services/content.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  contents: any[] = [];
  newContent: any = this.getEmptyContent();
  filterType: string = '';
  feedbackMessage: string = '';

  constructor(
    private contentService: ContentService,
    private authService: AuthService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.loadContents();
  }

loadContents() {
  this.contentService.getAll().subscribe((res: any) => {
    this.contents = (res.contents || []).map((item: any) => ({
      ...item,
      editing: false
    }));
  });
}


  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getEmptyContent() {
    return {
      title: '',
      body: '',
      type: 'text',
      visible: false
    };
  }

  saveContent() {
    this.contentService.create(this.newContent).subscribe(() => {
      this.feedbackMessage = '✨ התוכן נוסף בהצלחה!';
      this.loadContents();
      this.resetForm();
    });
  }

  resetForm() {
    this.newContent = this.getEmptyContent();
  }

  edit(item: any) {
    item.editing = true;
  }

cancelEdit(item: any) {
  item.editing = false;
  this.loadContents();
}

save(item: any) {
  this.contentService.update(item.id.toString(), item).subscribe(() => {
    item.editing = false;
    this.feedbackMessage = '💾 נשמר בהצלחה';
    this.loadContents();
  });
}

  remove(id: number) {
    this.contentService.delete(id.toString()).subscribe(() => {
      this.feedbackMessage = '🗑️ נמחק בהצלחה';
      this.loadContents();
    });
  }

  get filteredContents() {
    return this.contents.filter(item => !this.filterType || item.type === this.filterType);
  }

  getSafeUrl(url: string): SafeResourceUrl {
    const videoId = this.extractYouTubeId(url);
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + videoId);
  }

  extractYouTubeId(url: string): string {
    const match = url.match(/(?:youtube\.com.*[?&]v=|youtu\.be\/)([^&\n]+)/);
    return match && match[1] ? match[1] : url;
  }
}
