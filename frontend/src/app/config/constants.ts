// Angular Modules
import { Injectable } from '@angular/core';

@Injectable()
export class Constants {
  public readonly USE_MOCK_API: boolean = false;
  public readonly API_ENDPOINT: string = 'https://todo-api.niveaubepaling.nl';
  public readonly API_MOCK_ENDPOINT: string = 'http://127.0.0.1:8000/api';
}
