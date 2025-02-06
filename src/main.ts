import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UrlShortenerService } from './url-shortener.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="container">
      <h1>Encurtador de URLs</h1>
      
      <div class="form-group">
        <input 
          type="url" 
          class="input-field"
          [(ngModel)]="longUrl"
          placeholder="Cole aqui sua URL longa"
          required
        >
        
        <button 
          class="btn"
          (click)="shortenUrl()"
          [disabled]="!isValidUrl || isLoading"
        >
          {{ isLoading ? 'Encurtando...' : 'Encurtar URL' }}
        </button>
        
        <div *ngIf="error" class="error">
          {{ error }}
        </div>
      </div>

      <div *ngIf="shortUrl" class="result">
        <h3>URL Encurtada:</h3>
        <p>{{ shortUrl }}</p>
        <button 
          class="btn"
          (click)="copyToClipboard()"
          style="margin-top: 10px;"
        >
          Copiar URL
        </button>
      </div>

      <div *ngIf="showUrlList" class="url-list">
        <h3>URLs Recentes</h3>
        <ul>
          <li *ngFor="let url of recentUrls">
            <span class="long-url">{{ url.long }}</span>
            <span class="short-url">{{ url.short }}</span>
          </li>
        </ul>
      </div>
    </div>
  `
})
export class App {
  longUrl = '';
  shortUrl = '';
  error = '';
  isLoading = false;
  showUrlList = false;
  recentUrls: Array<{long: string, short: string}> = [];

  constructor(private urlShortener: UrlShortenerService) {
    this.loadRecentUrls();
  }

  private loadRecentUrls() {
    const urls = this.urlShortener.getStoredUrls();
    this.recentUrls = Object.entries(urls).map(([code, longUrl]) => ({
      long: longUrl,
      short: window.location.origin + '/' + code
    }));
    this.showUrlList = this.recentUrls.length > 0;
  }

  get isValidUrl(): boolean {
    try {
      new URL(this.longUrl);
      return true;
    } catch {
      return false;
    }
  }

  async copyToClipboard() {
    try {
      await navigator.clipboard.writeText(this.shortUrl);
      alert('URL copiada para a área de transferência!');
    } catch (err) {
      console.error('Erro ao copiar URL:', err);
    }
  }

  shortenUrl() {
    if (!this.isValidUrl) {
      this.error = 'Por favor, insira uma URL válida';
      return;
    }

    this.isLoading = true;
    this.error = '';
    this.shortUrl = '';

    this.urlShortener.shortenUrl(this.longUrl).subscribe({
      next: (shortUrl) => {
        this.shortUrl = shortUrl;
        this.isLoading = false;
        this.loadRecentUrls();
      },
      error: (err) => {
        this.error = 'Ocorreu um erro ao encurtar a URL';
        this.isLoading = false;
      }
    });
  }
}

bootstrapApplication(App);