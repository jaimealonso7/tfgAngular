import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-session-timer',
  imports: [CommonModule],
  templateUrl: './session-timer.component.html',
  styleUrl: './session-timer.component.css'
})
export class SessionTimerComponent implements OnInit {
  remainingMinutes: number | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.updateRemainingTime();
    setInterval(() => this.updateRemainingTime(), 60000); // actualiza cada minuto
  }

  updateRemainingTime(): void {
    const remainingMs = this.authService.getRemainingSessionTime();
    this.remainingMinutes = remainingMs ? Math.floor(remainingMs / 60000) : null;
  }
}