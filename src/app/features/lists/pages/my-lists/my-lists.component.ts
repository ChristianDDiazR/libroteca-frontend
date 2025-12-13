import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { ListsService } from '../../lists.service';
import { AuthService } from '../../../auth/auth.service';
import { UserBookList, ListStatus } from '../../../../models/list.interface';

@Component({
  selector: 'app-my-lists',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSelectModule
  ],
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.scss']
})
export class MyListsComponent implements OnInit {
  allLists: UserBookList[] = [];
  loading = false;
  currentUserId: number | null = null;

  statusOptions: { value: ListStatus; label: string }[] = [
    { value: 'DESEO_LEER', label: 'Deseo Leer' },
    { value: 'LEYENDO', label: 'Leyendo' },
    { value: 'LEIDO', label: 'Leído' }
  ];

  constructor(
    private listsService: ListsService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    this.currentUserId = currentUser?.id || null;

    if (this.currentUserId) {
      this.loadLists();
    }
  }

  loadLists(): void {
    if (!this.currentUserId) return;

    this.loading = true;
    this.listsService.getUserLists(this.currentUserId).subscribe({
      next: (lists) => {
        this.allLists = lists;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando listas:', err);
        this.snackBar.open('Error al cargar las listas', 'Cerrar', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  getListsByStatus(status: ListStatus): UserBookList[] {
    return this.allLists.filter(item => item.status === status);
  }

  updateStatus(list: UserBookList, newStatus: ListStatus): void {
    if (!this.currentUserId) return;

    this.listsService.updateListStatus(this.currentUserId, list.book_id, { status: newStatus }).subscribe({
      next: () => {
        this.snackBar.open('Estado actualizado', 'Cerrar', { duration: 2000 });
        this.loadLists();
      },
      error: (err) => {
        console.error('Error actualizando estado:', err);
        this.snackBar.open('Error al actualizar estado', 'Cerrar', { duration: 3000 });
      }
    });
  }

  removeFromList(bookId: number): void {
    if (!this.currentUserId || !confirm('¿Eliminar este libro de tu lista?')) return;

    this.listsService.removeBookFromList(this.currentUserId, bookId).subscribe({
      next: () => {
        this.snackBar.open('Libro eliminado de la lista', 'Cerrar', { duration: 2000 });
        this.loadLists();
      },
      error: (err) => {
        console.error('Error eliminando libro:', err);
        this.snackBar.open('Error al eliminar libro', 'Cerrar', { duration: 3000 });
      }
    });
  }

  viewBookDetail(bookId: number): void {
    this.router.navigate(['/books', bookId]);
  }

  getStatusLabel(status: string): string {
    const option = this.statusOptions.find(opt => opt.value === status);
    return option?.label || status;
  }

  getStars(rating: number | undefined): string[] {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    for (let i = 0; i < 5; i++) {
      stars.push(i < fullStars ? 'star' : 'star_border');
    }
    return stars;
  }

  getImageSrc(url: string | undefined): string {
    if (url && url.startsWith('http')) {
      return url;
    }
    return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="450"%3E%3Crect width="300" height="450" fill="%23e0e0e0"/%3E%3Ctext x="50%25" y="50%25" font-size="24" text-anchor="middle" dy=".3em" fill="%23757575"%3ESin Portada%3C/text%3E%3C/svg%3E';
  }

  onImageError(event: any): void {
    if (!event.target.dataset.errorHandled) {
      event.target.dataset.errorHandled = 'true';
      event.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="450"%3E%3Crect width="300" height="450" fill="%23e0e0e0"/%3E%3Ctext x="50%25" y="50%25" font-size="24" text-anchor="middle" dy=".3em" fill="%23757575"%3ESin Portada%3C/text%3E%3C/svg%3E';
    }
  }
}
