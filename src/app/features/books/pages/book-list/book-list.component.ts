import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { BooksService } from '../../books.service';
import { AuthService } from '../../../auth/auth.service';
import { Book } from '../../../../models/book.interface';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  loading = false;
  isAdmin = false;

  constructor(
    private booksService: BooksService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.loadBooks();
  }

  loadBooks(): void {
    this.loading = true;
    this.booksService.getBooks().subscribe({
      next: (books) => {
        this.books = books;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando libros:', err);
        this.loading = false;
      }
    });
  }

  viewDetails(bookId: number): void {
    this.router.navigate(['/books', bookId]);
  }

  createBook(): void {
    this.router.navigate(['/books/create']);
  }

  getStars(rating: number | undefined): string[] {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    for (let i = 0; i < 5; i++) {
      stars.push(i < fullStars ? 'star' : 'star_border');
    }
    return stars;
  }

  encodeURIComponent(text: string): string {
    return encodeURIComponent(text);
  }

  getImageSrc(url: string | undefined): string {
    if (url && url.startsWith('http')) {
      return url;
    }
    // SVG placeholder embebido como data URI
    return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="450"%3E%3Crect width="300" height="450" fill="%23e0e0e0"/%3E%3Ctext x="50%25" y="50%25" font-size="24" text-anchor="middle" dy=".3em" fill="%23757575"%3ESin Portada%3C/text%3E%3C/svg%3E';
  }

  onImageError(event: any): void {
    // Evitar bucle infinito: solo cambiar la imagen una vez
    if (!event.target.dataset.errorHandled) {
      event.target.dataset.errorHandled = 'true';
      // Imagen placeholder como data URI (SVG embebido)
      event.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="450"%3E%3Crect width="300" height="450" fill="%23e0e0e0"/%3E%3Ctext x="50%25" y="50%25" font-size="24" text-anchor="middle" dy=".3em" fill="%23757575"%3ESin Portada%3C/text%3E%3C/svg%3E';
    }
  }
}
