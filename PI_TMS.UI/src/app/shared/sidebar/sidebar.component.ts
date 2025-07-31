import { Component, HostListener, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthTokenService } from '../../_guard/service/auth-token.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  imports: [
    CommonModule,
    RouterModule,
  ],
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() isCollapsed: boolean = false;
  @Output() collapseChange = new EventEmitter<boolean>();
  @Output() registerMenuInteracted = new EventEmitter<boolean>();
  @Output() viewMenuInteracted = new EventEmitter<boolean>();

  isRegisterMenuOpen: boolean = false;
  isViewMenuOpen: boolean = false;
  activeSubMenuItem: string | null = null;
  isDashboardActive: boolean = false;
  isTravelsActive: boolean = false;
  isFreightActive: boolean = false;
  isNfStorageActive: boolean = false;
  isRegisterParentActive: boolean = false;
  isViewParentActive: boolean = false;

  constructor(private router: Router, private authTokenService: AuthTokenService) {}
  
  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateActiveState();
      if (!this.router.url.includes('/register')) {
        this.isRegisterMenuOpen = false;
      }
    });
    this.updateActiveState();
  }

  toggleViewMenu(): void {
    if (this.isCollapsed && !this.isViewMenuOpen) {
      this.collapseChange.emit(false);
      this.isViewMenuOpen = true;
      this.viewMenuInteracted.emit(true);
    } else if (!this.isCollapsed) {
      this.isViewMenuOpen = !this.isViewMenuOpen;
      if (!this.isViewMenuOpen) {
        this.viewMenuInteracted.emit(false);
      }
    }
  }

  toggleRegisterMenu(): void {
    if (this.isCollapsed && !this.isRegisterMenuOpen) {
      this.collapseChange.emit(false);
      this.isRegisterMenuOpen = true;
      this.registerMenuInteracted.emit(true);
    } else if (!this.isCollapsed) {
      this.isRegisterMenuOpen = !this.isRegisterMenuOpen;
      if (!this.isRegisterMenuOpen) {
        this.registerMenuInteracted.emit(false);
      }
    }
  }

  updateActiveState(): void {
    const currentUrl = this.router.url;
    this.isDashboardActive = false;
    this.isTravelsActive = false;
    this.isFreightActive = false;
    this.isNfStorageActive = false;
    this.isRegisterParentActive = false;
    this.isViewParentActive = false;
    this.activeSubMenuItem = null;

    if (currentUrl === '/dashboard') { 
      this.isDashboardActive = true;
    } else if (currentUrl.includes('/travels')) {
      this.isTravelsActive = true;
    } else if (currentUrl === '/freight-calculation'){
      this.isFreightActive = true;
    } else if (currentUrl === '/nf-storage'){
      this.isNfStorageActive = true;
    } else if (currentUrl.includes('/register')) {
      this.isRegisterMenuOpen = true; 
      this.isRegisterParentActive = true;
      if (currentUrl.includes('/register/trucks')) {
        this.activeSubMenuItem = 'trucks';
      } else if (currentUrl.includes('/register/loads')) {
        this.activeSubMenuItem = 'loads';
      } else if (currentUrl.includes('/register/clients')) {
        this.activeSubMenuItem = 'clients';
      }
    }
    if (!currentUrl.includes('/register') && this.isRegisterMenuOpen) {
      this.isRegisterMenuOpen = false;
    }
  }

  private navigate(path: string[]): void {
    this.router.navigate(path);
  }

  goToDashboard(): void { 
    this.navigate(['/dashboard']); 
  }
  
  goToTravels(): void { 
    this.navigate(['/travels']); 
  }
  
  goToFreight(): void { 
    this.navigate(['/freight-calculation']); 
  }
  
  goToNfStorage(): void { 
    this.navigate(['/nf-storage']); 
  }
  
  goToCaminhoes(): void { 
    this.navigate(['/register/trucks']); 
  }
  
  goToLoad(): void { 
    this.navigate(['/view/load']); 
  }
  
  goToClientes(): void { 
    this.navigate(['/register/clients']); 
  }
  
  LogOff(): void {
    this.authTokenService.LogOff();
    this.navigate(['/login']);
  }
}