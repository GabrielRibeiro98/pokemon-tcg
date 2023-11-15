import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let loadingService: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService],
    });

    loadingService = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(loadingService).toBeTruthy();
  });

  it('should start with loading set to false', () => {
    loadingService.loading$.subscribe((loading) => {
      expect(loading).toBe(false);
    });
  });

  it('should set loading to true when showLoading is called', () => {
    loadingService.showLoading();
    loadingService.loading$.subscribe((loading) => {
      expect(loading).toBe(true);
    });
  });

  it('should set loading to false when hideLoading is called', () => {
    loadingService.showLoading();
    loadingService.hideLoading();
    loadingService.loading$.subscribe((loading) => {
      expect(loading).toBe(false);
    });
  });

  // You can add more test cases as needed
});