import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { BooksService } from '../../books.service';
import { RatingsService } from '../../services/ratings.service';
import { CommentsService } from '../../services/comments.service';
import { AuthService } from '../../../auth/auth.service';
import { Book } from '../../../../models/book.interface';
import { Comment, CreateCommentDto } from '../../../../models/comment.interface';
import { RatingResponse } from '../../../../models/rating.interface';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatDividerModule,
    MatChipsModule
  ],
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  book: Book | null = null;
  comments: Comment[] = [];
  rating: RatingResponse | null = null;
  loading = true;
  isAuthenticated = false;
  isAdmin = false;
  currentUserId: number | null = null;
  
  commentForm: FormGroup;
  editingCommentId: number | null = null;
  userRating = 0;
  hoverRating = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private booksService: BooksService,
    private ratingsService: RatingsService,
    private commentsService: CommentsService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.commentForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.isAdmin = this.authService.isAdmin();
    const currentUser = this.authService.getCurrentUser();
    this.currentUserId = currentUser?.id || null;

    const bookId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadBookData(bookId);
  }

  loadBookData(bookId: number): void {
    this.loading = true;
    
    this.booksService.getBook(bookId).subscribe({
      next: (book) => {
        this.book = book;
        this.loadRating(bookId);
        this.loadComments(bookId);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando libro:', err);
        this.snackBar.open('Error al cargar el libro', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/books']);
      }
    });
  }

  loadRating(bookId: number): void {
    this.ratingsService.getRating(bookId).subscribe({
      next: (rating) => {
        this.rating = rating;
        this.userRating = rating.userRating || 0;
      },
      error: (err) => console.error('Error cargando rating:', err)
    });
  }

  loadComments(bookId: number): void {
    this.commentsService.getComments(bookId).subscribe({
      next: (comments) => {
        this.comments = comments;
      },
      error: (err) => console.error('Error cargando comentarios:', err)
    });
  }

  setRating(rating: number): void {
    if (!this.isAuthenticated) {
      this.snackBar.open('Debes iniciar sesión para valorar', 'Cerrar', { duration: 3000 });
      return;
    }

    if (!this.book) return;

    this.ratingsService.createOrUpdateRating(this.book.id, { score: rating }).subscribe({
      next: () => {
        this.userRating = rating;
        this.loadRating(this.book!.id);
        this.snackBar.open('Valoración guardada', 'Cerrar', { duration: 2000 });
      },
      error: (err) => {
        console.error('Error guardando rating:', err);
        this.snackBar.open('Error al guardar valoración', 'Cerrar', { duration: 3000 });
      }
    });
  }

  onSubmitComment(): void {
    if (!this.commentForm.valid || !this.book) return;

    const commentData: CreateCommentDto = {
      content: this.commentForm.value.content,
      book_id: this.book.id
    };

    if (this.editingCommentId) {
      this.commentsService.updateComment(this.editingCommentId, { content: this.commentForm.value.content }).subscribe({
        next: () => {
          this.snackBar.open('Comentario actualizado', 'Cerrar', { duration: 2000 });
          this.loadComments(this.book!.id);
          this.commentForm.reset();
          this.editingCommentId = null;
        },
        error: (err) => {
          console.error('Error actualizando comentario:', err);
          this.snackBar.open('Error al actualizar comentario', 'Cerrar', { duration: 3000 });
        }
      });
    } else {
      this.commentsService.createComment(commentData).subscribe({
        next: () => {
          this.snackBar.open('Comentario publicado', 'Cerrar', { duration: 2000 });
          this.loadComments(this.book!.id);
          this.commentForm.reset();
        },
        error: (err) => {
          console.error('Error creando comentario:', err);
          this.snackBar.open('Error al publicar comentario', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  editComment(comment: Comment): void {
    this.editingCommentId = comment.id;
    this.commentForm.patchValue({ content: comment.content });
  }

  cancelEdit(): void {
    this.editingCommentId = null;
    this.commentForm.reset();
  }

  deleteComment(commentId: number): void {
    if (!confirm('¿Estás seguro de eliminar este comentario?')) return;

    this.commentsService.deleteComment(commentId).subscribe({
      next: () => {
        this.snackBar.open('Comentario eliminado', 'Cerrar', { duration: 2000 });
        this.loadComments(this.book!.id);
      },
      error: (err) => {
        console.error('Error eliminando comentario:', err);
        this.snackBar.open('Error al eliminar comentario', 'Cerrar', { duration: 3000 });
      }
    });
  }

  canEditComment(comment: Comment): boolean {
    return this.currentUserId === comment.user_id;
  }

  editBook(): void {
    if (this.book) {
      this.router.navigate(['/books/edit', this.book.id]);
    }
  }

  deleteBook(): void {
    if (!this.book || !confirm('¿Estás seguro de eliminar este libro?')) return;

    this.booksService.deleteBook(this.book.id).subscribe({
      next: () => {
        this.snackBar.open('Libro eliminado', 'Cerrar', { duration: 2000 });
        this.router.navigate(['/books']);
      },
      error: (err) => {
        console.error('Error eliminando libro:', err);
        this.snackBar.open('Error al eliminar libro', 'Cerrar', { duration: 3000 });
      }
    });
  }

  getStars(rating: number): string[] {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(i < fullStars ? 'star' : 'star_border');
    }
    return stars;
  }

  getRatingStars(): number[] {
    return [1, 2, 3, 4, 5];
  }

  onMouseEnter(rating: number): void {
    this.hoverRating = rating;
  }

  onMouseLeave(): void {
    this.hoverRating = 0;
  }

  getDisplayRating(): number {
    return this.hoverRating || this.userRating;
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
