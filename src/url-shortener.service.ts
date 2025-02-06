import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UrlShortenerService {
  private readonly STORAGE_KEY = 'url_shortener_mappings';

  constructor() {
    // Initialize storage if needed
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify({}));
    }
  }

  private getStoredUrls(): Record<string, string> {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '{}');
  }

  private saveUrls(urls: Record<string, string>): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(urls));
  }

  shortenUrl(longUrl: string): Observable<string> {
    const urls = this.getStoredUrls();
    
    // Check if URL already exists
    for (const [shortCode, storedUrl] of Object.entries(urls)) {
      if (storedUrl === longUrl) {
        return of(window.location.origin + '/' + shortCode);
      }
    }

    // Generate new short code
    const shortCode = Math.random().toString(36).substring(2, 8);
    urls[shortCode] = longUrl;
    this.saveUrls(urls);

    return of(window.location.origin + '/' + shortCode).pipe(delay(300));
  }

  getOriginalUrl(shortCode: string): string | null {
    const urls = this.getStoredUrls();
    return urls[shortCode] || null;
  }
}