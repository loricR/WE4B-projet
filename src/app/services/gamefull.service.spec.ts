import { TestBed } from '@angular/core/testing';

import { GamefullService } from './gamefull.service';

describe('GamefullService', () => {
  let service: GamefullService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamefullService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
