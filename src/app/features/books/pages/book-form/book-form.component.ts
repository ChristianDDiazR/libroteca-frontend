import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BooksService } from '../../books.service';
import { Book } from '../../../../models/book.interface';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;
  loading = false;
  isEditMode = false;
  bookId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private booksService: BooksService,
    private snackBar: MatSnackBar
  ) {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1)]],
      author: [''],
      genre: [''],
      description: [''],
      synopsis: [''],
      cover_image_url: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.bookId = Number(id);
      this.loadBook(this.bookId);
    }
  }

  loadBook(id: number): void {
    this.loading = true;
    this.booksService.getBook(id).subscribe({
      next: (book) => {
        this.bookForm.patchValue(book);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando libro:', err);
        this.snackBar.open('Error al cargar el libro', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/books']);
      }
    });
  }

  onSubmit(): void {
    if (this.bookForm.invalid) return;

    this.loading = true;
    const bookData = this.bookForm.value;

    if (this.isEditMode && this.bookId) {
      this.booksService.updateBook(this.bookId, bookData).subscribe({
        next: (book) => {
          this.snackBar.open('Libro actualizado exitosamente', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/books', book.id]);
        },
        error: (err) => {
          this.loading = false;
          const message = err.error?.message || 'Error al actualizar el libro';
          this.snackBar.open(message, 'Cerrar', { duration: 5000 });
        }
      });
    } else {
      this.booksService.createBook(bookData).subscribe({
        next: (book) => {
          this.snackBar.open('Libro creado exitosamente', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/books', book.id]);
        },
        error: (err) => {
          this.loading = false;
          const message = err.error?.message || 'Error al crear el libro';
          this.snackBar.open(message, 'Cerrar', { duration: 5000 });
        }
      });
    }
  }

  getTitle(): string {
    return this.isEditMode ? 'Editar Libro' : 'Crear Nuevo Libro';
  }

  getSubmitButtonText(): string {
    if (this.loading) {
      return this.isEditMode ? 'Actualizando...' : 'Creando...';
    }
    return this.isEditMode ? 'Actualizar Libro' : 'Crear Libro';
  }
}
