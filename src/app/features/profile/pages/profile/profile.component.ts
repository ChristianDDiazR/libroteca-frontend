import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { AuthService } from '../../../auth/auth.service';
import { AchievementsService } from '../../services/achievements.service';
import { ListsService } from '../../../lists/lists.service';
import { User } from '../../../../models/user.interface';
import { Achievement } from '../../../../models/achievement.interface';
import { UserBookList } from '../../../../models/list.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatChipsModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  achievements: Achievement[] = [];
  userLists: UserBookList[] = [];
  loading = true;

  constructor(
    private authService: AuthService,
    private achievementsService: AchievementsService,
    private listsService: ListsService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    if (this.user) {
      this.loadUserData();
    }
  }

  loadUserData(): void {
    if (!this.user) return;

    this.loading = true;

    // Cargar logros
    this.achievementsService.getUserAchievements(this.user.id).subscribe({
      next: (achievements) => {
        this.achievements = achievements;
      },
      error: (err) => console.error('Error cargando logros:', err)
    });

    // Cargar listas
    this.listsService.getUserLists(this.user.id).subscribe({
      next: (lists) => {
        this.userLists = lists;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando listas:', err);
        this.loading = false;
      }
    });
  }

  getListCount(status: string): number {
    return this.userLists.filter(item => item.status === status).length;
  }

  getTotalBooks(): number {
    return this.userLists.length;
  }

  getProfilePicture(url: string | undefined): string {
    if (url && url.startsWith('http')) {
      return url;
    }
    return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%23e0e0e0"/%3E%3Ctext x="50%25" y="50%25" font-size="40" text-anchor="middle" dy=".3em" fill="%23757575"%3E?%3C/text%3E%3C/svg%3E';
  }

  onImageError(event: any): void {
    if (!event.target.dataset.errorHandled) {
      event.target.dataset.errorHandled = 'true';
      event.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Ccircle cx="50" cy="50" r="50" fill="%23e0e0e0"/%3E%3Ctext x="50%25" y="50%25" font-size="40" text-anchor="middle" dy=".3em" fill="%23757575"%3E?%3C/text%3E%3C/svg%3E';
    }
  }

  getAchievementIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'FIRST_BOOK': 'auto_stories',
      'FIRST_RATING': 'star',
      'FIRST_COMMENT': 'comment',
      'BOOK_COLLECTOR': 'collections_bookmark',
      'CRITIC': 'rate_review',
      'READER': 'menu_book',
      'PASSIONATE_READER': 'local_library',
      'MASTER_READER': 'school'
    };
    return icons[type] || 'emoji_events';
  }

  getAchievementColor(type: string): string {
    const colors: { [key: string]: string } = {
      'FIRST_BOOK': '#4CAF50',
      'FIRST_RATING': '#FFC107',
      'FIRST_COMMENT': '#2196F3',
      'BOOK_COLLECTOR': '#9C27B0',
      'CRITIC': '#FF5722',
      'READER': '#00BCD4',
      'PASSIONATE_READER': '#E91E63',
      'MASTER_READER': '#FF9800'
    };
    return colors[type] || '#607D8B';
  }

  formatAchievementType(type: string): string {
    return type.split('_').map(word => 
      word.charAt(0) + word.slice(1).toLowerCase()
    ).join(' ');
  }
}
