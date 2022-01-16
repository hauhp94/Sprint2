import {Injectable} from '@angular/core';

import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  messageSource = new BehaviorSubject<string>('default message');
  currentMessage = this.messageSource.asObservable();

  // có thể subcribe theo dõi thay đổi value của biến này thay cho messageSource

  constructor() {
  }

  // method này để change source message
  changeMessage(message) {
    this.messageSource.next(message);
  }
}
